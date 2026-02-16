const pName = document.getElementById("name");
const cookiesName = document.getElementById("cookies");
const cookiesPs = document.getElementById("cookiesPs");
const clicker = document.getElementById("cookie");
const saveBtn = document.getElementById("save-data");
const deleteBtn = document.getElementById("delete-data");
const bakeyName = document.getElementById("name");

let data = JSON.parse(localStorage.getItem("data"));

if (!data) {
    data = {
        name: "Padaria sem nome",
        cookies: 0,
        cookiesPs: 0,
        clicks: 0,
        cursorMulti: 1,
    };
}

saveBtn.addEventListener("click", () => {
    saveBtn.disabled = true;
    saveData();
    setTimeout(() => {
        saveBtn.disabled = false;
    }, 5000);
});

let clicksDeleteData = 0;
let deleteTimeOut;
deleteBtn.addEventListener("click", () => {
    clearTimeout(deleteTimeOut);

    clicksDeleteData += 1;
    if (clicksDeleteData < 2) {
        deleteBtn.textContent = `Clique mais ${2 - clicksDeleteData} vez para confirmar`;
        deleteBtn.style.backgroundColor = "#ff0000";
    } else {
        deleteData();
        deleteBtn.style.backgroundColor = "orangered";
    }

    deleteTimeOut = setTimeout(() => {
        clicksDeleteData = 0;
        deleteBtn.textContent = `Apagar dados`;
        deleteBtn.style.backgroundColor = "orangered";
    }, 5000);
});

pName.textContent = `${data.name}`;
cookiesName.textContent = `${data.cookies || 0} cookies`;
cookiesPs.textContent = `${data.cookiesPs || 0} cookies p/s`;

clicker.addEventListener("click", () => {
    data.cookies += 1 * data.cursorMulti;
    data.clicks += 1;

    document.title = `${data.cookies} Cookies`;
    cookiesName.textContent = `${data.cookies} cookies`;
});

function notify(notifyData, time, type = "info") {
    if (!time) time = 3;
    time = time * 1000;

    const notifyContainer = document.getElementById("notifications");

    const notifyList = notifyContainer.querySelectorAll(".notification");
    if (notifyList.length >= 2) {
        notifyList[0].remove();
    }

    const notify = document.createElement("div");
    notify.classList.add("notification");

    if (type === "info") notify.classList.add("notification-white");
    if (type === "warning") notify.classList.add("notification-orange");
    if (type === "error") notify.classList.add("notification-red");

    const textData = document.createElement("p");
    const timeP = document.createElement("p");

    textData.textContent = notifyData;
    timeP.textContent = `(${time / 1000})`;

    notify.appendChild(textData);
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

function saveData(silence) {
    if (!silence) notify("Dados salvos", 3);
    let finalData = JSON.stringify(data);

    let finalData2 = JSON.stringify(itens || []);

    localStorage.setItem("data", finalData);
    localStorage.setItem("shop", finalData2);
}

function deleteData() {
    notify("Dados deletados", 3);

    localStorage.removeItem("data");
    localStorage.removeItem("shop");
    window.location.reload();
}

window.addEventListener("beforeunload", () => {
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("shop", JSON.stringify(itens));
});

setInterval(() => {
    saveData();
}, 60000);

setInterval(() => {
    document.title = `${data.cookies} Cookies`;
}, 2500);

bakeyName.textContent = `${data.name}`;
