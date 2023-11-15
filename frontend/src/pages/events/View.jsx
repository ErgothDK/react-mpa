import React from "react";
import { json, redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../../components/EventItem";
import { getAuthToken } from "../../utils/auth";

const EventDetailPage = () => {
  const data = useRouteLoaderData("event-detail");

  return <EventItem event={data.event} />;
};

export default EventDetailPage;

export async function loader({ request, params }) {
  const id = params.id;
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw json(
      { message: "An Error has occurred while loading the event" },
      { status: 500 }
    );
  } else {
    return response;
  }
}

export async function action({ request, params }) {
  const id = params.id;

  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
    headers: {
      Authorization: "Bearer " + getAuthToken(),
    },
  });

  if (!response.ok) {
    throw json(
      { message: "An Error has occurred while deleting the event" },
      { status: 500 }
    );
  }

  return redirect("/events");
}
