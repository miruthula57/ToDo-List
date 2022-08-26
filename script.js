//getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
inputBox.onkeyup = ()=>{
    let userData = inputBox.value; // gettinguser entered value ,,, if user values arent only spaces
    if(userData.trim() != 0){
        addBtn.classList.add("active"); //active the add button
    }else{
        addBtn.classList.remove("active"); //unactive the add button
    }
}

showTasks(); // calling showtask function

// if user click on the add button
addBtn.onclick = ()=>{
    let userData = inputBox.value; //getting user entered value
    let getLocalStroge = localStorage.getItem("New Todo"); //getting localstroage,,,, if localstroage is null
    if(getLocalStroge == null){
        listArr = []; //creating blank array
    }else{
        listArr = JSON.parse(getLocalStroge); //transforming json str into js obj
    }
    listArr.push(userData); //pushing or adding user data
    localStorage.setItem("New Todo",JSON.stringify(listArr));// transforming js obj into a json string
    showTasks(); // calling showtask function
    addBtn.classList.remove("active"); // unactive the add button
}

//function to add task list inside ul
function showTasks(){
    let getLocalStroge = localStorage.getItem("New Todo"); //getting localstraoge
    if(getLocalStroge == null){
        listArr = []; //creating blank array
    }else{
        listArr = JSON.parse(getLocalStroge); //transforming json str into js obj
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length; // passing the lengt value is pendingnumb
    if(listArr.length > 0){ // if array length is greater than 0
        deleteAllBtn.classList.add("active"); //active the clear all button
    }else{
        deleteAllBtn.classList.remove("active"); //unactive the clear all button
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})"; ><i class="fa fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value = ""; //once task added leave the input field blank
}
//deleete task fun
function deleteTask(index){
    let getLocalStroge = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStroge);
    listArr.splice(index, 1); // delete or remove the particular indexed li
    // after remove the li again update the local storage
    localStorage.setItem("New Todo",JSON.stringify(listArr));
    showTasks(); 
}

// delete all tasks function
deleteAllBtn.onclick = ()=>{
    listArr = []; // empty an array
    // after delete alltask again update the localstorage
    localStorage.setItem("New Todo",JSON.stringify(listArr)); // transforming js obj into a json string
    showTasks();  // calling showtasks fun
}
