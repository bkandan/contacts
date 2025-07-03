import React, { useState, useEffect } from 'react';
import { useParams } from 'wasp/client/router';
import { useQuery, useAction, getContact, updateContact } from 'wasp/client/operations';

const ContactPage = () => {
  const { contactId } = useParams();
  const { data: contact, isLoading, error } = useQuery(getContact, { id: parseInt(contactId) });
  const updateContactFn = useAction(updateContact);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setEmail(contact.email);
      setPhone(contact.phone || '');
    }
  }, [contact]);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdateContact = () => {
    updateContactFn({ id: contact.id, name, email, phone });
  };

  return (
    <div className='p-4 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-4'>Edit Contact</h2>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2'>Name</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2'>Phone</label>
        <input
          type='tel'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      <button
        onClick={handleUpdateContact}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
      >
        Update Contact
      </button>
    </div>
  );
};

export default ContactPage;
