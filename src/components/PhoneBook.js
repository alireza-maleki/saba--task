import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100vh;
     background-color: #aaa;
     padding-top: 50px;
`;

const Main = styled.div`
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
`;


const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: none;
  border-radius: 3px;
  font-size: 16px;
  outline: none;
  background-color: #ccc;
`;

const Select = styled.select`
    width: 20%;
    padding: 12px;
    margin-top: 10px;
    border: none;
    border-radius: 3px;
    font-size: 16px;
    outline: none;
    background-color: #ccc;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #2980b9;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 0.2rem;
  font-size: 14px;
  font-weight: bold; 
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  `;

const ContactItem = styled.li`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ContactName = styled.span`
  font-weight: bold;
`;

const ContactPhone = styled.span`
  color: #555;
`;

const ConcatGender = styled.span`
    color: #555;
    margin: 0 14px;
`;



const PhoneBook = () => {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [editingContactId, setEditingContactId] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [userSort, setUserSort] = useState('اولین شماره ثبت شده');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const userGenderHandler = (e) => {
        setGender(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && phone && gender) {
            if (editingContactId) {
                // در صورتی که در حالت ویرایش هستیم
                const updatedContacts = contacts.map((contact) => {
                    if (contact.id === editingContactId) {
                        return {
                            ...contact,
                            name: name,
                            phone: phone,
                            gender: gender
                        };
                    }
                    return contact;
                });
                setContacts(updatedContacts);
                setEditingContactId(null);
            } else {
                // در صورتی که در حالت اضافه کردن هستیم
                const newContact = {
                    id: Date.now(),
                    name: name,
                    phone: phone,
                    gender: gender
                };
                setContacts([...contacts, newContact]);
            }
            setName('');
            setPhone('');
        }
    };

    console.log(contacts)

    const handleDelete = (id) => {
        const updatedContacts = contacts.filter((contact) => contact.id !== id);
        setContacts(updatedContacts);
    };

    const handleEdit = (id) => {
        const contactToEdit = contacts.find((contact) => contact.id === id);
        if (contactToEdit) {
            setName(contactToEdit.name);
            setPhone(contactToEdit.phone);
            setGender(contactToEdit.gender);
            setEditingContactId(id);
        }
    };

    const searchHandler = (e) => {
        setSearchInput(e.target.value);
    };

    return (
        <Container>

            <Main>
                <form onSubmit={handleSubmit}>
                    <Title>دفترچه تلفن</Title>
                    <Input
                        type="text"
                        placeholder="نام"
                        value={name}
                        onChange={handleNameChange}
                    />
                    <Input
                        type="text"
                        placeholder="شماره تلفن"
                        value={phone}
                        onChange={handlePhoneChange}
                    />

                    <label htmlFor="cars">جنسیت : </label>

                    <Select onChange={userGenderHandler}>
                        <option value="">انتخاب کنید</option>
                        <option value="مرد">مرد</option>
                        <option value="زن">زن</option>
                    </Select>

                    <Button style={{ display: 'block', marginTop: '60px' }} type="submit">
                        {editingContactId ? 'ویرایش' : 'اضافه کردن'}
                    </Button>
                </form>
                <ContactList>

                    <div>
                        {contacts.length > 0 &&
                            <>
                                <Input
                                    type="search"
                                    placeholder="جستجو کنید."
                                    vlaue={searchInput}
                                    onChange={searchHandler}
                                />

                                <Select onChange={(e) => setUserSort(e.target.value)} style={{ width: '50%' }}>
                                    <option value="اولین شماره ثبت شده">اولین شماره ثبت شده</option>
                                    <option value="آخرین شماره ثبت شده">آخرین شماره ثبت شده</option>
                                </Select>
                            </>
                        }
                    </div>



                    {contacts.filter((contact) => {
                        return contact.name.toLowerCase().includes(searchInput.toLowerCase())
                    })
                        .sort((a, b) => {
                            return userSort == 'اولین شماره ثبت شده' ? a.id - b.id : b.id - a.id
                        })
                        .map((contact) => (
                            <ContactItem key={contact.id}>
                                <div style={{ marginLeft: '20px' }}>
                                    <ContactPhone>{contact.phone}</ContactPhone>
                                    <ConcatGender>{contact.gender}</ConcatGender>
                                    <ContactName>{contact.name}</ContactName>
                                </div>
                                <div>
                                    <Button onClick={() => handleEdit(contact.id)}>ویرایش</Button>
                                    <Button style={{ marginRight: '5px' }} onClick={() => handleDelete(contact.id)}>حذف</Button>
                                </div>
                            </ContactItem>
                        ))}
                </ContactList>
            </Main>

        </Container>
    );
};

export default PhoneBook;
