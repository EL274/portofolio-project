import React, { useEffect, useState } from 'react';
import { getConseils } from '../services/api';

const Conseils = ({ userId}) => {
    const [conseils, setConseils] = useState([]);

    useEffect(() => {
        const fetchConseils = async () => {
            try {
            const data = await getConseils(userId);
            setConseils(data);
        } catch (error) {
            console.error("Error lors de la récupération des conseils :", error);
        }
    };
        fetchConseils();
    }, [userId]);

    return (
        <div>
           <h2>Conseils financiers</h2> 
           {conseils.length > 0 ? (
           <ul>
            {conseils.map((conseil) => (
               <li key={conseil._id}>{conseil.contenu}</li> 
            ))}
           </ul>
           ) :(
            <p>Aucun conseil disponible pour le moment.</p>
           )}
        </div>
    );
};

export default Conseils;
