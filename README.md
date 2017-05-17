# About
This project is about a javascript implementation of a board game reversi, also known as othello.
This project can be accessed online at [my site](aak270.github.io/reversi/). 
More about reversi; how to play, rule, etc. can be viewed at [wikipedia](https://en.wikipedia.org/wiki/Reversi).

# Code Example
The javascript functions can be viewed at [reversi.js](https://aak270.github.io/reversi/reversi.js) in the or in the repository.

# About Reversi
Reversi is a strategy board game for two players, played on an 8×8 uncheckered board. There are sixty-four identical game pieces called disks (often spelled "discs"), which are light on one side and dark on the other. Players take turns placing disks on the board with their assigned color facing up. During a play, any disks of the opponent's color that are in a straight line and bounded by the disk just placed and another disk of the current player's color are turned over to the current player's color. The object of the game is to have the majority of disks turned to display your color when the last playable empty square is filled.

# Reversi Rules
- Rows are numbered from 1 to 8 starting with the top row. Columns are named a to h, from left to right. The starting position consists of two black discs at e4 and d5, and two white discs at d4 and e5. Black will play the first move. - You can play a disc when you flank one or more opponents discs between your new disc and any other of your own discs, in the same horizontal, vertical or diagonal line. The opponents discs that are flanked will be turned upside-down and change colour. This turning is called flipping. When discs are flanked in multiple directions, these have to be flipped as well. 
- When there is no possible legal move, the turn is given back to the opponent. This is called a pass. If both players need to pass because there is no possible move for any of them, the board game has ended. Normally, this will occur when there are no more empty squares. In some occasions, one or more squares remain empty and none of the players have access. 
- The discs are counted. Whoever has the most discs wins the board game. If the result is 32-32, the board game is a draw.
