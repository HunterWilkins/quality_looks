$(document).ready(function(){
    console.log("Logic running.");
    
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