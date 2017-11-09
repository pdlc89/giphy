$(document).ready(function(){

//Global veriables
var isStartChosen = false;
var topics = ["The Simpsons", "Family Guy", "Southpark", "Rick and Morty", "Brickleberry"];
var newTopic;
var i = 0;
var animatedArray = [];
var stillArray = [];
var itemArray = [];
//var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userchoice + "api_key=o0TlHY8s49ooEHVkt5EJ9csM6Tf5BvHi";

//Functions

// This function will call the giphy api 
function queryCall(){
	var userchoice = this.value;
	console.log("You chose: " + userchoice);
	//var call = queryURL + userchoice;
	//console.log(queryURL)
	//cycles between the 25 images that are delivered throught the call
	if (i <= 25) {
		i++;
	}else{
		i = 0;
	}
// The meat of the homework. 
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userchoice + "&api_key=o0TlHY8s49ooEHVkt5EJ9csM6Tf5BvHi";
			$.ajax({
			url:queryURL,
			method: "GET"
		}).done(function(response) {
			//console.log(response)
		//creates the images
			var imageUrl = response.data[i].images.original.url;
	        var gifImages = $("<img>");
	        gifImages.addClass("gif-button")
	        gifImages.attr("src", imageUrl)
	        gifImages.attr("id", userchoice);
	        gifImages.attr("state", "animate")
	        gifImages.attr("name", "item-" + i);
	        $("#gif-area").prepend(gifImages);
	        itemArray.push("item-" + i);
	        //console.log(itemArray);
	    //creates the ratings tage under ther image
	        var results = response.data[i];
            var gifRating = $("<p>");
            var rate = results.rating;
            var p = $("<p>").text("Rating: " + rate);
            $("#gif-area").append(p)
//creates an array of user choices filled with the url of the still images
			animatedArray.push(imageUrl);
			var still = response.data[i].images.original_still.url;
			stillArray.push(still);
			//console.log(stillArray);

		});
}
//This will take care of pausing and starting images

function gifEvent (){
	var gifClicked = this.name;
	var dataState = $(this).attr("state");
	//console.log(dataState)
	//Takes the index value of "name" and puts it to a holder
	var holder = itemArray.indexOf(gifClicked);
	//Takes the value in "holder" and takes the corresponding url from each Array
	var animatedGif = animatedArray[holder];
	var stillGif = stillArray[holder];
	//console.log(stillGif);
	  if (dataState === "animate") {
		$(this).attr("state", "still");
		$(this).attr("src", stillGif);
	}else {
		$(this).attr("state", "animate");
		$(this).attr("src", animatedGif);
	}
}

//Start button
  
	$("#title").on("click", function(){
	  if (isStartChosen === false){
		for (var i = 0; i < topics.length; i++) {
	//Will create the buttons
			var btn = $("<button>");
			btn.addClass("topic-button");
			btn.attr("value", topics[i]);
			btn.text(topics[i]);
			$("#button-area").append(btn)
		}
	isStartChosen = true;
	  };

	});

	$(document).on("click", ".topic-button", queryCall); 
	$(document).on("click", ".gif-button", gifEvent);

//Addition of button, Submission event
	$("#add").on("click", function(){
		if(isStartChosen === true) {
			var newTopic = $('input').val();
			var newBtn = $("<button>");
			newBtn.addClass("topic-button");
			newBtn.attr("value", newTopic);
			newBtn.text(newTopic);
			$("#button-area").append(newBtn)
			$("input").val("");
		}else {
			alert("Plese Click: \"Science\"");
		}

	});
});