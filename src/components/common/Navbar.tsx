import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../stores/store";
import { logoutUser } from "../../stores/slices/authSlice";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  activePage?: "login" | "register";
  onChangePage?: (page: "login" | "register") => void;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, onChangePage }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 20px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          fontSize: "28px",
          cursor: "pointer",
          flex: 1,
        }}
        onClick={() => navigate(user ? "/dashboard" : "/")}
      >
        VocabApp
      </div>

      {!user ? (
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => onChangePage && onChangePage("login")}
            style={{
              padding: "8px 16px",
              borderRadius: "5px",
              border: "1px solid #4994dfff",
              cursor: "pointer",
              backgroundColor: activePage === "login" ? "#1976d2" : "#3395f8",
              color: "#fff",
            }}
          >
            Login
          </button>
          <button
            onClick={() => onChangePage && onChangePage("register")}
            style={{
              padding: "8px 16px",
              borderRadius: "5px",
              border: "1px solid #4caf50",
              cursor: "pointer",
              backgroundColor: activePage === "register" ? "#388e3c" : "#4caf50",
              color: "#fff",
            }}
          >
            Register
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span>Hi, {user.firstName}</span>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              borderRadius: "5px",
              border: "1px solid #f44336",
              cursor: "pointer",
              backgroundColor: "#f44336",
              color: "#fff",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
