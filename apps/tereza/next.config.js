const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Someday, when ttoss remove the babel config to make i18n work, we can use
   * relay-compiler plugin here.
   */
  // compiler: {
  //   relay: {
  //     src: './',
  //     language: 'typescript',
  //   },
  // },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

module.exports = withMDX(nextConfig);
