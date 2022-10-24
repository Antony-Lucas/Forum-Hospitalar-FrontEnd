var date_now = document.getElementById('dateNow');
var hour_now = document.getElementById('hourNow');

var date_ = new Date();

let getDay = date_.toLocaleDateString('default', {day: "2-digit"});
let getMonth= date_.toLocaleDateString('default', {month: 'short'});
let getYear = date_.getFullYear();
let getLocalTime = Intl.DateTimeFormat( 'pt-BR', {hour: 'numeric', minute: 'numeric'} ).format(date_);

window.onload = date_now.innerHTML = `${getDay + " " +getMonth+ " " +getYear}`;
window.onload = hour_now.innerHTML = `${getLocalTime}`;