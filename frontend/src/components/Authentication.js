import { json, redirect } from "react-router-dom";
import AuthForm from "./AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const data = await request.formData();
  const formDataObject = Object.fromEntries(data.entries());
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode");

  if (mode !== "login" && mode !== "signup")
    throw json({ message: "Invalid mode" }, { status: 422 });

  let endpoint = `http://localhost:8080/${mode}`;

  let errorMessage =
    mode === "login"
      ? "An Error has occurred while creating the user"
      : "An Error has occurred while login";

  const response = await fetch(endpoint, {
    method: request.method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formDataObject),
  });

  if (response.status === 422 || response.status === 401) return response;

  if (!response.ok) {
    throw json({ message: errorMessage }, { status: 500 });
  }

  return redirect("/");
}
