# 🐾 Pet Center SPA - Gestión de Mascotas y Estancias

Este es un proyecto de una Single Page Application (SPA) en JavaScript Vanilla que permite a los usuarios registrarse, iniciar sesión y gestionar mascotas o estancias, dependiendo de su rol (cliente o trabajador). Utiliza `JSON Server` como backend simulado y `localStorage` para el manejo de sesión.

---

## 📁 Estructura del proyecto

- **/src**
  - **views/** → Vistas que retornan HTML como string
    - `login.js`
    - `register.js`
    - `customer.js` (dashboard del cliente)
    - `worker.js` (dashboard del trabajador)
    - `404.js`
  - **controllers/** → Lógica de cada vista
    - `login.js`
    - `register.js`
    - `dashboard.js` (elige vista por rol)
    - `customer.js`
    - `worker.js`
  - **services/**
    - `api.js` → contiene los endpoints de la API
  - `main.js` → punto de entrada de la SPA
  - `router.js` → rutas de la SPA
  - `style.css` → estilos opcionales

---

## 🔐 Roles y funcionalidades

### Cliente (`rolId: 2`)
- Registrar mascota
- Editar mascota
- Eliminar mascota

### Trabajador (`rolId: 1`)
- Ver mascotas de todos los clientes
- Registrar estancias (con fecha de ingreso y salida)

---

## 📦 Estructura del `db.json`

```json
{
  "users": [
    {
      "id": "uuid",
      "name": "nombre",
      "userName": "usuario",
      "email": "correo",
      "password": "clave",
      "rolId": 1 o 2
    }
  ],
  "pets": [
    {
      "id": "uuid",
      "name": "nombre mascota",
      "type": "perro, gato, etc.",
      "ownerId": "id del usuario dueño"
    }
  ],
  "stays": [
    {
      "id": "uuid",
      "petId": "id mascota",
      "workerId": "id trabajador",
      "startDate": "YYYY-MM-DD",
      "endDate": "YYYY-MM-DD"
    }
  ]
}
🧠 Flujo de funcionamiento
Registro
Se valida que el email o username no existan ya.

Se guarda en users.

Se asigna rolId: 2 por defecto (cliente).

Se guarda en localStorage como currentUser.

Login
Se busca por email.

Se compara la contraseña.

Si es correcta, se guarda el usuario en localStorage.

Rutas
/login y /register son públicas.

/dashboard es privada y se muestra diferente según rolId.

Si la ruta no existe, se muestra la vista 404.

🛡 Protección de rutas (SPA)
Todas las rutas están en router.js.

Si currentUser no existe y la ruta es privada, redirige a /login.

La SPA usa history.pushState() y window.dispatchEvent(new Event("popstate")) para cambiar de vista sin recargar.

💡 Funcionalidades por archivo
views/*.js
Cada archivo exporta una función render...() que retorna HTML como string.

controllers/*.js
Cada archivo exporta una función settings...() que se ejecuta después del render, agregando lógica como eventListeners, fetch, etc.

services/api.js
js
Copiar
Editar
export const endpointUsers = "http://localhost:3000/users";
export const endpointPets = "http://localhost:3000/pets";
export const endpointStays = "http://localhost:3000/stays";
export const endpointRoles = "http://localhost:3000/roles";
🚀 ¿Cómo correr el proyecto?
Instalar JSON Server si no lo tienes:

bash
Copiar
Editar
npm install -g json-server
En la raíz del proyecto, corre:

bash
Copiar
Editar
json-server --watch db.json --port 3000
Abre index.html con Live Server o un servidor local para SPA.

✅ Funcionalidades implementadas
SPA completa con rutas protegidas

Registro e inicio de sesión con validación

Dashboard dinámico por tipo de usuario

CRUD de mascotas para clientes

Registro de estancias para trabajadores

Manejo de sesión con localStorage

👨‍💻 Autor