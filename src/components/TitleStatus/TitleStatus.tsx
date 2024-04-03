'use client'

import React from 'react'

import { Label, useField } from 'payload/components/forms'
import { ProgressLabelSC } from './styles'

type TitleStatusProps = {
  htmlFor: string
  label: string
  required: boolean
}

const TitleStatus: React.FC<TitleStatusProps> = ({
  htmlFor,
  label,
  required,
}: TitleStatusProps) => {
  const { value, setValue }: { value: string; setValue: (value: string) => void } = useField({
    path: 'seoTitle',
  })

  const currentLength = value?.length || 0
  const currentLengthPercentage = Number(Math.round((currentLength / 60) * 100).toFixed(0))

  // if currentLength is between 50 and 60 characters, the bar is green
  // if currentLength is between 45 and 50 characters or 60 and 65 characters, the bar is yellow
  // if currentLength is less than 45 or more than 65 characters, the bar is red
  const fillColor =
    currentLength >= 50 && currentLength <= 60
      ? '#00b894'
      : currentLength >= 45 && currentLength <= 65
      ? '#f1c40f'
      : '#d63031'

  //console.log(i18n.language)

  return (
    <ProgressLabelSC>
      <Label label={label} required={required} htmlFor={htmlFor} />
      <div className="progressWrapper">
        <div className="progressWrapper__inner">
          <span className="progressWrapper__text">{currentLength} von 50-60 Zeichen</span>
          <div className="progressWrapper__bar">
            <span
              className="progressWrapper__bar__fill"
              style={{
                width: `${currentLengthPercentage}%`,
                backgroundColor: fillColor,
              }}
            ></span>
          </div>
        </div>
      </div>
    </ProgressLabelSC>
  )
}

export default TitleStatus
