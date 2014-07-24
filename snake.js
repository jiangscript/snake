var GRID_SIZE = 40; // Sets numbers of rows and columns.

var grid = []; // Creates the empty grid array.

// Snake object - including starting position, direction and segments array.
var snake = {
	// position: [20,20],
	direction: "r",
	segments: [[20,20]]
}
// Populate grid with spaces initially.
for (var row = 0; row < GRID_SIZE; row++) {
	grid[row] = []; // Put an empty 'row' array into the 'grid' array 40 times.
	for (var col = 0; col < GRID_SIZE; col++) {
		grid[row][col] = ' '; // Inside each 'row' array, put a 'col' array that contains an empty space 40 times.
	}
}
 // Render grid on the page.
 var render = function() {
 	//console.log('snake? SNAKE!!', snake.position);
 	$('#game').empty();
 	for (var row = 0; row < GRID_SIZE; row++) { 	// For each row, and
		for (var col = 0; col < GRID_SIZE; col++) { // For each column:
			var $cell = $('<div class="cell"></div>'); // Create jquery element $cell, being a div with the class 'cell'.
			if (snake.segments[0][0] == row && snake.segments[0][1] == col) {
				$cell.addClass('snake'); // Give  snake position cell the class of 'snake'.  
			}
			if (grid[row][col] == "F") { // If cell contains "F", 
				$cell.addClass('food');	 // give it the class of 'food'.
			}
			$('#game').append($cell); // In the div with the ID of 'game', append the $cell html above for each row and column. Each time the loops run, this makes a $cell the last child element of the #game div. 
		}
	}
 }

// Add food to the grid by choosing a random row and random column, place "F" in cell.
var addFood = function() {
	// random Row 
	var randRow = Math.floor(Math.random() * 40);
	// random Column
	var randCol = Math.floor(Math.random() * 40);
	grid[randRow][randCol] = "F";
}

// In each turn, move snake and render screen again.
var turn = function() {
	move();
	render();
}

// Move function that responds to snake's direction (Set below in switch statement) and ends game if snake goes off the grid.
var move = function() {
	switch(snake.direction) {
		case "l":
			snake.segments[0][1] -= 1; // Decrease the col value by 1 to move left.
			break;
		case "u":
			snake.segments[0][0] -= 1; // Decrease the row value by 1 to move up.
			break;
		case "r":
			snake.segments[0][1] += 1; // Increase the col value by 1 to move right.
			break;
		case "d":
			snake.segments[0][0] += 1; // Increase the row value by 1 to move down. 
			break;
	}
	// Eating food
	if (grid[snake.segments[0][0]][snake.segments[0][1]] == "F") {
		addFood();
		grid[snake.segments[0][0]][snake.segments[0][1]] = " ";
		// snake.segments.push([snake.segments[0][0] += 1], [snake.segments[0][1] += 1]);
	}

	//Game over if snake goes off the grid.
	if (snake.segments[0][0] > 40 ||
		snake.segments[0][0] < 0  ||
		snake.segments[0][1] > 40 || 
		snake.segments[0][1] < 0) {
		$('body').html('<h1>SNAKE? SNAAAAKE!</h1><p>game over.</p>'); 
		clearInterval(turnID); // Stop further executions of the turnID function.
	}
}

// Call the addFood function for the first time, set each turn at 300 milliseconds
addFood();
var turnID = setInterval(turn, 300);

// Listen for keyboard input to change the snake's direction:
$(document).keydown(function(key) {
	switch(parseInt(key.which,10)) { // Converts key pressed to a base 10 number.
		// Left arrow key pressed
		case 37:
			snake.direction = "l";
			break;
		// Up arrow key pressed
		case 38:
			snake.direction = "u";
			break;
		// Right arrow key pressed
		case 39:
			snake.direction = "r";
			break;
		// Down arrow key pressed
		case 40:
			snake.direction = "d";
			break;			
	}
	//console.log(snake.direction);
})

