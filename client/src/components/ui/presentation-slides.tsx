the synergy between AI and blockchain, exploring real-world applications and innovative use cases.</p>
      </ContentBox>
    </div>
  </Slide>
);

export const roadmapSlide = (
  <Slide key="roadmap">
    <SlideTitle title="Roadmap:  Our Vision for the Future" />
    <div className="space-y-4">
      <ContentBox icon={<Target className="w-6 h-6" />} title="2025 Milestones">
        <p className="text-gray-400">Platform launch, initial user acquisition, and strategic partnerships.</p>
      </ContentBox>
      <ContentBox icon={<Target className="w-6 h-6" />} title="2026 Goals">
        <p className="text-gray-400">Expand curriculum, increase user base, and explore international markets.</p>
      </ContentBox>
    </div>
  </Slide>
);

export const progressSlide = (
  <Slide key="progress">
    <SlideTitle title="Progress to Date:  Building a Strong Foundation" />
    <ContentBox icon={<Trophy className="w-6 h-6" />} title="Key Achievements">
      <p className="text-gray-400">Completed core platform development, secured key partnerships, and established a strong team.</p>
    </ContentBox>
  </Slide>
);

export const dataStrategySlide = (
  <Slide key="dataStrategy">
    <SlideTitle 
      title="How We Track & Use Data" 
      subtitle="Building AI-Powered Learning Experiences"
    />
    <div className="space-y-8">
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <svg
          viewBox="0 0 800 200"
          className="w-full h-auto"
          style={{ maxHeight: '200px' }}
        >
          {/* Background */}
          <rect width="800" height="200" fill="#1a1b1e" rx="10" />

          {/* User Interaction Layer */}
          <g transform="translate(50, 50)">
            <rect width="150" height="60" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" rx="5" />
            <text x="75" y="25" fill="#3b82f6" textAnchor="middle" fontSize="14">User Interactions</text>
            <text x="75" y="45" fill="#9ca3af" textAnchor="middle" fontSize="12">Event Tracking</text>
          </g>

          {/* Processing Layer */}
          <g transform="translate(325, 50)">
            <rect width="150" height="60" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" rx="5" />
            <text x="75" y="25" fill="#10b981" textAnchor="middle" fontSize="14">Data Processing</text>
            <text x="75" y="45" fill="#9ca3af" textAnchor="middle" fontSize="12">Apache Kafka</text>
          </g>

          {/* Storage Layer */}
          <g transform="translate(600, 50)">
            <rect width="150" height="60" fill="#8b5cf6" fillOpacity="0.1" stroke="#8b5cf6" strokeWidth="2" rx="5" />
            <text x="75" y="25" fill="#8b5cf6" textAnchor="middle" fontSize="14">Data Storage</text>
            <text x="75" y="45" fill="#9ca3af" textAnchor="middle" fontSize="12">PostgreSQL + Redis</text>
          </g>

          {/* Connection Lines */}
          <g stroke="#4b5563" strokeWidth="2" strokeDasharray="5,5">
            <path d="M200,80 L325,80" />
            <path d="M475,80 L600,80" />
          </g>

          {/* Flow Arrows */}
          <g fill="#4b5563">
            <polygon points="320,77 330,80 320,83" />
            <polygon points="595,77 605,80 595,83" />
          </g>
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentBox icon={<Code className="w-8 h-8" />} title="Analytics & Processing">
          <ul className="space-y-3 text-gray-400">
            <li>• Real-time event tracking with Apache Kafka</li>
            <li>• Custom analytics pipeline built with Node.js</li>
            <li>• Machine learning models for pattern recognition</li>
            <li>• Automated data aggregation and processing</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Database className="w-8 h-8" />} title="Storage & Integration">
          <ul className="space-y-3 text-gray-400">
            <li>• PostgreSQL for persistent data storage</li>
            <li>• Redis for caching and real-time features</li>
            <li>• Secure API integrations with OpenAI</li>
            <li>• Distributed data processing architecture</li>
          </ul>
        </ContentBox>
      </div>
    </div>
  </Slide>
);

