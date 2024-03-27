import React from 'react'
import { GoDeviceDesktop, GoDeviceMobile } from 'react-icons/go'
import { getSiblingData, useAllFormFields } from 'payload/components/forms'
import TruncateMarkup from 'react-truncate-markup'

import './styles.scss'

const SEOPreview = () => {
  // get all form fields from the current form and get the data of the field with the key 'seoTitle'
  const [fields] = useAllFormFields()
  const siblingData = getSiblingData(fields, 'seoTitle')

  // get siblingData.updatedAt which is in format like "2024-03-27T20:32:47.101Z"
  // and format it to "27.03.2024"
  const createdAt = new Date(siblingData.createdAt)
  const createdDay = String(createdAt.getDate()).padStart(2, '0')
  const createdMonth = String(createdAt.getMonth() + 1).padStart(2, '0')
  const createdYear = createdAt.getFullYear()
  const formattedCreatedAt = createdDay + '.' + createdMonth + '.' + createdYear

  // set the default mode to 'desktop' and create a state to change the mode
  const [mode, setMode] = React.useState('desktop')

  return (
    <div className="seo-preview">
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
                <span className="site-name">beispiel.de</span>
                <span className="site-url">
                  https://www.beispiel.de › eine › wirklich-tolle › url ...
                </span>
              </div>
            </div>

            <div className="seo-title">
              <TruncateMarkup lines={mode == 'desktop' ? 1 : 2}>
                <span>{siblingData.seoTitle}</span>
              </TruncateMarkup>
            </div>

            <div className="seo-description-wrapper">
              <div className="seo-description">
                <TruncateMarkup lines={mode == 'desktop' ? 2 : 4}>
                  <span>
                    <span className="date">{formattedCreatedAt} — </span>
                    {siblingData.seoDescription}
                  </span>
                </TruncateMarkup>
              </div>

              {siblingData.seoImage && mode == 'mobile' && (
                <div className="seo-image-wrapper">
                  <img
                    src="https://images.pexels.com/photos/20669092/pexels-photo-20669092/free-photo-of-landschaft-natur-menschen-feld.jpeg"
                    className="seo-image"
                  />
                </div>
              )}
            </div>
          </div>

          {siblingData.seoImage && mode == 'desktop' && (
            <div className="right">
              <div className="seo-image-wrapper">
                <img
                  src="https://images.pexels.com/photos/20669092/pexels-photo-20669092/free-photo-of-landschaft-natur-menschen-feld.jpeg"
                  className="seo-image"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SEOPreview
