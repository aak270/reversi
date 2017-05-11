//board size
var width = 8;
var height = 8;

//square size, piece size
var piecewidth = 40;
var pieceheight = 40;

//variable to hold the data
var board = new Array();		//hold the board pieces
var blackPieces = new Array();	//hold the black pieces
var whitePieces = new Array();	//hold the black pieces
var moves = new Array();		//hold the possible moves
var flipColor;					//the opposite color of the player
var pieces;						//2nd save array of player pieces
var score = [];					//hold the score
score["black"] = 0;				//black piece score
score["white"] = 0;				//white piece score

//set picture source
var picture = new Array();
picture["white"] = "img/white.png";
picture["black"] = "img/black.png";
picture["white_trans"] = "img/white_trans.png";
picture["black_trans"] = "img/black_trans.png";
picture["green"] = "img/blank.png";

//settings
var player = "black";
var turn = "black";

//show information whose turn
function showInfo(){
	document.write("<h2>Turn: <span id='turn'>" + turn + "</span></h2>");
	document.write("<h2>Player: <span id='player'>" + player + "</span></h2>");
}

//show score for both black and white
function scoreInfo(){
	document.write("<h2 class='score'>Black: <span id='bscore'>2</span></h2>");
	document.write("<h2 class='score'>White: <span id='wscore'>2</span></h2>");
}

//load the board
function loadBoard(){
	//create board array with size 8x8
	for(x = 0; x < width; x++){
		board[x] = new Array();
	}
	
	document.write('<table border="0" cellpadding="0" cellspacing="0" bgcolor="green">');
	//rows
	for(y = 0; y < height; y++){
		document.write("<tr>");
		//cols
		for(x = 0; x < width; x++){
			if((x == 3 && y == 3) || (x == 4 && y == 4)) color = "white";
			else if((x == 3 && y == 4) || (x == 4 && y == 3)) color = "black";
			else color = "green";
			document.write("<td><img src='" + picture[color] + "' id='[" + x + "," + y + "]' onclick='putColor(" + x +", " + y + ")'></td>");
			board[x][y] = color;
		}
		document.write("</tr>");
	}
	document.write("</table>");
	
	//save the black and white piece location
	blackPieces = [[3,4],[4,3]];
	whitePieces = [[3,3],[4,4]];
	
	//set the score
	score["black"] = 2;
	score["white"] = 2;
		
	//show the possible moves
	showMoves();
	
	return 0;
}

//to show all of the possible moves for player
function showMoves(){

	//search the possible moves
	possibleMoves();
	//declare some variables
	var id;
	var x;
	var y;
	
	//if player black show black transparant else otherwise
	if(player == "black"){
		poscol = picture["black_trans"];
	}else{
		poscol = picture["white_trans"];
	}
	
	//look through the array
	for(i = 0; i < moves.length; i++){
		x = moves[i][0];
		y = moves[i][1];
		id = "[" + x + "," + y + "]";
		document.getElementById(id).src = poscol;
		board[x][y] = "grey";
	}
	return 0;
}

