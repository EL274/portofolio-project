import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { updateProfile, logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const ProfileContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: ${(props) => props.$bg || "#007BFF"};
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background: ${(props) => props.$hover || "#0056b3"};
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUpdate = async () => {
    try {
      const updatedUser = await updateProfile({ name, email, password });
      setUser(updatedUser);
      alert("Profil mis à jour avec succès !");
    } catch (err) {
      setError("Erreur lors de la mise à jour du profil.");
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <ProfileContainer>
      <h2>Mon Profil</h2>
      <Avatar src="/assets/avatar.png" alt="Avatar" />

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Input type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} />
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Nouveau mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />

      <Button onClick={handleUpdate}>Mettre à jour</Button>
      <Button bg="#dc3545" hover="#a71d2a" onClick={handleLogout}>Déconnexion</Button>
    </ProfileContainer>
  );
};

export default Profile;
