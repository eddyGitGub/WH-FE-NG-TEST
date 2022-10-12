/**
 * In the following React template, create a simple form at the top that allows the user to enter 
 * in a first name, last name, and phone number and there should be a submit button. 
 * Once the submit button is pressed, the information should be displayed in a list below
 *  (automatically sorted by last name) along with all the previous information that was entered.
 * This way the application can function as a simple phone book. 
 * When your application loads, the input fields (not the phone book list) should be prepopulated with the following values already:
 * 
    First name = Coder
    Last name = Byte
    Phone = 8885559999
 * 
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const style = {
    table: {
        borderCollapse: "collapse"
    },
    tableCell: {
        border: '1px solid gray',
        margin: 0,
        padding: '5px 10px',
        width: 'max-content',
        minWidth: '150px'
    },
    form: {
        container: {
            padding: '20px',
            border: '1px solid #F0F8FF',
            borderRadius: '15px',
            width: 'max-content',
            marginBottom: '40px'
        },
        inputs: {
            marginBottom: '5px'
        },
        submitBtn: {
            marginTop: '10px',
            padding: '10px 15px',
            border: 'none',
            backgroundColor: 'lightseagreen',
            fontSize: '14px',
            borderRadius: '5px'
        }
    }
} as const;
const contactList: Array<IContact> = [];
function PhoneBookForm({ addEntryToPhoneBook, onAddContact }) {
    const [formValue, setFormValue] = useState(addEntryToPhoneBook);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onAddContact(formValue);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
       
    };
   
    return (
        <form onSubmit={handleSubmit} style={style.form.container}>
            <label>First name:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userFirstname'
                name='userFirstname'
                type='text'
                value={formValue.userFirstname || ""} 
                onChange={handleChange}
            />
            <br />
            <label>Last name:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userLastname'
                name='userLastname'
                type='text'
                value={formValue.userLastname || ""} 
                onChange={handleChange}
            />
            <br />
            <label>Phone:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userPhone'
                name='userPhone'
                type='text'
                value={formValue.userPhone || ""} 
                onChange={handleChange}
            />
            <br />
            <input
                style={style.form.submitBtn}
                className='submitButton'
                type='submit'
                value='Add User'
            />
        </form>
    )
}

function InformationTable(props: { contacts: IContact[]; }) {
    return (
        <table style={style.table} className='informationTable'>
            <thead>
                <tr>
                    <th style={style.tableCell}>First name</th>
                    <th style={style.tableCell}>Last name</th>
                    <th style={style.tableCell}>Phone</th>
                </tr>
            </thead>
            <tbody>
                {props.contacts.length > 0 ? (
                    props.contacts.map((i: { id: React.Key | null | undefined; userFirstname: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; userLastname: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; userPhone: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
                        <tr key={i.id}>
                            <td>{i.userFirstname}</td>
                            <td>{i.userLastname}</td>
                            <td>{i.userPhone}</td>
                           
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={3}>no contacts</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

function Application() {
    const [contacts, setContacts] = useState(contactList);
    const initialState: IContact = {
        id: 0,
        userFirstname: "Coder",
        userLastname: "Byte",
        userPhone: 8885559999
    };
    

    const onAddContact = (newContact: IContact) => {
        const id = contacts.length + 1;
        setContacts([...contacts, { ...newContact, id }]);
    };
    
    return (
        <section>
            <PhoneBookForm addEntryToPhoneBook={initialState} onAddContact={onAddContact}/>
            <InformationTable contacts={contacts}/>
        </section>
    );
}

ReactDOM.render(
    <Application />,
    document.getElementById('test-03')
);

export interface IContact {
    id:number;
    userFirstname: string;
    userLastname: string;
    userPhone: number | string;
}