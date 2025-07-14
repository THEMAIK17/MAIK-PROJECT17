import { endpointPets, endpointUsers, endpointStays } from "../services/api.js";

export async function settingsDashboardWorker() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user || user.rolId !== 1) {
    location.href = "/login";
    return;
  }

  const container = document.getElementById("all-pets-container");
  const logoutBtn = document.getElementById("logout");

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    history.pushState(null, null, "/login");
    window.dispatchEvent(new Event("popstate"));
  });

  try {
    const [resPets, resUsers] = await Promise.all([
      fetch(endpointPets),
      fetch(endpointUsers)
    ]);
    const pets = await resPets.json();
    const users = await resUsers.json();

    container.innerHTML = "";

    if (pets.length === 0) {
      container.innerHTML = "<p>No hay mascotas registradas.</p>";
      return;
    }

    pets.forEach(pet => {
      const owner = users.find(u => u.id === pet.ownerId);
      const petCard = document.createElement("div");
      petCard.classList.add("pet-card");

      petCard.innerHTML = `
        <strong>${pet.name}</strong> (${pet.type})<br>
        Dueño: ${owner ? owner.name : "Desconocido"}<br>
        
        <form class="stay-form" data-pet-id="${pet.id}">
          <label>Fecha de ingreso:
            <input type="date" class="stay-start" required />
          </label><br>
          <label>Fecha de salida:
            <input type="date" class="stay-end" required />
          </label><br>
          <button type="submit">Registrar estancia</button>
        </form>
        <hr>
      `;

      container.appendChild(petCard);
    });

    // Escuchar el envío de cualquier formulario de estancia
    container.addEventListener("submit", async (e) => {
      e.preventDefault();

      const form = e.target;
      if (!form.matches(".stay-form")) return;

      const petId = form.dataset.petId;
      const startDate = form.querySelector(".stay-start").value;
      const endDate = form.querySelector(".stay-end").value;

      if (endDate < startDate) {
        alert("La fecha de salida no puede ser anterior a la de ingreso.");
        return;
      }

      const stay = {
        petId,
        workerId: user.id,
        startDate,
        endDate
      };

      try {
        const res = await fetch(endpointStays, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(stay)
        });

        if (res.ok) {
          alert("Estancia registrada correctamente.");
          form.reset();
        } else {
          alert("No se pudo registrar la estancia.");
        }
      } catch (error) {
        console.error("Error al registrar estancia:", error);
        alert("Ocurrió un error.");
      }
    });

  } catch (error) {
    console.error("Error al cargar mascotas:", error);
    container.innerHTML = "<p>Error al mostrar las mascotas.</p>";
  }
}