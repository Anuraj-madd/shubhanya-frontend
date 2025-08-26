import { useEffect } from 'react';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website' 
}) => {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    if (description) {
      metaDescription.content = description;
    }

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    if (keywords) {
      metaKeywords.content = keywords;
    }

    // Update Open Graph tags
    const updateOGTag = (property, content) => {
      let ogTag = document.querySelector(`meta[property="og:${property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', `og:${property}`);
        document.head.appendChild(ogTag);
      }
      if (content) {
        ogTag.content = content;
      }
    };

    updateOGTag('title', title);
    updateOGTag('description', description);
    updateOGTag('image', image);
    updateOGTag('url', url);
    updateOGTag('type', type);

    // Update Twitter Card tags
    const updateTwitterTag = (name, content) => {
      let twitterTag = document.querySelector(`meta[name="twitter:${name}"]`);
      if (!twitterTag) {
        twitterTag = document.createElement('meta');
        twitterTag.name = `twitter:${name}`;
        document.head.appendChild(twitterTag);
      }
      if (content) {
        twitterTag.content = content;
      }
    };

    updateTwitterTag('title', title);
    updateTwitterTag('description', description);
    updateTwitterTag('image', image);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    if (url) {
      canonical.href = url;
    }

  }, [title, description, keywords, image, url, type]);

  return null; // This component doesn't render anything
};

export default SEO;
