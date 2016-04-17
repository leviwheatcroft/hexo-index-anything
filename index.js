var _       = require('underscore')
var util    = require('util')
var S       = require('string').extendPrototype()
var path    = require('path')
var moment  = require('moment')

var Index

Index = function(index, path) {
  this.index = index
  this.path = path
  this.posts = {}
}
Index.prototype.push = function(post) {
  if (!_.has(post, this.index)) {
    return
  } else if (_.isArray(post[this.index])) {
    this.iterate(post[this.index], post)
  } else if (_.isString(post[this.index])) {
    this.iterate([post[this.index]], post)
  }
}
Index.prototype.iterate = function(keys, post) {
  _.each(keys, function(key) {
    key = key.slugify()
    this.check(key)
    this.posts[key].push(post)
  }, this)
}
Index.prototype.check = function(key) {
  if (!_.has(this.posts, key)) {
    this.posts[key] = []
  }
}
Index.prototype.getPath = function(key) {
  return path.join(this.path.slugify().toString(), key + '.html')
}
/**
 * return an array
 *
 * @return Object
 */
Index.prototype.getIndex = function() {
  var posts
  // generate an array to be used as `posts` in template
  return _.map(_.keys(this.posts), function(key) {
    return {
      title: key.humanize().titleCase(),
      date: moment(),
      path: this.getPath(key)
    }
  }, this)
}
/**
 * return an array of page objects representing
 *   - each of the keys belonging to this index
 *   - one index, listing all of those keys
 *
 * each of the key pages contains a list of all the posts containing that key
 *
 * @return Array
 */
Index.prototype.getPages = function() {
  this.posts.index = this.getIndex()
  return _.map(this.posts, function(posts, key) {
    // add handy methods for templates
    posts = _(posts)
    return {
      data: {
        title: 'Index for ' + key.humanize().titleCase(),
        date: moment(),
        posts: posts
      },
      path: this.getPath(key),
      layout: hexo.config.indexAnything.template || 'index'
    }
  }, this)
}

/**
 * register plugin
 */
hexo.extend.generator.register('indexAnything', function(locals) {
  var indexes = []
  var pages
  _.each(hexo.config.indexAnything, function(path, index) {
    indexes.push(new Index(index, path))
  })
  _.each(locals.posts.data, function(post) {
    _.each(indexes, function(index) {
      index.push(post)
    })
  })

  pages = _.reduce(indexes, function(memo, index) {
    return memo.concat(index.getPages())
  }, [])

  return pages

})
