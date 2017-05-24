var assert = require('assert')
var data = require('./index.json')
var licenses = data.licenses
var tags = data.tags

var LICENSE_PROPERTIES = [
  'id', 'related', 'steward', 'tags', 'projects'
]

licenses.forEach(function (license) {
  license.tags.forEach(function (tag) {
    assert(
      tags.hasOwnProperty(tag),
      license.id + '\'s ' +
      '"' + tag + '"' +
      ' tag is not defined'
    )
  })
  if (license.steward) {
    assert.equal(
      typeof license.steward, 'string',
      '"' + license.id + '"\'s steward property ' +
      'is not a string'
    )
  }
  if (license.projects) {
    assert(
      Array.isArray(license.projects),
      '"' + license.id + '"\'s projects property ' +
      'is not an array'
    )
    license.projects.forEach(function (project) {
      assert.equal(
        typeof project, 'string',
        '"' + license.id + '"\'s project ' +
        'is not a string'
      )
    })
  }
  if (license.related) {
    assert(
      Array.isArray(license.related),
      '"' + license.id + '"\'s related property ' +
      'is not an array'
    )
    license.related.forEach(function (relatedLicense) {
      assert(
        licenses.some(function (otherLicense) {
          return relatedLicense === otherLicense.id
        }),
        '"' + license.id + '"\'s related license ' +
        '"' + relatedLicense + '" is not defined'
      )
      assert.notEqual(
        license.id, relatedLicense,
        '"' + license.id + '"\'s lists itself as ' +
        'a related license'
      )
    })
  }

  Object.keys(license).forEach(function (key) {
    assert(
      LICENSE_PROPERTIES.indexOf(key) !== -1,
      '"' + license.id + '" has extra property ' +
      '"' + key + '"'
    )
  })
})

var TAG_PROPERTIES = ['meaning', 'related']

Object.keys(tags).forEach(function (tag) {
  var data = tags[tag]
  assert.equal(
    typeof data.meaning, 'string',
    '"' + tag + '"' + ' missing meaning property'
  )
  if (data.related) {
    assert(
      Array.isArray(data.related),
      'related property is an array'
    )
    data.related.forEach(function (relatedTag) {
      assert(
        tags.hasOwnProperty(relatedTag),
        '"' + tag + '"\'s related tag ' +
        '"' + relatedTag + '" is not defined'
      )
    })
  }

  Object.keys(data).forEach(function (key) {
    assert(
      TAG_PROPERTIES.indexOf(key) !== -1,
      '"' + tag + '" has extra property ' +
      '"' + key + '"'
    )
  })
})
