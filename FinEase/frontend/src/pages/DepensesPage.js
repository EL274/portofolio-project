import React, { useEffect, useState } from 'react';
import { getDepenses } from '../services/api';
import DepenseList from '../components/DepenseList';

const DepenseList = () => {
    const [depenses, setDepenses] = useState([]);

    useEffect(() => {
        const fetchDepenses = async () => {
            const data = await getDepenses();
            setDepenses(data);
        };
        fectchDepenses();
    }, []);
    
    return (
        <div>
            <h2>Gestion des dépenses</h2>
            <DepenseList depenses={depenses}/>
        </div>
    );
};

export default DepensesPage;
