document.body.addEventListener("mousemove", (e) => {
  let light = document.querySelector(".cursor-light");
  if (!light) {
    light = document.createElement("div");
    light.className = "cursor-light";
    document.body.appendChild(light);
  }
  light.style.left = `${e.pageX}px`;
  light.style.top = `${e.pageY}px`;
});

document.body.addEventListener("click", (e) => {
  const effect = document.createElement("div");
  effect.className = "click-effect";
  effect.style.left = `${e.pageX}px`;
  effect.style.top = `${e.pageY}px`;
  document.body.appendChild(effect);
  setTimeout(() => {
    document.body.removeChild(effect);
  }, 500); // matches animation duration
});

document
  .getElementById("taskInput")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

function addTask() {
  const input = document.getElementById("taskInput");
  const newTaskText = input.value.trim();
  if (newTaskText === "") {
    alert("Please enter a task.");
    return;
  }

  const li = document.createElement("li");
  const textSpan = document.createElement("span");
  textSpan.textContent = newTaskText;
  li.appendChild(textSpan);

  const priorityIcon = document.createElement("span");
  priorityIcon.textContent = "☆"; // Default low priority icon
  priorityIcon.className = "priority-icon";
  li.appendChild(priorityIcon);

  const prioritySlider = document.createElement("input");
  prioritySlider.type = "range";
  prioritySlider.min = "1";
  prioritySlider.max = "5";
  prioritySlider.value = "1"; // Default priority
  prioritySlider.classList.add("slider");
  prioritySlider.oninput = function () {
    updatePriorityIcon(priorityIcon, this.value);
  };
  li.appendChild(prioritySlider);

  const priorityButton = document.createElement("button");
  priorityButton.textContent = "Set Priority";
  priorityButton.onclick = function () {
    updatePriorityIcon(priorityIcon, prioritySlider.value);
    sortTasks();
    priorityButton.style.display = "none"; // Hide the button after setting the priority
  };
  li.appendChild(priorityButton);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function () {
    li.parentNode.removeChild(li);
  };
  li.appendChild(deleteButton);

  document.getElementById("tasksList").appendChild(li);
  input.value = ""; // Clear the input after adding

  sortTasks();
}

function updatePriorityIcon(icon, value) {
  const priorityLevels = ["☆", "☆☆", "☆☆☆", "☆☆☆☆", "☆☆☆☆☆"];
  icon.textContent = priorityLevels[value - 1];
}

function sortTasks() {
  let tasks = Array.from(document.getElementById("tasksList").children);
  tasks.sort((a, b) => {
    let priorityA = a.querySelector(".slider").value;
    let priorityB = b.querySelector(".slider").value;
    return priorityB - priorityA;
  });

  const tasksList = document.getElementById("tasksList");
  tasks.forEach((task) => tasksList.appendChild(task)); // Append back in sorted order
}
