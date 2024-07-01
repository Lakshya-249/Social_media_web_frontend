import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout1 from "./layouts/layout1.tsx";
import Layout2 from "./layouts/layout2.tsx";
import Creategroupchannel from "./Templates/creategroupchannel.tsx";
import MessageSend from "./Templates/messageSend.tsx";
import MessagesearchTemp from "./Templates/messagesearchTemp.tsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "",
        element: <Layout1 />,
      },
      {
        path: "message",
        element: <Layout2 />,
        children: [
          {
            path: "createroom",
            element: <Creategroupchannel />,
          },
          {
            path: "send",
            element: <MessageSend />,
          },
          {
            path: "search",
            element: <MessagesearchTemp />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