export const fundingRequirementsSlide = (
  <Slide key="fundingRequirements">
    <SlideTitle 
      title="Funding Requirements" 
      subtitle="Investing in the Future"
    />
    <div className="space-y-8">
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          To date, I have built everything myself at a minimal cost. I believe that with a team and relatively small budget I can rapidly build the platform&#39;s capabilities and onboard users.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          To scale Sulla effectively, we require funding that supports key areas: content expansion, marketing, platform improvements, and operational growth. Our focus is on building a user-centric platform with AI-driven personalization, ensuring high engagement and long-term retention.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed">
          We have strategically allocated funds to maximize user acquisition in the first 12 months while setting up monetization in the second year. Security, legal compliance, and infrastructure enhancements are also prioritized to support future scalability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentBox icon={<Users className="w-8 h-8" />} title="Team Building & Operations">
          <ul className="space-y-3 text-gray-400">
            <li>• Core development team recruitment</li>
            <li>• AI/ML specialists and data scientists</li>
            <li>• Content creation and curriculum experts</li>
            <li>• Customer support and operations staff</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Brain className="w-8 h-8" />} title="Technology & Infrastructure">
          <ul className="space-y-3 text-gray-400">
            <li>• AI model development and training</li>
            <li>• Platform scalability improvements</li>
            <li>• Security and compliance enhancements</li>
            <li>• Advanced analytics implementation</li>
          </ul>
        </ContentBox>
      </div>
    </div>
  </Slide>
);

export const fundingAllocationSlide = (
  <Slide key="fundingAllocation">
    <SlideTitle 
      title="Use of Funds" 
      subtitle="Strategic Allocation"
    />
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentBox icon={<BookOpen className="w-8 h-8" />} title="Content Expansion - $50K">
          <ul className="space-y-3 text-gray-400">
            <li>• Development of advanced AI &amp; blockchain courses</li>
            <li>• Creation of interactive learning materials</li>
            <li>• Professional certification programs</li>
            <li>• Industry-specific content modules</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Rocket className="w-8 h-8" />} title="Marketing &amp; User Acquisition - $50K">
          <ul className="space-y-3 text-gray-400">
            <li>• Digital marketing and SEO optimization</li>
            <li>• Educational influencer partnerships</li>
            <li>• Community engagement programs</li>
            <li>• Early adopter incentives</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Building className="w-8 h-8" />} title="Business Development - $50K">
          <ul className="space-y-3 text-gray-400">
            <li>• Strategic partnership development</li>
            <li>• Enterprise client acquisition</li>
            <li>• Educational institution collaborations</li>
            <li>• Industry alliance building</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Brain className="w-8 h-8" />} title="Platform Enhancements - $100K">
          <ul className="space-y-3 text-gray-400">
            <li>• AI algorithm development and training</li>
            <li>• Gamification features implementation</li>
            <li>• User experience improvements</li>
            <li>• Performance optimization</li>
          </ul>
        </ContentBox>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentBox icon={<Shield className="w-8 h-8" />} title="Legal &amp; Compliance - $50K">
          <ul className="space-y-3 text-gray-400">
            <li>• Regulatory compliance implementation</li>
            <li>• Legal documentation and contracts</li>
            <li>• Privacy policy development</li>
            <li>• Intellectual property protection</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Users className="w-8 h-8" />} title="Operational Costs - $200K">
          <ul className="space-y-3 text-gray-400">
            <li>• Core team salaries and benefits</li>
            <li>• Office and infrastructure costs</li>
            <li>• Administrative expenses</li>
            <li>• Professional services</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Database className="w-8 h-8" />} title="Security &amp; Maintenance - $100K">
          <ul className="space-y-3 text-gray-400">
            <li>• Security infrastructure setup</li>
            <li>• Continuous monitoring systems</li>
            <li>• Backup and recovery solutions</li>
            <li>• Regular security audits</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Wallet className="w-8 h-8" />} title="Buffer Fund - $50K">
          <ul className="space-y-3 text-gray-400">
            <li>• Emergency operational expenses</li>
            <li>• Opportunity investments</li>
            <li>• Market response flexibility</li>
            <li>• Risk management reserve</li>
          </ul>
        </ContentBox>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-blue-400">Total Funding Needed</h3>
          <span className="text-2xl font-bold text-blue-400">$650K</span>
        </div>
        <p className="text-gray-300 text-lg">
          Break-even is expected in 18-24 months, with user acquisition as the top priority in the first year.
        </p>
      </div>
    </div>
  </Slide>
);

