export default {
  environments: {
    Production: {
      acm: process.env.ACM_TEREZA_APP,
      aliases: ['tereza.app'],
      cloudfront: true,
      hostedZoneName: 'tereza.app',
      spa: true,
    },
  },
};
