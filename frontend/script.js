const API = fetch
("https://task-backend-a2mk.onrender.com/tasks");

// Load tasks
function loadTasks() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("taskList");
      list.innerHTML = "";

      data.forEach(t => {
        list.innerHTML += `
          <li>
            ${t.title} - <b>${t.status}</b>
            <button onclick="markDone('${t._id}')">✔</button>
            <button onclick="deleteTask('${t._id}')">❌</button>
          </li>
        `;
      });
    });
}
function markDone(id) {
  fetch(API + "/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "done" })
  }).then(() => loadTasks());
}