export const financialModelSlide = (
  <Slide key="financialModel">
    <SlideTitle 
      title="Sulla's Financial Model" 
      subtitle="Revenue Projections &amp; Key Metrics"
    />
    <div className="space-y-8">
      <ContentBox icon={<DollarSign className="w-8 h-8" />} title="Revenue Streams">
        <ul className="space-y-3 text-gray-400">
          <li>• Premium Subscriptions ($15-30/month per user)</li>
          <li>• Enterprise Licensing ($5,000-20,000/year)</li>
          <li>• Professional Certifications ($199-499 per certification)</li>
          <li>• Custom Corporate Training Programs ($10,000+ per program)</li>
        </ul>
      </ContentBox>

      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-gray-200 mb-4">Financial Projections (in millions)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-gray-300">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2">Metric</th>
                <th className="text-right py-2">Year 2</th>
                <th className="text-right py-2">Year 3</th>
                <th className="text-right py-2">Year 4</th>
                <th className="text-right py-2">Year 5</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="py-2">Revenue</td>
                <td className="text-right">$2.5M</td>
                <td className="text-right">$5.8M</td>
                <td className="text-right">$12.4M</td>
                <td className="text-right">$25.2M</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2">Operating Costs</td>
                <td className="text-right">$1.0M</td>
                <td className="text-right">$2.3M</td>
                <td className="text-right">$4.9M</td>
                <td className="text-right">$10.1M</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2">Gross Margin</td>
                <td className="text-right">60%</td>
                <td className="text-right">65%</td>
                <td className="text-right">68%</td>
                <td className="text-right">70%</td>
              </tr>
              <tr>
                <td className="py-2">Net Profit</td>
                <td className="text-right text-green-400">$0.5M</td>
                <td className="text-right text-green-400">$1.7M</td>
                <td className="text-right text-green-400">$4.3M</td>
                <td className="text-right text-green-400">$10.1M</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentBox icon={<Target className="w-8 h-8" />} title="Key Financial Metrics">
          <ul className="space-y-3 text-gray-400">
            <li>• User Acquisition Cost (CAC): $10-$20 per active user</li>
            <li>• Customer Lifetime Value (LTV): $300+ per premium user</li>
            <li>• Conversion Rate: 5-10% free to paid users</li>
            <li>• Operating Margins: &gt;60% (digital scalability)</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Building className="w-8 h-8" />} title="Enterprise Growth">
          <ul className="space-y-3 text-gray-400">
            <li>• 10-50 enterprise clients within 5 years</li>
            <li>• Average contract value: $10,000+</li>
            <li>• 85% enterprise retention rate</li>
            <li>• Custom solutions &amp; white-label options</li>
          </ul>
        </ContentBox>
      </div>
    </div>
  </Slide>
);

export const ctaSlide = (
  <Slide key="cta" className="text-center bg-gradient-to-br from-blue-600 to-blue-800 text-white">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo className="text-white mx-auto mb-8 h-16 w-auto" />
      <h2 className="text-3xl mb-8 text-gray-200">Join the Future of AI &amp; Blockchain Education</h2>
    </motion.div>
  </Slide>
);

export const modulesSlide = (
  <Slide key="modules">
    <SlideTitle title="Our Modules: A Comprehensive Curriculum" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ContentBox icon={<BookOpen className="w-6 h-6" />} title="Fundamentals of AI">
        <p className="text-gray-400">Covering essential concepts, algorithms, and techniques in artificial intelligence.</p>
      </ContentBox>
      <ContentBox icon={<BookOpen className="w-6 h-6" />} title="Blockchain Technology">
        <p className="text-gray-400">Exploring the fundamentals of blockchain, cryptocurrencies, smart contracts, and decentralized applications.</p>
      </ContentBox>
      <ContentBox icon={<BookOpen className="w-6 h-6" />} title="AI &amp; Blockchain Integration">
        <p className="text-gray-400">Delving into the synergy between AI and blockchain, exploring real-world applications and innovative use cases.</p>
      </ContentBox>
    </div>
  </Slide>
);

export const roadmapSlide = (
  <Slide key="roadmap">
    <SlideTitle title="Roadmap:  Our Vision for the Future" />
    <div className="space-y-4">
      <ContentBox icon={<Target className="w-6 h-6" />} title="2025 Milestones">
        <p className="text-gray-400">Platform launch, initial user acquisition, and strategic partnerships.</p>
      </ContentBox>
      <ContentBox icon={<Target className="w-6 h-6" />} title="2026 Goals">
        <p className="text-gray-400">Expand curriculum, increase user base, and explore international markets.</p>
      </ContentBox>
    </div>
  </Slide>
);

export const progressSlide = (
  <Slide key="progress">
    <SlideTitle title="Progress to Date:  Building a Strong Foundation" />
    <ContentBox icon={<Trophy className="w-6 h-6" />} title="Key Achievements">
      <p className="text-gray-400">Completed core platform development, secured key partnerships, and established a strong team.</p>
    </ContentBox>
  </Slide>
);

