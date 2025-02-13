</motion.div>
</Slide>;

const whatIsBuiltSlide = <Slide key="whats-built">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-green-500/20 rounded-lg">
        <CheckCircle className="w-8 h-8 text-green-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">What's Been Built</h2>
    </div>
    <div className="space-y-6">
      <Card className="bg-blue-900/30 p-6">
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">First Course Launch Success</h3>
        <div className="space-y-4">
          {[
            {
              icon: Book,
              title: "Understanding Cryptocurrency",
              desc: "Evolution of money and digital assets"
            },
            {
              icon: Blocks,
              title: "Bitcoin & Ethereum Basics",
              desc: "Deep dive into technology and use cases"
            },
            {
              icon: Lock,
              title: "Security & Risk Management",
              desc: "Asset protection and scam prevention"
            }
          ].map((module, index) => (
            <motion.div
              key={index}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-start gap-4"
            >
              <div className="p-2 bg-blue-400/20 rounded-full mt-1">
                <module.icon className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-blue-300 mb-1">{module.title}</h4>
                <p className="text-blue-100">{module.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      <Card className="bg-blue-900/30 p-6">
        <p className="text-lg text-blue-100 mb-4">
          This course serves as a proven framework for future course expansion and has been tested with early users, providing valuable data to refine the platform.
        </p>
        <p className="text-lg text-blue-100">
          The entire platform, including the learning management system and course delivery infrastructure, has been built from the ground up using proprietary code. This gives us complete control over the user experience and allows us to rapidly adapt the platform based on user feedback and emerging market needs.
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Monitor, text: "React.js frontend" },
          { icon: Terminal, text: "Node.js backend" },
          { icon: Building, text: "PostgreSQL database" },
          { icon: Code, text: "TypeScript" },
          { icon: Blocks, text: "Blockchain integration" }
        ].map((tech, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-4 rounded-lg flex items-center gap-3"
          >
            <tech.icon className="w-5 h-5 text-blue-400" />
            <span className="text-blue-100">{tech.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
</Slide>;

const goToMarketSlide = <Slide key="go-to-market">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-blue-500/20 rounded-lg">
        <Rocket className="w-8 h-8 text-blue-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">Go-to-Market Strategy</h2>
    </div>
    <div className="space-y-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
      >
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">Phase 1: Community Growth (0-6 Months)</h3>
        <ul className="space-y-3">
          {[
            "Leverage Web3 Twitter, Discord, and Telegram for viral adoption",
            "Run interactive quizzes & NFT rewards to engage users",
            "YouTube & influencer partnerships for educational content distribution",
            "SEO & content strategy for long-term organic traffic"
          ].map((item, index) => (
            <motion.li
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-3 text-blue-100"
            >
              <ArrowRight className="w-4 h4 text-blue-400 flex-shrink-0" />
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
      >
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">Phase 2: Pre-Monetization & User Scaling (6-12 Months)</h3>
        <ul className="space-y-3">
          {[
            "Expand AI learning personalization with increased user data",
            "Optimize onboarding experience for engagement and retention",
            "Strengthen partnerships with crypto projects, DAOs, and institutions"
          ].map((item, index) => (
            <motion.li
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-3 text-blue-100"
            >
              <ArrowRight className="w-4 h-4 text-blue-400 flex-shrink-0" />
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  </motion.div>
</Slide>;

const growthExpansionSlide = <Slide key="growth-expansion">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-green-500/20 rounded-lg">
        <BarChart2 className="w-8 h-8 text-green-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">Growth & Expansion Strategy</h2>
    </div>
    <div className="space-y-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
      >
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">Phase 3: Monetization & Scaling (12-18 Months)</h3>
        <ul className="space-y-3">
          {[
            "Launch paid subscriptions & B2B deals with exchanges & fintechs",
            "Secure institutional licensing with universities & corporate training programs",
            "Expand platform features, AI-driven learning tools, and gamification"
          ].map((item, index) => (
            <motion.li
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-3 text-blue-100"
            >
              <Building className="w-4 h-4 text-blue-400 flex-shrink-0" />
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
      >
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">Phase 4: Global Expansion (18-24 Months)</h3>
        <ul className="space-y-3">
          {[
            "Multi-language support for Europe, LATAM, and Asia",
            "Partnerships with blockchain-based job networks",
            "Web3 education DAO for decentralized governance & course development"
          ].map((item, index) => (
            <motion.li
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-3 text-blue-100"
            >
              <Globe className="w-4 h-4 text-blue-400 flex-shrink-0" />
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  </motion.div>
</Slide>;

const teamSlide = <Slide key="team">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-blue-500/20 rounded-lg">
        <Users className="w-8 h-8 text-blue-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">The Team</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        {
          role: "Founder - Lewis Olden",
          description: "Entrepreneur with finance & education expertise"
        },
        {
          role: "CTO",
          description: "Blockchain developer & AI specialist"
        },
        {
          role: "Head of Content",
          description: "Crypto educator & research analyst"
        },
        {
          role: "Marketing Lead",
          description: "Web3 community builder & digital strategist"
        }
      ].map((member, index) => (
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-blue-300">{member.role}</h3>
          </div>
          <p className="text-blue-100">{member.description}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
</Slide>;

const joinUsSlide = <Slide key="join-us">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-purple-500/20 rounded-lg">
        <MessageCircle className="w-8 h-8 text-purple-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">Join Us</h2>
    </div>
    <Card className="bg-blue-900/30 p-6 mb-8">
      <h3 className="text-2xl font-semibold text-blue-300 mb-4">
        Join us in revolutionizing crypto education
      </h3>
      <p className="text-lg text-blue-100 mb-4">
        Seeking investors, partners, and early adopters
      </p>
    </Card>
    <div className="space-y-4">
      {[
        { icon: Mail, text: "Email: lewis@sullacrypto.com" },
        { icon: Twitter, text: "Twitter: @SullaCrypto" },
        { icon: Globe2, text: "Website: sullacrypto.com" }
      ].map((contact, index) => (
        <motion.div
          key={index}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="flex items-center gap-4 bg-blue-900/30 p-4 rounded-lg"
        >
          <contact.icon className="w-6 h-6 text-blue-400" />
          <p className="text-lg text-blue-100">{contact.text}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
</Slide>;

const tokenIntegrationSlide = <Slide key="token-integration">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-purple-500/20 rounded-lg">
        <Coins className="w-8 h-8 text-purple-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">Future Token Integration</h2>
    </div>
    <Card className="bg-blue-900/30 p-6 mb-8">
      <p className="text-lg text-blue-100 mb-4">
        As Sulla continues to grow and establish itself as a trusted leader in crypto education, 
        the possibility of a future token launch will be carefully evaluated. A token integration 
        will only be pursued once the platform has amassed a large and engaged user base, ensuring 
        that it provides genuine value rather than speculative trading.
      </p>
      <p className="text-lg text-blue-100">
        As an education platform, our integrity and reputation are paramount. Any token launch 
        must be meticulously designed and responsibly executed to enhance the user experience 
        and strengthen the ecosystem in a meaningful way.
      </p>
    </Card>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        {
          icon: Trophy,
          title: "Tokenized Rewards",
          description: "Users earn tokens for completing courses, contributing to the community, and achieving learning milestones"
        },
        {
          icon: Lock,
          title: "Staking for Premium Access",
          description: "Users stake tokens to unlock advanced courses and exclusive content"
        },
        {
          icon: Users,
          title: "Decentralized Governance",
          description: "Token holders vote on course additions, platform updates, and feature prioritization"
        },
        {
          icon: Network,
          title: "Marketplace & Peer Learning",
          description: "Incentivizing expert contributions, tutoring, and user-generated content with token rewards"
        }
      ].map((feature, index) => (
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <feature.icon className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-blue-300">{feature.title}</h3>
          </div>
          <p className="text-blue-100">{feature.description}</p>
        </motion.div>
      ))}
    </div>

    <Card className="bg-blue-900/30 p-6 mt-8">
      <p className="text-lg text-blue-100">
        The Sulla token will serve as the backbone of an ecosystem, ensuring long-term engagement, 
        responsible adoption, and community-driven growth. We are committed to designing a token 
        model that aligns with educational integrity, transparency, and user empowerment, while 
        preventing speculative risks.
      </p>
    </Card>
  </motion.div>
</Slide>;

const tractionSlide = <Slide key="traction">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-green-500/20 rounded-lg">
        <BarChart className="w-8 h-8 text-green-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">Traction & Milestones</h2>
    </div>
    <Card className="bg-blue-900/30 p-6 mb-8">
      <p className="text-lg text-blue-100">
        Our primary goal in the first 12 months is to onboard as many users as possible, 
        as more user data improves our AI capabilities.
      </p>
    </Card>

    <div className="space-y-6">
      {[
        {
          icon: Users,
          phase: "0-12M: Community Growth",
          metrics: "100K users, 10K Discord members"
        },
        {
          icon: BarChart,
          phase: "12-18M: Monetization",
          metrics: "First $500K revenue from subscriptions & B2B deals"
        },
        {
          icon: Building2,
          phase: "18-24M: Institutional",
          metrics: "500K+ users, major fintech & university partnerships"
        },
        {
          icon: Globe2,
          phase: "24M+: Global",
          metrics: "1M users, $5M+ ARR"
        }
      ].map((milestone, index) => (
        <motion.div
          key={index}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.2 }}
          className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-6 rounded-lg"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-400/20 rounded-full">
              <milestone.icon className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-300">{milestone.phase}</h3>
              <p className="text-blue-100">{milestone.metrics}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
</Slide>;

const financialSlide = <Slide key="financial">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-green-500/20 rounded-lg">
        <LineChart className="w-8 h-8 text-green-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">5-Year Financial Forecasts & Growth Projections</h2>
    </div>
    <Card className="bg-blue-900/30 p-6 mb-8">
      <p className="text-lg text-blue-100">
        As Sulla scales, we project significant growth in user adoption, revenue streams, and enterprise partnerships. 
        Below is our 5-year financial outlook, assuming steady market adoption and expansion of our platform features.
      </p>
    </Card>

    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-blue-900/30">
            <th className="px-4 py-3 text-left text-blue-300">Metric</th>
            <th className="px-4 py-3 text-left text-blue-300">Year 1</th>
            <th className="px-4 py-3 text-left text-blue-300">Year 2</th>
            <th className="px-4 py-3 text-left text-blue-300">Year 3</th>
            <th className="px-4 py-3 text-left text-blue-300">Year 4</th>
            <th className="px-4 py-3 text-left text-blue-300">Year 5</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-3 text-blue-100 font-semibold">Revenue</td>
            <td className="px-4 py-3 text-blue-100">$0 (User Growth Focus)</td>
            <td className="px-4 py-3 text-blue-100">$500K</td>
            <td className="px-4 py-3 text-blue-100">$2M - $5M</td>
            <td className="px-4 py-3 text-blue-100">$10M+</td>
            <td className="px-4 py-3 text-blue-100">$20M+</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-blue-100 font-semibold">Expenses</td>
            <td className="px-4 py-3 text-blue-100">$400K - $500K</td>
            <td className="px-4 py-3 text-blue-100">$1.2M</td>
            <td className="px-4 py-3 text-blue-100">$3M</td>
            <td className="px-4 py-3 text-blue-100">$6M</td>
            <td className="px-4 py-3 text-blue-100">$10M</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-blue-100 font-semibold">Net Profit</td>
            <td className="px-4 py-3 text-red-400">($400K - $500K) Loss</td>
            <td className="px-4 py-3 text-red-400">($700K) Loss</td>
            <td className="px-4 py-3 text-green-400">Break-even to $2M Profit</td>
            <td className="px-4 py-3 text-green-400">$4M+ Profit</td>
            <td className="px-4 py-3 text-green-400">$10M+ Profit</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-blue-100 font-semibold">Tech & Development</td>
            <td className="px-4 py-3 text-blue-100">$300K</td>
            <td className="px-4 py-3 text-blue-100">$1M</td>
            <td className="px-4 py-3 text-blue-100">$2M</td>
            <td className="px-4 py-3 text-blue-100">$4M</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-blue-100 font-semibold">Marketing Spend</td>
            <td className="px-4 py-3 text-blue-100">$150K</td>
            <td className="px-4 py-3 text-blue-100">$400K</td>
            <td className="px-4 py-3 text-blue-100">$1M</td>
            <td className="px-4 py-3 text-blue-100">$2M</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-blue-100 font-semibold">Operational Costs</td>
            <td className="px-4 py-3 text-blue-100">$750K</td>
            <td className="px-4 py-3 text-blue-100">$1.5M</td>
            <td className="px-4 py-3 text-blue-100">$3M</td>
            <td className="px-4 py-3 text-blue-100">$4M</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-blue-100 font-semibold">Profitability Projection</td>
            <td className="px-4 py-3 text-red-400">($700K) Loss</td>
            <td className="px-4 py-3 text-green-400">Break-even to $2M Profit</td>
            <td className="px-4 py-3 text-green-400">$4M+ Profit</td>
            <td className="px-4 py-3 text-green-400">$10M+ Profit</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-blue-300 mb-4">Revenue Growth Drivers</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            icon: Wallet,
            title: "Subscription Plans",
            description: "Users pay $9.99 - $49.99/month for premium courses"
          },
          {
            icon: Building,
            title: "Institutional Licensing",
            description: "Crypto exchanges, fintech firms, and universities integrate Sulla's courses"
          },
          {
            icon: Award,
            title: "NFT-Based Certifications",
            description: "Users pay $99 - $499 for blockchain-backed credentials"
          },
          {
            icon: MessageCircle,
            title: "Sponsored Content & Partnerships",
            description: "Crypto brands pay to feature learning modules"
          },
          {
            icon: Trophy,
            title: "Gamified Microtransactions",
            description: "Monetization of in-app rewards and premium content"
          }
        ].map((driver, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 p-4 rounded-lg"
          >
            <div className="flex items-center gap-3 mb-2">
              <driver.icon className="w-5 h-5 text-blue-400" />
              <h4 className="font-semibold text-blue-300">{driver.title}</h4>
            </div>
            <p className="text-blue-100 text-sm">{driver.description}</p>
          </motion.div>
        ))}
      </div>
    </div>

    <Card className="bg-blue-900/30 p-6 mt-8">
      <div className="flex items-start gap-3">
        <span className="text-2xl">📌</span>
        <p className="text-lg text-blue-100">
          Year 1 is dedicated solely to user acquisition, with revenue generation beginning in Year 2 once a critical mass of engaged users has been established. 
          Given the anticipated burn rate, we will likely need to raise additional funding in Year 2 to sustain momentum and continue scaling effectively.
        </p>
      </div>
    </Card>
  </motion.div>
</Slide>;

const financialModelSlide = <Slide key="financial-model">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-purple-500/20 rounded-lg">
        <LineChart className="w-8 h-8 text-purple-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">Comprehensive Financial Model</h2>
    </div>
    <Card className="bg-blue-900/30 p-6 mb-8">
      <p className="text-lg text-blue-100">
        Sulla's financial model is structured to ensure long-term sustainability, strong cash flow, and strategic reinvestment into growth.
      </p>
    </Card>

    <Card className="bg-blue-900/30 p-6">
      <h3 className="text-xl font-semibold text-blue-300 mb-4">Key Financial Assumptions</h3>
      <ul className="space-y-3">
        <li className="flex items-start">
          <span className="text-blue-400 mr-3">•</span>
          <div>
            <span className="font-semibold text-blue-300">User Acquisition Cost (CAC):</span>
            <span className="ml-2 text-blue-100">$10-$20 per active user</span>
          </div>
        </li>
        <li className="flex items-start">
          <span className="text-blue-400 mr-3">•</span>
          <div>
            <span className="font-semibold text-blue-300">Customer Lifetime Value (LTV):</span>
            <span className="ml-2 text-blue-100">$300+ per premium user</span>
          </div>
        </li>
        <li className="flex items-start">
          <span className="text-blue-400 mr-3">•</span>
          <div>
            <span className="font-semibold text-blue-300">Conversion Rate:</span>
            <span className="ml-2 text-blue-100">5-10% of free users upgrade to paid plans</span>
          </div>
        </li>
        <li className="flex items-start">
          <span className="text-blue-400 mr-3">•</span>
          <div>
            <span className="font-semibold text-blue-300">Institutional Partnerships:</span>
            <span className="ml-2 text-blue-100">10-50 enterprise clients within 5 years</span>
          </div>
        </li>
        <li className="flex items-start">
          <span className="text-blue-400 mr-3">•</span>
          <div>
            <span className="font-semibold text-blue-300">Operating Margins:</span>
            <span className="ml-2 text-blue-100">Greater than 60% due to digital content scalability</span>
          </div>
        </li>
      </ul>
    </Card>

    <div className="overflow-x-auto mt-8">
      <h3 className="text-2xl fontsemibold text-blue-300 mb-4">Projected Financial Breakdown (Year 2-5)</h3>
      <table className="w-full">
        <thead>
          <tr className="bg-blue-900/30">
            <th className="px-4 py-3 text-left text-blue-300">Category</th>
            <th className="px-4 py-3 text-left text-blue-300">Year 2</th>
            <th className="px-4 py-3 text-left text-blue-300">Year 3</th>
            <th className="px-4 py-3 text-left text-blue-300">Year 4</th>
            <th className="px-4 py-3 text-left text-blue-300">Year 5</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-3 text-blue-100 font-semibold">Revenue</td>
            <td className="px-4 py-3 text-blue-100">$500K</td>
            <td className="px-4 py-3 text-blue-100">$2M-$5M</td>
            <td className="px-4 py-3 text-blue-100">$10M+</td>
            <td className="px-4 py-3 text-blue-100">$20M+</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-blue-100 font-semibold">Marketing Spend</td>
            <td className="px-4 py-3 text-blue-100">$150K</td>
            <td className="px-4 py-3 text-blue-100">$400K</td>
            <td className="px-4 py-3 text-blue-100">$1M</td>
            <td className="px-4 py-3 text-blue-100">$2M</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-blue-100 font-semibold">Tech & Development</td>
            <td className="px-4 py-3 text-blue-100">$300K</td>
            <td className="px-4 py-3 text-blue-100">$1M</td>
            <td className="px-4 py-3 text-blue-100">$2M</td>
            <td className="px-4 py-3 text-blue-100">$4M</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-blue-100 font-semibold">Operational Costs</td>
            <td className="px-4 py-3 text-blue-100">$750K</td>
            <td className="px-4 py-3 text-blue-100">$1.5M</td>
            <td className="px-4 py-3 text-blue-100">$3M</td>
            <td className="px-4 py-3 text-blue-100">$4M</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-blue-100 font-semibold">Profitability Projection</td>
            <td className="px-4 py-3 text-red-400">($700K) Loss</td>
            <td className="px-4 py-3 text-green-400">Break-even to $2M Profit</td>
            <td className="px-4 py-3 text-green-400">$4M+ Profit</td>
            <td className="px-4 py-3 text-green-400">$10M+ Profit</td>
          </tr>
        </tbody>
      </table>
    </div>

    <Card className="bg-blue-900/30 p-6 mt-8">
      <h3 className="text-2xl font-semibold text-blue-300 mb-4">Break-Even & Scalability</h3>
      <ul className="space-y-3">
        <li className="flex items-start">
          <span className="text-blue-400 mr-3">•</span>
          <p className="text-blue-100">Break-even occurs in Year 3, following an aggressive user acquisition phase in Year 1 and modest monetization in Year 2.</p>
        </li>
        <li className="flex items-start">
          <span className="text-blue-400 mr-3">•</span>
          <p className="text-blue-100">High-margin digital content model ensures scalability with minimal additional costs per new user.</p>
        </li>
        <li className="flex items-start">
          <span className="text-blue-400 mr-3">•</span>
          <p className="text-blue-100">Future Token Integration (post-500K users) will unlock additional revenue streams through staking, governance, and in-platform rewards.</p>
        </li>
      </ul>
    </Card>
  </motion.div>
</Slide>;

const fundingNarrativeSlide = <Slide key="funding-narrative">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-blue-500/20 rounded-lg">
        <LineChart className="w-8 h-8 text-blue-400" />
      </div>
      <h2 className="text-4xl font-bold text-blue-400">Funding Requirements</h2>
    </div>
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="bg-blue-900/30 p-6 mb-6">
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">Narrative</h3>
        <p className="text-lg text-blue-100 mb-4">
          To scale Sulla effectively, we require funding that supports key areas: content expansion, 
          marketing, platform improvements, and operational growth. Our focus is on building a 
          user-centric platform with AI-driven personalization, ensuring high engagement and 
          long-term retention.
        </p>
        <p className="text-lg text-blue-100">
          We have strategically allocated funds to maximize user acquisition in the first 12 months 
          while setting up monetization in the second year. Security, legal compliance, and 
          infrastructure enhancements are also prioritized to support future scalability.
        </p>
      </Card>
    </motion.div>
  </motion.div>
</Slide>;

const fundingBreakdownSlide = <Slide key="funding-breakdown">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-3xl font-bold mb-6 text-blue-400">Funding Breakdown</h2>
    <div className="spacey-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-blue-900/30 p-4">
          <h3 className="font-semibold text-blue-300 mb-2">Content Expansion</h3>
          <p className="text-lg text-blue-100">$50K</p>
          <p className="text-sm text-blue-200">Develop additional courses and certifications</p>
        </Card>
        <Card className="bg-blue-900/30 p-4">
          <h3 className="font-semibold text-blue-300 mb-2">Marketing & User Acquisition</h3>
          <p className="text-lg text-blue-100">$50K</p>
          <p className="text-sm text-blue-200">Build brand awareness and onboard early adopters</p>
        </Card>
        <Card className="bg-blue-900/30 p-4">
          <h3 className="font-semibold text-blue-300 mb-2">Business Development</h3>
          <p className="text-lg text-blue-100">$50K</p>
          <p className="text-sm text-blue-200">Secure partnerships and institutional deals</p>
        </Card>
        <Card className="bg-blue-900/30 p-4">
          <h3 className="font-semibold text-blue-300 mb-2">Platform Enhancements</h3>
          <p className="text-lg text-blue-100">$100K</p>
          <p className="text-sm text-blue-200">Improve AI learning algorithms and gamification</p>
        </Card>
        <Card className="bg-blue-900/30 p-4">
          <h3 className="font-semibold text-blue-300 mb-2">Legal & Compliance</h3>
          <p className="text-lg text-blue-100">$50K</p>
          <p className="text-sm text-blue-200">Ensure regulatory compliance for sustainability</p>
        </Card>
        <Card className="bg-blue-900/30 p-4">
          <h3 className="font-semibold text-blue-300 mb-2">Operational Costs</h3>
          <p className="text-lg text-blue-100">$200K</p>
          <p className="text-sm text-blue-200">Support core team and day-to-day operations</p>
        </Card>
        <Card className="bg-blue-900/30 p-4">
          <h3 className="font-semibold text-blue-300 mb-2">Security &Maintenance</h3>
          <p className="text-lg text-blue-100">$100K</p>
          <p className="text-sm text-blue-200">Protect user data and enhance system resilience</p>
        </Card>
        <Card className="bg-blue-900/30 p-4">
          <h3 className="font-semibold text-blue-300 mb-2">Buffer Fund</h3>
          <p className="text-lg text-blue-100">$50K</p>
          <p className="text-sm text-blue-200">Flexibility for unforeseen operational needs</p>
        </Card>
      </div>
      <Card className="bg-blue-900/30 p-6 mt-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-blue-300">Total Funding Needed</h3>
          <p className="text-xl font-bold text-blue-100">$650K</p>
        </div>
        <p className="text-lg mt-2 text-blue-100">Break-even is expected in 18-24 months, with user acquisition as the top priority in the first year.</p>
      </Card>
    </div>
  </motion.div>
</Slide>;

const slides = [
  titleSlide,
  problemSlide,
  solutionSlide,
  featuresSlide,
  missionSlide,
  marketOpportunitySlide,
  marketSizeSlide,
  productOverviewSlide,
  interactiveToolsSlide,
  futureFinanceSlide,
  backendArchitectureSlide,
  roadmapSlide,
  whatIsBuiltSlide,
  goToMarketSlide,
  growthExpansionSlide,
  tokenIntegrationSlide,
  tractionSlide,
  financialSlide,
  financialModelSlide,
  fundingNarrativeSlide,
  fundingBreakdownSlide,
  teamSlide,
  joinUsSlide,
];

const DeckPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-4">
      <div className="max-w-6xl mx-auto">
        {slides[currentSlide]}
        <div className="flex justify-between mt-8">
          <Button
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          <span className="text-blue-200">
            Slide {currentSlide + 1} of {slides.length}
          </span>
          <Button
            onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeckPage;