// src/pages/confirmation.tsx

'use client'

import React from 'react';

const ConfirmationPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-6xl font-bold text-center mb-6 text-green-500">Commande Confirmée</h1>
            <div className="text-center text-lg text-gray-600">
                Merci pour votre commande ! Nous traitons votre demande et vous contacterons bientôt.
            </div>
        </div>
    );
};

export default ConfirmationPage;
