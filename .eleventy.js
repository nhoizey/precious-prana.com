const { DateTime } = require("luxon");
const cleanCSS = require("clean-css");

const plainDate = require("./src/_filters/plain-date.js");
const permalinkDate = require("./src/_filters/permalink-date.js");
const future = require("./src/_filters/future.js");

module.exports = function(eleventyConfig) {
  // ------------------------------------------------------------------------
  // Filters
  // ------------------------------------------------------------------------

  eleventyConfig.addFilter("plainDate", plainDate);
  eleventyConfig.addFilter("permalinkDate", permalinkDate);
  eleventyConfig.addFilter("future", future);

  // https://www.11ty.io/docs/quicktips/inline-css/
  eleventyConfig.addFilter("cssmin", function(code) {
    return new cleanCSS({}).minify(code).styles;
  });

  // ------------------------------------------------------------------------
  // Shortcodes
  // ------------------------------------------------------------------------

  function genericImage(image, cssClass, sizes) {
    const cloudinaryPrefix =
      "https://res.cloudinary.com/nho/image/fetch/c_fill,f_auto,q_auto,";
    let imageUrl = "https://precious-prana.com" + image.src;

    let html = `<figure class="${cssClass}" `;
    if (image.width && image.height) {
      html += `style="max-width: ${
        image.width
      }px; --aspect-ratio: ${image.width / image.height}"`;
    }
    html += `>
<img
  src="${cloudinaryPrefix}w_360/${imageUrl}"
  srcset="${cloudinaryPrefix}w_360/${imageUrl} 360w`;
    if (!image.width || image.width >= 480) {
      html += `, ${cloudinaryPrefix}w_480/${imageUrl} 480w`;
    }
    if (!image.width || image.width >= 640) {
      html += `, ${cloudinaryPrefix}w_640/${imageUrl} 640w`;
    }
    if (!image.width || image.width >= 800) {
      html += `, ${cloudinaryPrefix}w_800/${imageUrl} 800w`;
    }
    if (!image.width || image.width >= 1024) {
      html += `, ${cloudinaryPrefix}w_1024/${imageUrl} 1024w`;
    }
    html += `" sizes="${sizes}"`;
    if (image.alt) {
      html += ` alt="${image.alt}"`;
    }
    if (image.width) {
      html += ` width="${image.width}"`;
    }
    html += ` />`;
    if (image.caption || image.zoom) {
      html += `<figcaption>`;
      if (image.caption) {
        html += `<p>${image.caption}</p>`;
      }
      if (image.zoom) {
        html += `<p class="zoom">&#128269;&nbsp;<a href="${image.src}" target="_blank">zoomer</a></p>`;
      }
      html += `</figcaption>`;
    }
    html += `</figure>`;

    return html;
  }

  eleventyConfig.addNunjucksShortcode("image", function(image) {
    return genericImage(image, "fullwidth", "(min-width: 66rem) 60rem, 90vw");
  });

  eleventyConfig.addNunjucksShortcode("image_half", function(image) {
    return genericImage(
      image,
      "onehalf",
      "(min-width: 66rem) 30rem, (min-width: 40rem) 45vw, 90vw"
    );
  });

  eleventyConfig.addNunjucksShortcode("image_third", function(image) {
    return genericImage(image, "onethird", "(min-width: 66rem) 20rem, 30vw");
  });

  eleventyConfig.addNunjucksShortcode("poster", function(image) {
    return genericImage(image, "poster", "(min-width: 66rem) 20rem, 30vw");
  });

  eleventyConfig.addPairedShortcode("note", function(content) {
    return `<div class="note">${content}</div>`;
  });

  // ------------------------------------------------------------------------
  // Collections
  // ------------------------------------------------------------------------

  eleventyConfig.addCollection("navigation", function(collection) {
    return collection.getFilteredByTag("navigation").sort((a, b) => {
      return a.data.navorder - b.data.navorder;
    });
  });

  eleventyConfig.addCollection("ateliers", function(collection) {
    return collection.getFilteredByTag("ateliers").sort((a, b) => {
      return a.data.title.localeCompare(b.data.title);
    });
  });

  eleventyConfig.addCollection("evenements_futurs", function(collection) {
    return collection.getFilteredByTag("evenements").filter(evenement => {
      return (
        DateTime.fromJSDate(evenement.date, {
          zone: "Europe/Paris"
        })
          .diffNow("hours")
          .toObject().hours >= -24
      );
    });
  });

  eleventyConfig.addCollection("evenements_futurs_homepage", function(
    collection
  ) {
    return collection.getFilteredByTag("evenements").filter(evenement => {
      return (
        (evenement.data.show_homepage === undefined ||
          evenement.data.show_homepage) &&
        DateTime.fromJSDate(evenement.date, {
          zone: "Europe/Paris"
        })
          .diffNow("hours")
          .toObject().hours >= -24
      );
    });
  });

  eleventyConfig.addCollection("evenements_passes", function(collection) {
    return collection.getFilteredByTag("evenements").filter(evenement => {
      return (
        DateTime.fromJSDate(evenement.date, {
          zone: "Europe/Paris"
        })
          .diffNow("hours")
          .toObject().hours < -24
      );
    });
  });

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
  let slugify = require("@sindresorhus/slugify");
  let markdownItAnchorOptions = {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#",
    level: [2, 3, 4],
    slugify: function(s) {
      return slugify(s);
    }
  };
  let markdownItContainer = require("markdown-it-container");
  eleventyConfig.setLibrary(
    "md",
    markdownIt(markdownItOptions)
      .use(markdownItAnchor, markdownItAnchorOptions)
      .use(markdownItContainer, "info")
      .use(markdownItContainer, "note")
  );

  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/files");
  eleventyConfig.addPassthroughCopy("src/fonts");

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
