// Design Basic Game Solo Challenge

// This is a solo challenge

// Your mission description:  Build a slot machine
// Overall mission: Allow the user to "pull the handle" of a slot machine and see if they won anything.
// Goals: The player wishes to get three of a kind.
// Characters: The player and the slot machine
// Objects: 
// 1. The player: 
//   a. Starts out with a default sum of money on refresh. ($100)
// 2. The slot machine:
//   a. Three reels
//   b. Buttons:
//      i. Bet button to enter bet multiplier (1 - 3) per coin ($1)
//      ii. Pull button to start game
//   c. LEDs:
//      i. Balance: player's current balance
//      ii. Last win: amount last paid out
//      iii. Previous turn won: amount paid in previous turn (Usually $0.00)
//   d. Payout rules
//   	i. any one cherry = 2 credits
//	    ii. any two cherry = 5
//      iii. any bars = 5
//      iv. 3 cherries = 10
//      v. 3 single bars = 10
//      vi. 3 double bars = 25
//      vii. 3 triple bars = 40
//      viii. 3 7s = 80
//      ix. 3 $s = 800
//      x. multiplier: multiply by multiplier up to 3x
// 3. A reel
//  a. Array of Symbols
// 4. Symbol
//  a. name
//  b. vector_image
//  c. x // x-coordinate
//  d. y // y-coordinate
//
// Functions:
// slot.changeMultiplier - toggles the multiplier (1 - 3) based on # coins inserted. Updates LED display
// player.updateBalance() - debits player's account if negative, credits if positive
// slot.spin() - calls spinReel 3x
// slot.playerSpin() - debits player x bet amount, calls slot.spin(), slot.outputResults(), slot.creditWins()
// slot.spinReel() - spins one reel, returns result
// slot.outputResults() - outputs results
// slot.creditWins() - calculates if any wins and updates player balances via player.updateBalance(),  slot.updateSlotDisplays() 
// slot.updateSlotDisplays() - calls setRecentWinPayout(), setPreviousTurnPayout()
// slot.setRecentWinPayout() - amount last win paid out
// slot.setPreviousTurnPayout() - amount paid out in previous turn

// Pseudocode
// Slot machine is set up with random reel values displayed (no payout) with call to slot.spin
// Last win LED is set to 0.
// Previous turn won LED is set to 0.
// Current multiplier value is 1
// Slot machine has 
//
// Player has:
// balance (starts with $100)
// 
// On Page Load:
// On refresh, player starts with default balance.
//
// Start of Game:
// Player presses "Bet" button which calls "setMultiplier" and toggles multiplier from 1 - 3 and debits appropriate amount.
// If the player presses "Bet" button too many times, multiplier resets back to 1 and credits player accordingly.
// Player presses "Spin" button which calls "slot.playerSpin()"
// spinReels() calls spinReel() 3x and calls outputReels() with results which updates display.
// spinReels() next calls payoutWins() with results.
// payoutWins() runs (see description under "functions").
// Slot machine is done and returns to "Start of Game" for player to place next bet and spin again.
//

// // Initial Code

// function Player(balance) {
// 	var balance = balance;

// 	this.updateBalance = function(amount) {
// 		balance += amount;
// 	};

// 	this.getBalance = function() {
// 		return balance;
// 	};
// }

// function SlotMachine(amountPerCredit) {

// 	// private variables

// 	var creditCost = amountPerCredit;
// 	var multiplier = 1;
// 	var multiplierMax = 3;
// 	var numReels = 3;
// 	var payout = 10; 
// 	var previousTurnPayout = 0;
// 	var recentWinPayout = 0;
// 	var reelsResult = [];	

// 	// privileged functions

// 	this.getCreditCost = function(){
// 		return creditCost;
// 	};

// 	this.initialSetup = function(player){
// 		if (reelsResult.length == 0) {
// 			spin();
// 		}
// 		updateSlotDisplays(player);
// 	};

