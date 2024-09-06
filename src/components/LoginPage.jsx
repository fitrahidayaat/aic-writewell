import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import BookImg from "../assets/book.svg";

export default function LoginPage() {
    const navigate = useNavigate(); // Initialize navigate function
    const [errorMessage, setErrorMessage] = useState(''); // State to store error message

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Extract email and password from form
        const email = e.target[0].value;
        const password = e.target[1].value;

        const data = {
            email: email,
            password: password,
        };

        try {
            // Send POST request to login
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.error) {
                // If there's an error, set the error message in the state
                setErrorMessage(result.error);
            } else {
                // Success: Store the JWT token in localStorage
                localStorage.setItem('token', result.token); // Save token to localStorage
                
                // Redirect to home page after successful login
                navigate('/home');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred during login');
        }
    };

    return (
        <>
            <div className="flex max-h-screen text-secondary font-inter">
                <img src={BookImg} alt="" />
                <div className="flex flex-col justify-center items-center w-full">
                    <div className="w-96">
                        <div className="flex flex-col gap-2 mb-10">
                            <h1 className="text-3xl font-extrabold">Log In</h1>
                            <h2 className="text-accent">Please fill your information below</h2>
                        </div>

                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    placeholder="abc@gmail.com"
                                    id="email"
                                    className="border-2 rounded-lg px-2 py-2"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    placeholder="********"
                                    id="password"
                                    className="border-2 rounded-lg px-2 py-2"
                                    required
                                />
                            </div>

                            {/* Display error message here if it exists */}
                            {errorMessage && (
                                <div className="text-red-500 text-sm mt-2">
                                    {errorMessage}
                                </div>
                            )}

                            <div className="flex justify-end mt-6">
                                <button
                                    type="submit"
                                    className="bg-secondary px-8 py-4 text-white"
                                >
                                    Log In
                                </button>
                            </div>
                        </form>

                        <div className="flex justify-between mt-8">
                            <p className="text-accent">Don&apos;t have an account?</p>{" "}
                            <Link to="/signup" className="text-secondary hover:underline">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
