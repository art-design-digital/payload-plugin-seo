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
import TitleStatus from './components/TitleStatus'
import DescriptionStatus from './components/DescriptionStatus'

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
          label: {
            de: 'Meta-Daten & Suchmaschinenoptimierung',
            en: 'Meta Data & Search Engine Optimization',
            fr: 'Méta-données et optimisation pour les moteurs de recherche',
          },
          admin: {
            initCollapsed: false,
            description: {
              de: 'Hier können Sie die Meta-Daten für Suchmaschinenoptimierung bearbeiten. Diese Daten werden von Suchmaschinen wie Google verwendet, um Ihre Website zu indizieren.',
              en: 'Here you can edit the meta data for search engine optimization. This data is used by search engines like Google to index your website.',
              fr: "Ici, vous pouvez modifier les métadonnées pour l'optimisation des moteurs de recherche. Ces données sont utilisées par les moteurs de recherche comme Google pour indexer votre site Web.",
            },
          },
          fields: [
            {
              type: 'text',
              name: 'seoTitle',
              required: true,
              minLength: 10,
              label: {
                de: 'SEO-Titel',
                en: 'SEO Title',
                fr: 'Titre SEO',
              },
              admin: {
                description: {
                  de: 'Der SEO-Titel ist der Titel, der in den Suchergebnissen und auch im Browser-Tab angezeigt wird.',
                  en: 'The SEO title is the title that appears in the search results and also in the browser tab.',
                  fr: "Le titre SEO est le titre qui apparaît dans les résultats de recherche et également dans l'onglet du navigateur.",
                },
                components: {
                  afterInput: [TitleStatus],
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
              label: {
                de: 'SEO-Beschreibung',
                en: 'SEO Description',
                fr: 'Description SEO',
              },
              minLength: 50,
              required: true,
              admin: {
                description: {
                  de: 'Die SEO-Beschreibung ist der Text, der in den Suchergebnissen unter dem Titel angezeigt wird. Sie sollte den Inhalt der Seite kurz und prägnant zusammenfassen.',
                  en: 'The SEO description is the text that appears in the search results below the title. It should summarize the content of the page briefly and concisely.',
                  fr: 'La description SEO est le texte qui apparaît dans les résultats de recherche sous le titre. Il devrait résumer brièvement et de manière concise le contenu de la page.',
                },
                components: {
                  Label: DescriptionStatus,
                },
              },
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
