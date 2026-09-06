import ReactDOM from "react-dom/client";
import App from "./Part2/part2_exerciseb.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only javascript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

ReactDOM.createRoot(document.getElementById("root")).render(
  <App notes={notes} />,
);
