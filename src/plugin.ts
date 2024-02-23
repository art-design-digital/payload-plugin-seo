import type { Config, Plugin } from 'payload/config'

import type { PluginTypes } from './types'

type PluginType = (pluginOptions: PluginTypes) => Plugin

export const seoPlugin =
  (pluginOptions: PluginTypes): Plugin =>
  incomingConfig => {
    let config = { ...incomingConfig }

    if (pluginOptions.enabled === false) {
      return config
    }

    config.collections = [...(config.collections || [])]

    return config
  }
