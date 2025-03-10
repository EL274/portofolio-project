import React, { useEffect, useState } from 'react';
import { getObjectifs } from '../services/api';

const ObjectifsPage = () => {
    const  [objectifs, setObjectifs] =useState([]);

    useEffect(() => {
        const fetchObjectis = async () => {
            const data = await getObjectifs();
            setObjectifs(data);
        };
        fetchObjectifs()
    }, []);

    return (
        <div>
            <h2>Liste des objectifs</h2>
            <ul>
                {objectifs.map((objectif) => (
                  <li key={objectif._id}>
                    {objectif.nom} - {objectif.montant}€
                  </li>  
                ))}
            </ul>
        </div>
    );
};

export default ObjectifsPage;
