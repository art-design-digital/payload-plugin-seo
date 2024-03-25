import type { Config, Plugin } from 'payload/config'

import { defaultPluginOptions, PluginOptionsTypes } from './types'
import {
  CollapsibleField,
  Field,
  TextareaField,
  TextField,
  UIField,
  UploadField,
} from 'payload/dist/exports/types'
import deepmerge from './utils/deepmerge'
import TitleStatus from './components/TitleStatus'
import DescriptionStatus from './components/DescriptionStatus'
import SEOPreview from './components/SEOPreview'
import { generateSEOTitle } from './hooks'

type PluginType = (userPluginOptions: PluginOptionsTypes) => Plugin

export const seoPlugin =
  (userPluginOptions?: PluginOptionsTypes): Plugin =>
  incomingConfig => {
    const pluginOptions = deepmerge(defaultPluginOptions, userPluginOptions || {})

    let config = { ...incomingConfig }

    // If the plugin is disabled, return the config as is
    if (pluginOptions?.enabled === false) {
      return config
    }

    // If the plugin is enabled, add the SEO fields to the collections
    const seoFields: CollapsibleField[] = [
      {
        type: 'collapsible',
        label: {
          de: 'Meta-Daten & Suchmaschinenoptimierung',
          en: 'Meta Data & Search Engine Optimization',
          fr: 'Méta-données et optimisation pour les moteurs de recherche',
          es: 'Metadatos y optimización para motores de búsqueda',
        },
        fields: [
          {
            type: 'ui',
            name: 'seoPreview',

            admin: {
              components: {
                Field: SEOPreview,
              },
            },
          } as UIField,
          {
            type: 'text',
            name: 'seoTitle',
            required: true,
            minLength: 10,
            localized: false,
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
                es: 'El título SEO es el título que aparece en los resultados de búsqueda y también en la pestaña del navegador.',
              },
              components: {
                Label: TitleStatus,
              },
            },
            hooks: {
              beforeValidate: [props => generateSEOTitle({ ...props, pluginOptions })],
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
            localized: true,
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
          {
            type: 'upload',
            name: 'seoImage',
            label: {
              de: 'SEO-Bild',
              en: 'SEO Image',
              fr: 'Image SEO',
            },
            relationTo: pluginOptions.mediaCollection,
            admin: {
              description: {
                de: 'Das SEO-Bild ist das Bild, das in den Suchergebnissen angezeigt wird oder wenn Ihre Seite geteilt wird. Es sollte 1200x630 Pixel groß sein.',
                en: 'The SEO image is the image that appears in the search results or when your page is shared. It should be 1200x630 pixels in size.',
                fr: "L'image SEO est l'image qui apparaît dans les résultats de recherche ou lorsque votre page est partagée. Elle doit mesurer 1200x630 pixels.",
              },
            },
          } as UploadField,
        ],
      },
    ]

    return {
      ...config,
      collections:
        config.collections?.map(collection => {
          // If the collection is not included in the plugin options, return the collection as is
          const collectionIsIncluded = pluginOptions.collections?.includes(collection.slug)
          if (!collectionIsIncluded) return collection

          // If the collection is included in the plugin options, add the SEO fields to the collection
          return {
            ...collection,
            fields: [...(collection?.fields || []), ...seoFields],
          }
        }) || [],
    }
  }
