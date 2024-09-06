import React, { useState, useEffect } from 'react';
import { Link, useNavigate  } from "react-router-dom";
import repeatImg from "../assets/repeat.svg";
import questions from "../data/questions";

export default function MainContent() {
    const [seconds, setSeconds] = useState(2400); // Initial countdown time (e.g., 40 minutes = 2400 seconds)
    const [isSubmitting, setIsSubmitting] = useState(false); // To handle form submission state
    const [isTimerActive, setIsTimerActive] = useState(true); // To control the timer
    const [text, setText] = useState(''); // To store the text input
    const [index, setIndex] = useState(Math.floor(Math.random() * questions.length)); // Random question index
    const navigate = useNavigate(); // Initialize navigate function

    // Function to handle form submission
    async function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);
        // Your form submission logic here

        try{
            const response = await fetch('http://localhost:3000/api/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ "essay" : text, "question": questions[index]})
            });

            const result = await response.json();

            navigate(`/result?history=${result.id}`); // Redirect to the result page
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during submission');
        } finally {
            setIsSubmitting(false);
            setIsTimerActive(false); // Stop the timer
            setSeconds(2400); // Reset the timer
        }
    }

    // Countdown timer effect
    useEffect(() => {
        let timer;

        if (isTimerActive && seconds > 0 && !isSubmitting) {
            timer = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);
        } else if (seconds === 0) {
            // Automatically submit the form when the timer reaches zero
            handleSubmit(new Event('submit'));
        }

        // Clear interval on component unmount or when timer state changes
        return () => clearInterval(timer);
    }, [seconds, isTimerActive, isSubmitting]);

    // Start the timer
    const startTimer = () => {
        setIsTimerActive(true);
    };

    // Reset the timer and stop it
    const resetTimer = () => {
        setIsTimerActive(true);
        setSeconds(2400); // Reset to initial time
        setIsSubmitting(false); // Reset submission state
        setIndex(Math.floor(Math.random() * questions.length)); // Randomize question
    };

    // Format time in mm:ss
    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <>
            <div className="px-16 py-16 flex gap-10 justify-between font-merriweather text-secondary">
                <div className="min-w-10 max-w-lg">
                    <h1 className="font-bold text-xl">
                        Write about the following topic:
                    </h1>
                    <p className="mb-8 mt-10">
                        {questions[index]}
                    </p>
                    
                    <button className="my-10" onClick={resetTimer}>
                        <img src={repeatImg} alt="" className="bg-primary p-2 rounded-lg" />
                    </button>
                    <br />
                    <div className="bg-secondary rounded text-white py-4 w-32 text-center shadow-md">
                        {formatTime(seconds)}
                    </div>

                </div>

                <div>
                    <form action="" className="flex flex-col" onSubmit={handleSubmit}>
                        <textarea
                            name=""
                            id=""
                            cols="80"
                            rows="25"
                            placeholder="Write your answer here..."
                            required
                            className="border p-4 rounded-lg"
                            onChange={(e) => setText(e.target.value)}
                        ></textarea>
                        {isTimerActive && (
                            <button className="bg-secondary w-72 py-2 mt-8 rounded text-white" type="submit">
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}
