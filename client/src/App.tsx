import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ProgressProvider } from "@/context/progress-context";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { CourseAssistant } from "@/components/chat/CourseAssistant";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Curriculum from "@/pages/curriculum";
import About from "@/pages/about";
import Games from "@/pages/games";
import WalletSimulator from "@/pages/wallet-simulator";
import Achievements from "@/pages/achievements";
import AIOverview from "@/pages/ai";
import Deck from "@/pages/deck";
import AuthPage from "@/pages/auth-page";
import AccountPage from "@/pages/account";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminUsers from "@/pages/admin/users";
import AdminLogin from "@/pages/admin/login";
import AdminAnalytics from "@/pages/admin/analytics";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import FAQs from "@/pages/faqs";
import LibraryPage from "@/pages/library";
import BlogPost from "@/pages/library/[slug]";

// AI Module imports
import AIModule1 from "@/pages/ai/module1";
import AIIntroduction from "@/pages/ai/module1/introduction";
import AIHowItWorks from "@/pages/ai/module1/how-ai-works";
import AIApplications from "@/pages/ai/module1/ai-applications";
import AIMLBasics from "@/pages/ai/module1/machine-learning-basics";
import AINeuralNetworks from "@/pages/ai/module1/neural-networks";
import AIModule1Quiz from "@/pages/ai/module1/quiz";
import AIModule2 from "@/pages/ai/module2";
import NaturalLanguageProcessing from "@/pages/ai/module2/natural-language-processing";
import ComputerVision from "@/pages/ai/module2/computer-vision";
import RoboticsAutomation from "@/pages/ai/module2/robotics-automation";
import AIEthics from "@/pages/ai/module2/ai-ethics";
import AIModule2Quiz from "@/pages/ai/module2/quiz";
import AIModule3 from "@/pages/ai/module3";
import DeepLearning from "@/pages/ai/module3/deep-learning";
import ReinforcementLearning from "@/pages/ai/module3/reinforcement-learning";
import GenerativeAI from "@/pages/ai/module3/generative-ai";
import FutureAI from "@/pages/ai/module3/future-ai";
import AIModule3Quiz from "@/pages/ai/module3/quiz";


// Module 1 Routes
import Module1Landing from "@/pages/modules/module1";
import Module1Quiz from "@/pages/modules/module1/quiz";
import ModuleExercises from "@/pages/modules/module1/exercises";
import DigitalCurrenciesSection from "@/pages/modules/module1/digital-currencies";
import HistoryOfMoneySection from "@/pages/modules/module1/history-of-money";
import BitcoinSection from "@/pages/modules/module1/bitcoin";
import AltcoinsTokensSection from "@/pages/modules/module1/altcoins-tokens";
import CryptoMarketSection from "@/pages/modules/module1/crypto-market";
import CryptographySection from "@/pages/modules/module1/cryptography";
import SecuritySection from "@/pages/modules/module1/security";
import PracticalApplicationsSection from "@/pages/modules/module1/applications";
import GettingStartedSection from "@/pages/modules/module1/getting-started";

// Module 2 Routes
import Module2Landing from "@/pages/modules/module2";
import BitcoinFundamentalsSection from "@/pages/modules/module2/bitcoin-fundamentals";
import BitcoinInvestmentSection from "@/pages/modules/module2/bitcoin-investment";
import SecurityRiskSection from "@/pages/modules/module2/security-risk";
import Module2Exercises from "@/pages/modules/module2/exercises";
import Module2Quiz from "@/pages/modules/module2/quiz";
// Module 3 Routes
import Module3 from "@/pages/modules/module3";
import EthereumFundamentalsSection from "@/pages/modules/module3/ethereum-fundamentals";
import SmartContractsSection from "@/pages/modules/module3/smart-contracts";
import InvestmentValueSection from "@/pages/modules/module3/investment-value";
import SecurityRisksSection from "@/pages/modules/module3/security-risks";
import Module3Quiz from "@/pages/modules/module3/quiz";
import Module3Exercises from "@/pages/modules/module3/exercises";
// Module 4 Routes
import Module4Landing from "@/pages/modules/module4";
import DigitalVsTraditionalSection from "@/pages/modules/module4/digital-vs-traditional";
import TradingSimulator from "@/pages/trading-simulator";
import GlossaryPage from "@/pages/glossary";
import TechDeckPage from "@/pages/techdeck";
import InvestmentDeck from "@/pages/investment-deck";
import SenseiPage from "@/pages/sensei";
import AdminFeedback from "@/pages/admin/feedback";

