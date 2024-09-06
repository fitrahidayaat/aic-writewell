import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // State to manage authentication status

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            
            if (token) {
                try {
                    const response = await fetch('http://localhost:3000/api/validate-token', { // Endpoint to validate token
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}` // Send token in the header
                        }
                    });

                    const result = await response.json();

                    if (response.ok) {
                        // Token is valid
                        setIsAuthenticated(true);
                    } else {
                        // Token is invalid or expired
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    console.error('Error validating token:', error);
                    setIsAuthenticated(false);
                }
            } else {
                // No token found
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        // Optionally, you can show a loading spinner while the authentication check is in progress
        return <div>Loading...</div>;
    }

    if (isAuthenticated === false) {
        // Redirect to login page if authentication fails
        return <Navigate to="/login" replace />;
    }

    // If authenticated, render the requested component
    return element;
};

export default ProtectedRoute;