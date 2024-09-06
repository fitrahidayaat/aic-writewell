import CommunityCard from "./CommunityCard";

export default function Community() {
    return (
        <>
            <div className="flex flex-col gap-10 font-inter px-36 justify-center items-center text-secondary mb-40" id="community">
                <div className="flex flex-col items-center gap-2">
                    <p className="max-w-sm font-semibold text-4xl text-center">
                        Sharpen Your Skills, Boost Your Score
                    </p>
                    <p className="text-accent text-center">What we provide?</p>
                </div>
                <div className="flex justify-around gap-24">
                    <CommunityCard
                        title="Band Score Prediction"
                        description="By evaluating aspects such as structure, vocabulary, grammar, and coherence, you’ll receive an estimated score, allowing you to focus on the areas that need improvement."
                    ></CommunityCard>
                    <CommunityCard
                        title="Grammar Checking"
                        description="From refining word choice to improving argument structure, it helps you create a stronger essay. You'll also receive high-quality sample essays as writing references that meet IELTS standards"
                    ></CommunityCard>
                    <CommunityCard
                        title="Topic Relevance Detection"
                        description="This feature ensures your essay stays on topic, a key factor in IELTS assessment. It helps prevent mistakes like straying from the theme, which can lower your band score."
                    ></CommunityCard>
                </div>
            </div>
        </>
    );
}
