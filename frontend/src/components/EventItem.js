import { Link, useLoaderData, useSubmit } from "react-router-dom";
import classes from "./EventItem.module.css";

function EventItem({ event }) {
  const submit = useSubmit();
  const token = useLoaderData("root");

  function startDeleteHandler() {
    const confirm = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (confirm) {
      submit(null, { method: "delete" });
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        {token && <Link to="edit">Edit</Link>}
        {token && <button onClick={startDeleteHandler}>Delete</button>}
      </menu>
    </article>
  );
}

export default EventItem;
