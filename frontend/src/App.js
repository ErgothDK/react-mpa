import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/layouts/Layout.jsx";
import Error from "./pages/commons/Error.jsx";
import HomePage from "./pages/site/Index.jsx";
import EventsPage, { loader as eventsLoader } from "./pages/events/Index.jsx";
import NewEventPage from "./pages/events/Create.jsx";
import EventDetailPage, {
  loader as eventLoader,
} from "./pages/events/View.jsx";
import EditEventPage from "./pages/events/Update.jsx";
import EventsLayout from "./pages/layouts/EventsLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          { path: "new", element: <NewEventPage /> },
          { path: ":id", element: <EventDetailPage />, loader: eventLoader },
          { path: ":id/edit", element: <EditEventPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
