var GRID_SIZE = 40; // Sets numbers of rows and columns.

// Snake object - including starting position, direction and segments array.
var snake = {
	direction: "r",
	segments: [[20,20]]
}

// Add food to the grid by choosing a random row and random column, place "F" in cell.
var addFood = function() {
	// random Row 
	var randRow = Math.floor(Math.random() * GRID_SIZE);
	// random Column
	var randCol = Math.floor(Math.random() * GRID_SIZE);
	
	food = {
		row: randRow,
		col: randCol
	};
}

var food = null;
addFood(); // Create first food. 

 // Render a grid on the page with food and snake.
 var render = function() {
 	$('#game').empty();
 	for (var row = 0; row < GRID_SIZE; row++) { 	// For each row, and
		for (var col = 0; col < GRID_SIZE; col++) { // For each column:
			var $cell = $('<div class="cell"></div>');  // Create jquery element $cell, being a div with the class 'cell'.
			for (var i = 0; i < snake.segments.length; i++) { // Loop through each array in snake.segments.
				var segment = snake.segments[i]; // Create 'segment' variable to be i'th element in array.
				if (segment[0] == row && segment[1] == col) {
					$cell.addClass('snake'); // Show snake.  
				}
			}
			
			if (food.row == row && food.col == col) { // If the cell contains food,
				$cell.addClass('food');				  // display on screen.
			}

			$('#game').append($cell); // Render square. 
		}
	}
 }

// In each turn, move snake and render screen again.
var turn = function() {
	move();
	render();
}

var eat = function() {
	if (food.row == snake.segments[0][0] && food.col == snake.segments[0][1]) {
		addFood();
		delay = delay * 0.8;	
		clearInterval(turnID); 
		turnID = setInterval(turn, delay);
	} else {
		snake.segments.pop(); // Removes final segment if snake doesn't eat (otherwise it grows).
	}

}
// Move function that responds to snake's direction (Set below in switch statement) and ends game if snake goes off the grid.
var move = function() {
	var head = [snake.segments[0][0], snake.segments[0][1]]; // Copy current head into a new array.	
	switch(snake.direction) { 								 // Switch statement alters new array
		case "l": 											 // Doesn't alter snake.segments itself.
			head[1] -= 1; // Decrease the col value by 1 to move left.
			break;
		case "u":
			head[0] -= 1; // Decrease the row value by 1 to move up.
			break;
		case "r":
			head[1] += 1; // Increase the col value by 1 to move right.
			break;
		case "d":
			head[0] += 1; // Increase the row value by 1 to move down. 
			break;
	}
	snake.segments.unshift(head); // 'Unshift' new head array into the first position of snake.segments array having moved it according to the direction.

	// Eat
	eat();

	// Game over if snake runs into itself.
	for (var i = 1; i < snake.segments.length; i++) { // Loop through each array in snake.segments.
			var segment = snake.segments[i]; // Create 'segment' variable to be i'th element in array
			if (head[0] == segment[0] && head[1] == segment[1]) { // Remember [a] does not equal [a].
				$('body').html('<h1>SNAKE? SNAAAAKE!</h1><p>game over.</p>'); 
				clearInterval(turnID); // Stop further executions of the turnID function.
			}
	}
	console.log(snake.segments[0]);		
	// Game over if snake goes off the grid.
	if ((snake.segments[0][0] >= GRID_SIZE) ||
		(snake.segments[0][0] < 0)  		||
		(snake.segments[0][1] >= GRID_SIZE) || 
		(snake.segments[0][1] < 0)) {
			$('body').html('<h1>SNAKE? SNAAAAKE!</h1><p>game over.</p>'); 
			clearInterval(turnID); // Stop further executions of the turnID function.
	}
}

// Set each turn at 300 milliseconds
var delay = 300;
var turnID = setInterval(turn, delay);

// Listen for keyboard input to change the snake's direction:
$(document).keydown(function(key) {
	switch(parseInt(key.which,10)) { // Converts key pressed to a base 10 number.
		// Left arrow key pressed
		case 37:
			if (snake.direction != "r") { // Prevent moving in opposite direction and suicide.
				snake.direction = "l";
			}
			key.preventDefault();
			break;
		// Up arrow key pressed
		case 38:
			if (snake.direction != "d") { // Prevent moving in opposite direction and suicide.
				snake.direction = "u";	
			}
			key.preventDefault();
			break;
		// Right arrow key pressed
		case 39:
			if (snake.direction != "l") { // Prevent moving in opposite direction and suicide.
				snake.direction = "r";
			}
			key.preventDefault();
			break;
		// Down arrow key pressed
		case 40:
			if (snake.direction != "u") { // Prevent moving in opposite direction and suicide.
				snake.direction = "d";
			}
			key.preventDefault();
			break;			
	}
})
