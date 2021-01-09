//boolean variables (global)
let cpu = false;
let pvp = false;
let bestOf1 = false;
let bestOf5 = false;
let bestOf7 = false;
let playerScore = 0;
let player2Score = 0;
let cpuScore = 0;
let player1Chose = false;
let player2Chose = false;



//extra global variables
let amountOfRounds = 0;
let currentRound = 0;
let index = document.getElementById("index");
let loadPageHere = document.getElementById("loadPageHere");
let playerChoice = "";
let player2Choice = "";
let gameType;
let cpuChoice = ""


let cpuAnimate;
let cpuAnimate2;
let cpuAnimate3;
let playerAnimate;
let playerAnimate2;
let playerAnimate3;
let results;
let playAgainBtn;
let backToMenuBtn;
let continueRoundsBtn;
let rounds;
let confirmSwitch;
let antiCheat

//Win Conditions
const rockWin = ["scissors", "lizard"];
const paperWin = ["rock", "spock"];
const scissorsWin = ["lizard", "paper"];
const spockWin = ["scissors", "rock"];
const lizardWin = ["spock", "paper"];

//Buttons to distinguish game type
let cpuGameBtn = document.getElementById("cpuGameBtn");
let pvpGameBtn = document.getElementById("pvpGameBtn")

cpuGameBtn.addEventListener('click', function () {
    gameType = "cpu";
    loadPage("../pages/determineRd.html");
});
pvpGameBtn.addEventListener('click', function () {
    gameType = "pvp";
    loadPage("../pages/determineRd.html");
})


//This takes in a url(api url / html doc ) and call another function to load its data.
//thee called function is another function outside the bounds of the fetch
//When passing in html think of the function that gets called as the web page, then you can handle that pages functional logic
function loadPage(page, gameType) {
    if (page === "../pages/determineRd.html") {
        fetch(page)
            .then(
                data => {
                    return data.text().then((text) =>

                        determineRound(text)
                    )
                }
            )
    } else if (page == "../pages/ChooseWeap.html") {
        fetch(page)
            .then(
                data => {
                    return data.text().then((text) =>
                        plyrChoice(text, gameType, amountOfRounds)

                    )
                }
            )
    } else if (page == "../pages/finalR.html") {
        fetch(page)
            .then(
                data => {
                    return data.text().then((text) =>
                        theResults(text)

                    )
                }
            )
    } else if (page == "../pages/playerSwitch.html") {
        fetch(page)
            .then(
                data => {
                    return data.text().then((text) =>
                        switchingPlayers(text)

                    )
                }
            )
    }
}
function switchingPlayers(html) {
    loadPageHere.innerHTML = html;
    if (player1Chose == false && player2Chose == false) {
        confirmSwitch = document.getElementById("confirmSwitch")
        antiCheat = document.getElementById("antiCheat");
        setTimeout(function(){
            confirmSwitch.addEventListener("click", function () {
                index.classList = "weaponChoiceBG"
                loadPage("../pages/ChooseWeap.html", gameType, amountOfRounds);
            });

        }, 1000)
    } else if (player1Chose == true && player2Chose == false) {
        confirmSwitch = document.getElementById("confirmSwitch")
        antiCheat = document.getElementById("antiCheat");
        antiCheat.innerText = "Player 1 look away. Player 2 hit confirm when Ready";
        setTimeout(function(){
            confirmSwitch.addEventListener("click", function () {
                index.classList = "weaponChoiceBG"
                loadPage("../pages/ChooseWeap.html", gameType, amountOfRounds);
            });
        }, 1000)
       
    }
}

