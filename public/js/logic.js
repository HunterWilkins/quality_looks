$(document).ready(function() {

    let reviewCount = 0;   

    $.getJSON("/all", function(data) {
        data.forEach(function(data) {
            reviewCount++;
        });
    });

    // First Username Pass

    $("#dev-submit").on("click", function(event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        let reviewInfo = {
            Id: reviewCount,
            title: $("#art-title").val(),
            subtitle: $("#art-subtitle").val(),
            type: $("#art-type").val(),
            score: $("#art-score").val(),
            text: $("#art-text").val()
        }   
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/submit",
            data: { 
                username : $("#username").val(),
                password : $("#password").val(),
                reviewInfo : reviewInfo
            }
        });
        return false;
    });

    $("#update").on("click", function(e){
        e.preventDefault();

        if ($("#art-text").val() === "") {             
            $.getJSON("/all", function(data){
                data.forEach(data => {
                    if (data.title === $("#art-title").val()){
                        $("#art-text").val(data.text);
                        $("#art-subtitle").val(data.subtitle);
                        $("#art-type").val(data.type);
                        $("#art-score").val(data.score);
                    }
                })
            });
        }

        else {

            let reviewInfo = {
                Id: reviewCount,
                subtitle: $("#art-subtitle").val(),
                type: $("#art-type").val(),
                score: $("#art-score").val(),
                text: $("#art-text").val()
            }   
    
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "/update",
                data: {
                    title: $("#art-title").val(),
                    username : $("#username").val(),
                    password: $("#password").val(),
                    reviewInfo: reviewInfo
                }
            });
        }
    });

    
    $("#delete").on("click", function(e){
        e.preventDefault();

        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/delete",
            data: {
                title: $("#art-title").val(),
                username : $("#username").val(),
                password: $("#password").val()
            }
        });
    });

    // $("#reg-submit").on("click", function(event){
    //     event.preventDefault();
    //     $.ajax({
    //         type: "POST",
    //         dataType: "json",
    //         url: "/register",
    //         data: {
    //             username: $("#reg-user").val(),
    //             password: $("#reg-pass").val()
    //         }
    //     });
    // })

});
