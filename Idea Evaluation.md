# Idea Evaluation - Application de gestion de budget étudiant

## 1. Objectifs
- Évaluer les idées générées lors du brainstorming.
- Identifier les idées les plus pertinentes et réalisables.
- Anticiper les risques et contraintes associés à chaque idée.

---

## 2. Étapes d'évaluation

### **a) Définir des critères d’évaluation**
Liste des critères pour évaluer chaque idée :
1. **Faisabilité** :
   - L'idée est-elle techniquement réalisable avec les ressources disponibles ?
   - Exemple : Dispose-t-on des compétences nécessaires pour développer cette fonctionnalité ?
2. **Impact potentiel** :
   - Résout-elle un problème critique pour les étudiants ?
   - Exemple : Améliore-t-elle réellement la gestion budgétaire quotidienne ?
3. **Alignement technique** :
   - L'idée s’intègre-t-elle bien dans l’architecture existante de l’application ?
   - Exemple : Utilise-t-elle des technologies compatibles avec notre stack (Python/Flask) ?
4. **Scalabilité** :
   - L’idée peut-elle évoluer facilement si l'application gagne en popularité ?
5. **Coût** :
   - Quels sont les coûts associés au développement et à la maintenance de cette idée ?

### **b) Utiliser un système de notation**
Attribuer une note de 1 (faible) à 5 (élevée) pour chaque critère.
- **Rubrique de notation** :
  - **1** : Ne répond pas au critère.
  - **2** : Répond partiellement au critère.
  - **3** : Répond au critère de manière acceptable.
  - **4** : Répond bien au critère.
  - **5** : Excelle sur ce critère.

Exemple de tableau d'évaluation :

| Idée                     | Faisabilité | Impact | Alignement technique | Scalabilité | Coût | Score total |
|--------------------------|-------------|--------|-----------------------|-------------|------|-------------|
| Notifications automatiques | 5           | 4      | 5                     | 4           | 3    | 21          |
| Graphiques interactifs    | 3           | 5      | 4                     | 4           | 2    | 18          |
| Analyse budgétaire AI     | 2           | 5      | 3                     | 5           | 1    | 16          |

### **c) Identifier les risques et contraintes**
Pour chaque idée, identifier :
1. **Risques** :
   - Manque de temps ou de ressources pour développer.
   - Dépendance à des outils externes ou des technologies non maîtrisées.
2. **Contraintes** :
   - Nécessité d’une formation technique.
   - Budget limité pour développer certaines fonctionnalités.

Exemple :
- **Idée : Notifications automatiques.**
  - **Risques :** Complexité de mise en œuvre si on souhaite intégrer des notifications basées sur la géolocalisation.
  - **Contraintes :** Dépendance à une API de notifications payante.

---

## 3. Synthèse et priorisation

### Étapes :
1. **Totaliser les scores** :
   - Additionne les notes pour chaque idée et classe-les par ordre décroissant.
2. **Sélectionner les idées prioritaires** :
   - Identifie les 2 ou 3 idées les plus pertinentes et réalisables à court terme.
3. **Planifier les prochaines étapes** :
   - Développement d’un prototype pour tester la faisabilité des idées prioritaires.
   - Recherche d’alternatives ou de solutions pour les idées à risque élevé.

---

## Exemple d’application

### **Idée sélectionnée : Notifications automatiques**
1. **Évaluation** :
   - Faisabilité : 5 (Facile avec une API comme Firebase Cloud Messaging).
   - Impact : 4 (Très utile pour encourager les étudiants à suivre leur budget).
   - Alignement technique : 5 (S’intègre bien dans l’application existante).
   - Scalabilité : 4 (Peut évoluer avec des notifications personnalisées).
   - Coût : 3 (API gratuite avec limites).
2. **Risques** :
   - Problèmes de compatibilité avec certains appareils.
3. **Plan d’action** :
   - Prototype : Intégrer une notification de rappel quotidien.
   - Test utilisateur : Évaluer la pertinence et les retours.

---

## Annexes
### Outils recommandés :
- **Tableaux d’évaluation** : Google Sheets, Notion, Excel.
- **Gestion de projet** : Trello, Asana.
- **APIs utiles** : Firebase, Twilio, Pushbullet.

### Liens utiles :
- [Guide sur la faisabilité des projets](#).
- [Ressources techniques sur les notifications push](#).
