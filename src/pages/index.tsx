import { FilterBar } from "@/entities/filter-bar";
import { Footer } from "@/entities/footer";
import Home from "@/views/home/ui/home";

export default function Main() {
  return (
    <>
      <FilterBar />
      <Home />
      <Footer />
    </>
  );
}
