import React, { useState } from 'react';
import { useQuery, useAction, getContacts, createContact } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const DashboardPage = () => {
  const { data: contacts, isLoading, error } = useQuery(getContacts);
  const createContactFn = useAction(createContact);
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateContact = () => {
    if (newContact.name && newContact.email) {
      createContactFn(newContact);
      setNewContact({ name: '', email: '', phone: '' });
    }
  };

  return (
    <div className="p-4">
      <div className="flex gap-x-4 py-5">
        <input
          type="text"
          placeholder="Name"
          className="px-1 py-2 border rounded text-lg"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="px-1 py-2 border rounded text-lg"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          className="px-1 py-2 border rounded text-lg"
          value={newContact.phone}
          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
        />
        <button
          onClick={handleCreateContact}
          className="bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded"
        >
          Add Contact
        </button>
      </div>
      <div>
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="py-2 px-2 flex items-center justify-between bg-gray-100 hover:bg-slate-100 gap-x-2 rounded mb-4"
          >
            <div>
              <p className="text-lg font-semibold">{contact.name}</p>
              <p>{contact.email}</p>
              <p>{contact.phone}</p>
            </div>
            <Link
              to={`/contact/${contact.id}`}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
