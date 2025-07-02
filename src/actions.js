import { HttpError } from 'wasp/server'

export const createContact = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { name, email, phone } = args;

  const newContact = await context.entities.Contact.create({
    data: {
      name,
      email,
      phone,
      userId: context.user.id
    }
  });

  return newContact;
}

export const uploadContacts = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { file } = args;

  // Assuming file is a JSON array of contacts.
  let contacts;
  try {
    contacts = JSON.parse(file);
  } catch (error) {
    throw new HttpError(400, 'Invalid file format');
  }

  const createdContacts = [];

  for (const contact of contacts) {
    const { name, email, phone } = contact;

    if (!name || !email) {
      continue; // Skip invalid entries.
    }

    const newContact = await context.entities.Contact.create({
      data: {
        name,
        email,
        phone,
        userId: context.user.id
      }
    });

    createdContacts.push(newContact);
  }

  return createdContacts;
}
