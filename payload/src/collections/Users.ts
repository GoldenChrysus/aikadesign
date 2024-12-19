import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    plural: {
      en: 'Users',
      ja: 'ユーザー',
    },
    singular: {
      en: 'User',
      ja: 'ユーザー',
    },
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
