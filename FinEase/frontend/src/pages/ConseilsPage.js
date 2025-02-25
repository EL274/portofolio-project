import React, { useEffect, useState } from 'react';
import { getConseils } from '../services/api';

const ConseilsPage = () => {
    const [conseils, setConseils] = useState([]);

    useEffect(() => {
        const fetchConseils = async () => {
            const data = await getConseils();
            setConseils(data);
        };
        fetchConseils();
    }, []);

    return (
        <div>
           <h2>Conseils financiers</h2>  
           <ul>
            {conseils.map((conseil) => (
               <li key={conseil._id}>{conseil.contenu}</li> 
            ))}
           </ul>
        </div>
    );
};

export default ConseilsPage;
