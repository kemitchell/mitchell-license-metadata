var assert = require('assert')
var data = require('./index.json')
var licenses = data.licenses
var tags = data.tags

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
})

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
})
