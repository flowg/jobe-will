/**
 * Angular imports
 */
import { TestBed, async } from '@angular/core/testing';

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

  it( `should have as title 'jobe-will'`, () => {
    const fixture = TestBed.createComponent( AppComponent );
    const app = fixture.debugElement.componentInstance;
    expect( app.title ).toEqual( 'jobe-will' );
  } );

  it( 'should render title', () => {
    const fixture = TestBed.createComponent( AppComponent );
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect( compiled.querySelector( '.content span' ).textContent ).toContain( 'jobe-will AppModule is running!' );
  } );
} );
