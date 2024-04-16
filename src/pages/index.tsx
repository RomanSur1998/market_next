import { Home } from "@/views/home";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Main() {
  return (
    <>
      <Home />
    </>
  );
}
