import React from "react";

const page = ({ params }: any) => {
  const id = params.id;
  return <div>ComplaintID: {id}</div>;
};

export default page;
