var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var isStarted = false;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColour);

    playSound(randomChoosenColour);
    $("#" + randomChoosenColour).fadeOut(100).fadeIn(100);
    animatePress(randomChoosenColour);
    
}

function playSound(buttonColour) {
    var buttonSound = new Audio("sounds/" + buttonColour + ".mp3");
    buttonSound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else{
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to restart");
        startOver();
    }
}

function startOver() {
        level = 0;
        gamePattern = [];
        isStarted = false;
}

$(".btn").click(function () { 
    var userChoosenColour = $(this).attr("id");
    userClickedPattern.push(userChoosenColour);
    
    playSound(userChoosenColour);
    animatePress(userChoosenColour);

    checkAnswer(userClickedPattern.length-1);
});

$(document).keydown(function (event) { 
    if (!isStarted) {
        $("#level-title").text("Level " + level);
        nextSequence();
        isStarted = true;
    }
});