function determineRound(html) {
    loadPageHere.innerHTML = html
    const oneRound = document.getElementById("oneRound");
    const fiveRounds = document.getElementById("fiveRounds");
    const sevenRounds = document.getElementById("sevenRounds");
    const confirmRoundsBtn = document.getElementById("confirmRoundsBtn");
    let decidingRounds = document.getElementById("decidingRounds");
    const warning = document.getElementById("warning");
    oneRound.addEventListener('click', () => {
        decidingRounds.innerText = "Just One";
        bestOf1 = true;
        bestOf5 = false;
        bestOf7 = false;
        amountOfRounds = 1;

    });
    fiveRounds.addEventListener('click', () => {
        decidingRounds.innerText = "Best of five";
        bestOf5 = true;
        bestOf1 = false;
        bestOf7 = false;
        amountOfRounds = 5;

    });
    sevenRounds.addEventListener('click', () => {
        decidingRounds.innerText = "Best of seven";
        bestOf7 = true;
        bestOf5 = false;
        bestOf1 = false;
        amountOfRounds = 7;

    });
    confirmRoundsBtn.addEventListener('click', function () {
        if (bestOf1 == false && bestOf5 == false && bestOf7 == false) {
            warning.classList.remove("d-none")
            warning.classList.add("d-flex")
            setTimeout(function () {
                warning.classList.remove("d-flex")
                warning.classList.add("d-none")
            }, 3500)
        } else {
            if (gameType == "cpu") {
                index.classList = "weaponChoiceBG";
                loadPage("../pages/ChooseWeap.html", gameType, amountOfRounds);
            } else {
                index.classList = "switchPlayerBG";
                loadPage("../pages/playerSwitch.html");
            }
        }
    });
}
async function getCPU() {
    let promise = await fetch("https://csa2020studentapi.azurewebsites.net/rpsls");
    cpuChoice = await promise.text();
}


