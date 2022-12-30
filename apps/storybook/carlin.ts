export default {
  environments: {
    Production: {
      acm: process.env.ACM_TEREZA_TECH,
      aliases: ['storybook.tereza.tech'],
      cloudfront: true,
      hostedZoneName: 'tereza.tech',
    },
  },
};
