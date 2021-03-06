/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators
  return graphql(`
      {
       allMarkdownRemark(filter: { frontmatter: { isPage: {eq: true} } }, limit: 1000) {
         edges {
           node {
             fields {
               slug
             }
             frontmatter {
               path
               title
               templateKey
               heroImage
             }
           }
         }
       }
     }
   `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      const pagePath = `/` + (node.frontmatter.path || node.frontmatter.title.split(` `, 1)[0].toLowerCase())
      createPage({
        component: path.resolve(
          `src/templates/${String(node.frontmatter.templateKey)}.tsx`
        ),
        // additional data can be passed via context
        context: {slug: node.fields.slug, heroImageSlug: node.frontmatter.heroImage, pagePath: pagePath},
        path: pagePath
      })
    })
  })
}

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === `MarkdownRemark` && node.frontmatter.isPage === true) {
    const slug = createFilePath({ node, getNode, basePath: `content/pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
  } else if (node.internal.type === `ImageSharp`) {
    const slug = createFilePath({ node, getNode, basePath: `content/images` })
    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
  }
}
