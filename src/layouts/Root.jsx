import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import DynamicTitle from "../components/DynamicTitle";

export default function Root() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />

      <DynamicTitle />
    </div>
  );
}
