import React, { useState, useEffect } from 'react';
import { useParams } from 'wasp/client/router';
import { useQuery, useAction, getContact, updateContact } from 'wasp/client/operations';

const ContactPage = () => {
  const { contactId } = useParams();
  const { data: contact, isLoading, error } = useQuery(getContact, { id: contactId });
  const updateContactFn = useAction(updateContact);

  const [editableContact, setEditableContact] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    if (contact) {
      setEditableContact({ name: contact.name, email: contact.email, phone: contact.phone });
    }
  }, [contact]);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableContact({ ...editableContact, [name]: value });
  };

  const handleUpdateContact = () => {
    updateContactFn({ id: contactId, ...editableContact });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Contact Details</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={editableContact.name}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={editableContact.email}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone</label>
        <input
          type="text"
          name="phone"
          value={editableContact.phone}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        onClick={handleUpdateContact}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Save Changes
      </button>
    </div>
  );
};

export default ContactPage;
