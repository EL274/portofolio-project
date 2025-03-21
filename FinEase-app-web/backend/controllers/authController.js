exports.getUserData =  (req, res) => {
    
    if (req.user) {
        res.json({user: req.user});
    }else{
        res.status(404).json({ message: "Utilisateur non trouvé" });
    }
};
