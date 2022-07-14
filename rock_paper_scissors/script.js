"use strict"

function computerPlay() {
    let hand = Math.ceil(Math.random() * 3);
    switch (hand) {
        case 1:
            return "earth";
        case 2:
            return "fire";
        case 3:
            return "water";
    }
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === "earth") {
        if (computerSelection === "earth") {
            return "draw";
        }
        if (computerSelection === "fire") {
            return "computer";
        }
        if (computerSelection === "water") {
            return "player";
        }
    }
    if (playerSelection === "fire") {
        if (computerSelection === "fire") {
            return "draw";
        }
        if (computerSelection === "water") {
            return "computer";
        }
        if (computerSelection === "earth") {
            return "player";
        }
    }
    if (playerSelection === "water") {
        if (computerSelection === "water") {
            return "draw";
        }
        if (computerSelection === "earth") {
            return "computer";
        }
        if (computerSelection === "fire") {
            return "player";
        }
    }
}

function reset() {
    document.querySelector('.result_page').style.display = "none";
    document.querySelector('.player_score').innerText = "0";
    document.querySelector('.computer_score').innerText = "0";
    document.querySelector('.speech').innerText = "First to 5 wins.";
    document.querySelector('.resutl').innerText = "Who will win ?";
}

function game() {
    const elements = ['earth', 'water', 'fire'];
    const player_element = document.getElementById('player_element');
    const computer_element = document.getElementById('computer_element');
    const playerScore = document.querySelector('.player_score');
    const computerScore = document.querySelector('.computer_score');
    const cheer = document.querySelector('.speech');
    const winner = document.querySelector('.result');
    const finalResult = document.querySelector('#final_result');
    const finalPage = document.querySelector('.result_page');
    const playerCheer = ['You can do it', "Nice, keep going", "Good job", "Show them who's boss", "Just a little more"];
    const computerCheer = ['We machines are superior in every way', "Oops, try again", "You lack the power to defeat us", "Puny human"];
    const drawCheer = ['Chose the same element', "That's a draw", "No damage done"];
    elements.forEach((val) => {
        document.getElementById(val).addEventListener('click', () => {
            let computer_choice = computerPlay();
            let result = playRound(val, computer_choice);
            player_element.src = `./images/${val}.png`;
            computer_element.src = `./images/${computer_choice}.png`;

            switch (result) {
                case "player":
                    {
                        playerScore.innerText = parseInt(playerScore.innerText) + 1;
                        winner.innerText = "You win";
                        cheer.innerText = playerCheer[Math.floor(Math.random() * playerCheer.length)];
                    }
                    break;
                case "computer":
                    {
                        computerScore.innerText = parseInt(computerScore.innerText) + 1;
                        winner.innerText = "You lose";
                        cheer.innerText = computerCheer[Math.floor(Math.random() * computerCheer.length)];
                    }
                    break;
                case "draw":
                    {
                        winner.innerText = "It's a Draw";
                        cheer.innerText = drawCheer[Math.floor(Math.random() * drawCheer.length)];
                    }
            }
            if (playerScore.innerText === "5" || computerScore.innerText === "5") {
                finalResult.innerText = playerScore.innerText == "5" ? "You won, A Victory for Mankind":"You lost, The Machines Rule Now";
                finalPage.style.display = "flex";
            }

            setTimeout(() => {
                player_element.src = "./images/unknown.jpg";
                computer_element.src = "./images/unknown.jpg";
            }, 1000);
        })
    })
    document.querySelector('.result_page').getElementsByTagName('button')[0].addEventListener('click', reset);
}

game();