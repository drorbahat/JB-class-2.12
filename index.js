const requestAllTodos = async () => {
    await getTodosFromServer()
        .then((todoList) => {
            displayTodoListInTable(todoList)
        })
        .catch(() => {
            alert("error")
        })
}

const getTodosFromServer = () => {
    return new Promise((resolve, reject) => {
        const ajax = new XMLHttpRequest()
        ajax.onreadystatechange = () => {
            let state = ajax.readyState
            if (state === 4) {
                if (ajax.status === 200) {
                    const todoListFromJson = JSON.parse(ajax.responseText)
                    resolve(todoListFromJson)
                } else {
                    reject()
                }
            }
        }
        ajax.open("GET", "https://jsonplaceholder.typicode.com/todos")
        ajax.send()
    })

}

const displayTodoListInTable = (todoList) => {
    const todoTableBody = document.getElementById("tbody")
    let tableRows = ''
    for (const todoElement of todoList) {
        if (todoElement.userId === 1) {
            tableRows += `
            <tr>
                <td>${todoElement.title}</td>
                <td>${todoElement.userId}</td>
                <td>${todoElement.completed}</td>
            </tr>
            `
        }
        todoTableBody.innerHTML = tableRows
    }
}