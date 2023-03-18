const API_Url1 = "https://dummyjson.com/posts";
const API_Url2 = "https://dummyjson.com/products";
const API_Url3 = "https://dummyjson.com/todos";

function fetchDataFromAPI1(apiUrl, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    console.log(data.posts);
                    resolve(data.posts);
                })
                .catch(error => {
                    reject(error);
                });
        }, delay);
    });
}

function fetchDataFromAPI2(apiUrl, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    console.log(data.products);
                    resolve(data.products);
                })
                .catch(error => {
                    reject(error);
                });
        }, delay);
    });
}

function fetchDataFromAPI3(apiUrl, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    console.log(data.todos);
                    resolve(data.todos);
                })
                .catch(error => {
                    reject(error);
                });
        }, delay);
    });
}

function fetchApiData() {
    const TableBody = document.querySelector("#dataTable tbody");
    const api1_promise = fetchDataFromAPI1(API_Url1, 1000);
    const api2_promise = api1_promise.then(() => fetchDataFromAPI2(API_Url2, 2000));
    const api3_promise = api2_promise.then(() => fetchDataFromAPI3(API_Url3, 3000));

    api1_promise
        .then(api1Data => {
            api1Data.forEach(item => {
                const row = document.createElement("tr");
                const cell = document.createElement("td");
                cell.innerText = item.title;
                row.appendChild(cell);
                TableBody.appendChild(row);
            });

            return true;
        })
        .then(api1Resolved => {
            if (api1Resolved) {
                return api2_promise;
            }
        })
        .then(api2Data => {
            api2Data.forEach(item => {
                const row = document.querySelector(`#dataTable tbody tr:nth-child(${item.id})`);
                const cell = document.createElement("td");
                cell.innerText = item.title;
                row.appendChild(cell);
            });

            return true;
        })
        .then(api2Resolved => {
            if (api2Resolved) {
                return api3_promise;
            }
        })
        .then(api3Data => {
            api3Data.forEach(item => {
                const row = document.querySelector(`#dataTable tbody tr:nth-child(${item.id})`);
                const cell = document.createElement("td");
                cell.innerText = item.completed;
                row.appendChild(cell);
            });
        })
        .catch(error => {
            console.error(error);
        });
}

const fetchBtn = document.querySelector("#fetchDataBtn");
fetchBtn.addEventListener("click", fetchApiData);