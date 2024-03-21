/**
 * Default options for the plugin
 *
 * @type {PluginOptionsTypes}
 * @property {boolean} enabled - Enable or disable plugin
 * @property {string[]} collections - Collections to apply the plugin to
 */
export const defaultPluginOptions: PluginOptionsTypes = {
  /**
   * Enable or disable plugin
   * @default false
   */
  enabled: false,

  /**
   * Collections to apply the plugin to
   * @default []
   */
  collections: [],

  /**
   * Generate title from field
   * @default 'title'
   */
  generateSEOTitleFrom: 'title',
}

export interface PluginOptionsTypes {
  /**
   * Enable or disable plugin
   * @default false
   */
  enabled?: boolean

  /**
   * Collections to apply the plugin to
   * @default []
   */
  collections: string[]

  /**
   * Generate title from field
   * @default 'title'
   */
  generateSEOTitleFrom: string
}

export interface NewCollectionTypes {}
