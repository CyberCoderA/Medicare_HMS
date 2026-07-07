import { Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, cloneElement } from "react";

export default function ProtectedRoute({ page }) {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function checkAuth() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/users/findUserByUsername",
          {
            withCredentials: true,
            signal: controller.signal,
          }
        );

        setUserInfo(response.data ?? null);
        setIsAuthenticated(true);
      } catch (error) {
        if (
          error.name === "CanceledError" ||
          error.name === "AbortError"
        ) {
          return;
        }

        setUserInfo(null);
        setIsAuthenticated(false);
      } finally {
        if (!controller.signal.aborted) {
          setAuthChecked(true);
        }
      }
    }

    checkAuth();

    return () => controller.abort();
  }, []);

  if (!authChecked) return <div className="h-screen w-full flex items-center justify-center text-4xl italic">Loading...</div>;
  return isAuthenticated ? cloneElement(page, { userInfo }) : <Navigate to="/login" replace />;
}