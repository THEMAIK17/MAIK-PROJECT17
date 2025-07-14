
export function renderCustomer() {
    return `
      <main class="pets-container">
      <h2>Gestión de Mascotas</h2>

      <!-- Formulario para registrar o editar una mascota -->
      <form id="form-pet" class="pet-form">
        <input type="hidden" id="pet-id" />
        <input type="text" id="pet-name" placeholder="Nombre de la mascota" required />
        <input type="text" id="pet-type" placeholder="Tipo de mascota (perro, gato...)" required />
        <button type="submit">Guardar Mascota</button>
        <button type="button" id="cancel-pet-form" class="hidden">Cancelar</button>
      </form>

      <!-- Lista de mascotas registradas -->
      <section>
        <h3>Mis Mascotas</h3>
        <ul id="pet-list" class="pet-list">
          <!-- Aquí se insertarán las mascotas del usuario -->
        </ul>
      </section>

      <button id="logout">Cerrar sesión</button>
    </main>
  `;
}
