import  React, { useEffect, useState } from 'react';
import  { getCategories } from '../services/api';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data);
        };
        fetchCategories();
    }, []);

    return (
        <div>
            <h2>Liste des catégories</h2>
            <ul>
                {categories.map((categorie) => (
                    <li key={categorie._id}>{categorie.nom}</li>

                ))}
            </ul>
        </div>
    );
};

export default CategoriesPage;
