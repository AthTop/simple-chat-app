import { Outlet } from "react-router";
import { logout } from "../services/api";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const { user, setUser, loading } = useAuth();
  const onClick = async () => {
    try {
      await logout();
      setUser(null);
    } catch (e) {}
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-gray-200">
        <div>Simple Chat</div>
        {user && (
          <div>
            <h1>hi {user.username}</h1>
            <button onClick={onClick}>Logout</button>
          </div>
        )}
      </header>
      <main className="flex-1 p-4">
        {loading ? <div>Loading...</div> : <Outlet />}
      </main>
    </div>
  );
};

export default Layout;