function plyrChoice(text, gameType, totalRounds) {
    loadPageHere.innerHTML = text;
    if (gameType == "cpu") {
        if (totalRounds == 1) {

            getCPU();
            cpuChoice = cpuChoice.toLowerCase();
            const rock = document.getElementById("rock");
            const rockBtn = document.getElementById("rockBtn");
            const paper = document.getElementById("paper")
            const paperBtn = document.getElementById("paperBtn")
            const scissors = document.getElementById("scissors");
            const scissorsBtn = document.getElementById("scissorsBtn");
            const spock = document.getElementById("spock")
            const spockBtn = document.getElementById("spockBtn")
            const lizard = document.getElementById("lizard");
            const lizardBtn = document.getElementById("lizardBtn");

            rock.addEventListener('click', function () {
                playerChoice = "rock";
                loadPage("../pages/finalR.html");
                index.classList = "resultsBG";
            })
            rockBtn.addEventListener('click', function () {
                playerChoice = "rock";

                loadPage("../pages/finalR.html");
                index.classList = "resultsBG";
            })
            paper.addEventListener('click', function () {
                playerChoice = "paper";

                loadPage("../pages/finalR.html");
                index.classList = "resultsBG";
            })
            paperBtn.addEventListener('click', function () {
                playerChoice = "paper";

                loadPage("../pages/finalR.html");
                index.classList = "resultsBG";
            })
            scissors.addEventListener('click', function () {
                playerChoice = "scissors";

                loadPage("../pages/finalR.html");
                index.classList = "resultsBG";
            })
            scissorsBtn.addEventListener('click', function () {
                playerChoice = "scissors";

                loadPage("../pages/finalR.html");
                index.classList = "resultsBG";
            })
            spock.addEventListener('click', function () {
                playerChoice = "spock";

                loadPage("../pages/finalR.html");
                index.classList = "resultsBG";
            })
            spockBtn.addEventListener('click', function () {
                playerChoice = "spock";

                loadPage("../pages/finalR.html");
                index.classList = "resultsBG";
            })
            lizard.addEventListener('click', function () {
                playerChoice = "lizard";

                loadPage("../pages/finalR.html");
                index.classList = "resultsBG";
            })
            lizardBtn.addEventListener('click', function () {
                playerChoice = "lizard";

                loadPage("../pages/finalR.html");
                index.classList = "resultsBG";
            })
            currentRound++
        } else if (totalRounds == 5 && currentRound <= totalRounds) {
            console.log(currentRound);
            getCPU();

            cpuChoice = cpuChoice.toLowerCase();
            const rock = document.getElementById("rock");
            const rockBtn = document.getElementById("rockBtn");
            const paper = document.getElementById("paper")
            const paperBtn = document.getElementById("paperBtn")
            const scissors = document.getElementById("scissors");
            const scissorsBtn = document.getElementById("scissorsBtn");
            const spock = document.getElementById("spock")
            const spockBtn = document.getElementById("spockBtn")
            const lizard = document.getElementById("lizard");
            const lizardBtn = document.getElementById("lizardBtn");

            rock.addEventListener('click', function () {

                playerChoice = "rock";
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"

            });
            rockBtn.addEventListener('click', function () {

                playerChoice = "rock";
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            });
            paper.addEventListener('click', function () {

                playerChoice = "paper";
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            });
            paperBtn.addEventListener('click', function () {

                playerChoice = "paper";
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            });
            scissors.addEventListener('click', function () {

                playerChoice = "scissors";
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            });
            scissorsBtn.addEventListener('click', function () {

                playerChoice = "scissors";
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            });
            spock.addEventListener('click', function () {

                playerChoice = "spock";
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            });
            spockBtn.addEventListener('click', function () {

                playerChoice = "spock";
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            });
            lizard.addEventListener('click', function () {

                playerChoice = "lizard";
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            });
            lizardBtn.addEventListener('click', function () {
                playerChoice = "lizard";

                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            });
            currentRound++
        } else {
            getCPU();

            cpuChoice = cpuChoice.toLowerCase();
            const rock = document.getElementById("rock");
            const rockBtn = document.getElementById("rockBtn");
            const paper = document.getElementById("paper")
            const paperBtn = document.getElementById("paperBtn")
            const scissors = document.getElementById("scissors");
            const scissorsBtn = document.getElementById("scissorsBtn");
            const spock = document.getElementById("spock")
            const spockBtn = document.getElementById("spockBtn")
            const lizard = document.getElementById("lizard");
            const lizardBtn = document.getElementById("lizardBtn");

            rock.addEventListener('click', function () {
                playerChoice = "rock";
                currentRound++
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            })
            rockBtn.addEventListener('click', function () {
                playerChoice = "rock";
                currentRound++
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            })
            paper.addEventListener('click', function () {
                playerChoice = "paper";
                currentRound++
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            })
            paperBtn.addEventListener('click', function () {
                playerChoice = "paper";
                currentRound++
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            })
            scissors.addEventListener('click', function () {
                playerChoice = "scissors";
                currentRound++
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            })
            scissorsBtn.addEventListener('click', function () {
                playerChoice = "scissors";
                currentRound++
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            })
            spock.addEventListener('click', function () {
                currentRound++
                playerChoice = "spock";
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            })
            spockBtn.addEventListener('click', function () {
                currentRound++
                playerChoice = "spock";
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            })
            lizard.addEventListener('click', function () {
                playerChoice = "lizard";
                currentRound++
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            })
            lizardBtn.addEventListener('click', function () {
                currentRound++
                playerChoice = "lizard";
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            })
        }
    } else {

        if (player1Chose == false && player2Chose == false) {
            player1Chose = true;
            const rock = document.getElementById("rock");
            const rockBtn = document.getElementById("rockBtn");
            const paper = document.getElementById("paper")
            const paperBtn = document.getElementById("paperBtn")
            const scissors = document.getElementById("scissors");
            const scissorsBtn = document.getElementById("scissorsBtn");
            const spock = document.getElementById("spock")
            const spockBtn = document.getElementById("spockBtn")
            const lizard = document.getElementById("lizard");
            const lizardBtn = document.getElementById("lizardBtn");

            rock.addEventListener('click', function () {
                playerChoice = "rock";
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
                loadPage("../pages/playerSwitch.html");
            })
            rockBtn.addEventListener('click', function () {
                playerChoice = "rock";
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
                loadPage("../pages/playerSwitch.html");
            })
            paper.addEventListener('click', function () {
                playerChoice = "paper";
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
                loadPage("../pages/playerSwitch.html");
            })
            paperBtn.addEventListener('click', function () {
                playerChoice = "paper";
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
                loadPage("../pages/playerSwitch.html");
            })
            scissors.addEventListener('click', function () {
                playerChoice = "scissors";
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
                loadPage("../pages/playerSwitch.html");
            })
            scissorsBtn.addEventListener('click', function () {
                playerChoice = "scissors";
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
                loadPage("../pages/playerSwitch.html");
            })
            spock.addEventListener('click', function () {
                playerChoice = "spock";
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
                loadPage("../pages/playerSwitch.html");
            })
            spockBtn.addEventListener('click', function () {
                playerChoice = "spock";
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
                loadPage("../pages/playerSwitch.html");
            })
            lizard.addEventListener('click', function () {
                playerChoice = "lizard";
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
                loadPage("../pages/playerSwitch.html");
            })
            lizardBtn.addEventListener('click', function () {
                playerChoice = "lizard";
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
                loadPage("../pages/playerSwitch.html");
            })

        } else if (player1Chose == true & player2Chose == false) {
            player2Chose = true;
            const rock = document.getElementById("rock");
            const rockBtn = document.getElementById("rockBtn");
            const paper = document.getElementById("paper")
            const paperBtn = document.getElementById("paperBtn")
            const scissors = document.getElementById("scissors");
            const scissorsBtn = document.getElementById("scissorsBtn");
            const spock = document.getElementById("spock")
            const spockBtn = document.getElementById("spockBtn")
            const lizard = document.getElementById("lizard");
            const lizardBtn = document.getElementById("lizardBtn");

            rock.addEventListener('click', function () {
                player2Choice = "rock";
                currentRound++
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            })
            rockBtn.addEventListener('click', function () {
                player2Choice = "rock";
                currentRound++
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            })
            paper.addEventListener('click', function () {
                player2Choice = "paper";
                currentRound++
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            })
            paperBtn.addEventListener('click', function () {
                player2Choice = "paper";
                currentRound++
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            })
            scissors.addEventListener('click', function () {
                player2Choice = "scissors";
                currentRound++
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            })
            scissorsBtn.addEventListener('click', function () {
                player2Choice = "scissors";
                currentRound++
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            })
            spock.addEventListener('click', function () {
                currentRound++
                player2Choice = "spock";
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            })
            spockBtn.addEventListener('click', function () {
                currentRound++
                player2Choice = "spock";
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            })
            lizard.addEventListener('click', function () {
                player2Choice = "lizard";
                currentRound++
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            })
            lizardBtn.addEventListener('click', function () {
                currentRound++
                player2Choice = "lizard";
                loadPage("../pages/finalR.html")
                index.classList = "resultsBG"
            })
        }


    }

}

