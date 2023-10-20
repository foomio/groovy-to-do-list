// api.js
export function fetchTodos() {
    return fetch('/api/todos')
      .then((response) => response.json())
      .catch((error) => {
        throw error;
      });
  }
  