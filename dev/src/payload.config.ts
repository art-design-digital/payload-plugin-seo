import { buildConfig } from 'payload/config'
import path from 'path'
import Users from './collections/Users'
import Examples from './collections/Examples'
import Media from './collections/Media'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'

// @ts-ignore - This file doesn't exist in the project, but it's fine for the example
import { seoPlugin } from '../../src/index'
import DemoGlobal from './globals/DemoGlobal'
import SomeCollection from './collections/SomeCollection'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: config => {
      const newConfig = {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...(config?.resolve?.alias || {}),
            react: path.join(__dirname, '../node_modules/react'),
            'react-dom': path.join(__dirname, '../node_modules/react-dom'),
            payload: path.join(__dirname, '../node_modules/payload'),
          },
        },
      }
      return newConfig
    },
  },
  editor: slateEditor({}),
  collections: [Examples, Users, Media, SomeCollection],
  globals: [DemoGlobal],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [
    // @ts-ignore - This file doesn't exist in the project, but it's fine for the example
    seoPlugin({
      enabled: true,
      collections: ['examples', 'some-collection'],
      generateSEOTitleFrom: 'someField',
      insertBefore: {
        globals: [
          {
            slug: 'demo-global',
            field: 'description',
          },
        ],
        collections: [
          {
            slug: 'examples',
            field: 'anotherField',
          },
          {
            slug: 'some-collection',
            field: 'niceField',
          },
        ],
      },
      mediaCollection: 'media',
      globals: ['demo-global'],
    }),
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),

  localization: {
    locales: [
      {
        code: 'en',
        label: 'English',
      },
      {
        code: 'de',
        label: 'Deutsch',
      },
      {
        code: 'fr',
        label: 'Français',
      },
    ],
    defaultLocale: 'de',
    fallback: true,
  },
})