//check every possible moves for a color
function possibleMoves(){
	//if black turn the flip piece is white else otherwise
	if(player == "black"){
		flipColor = "white";
		//array contain player pieces
		pieces = blackPieces;
	}else{
		flipColor = "black";
		//array contain player pieces
		pieces = whitePieces;
	}
	
	//index to save the possible move
	var i = 0;
	var x;
	var y;
	
	//look through the player pieces array
	for(j = 0; j < pieces.length; j++){
		x = pieces[j][0];
		y = pieces[j][1];
		
		//if x or y is -1 skip
		if(x == -1 || y == -1){
			continue;
		}
		
		//if the right piece is opposite color, look through to the right
		if(x + 2 < width && board[x + 1][y] == flipColor){
			for(x_pos = x + 2; x_pos < width; x_pos++){
				//if the color is green put it in the possible moves array
				if(board[x_pos][y] == "green"){
					moves[i] = [x_pos, y];
					i++;
					right = true;
					break;
				}
				//if same as player
				if(board[x_pos][y] == player){
					break;
				}
			}
		}
		//the same for down, left, and up
		//down
		if(y + 2 < height && board[x][y + 1] == flipColor){
			for(y_pos = y + 2; y_pos < height; y_pos++){
				//if the color is green put it in the possible moves array
				if(board[x][y_pos] == "green"){
					moves[i] = [x, y_pos];
					i++;
					down = true;
					break;
				}
				//if same as player
				if(board[x][y_pos] == player){
					break;
				}
			}
		}
		//left
		if(x - 2 >= 0 && board[x - 1][y] == flipColor){
			for(x_pos = x - 2; x_pos >= 0; x_pos--){
				//if the color is green put it in the possible moves array
				if(board[x_pos][y] == "green"){
					moves[i] = [x_pos, y];
					i++;
					left = true;
					break;
				}
				//if same as player
				if(board[x_pos][y] == player){
					break;
				}
			}
		}
		//up
		if(y - 2 >= 0 && board[x][y - 1] == flipColor){
			for(y_pos = y - 2; y_pos >= 0; y_pos--){
				//if the color is green put it in the possible moves array
				if(board[x][y_pos] == "green"){
					moves[i] = [x, y_pos];
					i++;
					up = true;
					break;
				}
				//if same as player
				if(board[x][y_pos] == player){
					break;
				}
			}
		}
		//for upright
		if(x + 2 < width && y - 2 >= 0 && board[x + 1][y - 1] == flipColor){
			for(x_pos = x + 2, y_pos = y - 2; x_pos < width && y_pos >= 0; x_pos++, y_pos--){
				//if the color is green put it in the possible moves array
				if(board[x_pos][y_pos] == "green"){
					moves[i] = [x_pos, y_pos];
					i++;
					upright = true;
					break;
				}
				//if same as player
				if(board[x_pos][y_pos] == player){
					break;
				}
			}
		}
		//for downright
		if(x + 2 < width && y + 2 < height && board[x + 1][y + 1] == flipColor){
			for(x_pos = x + 2, y_pos = y + 2; x_pos < width && y_pos < height; x_pos++, y_pos++){
				//if the color is green put it in the possible moves array
				if(board[x_pos][y_pos] == "green"){
					moves[i] = [x_pos, y_pos];
					i++;
					downright = true;
					break;
				}
				//if same as player
				if(board[x_pos][y_pos] == player){
					break;
				}
			}
		}
		//for upleft
		if(x - 2 >= 0 && y - 2 >= 0 && board[x - 1][y - 1] == flipColor){
			for(x_pos = x - 2, y_pos = y - 2; x_pos >= 0 && y_pos >= 0; x_pos--, y_pos--){
				//if the color is green put it in the possible moves array
				if(board[x_pos][y_pos] == "green"){
					moves[i] = [x_pos, y_pos];
					i++;
					upleft = true;
					break;
				}
				//if same as player
				if(board[x_pos][y_pos] == player){
					break;
				}
			}
		}
		//for downleft
		if(x - 2 >= 0 && y + 2 >= 0 && board[x - 1][y + 1] == flipColor){
			for(x_pos = x - 2, y_pos = y + 2; x_pos >= 0 && y_pos < height; x_pos--, y_pos++){
				//if the color is green put it in the possible moves array
				if(board[x_pos][y_pos] == "green"){
					moves[i] = [x_pos, y_pos];
					i++;
					downleft = true;
					break;
				}
				//if same as player
				if(board[x_pos][y_pos] == player){
					break;
				}
			}
		}
	}
	return 0;
}

//change the color on the clicked square
function putColor(x, y){
	//check can we put color or no
	if(canPutColor(x, y)){
		var id = "[" + x + "," + y + "]";
		document.getElementById(id).src = picture[player];
		score[player]++;
		//flip
		flip(x, y);
		
		//if black turn the pieces is black else otherwise
		if(player == "black"){
			//array contain player pieces
			pieces = blackPieces;
		}else{
			//array contain player pieces
			pieces = whitePieces;
		}
		
		board[x][y] = player;
		pieces.push([x, y]);
		endTurn(false);
		
	}	
}

//check can color be put or not
function canPutColor(x, y){
	if(board[x][y] != "grey") return false;
	if(turn != player) return false;
	return true;
}

