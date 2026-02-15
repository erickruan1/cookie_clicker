const shopList = document.getElementById("shop-list");

let itens = JSON.parse(localStorage.getItem("shop")) || [
    {
        id: 1,
        name: "Cursor",
        price: 15,
        clicks: 1,
        quanty: 0,
    },
    {
        id: 2,
        name: "Vovó",
        price: 100,
        clicks: 2,
        quanty: 0,
    },
    {
        id: 3,
        name: "Fazenda",
        price: 500,
        clicks: 5,
        quanty: 0,
    },
    {
        id: 4,
        name: "Fábrica",
        price: 3000,
        clicks: 15,
        quanty: 0,
    },
    {
        id: 5,
        name: "Mina",
        price: 10000,
        clicks: 40,
        quanty: 0,
    },
    {
        id: 6,
        name: "Envio Espacial",
        price: 40000,
        clicks: 100,
        quanty: 0,
    },
    {
        id: 7,
        name: "Laboratório de Alquimia",
        price: 200000,
        clicks: 400,
        quanty: 0,
    },
    { id: 8, name: "Portal", price: 1000000, clicks: 6666, quanty: 0 },
    {
        id: 9,
        name: "Máquina do Tempo",
        price: 12000000,
        clicks: 98765,
        quanty: 0,
    },
    { id: 10, name: "Antimatéria", price: 50000000, clicks: 500000, quanty: 0 },
    {
        id: 11,
        name: "Universo de Bolso",
        price: 500000000,
        clicks: 2500000,
        quanty: 0,
    },
    {
        id: 12,
        name: "Realidade Alternativa",
        price: 2500000000,
        clicks: 15000000,
        quanty: 0,
    },
];

function calculateCPS() {
    let cps = 0;
    itens.forEach((item) => {
        cps += item.quanty * item.clicks;
    });

    data.cookiesPs = cps;

    let interval = null;

    if (!interval) {
        interval = setInterval(() => {
            data.cookies += cps;
            cookiesName.textContent = `${data.cookies || 0} cookies`;
        }, 1000);
    } else {
        clearInterval(interval);
        interval = null;
    }

    return cps;
}

calculateCPS();

function listItems() {
    shopList.innerHTML = "";

    itens.forEach((item, index) => {
        const price = item.price * (item.quanty + 1);

        const list = document.createElement("li");
        list.classList.add("shop-item");

        list.innerHTML = `
            <div class="desc">
                <p>${item.name}</p>
                <p>C$ ${price}</p>
            </div>
            <div class="desc">
                <p>C/PS: ${item.clicks}</p>
                <p>Q: ${item.quanty}</p>
            </div>  
        `;

        list.addEventListener("click", () => {
            if (data.cookies >= price) {
                data.cookies -= price;
                item.quanty++;

                calculateCPS();

                cookiesName.textContent = `${data.cookies} cookies`;
                cookiesPs.textContent = `${data.cookiesPs} cookies p/s`;

                saveData();
                listItems();
            }
        });

        shopList.appendChild(list);
    });
}

listItems();
