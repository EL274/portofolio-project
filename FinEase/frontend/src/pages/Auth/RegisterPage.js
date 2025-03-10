import React, { useState } from 'react';
import { register } from '../../services/api';  // Vérifie bien le chemin d'accès
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const user = await register({ nom, email, password });
        if (user) {
           navigate('/login') //Rediriger vers la page de connexion ou le tableau de bord
        }
    } catch (error) {
        console. error("Errorlors del'inscription :", error)
    }
};
    return (
        <div>
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                />
                <input
                 type="email"
                 placeholder="Email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                />
                <input
                 type="password"
                 placeholder="Mot de passe"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
};
 
export default RegisterPage;
