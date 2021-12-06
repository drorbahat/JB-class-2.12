const requestAllPhotos = async () => {
    displayPhotosListInTable(await getPhotosFromServer())

}

const getPhotosFromServer = () => {
    return new Promise((resolve, reject) => {
        const ajax = new XMLHttpRequest()
        ajax.onreadystatechange = () => {
            let state = ajax.readyState
            if (state === 4) {
                if (ajax.status === 200) {
                    const photosListFromJson = JSON.parse(ajax.responseText)
                    resolve(photosListFromJson)
                } else {
                    reject()
                }
            }
        }
        ajax.open("GET", "https://jsonplaceholder.typicode.com/photos")
        ajax.send()
    })

}

const displayPhotosListInTable = (photosList) => {
    const photosTableBody = document.getElementById("tbody")
    let tableRows = ''
    for (const photoElement of photosList) {
        if (photoElement.id <= 100) {
            tableRows += `
                <tr>
                    <td>${photoElement.albumId}</td>
                    <td>${photoElement.id}</td>
                    <td>${photoElement.title}</td>
                    <td><img src="${photoElement.thumbnailUrl}" alt="" srcset=""></td>
                </tr>
            `
        photosTableBody.innerHTML = tableRows
        }
    }
}