// DeFi Module imports
import DefiModule1 from "@/pages/defi/module1";
import DefiIntro from "@/pages/defi/module1/defi-intro";
import BlockchainContracts from "@/pages/defi/module1/blockchain-contracts";
import DexAmm from "@/pages/defi/module1/dex-amm";
import LiquidityYield from "@/pages/defi/module1/liquidity-yield";
import ModuleQuiz from "@/pages/defi/module1/quiz";  // Module 1 quiz
import DefiModule2 from "@/pages/defi/module2";
import LendingBorrowing from "@/pages/defi/module2/lending-borrowing";
import StablecoinsSection from "@/pages/defi/module2/stablecoins";
import DerivativesSection from "@/pages/defi/module2/derivatives";
import GovernanceDAO from "@/pages/defi/module2/governance-dao";
import DefiModule2Quiz from "@/pages/defi/module2/quiz"; // Renamed to avoid conflict
import DefiModule3 from "@/pages/defi/module3";
import AdvancedDefi from "@/pages/defi/module3/advanced-defi";
import DefiSecurity from "@/pages/defi/module3/defi-security"; // Add import
import DefiModule3Quiz from "@/pages/defi/module3/quiz"; // Renamed to avoid conflict
import DefiAnalytics from "@/pages/defi/module3/defi-analytics"; // Add import
import DefiInnovation from "@/pages/defi/module3/defi-innovation"; // Add import
import DefiModule4 from "@/pages/defi/module4"; //Added import for Module 4
import InstitutionalDefi from "@/pages/defi/module4/institutional-defi"; // Add import for Institutional DeFi
import DefiGovernance from "@/pages/defi/module4/defi-governance"; // Add this import
import DefiIntegrations from "@/pages/defi/module4/defi-integrations"; // Add this import
import DefiInfrastructure from "@/pages/defi/module4/defi-infrastructure"; // Add this import
import DefiModule4Quiz from "@/pages/defi/module4/quiz"; // Added import for Module 4 quiz
import DeFiFinalAssessment from "@/pages/defi/final-assessment"; // Add this import


