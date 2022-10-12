/**
 * Update the following components to meet the requirements : 
 * 
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 * 
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 * 
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
    selector : 'ng-app',
    template: `<form  name="form"
    #f="ngForm"
    (ngSubmit)="f.form.valid && onSubmit()"
    novalidate>
                    <h2>Login</h2>
                    <br/>
                    <input type="email" [(ngModel)]="form.email" name="email" required email  maxlength="50"/>
                    <br/>
                    <input type="password" [(ngModel)]="form.password" name="password" required 
                    pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$" />
                    <button type="submit" [disabled]="!f.valid">Submit</button>
                    <br/><br/>
                    <div *ngIf="logged_in">Logged In!</div>
                </form>`
})
export class Test03Component {
    form = {
        email: "",
        password: ""
    };
   

    logged_in = false;
    onSubmit(){
        this.logged_in= true;
    }
}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test03Component
            }
        ])
    ],
    declarations : [Test03Component]
})
export class Test03Module {};