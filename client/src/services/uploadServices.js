import api from "./api";

export const uploadProfileImage = (file) => {
  let formData;
  if (file instanceof FormData) {
    formData = file;
  } else {
    formData = new FormData();
    formData.append("profile", file);
  }

  return api.post("/upload/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadFavicon = (file) => {
  const formData = new FormData();
  formData.append("favicon", file);

  return api.post("/upload/favicon", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadLogo = (file) => {
  const formData = new FormData();
  formData.append("logo", file);

  return api.post("/upload/logo", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getImageUrl = (url) => {
  if (!url) return "";
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("data:") ||
    url.startsWith("blob:")
  ) {
    return url;
  }
  const apiUrl = import.meta.env.VITE_API_URL;
  const baseUrl = apiUrl.replace(/\/api\/?$/, "");
  const cleanPath = url.startsWith("/") ? url : `/${url}`;
  return `${baseUrl}${cleanPath}`;
};

export const updateBrowserFavicon = (faviconUrl) => {
  if (!faviconUrl) return;
  const fullUrl = getImageUrl(faviconUrl);
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = fullUrl;
};

