import React, { Fragment } from "react";
import MainNavigation from "../../components/MainNavigation";
import PageContent from "../../components/PageContent";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  let title = "An error occurred";
  let message = "Something went wrong";

  if (error.status === 404) {
    title = "Not Found";
    message = "The page or resource you requested was not found";
  }

  if (error.status === 500) {
    message = error.data.message;
  }

  return (
    <Fragment>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </Fragment>
  );
};

export default Error;
