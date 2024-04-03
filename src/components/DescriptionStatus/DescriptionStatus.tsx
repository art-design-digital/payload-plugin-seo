'use client'

import React from 'react'

import { Label, useField } from 'payload/components/forms'
import { ProgressLabelSC } from './styles'

type DescriptionStatusProps = {
  htmlFor: string
  label: string
  required: boolean
}

const DescriptionStatus: React.FC<DescriptionStatusProps> = ({
  htmlFor,
  label,
  required,
}: DescriptionStatusProps) => {
  const { value, setValue }: { value: string; setValue: (value: string) => void } = useField({
    path: 'seoDescription',
  })

  const currentLength = value?.length || 0
  const currentLengthPercentage = Number(Math.round((currentLength / 160) * 100).toFixed(0))

  // if currentLength is between 50 and 60 characters, the bar is green
  // if currentLength is between 45 and 50 characters or 60 and 65 characters, the bar is yellow
  // if currentLength is less than 45 or more than 65 characters, the bar is red
  const fillColor =
    currentLength >= 155 && currentLength <= 160
      ? '#00b894'
      : currentLength >= 150 && currentLength <= 165
      ? '#f1c40f'
      : '#d63031'

  return (
    <ProgressLabelSC>
      <Label label={label} required={required} htmlFor={htmlFor} />
      <div className="progressWrapper">
        <div className="progressWrapper__inner">
          <span className="progressWrapper__text">{currentLength} von 155-160 Zeichen</span>
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

export default DescriptionStatus
