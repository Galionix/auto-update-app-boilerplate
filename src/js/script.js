// console.log($);
$( "#target" ).on("mouseup", function() {
  alert( "Handler for .click() called." );
});


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
$('.clip__item').on("mouseup", function(){

// console.log(`elem ${$( this ).text()}`);

// let o_date = new Intl.DateTimeFormat;
// let f_date = (m_ca, m_it) => Object({...m_ca, [m_it.type]: m_it.value});
// let m_date = o_date.formatToParts().reduce(f_date, {});

// console.log(m_date.day + '.' + m_date.month );
var currentdate = new Date();
// getMonth(currentdate.getMonth()+1)
navigator.clipboard.writeText(`[${ addZero(currentdate.getDay()-1 ) }.${ addZero(currentdate.getMonth()+1)} ${addZero(currentdate.getHours())}:${addZero(currentdate.getMinutes()) }] `+$( this ).text());

unselect_all_cliplist_items();

$(this).addClass("menu-list-item-active");
    
    
});

// console.log('done');
var ipc = require('electron').ipcRenderer;
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