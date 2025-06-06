import FeatureYapp from "@/components/home/feature_yapp";
import JoinNow from "@/components/home/join_now";
import Main from "@/components/home/main";
import SecondSection from "@/components/home/second_section";

export default function Home() {
  return (
    <div className="text-white">
      <Main />
      <SecondSection />
      <FeatureYapp />
      <JoinNow />
      <p className="font-urbanis text-center py-12">Copyright © 2024 Materikuy.ai</p>
    </div>
  );
}
