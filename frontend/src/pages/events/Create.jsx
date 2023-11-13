import React from "react";
import EventForm from "../../components/EventForm";
import { json, redirect } from "react-router-dom";

const NewEventPage = () => {
  return <EventForm />;
};

export default NewEventPage;

export async function action({ request, params }) {
  const data = await request.formData();
  const formDataObject = Object.fromEntries(data.entries());

  const response = await fetch("http://localhost:8080/events", {
    method: request.method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formDataObject),
  });

  if (response.status === 422) return response;

  if (!response.ok) {
    throw json(
      { message: "An Error has occurred while creating the event" },
      { status: 500 }
    );
  }

  return redirect("/events");
}
