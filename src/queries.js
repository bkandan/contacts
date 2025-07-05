import { HttpError } from 'wasp/server'

export const getContacts = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Contact.findMany({
    where: {
      userId: context.user.id
    }
  });
}

export const getLabels = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.Label.findMany({
    where: { userId: context.user.id }
  });
}
