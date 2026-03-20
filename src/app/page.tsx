import dynamic from "next/dynamic";

const HomeContent = dynamic(() =>
  import("@/components/pages/HomeContent").then((mod) => mod.HomeContent),
);

export default function Home() {
  return <HomeContent />;
}
