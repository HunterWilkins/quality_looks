$(document).ready(function(){

    let colorScheme = {
        good: 
        {
            medium: "rgb(33, 50, 10)", 
            dark: "rgb(8, 20, 2)", 
            light: "rgb(200, 220, 16)"
        },
        meh: {
            medium: "rgb(70, 50, 20)",
            dark: "rgb(20, 13, 2)",
            light: "rgb(250, 200, 80)"
        },
        bad: {
            medium: "rgb(100, 25, 10)", 
            dark: "rgb(16, 8, 2)",
            light: "rgb(250, 100, 70)"
        }
    }

    let type = window.location.pathname.split("/")[1];


    let id = window.location.pathname.split("/")[2];
    let title;

    function displayData(data) {
        title = data.title;

        data.forEach(function(data) {

            let toHTMLText = data.text.split("\n").join("<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
            toHTMLText = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + toHTMLText;
            toHTMLText = toHTMLText.split("~").join("<hr>");
    
            $("#article-title").text(data.title);
            $("#subtitle").text(data.subtitle);
            $("#subtitle").append("<hr>");
            if (data.type !== "lecture"){
                $("#score").text(data.score + "/10");
                $("#score").append("<hr>");
            }
            $("#body").html(toHTMLText);
        });
    }


    $.getJSON("/article/" + id + "", function(data) {
        
        let color;
        let score = data[0].score;
        if (score < 5) {
            color = colorScheme.bad;
        }
        else if (score >= 5 && score < 8) {
            color = colorScheme.meh;
        }

        else if (score > 7) {
            color = colorScheme.good;
        }

        

        $("#main, body, nav a").css({"background" : color.dark});
        $("nav, nav h2").css({"background" : color.medium});
        $("#article-title").css({"color":color.light});

        displayData(data);

        $("#body").find("img").wrap("<div class = 'wrapper'></div>");
    });
});