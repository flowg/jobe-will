/**
 * App imports
 */
import { AutomaticMower } from './automatic-mower';

describe( 'AutomaticMower', () => {
    it( 'should create an instance', () => {
        expect( new AutomaticMower( [ 1, 2 ], 'N' ) ).toBeTruthy();
    } );

    it( 'should be headed East when turning right from North', () => {

    } );

    it( 'should be headed North when turning right from West', () => {

    } );

    it( 'should be headed North when turning left from East', () => {

    } );

    it( 'should be headed West when turning left from North', () => {

    } );

    it( 'should not move when being instructed to go outside the grid in the North', () => {

    } );

    it( 'should not move when being instructed to go outside the grid in the East', () => {

    } );

    it( 'should not move when being instructed to go outside the grid in the South', () => {

    } );

    it( 'should not move when being instructed to go outside the grid in the West', () => {

    } );

    it( 'should not move when being instructed to go on a cell already occupied', () => {

    } );
} );
