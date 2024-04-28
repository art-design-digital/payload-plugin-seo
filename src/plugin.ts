import type { Config, Plugin } from 'payload/config'

import { defaultPluginOptions, PluginOptionsTypes } from './types'
import {
  CollapsibleField,
  CollectionConfig,
  Field,
  ImageSize,
  IncomingUploadType,
  RowField,
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
        admin: {
          description: {
            de: 'Fügen Sie hier die Meta-Daten für die Suchmaschinenoptimierung hinzu. Über die Vorschau können Sie sehen, wie Ihre Seite in den Suchergebnissen aussehen kann.',
            en: 'Add the meta data for search engine optimization here. Use the preview to see how your page might appear in search results.',
            fr: "Ajoutez ici les métadonnées pour l'optimisation des moteurs de recherche. Utilisez l'aperçu pour voir comment votre page pourrait apparaître dans les résultats de recherche.",
            es: 'Agregue los metadatos para la optimización de motores de búsqueda aquí. Utilice la vista previa para ver cómo podría aparecer su página en los resultados de búsqueda.',
          },
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
            localized: true,
            label: {
              de: 'SEO-Titel',
              en: 'SEO Title',
              fr: 'Titre SEO',
              es: 'Título SEO',
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
              es: 'Descripción SEO',
            },
            minLength: 50,
            localized: true,
            required: true,
            admin: {
              description: {
                de: 'Die SEO-Beschreibung ist der Text, der in den Suchergebnissen unter dem Titel angezeigt wird. Sie sollte den Inhalt der Seite kurz und prägnant zusammenfassen.',
                en: 'The SEO description is the text that appears in the search results below the title. It should summarize the content of the page briefly and concisely.',
                fr: 'La description SEO est le texte qui apparaît dans les résultats de recherche sous le titre. Il devrait résumer brièvement et de manière concise le contenu de la page.',
                es: 'La descripción SEO es el texto que aparece en los resultados de búsqueda debajo del título. Debería resumir brevemente y de manera concisa el contenido de la página.',
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
              es: 'Imagen SEO',
            },
            relationTo: pluginOptions.mediaCollection,
            admin: {
              description: {
                de: 'Das SEO-Bild ist das Bild, das in den Suchergebnissen angezeigt wird oder wenn Ihre Seite geteilt wird. Es sollte 1200x630 Pixel groß sein, um alle Plattformen möglichst gut abzudecken.',
                en: 'The SEO image is the image that appears in the search results or when your page is shared. It should be 1200x630 pixels to cover all platforms as well as possible.',
                fr: "L'image SEO est l'image qui apparaît dans les résultats de recherche ou lorsque votre page est partagée. Elle devrait faire 1200x630 pixels pour couvrir toutes les plateformes aussi bien que possible.",
                es: 'La imagen SEO es la imagen que aparece en los resultados de búsqueda o cuando se comparte su página. Debería tener 1200x630 píxeles para cubrir todas las plataformas lo mejor posible.',
              },
            },
          } as UploadField,
          {
            type: 'row',
            fields: [
              {
                type: 'select',
                name: 'seoAllowIndexing',
                label: {
                  de: 'Indexierung erlauben',
                  en: 'Allow Indexing',
                  fr: "Autoriser l'indexation",
                  es: 'Permitir indexación',
                },
                admin: {
                  style: {
                    width: '50%',
                  },
                  description: {
                    de: 'Wählen Sie, ob Suchmaschinen diese Seite indexieren dürfen oder nicht.',
                    en: 'Choose whether search engines should be allowed to index this page or not.',
                    fr: 'Choisissez si les moteurs de recherche doivent être autorisés à indexer cette page ou non.',
                    es: 'Elija si los motores de búsqueda deben tener permiso para indexar esta página o no.',
                  },
                },
                defaultValue: 'index',
                options: [
                  {
                    label: {
                      de: 'Ja',
                      en: 'Yes',
                      fr: 'Oui',
                      es: 'Sí',
                    },
                    value: 'index',
                  },
                  {
                    label: { de: 'Nein', en: 'No', fr: 'Non', es: 'No' },
                    value: 'noindex',
                  },
                ],
              },
              {
                type: 'select',
                name: 'seoAllowFollwing',
                label: {
                  de: 'Links folgen erlauben',
                  en: 'Allow Following Links',
                  fr: 'Autoriser le suivi des liens',
                  es: 'Permitir seguir enlaces',
                },
                admin: {
                  style: {
                    width: '50%',
                  },
                  description: {
                    de: 'Wählen Sie, ob Suchmaschinen den Links auf dieser Seite folgen dürfen oder nicht.',
                    en: 'Choose whether search engines should be allowed to follow the links on this page or not.',
                    fr: 'Choisissez si les moteurs de recherche doivent être autorisés à suivre les liens de cette page ou non.',
                    es: 'Elija si los motores de búsqueda deben tener permiso para seguir los enlaces de esta página o no.',
                  },
                },
                defaultValue: 'follow',
                options: [
                  {
                    label: {
                      de: 'Ja',
                      en: 'Yes',
                      fr: 'Oui',
                      es: 'Sí',
                    },
                    value: 'follow',
                  },
                  {
                    label: { de: 'Nein', en: 'No', fr: 'Non', es: 'No' },
                    value: 'nofollow',
                  },
                ],
              },
            ],
          } as RowField,
          {
            type: 'text',
            name: 'seoAdditionalRobotsTags',
            label: {
              de: 'Zusätzliche Robots-Tags',
              en: 'Additional Robots Tags',
              fr: 'Balises Robots supplémentaires',
              es: 'Etiquetas Robots Adicionales',
            },
            admin: {
              description: {
                de: 'Fügen Sie hier zusätzliche Robots-Tags hinzu, die Suchmaschinen beim Crawlen dieser Seite beachten sollen. Zum Beispiel: noarchive, nosnippet, notranslate, etc.',
                en: 'Add additional robots tags here that search engines should consider when crawling this page. For example: noarchive, nosnippet, notranslate, etc.',
                fr: 'Ajoutez ici des balises robots supplémentaires que les moteurs de recherche doivent prendre en compte lors du crawl de cette page. Par exemple: noarchive, nosnippet, notranslate, etc.',
                es: 'Agregue etiquetas robots adicionales aquí que los motores de búsqueda deben considerar al rastrear esta página. Por ejemplo: noarchive, nosnippet, notranslate, etc.',
              },
            },
          },
        ],
      },
    ]

    // Define the SEO image size if the plugin is enabled
    const seoImageSize: ImageSize = { name: 'seo', width: 1200, height: 630, position: 'centre' }

    return {
      ...config,
      collections:
        config.collections?.map(collection => {
          // If the collection is the media collection, add the SEO image size to the collection
          if (collection.slug === pluginOptions.mediaCollection) {
            const updatedImageSizes: ImageSize[] = [
              ...((collection?.upload as IncomingUploadType)?.imageSizes || []),
              ...[seoImageSize],
            ]

            // Return the collection with the updated image sizes
            return {
              ...collection,
              upload:
                {
                  ...((collection?.upload || {}) as object),
                  imageSizes: updatedImageSizes,
                } || false,
            }
          }

          // If the collection is not included in the plugin options, return the collection as is
          const collectionIsIncluded = pluginOptions.collections?.includes(collection.slug)
          if (!collectionIsIncluded) return collection

          // If the collection is included in the plugin options, add the SEO fields to the collection
          return {
            ...collection,
            fields: [...(collection?.fields || []), ...seoFields],
          }
        }) || [],
      globals:
        config.globals?.map(global => {
          // If the global is not included in the plugin options, return the global as is
          const globalIsIncluded = pluginOptions.globals?.includes(global.slug)
          if (!globalIsIncluded) return global

          // If the global is included in the plugin options, add the SEO fields to the global
          return {
            ...global,
            fields: [...(global?.fields || []), ...seoFields],
          }
        }) || [],
    }
  }
