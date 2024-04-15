import { GlobalConfig } from 'payload/types'

const DemoGlobal: GlobalConfig = {
  slug: 'demo-global',
  access: {
    read: ({ req }) => req.user,
    update: ({ req }) => req.user,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
  ],
}

export default DemoGlobal
