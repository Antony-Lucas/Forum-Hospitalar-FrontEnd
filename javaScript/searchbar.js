function search_departments(){
    var input, filter, ul, li, a, i, textValue;

    input = document.getElementById("searchbar");
    ul = document.getElementById("departments");
    li = document.getElementsByTagName("li");
    filter = input.value.toUpperCase();

    for(i = 0; i < li.length; i++){
        a = li[i].getElementsByTagName("a")[0];
        textValue = a.textContent || a.innerText;

        if(textValue.toUpperCase().indexOf(filter) > -1){
            li[i].style.display = "";
        }else{
            li[i].style.display = "none";
        }
    }   
}