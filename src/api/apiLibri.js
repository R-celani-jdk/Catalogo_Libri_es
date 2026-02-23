async function request(url, options) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const text = await response.text();
  const data = text ? safeJsonParse(text) : null;

  if (!response.ok) {
    const message = (data && data.message) || `Errore HTTP ${response.status}`;
    throw new Error(message);
  }

  return data;
}

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export const libriApi = {

  getLibri: () => request("/libro/list", { method: "GET" }),

  createLibro: (libroDto) => request("/libro/create", {
    method: "POST",
    body: JSON.stringify(libroDto),
  }),

  updateLibro: (libroDto) => request("/libro/update", {
    method: "PUT",
    body: JSON.stringify(libroDto),
  }),

  deleteLibro: (id) => request(`/libro/delete/${id}`, {
    method: "DELETE",
  }),
};