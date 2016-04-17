# hexo-index-anything

[Hexo](https://hexo.io/) plugin to generate a indexes from custom front matter
variables. Suppose you have an `author` variable in your front matter, this
plugin will generate files like `/authors/author-name.html`, listing each post
by that author.

## Installation

```
  npm i --save hexo-index-anything
```

## Configuration

an example. would be included in `_config.yml`

```yaml
indexAnything:
  author: authors
```

## Usage

Install, configure, then `hexo generate` as usual.


