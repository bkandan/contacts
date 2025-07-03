import { HttpError } from 'wasp/server'

export const getContacts = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Contact.findMany({
    where: {
      userId: context.user.id
    }
  });
}

export const getContact = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const contact = await context.entities.Contact.findUnique({
    where: { id, userId: context.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true
    }
  });

  if (!contact) throw new HttpError(404, 'No contact with id ' + id);

  return contact;
}

export const getLabels = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const labels = await context.entities.Label.findMany({
    where: {
      contacts: {
        some: {
          userId: context.user.id
        }
      }
    }
  });

  return labels;
}
