/**
 * Fix the following issues in the component :
 * * ExpressionChangedAfterItHasBeenCheckedError
 * * Spot the memory leak
 * 
 */
import { Component, NgModule, Injectable, Input, ChangeDetectorRef  } from '@angular/core';
import { RouterModule, Router} from "@angular/router";
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class TestService {
    private test = new BehaviorSubject("angular test #5");
    currentTest = this.test.asObservable();

    constructor() {
       
    }
    

    SetTest(test:string) {
        this.test.next(test);
    }
}

@Component({
    selector : 'ng-app',
    template : `
                <h2>Current test is:</h2>
                {{test}}
                <br/>
                <child [skip-current]="true"></child>
                `,
    styles : []
})
export class MainComponent {
    test:string = null;

    constructor(private _srv:TestService) {

    }

    ngOnInit() {
        
        this._srv.currentTest.subscribe(test=>{
            this.test = test;
        });
    }
}

@Component({
    selector : 'child',
    template : `Sample Child component<br/> <button (click)="Next()">next test</button>`
    
})
export class TextChildComponent {
    
    @Input('skip-current') skip = false;

    constructor(private _srv: TestService, private _router: Router, private changeDetector: ChangeDetectorRef) {

    }

    Next() {
        this._router.navigate(["test-six"]);
    }

    ngAfterContentChecked() {
        this.changeDetector.detectChanges();
        if(this.skip) this._srv.SetTest("angular test #6");

        
    }

}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : MainComponent
            }
        ])
    ],
    declarations : [MainComponent,TextChildComponent],
    providers : [TestService]
})
export class MainModule {};