import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Page from '../components/Page';

const TagTemplate = ({ data, pageContext }) => {
  const {
    title: siteTitle,
    subtitle: siteSubtitle
  } = data.site.siteMetadata;

  const {
    page,
    tag
  } = pageContext;

  const { edges } = data.allMarkdownRemark;
  const pageTitle = page > 0 ? `All Posts tagged as "${tag}" - Page ${page} - ${siteTitle}` : `All Posts tagged as "${tag}" - ${siteTitle}`;

  return (
    <Layout title={pageTitle} description={siteSubtitle}>
      <Sidebar />
      <Page title={tag}>
        <Feed edges={edges} />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query TagPage($tag: String, $limit: Int!, $skip: Int!) {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
    allMarkdownRemark(
        limit: $limit,
        skip: $skip,
        filter: { frontmatter: { tags: { in: [$tag] }, layout: { eq: "post" }, draft: { ne: true } } },
        sort: { order: DESC, fields: [frontmatter___date] }
      ){
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
          }
        }
      }
    }
  }
`;

export default TagTemplate;