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
      .replace(/([0-9]{4}) (M[0-9]{2}) ([0-9]{2})/, "$3 $2 $1")
  });

  // ------------------------------------------------------------------------
  // Shortcodes
  // ------------------------------------------------------------------------

  function genericImage(image, cssClass, sizes) {
    let imageName = image.src.replace(/\.[^.]+$/, '');
    let imageExtension = image.src.replace(/^.*\.([^.]+)$/, '$1');
    return `<figure class="${cssClass}">
<img
src="${imageName}-360.${imageExtension}"
srcset="
${imageName}-360.${imageExtension} 360w,
${imageName}-480.${imageExtension} 480w,
${imageName}-640.${imageExtension} 640w,
${imageName}-800.${imageExtension} 800w,
${imageName}-1024.${imageExtension} 1024w"
sizes="${sizes}"
${image.alt ? `alt="${image.alt}"` : ''} />
<figcaption>
${image.caption ? `<p>${image.caption}</p>`: ''}
${image.zoom ? `<p class="zoom">&#128269;&nbsp;<a href="${image.src}" target="_blank">zoomer</a></p>`: ''}
</figcaption>
</figure>`;
  }

  eleventyConfig.addNunjucksShortcode('image', function(image) {
    return genericImage(image, 'fullwidth', '(min-width: 66rem) 60rem, 90vw');
  });

  eleventyConfig.addNunjucksShortcode('image_half', function(image) {
    return genericImage(image, 'halfwidth', '(min-width: 66rem) 30rem, (min-width: 40rem) 45vw, 90vw');
  });

  eleventyConfig.addNunjucksShortcode('poster', function(image) {
    return genericImage(image, 'poster', '(min-width: 66rem) 20rem, 30vw');
  });

  eleventyConfig.addPairedShortcode('note', function(content) {
    return `<div class="note">${content}</div>`;
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
      .use(markdownItContainer, 'info')
      .use(markdownItContainer, 'note')
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
