import React, { useState } from 'react';

const Inscription = () => {
    const [utilisateur, setUtilisateur] = useState({
        nom: '',
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
        // Envoyez les données d'inscription au backend ici
        console.log(utilisateur);
        // Réinitialisez le formulaire après l'inscription
        setUtilisateur({
            nom: '',
            email: '',
            motDePasse: ''
        });
    };

    return (
        <div>
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom:</label>
                    <input
                        type="text"
                        name="nom"
                        value={utilisateur.nom}
                        onChange={handleChange}
                    />
                </div>
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
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
};

export default Inscription;
