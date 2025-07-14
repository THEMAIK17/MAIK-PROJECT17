import { settingsDashboard } from "./controllers/dashboard";
import { settingsLogin } from "./controllers/login";
import { settingsRegister } from "./controllers/register";
import { render404 } from "./views/404";
import { renderLogin } from "./views/login";
import { renderRegister } from "./views/register";

const routes= {
    "/":{
        showView: renderLogin(),
        afterRender: settingsLogin,
        private: false
    },
    "/login":{
        showView: renderLogin(),
        afterRender: settingsLogin,
        private: false
    },
    "/register":{
        showView: renderRegister(),
        afterRender: settingsRegister,
        private: false
    },
    "/dashboard":{
        showView:()=>"",
        afterRender:settingsDashboard ,
        private: true
    },
}


export function router(){
    const path= window.location.pathname || `/`; 
    const app = document.getElementById(`app`);
    const currentRoute= routes[path];

     if (currentRoute) {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    // 🔐 Si la ruta es privada y no hay usuario, redirigir a login
    if (currentRoute.private && !user) {
      history.pushState(null, null, "/login");
      window.dispatchEvent(new Event("popstate"));
      return;
    }

    // Mostrar la vista
    app.innerHTML = typeof currentRoute.showView === "function"
      ? currentRoute.showView()
      : currentRoute.showView;

    // Ejecutar afterRender si es función
    if (typeof currentRoute.afterRender === "function") {
      currentRoute.afterRender();
    }

  } else {
    app.innerHTML = render404();
  }
}



