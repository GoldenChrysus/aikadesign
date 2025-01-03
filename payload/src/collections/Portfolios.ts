import { lexicalEditor, HTMLConverterFeature, lexicalHTML } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Portfolios: CollectionConfig = {
  slug: 'portfolios',
  labels: {
    plural: {
      en: 'Portfolios',
      ja: 'ポートフォリオ',
    },
    singular: {
      en: 'Portfolio',
      ja: 'ポートフォリオ',
    },
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: {
        en: 'Name',
        ja: '名前'
      },
      type: 'text',
      required: true,
    },
    {
      name: 'entry',
      label: {
        en: 'Entries',
        ja: 'アイテム',
      },
      labels: {
        plural: {
          en: 'Entries',
          ja: 'アイテム',
        },
        singular: {
          en: 'Entry',
          ja: 'アイテム',
        }
      },
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          label: {
            en: 'Title',
            ja: 'タイトル'
          },
          type: 'text',
          required: true,
        },
        {
          name: 'info',
          label: {
            en: 'Info',
            ja: '情報'
          },
          type: 'richText',
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
              HTMLConverterFeature({}),
            ],
          }),
          required: true,
        },
        {
          name: 'image',
          label: {
            en: 'Image',
            ja: '画像'
          },
          type: 'upload',
          required: true,
          relationTo: 'media',
        },
        lexicalHTML('info', { name: 'info_html' }),
      ],
    }
  ],
}
