import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";

import classes from "./EventForm.module.css";
import { getAuthToken } from "../utils/auth";

function EventForm({ method, event }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("/events");
  }

  return (
    <Form method={method} className={classes.form}>
      {data &&
        data.errors &&
        Object.values(data.errors).map((err) => <li key={err}>{err}</li>)}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={event ? event.title : ""}
          required
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          defaultValue={event ? event.image : ""}
          required
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          defaultValue={event ? event.date : ""}
          required
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          defaultValue={event ? event.description : ""}
          required
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({ request, params }) {
  const data = await request.formData();
  const formDataObject = Object.fromEntries(data.entries());
  let endpoint = "http://localhost:8080/events";
  let errorMessage = "An Error has occurred while creating the event";

  if (request.method === "PATCH") {
    endpoint += "/" + params.id;
    errorMessage = "An Error has occurred while updating the event";
  }

  const response = await fetch(endpoint, {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getAuthToken(),
    },
    body: JSON.stringify(formDataObject),
  });

  if (response.status === 422) return response;

  if (!response.ok) {
    throw json({ message: errorMessage }, { status: 500 });
  }

  return redirect("/events");
}
