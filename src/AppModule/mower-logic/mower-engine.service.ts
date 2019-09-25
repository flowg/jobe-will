/**
 * Angular imports
 */
import { Injectable } from '@angular/core';

/**
 * App imports
 */
import {
    AutomaticMower,
    MowerInstruction,
    PossibleOrientations
} from './automatic-mower';

/**
 * TypeScript entities and constants
 */
interface MowerData {
    mower: AutomaticMower;
    instructions: MowerInstruction[];
}

const inputFormat: RegExp = /(\d+\s\d+)\n((?:(?:\d+\s\d+\s[NESW])\n(?:[LRF]+)\n?)+)$/;

@Injectable( {
    providedIn: 'root'
} )
export class MowerEngineService {
    private currentGridSize: [ number, number ];
    private currentMowersData: MowerData[];

    parseInput( input: string ) {
        console.log( 'Parsing input', input );
        // Checking if the input is a string
        if ( typeof input !== 'string' ) {
            throw new Error( 'Please provide the input as a string' );
        }

        // Checking if the input is valid
        const checkResult = inputFormat.exec( input );
        if ( checkResult === null ) {
            throw new Error( 'The input provided is not valid' );
        }
        console.log( checkResult );

        // Retrieving the grid size
        this.currentGridSize = checkResult[ 1 ].split( ' ' )
            .map( ( coordinate: string ) => +coordinate ) as [ number, number ];
        console.log( this.currentGridSize );

        // Retrieving data for the mowers
        const mowersData: string[] = checkResult[ 2 ].split( '\n' );
        const initialPositions: string[] = mowersData.filter( ( val: string, index: number ) => index % 2 === 0 )
            .map( ( value: string ) => {
                // Getting rid of the initial orientation
                return value.split( ' ' ).slice( 0, 2 ).join( ' ' );
            } );
        this.currentMowersData = [];
        for ( let i = 0; i < mowersData.length; i++ ) {
            const mowerIndex: number = Math.floor( i / 2 );

            if ( i % 2 === 0 ) {
                // This line gives the initial position AND orientation of a new mower
                const initialPositionWithOrientation: string[] = mowersData[ i ].split( ' ' );
                const initialPosition: [ number, number ] = initialPositionWithOrientation.slice( 0, 2 )
                    .map( ( coordinate: string ) => +coordinate ) as [ number, number ];
                const initialOrientation: PossibleOrientations = initialPositionWithOrientation[ 2 ] as PossibleOrientations;
                const mower: AutomaticMower = new AutomaticMower( initialPosition, initialOrientation );
                this.currentMowersData[ mowerIndex ] = {
                    mower,
                    instructions: null
                };

                // Setting the grid size on the mower ( to make sure it will stay within it )
                mower.setGridSize( this.currentGridSize );

                /*
                 * Adding the initial positions of subsequent mowers to previous ones,
                 * as mowers run instructions sequentially
                 * ( a previously entered one in the currentMowersData array will prevail
                 * over one found later in the array when moving on the lawn )
                 */
                const subsequentInitialPositions: string[] = initialPositions.slice( mowerIndex + 1 );
                mower.addObstacles( subsequentInitialPositions );
            } else {
                // This line gives the instructions for the previously created mower instance
                this.currentMowersData[ mowerIndex ].instructions = mowersData[ i ].split( '' ) as MowerInstruction[];
            }
        }
        console.log( this.currentMowersData );
        // TODO: Add obstacles


    }

    runMowersInstructions(): string[] {
        const outputs: string[] = [];

        for ( let i = 0; i < this.currentMowersData.length; i++ ) {
            const { mower, instructions } = this.currentMowersData[ i ];

            for ( const instruction of instructions ) {
                switch ( instruction ) {
                    case MowerInstruction.L:
                        mower.turnLeft();
                        break;
                    case MowerInstruction.R:
                        mower.turnRight();
                        break;
                    case MowerInstruction.F:
                        mower.moveForward();
                        break;
                }
            }

            /*
             * Adding the final position of the current mower to next ones,
             * as mowers run instructions sequentially
             * ( a previously entered one in the currentMowersData array will prevail
             * over one found later in the array when moving on the lawn )
             */
            for ( let j = i + 1; j < this.currentMowersData.length; j++ ) {
                this.currentMowersData[ j ].mower.addObstacles( [ mower.finalPosition ] );
            }

            // Outputting final position and orientation after all instructions have been executed
            outputs.push( `The mower number ${ i } is in this final state: ${ mower.outputPositionWithOrientation() }` );
        }

        return outputs;
    }
}
