import React, { useEffect, useState } from 'react';
import { getDepenses } from '../services/api';
import DepenseList from '../components/DepenseList';


const DepensesPage = () => {
    const [depenses, setDepenses] = useState([]);

    useEffect(() => {
        const fetchDepenses = async () => {
            try {
            const data = await getDepenses();
            setDepenses(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des dépenses :", error);
        }
    };
        fetchDepenses();
    }, []);
    
    return (
        <div>
            <h2>Gestion des dépenses</h2>
            <DepenseList depenses={depenses} />       </div>
    );
};

export default DepensesPage;
