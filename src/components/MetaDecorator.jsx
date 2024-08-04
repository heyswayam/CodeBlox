import React from "react";
import { Helmet } from "react-helmet";



const MetaDecorator = ({ title, description, imageUrl }) => (
  <Helmet>
    <title>{title}</title>
    <meta property="og:title" content={title} />
    {/* <meta name="description" content={description} /> */}
    <meta property="og:description" content={description} />
    <meta property="og:image" content={imageUrl} />
    <meta property="og:url" content={window.location.pathname + window.location.search}/>
    {/* <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image:alt" content={imageAlt} />
    <meta name="twitter:site" content={metaDecorator.twitterUsername} /> */}
  </Helmet>
);



export default MetaDecorator;