import React, { Fragment, useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../../components/MainNavigation";
import { getTokenExpiration } from "../../utils/auth";

const Layout = () => {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) return;

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "POST" });
      return;
    }

    const expiration = getTokenExpiration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "POST" });
    }, expiration);
  }, [token, submit]);

  return (
    <Fragment>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default Layout;
