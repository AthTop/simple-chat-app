import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-gray-200">Simple Chat</header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