function theResults(html) {
    loadPageHere.innerHTML = html;
    cpuAnimate = document.getElementById("cpuAnimation");
    cpuAnimate2 = document.getElementById("cpuAnimation2");
    cpuAnimate3 = document.getElementById("cpuAnimation3");
    playerAnimate = document.getElementById("playerAnimation");
    playerAnimate2 = document.getElementById("playerAnimation2");
    playerAnimate3 = document.getElementById("playerAnimation3");
    results = document.getElementById("results");
    playAgainBtn = document.getElementById("playAgain");
    backToMenuBtn = document.getElementById("reset");
    continueRoundsBtn = document.getElementById("nextRound");
    continueRoundsBtn2 = document.getElementById("nextRound2");
    rounds = document.getElementById("rounds");
    playAgainBtn.addEventListener("click", function () {
        loadPage("../pages/determineRd.html")
    });
    backToMenuBtn.addEventListener('click', function () {
        location.reload()
    });
    continueRoundsBtn.addEventListener("click", function () {
        loadPage("../pages/ChooseWeap.html")
    });
    rounds.innerText = `Round ${currentRound} out of ${amountOfRounds}`


    if (gameType == "cpu") {
        setTimeout(function () {
            $(document).ready(function () {
                $("#myModal").modal('show');
            });
        }, 1000);
        setTimeout(function () {
            let loadScreen = document.getElementById("loadScreen");
            let spinner = document.getElementById("spinner");
            let CPUseeResultsBtn = document.getElementById("CPUseeResultsBtn");
            setTimeout(function () {
                spinner.classList.add("d-none")
                loadScreen.innerText = "CPU is ready!"
                CPUseeResultsBtn.removeAttribute("disabled")

                CPUseeResultsBtn.addEventListener('click', function () {


                    cpuChoice = cpuChoice.toLowerCase();
                    cpuSetIcons(cpuChoice);


                    playerSetIcons(playerChoice);

                    setTimeout(function () {

                        cpuAnimate.classList.add("slideRight");
                        cpuAnimate2.classList.add("slideRight");
                        cpuAnimate3.classList.add("slideRight");

                        cpuAnimate.classList.remove("d-none");
                        cpuAnimate2.classList.remove("d-none");
                        cpuAnimate3.classList.remove("d-none");

                        determineWinner(playerChoice);

                        setTimeout(function () {
                            playerAnimate.classList.add("slideLeft");
                            playerAnimate2.classList.add("slideLeft");
                            playerAnimate3.classList.add("slideLeft");

                            playerAnimate.classList.remove("d-none");
                            playerAnimate2.classList.remove("d-none");
                            playerAnimate3.classList.remove("d-none");
                        }, 1000);

                        setTimeout(function () {
                            if (amountOfRounds == currentRound) {
                                if (playerScore > cpuScore) {
                                    results.innerText = "You won the game!"
                                } else if (cpuScore > playerScore) {
                                    results.innerText = "YOU LOSE"
                                } else if (cpuScore == playerScore) {
                                    results.innerText = "It's a Draw!!"
                                }
                            }
                            results.classList.add("zoomer");
                            results.classList.remove("d-none");
                            if (amountOfRounds == 1) {
                                setTimeout(function () {
                                    playAgainBtn.classList.remove("d-none");
                                    playAgainBtn.classList.add("d-flex");
                                    backToMenuBtn.classList.remove("d-none");
                                    backToMenuBtn.classList.add("d-flex");
                                    currentRound = 0;

                                }, 1000);

                            } else if (amountOfRounds == 5 && currentRound < amountOfRounds || currentRound == 5) {

                                switch (currentRound) {
                                    case 1:

                                        currentRound++;
                                        setTimeout(function () {
                                            continueRoundsBtn.classList.remove("d-none");
                                            continueRoundsBtn.classList.add("d-flex");
                                            continueRoundsBtn2.innerText = `Continue to round ${currentRound} of ${amountOfRounds}`
                                        }, 1000);
                                        break;
                                    case 2:

                                        currentRound++;
                                        setTimeout(function () {
                                            continueRoundsBtn.classList.remove("d-none");
                                            continueRoundsBtn.classList.add("d-flex");
                                            continueRoundsBtn2.innerText = `Continue to round ${currentRound} of ${amountOfRounds}`
                                        }, 1000);
                                        break;
                                    case 3:

                                        currentRound++;
                                        setTimeout(function () {
                                            continueRoundsBtn.classList.remove("d-none");
                                            continueRoundsBtn.classList.add("d-flex");
                                            continueRoundsBtn2.innerText = `Continue to round ${currentRound} of ${amountOfRounds}`
                                        }, 1000);
                                        break;
                                    case 4:

                                        currentRound++;
                                        setTimeout(function () {
                                            continueRoundsBtn.classList.remove("d-none");
                                            continueRoundsBtn.classList.add("d-flex");
                                            continueRoundsBtn2.innerText = `Continue to round ${currentRound} of ${amountOfRounds}`
                                        }, 1000);
                                        break;
                                    case 5:
                                        setTimeout(function () {
                                            playAgainBtn.classList.remove("d-none");
                                            playAgainBtn.classList.add("d-flex");
                                            backToMenuBtn.classList.remove("d-none");
                                            backToMenuBtn.classList.add("d-flex");
                                            currentRound = 0;
                                            playerScore = 0;
                                            cpuScore = 0;
                                        }, 1000);
                                        break;
                                }
                            } else if (amountOfRounds == 7 && currentRound < amountOfRounds || currentRound == 7) {

                                switch (currentRound) {
                                    case 1:

                                        setTimeout(function () {
                                            continueRoundsBtn.classList.remove("d-none");
                                            continueRoundsBtn.classList.add("d-flex");
                                            continueRoundsBtn2.innerText = `Continue to round ${currentRound} of ${amountOfRounds}`
                                            currentRound++;
                                        }, 1000);
                                        break;
                                    case 2:

                                        setTimeout(function () {
                                            continueRoundsBtn.classList.remove("d-none");
                                            continueRoundsBtn.classList.add("d-flex");
                                            continueRoundsBtn2.innerText = `Continue to round ${currentRound} of ${amountOfRounds}`
                                            currentRound++;
                                        }, 1000);
                                        break;
                                    case 3:

                                        setTimeout(function () {
                                            continueRoundsBtn.classList.remove("d-none");
                                            continueRoundsBtn.classList.add("d-flex");
                                            continueRoundsBtn2.innerText = `Continue to round ${currentRound} of ${amountOfRounds}`
                                            currentRound++;
                                        }, 1000);
                                        break;
                                    case 4:

                                        setTimeout(function () {
                                            continueRoundsBtn.classList.remove("d-none");
                                            continueRoundsBtn.classList.add("d-flex");
                                            continueRoundsBtn2.innerText = `Continue to round ${currentRound} of ${amountOfRounds}`
                                            currentRound++;
                                        }, 1000);
                                        break;
                                    case 5:

                                        setTimeout(function () {
                                            continueRoundsBtn.classList.remove("d-none");
                                            continueRoundsBtn.classList.add("d-flex");
                                            continueRoundsBtn2.innerText = `Continue to round ${currentRound} of ${amountOfRounds}`
                                            currentRound++;
                                        }, 1000);
                                        break;
                                    case 6:

                                        setTimeout(function () {
                                            continueRoundsBtn.classList.remove("d-none");
                                            continueRoundsBtn.classList.add("d-flex");
                                            continueRoundsBtn2.innerText = `Continue to round ${currentRound} of ${amountOfRounds}`
                                            currentRound++;
                                        }, 1000);
                                        break;
                                    case 7:
                                        setTimeout(function () {
                                            playAgainBtn.classList.remove("d-none");
                                            playAgainBtn.classList.add("d-flex");
                                            backToMenuBtn.classList.remove("d-none");
                                            backToMenuBtn.classList.add("d-flex");
                                            currentRound = 0;
                                            playerScore = 0;
                                            cpuScore = 0;
                                        }, 1000);
                                        break;
                                }
                            }

                        }, 4000);
                    }, 1000);
                })
            }, 3000)
        }, 1000);
    } else {
        P2SetIcons(player2Choice);
        playerSetIcons(playerChoice);
        setTimeout(function () {

            cpuAnimate.classList.add("slideRight");
            cpuAnimate2.classList.add("slideRight");
            cpuAnimate3.classList.add("slideRight");

            cpuAnimate.classList.remove("d-none");
            cpuAnimate2.classList.remove("d-none");
            cpuAnimate3.classList.remove("d-none");

            determineWinnerPVP(playerChoice);

            setTimeout(function () {
                playerAnimate.classList.add("slideLeft");
                playerAnimate2.classList.add("slideLeft");
                playerAnimate3.classList.add("slideLeft");

                playerAnimate.classList.remove("d-none");
                playerAnimate2.classList.remove("d-none");
                playerAnimate3.classList.remove("d-none");
            }, 1000);

            setTimeout(function () {
                if (amountOfRounds == currentRound) {
                    if (playerScore > cpuScore) {
                        results.innerText = "You won the game!"
                    } else if (cpuScore > playerScore) {
                        results.innerText = "YOU LOSE"
                    } else if (cpuScore == playerScore) {
                        results.innerText = "It's a Draw!!"
                    }
                }
                results.classList.add("zoomer");
                results.classList.remove("d-none");
                if (amountOfRounds == 1) {
                    setTimeout(function () {
                        playAgainBtn.classList.remove("d-none");
                        playAgainBtn.classList.add("d-flex");
                        backToMenuBtn.classList.remove("d-none");
                        backToMenuBtn.classList.add("d-flex");
                        currentRound = 0;

                    }, 1000);

                } else if (amountOfRounds == 5 && currentRound < amountOfRounds || currentRound == 5) {

                    switch (currentRound) {
                        case 1:

                            currentRound++;
                            setTimeout(function () {
                                continueRoundsBtn.classList.remove("d-none");
                                continueRoundsBtn.classList.add("d-flex");
                                continueRoundsBtn2.innerText = `Continue to round ${currentRound} of ${amountOfRounds}`
                            }, 1000);
                            break;
                        case 2:

                            currentRound++;
                            setTimeout(function () {
                                continueRoundsBtn.classList.remove("d-none");
                                continueRoundsBtn.classList.add("d-flex");
                                continueRoundsBtn2.innerText = `Continue to round ${currentRound} of ${amountOfRounds}`
                            }, 1000);
                            break;
                        case 3:

                            currentRound++;
                            setTimeout(function () {
                                continueRoundsBtn.classList.remove("d-none");
                                continueRoundsBtn.classList.add("d-flex");
                                continueRoundsBtn2.innerText = `Continue to round ${currentRound} of ${amountOfRounds}`
                            }, 1000);
                            break;
                        case 4:

                            currentRound++;
                            setTimeout(function () {
                                continueRoundsBtn.classList.remove("d-none");
                                continueRoundsBtn.classList.add("d-flex");
                                continueRoundsBtn2.innerText = `Continue to round ${currentRound} of ${amountOfRounds}`
                            }, 1000);
                            break;
                        case 5:
                            setTimeout(function () {
                                playAgainBtn.classList.remove("d-none");
                                playAgainBtn.classList.add("d-flex");
                                backToMenuBtn.classList.remove("d-none");
                                backToMenuBtn.classList.add("d-flex");
                                currentRound = 0;
                                playerScore = 0;
                                cpuScore = 0;
                            }, 1000);
                            break;
                    }
                } else if (amountOfRounds == 7 && currentRound < amountOfRounds || currentRound == 7) {

                    switch (currentRound) {
                        case 1:

                            setTimeout(function () {
                                continueRoundsBtn.classList.remove("d-none");
                                continueRoundsBtn.classList.add("d-flex");
                                continueRoundsBtn2.innerText = `Continue to round ${currentRound} of ${amountOfRounds}`
                                currentRound++;
                            }, 1000);
                            break;
                        case 2:

                            setTimeout(function () {
                                continueRoundsBtn.classList.remove("d-none");
                                continueRoundsBtn.classList.add("d-flex");
                                continueRoundsBtn2.innerText = `Continue to round ${currentRound} of ${amountOfRounds}`
                                currentRound++;
                            }, 1000);
                            break;
                        case 3:

                            setTimeout(function () {
                                continueRoundsBtn.classList.remove("d-none");
                                continueRoundsBtn.classList.add("d-flex");
                                continueRoundsBtn2.innerText = `Continue to round ${currentRound} of ${amountOfRounds}`
                                currentRound++;
                            }, 1000);
                            break;
                        case 4:

                            setTimeout(function () {
                                continueRoundsBtn.classList.remove("d-none");
                                continueRoundsBtn.classList.add("d-flex");
                                continueRoundsBtn2.innerText = `Continue to round ${currentRound} of ${amountOfRounds}`
                                currentRound++;
                            }, 1000);
                            break;
                        case 5:

                            setTimeout(function () {
                                continueRoundsBtn.classList.remove("d-none");
                                continueRoundsBtn.classList.add("d-flex");
                                continueRoundsBtn2.innerText = `Continue to round ${currentRound} of ${amountOfRounds}`
                                currentRound++;
                            }, 1000);
                            break;
                        case 6:

                            setTimeout(function () {
                                continueRoundsBtn.classList.remove("d-none");
                                continueRoundsBtn.classList.add("d-flex");
                                continueRoundsBtn2.innerText = `Continue to round ${currentRound} of ${amountOfRounds}`
                                currentRound++;
                            }, 1000);
                            break;
                        case 7:
                            setTimeout(function () {
                                playAgainBtn.classList.remove("d-none");
                                playAgainBtn.classList.add("d-flex");
                                backToMenuBtn.classList.remove("d-none");
                                backToMenuBtn.classList.add("d-flex");
                                currentRound = 0;
                                playerScore = 0;
                                cpuScore = 0;
                            }, 1000);
                            break;
                    }
                }
            }, 3000)
        }, 1000)

    }
}
//functions used within the fetch functions vvVV

