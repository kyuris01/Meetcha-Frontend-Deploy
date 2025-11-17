export const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const apiCall = async (path: string, method = "GET", data?: any, withAuth = false) => {
  const access_token = localStorage.getItem("access-token");

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...(withAuth && { Authorization: `Bearer ${access_token}` }),
      },
      ...(data && { body: JSON.stringify(data) }),
    });
    return await res.json();
  } catch (e: any) {
    console.error(e.message);
  } finally {
  }
};