export const dataStrategySlide = (
  <Slide key="dataStrategy">
    <SlideTitle 
      title="How We Track &amp; Use Data" 
      subtitle="Building AI-Powered Learning Experiences"
    />
    <div className="space-y-8">
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <svg
          viewBox="0 0 800 200"
          className="w-full h-auto"
          style={{ maxHeight: '200px' }}
        >
          {/* Background */}
          <rect width="800" height="200" fill="#1a1b1e" rx="10" />

          {/* User Interaction Layer */}
          <g transform="translate(50, 50)">
            <rect width="150" height="60" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" rx="5" />
            <text x="75" y="25" fill="#3b82f6" textAnchor="middle" fontSize="14">User Interactions</text>
            <text x="75" y="45" fill="#9ca3af" textAnchor="middle" fontSize="12">Event Tracking</text>
          </g>

          {/* Processing Layer */}
          <g transform="translate(325, 50)">
            <rect width="150" height="60" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" rx="5" />
            <text x="75" y="25" fill="#10b981" textAnchor="middle" fontSize="14">Data Processing</text>
            <text x="75" y="45" fill="#9ca3af" textAnchor="middle" fontSize="12">Apache Kafka</text>
          </g>

          {/* Storage Layer */}
          <g transform="translate(600, 50)">
            <rect width="150" height="60" fill="#8b5cf6" fillOpacity="0.1" stroke="#8b5cf6" strokeWidth="2" rx="5" />
            <text x="75" y="25" fill="#8b5cf6" textAnchor="middle" fontSize="14">Data Storage</text>
            <text x="75" y="45" fill="#9ca3af" textAnchor="middle" fontSize="12">PostgreSQL + Redis</text>
          </g>

          {/* Connection Lines */}
          <g stroke="#4b5563" strokeWidth="2" strokeDasharray="5,5">
            <path d="M200,80 L325,80" />
            <path d="M475,80 L600,80" />
          </g>

          {/* Flow Arrows */}
          <g fill="#4b5563">
            <polygon points="320,77 330,80 320,83" />
            <polygon points="595,77 605,80 595,83" />
          </g>
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentBox icon={<Code className="w-8 h-8" />} title="Analytics &amp; Processing">
          <ul className="space-y-3 text-gray-400">
            <li>• Real-time event tracking with Apache Kafka</li>
            <li>• Custom analytics pipeline built with Node.js</li>
            <li>• Machine learning models for pattern recognition</li>
            <li>• Automated data aggregation and processing</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Database className="w-8 h-8" />} title="Storage &amp; Integration">
          <ul className="space-y-3 text-gray-400">
            <li>• PostgreSQL for persistent data storage</li>
            <li>• Redis for caching and real-time features</li>
            <li>• Secure API integrations with OpenAI</li>
            <li>• Distributed data processing architecture</li>
          </ul>
        </ContentBox>
      </div>
    </div>
  </Slide>
);

export const fundingRequirementsSlide = (
  <Slide key="fundingRequirements">
    <SlideTitle 
      title="Funding Requirements" 
      subtitle="Investing in the Future"
    />
    <div className="space-y-8">
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          To date, I have built everything myself at a minimal cost. I believe that with a team and relatively small budget I can rapidly build the platform&#39;s capabilities and onboard users.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          To scale Sulla effectively, we require funding that supports key areas: content expansion, marketing, platform improvements, and operational growth. Our focus is on building a user-centric platform with AI-driven personalization, ensuring high engagement and long-term retention.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed">
          We have strategically allocated funds to maximize user acquisition in the first 12 months while setting up monetization in the second year. Security, legal compliance, and infrastructure enhancements are also prioritized to support future scalability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentBox icon={<Users className="w-8 h-8" />} title="Team Building &amp; Operations">
          <ul className="space-y-3 text-gray-400">
            <li>• Core development team recruitment</li>
            <li>• AI/ML specialists and data scientists</li>
            <li>• Content creation and curriculum experts</li>
            <li>• Customer support and operations staff</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Brain className="w-8 h-8" />} title="Technology &amp; Infrastructure">
          <ul className="space-y-3 text-gray-400">
            <li>• AI model development and training</li>
            <li>• Platform scalability improvements</li>
            <li>• Security and compliance enhancements</li>
            <li>• Advanced analytics implementation</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Rocket className="w-8 h-8" />} title="Marketing &amp; User Acquisition">
          <ul className="space-y-3 text-gray-400">
            <li>• Digital marketing campaigns</li>
            <li>• Educational partnerships</li>
            <li>• Community building initiatives</li>
            <li>• Brand awareness development</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Layout className="w-8 h-8" />} title="Content &amp; Product Development">
          <ul className="space-y-3 text-gray-400">
            <li>• Course content expansion</li>
            <li>• Interactive learning tools</li>
            <li>• Mobile app development</li>
            <li>• User experience enhancement</li>
          </ul>
        </ContentBox>
      </div>
    </div>
  </Slide>
);

