$(document).ready(function() {

    let mobile = false;


    $(window).resize(function(){
        console.log(mobile);
        if ($(window).width() < 400) {
            mobile = true;
        }
        else {
            mobile = false;
        }
    });

    function displayData(data) {
        $("#reviews-list").empty();

        data.forEach(function(data){

            let good = ["rgb(86, 148, 8)", "rgb(59, 145, 11)"];
            let meh = ["rgb(209, 148, 22)", "rgb(179, 91, 6)"];
            let bad = ["rgb(194, 54, 11)", "rgb(111, 13, 3)"]
            let scorePercent = (data.score/10) * 100;
            let antiscorePercent = (10 - data.score) * 10;

            let color;
            if (data.score < 5) {
                color = bad;
            }
            else if (data.score == 5 && data.score < 8) {
                color = meh;
            }
            else if (data.score >= 8) {
                color = good;
            }

            $("#reviews-list").append(
                `
                <a href = "/reviews/${data.Id}">
                <div class = "review">
                <div class = "inner">
                <div class = "front">
                    <h3 class = "rev-title">${data.title}</h3>
                </div>

                <div class = "back"
                style = "background: linear-gradient(to right, ${color[0]} 0%, ${color[0]} ${scorePercent}%, ${color[1]} ${scorePercent}%, ${color[1]} 100%);"
                >
                    <p class = "subtitle">"${data.subtitle}"</p>
                    <p class = "score">${data.score}/10</p>
                </div>
                
                </div>
                </div>
                </a>
                `
            );
            
        });
    }

    $.getJSON("/all", function(data){
        displayData(data);
    });
});