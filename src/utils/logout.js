export const logout = () => {
  sessionStorage.removeItem("authToken");
};
