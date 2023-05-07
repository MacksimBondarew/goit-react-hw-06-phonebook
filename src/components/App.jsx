import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NameEditor from './NameEditor';
import NameList from './NameList';
import FilterName from './FilterName';
import { PhoneBook, TitleContacts, MainTitlePhoneBook } from './App.styled';

const App = () => {
    const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState('');

    const addName = (name, number) => {
        const contact = {
            id: nanoid(),
            name,
            number,
        };

        setContacts(prevContacts => [contact, ...prevContacts]);
    };

    const getVisibleName = () => {
        const normalizedName = filter.toLowerCase();
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedName)
        );
    };

    const deleteName = nameId => {
        setContacts(
            prevContacts =>
                (prevContacts = contacts.filter(name => name.id !== nameId))
        );
    };
    const changeFilter = e => {
        setFilter(prevFilter => (prevFilter = e.target.value));
    };
    useEffect(() => {
        const localContacts = localStorage.getItem('contacts');
        if (localContacts) {
            const parsedContacts = JSON.parse(localContacts);
            setContacts(parsedContacts);
        }
    }, []);

    useEffect(() => {
        const updatedContacts = JSON.stringify(contacts);
        localStorage.setItem('contacts', updatedContacts);
    }, [contacts]);

    return (
        <PhoneBook>
            <MainTitlePhoneBook>Phonebook</MainTitlePhoneBook>
            <NameEditor onSubmit={addName} people={contacts} />

            <TitleContacts>Contacts</TitleContacts>
            <FilterName value={filter} onChange={changeFilter} />
            <NameList contacts={getVisibleName()} deleteName={deleteName} />
        </PhoneBook>
    );
};

export default App;
