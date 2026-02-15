const pName = document.getElementById("name");
const cookiesName = document.getElementById("cookies");
const cookiesPs = document.getElementById("cookiesPs");
const clicker = document.getElementById("cookie");
const saveBtn = document.getElementById("save-data");
let data = JSON.parse(localStorage.getItem("data"));

saveBtn.addEventListener("click", saveData);
if (!data) {
    data = {
        name: "Padaria sem nome",
        cookies: 0,
        cookiesPs: 0,
        clicks: 0,
    };
}

pName.textContent = `${data.name}`;
cookiesName.textContent = `${data.cookies || 0} cookies`;
cookiesPs.textContent = `${data.cookiesPs || 0} cookies p/s`;

clicker.addEventListener("click", () => {
    data.cookies += 1;
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

window.addEventListener("beforeunload", saveData);

setInterval(() => {
    saveData();
}, 60000);
