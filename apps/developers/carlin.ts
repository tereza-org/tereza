export default {
  environments: {
    Production: {
      acm: process.env.ACM_TEREZA_TECH,
      aliases: ['developers.tereza.tech'],
      cloudfront: true,
      hostedZoneName: 'tereza.tech',
    },
  },
};
