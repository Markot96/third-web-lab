let panelListInput = [
    { name: "Team lead", salary: 1500 },
    { name: "Front-end", salary: 2700 },
    { name: "Designer", salary: 3100 },
    { name: "UX dev", salary: 900 }

];

panelList = [...panelListInput]

const vacancyItems = document.getElementById("vacancyItems");

let localList = localStorage.getItem("localVacancies");

localStorage.setItem("localVacancies", JSON.stringify(panelList));


// search

function findVacancies() {
    let findedElement = document.getElementById("searchInput").value;
    let findResult = [];
    panelListInput.forEach(item => {
        if (item.name.toUpperCase().includes(findedElement.toUpperCase())) {
            findResult.push(item);
        } else if (item.salary.toString().toUpperCase().includes(findedElement.toUpperCase())) {
            findResult.push(item);
        }
    });

    panelList = findResult;

    showVacancies(findResult);
};

// count

function countSalary() {
    let sum = 0;
    panelList.forEach(item => {
        sum += item.salary;
    });
    document.getElementById("totalCount").innerHTML = sum + '$';
};

// sort

const sortNameBtn = document.getElementById("sortNamesBtn");

sortNameBtn.onclick = function () {

    panelList.sort(function (obj1, obj2) {
        if (obj1.name < obj2.name) return -1;
        if (obj1.name > obj2.name) return 1;
        return 0;
    })

    showVacancies(panelList);

};

const sortReverseNameBtn = document.getElementById("sortReverseNamesBtn");

sortReverseNameBtn.onclick = function () {

    panelList.sort(function (obj1, obj2) {
        if (obj1.name < obj2.name) return 1;
        if (obj1.name > obj2.name) return -1;
        return 0;
    })

    showVacancies(panelList);

};

// render-func

showVacancies(panelList);

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
                <button type="submit" class="edit-btn">Edit</button>
                <button type="submit" class="delete-btn">Delete</button>
            </div>
        </div>
        `;
    });

    vacancyItems.innerHTML = innerItem;

};




