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
      url: `${baseUrl}/features`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
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

  // Help category pages
  const helpCategories = [
    'getting-started',
    'recording-charts',
    'emr-integration',
    'settings',
    'security-privacy',
    'troubleshooting',
  ].map((category) => ({
    url: `${baseUrl}/help/${category}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  // Help articles
  const helpArticles = [
    // Getting Started
    { category: 'getting-started', id: 'create-account' },
    { category: 'getting-started', id: 'first-recording' },
    { category: 'getting-started', id: 'dashboard-overview' },
    { category: 'getting-started', id: 'patient-consent' },
    { category: 'getting-started', id: 'specialty-selection' },
    { category: 'getting-started', id: 'mobile-app' },
    { category: 'getting-started', id: 'trial-overview' },
    { category: 'getting-started', id: 'quick-start-guide' },
    // Recording & Charts
    { category: 'recording-charts', id: 'recording-tips' },
    { category: 'recording-charts', id: 'chart-editing' },
    { category: 'recording-charts', id: 'soap-format' },
    { category: 'recording-charts', id: 'speaker-identification' },
    { category: 'recording-charts', id: 'chart-templates' },
    { category: 'recording-charts', id: 'batch-recording' },
    { category: 'recording-charts', id: 'audio-playback' },
    { category: 'recording-charts', id: 'chart-export' },
    { category: 'recording-charts', id: 'voice-commands' },
    { category: 'recording-charts', id: 'chart-history' },
    { category: 'recording-charts', id: 'medical-terminology' },
    { category: 'recording-charts', id: 'real-time-transcription' },
    // EMR Integration
    { category: 'emr-integration', id: 'supported-emr' },
    { category: 'emr-integration', id: 'emr-setup' },
    { category: 'emr-integration', id: 'clipboard-integration' },
    { category: 'emr-integration', id: 'patient-sync' },
    { category: 'emr-integration', id: 'chart-transfer' },
    { category: 'emr-integration', id: 'api-documentation' },
    // Settings
    { category: 'settings', id: 'account-settings' },
    { category: 'settings', id: 'notification-settings' },
    { category: 'settings', id: 'language-settings' },
    { category: 'settings', id: 'default-ai-settings' },
    { category: 'settings', id: 'team-management' },
    { category: 'settings', id: 'billing-settings' },
    { category: 'settings', id: 'data-export' },
    { category: 'settings', id: 'keyboard-shortcuts' },
    { category: 'settings', id: 'microphone-settings' },
    { category: 'settings', id: 'accessibility-settings' },
    // Security & Privacy
    { category: 'security-privacy', id: 'data-encryption' },
    { category: 'security-privacy', id: 'access-control' },
    { category: 'security-privacy', id: 'privacy-policy' },
    { category: 'security-privacy', id: 'hipaa-compliance' },
    { category: 'security-privacy', id: 'data-deletion' },
    // Troubleshooting
    { category: 'troubleshooting', id: 'recording-issues' },
    { category: 'troubleshooting', id: 'chart-generation-issues' },
    { category: 'troubleshooting', id: 'login-issues' },
    { category: 'troubleshooting', id: 'emr-sync-issues' },
    { category: 'troubleshooting', id: 'performance-issues' },
    { category: 'troubleshooting', id: 'mobile-app-issues' },
    { category: 'troubleshooting', id: 'browser-compatibility' },
    { category: 'troubleshooting', id: 'audio-quality-issues' },
    { category: 'troubleshooting', id: 'billing-issues' },
    { category: 'troubleshooting', id: 'contact-support' },
  ].map((article) => ({
    url: `${baseUrl}/help/${article.category}/${article.id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.4,
  }));

  return [
    ...mainPages,
    ...contentPages,
    ...productPages,
    ...legalPages,
    ...authPages,
    ...blogPosts,
    ...helpCategories,
    ...helpArticles,
  ];
}
