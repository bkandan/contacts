import React, { useState } from 'react';
import { useQuery, useAction } from 'wasp/client/operations';
import { getContacts, getLabels, createContact, deleteContact, uploadContacts } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const DashboardPage = () => {
  const { data: contacts, isLoading: contactsLoading, error: contactsError } = useQuery(getContacts);
  const { data: labels, isLoading: labelsLoading, error: labelsError } = useQuery(getLabels);
  const createContactFn = useAction(createContact);
  const deleteContactFn = useAction(deleteContact);
  const uploadContactsFn = useAction(uploadContacts);

  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });
  const [csvData, setCsvData] = useState('');

  if (contactsLoading || labelsLoading) return 'Loading...';
  if (contactsError) return 'Error loading contacts: ' + contactsError;
  if (labelsError) return 'Error loading labels: ' + labelsError;

  const handleCreateContact = () => {
    createContactFn(newContact);
    setNewContact({ name: '', email: '', phone: '' });
  };

  const handleUploadContacts = () => {
    uploadContactsFn({ csvData });
    setCsvData('');
  };

  return (
    <div className='p-4'>
      <div className='mb-4'>
        <h2 className='text-2xl font-bold mb-2'>Contacts</h2>
        <div className='flex gap-x-4 mb-4'>
          <input
            type='text'
            placeholder='Name'
            className='px-2 py-1 border rounded'
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
          />
          <input
            type='email'
            placeholder='Email'
            className='px-2 py-1 border rounded'
            value={newContact.email}
            onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
          />
          <input
            type='text'
            placeholder='Phone'
            className='px-2 py-1 border rounded'
            value={newContact.phone}
            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
          />
          <button
            onClick={handleCreateContact}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Add Contact
          </button>
        </div>
        <div className='flex gap-x-4 mb-4'>
          <textarea
            placeholder='CSV Data'
            className='px-2 py-1 border rounded w-full'
            value={csvData}
            onChange={(e) => setCsvData(e.target.value)}
          />
          <button
            onClick={handleUploadContacts}
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
          >
            Upload CSV
          </button>
        </div>
        {contacts.map((contact) => (
          <div key={contact.id} className='flex justify-between items-center bg-gray-100 p-2 mb-2 rounded'>
            <div>
              <Link to={`/contact/${contact.id}`} className='text-blue-500 hover:underline'>
                {contact.name}
              </Link> - {contact.email} - {contact.phone}
            </div>
            <div>
              <button
                onClick={() => deleteContactFn({ contactId: contact.id })}
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2 className='text-2xl font-bold mb-2'>Labels</h2>
        {labels.map((label) => (
          <div key={label.id} className='bg-slate-100 p-2 mb-2 rounded'>
            {label.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
