import React, { Fragment } from "react";
import EventsNavigation from "../../components/EventsNavigation";
import { Outlet } from "react-router-dom";

const EventsLayout = () => {
  return (
    <Fragment>
      <EventsNavigation />
      <Outlet />
    </Fragment>
  );
};

export default EventsLayout;