export const fundingAllocationSlide = (
  <Slide key="fundingAllocation">
    <SlideTitle 
      title="Use of Funds" 
      subtitle="Strategic Allocation"
    />
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentBox icon={<BookOpen className="w-8 h-8" />} title="Content Expansion - $50K">
          <ul className="space-y-3 text-gray-400">
            <li>• Development of advanced AI &amp; blockchain courses</li>
            <li>• Creation of interactive learning materials</li>
            <li>• Professional certification programs</li>
            <li>• Industry-specific content modules</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Rocket className="w-8 h-8" />} title="Marketing &amp; User Acquisition - $50K">
          <ul className="space-y-3 text-gray-400">
            <li>• Digital marketing and SEO optimization</li>
            <li>• Educational influencer partnerships</li>
            <li>• Community engagement programs</li>
            <li>• Early adopter incentives</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Building className="w-8 h-8" />} title="Business Development - $50K">
          <ul className="space-y-3 text-gray-400">
            <li>• Strategic partnership development</li>
            <li>• Enterprise client acquisition</li>
            <li>• Educational institution collaborations</li>
            <li>• Industry alliance building</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Brain className="w-8 h-8" />} title="Platform Enhancements - $100K">
          <ul className="space-y-3 text-gray-400">
            <li>• AI algorithm development and training</li>
            <li>• Gamification features implementation</li>
            <li>• User experience improvements</li>
            <li>• Performance optimization</li>
          </ul>
        </ContentBox>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentBox icon={<Shield className="w-8 h-8" />} title="Legal &amp; Compliance - $50K">
          <ul className="space-y-3 text-gray-400">
            <li>• Regulatory compliance implementation</li>
            <li>• Legal documentation and contracts</li>
            <li>• Privacy policy development</li>
            <li>• Intellectual property protection</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Users className="w-8 h-8" />} title="Operational Costs - $200K">
          <ul className="space-y-3 text-gray-400">
            <li>• Core team salaries and benefits</li>
            <li>• Office and infrastructure costs</li>
            <li>• Administrative expenses</li>
            <li>• Professional services</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Database className="w-8 h-8" />} title="Security &amp; Maintenance - $100K">
          <ul className="space-y-3 text-gray-400">
            <li>• Security infrastructure setup</li>
            <li>• Continuous monitoring systems</li>
            <li>• Backup and recovery solutions</li>
            <li>• Regular security audits</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Wallet className="w-8 h-8" />} title="Buffer Fund - $50K">
          <ul className="space-y-3 text-gray-400">
            <li>• Emergency operational expenses</li>
            <li>• Opportunity investments</li>
            <li>• Market response flexibility</li>
            <li>• Risk management reserve</li>
          </ul>
        </ContentBox>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-blue-400">Total Funding Needed</h3>
          <span className="text-2xl font-bold text-blue-400">$650K</span>
        </div>
        <p className="text-gray-300 text-lg">
          Break-even is expected in 18-24 months, with user acquisition as the top priority in the first year.
        </p>
      </div>
    </div>
  </Slide>
);

export const financialModelSlide = (
  <Slide key="financialModel">
    <SlideTitle 
      title="Sulla's Financial Model" 
      subtitle="Revenue Projections &amp; Key Metrics"
    />
    <div className="space-y-8">
      <ContentBox icon={<DollarSign className="w-8 h-8" />} title="Revenue Streams">
        <ul className="space-y-3 text-gray-400">
          <li>• Premium Subscriptions ($15-30/month per user)</li>
          <li>• Enterprise Licensing ($5,000-20,000/year)</li>
          <li>• Professional Certifications ($199-499 per certification)</li>
          <li>• Custom Corporate Training Programs ($10,000+ per program)</li>
        </ul>
      </ContentBox>

      <div className="bg-gray-800/50 rounded-lg p-6 border bordergray-700">
        <h3 className="text-xl font-semibold text-gray-200 mb-4">Financial Projections (in millions)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-gray-300">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2">Metric</th>
                <th className="text-right py-2">Year 2</th>
                <th className="text-right py-2">Year 3</th>
                <th className="text-right py-2">Year 4</th>
                <th className="text-right py-2">Year 5</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="py-2">Revenue</td>
                <td className="text-right">$2.5M</td>
                <td className="text-right">$5.8M</td>
                <td className="text-right">$12.4M</td>
                <td className="text-right">$25.2M</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2">Operating Costs</td>
                <td className="text-right">$1.0M</td>
                <td className="text-right">$2.3M</td>
                <td className="text-right">$4.9M</td>
                <td className="text-right">$10.1M</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2">Gross Margin</td>
                <td className="text-right">60%</td>
                <td className="text-right">65%</td>
                <td className="text-right">68%</td>
                <td className="text-right">70%</td>
              </tr>
              <tr>
                <td className="py-2">Net Profit</td>
                <td className="text-right text-green-400">$0.5M</td>
                <td className="text-right text-green-400">$1.7M</td>
                <td className="text-right text-green-400">$4.3M</td>
                <td className="text-right text-green-400">$10.1M</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentBox icon={<Target className="w-8 h-8" />} title="Key Financial Metrics">
          <ul className="space-y-3 text-gray-400">
            <li>• User Acquisition Cost (CAC): $10-$20 per active user</li>
            <li>• Customer Lifetime Value (LTV): $300+ per premium user</li>
            <li>• Conversion Rate: 5-10% free to paid users</li>
            <li>• Operating Margins: &gt;60% (digital scalability)</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Building className="w-8 h-8" />} title="Enterprise Growth">
          <ul className="space-y-3 text-gray-400">
            <li>• 10-50 enterprise clients within 5 years</li>
            <li>• Average contract value: $10,000+</li>
            <li>• 85% enterprise retention rate</li>
            <li>• Custom solutions &amp; white-label options</li>
          </ul>
        </ContentBox>
      </div>
    </div>
  </Slide>
);

