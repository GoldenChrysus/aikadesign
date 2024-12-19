import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
    slug: 'media',
    labels: {
        plural: {
            en: 'Media',
            ja: 'メディア',
        },
        singular: {
            en: 'Media',
            ja: 'メディア',
        },
    },
    access: {
        read: () => true,
    },
    fields: [],
    upload: true,
}
