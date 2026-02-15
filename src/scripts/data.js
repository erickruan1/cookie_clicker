const pName = document.getElementById("name");
const cookiesName = document.getElementById("cookies");
const cookiesPs = document.getElementById("cookiesPs");
const clicker = document.getElementById("cookie");
const saveBtn = document.getElementById("save-data");
const deleteBtn = document.getElementById("delete-data");
let data = JSON.parse(localStorage.getItem("data"));

saveBtn.addEventListener("click", () => {
    saveBtn.disabled = true;
    saveData();
    setTimeout(() => {
        saveBtn.disabled = false;
    }, 5000);
});
if (!data) {
    data = {
        name: "Padaria sem nome",
        cookies: 0,
        cookiesPs: 0,
        clicks: 0,
    };
}
let clicksDeleteData = 0;

deleteBtn.addEventListener("click", () => {
    clicksDeleteData += 1;
    if (clicksDeleteData < 2) {
        deleteBtn.textContent = `Clique mais ${2 - clicksDeleteData} vez(es)`;
        deleteBtn.style.backgroundColor = "red";
    } else {
        deleteData();
        deleteBtn.style.backgroundColor = "orange";
    }

    setTimeout(() => {
        clicksDeleteData = 0;
        deleteBtn.textContent = `Apagar dados`;
        deleteBtn.style.backgroundColor = "orange";
    }, 5000);
});

pName.textContent = `${data.name}`;
cookiesName.textContent = `${data.cookies || 0} cookies`;
cookiesPs.textContent = `${data.cookiesPs || 0} cookies p/s`;

clicker.addEventListener("click", () => {
    data.cookies += 1;
    document.title = `${data.cookies} Cookies`;

    data.clicks += 1;
    cookiesName.textContent = `${data.cookies} cookies`;
});

function notify(notifyData, time) {
    if (!time) time = 3;
    time = time * 1000;

    const notifyContainer = document.getElementById("notifications");

    const notify = document.createElement("div");
    notify.classList.add("notification");

    const data = document.createElement("p");
    const timeP = document.createElement("p");

    data.textContent = notifyData;
    timeP.textContent = `(${time / 1000})`;

    notify.appendChild(data);
    notify.appendChild(timeP);

    setTimeout(() => {
        notify.remove();
    }, time);

    let interval = setInterval(() => {
        time -= 1000;
        timeP.textContent = `(${time / 1000})`;
        if (time < 1000) clearInterval(interval);
    }, 1000);

    notifyContainer.appendChild(notify);
}

function saveData() {
    notify("Dados salvos", 3);
    let finalData = JSON.stringify(data);

    let finalData2 = JSON.stringify(itens);

    localStorage.setItem("data", finalData);
    localStorage.setItem("shop", finalData2);
}

function deleteData() {
    notify("Dados deletados", 3);

    localStorage.clear();
    window.location.reload();
}

window.addEventListener("beforeunload", () => {
    if (clicksDeleteData < 2) saveData;
});

setInterval(() => {
    saveData();
}, 60000);

setInterval(() => {
    document.title = `${data.cookies} Cookies`;
}, 2500);