export const ctaSlide = (
  <Slide key="cta" className="text-center bg-gradient-to-br from-blue-600 to-blue-800 text-white">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo className="text-white mx-auto mb-8 h-16 w-auto" />
      <h2 className="text-3xl mb-8 text-gray-200">Join the Future of AI &amp; Blockchain Education</h2>
    </motion.div>
  </Slide>
);

export const modulesSlide = (
  <Slide key="modules">
    <SlideTitle title="Our Modules: A Comprehensive Curriculum" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ContentBox icon={<BookOpen className="w-6 h-6" />} title="Fundamentals of AI">
        <p className="text-gray-400">Covering essential concepts, algorithms, and techniques in artificial intelligence.</p>
      </ContentBox>
      <ContentBox icon={<BookOpen className="w-6 h-6" />} title="Blockchain Technology">
        <p className="text-gray-400">Exploring the fundamentals of blockchain, cryptocurrencies, smart contracts, and decentralized applications.</p>
      </ContentBox>
      <ContentBox icon={<BookOpen className="w-6 h-6" />} title="AI &amp; Blockchain Integration">
        <p className="text-gray-400">Delving into the synergy between AI and blockchain, exploring real-world applications and innovative use cases.</p>
      </ContentBox>
    </div>
  </Slide>
);

export const roadmapSlide = (
  <Slide key="roadmap">
    <SlideTitle title="Roadmap:  Our Vision for the Future" />
    <div className="space-y-4">
      <ContentBox icon={<Target className="w-6 h-6" />} title="2025 Milestones">
        <p className="text-gray-400">Platform launch, initial user acquisition, and strategic partnerships.</p>
      </ContentBox>
      <ContentBox icon={<Target className="w-6 h-6" />} title="2026 Goals">
        <p className="text-gray-400">Expand curriculum, increase user base, and explore international markets.</p>
      </ContentBox>
    </div>
  </Slide>
);

export const progressSlide = (
  <Slide key="progress">
    <SlideTitle title="Progress to Date:  Building a Strong Foundation" />
    <ContentBox icon={<Trophy className="w-6 h-6" />} title="Key Achievements">
      <p className="text-gray-400">Completed core platform development, secured key partnerships, and established a strong team.</p>
    </ContentBox>
  </Slide>
);

export const dataStrategySlide = (
  <Slide key="dataStrategy">
    <SlideTitle 
      title="How We Track &amp; Use Data" 
      subtitle="Building AI-Powered Learning Experiences"
    />
    <div className="space-y-8">
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <svg
          viewBox="0 0 800 200"
          className="w-full h-auto"
          style={{ maxHeight: '200px' }}
        >
          {/* Background */}
          <rect width="800" height="200" fill="#1a1b1e" rx="10" />

          {/* User Interaction Layer */}
          <g transform="translate(50, 50)">
            <rect width="150" height="60" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" rx="5" />
            <text x="75" y="25" fill="#3b82f6" textAnchor="middle" fontSize="14">User Interactions</text>
            <text x="75" y="45" fill="#9ca3af" textAnchor="middle" fontSize="12">Event Tracking</text>
          </g>

          {/* Processing Layer */}
          <g transform="translate(325, 50)">
            <rect width="150" height="60" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" rx="5" />
            <text x="75" y="25" fill="#10b981" textAnchor="middle" fontSize="14">Data Processing</text>
            <text x="75" y="45" fill="#9ca3af" textAnchor="middle" fontSize="12">Apache Kafka</text>
          </g>

          {/* Storage Layer */}
          <g transform="translate(600, 50)">
            <rect width="150" height="60" fill="#8b5cf6" fillOpacity="0.1" stroke="#8b5cf6" strokeWidth="2" rx="5" />
            <text x="75" y="25" fill="#8b5cf6" textAnchor="middle" fontSize="14">Data Storage</text>
            <text x="75" y="45" fill="#9ca3af" textAnchor="middle" fontSize="12">PostgreSQL + Redis</text>
          </g>

          {/* Connection Lines */}
          <g stroke="#4b5563" strokeWidth="2" strokeDasharray="5,5">
            <path d="M200,80 L325,80" />
            <path d="M475,80 L600,80" />
          </g>

          {/* Flow Arrows */}
          <g fill="#4b5563">
            <polygon points="320,77 330,80 320,83" />
            <polygon points="595,77 605,80 595,83" />
          </g>
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentBox icon={<Code className="w-8 h-8" />} title="Analytics &amp; Processing">
          <ul className="space-y-3 text-gray-400">
            <li>• Real-time event tracking with Apache Kafka</li>
            <li>• Custom analytics pipeline built with Node.js</li>
            <li>• Machine learning models for pattern recognition</li>
            <li>• Automated data aggregation and processing</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Database className="w-8 h-8" />} title="Storage &amp; Integration">
          <ul className="space-y-3 text-gray-400">
            <li>• PostgreSQL for persistent data storage</li>
            <li>• Redis for caching and real-time features</li>
            <li>• Secure API integrations with OpenAI</li>
            <li>• Distributed data processing architecture</li>
          </ul>
        </ContentBox>
      </div>
    </div>
  </Slide>
);

