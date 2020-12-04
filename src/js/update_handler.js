const { ipcRenderer } = require("electron");
const version = document.getElementById("version");

ipcRenderer.send("app_version");
ipcRenderer.on("app_version", (event, arg) => {
  ipcRenderer.removeAllListeners("app_version");
  version.innerText = "CallHelp " + arg.version;
});
const notification = document.getElementById("notification_update");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart-button");

ipcRenderer.on("update_available", () => {
  ipcRenderer.removeAllListeners("update_available");
  message.innerHTML = 'Доступно <a class="open-in-browser" title="Почитать о выпуске" href="https://github.com/Galionix/electron_Call-Help/releases/latest">обновление</a>. Загружаем...';
  notification.classList.remove("hidden");

  $('.open-in-browser').on("click", (event) => {
    event.preventDefault();
    shell.openExternal(event.target.href);
});

});

// message.innerHTML = 'Доступно <a class="open-in-browser" title="Почитать о выпуске" href="https://github.com/Galionix/electron_Call-Help/releases/latest">обновление</a>. Загружаем...';
// notification.classList.remove("hidden");


ipcRenderer.on("update_downloaded", () => {
  ipcRenderer.removeAllListeners("update_downloaded");
  message.innerHTML =
    '<a class="open-in-browser" title="Почитать о выпуске" href="https://github.com/Galionix/electron_Call-Help/releases/latest">Обновление</a> загружено и будет установлено при перезапуске. Перезапустить сейчас?';
  restartButton.classList.remove("hidden");
  notification.classList.remove("hidden");
  $('.open-in-browser').on("click", (event) => {
    event.preventDefault();
    shell.openExternal(event.target.href);
});
});
// message.innerHTML =
// '<a class="open-in-browser" title="Почитать о выпуске" href="https://github.com/Galionix/electron_Call-Help/releases/latest">Обновление</a> загружено и будет установлено при перезапуске. Перезапустить сейчас?';
// restartButton.classList.remove("hidden");
// notification.classList.remove("hidden");
$('.open-in-browser').on("click", (event) => {
  event.preventDefault();
  shell.openExternal(event.target.href);
});

function closeNotification() {
  notification.classList.add("hidden");
}

function restartApp() {
  // alert('Hi!')
  ipcRenderer.send("restart_app");
}
