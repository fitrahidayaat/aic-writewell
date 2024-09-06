import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function HistoryContent() {
    const [histories, setHistories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/history",
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
                setHistories(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <div className=" w-full flex justify-center font-inter px-16 py-16">
                <div className="rounded border shadow-md w-full px-16 py-16">
                    <h1 className="text-2xl font-bold mb-10">Essay History</h1>
                    <div className="table w-full ... ">
                        <div className="table-header-group bg-[#f9fafc] font-semibold">
                            <div className="table-row">
                                <div className="table-cell text-left ... px-10 py-4 border-b">
                                    Question
                                </div>
                                <div className="table-cell text-left ... px-10 py-4 border-b">
                                    Date
                                </div>
                                <div className="table-cell text-left ... px-10 py-4 border-b">
                                    Band Score
                                </div>
                            </div>
                        </div>
                        <div className="table-row-group">
                            {histories.map((history, index) => {
                                return (
                                    <Link
                                        to={`/result?history=${history.id}`}
                                        key={index}
                                        className="table-row"
                                    >
                                        <div className="table-cell ... px-10 py-4 border-b">
                                            {history.question}
                                        </div>
                                        <div className="table-cell ... px-10 py-4 border-b">
                                            {new Date(history.createdAt).toLocaleString()}
                                        </div>
                                        <div className="table-cell ... px-10 py-4 border-b">
                                            {Math.round(history.score * 4) / 4}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
