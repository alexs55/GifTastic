

var defaultArray = ["kpop", "tokyo", "kh","2ne1", "shibuya", "new york", "seoul", "shibuya", "jpop"]



function buttonMaker(){
    for (var i = 0; i < defaultArray.length; i++) {
        var newButton = $("<button>")

        newButton.attr({
            "class": "button",
            "value": defaultArray[i],


        });

        newButton.text(defaultArray[i]);
        $("#button-placeholder").append(newButton);


    }
}
buttonMaker();

$("form input").on("keypress", function(e) {
    
    return e.keyCode != 13;
    
});


function newButton(){
    console.log($("#inputB").val().trim());
    var newB = $("#inputB").val().trim()
   if ( newB === ""){
       alert("Please provide an input to create a new button");
   }
   else{
   
   defaultArray.push(newB); 
   $("#inputB").val("");
   $("#button-placeholder").empty();
   buttonMaker();
   }
}







$(document).on('click', ".button", function (response) {

    var searchQuery = $(this).val().trim();

    var hits = 10

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=IDA0dO88j2oHEev7TafD1kCmcL3gUYxg&q=" + searchQuery + "&limit=" + hits + "&offset=0&rating=G&lang=en";




    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        
        var res = response.data;

        console.log(res[2].images.fixed_height_still.url);

        for(var i = 0; i < res.length; i++){

        var result = $("<div>"); 

        var rating = res[i].rating;

       

        

        var p = $("<p>").text("Rating: " + rating);

        var resultImage = $("<img>");


        resultImage.attr({
            "src": res[i].images.fixed_height_still.url,
            "animation" : "still",
            "class" : 'gif',
            "data_Still" : res[i].images.fixed_height_still.url,
            "data_Animate": res[i].images.fixed_height.url
            
        });

        result.prepend(p);
        result.prepend(resultImage);


        result.attr({
            "alt": searchQuery,
            "class" : "results"
           
            
        })

        $("#response-placeholder").prepend(result)

    }
    })
})

$(document).on("click", ".gif", function(){
    var state = $(this).attr('animation')
    console.log("clicked")

    if( state === "still"){
        $(this).attr({
            'animation' : 'animate',
            'src' : $(this).attr("data_animate")
        })

    }

    if ( state === "animate"){
        $(this).attr({
            'animation' : 'still',
            'src' : $(this).attr("data_still")
        })
    }


});




