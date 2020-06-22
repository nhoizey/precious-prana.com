const { DateTime } = require("luxon");
const cleanCSS = require("clean-css");
const slugify = require("@sindresorhus/slugify");
const util = require('util');
const path = require('path');

const excerpt = require("./src/_filters/excerpt.js");
const future = require("./src/_filters/future.js");
const permalinkDate = require("./src/_filters/permalink-date.js");
const plainDate = require("./src/_filters/plain-date.js");

module.exports = function (eleventyConfig) {

  // ------------------------------------------------------------------------
  // Filters
  // ------------------------------------------------------------------------

  eleventyConfig.addFilter("excerpt", excerpt);
  eleventyConfig.addFilter("future", future);
  eleventyConfig.addFilter("permalinkDate", permalinkDate);
  eleventyConfig.addFilter("plainDate", plainDate);
  eleventyConfig.addFilter("dump", obj => util.inspect(obj));

  eleventyConfig.addFilter("slugify", function (string) {
    return slugify(string, {
      decamelize: false,
      customReplacements: [
        ['%', ' ']
      ]
    });
  });

  eleventyConfig.addFilter("dirname", function (filePath) {
    return path.dirname(filePath);
  });


  // https://www.11ty.io/docs/quicktips/inline-css/
  eleventyConfig.addFilter("cssmin", code => {
    return new cleanCSS({}).minify(code).styles;
  });

  // ------------------------------------------------------------------------
  // Shortcodes
  // ------------------------------------------------------------------------

  eleventyConfig.addPairedNunjucksShortcode("gallery", function (images) {
    return `<div class="gallery">${images}</div>`;
  });

  eleventyConfig.addNunjucksShortcode("youtube", function (id) {
    return `<figure class="video"><iframe width="784" height="441" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></figure>`;
  });

  eleventyConfig.addPairedShortcode("note", function (content) {
    return `<div class="note">${content}</div>`;
  });

  const getShareImage = require('@jlengstorf/get-share-image').default;
  eleventyConfig.addNunjucksShortcode('ogImage', (title, tagline) => {
    return title ? getShareImage({
      imageWidth: 1200,
      imageHeight: 630,
      cloudName: 'nho',
      imagePublicID: 'resources/precious-prana-opengraph-background',
      version: 'v1578868816',
      textAreaWidth: 1000,
      textLeftOffset: 100,
      textColor: '479b10',

      titleFont: 'Dosis',
      titleBottomOffset: 270,
      titleFontSize: 70,
      title: title,

      taglineFont: 'Dosis',
      taglineTopOffset: 400,
      taglineFontSize: 40,
      tagline: tagline
    }) : '';
  });


  // ------------------------------------------------------------------------
  // Collections
  // ------------------------------------------------------------------------

  eleventyConfig.addCollection("navigation", function (collection) {
    return collection.getFilteredByTag("navigation").sort((a, b) => {
      return a.data.navorder - b.data.navorder;
    });
  });

  eleventyConfig.addCollection("ateliers", function (collection) {
    return collection.getFilteredByTag("ateliers")
      .filter(item => {
        return process.env.ELEVENTY_ENV === 'development' || item.data.published || item.data.published === undefined;
      })
      .sort((a, b) => {
        return a.data.title.localeCompare(b.data.title);
      });
  });

  eleventyConfig.addCollection("lieux", function (collection) {
    return collection.getFilteredByTag("lieux")
      .filter(item => {
        return process.env.ELEVENTY_ENV === 'development' || item.data.published || item.data.published === undefined;
      })
      .sort((a, b) => {
        return a.data.title.localeCompare(b.data.title);
      });
  });

  eleventyConfig.addCollection("agenda_futur", function (collection) {
    return collection.getFilteredByTag("agenda")
      .filter(evenement => {
        eventDiff = DateTime.fromJSDate(evenement.date, {
          zone: "Europe/Paris"
        })
          .diffNow("hours")
          .toObject().hours;
        return (
          eventDiff >= -24 && (process.env.ELEVENTY_ENV === 'development' || evenement.data.published === undefined || evenement.data.published)
        );
      });
  });

  eleventyConfig.addCollection("agenda_futur_homepage", function (collection) {
    return collection.getFilteredByTag("agenda")
      .filter(evenement => {
        eventDiff = DateTime.fromJSDate(evenement.date, {
          zone: "Europe/Paris"
        })
          .diffNow("hours")
          .toObject().hours;
        return (
          (evenement.data.show_homepage === undefined ||
            evenement.data.show_homepage) &&
          eventDiff >= -24 && (process.env.ELEVENTY_ENV === 'development' || evenement.data.published === undefined || evenement.data.published)
        );
      });
  });

  eleventyConfig.addCollection("agenda_passe", function (collection) {
    return collection.getFilteredByTag("agenda")
      .filter(evenement => {
        eventDiff = DateTime.fromJSDate(evenement.date, {
          zone: "Europe/Paris"
        })
          .diffNow("hours")
          .toObject().hours;
        return eventDiff < -24 && (process.env.ELEVENTY_ENV === 'development' || evenement.data.published || evenement.data.published === undefined)
      });
  });

  eleventyConfig.addCollection("blog", function (collection) {
    return collection.getFilteredByTag("blog")
      .filter(item => {
        return process.env.ELEVENTY_ENV === 'development' || item.data.published || item.data.published === undefined;
      });
  });

  eleventyConfig.addCollection("interviews", function (collection) {
    return collection.getFilteredByTag("interviews")
      .filter(item => {
        return process.env.ELEVENTY_ENV === 'development' || item.data.published || item.data.published === undefined;
      });
  });

  // ------------------------------------------------------------------------
  // Transforms
  // ------------------------------------------------------------------------

  const cloudinaryTransform = require("./src/_transforms/cloudinary-transform.js");
  eleventyConfig.addTransform("cloudinary", cloudinaryTransform);

  // ------------------------------------------------------------------------
  // Markdown
  // ------------------------------------------------------------------------

  let markdownIt = require("markdown-it");
  let markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true
  };
  let markdownItAnchor = require("markdown-it-anchor");
  let markdownItAnchorOptions = {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#",
    level: [2, 3, 4],
    slugify: function (s) {
      return slugify(s);
    }
  };
  let markdownItAttributes = require("markdown-it-attrs");
  let markdownItContainer = require("markdown-it-container");
  const md = markdownIt(markdownItOptions)
    .use(markdownItAnchor, markdownItAnchorOptions)
    .use(markdownItAttributes)
    .use(markdownItContainer, "info")
    .use(markdownItContainer, "note");

  eleventyConfig.setLibrary("md", md);

  eleventyConfig
    .addPassthroughCopy("src/files")
    .addPassthroughCopy("src/admin")
    .addPassthroughCopy("src/fonts")
    .addPassthroughCopy("src/images")
    .addPassthroughCopy("src/_redirects")
    .addPassthroughCopy("src/robots")
    .addPassthroughCopy("src/favicon.ico");

  /* Forestry instant previews */
  if (process.env.ELEVENTY_ENV == "staging") {
    eleventyConfig.setBrowserSyncConfig({
      host: "0.0.0.0"
    });
  }

  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes"
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
