import { redirect } from "react-router-dom";

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  const expiration = getTokenExpiration();

  if (expiration < 0) return "EXPIRED";

  return token;
}

export function getTokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) return redirect("/auth");

  return null;
}

export function getTokenExpiration() {
  const expiration = localStorage.getItem("expires");
  const expirationDate = new Date(expiration);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}
