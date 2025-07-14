import { renderCustomer } from "../views/customer.js";
import { renderWorker } from "../views/worker.js";
import { settingsDashboardCustomer } from "./customer.js";
import { settingsDashboardWorker } from "./worker.js";

export function settingsDashboard() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    history.pushState(null, null, "/login");
    window.dispatchEvent(new Event("popstate"));
    return;
  }

  const app = document.getElementById("app");

  if (user.rolId === 1) {
    app.innerHTML = renderWorker();
    settingsDashboardWorker();
    // aquí puedes llamar funciones específicas si las necesitas
  } else {
    app.innerHTML = renderCustomer();
    settingsDashboardCustomer();
    // aquí puedes llamar funciones específicas si las necesitas
  }
}