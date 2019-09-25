/**
 * Angular imports
 */
import {
    Component,
    OnInit
} from '@angular/core';

/**
 * App imports
 */
import { MowerEngineService } from './mower-logic/mower-engine.service';

/**
 * TypeScript entities and constants
 */
const defaultInput = `5 5
1 2 N
LFLFLFLFF
3 3 E
FFRFFRFRRF`;

/*const defaultInput = `5 5
 1 2 N
 RFFLF
 3 3 E
 RRFF`;*/

@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ]
} )
export class AppComponent implements OnInit {
    title = 'Jobe\'s will';
    input: string;
    outputs: string[];

    constructor( private mowerEngine: MowerEngineService ) {
    }

    ngOnInit() {
        this.mowerEngine.parseInput( this.getInput() );
        this.outputs = this.mowerEngine.runMowersInstructions();
    }

    private getInput(): string {
        this.input = defaultInput;

        return defaultInput;
    }
}
