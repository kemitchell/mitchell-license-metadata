var data = require('./index.json')
var stringify = require('json-stable-stringify')
var fs = require('fs')

data.licenses.sort(function (a, b) {
  return a.id.toUpperCase().localeCompare(b.id.toUpperCase())
})

data.licenses.forEach(function (license) {
  if (license.tags) {
    license.tags.sort()
  }
  if (license.related) {
    license.related.sort()
  }
  if (license.projects) {
    license.projects.sort()
  }
})

Object.keys(data.tags).forEach(function (tag) {
  var value = data.tags[tag]
  if (value.related) {
    value.related.sort()
  }
})

fs.writeFileSync('./index.json', stringify(data, {space: 2}) + '\n')
