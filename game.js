var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$("document").ready(function() {

  $(this).keydown(function(e) {
    e.preventDefault();
    console.log("key press");
    if (started == false) {
      nextSequence();
      started = true;
    }
  });

  $(".btn").click(function() {
    console.log("button click");
    if (started == true) {
      var userChoosenColour = $(this).attr("id");
      userClickedPattern.push(userChoosenColour);
      if (gamePattern.length == userClickedPattern.length) {
        checkAnswer(userClickedPattern.length-1);
      }
    }
  });
});

function nextSequence() {
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  animatePress(randomChosenColour);
  //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
  level++;
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentlevel) {
  console.log(currentlevel);
  var patternMatched = true;
  if (gamePattern[currentlevel] == userClickedPattern [currentlevel]) {
    console.log("success");
    for (var i=0;i<currentlevel;i++) {
      if (gamePattern[i] != userClickedPattern [i]) {
        console.log("wrong sequence");
        patternMatched = false;
      }
    }
    if (patternMatched == true) {
      console.log("patter matched");
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  } else {
    console.log("wrong");
    patternMatched = false;
  }
  userClickedPattern = [];

  if (patternMatched == false) {
    console.log("pattern didn't match");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
