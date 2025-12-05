// 🧩 Simulación de autenticación eliminada
// Creamos un usuario ficticio para que la interfaz tenga algo que mostrar
const fakeKeycloak = {
  token: "fake-token",
  authenticated: true,
  tokenParsed: {
    preferred_username: "demo_user",
    given_name: "Demo",
    family_name: "User",
  },
  logout: () => {
    console.log("Simulando cierre de sesión");
  },
};

export default fakeKeycloak;
