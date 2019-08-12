$(document).ready(function() {

    let reviewCount = 0;   
        
    $("#devtool").on("click", "button", function(event){
        event.preventDefault();
        $("#devtool").css({"display" : "none"});
    });

    $("#show-devtool").on("click", function(event) {
        event.preventDefault();
        $("#devtool").css({"display": "block"});
    });

    $.getJSON("/all", function(data) {
        data.forEach(function(data) {
            reviewCount++;
        });
    });

    $("#dev-submit").on("click", function(event) {
        event.preventDefault();
        
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/submit",
            data: {
                Id: reviewCount,
                title: $("#art-title").val(),
                subtitle: $("#art-subtitle").val(),
                type: $("#art-type").val(),
                score: $("#art-score").val(),
                text: $("#art-text").val()
            }
        });
    });

});