function cpuSetIcons(choice) {
    switch (choice) {
        case "rock":
            cpuAnimate3.src = "../pictures/Therock.png";
            cpuAnimate2.innerText = "CPU chose Rock";
            break;
        case "paper":
            cpuAnimate3.src = ("../pictures/spongebobGhost.png");
            cpuAnimate2.innerText = "CPU chose Paper";
            break;
        case "scissors":
            cpuAnimate3.src = "../pictures/scissorsE.png";
            cpuAnimate2.innerText = "CPU chose Scissors";
            break;
        case "spock":
            cpuAnimate3.src = "../pictures/Spoda.jpg";
            cpuAnimate2.innerText = "CPU chose Spock";
            break;
        case "lizard":
            cpuAnimate3.src = "../pictures/RangoLiz.png";
            cpuAnimate2.innerText = "CPU chose Lizard";
            break;
    };
}

function playerSetIcons(pChoice) {
    switch (pChoice) {
        case "rock":
            playerAnimate3.src = "../pictures/Therock.png";
            playerAnimate2.innerText = "Player chose Rock";
            break;
        case "paper":
            playerAnimate3.setAttribute("src", "../pictures/spongebobGhost.png");
            playerAnimate2.innerText = "Player chose Paper";
            break;
        case "scissors":
            playerAnimate3.setAttribute("src", "../pictures/scissorsE.png");
            playerAnimate2.innerText = "Player chose Scissors";
            break;
        case "spock":
            playerAnimate3.setAttribute("src", "../pictures/Spoda.jpg");
            playerAnimate2.innerText = "Player chose Spock";
            break;
        case "lizard":
            playerAnimate3.setAttribute("src", "../pictures/RangoLiz.png");
            playerAnimate2.innerText = "Player chose Lizard";
            break;
    }
};


