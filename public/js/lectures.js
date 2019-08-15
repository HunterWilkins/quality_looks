$(document).ready(function(){
    console.log("Logic running.");
    
    let lecture = window.location.pathname.split("/")[2];

    function displayData(data) {
        $("#lecture-list").empty();

        data.forEach(function(data){
            $("#lecture-list").append(
                `
                <a href = "/lectures/${data.Id}">
                <div class = "lecture">
                    <h3 class = "lecture-title">${data.title}</h3>    
                </div>
                </a>
                `
            );
        });
    }

    $.getJSON("/lectures", function(data){
        displayData(data);
    });
});