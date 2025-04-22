import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Root() {
  return <div>
    <NavBar />
    <Outlet />
    <Footer />
  </div>;
}
