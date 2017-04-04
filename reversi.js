
//board size
var width = 8;
var height = 8;

//square size, piece size
var piecewidth = 40;
var pieceheight = 40;

//variable to hold the data
var board = new Array();	//hold the board pieces
var pieces = new Array();	//hold the player pieces
var moves;					//hold the possible moves

//settings
var player = "black";
var turn = "black";

//load the board
function loadBoard(){
	//create board array with size 8x8
	for(x = 0; x < width; x++){
		board[x] = new Array();
	}
	
	document.write("<table border='1'>");
	//rows
	for(y = 0; y < height; y++){
		document.write("<tr>");
		//cols
		for(x = 0; x < width; x++){
			if((x == 3 && y == 3) || (x == 4 && y == 4)) color = "white";
			else if((x == 3 && y == 4) || (x == 4 && y == 3)) color = "black";
			else color = "green";
			document.write("<td id='[" + x + "," + y + "]' bgColor='" + color + "' height='" + pieceheight + "' width='" + piecewidth + "' onclick='putColor(" + x +", " + y + ")'></td>");
			board[x][y] = color;
		}
		document.write("</tr>");
	}
	document.write("</table>");
	
	//save the black piece location
	pieces = [[3,4],[4,3]];
	
	//show the possible moves
	showMoves();

}

//change the color on the clicked square
function putColor(x, y){
	//check can we put color or no
	if(canPutColor(x, y)){
		var id = "[" + x + "," + y + "]";
		var square = document.getElementById(id);
		square.setAttribute("bgColor", player);
		//flip
		flip(x, y);
		board[x][y] = player;
		pieces[pieces.length] = [x, y];
	}	
}

//check can color be put or not
function canPutColor(x, y){
	if(board[x][y] != "grey") return false;
	if(turn != player) return false;
	return true;
}

//check every possible moves for a color
function possibleMoves(){
	//create an array to hold the possible moves
	var posMoves = new Array();
	//index to save the possible move
	var i = 0;
	var x;
	var y;
	
	//look through the player pieces array
	for(j = 0; j < pieces.length; j++){
		x = pieces[j][0];
		y = pieces[j][1];
		//if the right piece is white, look through to the right
		if(x + 2 < width && board[x + 1][y] == "white"){
			for(x_pos = x + 2; x_pos < width; x_pos++){
				//if the color is green put it in the possible moves array
				if(board[x_pos][y] == "green"){
					posMoves[i] = [x_pos, y];
					i++;
					break;
				}
				//if black stop
				if(board[x_pos][y] == "black"){
					break;
				}
			}
		}
		//the same for down, left, and up
		//down
		if(y + 2 < height && board[x][y + 1] == "white"){
			for(y_pos = y + 2; y_pos < height; y_pos++){
				//if the color is green put it in the possible moves array
				if(board[x][y_pos] == "green"){
					posMoves[i] = [x, y_pos];
					i++;
					break;
				}
				//if black stop
				if(board[x][y_pos] == "black"){
					break;
				}
			}
		}
		//left
		if(x - 2 >= 0 && board[x - 1][y] == "white"){
			for(x_pos = x - 2; x_pos >= 0; x_pos--){
				//if the color is green put it in the possible moves array
				if(board[x_pos][y] == "green"){
					posMoves[i] = [x_pos, y];
					i++;
					break;
				}
				//if black stop
				if(board[x_pos][y] == "black"){
					break;
				}
			}
		}
		//up
		if(y - 2 >= 0  && board[x][y - 1] == "white"){
			for(y_pos = y - 2; y_pos >= 0; y_pos--){
				//if the color is green put it in the possible moves array
				if(board[x][y_pos] == "green"){
					posMoves[i] = [x, y_pos];
					i++;
					break;
				}
				//if black stop
				if(board[x][y_pos] == "black"){
					break;
				}
			}
		}
	}
	
	return posMoves;
}

//to show all of the possible moves for player
function showMoves(){
	//search the possible moves
	moves = possibleMoves();
	//declare some variables
	var id;
	var square;
	var x;
	var y;
	
	//look through the array
	for(i = 0; i < moves.length; i++){
		x = moves[i][0];
		y = moves[i][1];
		id = "[" + x + "," + y + "]";
		square = document.getElementById(id);
		square.setAttribute("bgColor", "grey");
		board[x][y] = "grey";
	}
}

//flip the color
function flip(x, y){
	//flip direction
	var right = false;
	var left = false;
	var up = false;
	var down = false;
	
	var id;
	var square;
	
	//find the black pieces
	for(i = 0; i < pieces.length; i++){
		//if it is in the same y axis
		if(!left && !right && pieces[i][1] == y){
			//check it is on right or left
			if(pieces[i][0] > x){
				right = true;
			}
			else{
				left = true;
			}
		}
		//if it is in the same x axis
		if(!up && !down && pieces[i][0] == x){
			//check it is on up or down
			if(pieces[i][1] > y){
				down = true;
			}
			else{
				up = true;
			}
		}
	}
	
	//flip correspon to the direction
	if(right){
		for(x_pos = x + 1; board[x_pos][y] == "white"; x_pos++){
			//change the color to black
			id = "[" + x_pos + "," + y + "]";
			square = document.getElementById(id);
			square.setAttribute("bgColor", "black");
			board[x_pos][y] = "black";
			pieces[pieces.length] = [x_pos, y];
		}
	}
	if(left){
		for(x_pos = x - 1; board[x_pos][y] == "white"; x_pos--){
			//change the color to black
			id = "[" + x_pos + "," + y + "]";
			square = document.getElementById(id);
			square.setAttribute("bgColor", "black");
			board[x_pos][y] = "black";
			pieces[pieces.length] = [x_pos, y];
		}
	}if(down){
		for(y_pos = y + 1; board[x][y_pos] == "white"; y_pos++){
			//change the color to black
			id = "[" + x + "," + y_pos + "]";
			square = document.getElementById(id);
			square.setAttribute("bgColor", "black");
			board[x][y_pos] = "black";
			pieces[pieces.length] = [x, y_pos];
		}
	}if(up){
		for(y_pos = y - 1; board[x][y_pos] == "white"; y_pos--){
			//change the color to black
			id = "[" + x + "," + y_pos + "]";
			square = document.getElementById(id);
			square.setAttribute("bgColor", "black");
			board[x][y_pos] = "black";
			pieces[pieces.length] = [x, y_pos];
		}
	}
	
	//remove the previous possible moves
	removeMoves(x, y);
}

//remove the previous possible moves
function removeMoves(x, y){
	//look through the moves array and remove the grey
	for(i = 0; i < moves.length; i++){
		x_pos = moves[i][0];
		y_pos = moves[i][1];
		
		//except the selected piece
		if(x_pos == x && y_pos == y){
			continue;
		}
		
		id = "[" + x_pos + "," + y_pos + "]";
		square = document.getElementById(id);
		square.setAttribute("bgColor", "green");
		board[x_pos][y_pos] = "green";
	}
	
	//clear the array
	moves = [];
}