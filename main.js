document.addEventListener("DOMContentLoaded", () => {

const myForm = document.getElementById("myForm");
const listContainer = document.getElementById("list");
const clearAll = document.getElementById("clearAll");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.reverse();

// display tasks 
function populateTasks(taskObj, display){
  var html = "";

  if (taskObj.length == 0){
    html += "No tasks added";
    display.innerHTML = html;
    return;
  }

   taskObj.map(function(task, i){
     html += `<li><input type="checkbox" data-index="${i}" id="${i}" ${task.done ? "checked" : ""} >&nbsp;<label for="task${i}">${task.text}</label><button class="delItem" type="button" data-deleteIndex="${i}">Delete</button></li>`;
  }).join("");

  display.innerHTML = html;
}

// add a new task 
myForm.addEventListener("submit", addTask);

function addTask(e) {
  e.preventDefault();

  //let val = this.querySelector("[id=myText]").value;
  let val = document.getElementById("myText").value;
  
  if (val == "") {
    return;
  }

  const newTask = {
    "text": val,
    "done": false
  }

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  populateTasks(tasks, listContainer);
  
  this.reset();

}

// remove all the tasks 
clearAll.addEventListener("click", clearAllTasks);

function clearAllTasks(){
  if (confirm("Are you sure?")){
    tasks.splice(0);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    populateTasks(tasks, listContainer);
  }
  
}

// Toggle the Checkbox  or Remove the Task 
listContainer.addEventListener("click", toggleOrRemoveTask);

function toggleOrRemoveTask(e) {
  if (e.target.matches("input")){
    var elem = e.target;
    var index = elem.dataset.index;

    tasks[index].done = !tasks[index].done;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    populateTasks(tasks, listContainer);
  }
  else if(e.target.matches("button")){
    var elem = e.target;
    var index = elem.dataset.deleteIndex;
    elem.parentElement.remove();
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    populateTasks(tasks, listContainer);
  }
  else {
    return;
  }
  
  
}

populateTasks(tasks, listContainer);

});














