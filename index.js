const requestAllusers = async () => {
    const userIdSelection = document.getElementById("userIdSelector").value
    const address = "http://api.weatherstack.com/current?access_key=a4d8e2a841e1ac243d90e19395261924&query=" + "/" + userIdSelection

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
    console.log(usersList)
    const infoContainer = document.getElementById("info-container")
    let tableRows = ''
    tableRows += `
                    <p>Current Temp: ${usersList.current.temperature}</p>
                    <p>Feels Like: ${usersList.current.feelslike}</p>
                    <img src="${usersList.current.weather_icons}" alt="" srcset="">
                    `

    infoContainer.innerHTML = tableRows
}


let obj = {
    "request": {
        "type": "City",
        "query": "Tel Aviv-Yafo, Israel",
        "language": "en",
        "unit": "m"
    },
    "location": {
        "name": "Tel Aviv-Yafo",
        "country": "Israel",
        "region": "Tel Aviv",
        "lat": "32.068",
        "lon": "34.765",
        "timezone_id": "Asia/Jerusalem",
        "localtime": "2021-12-06 14:54",
        "localtime_epoch": 1638802440,
        "utc_offset": "2.0"
    },
    "current": {
        "observation_time": "12:54 PM",
        "temperature": 23,
        "weather_code": 113,
        "weather_icons": [
            "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"
        ],
        "weather_descriptions": [
            "Sunny"
        ],
        "wind_speed": 15,
        "wind_degree": 110,
        "wind_dir": "ESE",
        "pressure": 1018,
        "precip": 0,
        "humidity": 38,
        "cloudcover": 0,
        "feelslike": 24,
        "uv_index": 5,
        "visibility": 10,
        "is_day": "yes"
    }
}