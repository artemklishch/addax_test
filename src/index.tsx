import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CalendarContextProvider from "./contexts/calendar-context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <CalendarContextProvider>
    <App />
  </CalendarContextProvider>
);