function ProtectedRoute({ component: Component, adminOnly = false, publicAccess = false, ...rest }: any) {
  const { user, isLoading } = useAuth();

  if (publicAccess) {
    return <Component {...rest} />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    window.location.href = adminOnly ? "/admin/login" : "/login";
    return null;
  }

  const userRole = (user as any).role;
  if (adminOnly && userRole !== 'admin') {
    window.location.href = "/";
    return null;
  }

  return <Component {...rest} />;
}

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/">
        <ProtectedRoute component={Home} publicAccess={true} />
      </Route>
      <Route path="/about">
        <ProtectedRoute component={About} publicAccess={true} />
      </Route>
      <Route path="/curriculum">
        <ProtectedRoute component={Curriculum} publicAccess={true} />
      </Route>
      <Route path="/library">
        <ProtectedRoute component={LibraryPage} publicAccess={true} />
      </Route>
      <Route path="/library/:slug">
        <ProtectedRoute component={BlogPost} publicAccess={true} />
      </Route>
      <Route path="/faqs">
        <ProtectedRoute component={FAQs} publicAccess={true} />
      </Route>
      <Route path="/games">
        <ProtectedRoute component={Games} publicAccess={true} />
      </Route>
      <Route path="/ai">
        <ProtectedRoute component={AIOverview} publicAccess={true} />
      </Route>
      <Route path="/deck">
        <ProtectedRoute component={Deck} publicAccess={true} />
      </Route>
      <Route path="/techdeck">
        <ProtectedRoute component={TechDeckPage} publicAccess={true} />
      </Route>
      <Route path="/investment-deck">
        <ProtectedRoute component={InvestmentDeck} publicAccess={true} />
      </Route>
      <Route path="/sensei">
        <ProtectedRoute component={SenseiPage} publicAccess={true} />
      </Route>


      {/* Auth routes */}
      <Route path="/login" component={AuthPage} />
      <Route path="/register" component={AuthPage} />

      {/* Admin routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard">
        <ProtectedRoute component={AdminDashboard} adminOnly={true} />
      </Route>
      <Route path="/admin">
        <ProtectedRoute component={AdminDashboard} adminOnly={true} />
      </Route>
      <Route path="/admin/users">
        <ProtectedRoute component={AdminUsers} adminOnly={true} />
      </Route>
      <Route path="/admin/analytics">
        <ProtectedRoute component={AdminAnalytics} adminOnly={true} />
      </Route>
      <Route path="/admin/feedback">
        <ProtectedRoute component={AdminFeedback} adminOnly={true} />
      </Route>

      {/* Protected routes */}
      <Route path="/account">
        <ProtectedRoute component={AccountPage} />
      </Route>
      <Route path="/achievements">
        <ProtectedRoute component={Achievements} />
      </Route>
      <Route path="/wallet-simulator">
        <ProtectedRoute component={WalletSimulator} />
      </Route>
      <Route path="/trading-simulator">
        <ProtectedRoute component={TradingSimulator} />
      </Route>
      <Route path="/glossary">
        <ProtectedRoute component={GlossaryPage} />
      </Route>


      {/* Protected Module Routes */}
      <Route path="/modules/module1">
        <ProtectedRoute component={Module1Landing} />
      </Route>
      <Route path="/modules/module1/quiz">
        <ProtectedRoute component={Module1Quiz} />
      </Route>
      <Route path="/modules/module1/exercises">
        <ProtectedRoute component={ModuleExercises} />
      </Route>
      <Route path="/modules/module1/digital-currencies">
        <ProtectedRoute component={DigitalCurrenciesSection} />
      </Route>
      <Route path="/modules/module1/history-of-money">
        <ProtectedRoute component={HistoryOfMoneySection} />
      </Route>
      <Route path="/modules/module1/bitcoin">
        <ProtectedRoute component={BitcoinSection} />
      </Route>
      <Route path="/modules/module1/altcoins-tokens">
        <ProtectedRoute component={AltcoinsTokensSection} />
      </Route>
      <Route path="/modules/module1/crypto-market">
        <ProtectedRoute component={CryptoMarketSection} />
      </Route>
      <Route path="/modules/module1/cryptography">
        <ProtectedRoute component={CryptographySection} />
      </Route>
      <Route path="/modules/module1/security">
        <ProtectedRoute component={SecuritySection} />
      </Route>
      <Route path="/modules/module1/applications">
        <ProtectedRoute component={PracticalApplicationsSection} />
      </Route>
      <Route path="/modules/module1/getting-started">
        <ProtectedRoute component={GettingStartedSection} />
      </Route>
      {/* Module 2 Routes */}
      <Route path="/modules/module2">
        <ProtectedRoute component={Module2Landing} publicAccess={true} />
      </Route>
      <Route path="/modules/module2/bitcoin-fundamentals">
        <ProtectedRoute component={BitcoinFundamentalsSection} publicAccess={true} />
      </Route>
      <Route path="/modules/module2/bitcoin-investment">
        <ProtectedRoute component={BitcoinInvestmentSection} publicAccess={true} />
      </Route>
      <Route path="/modules/module2/security-risk">
        <ProtectedRoute component={SecurityRiskSection} publicAccess={true} />
      </Route>
      <Route path="/modules/module2/exercises">
        <ProtectedRoute component={Module2Exercises} publicAccess={true} />
      </Route>
      <Route path="/modules/module2/quiz">
        <ProtectedRoute component={Module2Quiz} publicAccess={true} />
      </Route>
      {/* Module 3 Routes */}
      <Route path="/modules/module3">
        <ProtectedRoute component={Module3} />
      </Route>
      <Route path="/modules/module3/ethereum-fundamentals">
        <ProtectedRoute component={EthereumFundamentalsSection} />
      </Route>
      <Route path="/modules/module3/smart-contracts">
        <ProtectedRoute component={SmartContractsSection} />
      </Route>
      <Route path="/modules/module3/investment-value">
        <ProtectedRoute component={InvestmentValueSection} />
      </Route>
      <Route path="/modules/module3/security-risks">
        <ProtectedRoute component={SecurityRisksSection} />
      </Route>
      <Route path="/modules/module3/exercises">
        <ProtectedRoute component={Module3Exercises} />
      </Route>
      <Route path="/modules/module3/quiz">
        <ProtectedRoute component={Module3Quiz} />
      </Route>
      {/* Module 4 Routes */}
      <Route path="/modules/module4">
        <ProtectedRoute component={Module4Landing} />
      </Route>
      <Route path="/modules/module4/digital-vs-traditional">
        <ProtectedRoute component={DigitalVsTraditionalSection} />
      </Route>

      {/* AI Module Routes */}
      <Route path="/ai/module1">
        <ProtectedRoute component={AIModule1} publicAccess={true} />
      </Route>
      <Route path="/ai/module1/introduction">
        <ProtectedRoute component={AIIntroduction} publicAccess={true} />
      </Route>
      <Route path="/ai/module1/how-ai-works">
        <ProtectedRoute component={AIHowItWorks} publicAccess={true} />
      </Route>
      <Route path="/ai/module1/ai-applications">
        <ProtectedRoute component={AIApplications} publicAccess={true} />
      </Route>
      <Route path="/ai/module1/machine-learning-basics">
        <ProtectedRoute component={AIMLBasics} publicAccess={true} />
      </Route>
      <Route path="/ai/module1/neural-networks">
        <ProtectedRoute component={AINeuralNetworks} publicAccess={true} />
      </Route>
      <Route path="/ai/module1/quiz">
        <ProtectedRoute component={AIModule1Quiz} publicAccess={true} />
      </Route>
      <Route path="/ai/module2">
        <ProtectedRoute component={AIModule2} publicAccess={true} />
      </Route>
      <Route path="/ai/module2/natural-language-processing">
        <ProtectedRoute component={NaturalLanguageProcessing} publicAccess={true} />
      </Route>
      <Route path="/ai/module2/computer-vision">
        <ProtectedRoute component={ComputerVision} publicAccess={true} />
      </Route>
      <Route path="/ai/module2/robotics-automation">
        <ProtectedRoute component={RoboticsAutomation} publicAccess={true} />
      </Route>
      <Route path="/ai/module2/ai-ethics">
        <ProtectedRoute component={AIEthics} publicAccess={true} />
      </Route>
      <Route path="/ai/module2/quiz">
        <ProtectedRoute component={AIModule2Quiz} publicAccess={true} />
      </Route>
      <Route path="/ai/module3">
        <ProtectedRoute component={AIModule3} publicAccess={true} />
      </Route>
      <Route path="/ai/module3/deep-learning">
        <ProtectedRoute component={DeepLearning} publicAccess={true} />
      </Route>
      <Route path="/ai/module3/reinforcement-learning">
        <ProtectedRoute component={ReinforcementLearning} publicAccess={true} />
      </Route>
      <Route path="/ai/module3/generative-ai">
        <ProtectedRoute component={GenerativeAI} publicAccess={true} />
      </Route>
      <Route path="/ai/module3/future-ai">
        <ProtectedRoute component={FutureAI} publicAccess={true} />
      </Route>
      <Route path="/ai/module3/quiz">
        <ProtectedRoute component={AIModule3Quiz} publicAccess={true} />
      </Route>

      {/* DeFi Module Routes */}
      <Route path="/defi/module1">
        <ProtectedRoute component={DefiModule1} />
      </Route>
      <Route path="/defi/module1/defi-intro">
        <ProtectedRoute component={DefiIntro} />
      </Route>
      <Route path="/defi/module1/blockchain-contracts">
        <ProtectedRoute component={BlockchainContracts} />
      </Route>
      <Route path="/defi/module1/dex-amm">
        <ProtectedRoute component={DexAmm} />
      </Route>
      <Route path="/defi/module1/liquidity-yield">
        <ProtectedRoute component={LiquidityYield} />
      </Route>
      <Route path="/defi/module1/quiz">
        <ProtectedRoute component={ModuleQuiz} />
      </Route>

      {/* DeFi Module 2 Routes */}
      <Route path="/defi/module2">
        <ProtectedRoute component={DefiModule2} />
      </Route>
      <Route path="/defi/module2/lending-borrowing">
        <ProtectedRoute component={LendingBorrowing} />
      </Route>
      <Route path="/defi/module2/stablecoins">
        <ProtectedRoute component={StablecoinsSection} />
      </Route>
      <Route path="/defi/module2/derivatives">
        <ProtectedRoute component={DerivativesSection} />
      </Route>
      <Route path="/defi/module2/governance-dao">
        <ProtectedRoute component={GovernanceDAO} />
      </Route>
      <Route path="/defi/module2/quiz">
        <ProtectedRoute component={DefiModule2Quiz} />
      </Route>

      {/* DeFi Module 3 Routes */}
      <Route path="/defi/module3">
        <ProtectedRoute component={DefiModule3} />
      </Route>
      <Route path="/defi/module3/advanced-defi">
        <ProtectedRoute component={AdvancedDefi} publicAccess={true} />
      </Route>
      <Route path="/defi/module3/defi-security">
        <ProtectedRoute component={DefiSecurity} publicAccess={true} />
      </Route>
      <Route path="/defi/module3/defi-analytics">
        <ProtectedRoute component={DefiAnalytics} publicAccess={true} />
      </Route>
      <Route path="/defi/module3/defi-innovation">
        <ProtectedRoute component={DefiInnovation} publicAccess={true} />
      </Route>
      <Route path="/defi/module3/quiz">
        <ProtectedRoute component={DefiModule3Quiz} />
      </Route>
      <Route path="/defi/module4">
        <ProtectedRoute component={DefiModule4} />
      </Route>
      <Route path="/defi/module4/institutional-defi">
        <ProtectedRoute component={InstitutionalDefi} />
      </Route>
      <Route path="/defi/module4/defi-governance">
        <ProtectedRoute component={DefiGovernance} publicAccess={true} />
      </Route>
      <Route path="/defi/module4/defi-integrations">
        <ProtectedRoute component={DefiIntegrations} publicAccess={true} />
      </Route>
      <Route path="/defi/module4/defi-infrastructure">
        <ProtectedRoute component={DefiInfrastructure} publicAccess={true} />
      </Route>
      <Route path="/defi/module4/quiz">
        <ProtectedRoute component={DefiModule4Quiz} />
      </Route>

      <Route path="/defi/final-assessment">
        <ProtectedRoute component={DeFiFinalAssessment} />
      </Route>

      {/* Catch-all route for 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProgressProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-grow">
              <Router />
            </main>
            <Footer />
            <CourseAssistant />
          </div>
          <Toaster />
        </ProgressProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;