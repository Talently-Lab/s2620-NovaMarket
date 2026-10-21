import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-light">
      <NavBar />

      <main className="grow w-full flex flex-col">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
