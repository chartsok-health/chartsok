export default function sitemap() {
  const baseUrl = 'https://chartsok.com';
  const currentDate = new Date().toISOString();

  // Main public pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Content pages
  const contentPages = [
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];

  // Product/Feature pages
  const productPages = [
    {
      url: `${baseUrl}/integrations`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/security`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/status`,
      lastModified: currentDate,
      changeFrequency: 'hourly',
      priority: 0.5,
    },
  ];

  // Legal pages
  const legalPages = [
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Auth pages (public but lower priority)
  const authPages = [
    {
      url: `${baseUrl}/auth/login`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/auth/signup`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // Blog posts
  const blogPosts = [
    {
      slug: 'ai-medical-charting-future',
      date: '2025-01-15',
    },
    {
      slug: 'soap-note-best-practices',
      date: '2025-01-10',
    },
    {
      slug: 'emr-integration-guide',
      date: '2025-01-05',
    },
    {
      slug: 'voice-recognition-healthcare',
      date: '2024-12-28',
    },
    {
      slug: 'doctor-burnout-solutions',
      date: '2024-12-20',
    },
    {
      slug: 'medical-ai-ethics',
      date: '2024-12-15',
    },
  ].map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    ...mainPages,
    ...contentPages,
    ...productPages,
    ...legalPages,
    ...authPages,
    ...blogPosts,
  ];
}
