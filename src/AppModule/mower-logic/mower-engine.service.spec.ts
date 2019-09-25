/**
 * Angular imports
 */
import { TestBed } from '@angular/core/testing';

/**
 * App imports
 */
import { MowerEngineService } from './mower-engine.service';
import { MowerInstruction } from './automatic-mower';

/**
 * TypeScript entities and constants
 */
const validationErrors: { [ prop: string ]: string } = {
    noString: 'Please provide the input as a string',
    invalid: 'The input provided is not valid'
};

const oneLineInput = `5 5`;
const evenNumberLinesInput = `5 5
1 3 N
LFRRFLFFF
2 4 E`;
const inValidPositionInput = `5 5
1 2N N
LFLFLFLFF
3 3 E
FFRFFRFRRF`;
const inValidOrientationInput = `5 5
1 2 R
LFLFLFLFF
3 3 E
FFRFFRFRRF`;
const inValidInstructionInput = `5 5
1 2N N
LFLFLF LFF
3 3 E
FFRFFRFRRF`;
const defaultTestingInput = `6 4
0 4 E
LFRRFLFF
0 0 E
LFRFFRFRF`;

describe( 'Input parsing', () => {
    let service: MowerEngineService;

    beforeEach( () => {
        TestBed.configureTestingModule( {
            providers: [ MowerEngineService ]
        } );
        service = TestBed.get( MowerEngineService );
    } );

    it( 'should throw an error when receiving an input that is not a string', () => {
        const input = null;
        expect( () => service.parseInput( input ) ).toThrowError( validationErrors.noString );
    } );

    it( 'should throw an error if the input has just one line', () => {
        expect( () => service.parseInput( oneLineInput ) ).toThrowError( validationErrors.invalid );
    } );

    it( 'should throw an error if the input doesn\'t have two lines per mower', () => {
        expect( () => service.parseInput( evenNumberLinesInput ) ).toThrowError( validationErrors.invalid );
    } );

    it( 'should throw an error if a non valid position is provided', () => {
        expect( () => service.parseInput( inValidPositionInput ) ).toThrowError( validationErrors.invalid );
    } );

    it( 'should throw an error if a non valid orientation is provided', () => {
        expect( () => service.parseInput( inValidOrientationInput ) ).toThrowError( validationErrors.invalid );
    } );

    it( 'should throw an error if a non valid instruction is provided', () => {
        expect( () => service.parseInput( inValidInstructionInput ) ).toThrowError( validationErrors.invalid );
    } );
} );

describe( 'MowerEngineService', () => {
    let service: MowerEngineService;

    beforeEach( () => {
        TestBed.configureTestingModule( {
            providers: [ MowerEngineService ]
        } );
        service = TestBed.get( MowerEngineService );
    } );

    it( 'should be created', () => {
        expect( service ).toBeTruthy();
    } );

    it( 'should retrieve the proper grid size', () => {
        service.parseInput( defaultTestingInput );
        expect( service.gridSize ).toEqual( [ 6, 4 ] );
    } );

    it( 'should retrieve the proper number of MowerData', () => {
        service.parseInput( defaultTestingInput );
        expect( service.mowersData.length ).toBe( 2 );
    } );

    it( 'should retrieve the proper MowerData', () => {
        service.parseInput( defaultTestingInput );

        expect( service.mowersData[ 0 ].mower.initialState ).toBe( '0 4 E' );
        expect( service.mowersData[ 0 ].instructions )
            .toEqual( [ 'L', 'F', 'R', 'R', 'F', 'L', 'F', 'F' ] as MowerInstruction[] );
        expect( service.mowersData[ 1 ].mower.initialState ).toBe( '0 0 E' );
        expect( service.mowersData[ 1 ].instructions )
            .toEqual( [ 'L', 'F', 'R', 'F', 'F', 'R', 'F', 'R', 'F' ] as MowerInstruction[] );
    } );
} );
