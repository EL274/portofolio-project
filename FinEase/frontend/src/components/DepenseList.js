import React, { useEffect, useState } from 'react';
import { getDepenses } from '../services/api';

const DepenseList = () => {
    const [ depenses, setDepenses] =useState([]);

    useEffect(() => {
    const fetchDepenses = async () => {
        const data = await getDepenses();
        setDepenses(data);
    };
    fetchDepenses();
}, []);

return (
    <div>
        <h2>Liste des dépenses</h2> 
        <ul>
            {depenses.map((depense) => (
                <li key={depense._id}>
                    {depense.nom} - {depense.montant}€
                </li>
            ))}
        </ul>
    </div>
);
};

export default DepenseList;
