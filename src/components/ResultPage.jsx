import NavDashboard from "./NavDashboard";
import NavLeft from "./NavLeft";
import ResultContent from "./ResultContent";

export default function ResultPage() {
    return (
        <>
            <NavDashboard />
            <div className="grid grid-cols-6">
                <div className="col-span-1">
                <NavLeft currentPage="home" />

                </div>
                <div className="col-span-5">
                    <ResultContent />

                </div>

            </div>
            {/* <div className="h-[1000px]"></div> */}
        </>
    )
}