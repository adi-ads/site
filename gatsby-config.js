module.exports = {
  siteMetadata: {
    title: `3Pillar Global Product Mindset Workshop`,
    siteName: `Product Mindset`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        omitGoogleFont: true,
        pathToConfigModule: `src/utils/typography`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `content`
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: []
      }
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.tsx`
      }
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-react-next`
  ]
}
