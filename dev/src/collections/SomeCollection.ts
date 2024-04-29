import { CollectionConfig } from 'payload/types'

// Example Collection - For reference only, this must be added to payload.config.ts to be used.
const SomeCollection: CollectionConfig = {
  slug: 'some-collection',
  admin: {
    useAsTitle: 'someField',
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'niceField',
      type: 'text',
      localized: true,
    },
    {
      name: 'nicerField',
      type: 'text',
      localized: true,
    },
  ],
}

export default SomeCollection
