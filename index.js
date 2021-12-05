const selectionGenrerator = async () => {
    usersList = await getUsersFromServer()
    const userIdSelector = document.getElementById("userIdSelector")
    let counter = 0
    let newOption = ''
    for (const userElement of usersList) {
        counter++
        newOption += `
            <option value=${counter}>${userElement.name}</option>
                    `
    }
    userIdSelector.innerHTML = newOption
}

const requestAllUsers = async () => {
    const userIdSelection = document.getElementById("userIdSelector").value
    const address = "https://jsonplaceholder.typicode.com/users" + "/" + userIdSelection

    displayUsersListInTable(await getUsersFromServerCustomAddress(address))
}

const getUsersFromServerCustomAddress = (address) => {
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
    const infoContainer = document.getElementById("info-container")
    let newContent = ''
    newContent += `
                    <p>username: ${usersList.username}</p>
                    <p>name: ${usersList.name}</p>
                    <p>phone: ${usersList.phone}</p>
                    <p>email: ${usersList.email}</p>
                    <p>city: ${usersList.address.city}</p>
                    <p>street: ${usersList.address.street}</p>
                    <p>zipcode: ${usersList.address.zipcode}</p>
                    <p>company: ${usersList.company.name}</p>
                `
    infoContainer.innerHTML = newContent
}