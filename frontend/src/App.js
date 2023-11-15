import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./pages/layouts/Layout.jsx";
import Error from "./pages/commons/Error.jsx";
import HomePage from "./pages/site/Index.jsx";
import EventsPage, { loader as eventsLoader } from "./pages/events/Index.jsx";
import NewEventPage from "./pages/events/Create.jsx";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./pages/events/View.jsx";
import EditEventPage from "./pages/events/Update.jsx";
import EventsLayout from "./pages/layouts/EventsLayout.jsx";
import { action as manipulateEventAction } from "./components/EventForm";
import NewsletterPage, {
  action as newsletterAction,
} from "./pages/commons/Newsletter.jsx";
import AuthenticationPage, {
  action as authAction,
} from "./components/Authentication.js";
import { action as logoutAction } from "./pages/commons/logout.js";
import { checkAuthLoader, getTokenLoader } from "./utils/auth.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    id: "root",
    loader: getTokenLoader,
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
          {
            path: "new",
            element: <NewEventPage />,
            loader: checkAuthLoader,
            action: manipulateEventAction,
          },
          {
            path: ":id",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                loader: checkAuthLoader,
                action: manipulateEventAction,
              },
            ],
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
