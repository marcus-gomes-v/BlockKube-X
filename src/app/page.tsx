import Blocks from "./components/blocks/blocks";
import Hero from "./components/ui/hero";

export default function Home() {
  return (
    <div className="pt-14">
      <Hero />
      <Blocks />
    </div>
  );
}
