import type { Config, Plugin } from 'payload/config'

import { defaultPluginOptions, PluginOptionsTypes } from './types'
import {
  CollapsibleField,
  Field,
  FieldHook,
  TextareaField,
  TextField,
} from 'payload/dist/exports/types'
import deepmerge from './utils/deepmerge'

type PluginType = (userPluginOptions: PluginOptionsTypes) => Plugin

export const seoPlugin =
  (userPluginOptions?: PluginOptionsTypes): Plugin =>
  incomingConfig => {
    const pluginOptions = deepmerge(defaultPluginOptions, userPluginOptions || {})

    let config = { ...incomingConfig }

    if (pluginOptions?.enabled === false) {
      return config
    }

    config.collections?.map(collection => {
      /**
       * If the collection is not included in the plugin options, return
       */
      const collectionIsIncluded = pluginOptions.collections?.includes(collection.slug)

      if (!collectionIsIncluded) {
        return
      }

      /**
       * Fields to add to the collection
       */
      const pluginFields: Field[] = [
        {
          type: 'collapsible',

          label: 'Meta-Daten & Suchmaschinenoptimierung',
          admin: {
            initCollapsed: true,
            description: {
              de: 'Hier können Sie die Meta-Daten für Suchmaschinenoptimierung bearbeiten. Diese Daten werden von Suchmaschinen wie Google verwendet, um Ihre Website zu indizieren.',
              en: 'Here you can edit the meta data for search engine optimization. This data is used by search engines like Google to index your website.',
            },
          },
          fields: [
            {
              type: 'text',
              name: 'seoTitle',
              label: {
                de: 'SEO-Titel',
                en: 'SEO Title',
              },
              admin: {
                description: {
                  de: 'Der SEO-Titel ist der Titel, der in den Suchergebnissen und auch im Browser-Tab angezeigt wird. Er sollte eine Länge von 50-60 Zeichen haben.',
                  en: 'The SEO title is the title that appears in the search results and also in the browser tab. It should be 50-60 characters long.',
                },
              },
              //required: true,
              hooks: {
                beforeValidate: [
                  ({ value, data }) => {
                    if (!value) {
                      const seoTitle = data && data[pluginOptions?.generateSEOTitleFrom!]
                      return seoTitle
                    }
                    return value
                  },
                ],
              },
            } as TextField,
            {
              type: 'textarea',
              name: 'seoDescription',
              label: 'SEO Description',
            } as TextareaField,
          ],
        },
      ]

      /**
       * Add the fields to the collection
       */
      collection.fields = [...collection.fields, ...pluginFields]
    })

    return config
  }
