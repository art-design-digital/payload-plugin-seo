import React from 'react'
import { GoDeviceDesktop, GoDeviceMobile } from 'react-icons/go'
import './styles.scss'
import { getSiblingData, useAllFormFields } from 'payload/components/forms'
import TruncateMarkup from 'react-truncate-markup'

const SEOPreview = () => {
  // Generate todays date in format dd.mm.yyyy
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = today.getFullYear()
  const formattedDate = dd + '.' + mm + '.' + yyyy

  const [fields] = useAllFormFields()
  const siblingData = getSiblingData(fields, 'seoTitle')

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
                    <span className="date">{formattedDate} — </span>
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
