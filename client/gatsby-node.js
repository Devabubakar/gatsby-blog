async function createCategoriesPages(graphql, actions) {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allSanityCategories {
        nodes {
          id
          slug {
            current
          }
        }
      }
    }
  `);

  //gracefully handle errors
  if (result.errors) throw result.error;

  result.data.allSanityCategories.nodes.forEach((node) => {
    //destructure id and slug
    const { id, slug } = node;
    //if no slug exit
    if (!slug) return;

    //make url from current slug
    const path = `/categories/${slug.current}`;
    //create pages using path and template file , pass down the id
    createPage({
      path,
      component: require.resolve('./src/templates/categories.js'),
      context: { id },
    });
  });
}

exports.createPages = async ({ graphql, actions }) => {
  await createCategoriesPages(graphql, actions);
};