//flip the color
function flip(x, y){
	//if black turn the flip piece is white else otherwise
	if(player == "black"){
		flipColor = "white";
		//array contain player pieces
		pieces = blackPieces;
	}else{
		flipColor = "black";
		//array contain player pieces
		pieces = whitePieces;
	}
	
	var id;
	
	//save new pieces location
	var newPieces = new Array();
	var p = 0;
	
	//flip direction
	var right = false;
	var left = false;
	var up = false;
	var down = false;
	var upright = false;
	var downleft = false;
	var upleft = false;
	var downright = false;
	
	//find the opposite pieces correspon to the possible moves
	for(i = 0; i < pieces.length; i++){
		//if x or y is -1 skip
		if(pieces[i][0] == -1 || pieces[i][1] == -1){
			continue;
		}
		
		//if it is in the same y axis
		if((!left || !right) && pieces[i][1] == y){
			//check it is on right or left
			if(pieces[i][0] > x && board[pieces[i][0] - 1][pieces[i][1]] == flipColor){
				right = true;
			}
			else if(pieces[i][0] < x && board[pieces[i][0] + 1][pieces[i][1]] == flipColor){
				left = true;
			}
		}
		//if it is in the same x axis
		if((!up || !down) && pieces[i][0] == x){
			//check it is on up or down
			if(pieces[i][1] > y && board[pieces[i][0]][pieces[i][1] - 1] == flipColor){
				down = true;
			}
			else if(pieces[i][1] < y && board[pieces[i][0]][pieces[i][1] + 1] == flipColor){
				up = true;
			}
		}
		//for same diagonal
		if((!upright || !upleft || !downright || !downleft) && Math.abs(pieces[i][0] - x) == Math.abs(pieces[i][1] - y)){
			//chack which direction
			if(pieces[i][0] > x && pieces[i][1] < y && board[pieces[i][0] - 1][pieces[i][1] + 1] == flipColor){
				upright = true;
			}
			else if(pieces[i][0] < x && pieces[i][1] < y && board[pieces[i][0] + 1][pieces[i][1] + 1] == flipColor){
				upleft = true;
			}
			else if(pieces[i][0] > x && pieces[i][1] > y && board[pieces[i][0] - 1][pieces[i][1] - 1] == flipColor){
				downright = true;
			}
			else if(pieces[i][0] < x && pieces[i][1] > y && board[pieces[i][0] + 1][pieces[i][1] - 1] == flipColor){
				downleft = true;
			}
		}
	}
	
	//flip correspon to the direction
	if(right){
		for(x_pos = x + 1; board[x_pos][y] == flipColor; x_pos++){
			//change the color to player color
			id = "[" + x_pos + "," + y + "]";
			document.getElementById(id).src = picture[player];
			score[player]++;
			score[flipColor]--;
			board[x_pos][y] = player;
			pieces.push([x_pos, y]);
			newPieces[p] = [x_pos, y];
			p++;
		}
	}
	if(left){
		for(x_pos = x - 1; board[x_pos][y] == flipColor; x_pos--){
			//change the color to player color
			id = "[" + x_pos + "," + y + "]";
			document.getElementById(id).src = picture[player];
			score[player]++;
			score[flipColor]--;
			board[x_pos][y] = player;
			pieces.push([x_pos, y]);
			newPieces[p] = [x_pos, y];
			p++;
		}
	}
	if(down){
		for(y_pos = y + 1; board[x][y_pos] == flipColor; y_pos++){
			//change the color to player color
			id = "[" + x + "," + y_pos + "]";
			document.getElementById(id).src = picture[player];
			score[player]++;
			score[flipColor]--;
			board[x][y_pos] = player;
			pieces.push([x, y_pos]);
			newPieces[p] = [x, y_pos];
			p++;
		}
	}
	if(up){
		for(y_pos = y - 1; board[x][y_pos] == flipColor; y_pos--){
			//change the color to player color
			id = "[" + x + "," + y_pos + "]";
			document.getElementById(id).src = picture[player];
			score[player]++;
			score[flipColor]--;
			board[x][y_pos] = player;
			pieces.push([x, y_pos]);
			newPieces[p] = [x, y_pos];
			p++;
		}
	}
	if(upright){
		for(x_pos = x + 1, y_pos = y - 1; board[x_pos][y_pos] == flipColor; x_pos++, y_pos--){
			//change the color to player color
			id = "[" + x_pos + "," + y_pos + "]";
			document.getElementById(id).src = picture[player];
			score[player]++;
			score[flipColor]--;
			board[x_pos][y_pos] = player;
			pieces.push([x_pos, y_pos]);
			newPieces[p] = [x_pos, y_pos];
			p++;
		}
	}
	if(upleft){
		for(x_pos = x - 1, y_pos = y - 1; board[x_pos][y_pos] == flipColor; x_pos--, y_pos--){
			//change the color to player color
			id = "[" + x_pos + "," + y_pos + "]";
			document.getElementById(id).src = picture[player];
			score[player]++;
			score[flipColor]--;
			board[x_pos][y_pos] = player;
			pieces.push([x_pos, y_pos]);
			newPieces[p] = [x_pos, y_pos];
			p++;
		}
	}
	if(downright){
		for(x_pos = x + 1, y_pos = y + 1; board[x_pos][y_pos] == flipColor; x_pos++, y_pos++){
			//change the color to player color
			id = "[" + x_pos + "," + y_pos + "]";
			document.getElementById(id).src = picture[player];
			score[player]++;
			score[flipColor]--;
			board[x_pos][y_pos] = player;
			pieces.push([x_pos, y_pos]);
			newPieces[p] = [x_pos, y_pos];
			p++;
		}
	}
	if(downleft){
		for(x_pos = x - 1, y_pos = y + 1; board[x_pos][y_pos] == flipColor; x_pos--, y_pos++){
			//change the color to player color
			id = "[" + x_pos + "," + y_pos + "]";
			document.getElementById(id).src = picture[player];
			score[player]++;
			score[flipColor]--;
			board[x_pos][y_pos] = player;
			pieces.push([x_pos, y_pos]);
			newPieces[p] = [x_pos, y_pos];
			p++;
		}
	}
	
	//remove opponent pieces
	removeOpponent(newPieces);
	
	//remove the previous possible moves
	removeMoves(x, y);
	
	return 0;
}

