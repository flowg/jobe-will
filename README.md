# Jobe's Will

This project implements a simulation of automatic lawn mowers for rectangular surfaces that can receive instructions through
an input file.

* Several mowers can be specified through the input file
* The lawn can be assimilated to a grid with cartesian coordinates
* The origin ( 0 ; 0 ) is at the lower-left corner of the lawn
* The X axis goes from left to right
* The Y axis goes from bottom to top
* A mower can either move forward or change its orientation by turning left or right
* Each mower moves sequentially: it means that the next mower moves only after the previous
one has executed all its instructions
* When a mower has executed all its instructions, it outputs its position and orientation

#### *Restrictions*:
* If the position after a move is outside the lawn, then the mower do not move, it keeps its orientation
and process the next instruction
* If the position after a move is a cell already occupied by another mower, then the mower do not move, it keeps its orientation
and process the next instruction

## Install everything

After you've cloned the repository, go to the root of the project within your terminal and install all dependencies by typing
`npm install`.

## Display the app

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Display the tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.5.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
