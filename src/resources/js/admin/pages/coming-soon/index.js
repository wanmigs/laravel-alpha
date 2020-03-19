import React, { useState } from "react";
import NewsletterTable from "~/Layout/NewsletterTable";

const columns = {
  name: {
    label: "Email"
  }
};

const title = {
  singular: "Newsletter",
  plural: "Newsletters"
};

const Newsletters = () => (
  <NewsletterTable
    columns={columns}
    endpoint="/api/newsletters"
    title={title}
    row={'Newsletter'}
    options={{
      order: "asc",
      sort: "created_at"
    }}
  />
);

export default Newsletters;
