import NavDashboard from "./NavDashboard";
import NavLeft from "./NavLeft";
import MainContent from "./MainContent";

export default function HomePage() {


    return (
        <>
            <NavDashboard />
            <div className="grid grid-cols-6">
                <div className="col-span-1">
                <NavLeft currentPage="home" />

                </div>
                <div className="col-span-5">
                    <MainContent />

                </div>

            </div>
            {/* <div className="h-[1000px]"></div> */}
        </>
    )
}