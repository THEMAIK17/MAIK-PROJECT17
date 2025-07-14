import { endpointUsers } from "../services/api";

export function settingsRegister() {
  const $form = document.getElementById("form-register");

  const $registerName = document.getElementById("register-name");
  const $registerUser = document.getElementById("register-username");
  const $registerEmail = document.getElementById("register-email");
  const $registerPassword = document.getElementById("register-password");

  $form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // 👉 Validar si ya existe el email o username
    const exists = await existUser($registerEmail, $registerUser);
    if (exists) return;

    const newUser = {
      name: $registerName.value,
      userName: $registerUser.value,
      email: $registerEmail.value,
      password: $registerPassword.value,
      rolId: 2
    };

    try {
      const response = await fetch(endpointUsers, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(newUser)
      });

      if (response.status === 201) {
        alert("Usuario registrado correctamente");
        const savedUser = await response.json();
        localStorage.setItem("currentUser", JSON.stringify(savedUser));
        history.pushState(null, null, "/dashboard");
        window.dispatchEvent(new Event("popstate"));
      } else {
        alert("Reintente más tarde");
        throw new Error("Error en la petición");
      }
    } catch (error) {
      console.error(error.message);
    }
  });
}

// ✅ Función para validar email y username duplicados
async function existUser($registerEmail, $registerUser) {
  const response = await fetch(endpointUsers);
  const users = await response.json();

  const emailExists = users.some(user => user.email === $registerEmail.value);
  const userExists = users.some(user => user.userName === $registerUser.value);

  if (emailExists) {
    alert("Email ya registrado");
    return true;
  } else if (userExists) {
    alert("Nombre de usuario ya existe");
    return true;
  }

  return false;
}