import React from 'react'
import { GoDeviceDesktop, GoDeviceMobile } from 'react-icons/go'
import './styles.scss'
import { getSiblingData, useAllFormFields } from 'payload/components/forms'

const SEOPreview = () => {
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
          <div className="">
            <div className="">
              <img
                className="favicon"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcBAMAAACAI8KnAAAAKlBMVEUTExMBAQErKyuDg4OdnZ3////c3NxERER0dHT09PS3t7eurq6+vr5nZ2feHuO4AAAAc0lEQVR4AWMgAzCi8pQFkXkioekCCJ7E1NDQhXC+eGooEBjC+JyhIBBWCFNsCuZHw6QFl4L5qLoRXEZhCBfOF0ORFZBC0euIzBU4ehCJK+gaisRl7AzF4GIqXggzWCgVyEXyscRGmRmCSMEhICuIFnakAwDByyXqkwRNSwAAAABJRU5ErkJggg=="
              />
              <div className="">
                <span className="">art&design.de</span>
                <span className="">https://www.art-design.de</span>
              </div>
            </div>

            <div className="">{siblingData.seoTitle}</div>
            <div className="">{siblingData.seoDescription}</div>
          </div>

          {siblingData.seoImage && <div className="">SEO-Image</div>}
        </div>
      </div>
    </div>
  )
}

export default SEOPreview
