import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import About from "./pages/about";
import Home from "./pages/home";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import SignOut from "./pages/signOut";
import { useMode } from "./contexts/mode.context";
import { useEffect } from "react";
import Favorites from "./pages/favorites";
import Mycards from "./pages/mycards";
import ReferredCard from "./pages/ReferredCard";
import { useAuth } from "./contexts/auth.context";
import NewCard from "./pages/NewCard";
import EditCard from "./pages/editcard";
import EditUser from "./pages/editUser";
import Crm from "./pages/Crm";
import ReferredUser from "./pages/referredUser";
import ProtectedRoute from "./components/common/protectedRoutes";

function App() {
  const { theme } = useMode();
  const { user } = useAuth();

  useEffect(() => {
    document.body.setAttribute(
      "data-bs-theme",
      theme === "dark" ? "dark" : "light"
    );
  }, [theme]);

  return (
    <div className="app min-vh-100 d-flex flex-column gap-2 ">
      <Header />
      <main className="flex-fill">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-out" element={<SignOut />} />
          <Route path="/favourites" element={<Favorites />} />
          <Route
            path="/mycards"
            element={
              <ProtectedRoute onlyBiz>
                <Mycards />
              </ProtectedRoute>
            }
          />
          <Route path="/referredCard/:id" element={<ReferredCard />} />
          <Route
            path="/newCard"
            element={
              <ProtectedRoute onlyBiz>
                <NewCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute onlyBiz>
                <EditCard />
              </ProtectedRoute>
            }
          />
          <Route path="/user/:id" element={<EditUser />} />
          <Route
            path="/CRM"
            element={
              <ProtectedRoute onlyAdmin>
                <Crm />
              </ProtectedRoute>
            }
          />
          <Route path="/referredUser/:id" element={<ReferredUser />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
