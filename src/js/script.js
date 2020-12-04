// console.log($);
var ipc = require('electron').ipcRenderer;
 function deleteAllItems () {
  var elem = document.getElementsByClassName("clip__item");


  Array.from(elem).forEach((el) => {
    // Do stuff here
    el.remove();
});

  // elem.forEach(function (item, index) {

  //   item.remove();
  // });

  
}




var statuses_texts = localStorage.getItem("statuses");
if (statuses_texts== null ) statuses_texts = 
`нет ответа
нет ответа + письмо отправлено 
автоответчик
автоответчик + письмо отправлено
поднял(а) трубку, тишина
бросил(а) трубку
бросил(а) трубку + письмо отправлено 
номер не существует
контакты не игрока
не интересует 
не гражданин РФ
нет 18 лет 
перезвонить 
перезвонить уточнить прошел ли ИД
проинформирован + письмо 
проходит ИД + письмо отправлено 
пройдет ИД позже + письмо 
передумал проходить ИД 
прошел ид +письмо
------
письмо отправлено
`;
console.log(statuses_texts);
document.getElementById("statuses").value =statuses_texts ;
// console.log(statuses_texts);



var cliplist = document.getElementById('cliplist');
function make_elem(text,index) {
 
  var listitem = document.createElement("div");
 if (index==0) {
    listitem.removeAttribute('id');
  }
listitem.setAttribute("id", "selectable");
listitem.classList.add(  "clip__item");
  listitem.textContent = text;
  return listitem;
}


function renewClips() {
  console.log('clips renewed!')
  deleteAllItems();
  console.log("items delete "+document.getElementsByClassName("clip__item").length);
  statuses_texts.split('\n').forEach((element,index) => {
    cliplist.appendChild(make_elem(element,index));
    
    });
    console.log(document.getElementsByClassName("clip__item").length);
}
renewClips();

$( "#menu_cliplist" ).on("mouseup", renewClips());

// console.log(document.getElementById('cliplist'))



var date_text = function(){

  var currentdate = new Date();
  // getMonth(currentdate.getMonth()+1)
  return `[${ addZero(currentdate.getDay()-1 ) }.${ addZero(currentdate.getMonth()+1)} ${addZero(currentdate.getHours())}:${addZero(currentdate.getMinutes()) }] `;
}

let prev_text = document.getElementById('selectable').textContent;
function selectText(containerid) {
if (window.getSelection) {
      var range = document.createRange();
      range.selectNode(document.getElementById(containerid));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
  }
}

// $( ".clip__item" ).on("mousedown", function() {

// alert( "Handler for .click() called." );

// });

function my_restart()
{
  ipc.send('app-restart', 'someData');
}


function allhide() {
    $('#cliplist').hide();
    $('#chat').hide();
    $('#bonus').hide();
    $('#settings').hide();
    $('#info').hide();
}

$('#menu_settings').on("mouseup", function(){
    allhide();
$('#settings').show();
});
$('#menu_cliplist').on("mouseup", function(){
    allhide();
$('#cliplist').show();
});
$('#menu_chat').on("mouseup", function(){
    allhide();
    $('#chat').show();
});
$('#menu_bonus').on("mouseup", function(){
    allhide();
$('#bonus').show();
});
$('#menu_info').on("mouseup", function(){
    allhide();
$('#info').show();
});

function unselect_all_cliplist_items() {
    
    $( ".clip__item" ).each(function(  ) {
        $(this).removeClass("menu-list-item-active");
      });
}
var getMonth = function(idx) {

  var objDate = new Date();
  objDate.setDate(1);
  objDate.setMonth(idx-1);

  var locale = "ru-ru",
      month = objDate.toLocaleString(locale, { month: "long" });

    return month;
}

var addZero = function (num){
console.log(num.toString().length);

  return  (num.toString().length > 1 )? num: '0'+num.toString() ;
   
}

// $('.clip__item').on("mousedown", function(){

//   document.getElementById('selectable').textContent = prev_text;
//   document.getElementById('selectable').id = '';

//   prev_text = $(this).text();
//   $(this).text('\r\n'+date_text()+ $(this).text()) ;

//  $(this).attr("id", "selectable");

//  selectText("selectable");
// });



$('.clip__item').on("mouseup", function(){
  document.getElementById('selectable').textContent = prev_text;

// console.log(`elem ${$( this ).text()}`);

// let o_date = new Intl.DateTimeFormat;
// let f_date = (m_ca, m_it) => Object({...m_ca, [m_it.type]: m_it.value});
// let m_date = o_date.formatToParts().reduce(f_date, {});

// console.log(m_date.day + '.' + m_date.month );
var currentdate = new Date();
// getMonth(currentdate.getMonth()+1)
navigator.clipboard.writeText(date_text()+$( this ).text());

unselect_all_cliplist_items();

$(this).addClass("menu-list-item-active");
    
    
});

// console.log('done');

var authButton = document.getElementById('menu_bonus');
authButton.addEventListener('click', function(){
    ipc.once('actionReply', function(event, response){
      authButton.textContent= response;
        
    })
    ipc.send('invokeAction', 'someData');
});

ipc.send('app_version');
ipc.on('app_version', (event, arg) => {
  ipc.removeAllListeners('app_version');
  version.innerText = 'Version ' + arg.version;
});



const shell = require('electron').shell;


$('.open-in-browser').on("click", (event) => {
        event.preventDefault();
        shell.openExternal(event.target.href);
});


$("#statuses").on("keyup", function(e){
  var statuses = document.getElementById("statuses").value ;
  //localStorage["user"] = user ;
  localStorage.setItem("statuses", statuses) ;
});