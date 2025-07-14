import { endpointUsers } from "../services/api.js";

export function settingsLogin() {
  const $loginUser = document.getElementById("login-email");
  const $loginPassword = document.getElementById("login-password");
  const $form = document.getElementById("form-login");

  $form.addEventListener("submit", async function (event) {
    event.preventDefault();

    let response = await fetch(`${endpointUsers}?email=${$loginUser.value}`);
    let data = await response.json();

    if (data.length != 1) {
      alert("la cuenta no existe");
      return;
    }

    if (data[0].password === $loginPassword.value) {
      localStorage.setItem("currentUser", JSON.stringify(data[0]));
      history.pushState(null, null, "/dashboard");
      window.dispatchEvent(new Event("popstate"));
    }
  });
}