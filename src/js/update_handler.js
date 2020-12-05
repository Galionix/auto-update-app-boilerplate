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
  message.innerHTML = 'Доступно обновление. Загружаем...';
  notification.classList.remove("hidden");

 
});

// message.innerHTML = 'Доступно обновление. Загружаем...';
// notification.classList.remove("hidden");


ipcRenderer.on("update_downloaded", () => {
  ipcRenderer.removeAllListeners("update_downloaded");
  message.innerHTML =
    'Обновление загружено и будет установлено при перезапуске. Перезапустить сейчас?';
  restartButton.classList.remove("hidden");
  notification.classList.remove("hidden");

});
const update_text = document.getElementById("update_description");

(async () => {
  let response = await fetch('https://api.github.com/repos/Galionix/electron_Call-Help/releases/latest');
  if (response.ok) { 

let jsonbody = await response.json();
console.log('json '+ jsonbody['body']); 
update_text.innerHTML =jsonbody['body'];

}
else  update_text.innerHTML = 'Ошибка получения описания. Воспользуйтесь <a class="open-in-browser" title="Почитать о выпуске" href="https://github.com/Galionix/electron_Call-Help/releases/latest">ссылкой</a> чтобы прочитать заметки о выпуске.';

update_text.style.opacity = 1
notification.classList.add("upd_text_revealed");
// $('notification_update').addClass('upd_text_revealed');
// update_text.classList.add("upd_text_revealed");







 
$('.open-in-browser').on("click", (event) => {
  event.preventDefault();
  shell.openExternal(event.target.href);
});  
  
})();





// test
// message.innerHTML =
// 'Обновление загружено и будет установлено при перезапуске. Перезапустить сейчас?';
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
  //  alert('Hi!')
  ipcRenderer.send("app-restart");
}
