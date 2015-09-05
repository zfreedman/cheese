var MazeModel = Backbone.Model.extend({

	//Initialize function
	initialize: function(params){
		this.set("n", params.n);
		//Initialize maze
		this.initializeMaze();
	},

	//A function to intialize a maze
	initializeMaze: function(){
		//Initialize an empty maze
		this.initializeEmptyMaze();
		//Add maze walls
		this.initializeMazeWalls();
		//Add the cheese indices
		this.initializeMazeCheese();
	},

	//A function to initialize a maze (array of n rows with n columns)
	initializeEmptyMaze: function(){
		//Initialize maze
		this.set("maze", []);

		//Create the maze based on the current n
		for(var i = 0; i < this.get("n"); ++i){
			//Push new row
			this.get("maze").push([]);
			//If the is the first or last row
			if(i % 2 === 0){
				for(var j = 0; j < this.get("n"); ++j){
					this.get("maze")[i].push('-');
				}
				continue;
			}
			//Create columns
			for(var j = 0; j < this.get("n"); ++j){
				//If the index is even, put a wall
				if(j % 2 === 0){
					this.get("maze")[i].push('|');
				}
				//Otherwise, push empty space
				else{
					this.get("maze")[i].push(1);
				}
			}
		}
	},

	//A function to initialize the maze walls
	initializeMazeWalls: function(){
		//Count all of the neighbors we could possibly visit
		var visitedCount = Math.pow(Math.floor(this.get("n")/2), 2);
		//Pick a random corner of the maze
		var currPos = {};
		currPos["x"] = Math.round(Math.random()) * (this.get("n") - 1);
		currPos["x"] === 0 ? ++currPos["x"] : --currPos["x"];
		currPos["y"] = Math.round(Math.random()) * (this.get("n") - 1);
		currPos["y"] === 0 ? ++currPos["y"] : --currPos["y"];
		//This will be the player's starting position
		this.set("playerStart", [currPos["x"], currPos["y"]]);

		//Visit the cell in the maze by marking it's value as 0
		this.get("maze")[currPos["x"]][currPos["y"]] = 0;
		//Decrement the visited count
		--visitedCount;

		//The current unvisited nodes
		var stack = [];

		// //Traverse maze to look for neighbors
		// var traverseMaze = function(){
			//While we haven't visited all neighbors
			while(visitedCount > 0){

				//Get all neighboring cells that haven't been visited
				//NOTE: if the cell's value is 1, it
				//means the cell hasn't been visited
				var currNeighbors = [];

				//Left neighbor
				if(currPos["x"] - 2 > 0 && this.get("maze")[currPos["x"] - 2][currPos["y"]] === 1)
					currNeighbors.push([currPos["x"] - 2, currPos["y"]]);
				//Right neighbor
				if(currPos["x"] + 2 < this.get("n") - 1 && this.get("maze")[currPos["x"] + 2][currPos["y"]] === 1)
					currNeighbors.push([currPos["x"] + 2, currPos["y"]]);
				//Down neighbor
				if(currPos["y"] - 2 > 0 && this.get("maze")[currPos["x"]][currPos["y"] - 2] === 1)
					currNeighbors.push([currPos["x"], currPos["y"] - 2]);
				//Up neighbor
				if(currPos["y"] + 2 < this.get("n") - 1 && this.get("maze")[currPos["x"]][currPos["y"] + 2] === 1)
					currNeighbors.push([currPos["x"], currPos["y"] + 2]);

				//If there were any unvistied neighbors retrieved
				if(currNeighbors.length > 0){
					//Pick a random index
					var randomNeighbor = currNeighbors[Math.floor(Math.random() * currNeighbors.length)];
					console.log(randomNeighbor);
					//Push the current cell to the stack
					stack.push([currPos["x"], currPos["y"]]);
					//Remove wall between current cell and chosen cell
					var wallOffsets = [(randomNeighbor[0] - currPos["x"])/2,
						(randomNeighbor[1] - currPos["y"])/2];
					this.get("maze")[currPos["x"] + wallOffsets[0]][currPos["y"] + wallOffsets[1]] = " ";
					//Make the chosen cell the current cell and mark as visited
					currPos["x"] = randomNeighbor[0];
					currPos["y"] = randomNeighbor[1];
					this.get("maze")[currPos["x"]][currPos["y"]] = 0;
					--visitedCount;
				}

				//Otherwise, we can't find any neighbors
				else{
					//Pop the top of the stack
					var stackTop = stack.pop();
					//Make it the current cell
					currPos["x"] = stackTop[0];
					currPos["y"] = stackTop[1];
				}
			}
			console.log(this.get("maze"));
		// };

		//Set the player's starting position in the maze
		this.get("maze")[this.get("playerStart")[0]][this.get("playerStart")[1]] = 2;
	},

	//A function to initialize the cheese indices in the maze
	initializeMazeCheese: function(){
		//Populate an array of indicies
		var xIndices = [], yIndices = [];
		for(var i = 0; i < Math.floor(this.get("n")/2); ++i){
			xIndices.push(i);
			yIndices.push(i);
		}

		//The indices corresponding to cheese
		var cheeseIndices = [];
		
		//While their is an index left to add
		while(xIndices.length > 0){
			//Get a random x & y index
			var xIndex = Math.floor(Math.random() * xIndices.length);
			var yIndex = Math.floor(Math.random() * yIndices.length);
			cheeseIndices.push([1 + 2*xIndices[xIndex], 1 + 2*yIndices[yIndex]]);
			xIndices = xIndices.slice(0, xIndex).concat(xIndices.slice(xIndex + 1));
			yIndices = yIndices.slice(0, yIndex).concat(yIndices.slice(yIndex + 1));
		}

		console.log(cheeseIndices);
		// console.log(cheeseIndices);
		for(var i = 0; i < cheeseIndices.length; ++i){
			this.get("maze")[cheeseIndices[i][0]][cheeseIndices[i][1]] = "*";
		}
	},

	//A function to visually display the maze in the console
	printMazeToConsole: function(){
		var tmpString = "";
		var horiWall = "_";
		var vertWall = "|";
		for(var i = 0; i < this.get("n"); ++i){
			for(var j = 0; j < this.get("n"); ++j){
				tmpString += this.get("maze")[i][j];
			}
			tmpString += "\n";
		}
		console.log(tmpString);
	}
});