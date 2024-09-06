export default function CommunityCard({ title, description }) {
    return (
        <>
            <div className="bg-pink max-w-xs px-8 py-8 text-center flex flex-col gap-4 font-inter rounded shadow-md">
                <h1 className="text-secondary text-3xl font-extrabold"> {title}</h1>
                <p className="text-accent text-sm">{description}</p>
            </div>
        </>
    );
}
