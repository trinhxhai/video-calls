import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import PrivateWrapper from "./components/PrivateWrapper";

import "./App.css";

import { useAuth } from "./Context/AuthContext";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import Room from "./Pages/Room";
function App() {
  const { currentUser, logOut } = useAuth();

  return (
    <BrowserRouter>
      <div className="header">
        {currentUser ? (
          <>
            <span className="nav-container">
              <Link to="/">Home</Link>
            </span>
            <button
              onClick={() => {
                logOut();
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <span className="nav-container">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </span>
        )}
      </div>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PrivateWrapper>
              <HomePage />
            </PrivateWrapper>
          }
        />
        <Route
          exact
          path="/room/:roomKey"
          element={
            <PrivateWrapper>
              <Room />
            </PrivateWrapper>
          }
        />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
