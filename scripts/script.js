let panelList = [
    { name: "Designer" },
    { name: "Team lead" },
    { name: "UX-dev" }
];

const vacancyItems = document.getElementById("vacancyItems");

let localList = localStorage.getItem("localVacancies");

localStorage.setItem("localVacancies", JSON.stringify(panelList));

// render-func

showVacancies();

function showVacancies() {
    let innerItem = "";
    panelList.forEach((item, index) => {
        innerItem += `
        <div class="vacancy-panel">
            <div class="vacancy-panel-info">
                <p class="panel-info-text">${index + 1}</p>
                <p id="panelInfoText" class="panel-info-text">${item.name}</p>
            </div>
            <div class="vacancy-panel-buttons">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        </div>
        `;
    });

    vacancyItems.innerHTML = innerItem;

}


