// const Docs = ({ params }) => {
//   return <p>path:{params.slug.join("/")}</p>;
// };
// export default Docs;

// app/[id]/page.js
// app/[slug]/page.js

const Page = ({ params }) => {
  // If no slug is provided, show the docs home page
  if (!params.slug) {
    return <p>Welcome to the docs home page</p>;
  }
  
  // If slug is provided, show the nested page
  return <p>Docs page: {params.slug.join("/")}</p>;
};

export default Page;

