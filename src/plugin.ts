import type { Config, Plugin } from 'payload/config'

import { defaultPluginOptions, PluginOptionsTypes } from './types'
import {
  CollapsibleField,
  CollectionConfig,
  Field,
  ImageSize,
  IncomingUploadType,
  RowField,
  SelectField,
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
                name: 'seoAllowFollowing',
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
          } as TextField,
          {
            type: 'row',
            fields: [
              {
                type: 'select',
                name: 'seoFrequency',
                label: {
                  de: 'Änderungshäufigkeit',
                  en: 'Change Frequency',
                  fr: 'Fréquence de changement',
                  es: 'Frecuencia de cambio',
                },
                admin: {
                  width: '50%',
                  description: {
                    de: 'Wählen Sie, wie häufig sich der Inhalt dieser Seite ändert.',
                    en: 'Choose how frequently the content of this page changes.',
                    fr: 'Choisissez à quelle fréquence le contenu de cette page change.',
                    es: 'Elija con qué frecuencia cambia el contenido de esta página.',
                  },
                },
                defaultValue: 'weekly',
                options: [
                  {
                    label: {
                      de: 'Immer',
                      en: 'Always',
                      fr: 'Toujours',
                      es: 'Siempre',
                    },
                    value: 'always',
                  },
                  {
                    label: {
                      de: 'Stündlich',
                      en: 'Hourly',
                      fr: 'Toutes les heures',
                      es: 'Por hora',
                    },
                    value: 'hourly',
                  },
                  {
                    label: {
                      de: 'Täglich',
                      en: 'Daily',
                      fr: 'Quotidien',
                      es: 'Diario',
                    },
                    value: 'daily',
                  },
                  {
                    label: {
                      de: 'Wöchentlich',
                      en: 'Weekly',
                      fr: 'Hebdomadaire',
                      es: 'Semanal',
                    },
                    value: 'weekly',
                  },
                  {
                    label: {
                      de: 'Monatlich',
                      en: 'Monthly',
                      fr: 'Mensuel',
                      es: 'Mensual',
                    },
                    value: 'monthly',
                  },
                  {
                    label: {
                      de: 'Jährlich',
                      en: 'Yearly',
                      fr: 'Annuel',
                      es: 'Anual',
                    },
                    value: 'yearly',
                  },
                  {
                    label: {
                      de: 'Nie',
                      en: 'Never',
                      fr: 'Jamais',
                      es: 'Nunca',
                    },
                    value: 'never',
                  },
                ],
              } as SelectField,
              {
                type: 'select',
                name: 'seoPriority',
                label: {
                  de: 'Priorität',
                  en: 'Priority',
                  fr: 'Priorité',
                  es: 'Prioridad',
                },
                admin: {
                  width: '50%',
                  description: {
                    de: 'Wählen Sie die Priorität dieser Seite im Vergleich zu anderen Seiten auf Ihrer Website.',
                    en: 'Choose the priority of this page compared to other pages on your site.',
                    fr: 'Choisissez la priorité de cette page par rapport aux autres pages de votre site.',
                    es: 'Elija la prioridad de esta página en comparación con otras páginas de su sitio.',
                  },
                },
                defaultValue: '0.5',
                options: [
                  {
                    label: {
                      de: '0.1 (Niedrigste Priorität)',
                      en: '0.1 (Lowest Priority)',
                      fr: '0.1 (Priorité la plus basse)',
                      es: '0.1 (Prioridad más baja)',
                    },
                    value: '0.1',
                  },
                  {
                    label: '0.2',
                    value: '0.2',
                  },
                  {
                    label: '0.3',
                    value: '0.3',
                  },
                  {
                    label: '0.4',
                    value: '0.4',
                  },
                  {
                    label: {
                      de: '0.5 (Standard)',
                      en: '0.5 (Default)',
                      fr: '0.5 (Défaut)',
                      es: '0.5 (Predeterminado)',
                    },
                    value: '0.5',
                  },
                  {
                    label: '0.6',
                    value: '0.6',
                  },
                  {
                    label: '0.7',
                    value: '0.7',
                  },
                  {
                    label: '0.8',
                    value: '0.8',
                  },
                  {
                    label: '0.9',
                    value: '0.9',
                  },
                  {
                    label: {
                      de: '1.0 (Höchste Priorität)',
                      en: '1.0 (Highest Priority)',
                      fr: '1.0 (Priorité la plus élevée)',
                      es: '1.0 (Prioridad más alta)',
                    },
                    value: '1.0',
                  },
                ],
              } as SelectField,
            ],
          } as RowField,
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

          // check if the collection slug is in the insertBefore collections and return value of the the prop 'field' if it is
          const insertBeforeField = pluginOptions.insertBefore?.collections?.find(
            (insertBeforeCollection: { slug: string; field: string }) =>
              insertBeforeCollection.slug === collection.slug,
          )?.field

          const someFieldIndex = collection.fields.findIndex(
            field => (field as any)['name'] === insertBeforeField || '',
          )

          const updatedCollection = {
            ...collection,
            fields: [...(collection?.fields || []), ...seoFields],
          }

          if (someFieldIndex > -1) {
            const fields = updatedCollection.fields
            const lastField = fields.pop()
            if (lastField) fields.splice(someFieldIndex, 0, lastField)
          }

          return updatedCollection
        }) || [],
      globals:
        config.globals?.map(global => {
          // If the global is not included in the plugin options, return the global as is
          const globalIsIncluded = pluginOptions.globals?.includes(global.slug)
          if (!globalIsIncluded) return global

          // check if the collection slug is in the insertBefore collections and return value of the the prop 'field' if it is
          const insertBeforeField = pluginOptions.insertBefore?.globals?.find(
            (insertBeforeCollection: { slug: string; field: string }) =>
              insertBeforeCollection.slug === global.slug,
          )?.field

          const someFieldIndex = global.fields.findIndex(
            field => (field as any)['name'] === insertBeforeField || '',
          )

          const updatedGlobal = {
            ...global,
            fields: [...(global?.fields || []), ...seoFields],
          }

          if (someFieldIndex > -1) {
            const fields = updatedGlobal.fields
            const lastField = fields.pop()
            if (lastField) fields.splice(someFieldIndex, 0, lastField)
          }

          return updatedGlobal
        }) || [],
    }
  }
