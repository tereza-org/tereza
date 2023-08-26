// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Tereza Tech',
  tagline: "Tereza's tools documentation for developers.",
  url: 'https://tereza.tech',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/terezatech/tereza-tech/tree/main/apps/developers/',
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {
          property: 'og:image',
          content: 'https://tereza.tech/img/tereza.webp',
        },
      ],
      navbar: {
        title: 'Tereza Tech',
        logo: {
          alt: 'Tereza Tech Logo',
          src: 'img/tereza200x200.webp',
        },
        items: [
          {
            type: 'doc',
            docId: 'introduction',
            position: 'left',
            label: 'Docs',
          },
          // { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/terezatech/tereza-tech',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/introduction',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/terezatech',
              },
            ],
          },
          {
            title: 'More',
            items: [
              // {
              //   label: 'Blog',
              //   to: '/blog',
              // },
              {
                label: 'GitHub',
                href: 'https://github.com/terezatech/tereza-tech',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Tereza Tech.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

  plugins: [
    [
      '@tereza-tech/docusaurus-plugin-zettel',
      {
        notesDir: '../digital-garden/notes',
        knowledgeGraph: {
          component: '@site/src/components/KnowledgeGraph.tsx',
        },
      },
    ],
    //   [
    //     'docusaurus-plugin-typedoc',
    //     {
    //       id: 'api-1',
    //       includeExtension: false,
    //       entryPoints: ['../../packages/zettel/src/index.ts'],
    //       tsconfig: '../../packages/zettel/tsconfig.json',
    //       out: 'api-1',
    //       sidebar: {
    //         categoryLabel: 'API XYZ',
    //         collapsed: false,
    //         position: 0,
    //         fullNames: true,
    //       },
    //     },
    //   ],
  ],
};

module.exports = config;
