import NavDashboard from "./NavDashboard";
import NavLeft from "./NavLeft";
import HistoryContent from "./HistoryContent";

export default function HistoryPage() {
    return (
        <>
            <NavDashboard />
            <div className="grid grid-cols-6">
                <div className="col-span-1">
                    <NavLeft currentPage="history" />
                </div>
                <div className="col-span-5">
                    <HistoryContent />
                </div>
            </div>
        </>
    );
}
