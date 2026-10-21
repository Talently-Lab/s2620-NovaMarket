import { HeroBanner } from "../../components/organisms/hero/HeroBanner";
import { CategoryList } from "../../components/organisms/CategoryList";
import { FeaturedProducts } from "../../components/organisms/FeaturedProducts";
import { FeatureList } from "../../components/organisms/FeatureList";

export const Home = () => {
  return (
    <div className="w-full flex flex-col">
      <HeroBanner />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 flex flex-col gap-20">
        <FeatureList />
        <FeaturedProducts />
        <CategoryList />
      </div>
    </div>
  );
};
