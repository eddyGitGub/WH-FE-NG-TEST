/**
 * Update the following components to meet the requirements : 
 * * Bind `field` of [textfield] component to its text input
 * * Pass value of `field` from [textfield] component to [title] property of component [ng-app]
 */
import { Component, NgModule, OnInit  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
    selector : 'textfield',
    template: '<input type="text" [(ngModel)]="field" (blur)="newMessage()" />'
})
export class TextField {
    field = "";
    constructor(private myService: MyService){

    }
    newMessage() {
        console.log(this.field);
        this.myService.changeMessage(`${this.field}`)
    }
}

@Component({
    selector : 'child-component',
    template : `<h2>Title:<h2><br/><textfield></textfield>`
})
export class ChildComponent {

}


@Component({
    selector : 'ng-app',
    template : `<div>
                    <child-component></child-component> <br/>
                    Title is {{title}}
                </div>`
})
export class Test02Component implements OnInit {

    title:string = "";
    /**
     *
     */
    constructor(private myService: MyService) {
      

    }
    ngOnInit(): void {
        this.myService.currentMessage.subscribe(title => this.title = title)
        
    }
}



@Injectable()
export class MyService {

    private messageSource = new BehaviorSubject('');
    currentMessage = this.messageSource.asObservable();


    constructor() {
    }

    changeMessage(message: string) {
        this.messageSource.next(message)
    }
}


@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test02Component
            }
        ])
    ],
    providers: [MyService],
    declarations : [Test02Component,ChildComponent,TextField]
})
export class Test02Module {};