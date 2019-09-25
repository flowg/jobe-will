/**
 * Angular imports
 */
import { TestBed } from '@angular/core/testing';

/**
 * App imports
 */
import { MowerEngineService } from './mower-engine.service';

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

    } );

    it( 'should retrieve the proper number of MowerData', () => {

    } );

    it( 'should retrieve the proper MowerData', () => {

    } );
} );

describe( 'Input validation', () => {
    let service: MowerEngineService;

    beforeEach( () => {
        TestBed.configureTestingModule( {
            providers: [ MowerEngineService ]
        } );
        service = TestBed.get( MowerEngineService );
    } );

    it( 'should throw an error when receiving an input that is not a string', () => {

    } );

    it( 'should throw an error if the input has just one line', () => {

    } );

    it( 'should throw an error if the input doesn\'t have two lines per mower', () => {

    } );

    it( 'should throw an error if a non valid position is provided', () => {

    } );

    it( 'should throw an error if a non valid orientation is provided', () => {

    } );

    it( 'should throw an error if a non valid instruction is provided', () => {

    } );
} );
