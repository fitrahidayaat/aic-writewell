import React, { createContext, useState, useEffect } from 'react';

// Create Context
const UserContext = createContext();

// Create Provider Component
const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await fetch('/api/current-user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Send token in the header
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user');
                }

                const data = await response.json();
                setCurrentUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, []);

    return (
        <UserContext.Provider value={{ currentUser, loading, error }}>
            {children}
        </UserContext.Provider>
    );
};

// Create a custom hook for easier consumption of context
const useUser = () => React.useContext(UserContext);

export { UserProvider, useUser };
