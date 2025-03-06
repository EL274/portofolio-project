const Depense = require('../models/Depense');
const Objectif = require('../models/Objectif');

const genererConseils = async (user_id) => {
    const conseils = [];

    // Analyser les dépenses 
    const depenses = await Depenses.find({ user_id });
    const totalDepenses = depenses.reduce((sum, d) => sum + d.montant, 0);
    const depensesParCategorie = depenses.reduce((acc, d) => {
        acc[d.categorie] = (acc[d.ctegorie] || 0) + d.montant;
        return acc;
}, {});
// Conseil 1 : Réduire les dépenses dans une catégorie
for  (const [categorie, montant] of Object.entries(depensesParCategorie)) {
    if (montant  > 100) {
        conseils.push({
            titre: `Reduisez vos dépenses en ${catégorie}`,
            description: `Vous avez dépensé ${montant} € en ${categorie} ce mois-ci. Essayez de limiter ces dépenses à 50 €.`,
            type: `conseil`
        });
    }
}
// Conseil 2 : Atteindre les objectifs d'épargne
const objectifs  = await Objectifs.find({ user_id});
for (const objectif of objectifs) {
    if (objectif.montant > totalDepenses) {
        conseils.push({
            titre: `Atteignez votre objectif d'épargne de ${objectif.montant} €`,
            description: `Pour atteindre votre objectif, essayez d'économiser ${objectif.montant - totalDepenses} € ce mois-ci.`,
            type: 'conseil'
        });
    }
}
// créer un budget 
 if (depenses.length > 0 && !objectifs.length) {
    conseils.push({
        titre: 'Créer un budget mensuel',
        description: 'Un budget vous aidera à mieux contrôler vos dépenses et à atteindre vos objectifs financiers.',
        type: 'conseil'
    });
 }

 return conseils;
};

module.exports = { genererConseils };
