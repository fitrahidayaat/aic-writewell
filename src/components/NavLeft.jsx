import { Link, useNavigate  } from "react-router-dom";
import profilePicture from "../assets/profile_picture.svg";
import { useEffect, useState } from "react";
export default function NavLeft({ currentPage }) {
    const activeClass = "text-primary bg-primaryAccent px-10 py-5 border-r-4 border-primary";

    const navigate = useNavigate(); // Initialize navigate function

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/current-user', {
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
    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleLogout = () => {
        // Remove the JWT token from localStorage
        localStorage.removeItem('token');

        // Redirect to the login page or home page
        navigate('/login'); // Adjust the route as needed
    };
    return (
        <>
            <div className="font-inter text-accent flex flex-col justify-between shadow-lg h-screen py-10">
                <div className="flex flex-col justify-between font-semibold w-full">
                    <Link to="/home" className={currentPage=="home" ? activeClass : "px-10 py-5 transition hover:text-primary hover:bg-primaryAccent hover:border-r-4 hover:border-primary"}>Home</Link>
                    <Link to="/history" className={currentPage=="history" ? activeClass : "px-10 py-5 hover:text-primary hover:bg-primaryAccent hover:border-r-4 hover:border-primary"}>History</Link>
                    <hr className="my-4" />
                    <button className="text-left px-10 py-5 hover:text-primary hover:bg-primaryAccent hover:border-r-4 hover:border-primary" onClick={handleLogout}>Log out</button>
                </div>

                <div className="flex gap-6 px-10">
                    <div className="flex flex-col">
                        <h1 className="text-secondary font-semibold">{loading ? "loading" : currentUser.username}</h1>
                        <h2 className="text-accent">{loading ? "loading" : currentUser.email}</h2>
                    </div>
                </div>
            </div>
        </>
    );
}
