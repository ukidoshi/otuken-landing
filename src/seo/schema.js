import { getAbsoluteImageUrl, getAbsoluteUrl, siteConfig } from './site'

export const makeOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteConfig.siteUrl}#organization`,
  name: siteConfig.name,
  alternateName: siteConfig.altNames,
  url: siteConfig.siteUrl,
  logo: getAbsoluteImageUrl(siteConfig.defaultOgImage),
  telephone: siteConfig.phone,
  email: siteConfig.organizationEmail,
  areaServed: {
    '@type': 'AdministrativeArea',
    name: siteConfig.region
  },
  address: {
    '@type': 'PostalAddress',
    addressRegion: siteConfig.addressRegion,
    addressCountry: siteConfig.addressCountry
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      telephone: siteConfig.phone,
      email: siteConfig.organizationEmail,
      areaServed: 'RU',
      availableLanguage: ['ru']
    }
  ]
})

export const makeWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.siteUrl}#website`,
  name: siteConfig.name,
  alternateName: siteConfig.altNames,
  url: siteConfig.siteUrl,
  inLanguage: 'ru',
  publisher: {
    '@id': `${siteConfig.siteUrl}#organization`
  }
})

export const makeBreadcrumbSchema = (items = []) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: item.to ? getAbsoluteUrl(item.to) : undefined
  }))
})

export const makeFaqSchema = (faq = []) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((entry) => ({
    '@type': 'Question',
    name: entry.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: entry.answer
    }
  }))
})

export const makeTouristAttractionSchema = ({
  name,
  description,
  path,
  image = siteConfig.defaultOgImage,
  additionalType,
  category,
  addressLocality = siteConfig.addressLocality
}) => {
  const entityType = additionalType || 'TouristAttraction'

  return {
  '@context': 'https://schema.org',
  '@type': entityType,
  name,
  alternateName: [...siteConfig.altNames, siteConfig.shortName],
  description,
  url: getAbsoluteUrl(path),
  image: getAbsoluteImageUrl(image),
  ...(entityType === 'TouristAttraction'
    ? {
        touristType: ['этнокультурный туризм', 'семейный отдых', 'событийный туризм']
      }
    : {}),
  address: {
    '@type': 'PostalAddress',
    addressLocality,
    addressRegion: siteConfig.addressRegion,
    addressCountry: siteConfig.addressCountry
  },
  containedInPlace: {
    '@type': 'Place',
    name: siteConfig.name,
    address: {
      '@type': 'PostalAddress',
      addressRegion: siteConfig.addressRegion,
      addressCountry: siteConfig.addressCountry
    }
  },
  additionalProperty: category
    ? [
        {
          '@type': 'PropertyValue',
          name: 'Категория',
          value: category
        }
      ]
    : undefined
  }
}

export const makePlaceSchema = ({ name, description, path, image = siteConfig.defaultOgImage }) => ({
  '@context': 'https://schema.org',
  '@type': 'Place',
  name,
  description,
  url: getAbsoluteUrl(path),
  image: getAbsoluteImageUrl(image),
  address: {
    '@type': 'PostalAddress',
    addressRegion: siteConfig.addressRegion,
    addressCountry: siteConfig.addressCountry,
    addressLocality: siteConfig.addressLocality
  }
})

export const makeCollectionPageSchema = ({ name, description, path, itemUrls = [] }) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name,
  description,
  url: getAbsoluteUrl(path),
  hasPart: itemUrls.map((item) => ({
    '@type': 'WebPage',
    url: getAbsoluteUrl(item)
  }))
})

export const makeEventSchema = ({
  name,
  description,
  path,
  startDate,
  endDate,
  eventStatus = 'https://schema.org/EventScheduled',
  image = siteConfig.defaultOgImage,
  locationName = `${siteConfig.name}, ${siteConfig.region}`,
  offersUrl
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Event',
  name,
  description,
  eventStatus,
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  startDate,
  endDate,
  image: getAbsoluteImageUrl(image),
  url: getAbsoluteUrl(path),
  location: {
    '@type': 'Place',
    name: locationName,
    address: {
      '@type': 'PostalAddress',
      addressRegion: siteConfig.addressRegion,
      addressCountry: siteConfig.addressCountry,
      addressLocality: siteConfig.addressLocality
    }
  },
  organizer: {
    '@id': `${siteConfig.siteUrl}#organization`
  },
  offers: offersUrl
    ? {
        '@type': 'Offer',
        url: offersUrl,
        availability: 'https://schema.org/InStock',
        price: '0',
        priceCurrency: 'RUB'
      }
    : undefined
})
