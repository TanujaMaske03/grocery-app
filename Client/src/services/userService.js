import api from "./api";

// ============================
// Get User Profile
// ============================
export const getUserProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

// ============================
// Update User Profile
// ============================
export const updateUserProfile = async (userData) => {
  const response = await api.put("/users/profile", userData);
  return response.data;
};

// ============================
// Change Password
// ============================
export const changePassword = async (passwordData) => {
  const response = await api.put("/users/change-password", passwordData);
  return response.data;
};

// ============================
// Delete User Account
// ============================
export const deleteUserAccount = async () => {
  const response = await api.delete("/users/profile");
  return response.data;
};