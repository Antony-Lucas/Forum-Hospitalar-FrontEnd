var search_bar = document.getElementById("searchbar");
var search_icon = document.getElementById("searchIcon");

search_bar.addEventListener('focusin', function(){
    search_icon.style.color = "#ffffff";
    search_icon.style.borderBottomColor = "#ffffff";
});

search_bar.addEventListener('focusout', function(){
    search_icon.style.color = "#ffffff77";
    search_icon.style.borderBottomColor = "#ffffff77";
});