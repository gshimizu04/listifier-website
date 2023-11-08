const taskName = document.getElementById("taskName");
const taskUrgency = document.getElementById("taskUrgency");
const listContainer = document.getElementById("listContainer");
const tasks = [];

function addTask() {
    if (taskName.value == '' || taskUrgency.value == '') {
        alert("Você deve preencher ambos os campos!")
    } else {
        let listItem = document.createElement("li");
        listItem.setAttribute("data-urgency", taskUrgency.value);
        listItem.innerHTML = `${taskName.value}, urgência: ${taskUrgency.value}`;
        listContainer.appendChild(listItem);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        listItem.appendChild(span);
        tasks.push({ name: taskName, urgency: taskUrgency });
    }
    taskName.value = "";
    taskUrgency.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask () {
    listContainer.innerHTML = localStorage.getItem("data");
}

function mascaraTelefone(event) {
    let tecla = event.key;
    let telefone = event.target.value.replace(/\D+/g, "");
  
    if (/^[0-9]$/i.test(tecla)) {
      telefone = telefone + tecla;
      let tamanho = telefone.length;
  
      if (tamanho >= 12) {
        return false;
      }
  
      if (tamanho > 10) { 
        telefone = telefone.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
      } else if (tamanho > 5) { 
        telefone = telefone.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
      } else if (tamanho > 2) { 
        telefone = telefone.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
      } else {
        telefone = telefone.replace(/^(\d*)/, "($1");
      }
  
      event.target.value = telefone;
    }
  
    if (!["Backspace", "Delete", "Tab"].includes(tecla)) {
      return false;
    }
  }

showTask();