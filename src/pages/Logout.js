import React, { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";

export default function Logout() {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    // Reset user context
    setUser({
      id: null,
      isAdmin: null,
    });
  }, [setUser]);

  // Redirect back to login
  return <Navigate to="/login" />;
}
