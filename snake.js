var GRID_SIZE = 40; // Sets numbers of rows and columns.

var grid = []; // Creates the empty grid array.

// Snake object - including starting position, direction and segments array.
var snake = {
	direction: "r",
	segments: [[20,20]]
}

// Populate grid with spaces initially.
for (var row = 0; row <= GRID_SIZE; row++) {
	grid[row] = []; // Put an empty 'row' array into the 'grid' array 40 times.
	for (var col = 0; col <= GRID_SIZE; col++) {
		grid[row][col] = ' '; // Inside each 'row' array, put a 'col' array that contains an empty space 40 times.
	}
}
 // Render grid on the page.
 var render = function() {
 	//console.log('snake? SNAKE!!', snake.position);
 	$('#game').empty();
 	for (var row = 0; row < GRID_SIZE; row++) { 	// For each row, and
		for (var col = 0; col < GRID_SIZE; col++) { // For each column:
			var $cell = $('<div class="cell"></div>');  // Create jquery element $cell, being a div with the class 'cell'.
			for (var i = 0; i < snake.segments.length; i++) { // Loop through each array in snake.segments.
				var segment = snake.segments[i]; // Create 'segment' variable to be i'th element in array.
				if (segment[0] == row && segment[1] == col) {
					$cell.addClass('snake'); // Give snake position cell the class of 'snake'.  
					// if (colour) {
					// 	$cell.css('background-color', colour);
					//}
				}
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
	var randRow = Math.floor(Math.random() * GRID_SIZE);
	// random Column
	var randCol = Math.floor(Math.random() * GRID_SIZE);
	grid[randRow][randCol] = "F";
}

// In each turn, move snake and render screen again.
var turn = function() {
	move();
	render();
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

	// Eating food
	if (grid[snake.segments[0][0]][snake.segments[0][1]] == "F") {
			grid[snake.segments[0][0]][snake.segments[0][1]] = " ";	
			addFood();
	} else {
		snake.segments.pop(); // Removes final segment if snake doesn't eat (otherwise it grows).
	}
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
		(snake.segments[0][0] <= 0)  		||
		(snake.segments[0][1] >= GRID_SIZE) || 
		(snake.segments[0][1] <= 0)) {
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

// var colour = null;
// $("#snakecolour").change(function(){
// 	colour = $(this).val();
// 	$('.snake').css('background-color', colour);
// })

