export default {
  acm: process.env.ACM_TEREZA_APP,
  spa: true,
  cloudfront: false,
  hostedZoneName: 'tereza.app',
  environments: {
    Staging: {
      aliases: ['staging.tereza.app'],
    },
    Production: {
      aliases: ['tereza.app'],
      cloudfront: true,
    },
  },
};
