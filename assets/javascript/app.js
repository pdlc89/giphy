$(document).ready(function(){

//Global veriables
var isStartChosen = false;
var topics = ["Scientist", "Engineer", "Biologist", "Math"];
var newTopic;
var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=o0TlHY8s49ooEHVkt5EJ9csM6Tf5BvHi&tags=";

//Functions
function queryCall(){
	var userchoice = this.value;
	console.log("You chose: " + userchoice);
	var call = queryURL + userchoice;
	console.log(call)

		$.ajax({
		url:queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response)
		var imageUrl = response.data.image_original_url;
        var gifImages = $("<img>");
        gifImages.attr("src", imageUrl)
        gifImages.attr("alt", "hello" );
        $("#gif-area").prepend(gifImages);
	});
}

//Start button
  
	$("#title").on("click", function(){
	  if (isStartChosen === false){
		for (var i = 0; i < topics.length; i++) {
			var btn = $("<button>");
			btn.addClass("topic-button");
			btn.attr("value", topics[i]);
			btn.text(topics[i]);
			$("#button-area").append(btn)
		}
	isStartChosen = true;
	  };

	});

//Execution of gifs

	/*$(".topic-button").on("click", function() {
		var userchoice = this.value;
		console.log("You chose: " + userchoice);


	});*/
	$(document).on("click", ".topic-button", queryCall); 

//Addition of button, Submission event
	$("#add").on("click", function(){
		if(isStartChosen === true) {
			var newTopic = $('input').val();
			var newBtn = $("<button>");
			newBtn.addClass("topic-button");
			newBtn.attr("value", newTopic);
			newBtn.text(newTopic);
			$("#button-area").append(newBtn)
			$("input").empty();
		}else {
			alert("Plese Click: \"Science\"");
		}

	});
});