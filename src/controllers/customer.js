import { endpointPets } from "../services/api";

export function settingsDashboardCustomer() {


  const user = JSON.parse(localStorage.getItem("currentUser"));
  
  if (!user || user.rolId !== 2) {
    history.pushState(null, null, "/login");
    window.dispatchEvent(new Event("popstate"));
    return;
  }

  const $form = document.getElementById("form-pet");
  const $name = document.getElementById("pet-name");
  const $type = document.getElementById("pet-type");
  const $id = document.getElementById("pet-id");
  const $cancelBtn = document.getElementById("cancel-pet-form");
  const $list = document.getElementById("pet-list");
  const $logout = document.getElementById("logout");

  // Cargar mascotas
  async function loadPets() {
    const res = await fetch(`${endpointPets}?ownerId=${user.id}`);
    const pets = await res.json();

    $list.innerHTML = pets.map(pet => `
      <li>
        <strong>${pet.name}</strong> - ${pet.type}
        <button data-id="${pet.id}" class="edit">Editar</button>
        <button data-id="${pet.id}" class="delete">Eliminar</button>
      </li>
    `).join("");
  }

  // Guardar mascota
  $form.onsubmit = async (e) => {
    e.preventDefault();

    const petData = {
      name: $name.value.trim(),
      type: $type.value.trim(),
      ownerId: user.id
    };

    if (!$name.value || !$type.value) {
      alert("Por favor llena todos los campos");
      return;
    }

    if ($id.value) {
      // Editar
      await fetch(`${endpointPets}/${$id.value}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(petData)
      });
      alert("Mascota actualizada");
    } else {
      // Crear
      await fetch(endpointPets, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(petData)
      });
      alert("Mascota registrada");
    }

    $form.reset();
    $id.value = "";
    $cancelBtn.classList.add("hidden");
    loadPets();
  };

  // Cancelar edición
  $cancelBtn.onclick = () => {
    $form.reset();
    $id.value = "";
    $cancelBtn.classList.add("hidden");
  };

  // Eventos de editar y eliminar
  $list.onclick = async (e) => {
    const id = e.target.dataset.id;

    if (e.target.classList.contains("edit")) {
      const res = await fetch(`${endpointPets}/${id}`);
      const pet = await res.json();

      $name.value = pet.name;
      $type.value = pet.type;
      $id.value = pet.id;
      $cancelBtn.classList.remove("hidden");

    } else if (e.target.classList.contains("delete")) {
      if (confirm("¿Deseas eliminar esta mascota?")) {
        await fetch(`${endpointPets}/${id}`, { method: "DELETE" });
        alert("Mascota eliminada");
        loadPets();
      }
    }
  };

  // Cerrar sesión
  $logout.onclick = () => {
    localStorage.removeItem("currentUser");
    history.pushState(null, null, "/login");
    window.dispatchEvent(new Event("popstate"));
  };

  loadPets();
}