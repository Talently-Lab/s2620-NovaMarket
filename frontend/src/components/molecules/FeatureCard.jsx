
export const FeatureCard = ({ icon, title, description }) => {

    return (
        <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-xl flex-1 border border-gray-200">
            <div className="text-secondary">
                {icon}
            </div>

            <div className="flex flex-col">
                <h4 className="font-spartan font-bold text-sm text-primary">{title}</h4>
                <p className="font-inter text-xs text-gray-500 mt-0.5">{description}</p>
            </div>

        </div>
    );
};