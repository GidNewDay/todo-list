todoContainer = document.getElementById("todo-container");
filterButton = Object.values(document.getElementsByClassName("fbutton")); // фильры
renameList = Object.values(document.getElementsByClassName("rename-checklist")); // rename checklist
addTaskLink = Object.values(document.getElementsByClassName("add-task-link")); // добавить пункт
deleteButtons = Object.values(document.getElementsByClassName("todo-delete")); // удалить пункт
addButton = Object.values(document.getElementsByClassName("add-button")); // добавить пункт кнопка
checkBoxes = Object.values(document.getElementsByClassName("todo-checkbox"));

//удалить пункт
function deleteTask() {
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      btn.parentElement.parentElement.remove();
    });
  });
}
deleteTask();

//фильры
filterButton.forEach((f_but) => {
  f_but.addEventListener("click", (e) => {
    var elems = document.querySelector(".active");
    if (elems !== null) {
      elems.classList.remove("active");
    }
    e.target.classList.add("active");

    checkBoxes = Object.values(
      document.getElementsByClassName("todo-checkbox")
    );

    for (let i = 0; i < checkBoxes.length; i++) {
      todoContainer.children[i].style.display = "flex";
      if (e.target.id === "current" && checkBoxes[i].checked) {
        todoContainer.children[i].style.display = "none";
      } else if (e.target.id === "done" && checkBoxes[i].checked === false) {
        console.log(checkBoxes[i].checked);
        todoContainer.children[i].style.display = "none";
      } 
    }
  });
});

//rename checklist
renameList.forEach((renameButtom) => {
  renameButtom.addEventListener("click", (e) => {
    let parent = e.target.parentElement;
    let titleBlock = parent.querySelector(".checklist-title");
    let editBtn = e.target;
    titleBlock.style.display = "none";
    editBtn.style.display = "none";

    let inputTitle = parent.querySelector(".new-checklist-title");
    inputTitle.style.display = "inline-block";
    inputTitle.value = titleBlock.innerHTML;
    inputTitle.focus();
    inputTitle.addEventListener("change", (e) => {
      titleBlock.innerHTML = e.target.value;
      titleBlock.style.display = "inline";
      editBtn.style.display = "inline";
      e.target.style.display = "none";
    });
  });
});

//линк добавить пункт
addTaskLink.forEach((element) => {
  element.addEventListener("click", (e) => {
    let $this = e.target;
    let inputContainer = $this.parentElement.querySelector(".input-container");
    inputContainer.style.display = "grid";
    $this.style.display = "none";
  });
});

//добавить пункт кнопка
addButton.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    let num = Math.floor(Math.random() * 1000);
    let todoInput = e.target.parentElement.querySelector("#todo-input");
    let todoDesc = e.target.parentElement.querySelector("#todo-desc");
    let li = document.createElement("li");

    let todo = document.createElement("div");
    li.appendChild(todo);
    todo.classList.add("todo");

    let todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";
    todoCheckbox.id = "check-" + num;
    todoCheckbox.classList.add("todo-checkbox");
    todo.appendChild(todoCheckbox);

    let label = document.createElement("label");
    label.htmlFor = "check-" + num;
    label.innerHTML = `<p>${todoInput.value}</p> <small>${todoDesc.value}</small>`;
    todo.appendChild(label);

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i>&#x2718;</i>";
    deleteButton.classList.add("todo-delete");

    let flex = document.createElement("div");
    flex.classList.add("flex");
    flex.appendChild(deleteButton);
    li.appendChild(flex);

    if (todoInput.value === "") {
      alert("Пожалуйста введите текст");
    } else {
      todoContainer.appendChild(li);
    }

    //обновляем набор кнопок удаления задачки и вызываем функцию
    setTimeout(() => {
      deleteButtons = Object.values(
        document.getElementsByClassName("todo-delete")
      );
      deleteTask();
    });

    todoInput.value = "";
    todoDesc.value = "";
    e.target.parentElement.style.display = "none";
    e.target.parentElement.parentElement.querySelector(
      ".add-task-link"
    ).style.display = "inline-block";
  });
});