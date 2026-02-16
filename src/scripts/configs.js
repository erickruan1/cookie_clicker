const configBtn = document.querySelectorAll(".toggle-configs");
const config = document.querySelector(".config");
const configOverlay = document.querySelector(".config-overlay");
const fullScreenBtn = document.getElementById("fullscreen");

fullScreenBtn.innerHTML = `<img src="src/assets/fullscreen-open.png">`;

function toggleFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
        fullScreenBtn.innerHTML = `<img src="src/assets/fullscreen-open.png">`;
    } else {
        document.documentElement.requestFullscreen();
        fullScreenBtn.innerHTML = `<img src="src/assets/fullscreen-exit.png">`;
    }
}

fullScreenBtn.addEventListener("click", toggleFullscreen);

const bakeyForm = document.getElementById("bakey-name-change");
const bakeyInput = document.getElementById("bakey-name");

configBtn.forEach((button) => {
    button.addEventListener("click", toggleConfigs);
});

function toggleConfigs() {
    config.classList.toggle("active");
    configOverlay.classList.toggle("active");
}

configOverlay.addEventListener("click", toggleConfigs);

bakeyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    data.name = bakeyInput.value;
    bakeyName.textContent = `${data.name}`;
    toggleConfigs();
});
