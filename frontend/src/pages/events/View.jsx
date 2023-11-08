import React, { Fragment } from "react";
import { useParams } from "react-router-dom";

const EventDetailPage = () => {
  const params = useParams();

  return (
    <Fragment>
      <h1>Event Detail Page</h1>
      <p>This event is the #{params.id} </p>
    </Fragment>
  );
};

export default EventDetailPage;
