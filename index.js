const requestAllusers = async () => {
    displayUsersListInTable(await getUsersFromServer())

}

const getUsersFromServer = () => {
    return new Promise((resolve, reject) => {
        const ajax = new XMLHttpRequest()
        ajax.onreadystatechange = () => {
            let state = ajax.readyState
            if (state === 4) {
                if (ajax.status === 200) {
                    const usersListFromJson = JSON.parse(ajax.responseText)
                    resolve(usersListFromJson)
                } else {
                    reject()
                }
            }
        }
        ajax.open("GET", "https://reqres.in/api/users")
        ajax.send()
    })

}

const displayUsersListInTable = (usersList) => {
    usersList = usersList.data
    const usersTableBody = document.getElementById("tbody")
    console.log(usersList)
    let tableRows = ''
    for (const userElement of usersList) {
        if (userElement.id <= 100) {
            tableRows += `
                <tr>
                    <td>${userElement.first_name}</td>
                    <td>${userElement.last_name}</td>
                    <td>${userElement.email}</td>
                    <td><img src="${userElement.avatar}" alt="" srcset=""></td>
                </tr>
            `
        usersTableBody.innerHTML = tableRows
        }
    }
}