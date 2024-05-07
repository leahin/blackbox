# blackbox
An implementation of the Blackbox board game. Converted from my early project which was initially a CLI written in Python.
Created this project to practice HTML/CSS/JavaScript.

## Description
Blackbox is an abstract board game. User guesses the locations of atoms by shooting ray from launch points.
Rules are found in [Black Box (game) - Wikipedia](https://en.wikipedia.org/wiki/Black_Box_(game))

Each ray ended as either hit, deflect, reflect, or miss, and the result is displayed on the launch point where the ray shoots.
* hit (H): when the ray hits an atom.
* deflect (D#): when the ray is deflected by one or more atoms. # represents the pair of entry and exit points.
* reflect (R): when the ray is deflected but exits to the same entry point.
* miss (M#): when the ray does not encounter atoms. # represents the pair of entry and exit points.

The initial score is set to 25.
* Each ray deducts score by 1.
* Wrong guess of atom's location deducts score by 5.
* Correct guess of atom increase score by 5.

Currently, the score is designed to go down negative. The only way the game complete is to find all correct atoms.
Once all atoms are found, the program will prompt to ask user to play a new game or not.

Addition to the game logic, the program allows the user to start a new game, reset the current game, and show the location of hidden atoms by clicking buttons located under the board.
* New: Start a new game. the locations of atoms are changed.
* Reset: Reset the current game. the locations of atoms stay the same.
* Show: Show the location of the hidden atoms on the board.
* Hide: Hide the location of the hidden atoms on the board.

## Getting Started

### Dependencies
No Dependencies are required for the installation.

### Installing
Simply click this [GitHub page](https://leahin.github.io/blackbox/).

Or, to run locally.
1. Clone this repository
```
git clone https://github.com/leahin/blackbox
```
2. Install any requirements
```
cd blackbox
yarn install
``` 
3. Run index.html through a local server.

## License
MIT License. For more information, see the license tab.
