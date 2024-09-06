import HeaderImg from '../assets/landing.svg';
export default function Header() {
    return (
        <>
            <div className="flex justify-between items-center px-36 font-merriweather py-48">
                <div className='max-w-3xl flex flex-col gap-10'>
                    <p className="font-black text-[#2B2B2B] text-7xl tracking-wide leading-snug">We help to build confidence in your IELTS writing</p>
                    <div>
                        <button className='bg-secondary text-white px-8 py-4 shadow-2xl'>See More</button>
                    </div>
                </div>
                <img src={HeaderImg} alt="" />
            </div>
        </>
    )
}