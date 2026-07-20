import api from "./api";

// ============================
// Upload Single Image
// ============================
export const uploadImage = async (imageFile) => {
  const formData = new FormData();

  formData.append("image", imageFile);

  const response = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ============================
// Upload Multiple Images
// ============================
export const uploadMultipleImages = async (imageFiles) => {
  const formData = new FormData();

  imageFiles.forEach((file) => {
    formData.append("images", file);
  });

  const response = await api.post("/upload/multiple", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ============================
// Delete Uploaded Image
// ============================
export const deleteImage = async (imageId) => {
  const response = await api.delete(`/upload/${imageId}`);

  return response.data;
};