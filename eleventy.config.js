module.exports = function (eleventyConfig) {
  // Static assets copied as-is
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/gallery/images-solid.svg");
  eleventyConfig.addPassthroughCopy("src/map/map-solid.svg");
  eleventyConfig.addPassthroughCopy("src/trails");
  eleventyConfig.addPassthroughCopy("src/contact/phone-solid.svg");
  eleventyConfig.addPassthroughCopy("src/404.html");
  eleventyConfig.addPassthroughCopy("src/Privacy policy");
  eleventyConfig.addPassthroughCopy("src/house-solid.svg");
  eleventyConfig.addPassthroughCopy("src/docs");
  eleventyConfig.addPassthroughCopy("src/photos");
  eleventyConfig.addPassthroughCopy("src/data");

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
    },
  };
};
