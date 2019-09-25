/**
 * TypeScript entities and constants
 */
export type PossibleOrientations = 'N' | 'E' | 'S' | 'W';

export enum MowerOrientation {
    N,
    E,
    S,
    W
}

export enum MowerInstruction {
    L = 'L',
    R = 'R',
    F = 'F'
}

export class AutomaticMower {
    private position: [ number, number ];
    private orientation: MowerOrientation;
    private gridSize: [ number, number ];
    private obstacles: string[] = [];

    get initialState(): string {
        return this.initialPosition.join( ' ' ) + ' ' + this.initialOrientation;
    }

    get currentOrientation(): MowerOrientation {
        return this.orientation;
    }

    get finalPosition(): string {
        return this.position.join( ' ' );
    }

    constructor(
        private initialPosition: [ number, number ],
        private initialOrientation: PossibleOrientations
    ) {
        this.position = Array.from( initialPosition ) as [ number, number ];
        this.orientation = MowerOrientation[ initialOrientation ];
    }

    setGridSize( gridSize: [ number, number ] ) {
        this.gridSize = gridSize;
    }

    addObstacles( obstaclesPositions: string[] ) {
        this.obstacles = this.obstacles.concat( ...obstaclesPositions );
    }

    turnRight() {
        this.orientation = ( this.orientation + 1 ) % 4;
    }

    turnLeft() {
        this.orientation = ( this.orientation - 1 + 4 ) % 4;
    }

    moveForward() {
        // Computing eventual next position
        const nextPosition: [ number, number ] = Array.from( this.position ) as [ number, number ];
        switch ( this.orientation ) {
            case MowerOrientation.N:
                nextPosition[ 1 ]++;
                break;
            case MowerOrientation.E:
                nextPosition[ 0 ]++;
                break;
            case MowerOrientation.S:
                nextPosition[ 1 ]--;
                break;
            case MowerOrientation.W:
                nextPosition[ 0 ]--;
                break;
        }

        // Checking if next position will be valid & applying it if so
        if ( !this.nextPositionIsInvalid( nextPosition ) ) {
            // We're free to proceed
            this.position = nextPosition;
        }
    }

    private nextPositionIsInvalid( nextPosition: [ number, number ] ): boolean {
        // Checking if the mower would be outside the grid if applying the move
        const isOutside: boolean = (
            nextPosition[ 0 ] < 0
            || nextPosition[ 0 ] > this.gridSize[ 0 ]
            || nextPosition[ 1 ] < 0
            || nextPosition[ 1 ] > this.gridSize[ 1 ]
        );

        // Checking if the mower would be on a cell already occupied if applying the move
        const isOccupied: boolean = this.obstacles.includes( nextPosition.join( ' ' ) );

        return isOutside || isOccupied;
    }

    outputPositionWithOrientation(): string {
        return `${ this.position[ 0 ] } ${ this.position[ 1 ] } ${ MowerOrientation[ this.orientation ] }`;
    }
}
