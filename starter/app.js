/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, maxScore, gamePlaying, previousRoll;

init();

//Event listener for mouse click on the roll dice button. Runs anonymous function
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying){
        //1. Random number
        var diceRoll = Math.floor(Math.random() * 6) + 1;
        var dice2Roll = Math.floor(Math.random() * 6) + 1;

        //2. Display the result 
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + diceRoll + '.png';
        
        var dice2DOM = document.querySelector('.dice-2');
        dice2DOM.style.display = 'block';
        dice2DOM.src = 'dice-' + dice2Roll + '.png';

        //3. Update the round score IF the rolled number is not 
        if(diceRoll === 6 && dice2Roll === 6){
            //player loses total score on this condition
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;
            nextPlayer();
        } else if (diceRoll !== 1 && dice2Roll !== 1){
            //add score
            roundScore += diceRoll + dice2Roll;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else {
            //next player
            nextPlayer();        
        } 
        
        previousRoll = diceRoll;
        console.log(previousRoll);
    }
    
});

//Event listener for mouse click on the hold button. Runs anonymous function
document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
        //Add current score to total score
        scores[activePlayer] += roundScore;

        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        //Undefined, 0, null or "" are COERCED to false
        if(input){
            maxScore = input;
        }
        //check if player won the game, else switch player
        if(scores[activePlayer] >= maxScore){
            gamePlaying = false;
            hideDice();
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

        } else {
            nextPlayer();
        }
    }
    
});


document.querySelector('.btn-new').addEventListener('click', init);



function init(){
    maxScore = 100;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    previousRoll = 0;
    gamePlaying = true;
    
    hideDice();
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    //maxScore = prompt('What should the winning score be?');
}


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    previousRoll = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    //toggle will remove a class if its active or else it turns it on.
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    hideDice();
}

function hideDice(){
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
}
