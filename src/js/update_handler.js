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
  message.innerText = "Доступно обновление. Загружаем...";
  notification.classList.remove("hidden");
});

// message.innerText = "A new update is available. Downloading now...";
// notification.classList.remove("hidden");


ipcRenderer.on("update_downloaded", () => {
  ipcRenderer.removeAllListeners("update_downloaded");
  message.innerText =
    "Обновление загружено и будет установлено при перезапуске. Перезапустить сейчас?";
  restartButton.classList.remove("hidden");
  notification.classList.remove("hidden");
});
// message.innerText =
//   "Update Downloaded. It will be installed on restart. Restart now?";
// restartButton.classList.remove("hidden");
// notification.classList.remove("hidden");


function closeNotification() {
  notification.classList.add("hidden");
}

function restartApp() {
  // alert('Hi!')
  ipcRenderer.send("restart_app");
}
