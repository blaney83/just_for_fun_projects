$(document).ready(function () {
    console.log("hello")

    $("button").on("click", function(){
        // $.ajax({
        //     method: "GET",
        //     url: "/"
        // }).then(function (resp) {
        //     console.log(resp)
        // })

        $.get("/", function(req, res, err){
            console.log(res)
        })
    })



    // $("#sendRelatedDrugsHere").text(infoRelatedPills)
})

