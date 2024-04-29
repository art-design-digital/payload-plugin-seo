# Payload SEO-Plugin
This plugin implements some important SEO features for PayloadCMS.

It adds desired collections and globals fields that can be filled to provide various SEO metadata. It also supports editors in maintaining SEO data by requiring some fields as mandatory data and generating previews for the search results.

## Fields and functions in detail

### Preview
This field automatically generates a preview of how this page may appear in search results from the data provided. It has an option to switch between mobile and desktop previews. So the editor can see how the result looks for both breakpoints.


![Screenshot Preview mobile](/src/assets/09.jpg?raw=true) ![Screenshot Preview](/src/assets/00.jpg?raw=true)


### Title

![Screenshot Title](/src/assets/01.jpg?raw=true)

### Description

![Screenshot Description](/src/assets/02.jpg?raw=true)

### Picture

![Screenshot Picture](/src/assets/03.jpg?raw=true)

### Allow indexing

![Screenshot Indexing](/src/assets/04.jpg?raw=true)

### Allow following links

![Screenshot Following](/src/assets/05.jpg?raw=true)

### Additional Robots tags

![Screenshot Robots](/src/assets/06.jpg?raw=true)

### Change frequency

![Screenshot Frequency](/src/assets/07.jpg?raw=true)

### Priority

![Screenshot Priority](/src/assets/08.jpg?raw=true)

# Installation and usage of the plugin

## Installation
The plugin is an official npm library that can be installed via

```
npm install @art-design-digital/payload-plugin-seo
```
or via
```
yarn add @art-design-digital/payload-plugin-seo
```

## Usage
The plugin is a plugin for PayloadCMS and so it can be installed by adding it to the plugins array in the ``payload.config.ts``

The plugin works by adding no parameters (even no empty object) but it is disabled in using it this way. You have to set at least the props object with the ``enabled`` property to enable it.

```javascript
plugins: [
  seoPlugin({
    enabled: true
  })
]
```
Here is the list of all available parameters that can be set in the plugin.

| **Name** | **Description** | **Type** | **Default** |
|-|-|-|-|
| enabled | Switches the whole plugin on or off. | boolean  | false |
| collections | Array of slugs that defines in which collections the plugin shall be used. | string[] | [] |
| globals | Array of slugs that defines in which globals the plugin shall be used. | string[] | [] |
| mediaCollection | Tell the plugin which collection shall be used for uploading a photo for a team member. | string | 'media' |
| generateSEOTitleFrom | Define the field from which the SEO-Title shall be generated from when clicking on ``Save``. | string | '' |
| insertBefore | Define on which position the field should be rendered in a specific global or collection. If nothing is set here the fields are appended. | ```{collections: [{slug: string, field: string}], globals: [{slug: string, field: string}]}``` | {} |

In this example you can see a full working configuration for a demo project.

```javascript
seoPlugin({
  enabled: true,
  collections: ['examples', 'some-collection'],
  globals: ['demo-global'],
  mediaCollection: 'media',
  generateSEOTitleFrom: 'someField',
  insertBefore: {
    globals: [
      {
        slug: 'demo-global',
        field: 'description',
      },
    ],
    collections: [
      {
        slug: 'examples',
        field: 'anotherField',
      },
      {
        slug: 'some-collection',
        field: 'niceField',
      },
    ],
  },
})
```


# TODO's
- [x] Custom position of the seo fields
- [x] Add meta fields for robots.txt and headers
- [ ] Translations
- [ ] Choose if seo fields are rendered in tabs or as collapsible
- [ ] Precise field choice for the generateTitleFrom function
- [ ] Add static appended parts of the SEO-Title if set and include this in calculating the length indicator

# Questions
Please contact [art&design digital](mailto:info@ad-digtial.de) with any questions about using this plugin.
