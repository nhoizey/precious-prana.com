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
