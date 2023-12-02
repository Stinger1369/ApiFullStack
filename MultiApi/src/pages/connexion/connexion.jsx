import React, { useState } from 'react';

const Connexion = () => {
    const [utilisateur, setUtilisateur] = useState({
        email: '',
        motDePasse: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUtilisateur({
            ...utilisateur,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Envoyez les données de connexion au backend ici
        console.log(utilisateur);
        // Réinitialisez le formulaire après la connexion
        setUtilisateur({
            email: '',
            motDePasse: ''
        });
    };

    return (
        <div>
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={utilisateur.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input
                        type="password"
                        name="motDePasse"
                        value={utilisateur.motDePasse}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Connexion;
