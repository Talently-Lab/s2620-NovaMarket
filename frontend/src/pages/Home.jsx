import { HeroBanner } from "../components/organisms/HeroBanner";
import { FeatureList } from "../components/organisms/FeatureList";
import { CategoryList } from "../components/organisms/CategoryList";
import { FeaturedProducts } from "../components/organisms/FeaturedProducts";

export const Home = () => {
  return (
    <div className="flex flex-col gap-10 w-full animate-fade-in max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <HeroBanner />
        <FeatureList />
        <CategoryList />
        <FeaturedProducts />
    </div>
  );
};
