let localList = localStorage.getItem("localVacancies");

const vacancyItems = document.getElementById("vacancyItems");
const inputName = document.getElementById("inputName");
const inputSalary = document.getElementById("inputSalary");
const createBtn = document.getElementById("createBtn");
const saveBtn = document.getElementById('saveBtn');

fetch('http://127.0.0.1:5000/get')
    .then(response => response.json())
    .then(data => showVacancies(data));

// search

async function findVacancies() {
    let findedElement = document.getElementById("searchInput").value;
    let findResult = [];
    let response = await fetch("http://127.0.0.1:5000/get");
    vacanciesList = await response.json();

    vacanciesList.forEach(item => {
        if (item.name.toUpperCase().includes(findedElement.toUpperCase())) {
            findResult.push(item);
        } else if (item.salary.toString().toUpperCase().includes(findedElement.toUpperCase())) {
            findResult.push(item);
        }
    });

    vacanciesList = findResult;

    showVacancies(findResult);
};

// count

async function countSalary() {
    let sum = 0;
    let response = await fetch("http://127.0.0.1:5000/get");
    vacanciesList = await response.json();

    vacanciesList.forEach(item => {
        let salaryInt =  parseInt(item.salary);
        sum += salaryInt;
    });
    document.getElementById("totalCount").innerHTML = sum + '$';
};

// sort

const sortNameBtn = document.getElementById("sortNamesBtn");

sortNameBtn.onclick = function () {

    fetch('http://127.0.0.1:5000/get')
        .then(response => response.json())
        .then(data => {
            data.sort(function (obj1, obj2) {
                if (obj1.name < obj2.name) return -1;
                if (obj1.name > obj2.name) return 1;
                return 0;

            })
            showVacancies(data);
        });

};


const sortReverseNameBtn = document.getElementById("sortReverseNamesBtn");

sortReverseNameBtn.onclick = function () {

    fetch('http://127.0.0.1:5000/get')
        .then(response => response.json())
        .then(data => {
            data.sort(function (obj1, obj2) {
                if (obj1.name < obj2.name) return 1;
                if (obj1.name > obj2.name) return -1;
                return 0;

            })
            showVacancies(data);
        });

};

// create

createBtn.addEventListener('click', async () => {
    const inputNameValue = inputName.value;
    const inputSalaryValue = inputSalary.value;


    fetch("http://127.0.0.1:5000/post", {
        method: "POST",
        body: JSON.stringify({
            name: inputNameValue,
            salary: inputSalaryValue,
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },

    })
        .then(response => {
            return response.json();
        })
        .then(data => showVacancies(data));
});


//delete

async function deleteVacancies(index) {

    fetch("http://127.0.0.1:5000/delete/" + index, {
        method: "DELETE",
    })
        .then(response => response.json())
        .then(data => showVacancies(data));

}

// edit

async function editVacancies(index) {
    const saveIndex = document.getElementById('saveIndex');

    let response = await fetch("http://127.0.0.1:5000/get");
    vacanciesList = await response.json();

    inputName.value = vacanciesList[index].name;
    inputSalary.value = vacanciesList[index].salary;

    saveIndex.value = index;
}

// save

saveBtn.addEventListener('click', async () => {
    let response = await fetch("http://127.0.0.1:5000/get");
    vacanciesList = await response.json();
    let saveIndexValue = document.getElementById('saveIndex').value;
    const inputNameValue = inputName.value;
    const inputSalaryValue = inputSalary.value;

    vacanciesList[saveIndexValue].name = inputNameValue;
    vacanciesList[saveIndexValue].salary = inputSalaryValue;

    fetch("http://127.0.0.1:5000/put/" + saveIndexValue, {
        method: "PUT",
        body: JSON.stringify({
            name: inputNameValue,
            salary: inputSalaryValue,
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
    })
        .then(response => response.json())
        .then(data => showVacancies(data));
});



// render-func

// showVacancies();

function showVacancies(array) {

    vacancyItems.innerHTML = "";
    let innerItem = "";
    array.forEach((item, index) => {

        innerItem += `
        <div class="vacancy-panel">
            <div class="vacancy-panel-info">
                <p class="panel-info-text">${index + 1}</p>
                <p id="panelInfoText" class="panel-info-text">${item.name}</p>
                <p class="panel-info-text">${item.salary}$</p>
            </div>
            <div class="vacancy-panel-buttons">

                <button class="edit-btn" onclick="editVacancies(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteVacancies(${index})">Delete</button>
            </div>
        </div>
        `;
    });

    vacancyItems.innerHTML = innerItem;

};






