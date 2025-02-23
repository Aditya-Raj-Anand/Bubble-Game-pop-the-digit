function makebubble(){
    var clutter = "";

    for (var i = 1; i <= 133; i++) {
        var temp = Math.floor(Math.random() * 10);
        clutter += `<div class="bubble">${temp}</div>`;
    }

    document.querySelector("#botemp").innerHTML = clutter;
}

var score = 0;
var timer = 60;
var rnt = 0;

var correctSound = new Audio("game-start-6104.mp3");
var wrongSound = new Audio("mixkit-failure-arcade-alert-notification-240.wav");
var victorySound = new Audio("success-fanfare-trumpets-6185.mp3");

function loadHighestScore() {
    var storedHighestScore = localStorage.getItem("highestScore");
    if (storedHighestScore === null) {
        localStorage.setItem("highestScore", "0");
        return 0;
    }
    return parseInt(storedHighestScore);
}

var highestScore = loadHighestScore();

function runtimer() {
    var timersec = setInterval(function() {
        if (timer > 0) {
            timer--;
            document.querySelector("#timerval").textContent = timer;
        } else {
            clearInterval(timersec);
            document.querySelector("#botemp").innerHTML = `<h1>Game Over!</h1>`;
            checkAndUpdateHighestScore();
        }
    }, 1000);
}

function gethits() {
    rnt = Math.floor(Math.random() * 10);
    document.querySelector("#Hitval").textContent = rnt;
}

function increasescore() {
    score += 10;
    document.querySelector("#scoreval").textContent = score;
    checkAndUpdateHighestScore();
}

function checkAndUpdateHighestScore() {
    if (score > highestScore) {
        highestScore = score;
        localStorage.setItem("highestScore", highestScore.toString());
        victorySound.currentTime = 0;
        victorySound.play(); 
    }
    document.querySelector("#highestscoreval").textContent = highestScore;
}

function resetGame() {
    score = 0;
    timer = 60;
    document.querySelector("#scoreval").textContent = score;
    document.querySelector("#timerval").textContent = timer;
    makebubble();
    gethits();
    runtimer();
}

document.querySelector("#botemp").addEventListener("click", function(details) {
    var target = details.target;

    if (target.classList.contains("bubble")) {
        var res = Number(target.textContent);
        if (res === rnt) {
            correctSound.currentTime = 0;
            correctSound.play();
            target.classList.add("bubble-click");
            setTimeout(function() {
                target.remove();
                increasescore();
                makebubble();
                gethits();
            }, 600);
        } else {
            wrongSound.currentTime = 0;
            wrongSound.play();
            document.querySelector("#botemp").innerHTML = `<h1>Wrong Bubble! Restarting...</h1>`;
            setTimeout(resetGame, 2000);
        }
    }
});

document.querySelector("#highestscoreval").textContent = highestScore;

gethits();
runtimer();
makebubble();
