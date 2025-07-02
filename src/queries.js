import { HttpError } from 'wasp/server'

export const getContacts = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Contact.findMany({
    where: {
      userId: context.user.id
    }
  });
}

export const getContact = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const contact = await context.entities.Contact.findUnique({
    where: { id }
  });

  if (!contact) throw new HttpError(404, 'No contact with id ' + id);
  if (contact.userId !== context.user.id) throw new HttpError(403, 'Contact does not belong to the authenticated user.');

  return contact;
}
