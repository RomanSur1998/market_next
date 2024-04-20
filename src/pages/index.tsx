import { FilterBar } from "@/entities/filter-bar";
import { Footer } from "@/entities/footer";
import { model } from "@/shared/effector/products-list/models";
import Home from "@/views/home/ui/home";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Main() {
  const { ref, inView } = useInView({
    threshold: 1,
  });
  const name = useUnit(model.$categoryName);
  useEffect(() => {
    if (inView && name === "all") {
      model.setLimitEvent();
    }
  }, [inView]);

  return (
    <>
      <FilterBar />
      <Home />
      <div ref={ref}></div>
      <Footer />
    </>
  );
}
