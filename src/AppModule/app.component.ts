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
import { DEFAULT_INPUT } from './input';

@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ]
} )
export class AppComponent implements OnInit {
    title = 'Jobe\'s Will';
    input: string;
    outputs: string[];

    constructor( private mowerEngine: MowerEngineService ) {
    }

    ngOnInit() {
        this.mowerEngine.parseInput( this.getInput() );
        this.outputs = this.mowerEngine.runMowersInstructions();
    }

    private getInput(): string {
        this.input = DEFAULT_INPUT;

        return DEFAULT_INPUT;
    }
}
