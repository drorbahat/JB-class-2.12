const requestAllusers = async () => {
    const userIdSelection = document.getElementById("userIdSelector").value
    console.log(userIdSelection)
    const address = "https://jsonplaceholder.typicode.com/users" + "/" + userIdSelection
    console.log(address)

    displayUsersListInTable(await getUsersFromServer(address))

}

const getUsersFromServer = (address) => {
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
        ajax.open("GET", address)
        ajax.send()
    })

}

const displayUsersListInTable = (usersList) => {
    const infoContainer = document.getElementById("info-container")
    let tableRows = ''
    tableRows += `
                    <p>username: ${usersList.username}</p>
                    <p>name: ${usersList.name}</p>
                    <p>phone: ${usersList.phone}</p>
                    <p>email: ${usersList.email}</p>
                    <p>city: ${usersList.address.city}</p>
                    <p>street: ${usersList.address.street}</p>
                    <p>zipcode: ${usersList.address.zipcode}</p>
                    <p>company: ${usersList.company.name}</p>
                `

    infoContainer.innerHTML = tableRows
}