// 	this.playerBet = function(player) {
// 		changeMultiplier();
// 		updateSlotDisplays(player);
// 	};

// 	this.playerSpin = function(player) {
// 		if (creditCost * multiplier <= player.getBalance())
// 		{
// 			player.updateBalance(-1 * creditCost * multiplier);
// 			updateSlotDisplays(player);
// 			spin();
// 			creditWins(player);
// 			updateSlotDisplays(player);
// 		} else {
// 			console.log("Not enough funds.");
// 		}
// 	};

// 	// private functions

// 	function creditWins(player){

// 		// See if all three reels are equal...
// 		for (var i = 1; i < numReels; i++){
// 			if (reelsResult[i - 1] != reelsResult[i]){
// 				previousTurnPayout = "0.00";
// 				return; // ... else no money gained
// 			}
// 		}
// 		// Winner!!!
// 		var winnings = payout * multiplier;
// 		player.updateBalance(winnings);
// 		previousTurnPayout = winnings;
// 		recentWinPayout = winnings;
// 	};

// 	// Always loops between 1 - 3
// 	function changeMultiplier(){
// 		multiplier = (multiplier % multiplierMax) + 1;
// 	};

// 	function outputResults(){
// 		return "[ " + reelsResult.join(" | ") + " ]";
// 	};	

// 	function spin(){
// 		for (var i = 0; i < numReels; i++){
// 			reelsResult[i] = Reel.spin();
// 		}
// 	};

// 	/*
// 		Outputs slot machine LEDs.
// 		Skips player balance if no player is defined.
// 	*/
// 	function updateSlotDisplays(player){
// 		console.log("\n\n\n\n\n");
// 		console.log("RULES: 3-in-a-row wins $" + payout + " multiplied by bet!");
// 		console.log("$" + creditCost + " per credit");
// 		console.log("Max Bet: 3 credits");
// 		console.log("Recent Win Payout: $" + recentWinPayout);
// 		console.log("Previous Turn Payout $" + previousTurnPayout);
// 		console.log("Current Bet: " + multiplier + " credit");
// 		if (player) {
// 			console.log("Balance: $" + player.getBalance());	
// 		}
// 		console.log(outputResults());
// 	};

// }

// function Reel(){
// }

// // Static method
// Reel.spin = function(){
// 		var symbols = ["$","7","bar","cherry","lime"];
// 		return symbols[Math.floor(Math.random() * symbols.length)];
// }

// function runGame(){
// 	var me = new Player(100);
// 	var quarterDollarSlot = new SlotMachine(0.25);
// 	quarterDollarSlot.initialSetup(me);

// 	while (me.getBalance() >= quarterDollarSlot.getCreditCost()){
// 		betOrSpin = confirm("[OK]: Spin | [CANCEL]: Change Bet");
// 		if (betOrSpin == false){
// 			quarterDollarSlot.playerBet(me);
// 		} else {
// 			quarterDollarSlot.playerSpin(me);
// 		}
// 	}
// 	console.log("You're broke! Time to go home.");
// }

// //HTML
// <html>
// 	<head>
// 		<meta charset="utf-8">
// 	</head>
// <body>

// <p id="game">Click the button to start the game.</p>

// <button onclick="runGame()">Run Game</button>

// <script src="game.js">

// </script>

// </body>
// </html>



// Refactored Code

function Player(balance) {
	var balance = balance;

	this.updateBalance = function(amount) {
		balance += amount;
	};

	this.getBalance = function() {
		return balance;
	};
}

