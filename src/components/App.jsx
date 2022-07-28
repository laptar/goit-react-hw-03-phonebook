import React, { Component } from 'react';
import contactsUsers from '../data/contacts.json';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: contactsUsers,
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      this.setState({ contacts: JSON.parse(contacts) });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  deleteContactsItem = itemId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== itemId),
    }));
  };

  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  hendleUpdateContacts = data => {
    if (
      this.state.contacts.find(
        ({ name }) => name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      alert(`${data.name} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [data, ...prevState.contacts],
      }));
    }
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.hendleUpdateContacts} />
        <h2>Contacts</h2>
        <Filter onChange={this.handleChangeInput} value={filter} />
        <ContactList
          list={contacts}
          serchName={filter}
          onDelete={this.deleteContactsItem}
        />
      </div>
    );
  }
}
