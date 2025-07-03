import React from 'react';
import { Link } from 'wasp/client/router';
import { useQuery } from 'wasp/client/operations';
import { getContacts, getLabels } from 'wasp/client/operations';

const DashboardPage = () => {
  const { data: contacts, isLoading: isLoadingContacts, error: contactsError } = useQuery(getContacts);
  const { data: labels, isLoading: isLoadingLabels, error: labelsError } = useQuery(getLabels);

  if (isLoadingContacts || isLoadingLabels) return 'Loading...';
  if (contactsError) return 'Error fetching contacts: ' + contactsError;
  if (labelsError) return 'Error fetching labels: ' + labelsError;

  return (
    <div className='p-4'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold mb-4'>Contacts</h2>
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
          >
            <div>{contact.name}</div>
            <div>{contact.email}</div>
            <div>
              <Link
                to={`/contact/${contact.id}`}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              >
                View
              </Link>
              <Link
                to={`/contact/edit/${contact.id}`}
                className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-2'
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
        <Link
          to="/contact/new"
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        >
          Add New Contact
        </Link>
      </div>
      <div>
        <h2 className='text-2xl font-bold mb-4'>Labels</h2>
        <div className='flex flex-wrap gap-2'>
          {labels.map((label) => (
            <span
              key={label.id}
              className='bg-purple-500 text-white py-1 px-3 rounded-full'
            >
              {label.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
