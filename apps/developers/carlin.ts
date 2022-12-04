export default {
  skipDeploy: true,
  environments: {
    Production: {
      acm: process.env.ACM_ARN,
      aliases: ['tereza.tech'],
      hostedZoneName: 'tereza.tech',
      cloudfront: true,
      skipDeploy: false,
    },
  },
};
