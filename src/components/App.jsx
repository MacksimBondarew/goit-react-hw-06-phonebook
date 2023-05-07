import { nanoid } from 'nanoid';
import NameEditor from './NameEditor';
import NameList from './NameList';
import FilterName from './FilterName';
import { PhoneBook, TitleContacts, MainTitlePhoneBook } from './App.styled';
import { useSelector, useDispatch } from 'react-redux';
import {
    addNameContact,
    deleteNameContact,
    changeFilterContact,
} from '../redux/state';
import { getContacts, getFilter } from '../redux/selectors';

const App = () => {
    const filter = useSelector(getFilter);
    const contacts = useSelector(getContacts);
    const dispatch = useDispatch();

    const addName = (name, number) => {
        const contact = {
            id: nanoid(),
            name,
            number,
        };
        dispatch(addNameContact(contact));
    };

    const getVisibleName = () => {
        const normalizedName = filter.trim().toLowerCase();
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedName)
        );
    };

    const deleteName = nameId => {
        dispatch(deleteNameContact(nameId));
    };
    const changeFilter = e => {
        dispatch(changeFilterContact(e.target.value));
    };

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
