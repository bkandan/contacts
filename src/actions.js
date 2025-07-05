import { HttpError } from 'wasp/server';
import { parseCsv } from '@src/utils/csvParser';

export const createContact = async ({ name, email, phone }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const newContact = await context.entities.Contact.create({
    data: {
      name,
      email,
      phone,
      user: { connect: { id: context.user.id } }
    }
  });

  return newContact;
}

export const updateContact = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const contact = await context.entities.Contact.findUnique({
    where: { id: args.id }
  });
  if (contact.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Contact.update({
    where: { id: args.id },
    data: args.updatedFields
  });
}

export const deleteContact = async ({ contactId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const contact = await context.entities.Contact.findUnique({
    where: { id: contactId }
  });
  if (contact.userId !== context.user.id) { throw new HttpError(403) };

  await context.entities.Contact.delete({
    where: { id: contactId }
  });

  return contactId;
}

export const uploadContacts = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { csvData } = args;
  const contacts = parseCsv(csvData);

  const createdContacts = [];
  for (const contact of contacts) {
    const newContact = await context.entities.Contact.create({
      data: {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        user: { connect: { id: context.user.id } }
      }
    });
    createdContacts.push(newContact);
  }

  return createdContacts;
};
