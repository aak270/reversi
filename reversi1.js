
//board size
var width = 8;
var height = 8;

//square size, piece size
var piecewidth = 40;
var pieceheight = 40;

//variable to hold the data
var board = new Array();	//hold the board pieces

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
}

//change the color on the clicked square
function putColor(x, y){
	//check can we put color or no
	if(canPutColor(x, y)){
		var id = "[" + x + "," + y + "]";
		var square = document.getElementById(id);
		square.setAttribute("bgColor", player);
	}	
}

//check can color be put or not
function canPutColor(x, y){
	if(board[x][y] != "green") return false;
	if(turn != player) return false;
	return true;
}