function determineWinner(comparePlayer) {
    switch (comparePlayer) {
        case "rock":
            if (rockWin.includes(cpuChoice)) {
                results.innerText = "Player1 wins!";
                playerScore++
            } else if (comparePlayer === cpuChoice) {
                results.innerText = "Tie!";
            } else {
                results.innerText = "CPU wins!";
                cpuScore++;
            }
            results.innerText += `  Score-- YOU:${playerScore}  :CPU${cpuScore}`
            break;
        case "paper":
            if (paperWin.includes(cpuChoice)) {
                results.innerText = "Player1 wins!";
                playerScore++
            } else if (comparePlayer === cpuChoice) {
                results.innerText = "Tie!";
            }
            else {
                results.innerText = "CPU wins!";
                cpuScore++
            }
            results.innerText += `  Score-- YOU:${playerScore}  CPU:${cpuScore}`
            break;
        case "scissors":
            if (scissorsWin.includes(cpuChoice)) {
                results.innerText = "Player1 wins!";
                playerScore++
            } else if (comparePlayer === cpuChoice) {
                results.innerText = "Tie!";
            }
            else {
                results.innerText = "CPU wins!";
                cpuScore++
            }
            results.innerText += `  Score-- YOU:${playerScore}  CPU:${cpuScore}`
            break;
        case "spock":
            if (spockWin.includes(cpuChoice)) {
                results.innerText = "Player1 wins!";
                playerScore++
            } else if (comparePlayer === cpuChoice) {
                results.innerText = "Tie!";
            }
            else {
                results.innerText = "CPU wins!";
                cpuScore++
            }
            results.innerText += `  Score-- YOU:${playerScore}  CPU:${cpuScore}`
            break;
        case "lizard":
            if (lizardWin.includes(cpuChoice)) {
                results.innerText = "Player1 wins!";
                playerScore++
            } else if (comparePlayer === cpuChoice) {
                results.innerText = "Tie!";
            }
            else {
                results.innerText = "CPU wins!";
                cpuScore++
            }
            results.innerText += `  Score-- YOU:${playerScore}  CPU:${cpuScore}`
            break;
    }
}
;