function SlotMachine(amountPerCredit) {

	// private variables

	var creditCost = amountPerCredit;
	var multiplier = 1;
	var multiplierMax = 3;
	var numReels = 3;
	var payout = 10; 
	var previousTurnPayout = 0;
	var recentWinPayout = 0;
	var reelsResult = [];	

	// privileged functions

	this.getCreditCost = function(){
		return creditCost;
	};

	this.initialSetup = function(player){
		if (reelsResult.length == 0) {
			spin();
		}
		updateSlotDisplays(player);
	};

	this.playerBet = function(player) {
		changeMultiplier();
		updateSlotDisplays(player);
	};

	this.playerSpin = function(player) {
		if (creditCost * multiplier <= player.getBalance())
		{
			player.updateBalance(-1 * creditCost * multiplier);
			updateSlotDisplays(player);
			spin();
			creditWins(player);
			updateSlotDisplays(player);
		} else {
			alert("Not enough funds.");
		}
	};

	// private functions

	function creditWins(player){

		// See if all three reels are equal...
		for (var i = 1; i < numReels; i++){
			if (reelsResult[i - 1] != reelsResult[i]){
				previousTurnPayout = 0;
				return; // ... else no money gained
			}
		}
		// Winner!!!
		var winnings = payout * multiplier;
		player.updateBalance(winnings);
		previousTurnPayout = winnings;
		recentWinPayout = winnings;
	};

	// Always loops between 1 - 3
	function changeMultiplier(){
		multiplier = (multiplier % multiplierMax) + 1;
	};

	function outputResults(){
		for (var i = 0; i < numReels; i++){
			var elementID = "reel" + (i + 1); // build id name
			document.getElementById(elementID).innerHTML = "<img src=\"imgs/" + reelsResult[i] + "\">";
		}
	};	

	function spin(){
		for (var i = 0; i < numReels; i++){
			reelsResult[i] = Reel.spin();
		}
	};

	/*
		Outputs slot machine LEDs.
		Skips player balance if no player is defined.
	*/
	function updateSlotDisplays(player){
		document.getElementById("header").innerHTML = 
					"<h3>3-of-a-Kind Slot-o-Rama</h3>" + 
					"<h4>$" + payout + " times bet</h4>" +
					"<p>Max bet = " + multiplierMax + " credits</p>";
		document.getElementById("credit_cost").innerHTML = "$" + creditCost + "<br>per credit";
		document.getElementById("recent_win_payout").innerHTML = "Recent Win Payout:<br>$" + recentWinPayout;
		document.getElementById("previous_turn_payout").innerHTML = "Previous Turn Payout:<br>$" + previousTurnPayout;
		document.getElementById("current_bet").innerHTML = "Current Bet:<br>" + multiplier + " credit";
		if (player) {
			document.getElementById("balance").innerHTML = "Balance:<br>$" + player.getBalance().toFixed(2);	
		}
		outputResults();
	};

}

function Reel(){
}

// Static method
Reel.spin = function(){
		var symbols = ["dollar.png","7.png","bar.png","bar_bar.png","bar_bar_bar.png","cherries.png","grapes.png"];
		return symbols[Math.floor(Math.random() * symbols.length)];
}

function runGame(){
	var me = new Player(10);
	var quarterDollarSlot = new SlotMachine(0.25);
	quarterDollarSlot.initialSetup(me);

	document.getElementById("bet").addEventListener("click", function(){ quarterDollarSlot.playerBet(me); });
	document.getElementById("spin").addEventListener("click", function(){ quarterDollarSlot.playerSpin(me) });
}


// Reflection
//
// What was the most difficult part of this challenge?

// (1) Trying to figure out when to use the different types of object and function declaration types.
// I was finally able to figure it out after reading the following article:
// http://www.crockford.com/javascript/private.html
// It indicated how there are three types of functions:
// private, privileged and public and how they each can or cannot access local variables.
// Once I read this, it all came together.

// What did you learn about creating objects and functions that interact with one another?

// An object needs to talk to the other object via it's public and/or privileged functions.

// Did you learn about any new built-in methods you could use in your refactored solution? If so, what were they and how do they work?

// I was able to make use of JS DOM methods addEventListener and getElementById.

// How can you access and manipulate properties of objects?

// Via public/privileged methods and using dot or brackets (for public variables).

