import { useEffect, useState } from "react";
import repeatImg from "../assets/repeat.svg";
import { Link } from "react-router-dom";

export default function ResultContent() {
    // get the parameter from the url
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get("history"));
    const [history, setHistory] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/history/${urlParams.get(
                        "history"
                    )}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch history");
                }

                const data = await response.json();
                console.log(data);
                setHistory(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return (
        <>
            <div className="px-10 py-16 flex gap-10 justify-between font-merriweather text-secondary">
                <div className="min-w-10 max-w-lg">
                    <h1 className="font-bold text-xl">
                        Question:
                    </h1>
                    <p className="mb-8 mt-10">
                        {history.question}
                    </p>

                    <Link to="/home" className="my-10">
                        <img
                            src={repeatImg}
                            alt=""
                            className="bg-primary p-2 rounded-lg"
                        />
                    </Link>

                    <div className="bg-secondary rounded text-white px-8 py-6 w-32 text-center shadow-md mt-10">
                        --:--
                    </div>

                    <div className="mt-10 font-bold text-lg">Band score prediction : {Math.round(history.score * 4) / 4}/9</div>
                </div>

                <div>
                    <form action="">
                        <textarea
                            readOnly
                            name=""
                            id=""
                            cols="80"
                            rows="25"
                            value={loading ? "Loading..." : history.content}
                            className="border p-4 rounded-lg"
                        ></textarea>
                    </form>
                </div>
            </div>
        </>
    );
}
