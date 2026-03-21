let idNumber:number = 1; //전역변수 id로 task 관리

const inputName:HTMLInputElement = document.querySelector("#todo-input__input") as HTMLInputElement;
const todoList:HTMLUListElement = document.querySelector(".todo-list__list") as HTMLUListElement;
const doneList:HTMLUListElement = document.querySelector(".done-list__list") as HTMLUListElement;
const inputButton:Element = document.querySelector(".todo-input__button") as Element;

inputButton.addEventListener('click', () => { // 추가 버튼 눌렀을때
    if (inputName.value != '') {
        let id:number = idNumber
        addNewTask(inputName.value, id); // todolist에 task 추가
        inputName.value = '' // 추가와 동시에 사용자가 썼던 내용 초기화

        const button:Element = document.querySelector(`#done-button-${id}`) as Element;
        button.addEventListener("click", () => doneTask(id)); // 추가한 task의 '완료'버튼 눌렀을때 사용할 eventlistener

        idNumber += 1; // 다음에 추가될 task id 
    } 
})

const addNewTask = (name:String, id:number):void => { // todo 리스트에 task 추가
    const newHTMLText:string = `
        <li class="todo-list__element" id="todo-list-${id}">
            <span>${name}</span>
            <button class="todo-list__done-button" id="done-button-${id}">완료</button>
        </li>
    `
    todoList.insertAdjacentHTML('beforeend',newHTMLText)
} 

const doneTask = (id:number):void => { // 완료 리스트로 이동
    const selectedTask = document.querySelector(`#todo-list-${id}`) as HTMLLIElement;
    doneList.appendChild(selectedTask);

    const button = selectedTask.querySelector(`#done-button-${id}`) as Element; // 완료 버튼에서 삭제 버튼으로 변경
    button.id = `delete-button-${id}`;
    button.innerHTML = '삭제';
    button.addEventListener("click", () => deleteTask(id)); // 여기서 에러남,,, 이벤트 리스너가 두 번 들어간 것 같은데 한 번 빼는 법을 모르겠음
}

const deleteTask = (id:number):void => { // 삭제 버튼 눌렀을 때 task 삭제
    const selectedTask = document.querySelector(`#todo-list-${id}`) as HTMLLIElement;
    selectedTask.remove();
}