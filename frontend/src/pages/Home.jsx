import { HeroBanner } from "../components/organisms/HeroBanner";
import { FeatureList } from "../components/organisms/FeatureList";

export const Home = () => {
  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in">
      <HeroBanner />
      <FeatureList />
    </div>
  );
};
