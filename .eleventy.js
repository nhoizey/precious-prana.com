const { DateTime } = require('luxon');

module.exports = function(eleventyConfig) {

  // ------------------------------------------------------------------------
  // Filters
  // ------------------------------------------------------------------------

  eleventyConfig.addFilter('permalinkDate', function(date) {
    return DateTime.fromJSDate(date, {zone: 'Europe/Paris'}).toFormat('yyyy/LL/dd');
  });

  eleventyConfig.addFilter('displayDate', function(date) {
    return DateTime
      .fromJSDate(date, {zone: 'Europe/Paris'})
      .setLocale('fr')
      .toLocaleString(DateTime.DATE_FULL)
      .replace(/M01/, 'janvier')
      .replace(/M02/, 'février')
      .replace(/M03/, 'mars')
      .replace(/M04/, 'avril')
      .replace(/M05/, 'mai')
      .replace(/M06/, 'juin')
      .replace(/M07/, 'juillet')
      .replace(/M08/, 'août')
      .replace(/M09/, 'septembre')
      .replace(/M10/, 'octobre')
      .replace(/M11/, 'novembre')
      .replace(/M12/, 'décembre');
  });

  // ------------------------------------------------------------------------
  // Collections
  // ------------------------------------------------------------------------

  eleventyConfig.addCollection('navigation', function(collection) {
    return collection.getFilteredByTag('navigation').sort((a, b) => {
      return a.data.navorder - b.data.navorder;
    });
  });

  eleventyConfig.addCollection('evenements_futurs', function(collection) {
    return collection.getFilteredByTag('evenements').filter((evenement) => {
      return DateTime
        .fromJSDate(evenement.date, {zone: 'Europe/Paris'})
        .diffNow() >= 0;
    });
  });

  eleventyConfig.addCollection('evenements_passes', function(collection) {
    return collection.getFilteredByTag('evenements').filter((evenement) => {
      return DateTime
        .fromJSDate(evenement.date, {zone: 'Europe/Paris'})
        .diffNow() < 0;
    });
  });

  // ------------------------------------------------------------------------
  // Markdown
  // ------------------------------------------------------------------------

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
    level: [2,3,4],
    slugify: function(s) {
			return slugify(s);
    },
  }
  let markdownItContainer = require('markdown-it-container')
  eleventyConfig.setLibrary(
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
