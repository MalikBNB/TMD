import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function AppLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-64px)] bg-gray-100 p-6">
        <Outlet />
      </main>
    </>
  );
}
