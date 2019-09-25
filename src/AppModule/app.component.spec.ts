/**
 * Angular imports
 */
import {
    TestBed,
    async
} from '@angular/core/testing';

/**
 * App imports
 */
import { AppComponent } from './app.component';

describe( 'AppComponent', () => {
    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            declarations: [
                AppComponent
            ],
        } ).compileComponents();
    } ) );

    it( 'should create the AppModule', () => {
        const fixture = TestBed.createComponent( AppComponent );
        const app = fixture.debugElement.componentInstance;
        expect( app ).toBeTruthy();
    } );

    it( `should have as title "Jobe's will"`, () => {
        const fixture = TestBed.createComponent( AppComponent );
        const app = fixture.debugElement.componentInstance;
        expect( app.title ).toEqual( 'Jobe\'s will' );
    } );
} );
