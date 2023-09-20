import React, { ReactNode, memo } from "react";

const MetaHead = ({
  title,
  desc,
  canonical,
  children,
  isIndexed = true,
  imgUrl,
}: {
  title: string;
  desc?: string;
  canonical: string;
  children?: ReactNode;
  isIndexed?: boolean;
  imgUrl?: string;
}) => {
  return (
    <head>
      <meta charSet="utf-8" key="chartSetUtf8" />
      <meta
        name="viewport"
        key="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <title>{title}</title>
      <meta property="og:title" key="og:title" content={title} />
      <meta name="twitter:title" key="twitter:title" content={title} />
      <link rel="canonical" href={canonical} />
      <meta name="twitter:url" key="twitter:url" content={canonical} />
      <meta property="og:url" key="og:url" content={canonical} />
      {desc ? (
        <>
          <meta name="description" key="description" content={desc} />
          <meta property="og:description" key="og:description" content={desc} />
          <meta name="twitter:description" key="twitter:description" content={desc} />
        </>
      ) : null}
      <meta property="og:image" key="og:image" content={imgUrl} />
      <meta name="twitter:image" key="twitter:image" content={imgUrl} />
      <meta property="og:type" key="og:type" content="website" />
      <meta name="twitter:card" key="twitter:card" content="summary_large_image" />
      {isIndexed ? null : <meta name="robots" key="robots" content="noindex" />}
      {children}
    </head>
  );
};

export default memo(MetaHead);
