import React, { useState } from 'react';
import { login } from '../services/api';

const loginPage = () => {
    const [email, setEmail] = userState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await login({ email, passeword });
        if (user) {
            // Rediriger vers la page d'accueil ou le tableau de bord
        }
    };
    
    return (
        <div>
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Se connecter</button>
            </form>
        </div>

    );
};

export default loginPage;
