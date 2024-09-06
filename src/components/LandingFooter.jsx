import LogoBanner from "../assets/logo_banner.svg";
import circleLeft from "../assets/circle-left.svg";
import circleRight from "../assets/circle-right.svg";

export default function LandingFooter() {
    return (
        <div>
            <div className="flex justify-between overflow-hidden">
                <img src={circleLeft} alt="circle-left" className="-ml-10 -mb-24"/>
                <img src={LogoBanner} alt="logo-banner" />
                <img src={circleRight} alt="circle-right" className="-mr-10 -mb-24"/>
            </div>
            <div className="bg-secondary text-white text-center py-8"> Copyright ©2024  </div>
        </div>
    )
}