export const fundingRequirementsSlide = (
  <Slide key="fundingRequirements">
    <SlideTitle 
      title="Funding Requirements" 
      subtitle="Investing in the Future"
    />
    <div className="space-y-8">
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          To date, I have built everything myself at a minimal cost. I believe that with a team and relatively small budget I can rapidly build the platform&#39;s capabilities and onboard users.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          To scale Sulla effectively, we require funding that supports key areas: content expansion, marketing, platform improvements, and operational growth. Our focus is on building a user-centric platform with AI-driven personalization, ensuring high engagement and long-term retention.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed">
          We have strategically allocated funds to maximize user acquisition in the first 12 months while setting up monetization in the second year. Security, legal compliance, and infrastructure enhancements are also prioritized to support future scalability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentBox icon={<Users className="w-8 h-8" />} title="Team Building &amp; Operations">
          <ul className="space-y-3 text-gray-400">
            <li>• Core development team recruitment</li>
            <li>• AI/ML specialists and data scientists</li>
            <li>• Content creation and curriculum experts</li>
            <li>• Customer support and operations staff</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Brain className="w-8 h-8" />} title="Technology &amp; Infrastructure">
          <ul className="space-y-3 text-gray-400">
            <li>• AI model development and training</li>
            <li>• Platform scalability improvements</li>
            <li>• Security and compliance enhancements</li>
            <li>• Advanced analytics implementation</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Rocket className="w-8 h-8" />} title="Marketing &amp; User Acquisition">
          <ul className="space-y-3 text-gray-400">
            <li>• Digital marketing campaigns</li>
            <li>• Educational partnerships</li>
            <li>• Community building initiatives</li>
            <li>• Brand awareness development</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Layout className="w-8 h-8" />} title="Content &amp; Product Development">
          <ul className="space-y-3 text-gray-400">
            <li>• Course content expansion</li>
            <li>• Interactive learning tools</li>
            <li>• Mobile app development</li>
            <li>• User experience enhancement</li>
          </ul>
        </ContentBox>
      </div>
    </div>
  </Slide>
);

