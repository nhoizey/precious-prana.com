module.exports = function(config) {
  // Add a date formatter filter to Nunjucks
  config.addFilter('dateDisplay', require('./filters/dates.js'));
  config.addFilter('timestamp', require('./filters/timestamp.js'));
  config.addFilter('squash', require('./filters/squash.js'));

  config.addCollection("navigation", function(collection) {
    return collection.getFilteredByTag("navigation").sort((a, b) => {
      return a.data.navorder - b.data.navorder;
    });
  });

  /* Markdown */
  let markdownIt = require('markdown-it')
  let markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true,
  }
  let markdownItAnchor = require('markdown-it-anchor')
  let slugify = require('@sindresorhus/slugify')
  let markdownItAnchorOptions = {
    permalink: true,
    permalinkClass: 'direct-link',
    permalinkSymbol: '#',
    slugify: function(s) {
			return slugify(s);
    },
  }
  let markdownItContainer = require('markdown-it-container')
  config.setLibrary(
    'md',
    markdownIt(markdownItOptions)
      .use(markdownItAnchor, markdownItAnchorOptions)
      .use(markdownItContainer, 'warning')
      .use(markdownItContainer, 'info')
  )
  
  return {
    dir: {
      input: 'src/site',
      output: 'dist',
      includes: '_includes',
    },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
