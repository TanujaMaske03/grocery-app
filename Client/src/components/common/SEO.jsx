import { Helmet } from 'react-helmet-async'

const SEO = ({
  title = 'GroceryStore – Fresh Groceries Delivered to Your Doorstep',
  description = 'Shop fresh fruits, vegetables, dairy, and more. Get groceries delivered to your doorstep with GroceryStore. Quality products at best prices.',
  keywords = 'grocery, fresh food, online grocery, grocery delivery, organic food, fruits, vegetables',
  image = '/images/og-image.jpg',
  url = '',
  author = 'GroceryStore',
  publishedTime = '',
  modifiedTime = '',
  type = 'website',
  noIndex = false
}) => {
  const siteUrl = 'https://grocerystore.com'
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="GroceryStore" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@GroceryStore" />

      {/* Additional SEO */}
      <link rel="canonical" href={fullUrl} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#0ea5e9" />

      {/* JSON-LD Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "GroceryStore",
          "url": siteUrl,
          "logo": `${siteUrl}/logo.png`,
          "description": "Online grocery delivery service",
          "sameAs": [
            "https://facebook.com/grocerystore",
            "https://twitter.com/grocerystore",
            "https://instagram.com/grocerystore"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-234-567-890",
            "contactType": "Customer Service"
          }
        })}
      </script>
    </Helmet>
  )
}

export default SEO