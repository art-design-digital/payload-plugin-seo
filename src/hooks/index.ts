import { FieldHookArgs } from 'payload/dist/exports/types'
import { PluginOptionsTypes } from '../types'

type GenerateSEOTitleProps = FieldHookArgs & {
  pluginOptions: PluginOptionsTypes
}

export const generateSEOTitle = (props: GenerateSEOTitleProps) => {
  console.log(props)
  if (!props.value) {
    const seoTitle = props.data && props.data[props.pluginOptions?.generateSEOTitleFrom!]
    return seoTitle
  }
  return props.value
}
