import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import React, { useState } from 'react';
const LoginPage = () => {
    const [email, setEmail] = userState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {

        const user = await login({ email, password });
        if (user) {
            // Rediriger vers la page d'accueil ou le tableau de bord
            navigate('/'); //Redirige vers la page d'accuei après la connexion
        }
    } catch (err) {
        setError('Identifiants incorrects. Veuillez réessayer.');
    }
};
    return (
        <div>
            <h2>Connexion</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}> 
                <div>
                <label>Email :</label>
                <input
                 type="email"
                 placeholder="Email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required 
                />
                </div>
                <div>
                  <label>Mot de passe :</label>  
                <input
                 type="password"
                 placeholder="Mot de passe"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
                />
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default LoginPage;
