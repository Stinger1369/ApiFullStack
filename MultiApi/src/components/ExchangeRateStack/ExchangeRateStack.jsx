import React, { useEffect, useState } from 'react';
import './ExchangeRateStack.scss';

const ExchangeComponent = () => {
    const [exchangeData, setExchangeData] = useState(null);
    const apiKey = 'ed48e069d7473646a8e9d31e';
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
    
    useEffect(() => {
        // Fonction pour récupérer les données d'échange
        const fetchExchangeData = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`Erreur: ${response.status}`);
                }
                const data = await response.json();
                setExchangeData(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données d'échange:", error);
            }
        };

        fetchExchangeData();
    }, []);

    return (
        <div className="c-item exchange-component">
        {exchangeData ? (
            <div>
                {/* <p>Taux de change pour : {exchangeData.base_code}</p> */}
                {/* <p>Date : {exchangeData.time_last_update_utc}</p> */}
                <div>
                    <div className='title'>Taux de change</div>
                    <ul className="c-card exchange-list">
                        {Object.entries(exchangeData.conversion_rates).map(([currency, rate]) => (
                            <li key={currency}>{currency} : {rate}</li>
                        ))}
                    </ul>
                </div>
            </div>
        ) : (
            <p>Chargement des données...</p>
        )}
    </div>
    
    );
};

export default ExchangeComponent;
