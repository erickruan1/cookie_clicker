const cookie = document.querySelector(".clicker img");
const cookie_c = document.getElementById("cookie-counter");
const cookie_p_s = document.getElementById("cookies-p-s");
const save_btn = document.getElementById("save-data");

let data = JSON.parse(localStorage.getItem("data")) || [
    {
        cookies: 0,
    },
    {
        cursors: 0,
        grandmas: 0,
    },
];

save_btn.addEventListener("click", updateData);
window.addEventListener("beforeunload", updateData);

cookie.addEventListener("click", () => {
    data[0].cookies += 1;
    cookie_c.textContent = `${data[0].cookies} Cookies`;
    document.title = `${data[0].cookies} Cookies`;
});

function updateData() {
    localStorage.setItem("data", JSON.stringify(data));
    notify("Dados salvos!", 3);
}

function loadData() {
    cookie_c.textContent = `${data[0].cookies} Cookies`;
    document.title = `${data[0].cookies} Cookies`;
    notify("Dados carregados", 5);
}

let notifyContainer = document.querySelector(".notify-container");

if (!notifyContainer) {
    notifyContainer = document.createElement("div");
    notifyContainer.classList.add("notify-container");
    document.body.appendChild(notifyContainer);
}

function notify(notifyData, duration) {
    let time = duration;

    const notify = document.createElement("div");
    notify.classList.add("notify");

    const content = document.createElement("p");
    content.textContent = notifyData + "\n (" + time + ")";

    const interval = setInterval(() => {
        time--;
        content.textContent = `${notifyData} \n (${time})`;
        if (time < 1) {
            notify.remove();
            clearInterval(interval);
        }
    }, 1000);

    notify.appendChild(content);
    notifyContainer.appendChild(notify);
}

setInterval(() => {
    updateData();
}, 10000);

notify("Bem vindo(a)!", 5);

loadData();
