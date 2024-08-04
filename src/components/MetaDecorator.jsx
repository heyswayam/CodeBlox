import React from "react";
import { Helmet } from "react-helmet";

const MetaDecorator = ({ title, description, imageUrl }) => (
  <Helmet>
    <title>{title}</title>
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {imageUrl && <meta property="og:image" content={imageUrl} />}
    <meta property="og:url" content={window.location.href} />
    <meta name="twitter:card" content="summary_large_image" />
    {imageUrl && <meta name="twitter:image" content={imageUrl} />}
    <meta name="twitter:image:alt" content={title} />
    <meta name="twitter:site" content={title} />
  </Helmet>
);

export default MetaDecorator;