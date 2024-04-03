'use client'

import React from 'react'
import { GoDeviceDesktop, GoDeviceMobile } from 'react-icons/go'
import { getSiblingData, useAllFormFields } from 'payload/components/forms'
import { useTheme } from 'payload/components/utilities'
import TruncateMarkup from 'react-truncate-markup'

import { SEOPreviewSC } from './styles'

const SEOPreview: React.FC = () => {
  // get all form fields from the current form and get the data of the field with the key 'seoTitle'
  const [fields] = useAllFormFields()
  const siblingData = getSiblingData(fields, 'seoTitle')

  // get the current theme
  const { theme } = useTheme()

  // get siblingData.updatedAt which is in format like "2024-03-27T20:32:47.101Z"
  // and format it to "27.03.2024"
  const createdAt = new Date(siblingData.createdAt || new Date())
  const createdDay = String(createdAt.getDate()).padStart(2, '0')
  const createdMonth = String(createdAt.getMonth() + 1).padStart(2, '0')
  const createdYear = createdAt.getFullYear()
  const formattedCreatedAt = createdDay + '.' + createdMonth + '.' + createdYear

  // set the default mode to 'desktop' and create a state to change the mode
  const [mode, setMode] = React.useState('desktop')

  // create a state to store the image URL and errors
  const [imageURL, setImageURL] = React.useState<{ errors: boolean; data: string }>({
    errors: false,
    data: '',
  })

  /**
   * Function to get the image from the backend by the id of the image and set the imageURL state
   * @param {string} id - the id of the image
   * @returns {Promise<void>}
   */
  const getImage = React.useCallback(async (id: string) => {
    try {
      const res = await fetch(`${process.env.PAYLOAD_PUBLIC_BACKEND_URL}/api/media/${id}`)
      const image = await res.json()
      if (image.errors) {
        setImageURL({ errors: true, data: image?.errors[0].message })
      } else {
        setImageURL({ errors: false, data: image?.sizes?.seo?.url })
      }
    } catch (error) {
      setImageURL({
        errors: true,
        data: 'Server-Fehler ist aufgetreten. ENV-Datei checken oder später erneut probieren',
      })
    }
  }, [])

  // if the siblingData.meta.image changes, call the getImage function
  // if the siblingData.meta.image is unset, set the imageURL state to an empty string
  React.useEffect(() => {
    if (siblingData.seoImage) {
      getImage(siblingData.seoImage)
    } else {
      setImageURL({ errors: false, data: '' })
    }
  }, [siblingData.seoImage])

  return (
    <SEOPreviewSC $dark={theme == 'dark'}>
      <div className="actions">
        <button
          className={mode == 'desktop' ? 'active' : ''}
          type="button"
          onClick={() => setMode('desktop')}
        >
          <GoDeviceDesktop />
        </button>
        <button
          className={mode == 'mobile' ? 'active' : ''}
          type="button"
          onClick={() => setMode('mobile')}
        >
          <GoDeviceMobile />
        </button>
      </div>

      <div className={`content ${mode}`}>
        <div className="inner-body">
          <div className="left">
            <div className="header">
              <img
                className="favicon"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcBAMAAACAI8KnAAAAKlBMVEUTExMBAQErKyuDg4OdnZ3////c3NxERER0dHT09PS3t7eurq6+vr5nZ2feHuO4AAAAc0lEQVR4AWMgAzCi8pQFkXkioekCCJ7E1NDQhXC+eGooEBjC+JyhIBBWCFNsCuZHw6QFl4L5qLoRXEZhCBfOF0ORFZBC0euIzBU4ehCJK+gaisRl7AzF4GIqXggzWCgVyEXyscRGmRmCSMEhICuIFnakAwDByyXqkwRNSwAAAABJRU5ErkJggg=="
              />
              <div className="site">
                <span className="site-name">{process.env.PAYLOAD_PUBLIC_SITE_NAME}</span>
                <span className="site-url">
                  {process.env.PAYLOAD_PUBLIC_FRONTEND_URL} › eine › wirklich-tolle › url ...
                </span>
              </div>
            </div>

            <div className="seo-title">
              <TruncateMarkup lines={mode == 'desktop' ? 1 : 2}>
                <span>{siblingData.seoTitle || <em>Kein SEO-Titel vorhanden</em>}</span>
              </TruncateMarkup>
            </div>

            <div className="seo-description-wrapper">
              <div className="seo-description">
                <TruncateMarkup lines={mode == 'desktop' ? 2 : 4}>
                  <span>
                    <span className="date">{formattedCreatedAt} — </span>
                    {siblingData.seoDescription || (
                      <em>
                        Keine Meta-Beschreibung vorhanden. Bitte fügen Sie eine hinzu, um die
                        Klickrate dieser Seite zu erhöhen.
                      </em>
                    )}
                  </span>
                </TruncateMarkup>
              </div>

              {siblingData.seoImage && mode == 'mobile' && (
                <div className="seo-image-wrapper">
                  {imageURL?.errors ? (
                    <div className="seo-image-error">{imageURL.data}</div>
                  ) : (
                    <img src={imageURL.data} className="seo-image" />
                  )}
                </div>
              )}
            </div>
          </div>

          {siblingData.seoImage && mode == 'desktop' && (
            <div className="right">
              <div className="seo-image-wrapper">
                {imageURL?.errors ? (
                  <div className="seo-image-error">{imageURL.data}</div>
                ) : (
                  <img src={imageURL.data} className="seo-image" />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </SEOPreviewSC>
  )
}

export default SEOPreview
