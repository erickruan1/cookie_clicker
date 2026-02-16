const cursorBtn = document.getElementById("cursor-update");
const buyP = document.getElementById("buyP");
let cursorPrice = 1000 * 3.18 * data.cursorMulti;
if (!data.cursorMulti) data.cursorMulti = 1;

buyP.innerHTML = `
Compre multiplicadores para ganhar mais cookies por click! <br><br>
Multi atual: (${data.cursorMulti}) <br>
Preço: ${cursorPrice} <br> <br>
`;

cursorBtn.addEventListener("click", addClick);
function addClick() {
    if (data.cookies >= cursorPrice) {
        data.cursorMulti += 1;
        data.cookies -= cursorPrice;
        saveData(true);
        buyP.innerHTML = `
Compre multiplicadores para ganhar mais cookies por click! <br><br>
Multi atual: (${data.cursorMulti}) <br>
Preço: ${cursorPrice} <br><br>
`;
    } else {
        notify("Você não tem dinheiro suficiente!", 3, type = "warning");
    }
}
