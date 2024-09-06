import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import BookImg from "../assets/book.svg";

export default function SignupPage() {
    const navigate = useNavigate(); // Initialize navigate function
    const [errorMessage, setErrorMessage] = useState(''); // State to store error message

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        const data = {
            username: name,
            email: email,
            password: password,
        };

        try {
            // Send POST request to sign up
            const response = await fetch("http://localhost:3000/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();

            if (result.error) {
                // If there's an error, set the error message in the state
                setErrorMessage(result.error);
            } else {
                // Success: Store the JWT token in localStorage
                localStorage.setItem("token", result.token); // Save token to localStorage

                // Redirect to home page after successful registration
                navigate("/home");
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("An error occurred during signup");
        }
    };

    return (
        <>
            <div className="flex max-h-screen text-secondary font-inter">
                <img src={BookImg} alt="" />
                <div className="flex flex-col justify-center items-center w-full">
                    <div className=" w-96">
                        <div className="flex flex-col gap-2 mb-10">
                            <h1 className="text-3xl font-extrabold">Sign Up</h1>
                            <h2 className="text-accent">
                                Please fill your information below
                            </h2>
                        </div>

                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    id="name"
                                    required
                                    className="border-2 rounded-lg px-2 py-2"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    placeholder="abc@gmail.com"
                                    id="email"
                                    required
                                    className="border-2 rounded-lg px-2 py-2"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    placeholder="********"
                                    id="password"
                                    required
                                    minLength="8"
                                    className="border-2 rounded-lg px-2 py-2"
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
                                    Sign Up
                                </button>
                            </div>
                        </form>

                        <div className="flex justify-between mt-8">
                            <p className="text-accent">Already have an account?</p>{" "}
                            <Link
                                to="/login"
                                className="text-secondary hover:underline"
                            >
                                Log In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
