$(document).ready(function(){
    console.log("Success");

    let article = window.location.pathname.split("/")[2];
    let title;

    

    function displayData(data) {
        title = data.title;

        data.forEach(function(data) {

            let toHTMLText = data.text.split("\n").join("<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
            toHTMLText = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + toHTMLText;
            toHTMLText = toHTMLText.split("~").join("<hr>");

            let pureText = data.text;
    
            $("#article-title").text(data.title);
            $("#subtitle").text(data.subtitle);
            $("#score").text(data.score + "/10");
            $("#main").append(toHTMLText);
        });
    }

    $.getJSON("/article/" + article + "", function(data) {
        console.log(data);
        displayData(data);
    });

});