import { FieldHookArgs } from 'payload/dist/exports/types'
import { PluginOptionsTypes } from '../types'

/**
 * Props for the generateSEOTitle hook
 * @typedef GenerateSEOTitleProps
 */
type GenerateSEOTitleProps = FieldHookArgs & {
  pluginOptions: PluginOptionsTypes
}

/**
 * Generates the SEO title based on the value or the data
 * @param props
 * @returns
 */
export const generateSEOTitle = (props: GenerateSEOTitleProps) => {
  if (!props.value) {
    const seoTitle = props.data && props.data[props.pluginOptions?.generateSEOTitleFrom!]
    return seoTitle
  }
  return props.value
}
