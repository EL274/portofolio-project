import React,  { useState } from 'react';
import axios from 'axios'; 
import { useParams } from 'react-router-dom';

function ResetPassword() {
    const [ newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { newPassword });
            setMessage("Mot de passe réinitialisé avec succès")
        } catch (err) {
            setMessage("Erreur : Token invalide. ");
        }
    };
    return (
        <div>
            <h1>Réinitialiser le mot de passe</h1>
            <form onSubmit={handleSubmit}>
                <input
                  type="password"
                  placeholder="Nouveau mot de passe"
                  value={newPassword}
                  onChange= {(e) => setNewPassword(e.target.value)}
                  required
                />
                <buttom type="submit">Valider</buttom>                  
            </form>
        </div>
    );
}

export default ResetPassword;
