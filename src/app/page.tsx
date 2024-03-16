import Blocks from "./components/blocks";
import Hero from "./components/ui/hero";

export default function Home() {
  return (
    <main className="flex flex-col items-center p-24 bg-transparent">
      <Hero />
      <Blocks />
    </main>
  );
}
