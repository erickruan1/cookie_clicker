const cookie = document.querySelector(".clicker img");
const cookie_c = document.getElementById("cookie-counter");
const cookie_p_s = document.getElementById("cookies-p-s");

let data = JSON.parse(localStorage.getItem("data")) || [
    {
        cookies: 0,
        clickers: 0,
        saveInterval: 10000,
    },
    {
        cursors: 0,
        grandmas: 0,
    },
];

const saveInterval = Number(data[0].saveInterval) || 10000;

cookie.addEventListener("click", () => {
    data[0].cookies += 1;
    cookie_c.textContent = `${data[0].cookies} Cookies`;
    document.title = `${data[0].cookies} Cookies`;
});

function loadData() {
    cookie_c.textContent = `${data[0].cookies} Cookies`;
    document.title = `${data[0].cookies} Cookies`;
}

function updateData() {
    localStorage.setItem("data", JSON.stringify(data));
}

let notifyContainer = document.querySelector(".notify-container");

if (!notifyContainer) {
    notifyContainer = document.createElement("div");
    notifyContainer.classList.add("notify-container");
    document.body.appendChild(notifyContainer);
}

function notify(notifyData, duration) {
    if (!duration) duration = 3;
    duration = duration * 1000;

    const notify = document.createElement("div");
    notify.classList.add("notify");

    const text = document.createElement("p");
    text.textContent = notifyData;

    const timeEl = document.createElement("p");
    const now = new Date();

    timeEl.textContent = now.toLocaleTimeString();

    notify.appendChild(text);
    notify.appendChild(timeEl);
    notifyContainer.appendChild(notify);

    setTimeout(() => notify.remove(), duration);
}

setInterval(() => {
    updateData();
    notify("dados salvos");
}, saveInterval);

loadData();

notify("Bem vindo(a)!", 10);
