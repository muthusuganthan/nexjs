// app/[id]/page.js

const Page = ({ params }) => {
  return <p>{params.id}</p>;
};

export default Page;

