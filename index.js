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
        ajax.open("GET", "https://jsonplaceholder.typicode.com/users")
        ajax.send()
    })

}

const displayUsersListInTable = (usersList) => {
    const usersTableBody = document.getElementById("tbody")
    let tableRows = ''
    for (const userElement of usersList) {
        if (userElement.id === 1) {
            tableRows += `
                <tr>
                    <td>${userElement.name}</td>
                    <td>${userElement.username}</td>
                    <td>${userElement.email}</td>
                    <td>${userElement.phone}</td>
                    <td>${userElement.address.city}</td>
                    <td>${userElement.address.street}</td>
                    <td>${userElement.address.zipcode}</td>
                    <td>${userElement.name}</td>
                </tr>
            `
        }
        usersTableBody.innerHTML = tableRows
    }
}