//**************************************************************************** */



function P2SetIcons(P2choice) {
    switch (P2choice) {
        case "rock":
            cpuAnimate3.src = "../pictures/Therock.png";
            cpuAnimate2.innerText = "Player2 chose Rock";
            break;
        case "paper":
            cpuAnimate3.src = ("../pictures/spongebobGhost.png");
            cpuAnimate2.innerText = "Player2 chose Paper";
            break;
        case "scissors":
            cpuAnimate3.src = "../pictures/scissorsE.png";
            cpuAnimate2.innerText = "Player2 chose Scissors";
            break;
        case "spock":
            cpuAnimate3.src = "../pictures/Spoda.jpg";
            cpuAnimate2.innerText = "Player2 chose Spock";
            break;
        case "lizard":
            cpuAnimate3.src = "../pictures/RangoLiz.png";
            cpuAnimate2.innerText = "Player2 chose Lizard";
            break;
    };
}


function determineWinnerPVP(comparePlayer) {
    switch (comparePlayer) {
        case "rock":
            if (rockWin.includes(player2Choice)) {
                results.innerText = "Player1 wins!";
                playerScore++
            } else if (comparePlayer === player2Choice) {
                results.innerText = "Tie!";
            } else {
                results.innerText = "Player2 wins!";
                player2Score++;
            }
            results.innerText += `  Score-- Player1:${playerScore}  Player2:${player2Score}`
            break;
        case "paper":
            if (paperWin.includes(player2Choice)) {
                results.innerText = "Player1 wins!";
                playerScore++
            } else if (comparePlayer === player2Choice) {
                results.innerText = "Tie!";
            } else {
                results.innerText = "Player2 wins!";
                player2Score++;
            }
            results.innerText += `  Score-- Player1:${playerScore}  Player2:${player2Score}`
            break;
        case "scissors":
            if (scissorsWin.includes(player2Choice)) {
                results.innerText = "Player1 wins!";
                playerScore++
            } else if (comparePlayer === player2Choice) {
                results.innerText = "Tie!";
            } else {
                results.innerText = "Player2 wins!";
                player2Score++;
            }
            results.innerText += `  Score-- Player1:${playerScore}  Player2:${player2Score}`
            break;
        case "spock":
            if (spockWin.includes(player2Choice)) {
                results.innerText = "Player1 wins!";
                playerScore++
            } else if (comparePlayer === player2Choice) {
                results.innerText = "Tie!";
            } else {
                results.innerText = "Player2 wins!";
                player2Score++;
            }
            results.innerText += `  Score-- Player1:${playerScore}  Player2:${player2Score}`
            break;
        case "lizard":
            if (lizardWin.includes(player2Choice)) {
                results.innerText = "Player1 wins!";
                playerScore++
            } else if (comparePlayer === player2Choice) {
                results.innerText = "Tie!";
            } else {
                results.innerText = "Player2 wins!";
                player2Score++;
            }
            results.innerText += `  Score-- Player1:${playerScore}  Player2:${player2Score}`
            break;
    }
};