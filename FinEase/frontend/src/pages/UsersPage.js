import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/api';

const UserPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getUsers();
            setUsers(data);
        };
        fetchUsers();
    }, []);
    return (
         <div>
            <h2>Liste des users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>{user.nom}</li>
                )
            )}
            </ul>
         </div>
    );
};

export default UserPage;