//remove opponent pieces
function removeOpponent(locs){
	//if black turn the flip piece is white else otherwise
	if(player == "black"){
		//array contain opponent pieces
		pieces = whitePieces;
	}else{
		//array contain opponent pieces
		pieces = blackPieces;
	}
	
	//flipped pieces location
	var x;
	var y;
	//opponent pieces location
	var xOpp;
	var yOpp;
	
	//look through the newPieces array
	for(i = 0; i < locs.length; i++){
		x = locs[i][0];
		y = locs[i][1];
		
		//look through opponent pieces array
		for(j = 0; j < pieces.length; j++){
			xOpp = pieces[j][0];
			yOpp = pieces[j][1];
			
			//if it has the same location delete
			if(x == xOpp && y == yOpp){
				//-1 represent empty
				pieces[j][0] = -1;
				pieces[j][1] = -1;
				break;
			}
		}
	}
	return 0;
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
		document.getElementById(id).src = picture["green"];
		board[x_pos][y_pos] = "green";
	}
	
	//clear the array
	moves = [];
	
	return 0;
}

//change the player
function endTurn(finish){
	if(turn == "black"){
		turn = "white";
		player = "white";
	}else{
		turn = "black";
		player = "black";
	}
	
	//renew the turn
	document.getElementById("turn").textContent = turn;
	document.getElementById("player").textContent = player;
	
	//renew the score
	document.getElementById("bscore").textContent = score["black"];
	document.getElementById("wscore").textContent = score["white"];
	
	//if board is full game over
	if(score["black"] + score["white"] == 64){
		gameOver();
		return 0;
	}
	
	showMoves();
	//if no possible move skip turn and both piece have no possible move
	if(moves.length == 0){
		//if skipped twice game over
		if(finish){
			gameOver();
			return 0;
		}
		endTurn(true);
	}
	return 0;
}

//game is over
function gameOver(){
	if(score["black"] > score["white"]){
		alert("black wins");
		player = 0;
	}else if(score["black"] == score["white"]){
		alert("it's a draw");
		player = 0;
	}else{
		alert("white wins");
		player = 0;
	}
	return 0;
}