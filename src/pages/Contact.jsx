import React, { useState, useEffect } from 'react';
import { useParams } from 'wasp/client/router';
import { useQuery, useAction, getContacts, updateContact, deleteContact } from 'wasp/client/operations';

const ContactPage = () => {
  const { contactId } = useParams();
  const { data: contacts, isLoading, error } = useQuery(getContacts);
  const updateContactFn = useAction(updateContact);
  const deleteContactFn = useAction(deleteContact);
  
  const [contact, setContact] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    if (contacts) {
      const foundContact = contacts.find(c => c.id === parseInt(contactId));
      setContact(foundContact);
      if (foundContact) {
        setFormData({ name: foundContact.name, email: foundContact.email, phone: foundContact.phone || '' });
      }
    }
  }, [contacts, contactId]);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;
  if (!contact) return 'Contact not found';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateContact = () => {
    updateContactFn({ id: contact.id, updatedFields: formData });
    setEditMode(false);
  };

  const handleDeleteContact = () => {
    deleteContactFn({ contactId: contact.id });
  };

  return (
    <div className='p-4 bg-slate-50 rounded-lg'>
      {editMode ? (
        <div>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            className='block mb-2 p-2 border rounded'
          />
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            className='block mb-2 p-2 border rounded'
          />
          <input
            type='text'
            name='phone'
            value={formData.phone}
            onChange={handleInputChange}
            className='block mb-2 p-2 border rounded'
          />
          <button
            onClick={handleUpdateContact}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
          >
            Save
          </button>
          <button
            onClick={() => setEditMode(false)}
            className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h2 className='text-2xl font-bold mb-4'>{contact.name}</h2>
          <p className='mb-2'>Email: {contact.email}</p>
          <p className='mb-2'>Phone: {contact.phone}</p>
          <button
            onClick={() => setEditMode(true)}
            className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2'
          >
            Edit
          </button>
          <button
            onClick={handleDeleteContact}
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
