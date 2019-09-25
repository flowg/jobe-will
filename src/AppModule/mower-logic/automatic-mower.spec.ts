/**
 * App imports
 */
import {
    AutomaticMower,
    MowerOrientation
} from './automatic-mower';

/**
 * TypeScript entities and constants
 */
const defaultTestingInput = `6 4
0 4 E
LFRRFLFF
0 0 E
LFRFFRFRF`;

describe( 'AutomaticMower', () => {
    it( 'should create an instance', () => {
        expect( new AutomaticMower( [ 1, 2 ], 'N' ) ).toBeTruthy();
    } );

    // Checking the orientation changes accordingly
    it( 'should be headed East when turning right from North', () => {
        const mower: AutomaticMower = new AutomaticMower( [ 1, 2 ], 'N' );
        mower.turnRight();
        expect( mower.currentOrientation ).toBe( MowerOrientation.E );
    } );

    it( 'should be headed North when turning right from West', () => {
        const mower: AutomaticMower = new AutomaticMower( [ 1, 2 ], 'W' );
        mower.turnRight();
        expect( mower.currentOrientation ).toBe( MowerOrientation.N );
    } );

    it( 'should be headed North when turning left from East', () => {
        const mower: AutomaticMower = new AutomaticMower( [ 1, 2 ], 'E' );
        mower.turnLeft();
        expect( mower.currentOrientation ).toBe( MowerOrientation.N );
    } );

    it( 'should be headed West when turning left from North', () => {
        const mower: AutomaticMower = new AutomaticMower( [ 1, 2 ], 'N' );
        mower.turnLeft();
        expect( mower.currentOrientation ).toBe( MowerOrientation.W );
    } );

    // Checking the mower moves properly
    it( 'should move to the cell on top of its current position when heading North', () => {
        const mower: AutomaticMower = new AutomaticMower( [ 2, 3 ], 'N' );
        mower.setGridSize( [ 6, 4 ] );
        mower.moveForward();
        expect( mower.finalPosition ).toBe( '2 4' );
    } );

    it( 'should move to the cell at the right of its current position when heading East', () => {
        const mower: AutomaticMower = new AutomaticMower( [ 3, 1 ], 'E' );
        mower.setGridSize( [ 6, 4 ] );
        mower.moveForward();
        expect( mower.finalPosition ).toBe( '4 1' );
    } );

    it( 'should move to the cell below its current position when heading South', () => {
        const mower: AutomaticMower = new AutomaticMower( [ 2, 1 ], 'S' );
        mower.setGridSize( [ 6, 4 ] );
        mower.moveForward();
        expect( mower.finalPosition ).toBe( '2 0' );
    } );

    it( 'should move to the cell at the left of its current position when heading West', () => {
        const mower: AutomaticMower = new AutomaticMower( [ 4, 1 ], 'W' );
        mower.setGridSize( [ 6, 4 ] );
        mower.moveForward();
        expect( mower.finalPosition ).toBe( '3 1' );
    } );

    // Checking the mower respects move restrictions
    it( 'should not move when being instructed to go outside the grid in the North', () => {
        const mower: AutomaticMower = new AutomaticMower( [ 1, 4 ], 'N' );
        mower.setGridSize( [ 6, 4 ] );
        mower.moveForward();
        expect( mower.finalPosition ).toBe( '1 4' );
    } );

    it( 'should not move when being instructed to go outside the grid in the East', () => {
        const mower: AutomaticMower = new AutomaticMower( [ 5, 4 ], 'E' );
        mower.setGridSize( [ 5, 5 ] );
        mower.moveForward();
        expect( mower.finalPosition ).toBe( '5 4' );
    } );

    it( 'should not move when being instructed to go outside the grid in the South', () => {
        const mower: AutomaticMower = new AutomaticMower( [ 1, 0 ], 'S' );
        mower.setGridSize( [ 2, 3 ] );
        mower.moveForward();
        expect( mower.finalPosition ).toBe( '1 0' );
    } );

    it( 'should not move when being instructed to go outside the grid in the West', () => {
        const mower: AutomaticMower = new AutomaticMower( [ 0, 4 ], 'W' );
        mower.setGridSize( [ 5, 4 ] );
        mower.moveForward();
        expect( mower.finalPosition ).toBe( '0 4' );
    } );

    it( 'should not move when being instructed to go on a cell already occupied', () => {
        const mower: AutomaticMower = new AutomaticMower( [ 1, 4 ], 'N' );
        mower.setGridSize( [ 6, 6 ] );
        mower.addObstacles( [ '1 5' ] );
        mower.moveForward();
        expect( mower.finalPosition ).toBe( '1 4' );
    } );
} );
