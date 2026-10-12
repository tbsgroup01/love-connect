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
  if (!url || typeof url !== "string") return "";
  if (url.startsWith("data:") || url.startsWith("blob:")) {
    return url;
  }

  const apiUrl = import.meta.env.VITE_API_URL || "";
  const baseUrl = apiUrl.startsWith("http")
    ? apiUrl.replace(/\/api\/?$/, "")
    : "";

  let normalizedUrl = url.trim();
  if (normalizedUrl.startsWith("uploads/")) {
    normalizedUrl = `/${normalizedUrl}`;
  }

  // If URL has /uploads/..., extract the uploads path so it always uses the current backend baseUrl
  const uploadsIndex = normalizedUrl.indexOf("/uploads/");
  if (uploadsIndex !== -1) {
    const relativePath = normalizedUrl.substring(uploadsIndex);
    const parts = relativePath.split("/").map((part, index) => {
      if (index <= 1) return part;
      return encodeURIComponent(decodeURIComponent(part));
    });
    return `${baseUrl}${parts.join("/")}`;
  }

  if (normalizedUrl.startsWith("http://") || normalizedUrl.startsWith("https://")) {
    return encodeURI(normalizedUrl);
  }

  const cleanPath = normalizedUrl.startsWith("/") ? normalizedUrl : `/${normalizedUrl}`;
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

