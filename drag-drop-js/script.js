const containers = document.querySelectorAll(".container");
const draggables = document.querySelectorAll(".draggable");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", (e) => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", (e) => {
    draggable.classList.remove("dragging");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();

    const draggable = document.querySelector(".dragging");
    const afterElement = [
      ...container.querySelectorAll(".draggable:not(.dragging)"),
    ].find((el) => {
      return el.offsetTop + el.offsetHeight / 2 >= e.clientY;
    });

    if (afterElement) container.insertBefore(draggable, afterElement);
    else container.insertAdjacentElement("beforeend", draggable);
  });
});
