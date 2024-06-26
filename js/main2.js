let API = "http://localhost:8001/foods";
document.addEventListener("DOMContentLoaded", (event) => {
  const exampleModal = document.getElementById("exampleModal");
  if (exampleModal) {
    exampleModal.addEventListener("show.bs.modal", (event) => {
      const button = event.relatedTarget;
      const recipient = button.getAttribute("data-bs-whatever");
      const modalTitle = exampleModal.querySelector(".modal-title");
      const modalBodyInput = exampleModal.querySelector(".modal-body input");
      modalTitle.textContent = `Сообщение ${recipient}`;
      modalBodyInput.value = recipient;
    });
  }
});
