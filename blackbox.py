"""
Blackbox boardgame.
- Generate atoms' random locations.
- Tracks number of atoms left and scores.
- Calculate ray's movement and direction to determine whether
  the ray hits, deflects or reflects.
"""

import random
from typing import List, Tuple


class Blackbox:
    """
    class implements blackbox board game.

    Attributes:
        _grid_size: int
            If the value is n, the blackbox's size is n x n.

        _num_atoms: int
            The number of atoms in the blackbox.

        _atoms: list[(int, int)]
            List contains coordinates of atoms. coordinates is read as (row, col).

        _atoms_left: int
            The number of hidden atoms in the blackbox that user hasn't found yet.

        _score: int
            The current score. Initially set to 25.
    
        _blackbox: list[list[int]]
            The blackbox board.
            Should set the size to (_grid_size + 2) x (_grid_size + 2).
            If _blackbox[i][j], the first and last index of i or j represent the location
            where user shoots ray. The inner grid, range from 1 to _grid_size, represents
            the blackbox where atoms are hidden.
            The nested list should be 0 for all indices except for the coordinations
            of atoms which has 1.
            
        _entry_coord: (int, int)
            Entry coordinate where user shoots ray. It is read as (row, col).

    Methods:
        generate_atoms():
            Return list of randomly selected unique coordinates (row, col) of atoms.

        deduct_score(point):
            Subtract _score by the input value. 
        
        shoot_ray(row, col):
            Take ray's entry coordinate, then call either to_south(), to_north(),
            to_east() or to_west() until it returns (row, col).
                If (row, col) is (0, 0), the ray hit an atom.
                If (row, col) is the same coordinate of the entry coordinate,
                    then the ray reflected.
                Otherwise, the ray deflected and exited to the given coordinate.  
        
        to_south(row, col):
            Implements ray's movement to south, this is equivalent to row + 1.
            Returns (row, col).

        to_north(row, col):
            Implements ray's movement to north, this is equivalent to row - 1.
            Returns (row, col).        
        
        to_east(row, col):
            Implements ray's movement to east, this is equivalent to col + 1.
            Returns (row, col). 

        to_west(row, col):
            Implements ray's movement to west, this is equivalent to col - 1.
            Returns (row, col).

        guess_atom(row, col):
            Returns true if the given coordinate has an atom. Otherwise,
            return False.

        get_atoms():
            Return _atoms.

        get_atoms_left():
            Return _atoms_left.

        get_score():
            Return _score.

        display_blackbox():
            Print _blackbox to stdout.
    """

    def __init__(self, grid_size: int):
        self._grid_size = grid_size
        self._num_atoms = 6
        self._atoms = self.generate_atoms()
        self._atoms_left = len(self._atoms)
        self._score = 25
        self._blackbox = [[0 for _ in range(self._grid_size + 2)] 
                            for _ in range(self._grid_size + 2)] 
        self._entry_coord = None

        # Place atoms in _blackbox
        for i, j in self._atoms:
            self._blackbox[i][j] = 1

    def generate_atoms(self) -> List[Tuple[int, int]]:
        """
        Generate coordinates (row, col) of atoms and then return them.
        Divide blackbox into 4 sub-areas and select a coordinate
        from each sub-areas. If atom_num is not divisible by 4, the 
        remiander atoms will be selected from randomly selected aub-areas.

        Return:
            atoms: list[(int, int)]
                List of atoms' coordinates (row, col).
        """
        # Divide blackbox into 4 sub-areas.
        r1 = (1, self._grid_size // 2)
        r2 = (self._grid_size // 2 + 1, self._grid_size)
        sub_areas = [(r1, r1), (r1, r2), (r2, r1), (r2, r2)]

        atoms = []
        for i in range(self._num_atoms):
            if i < self._num_atoms % len(sub_areas):
                (x0, x1), (y0, y1) = random.choice(sub_areas)
            else:
                # Each sub-area gets at least one atom.
                (x0, x1), (y0, y1) = sub_areas[i % len(sub_areas)]
            row = random.randint(x0, x1)
            col = random.randint(y0, y1)
            while (row, col) in atoms:  # To prevent duplicates.
                row = random.randint(x0, x1)
                col = random.randint(y0, y1)
            atoms.append((row, col))

        return atoms

    def deduct_score(self, point: int) -> None:
        """
        Subtract _score by the given point.
        """
        self._score -= point

    def shoot_ray(self, row: int, col: int) -> Tuple[int, int]:
        """
        Takes ray's entry coordinate. Then, determine form which direction
        the ray has been shot. It also subtract 1 point from _score.
        Calling sequence methods to return the exit coordinate (row, col).

        Calling sequence:
            If col is 0, then call to_east().
            If col is _grid_size + 1, then call to_west().
            If row is 0, then call to_south().
            If row is _grid_size + 1, then call to_north().

        Exit coordinate:
            If the exit cooridnate is (0, 0), the ray hit an atom.
            If the exit cooridnate is the same as the entry coordinate,
                then the ray reflected.
            Otherwise, the ray deflected and exited to the given coordinate. 
        """
        self._entry_coord = (row, col)
        self.deduct_score(1)

        if col == 0:  
            return self.to_east(row, col)
        if col == 9:  
            return self.to_west(row, col)
        if row == 0:  
            return self.to_south(row, col)
        if row == 9:  
            return self.to_north(row, col)

    def to_south(self, row: int, col: int) -> Tuple[int, int]:
        """
        Checking atoms toward south (row + 1) from the given coordinate.
        If row reaches the end of the board or found an atom, returns
            the exit coordinate.
        """
        # Checking hit, reflect and deflect.
        if row == 9:
            if (row, col) != self._entry_coord:  # Deduct score for deflect
                self.deduct_score(1)
            return row, col
        if self._blackbox[row+1][col]: return 0, 0

        # Determine next direction.
        right, left = 0, 0
        if self._blackbox[row+1][col-1]:
            right += 1
        if self._blackbox[row+1][col+1]:
            left += 1
        
        if right and left:
            return self.to_north(row, col)
        if right:
            # Checking special condition If reflect occurs at the start.
            if row == 0: return row, col
            return self.to_east(row, col)
        if left:
            if row == 0: return row, col
            return self.to_west(row, col)    

        return self.to_south(row+1, col)

    def to_north(self, row: int, col: int) -> Tuple[int, int]:
        """
        Checking atoms toward north (row - 1) from the given coordinate.
        If row reaches the end of the board or found an atom, returns
            the exit coordinate.
        """
        # Checking hit, reflect and deflect.
        if row == 0:  # deflect or reflect
            if (row, col) != self._entry_coord:  # Deduct score for deflect
                self.deduct_score(1)
            return row, col
        if self._blackbox[row-1][col]: return 0, 0

        # Determine next direction.
        right, left = 0, 0
        if self._blackbox[row-1][col-1]:
            right += 1
        if self._blackbox[row-1][col+1]:
            left += 1
        
        if right and left:
            return self.to_south(row, col)
        if right:
            # Checking special condition If reflect occurs at the start.
            if row == 9: return row, col
            return self.to_east(row, col)
        if left:
            if row == 9: return row, col
            return self.to_west(row, col)    

        return self.to_north(row-1, col)

    def to_east(self, row: int, col: int) -> Tuple[int, int]:
        """
        Checking atoms toward east (col + 1) from the given coordinate.
        If row reaches the end of the board or found an atom, returns
            the exit coordinate.
        """
        # Checking hit, reflect and deflect.
        if col == 9:
            if (row, col) != self._entry_coord:
                self.deduct_score(1)
            return row, col
        if self._blackbox[row][col+1]: return 0, 0

        # Determine next direction.
        right, left = 0, 0
        if self._blackbox[row-1][col+1]:
            right += 1
        if self._blackbox[row+1][col+1]:
            left += 1
        
        if right and left:
            return self.to_west(row, col)
        if right:
            # Checking special condition If reflect occurs at the start.
            if col == 0: return row, col
            return self.to_south(row, col)
        if left:
            if col == 0: return row, col
            return self.to_north(row, col)    

        return self.to_east(row, col+1)

    def to_west(self, row: int, col: int) -> Tuple[int, int]:
        """
        Checking atoms toward west (col - 1) from the given coordinate.
        If row reaches the end of the board or found an atom, returns
            the exit coordinate.
        """
        # Checking hit, reflect and deflect.        
        if col == 0:
            if (row, col) != self._entry_coord:
                self.deduct_score(1)
            return row, col
        if self._blackbox[row][col-1]: return 0, 0

        # Determine next direction.
        right, left = 0, 0
        if self._blackbox[row-1][col-1]:
            right += 1
        if self._blackbox[row+1][col-1]:
            left += 1
        
        if right and left:
            return self.to_east(row, col)
        if right:
            # Checking special condition If reflect occurs at the start.
            if col == 9: return row, col
            return self.to_south(row, col)
        if left:
            if col == 9: return row, col
            return self.to_north(row, col)    

        return self.to_west(row, col-1)

    def guess_atom(self, row: int, col: int) -> bool:
        """
        Check if the given coordinate has an atom. If so, return True
        and deduct _atoms_left by 1. Otherwise, return false and
        deduct _score by 5.
        """

        if (row, col) in self._atoms:
            self._atoms_left -= 1
            return True
        self.deduct_score(5)
        return False

    def get_atoms(self) -> List[Tuple[int, int]]:
        """
        Return _atoms.
        """
        return self._atoms

    def get_atoms_left(self) -> int:
        """
        Return _atoms_left.
        """
        return self._atoms_left

    def get_score(self) -> int:
        """
        Return _score.
        """
        return self._score
    
    def display_blackbox(self) -> None:
        """
        Print _blackbox to stdout.
        """
        for line in self._blackbox:
            print(line)