export const fundingAllocationSlide = (
  <Slide key="fundingAllocation">
    <SlideTitle 
      title="Use of Funds" 
      subtitle="Strategic Allocation"
    />
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentBox icon={<BookOpen className="w-8 h-8" />} title="Content Expansion - $50K">
          <ul className="space-y-3 text-gray-400">
            <li>• Development of advanced AI &amp; blockchain courses</li>
            <li>• Creation of interactive learning materials</li>
            <li>• Professional certification programs</li>
            <li>• Industry-specific content modules</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Rocket className="w-8 h-8" />} title="Marketing &amp; User Acquisition - $50K">
          <ul className="space-y-3 text-gray-400">
            <li>• Digital marketing and SEO optimization</li>
            <li>• Educational influencer partnerships</li>
            <li>• Community engagement programs</li>
            <li>• Early adopter incentives</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Building className="w-8 h-8" />} title="Business Development - $50K">
          <ul className="space-y-3 text-gray-400">
            <li>• Strategic partnership development</li>
            <li>• Enterprise client acquisition</li>
            <li>• Educational institution collaborations</li>
            <li>• Industry alliance building</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Brain className="w-8 h-8" />} title="Platform Enhancements - $100K">
          <ul className="space-y-3 text-gray-400">
            <li>• AI algorithm development and training</li>
            <li>• Gamification features implementation</li>
            <li>• User experience improvements</li>
            <li>• Performance optimization</li>
          </ul>
        </ContentBox>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentBox icon={<Shield className="w-8 h-8" />} title="Legal &amp; Compliance - $50K">
          <ul className="space-y-3 text-gray-400">
            <li>• Regulatory compliance implementation</li>
            <li>• Legal documentation and contracts</li>
            <li>• Privacy policy development</li>
            <li>• Intellectual property protection</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Users className="w-8 h-8" />} title="Operational Costs - $200K">
          <ul className="space-y-3 text-gray-400">
            <li>• Core team salaries and benefits</li>
            <li>• Office and infrastructure costs</li>
            <li>• Administrative expenses</li>
            <li>• Professional services</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Database className="w-8 h-8" />} title="Security &amp; Maintenance - $100K">
          <ul className="space-y-3 text-gray-400">
            <li>• Security infrastructure setup</li>
            <li>• Continuous monitoring systems</li>
            <li>• Backup and recovery solutions</li>
            <li>• Regular security audits</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Wallet className="w-8 h-8" />} title="Buffer Fund - $50K">
          <ul className="space-y-3 text-gray-400">
            <li>• Emergency operational expenses</li>
            <li>• Opportunity investments</li>
            <li>• Market response flexibility</li>
            <li>• Risk management reserve</li>
          </ul>
        </ContentBox>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-blue-400">Total Funding Needed</h3>
          <span className="text-2xl font-bold text-blue-400">$650K</span>
        </div>
        <p className="text-gray-300 text-lg">
          Break-even is expected in 18-24 months, with user acquisition as the top priority in the first year.
        </p>
      </div>
    </div>
  </Slide>
);

export const financialModelSlide = (
  <Slide key="financialModel">
    <SlideTitle 
      title="Sulla's Financial Model" 
      subtitle="Revenue Projections &amp; Key Metrics"
    />
    <div className="space-y-8">
      <ContentBox icon={<DollarSign className="w-8 h-8" />} title="Revenue Streams">
        <ul className="space-y-3 text-gray-400">
          <li>• Premium Subscriptions ($15-30/month per user)</li>
          <li>• Enterprise Licensing ($5,000-20,000/year)</li>
          <li>• Professional Certifications ($199-499 per certification)</li>
          <li>• Custom Corporate Training Programs ($10,000+ per program)</li>
        </ul>
      </ContentBox>

      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-gray-200 mb-4">Financial Projections (in millions)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-gray-300">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2">Metric</th>
                <th className="text-right py-2">Year 2</th>
                <th className="text-right py-2">Year 3</th>
                <th className="text-right py-2">Year 4</th>
                <th className="text-right py-2">Year 5</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="py-2">Revenue</td>
                <td className="text-right">$2.5M</td>
                <td className="text-right">$5.8M</td>
                <td className="text-right">$12.4M</td>
                <td className="text-right">$25.2M</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2">Operating Costs</td>
                <td className="text-right">$1.0M</td>
                <td className="text-right">$2.3M</td>
                <td className="text-right">$4.9M</td>
                <td className="text-right">$10.1M</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2">Gross Margin</td>
                <td className="text-right">60%</td>
                <td className="text-right">65%</td>
                <td className="text-right">68%</td>
                <td className="text-right">70%</td>
              </tr>
              <tr>
                <td className="py-2">Net Profit</td>
                <td className="text-right text-green-400">$0.5M</td>
                <td className="text-right text-green-400">$1.7M</td>
                <td className="text-right text-green-400">$4.3M</td>
                <td className="text-right text-green-400">$10.1M</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentBox icon={<Target className="w-8 h-8" />} title="Key Financial Metrics">
          <ul className="space-y-3 text-gray-400">
            <li>• User Acquisition Cost (CAC): $10-$20 per active user</li>
            <li>• Customer Lifetime Value (LTV): $300+ per premium user</li>
            <li>• Conversion Rate: 5-10% free to paid users</li>
            <li>• Operating Margins: &gt;60% (digital scalability)</li>
          </ul>
        </ContentBox>
        <ContentBox icon={<Building className="w-8 h-8" />} title="Enterprise Growth">
          <ul className="space-y-3 text-gray-400">
            <li>• 10-50 enterprise clients within 5 years</li>
            <li>• Average contract value: $10,000+</li>
            <li>• 85% enterprise retention rate</li>
            <li>• Custom solutions &amp; white-label options</li>
          </ul>
        </ContentBox>
      </div>
    </div>
  </Slide>
);

export const ctaSlide = (
  <Slide key="cta" className="text-center bg-gradient-to-br from-blue-600 to-blue-800 text-white">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo className="text-white mx-auto mb-8 h-16 w-auto" />
      <h2 className="text-3xl mb-8 text-gray-200">Join the Future of AI &amp; Blockchain Education</h2>
    </motion.div>
  </Slide>
);