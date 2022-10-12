/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, and user has clicked out of the fields, then beside it a username should be automatically generated which should be in the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector : 'ng-app',
    template : `
                <h2>Enter your first and last name</h2>
                <div>
                    <h1>Surname: {{displayUserName}}</h1>
                    <form>
                        Firstname: <input type="text" [(ngModel)]="form.firstname" 
                        name="firstname" required   maxlength="50" (blur)="generateUserName()"/><br>
                        Lastname: <input type="text" [(ngModel)]="form.lastname" 
                        name="lastname" required   maxlength="50" (blur)="generateUserName()"/>
                    </form>
                </div>
                `,
    styles : []
})
export class UserNameComponent {
    form = {
        firstname: "",
        lastname: ""
    };
    displayUserName:string=  "";
    
generateUserName(){
    const num = Math.floor(Math.random() * (9 + 1));
    let surname = `${this.form.firstname.toLowerCase()}_${this.form.lastname.toLowerCase()}_${num}`
    if(this.form.firstname && this.form.lastname){
        this.displayUserName = surname;
    }
    
}
}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : UserNameComponent
            }
        ])
    ],
    declarations : [UserNameComponent]
})
export class UserNameModule {};