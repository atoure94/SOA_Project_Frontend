'use client'

import React, { useEffect, useState } from 'react';

const LocalStorageDisplay: React.FC = () => {
    const [storedUsers, setStoredUsers] = useState<any[]>([]);
    const [storedOrders, setStoredOrders] = useState<any[]>([]);
    const [storedFormData, setStoredFormData] = useState<any[]>([]);

    useEffect(() => {
        // Récupérer les utilisateurs du localStorage
        const users = localStorage.getItem('users');
        if (users) {
            setStoredUsers(JSON.parse(users));
        }

        // Récupérer les commandes du localStorage
        const orders = localStorage.getItem('orders');
        if (orders) {
            setStoredOrders(JSON.parse(orders));
        }

        // Récupérer les données du formulaire du localStorage
        const formData = localStorage.getItem('formData');
        if (formData) {
            setStoredFormData(JSON.parse(formData));
        }
    }, []);

    return (
        <div className="container mx-auto px-4 py-10">

            <div>
                <h2 className="text-6xl text-black font-semibold mb-8">Commandes</h2>
                {storedOrders.length > 0 ? (
                    <div>
                        {storedOrders.map((order, index) => (
                            <div key={index} className="mb-4">
                                <p className={"text-black"}><strong>Nom d'utilisateur :</strong> {order.username}</p>
                                <p className={"text-black"}><strong>ID de commande :</strong> {order.orderId}</p>

                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Aucune commande trouvée dans le localStorage.</p>
                )}
            </div>


        </div>
    );
};

export default LocalStorageDisplay;
