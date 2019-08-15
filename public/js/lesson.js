$(document).ready(function(){

    console.log("Running...")

    let id = window.location.pathname.split("/")[2];


    function displayData(data) {
        title = data.title;

        data.forEach(function(data) {

            let toHTMLText = data.text.split("\n").join("<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
            toHTMLText = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + toHTMLText;
            toHTMLText = toHTMLText.split("~").join("<hr>");

            let pureText = data.text;
    
            $("#article-title").text(data.title);
            $("#subtitle").text(data.subtitle);
            $("#body").html(toHTMLText);
        });
    }




    $.getJSON("/lessons/" + id + "", function(data){
        displayData(data);
    })


})
