import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ProgressProvider } from "@/context/progress-context";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
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
import AIModule3 from "@/pages/ai/module3"; // Added import

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
      <Route path="/" component={() => <ProtectedRoute component={Home} publicAccess={true} />} />
      <Route path="/curriculum" component={() => <ProtectedRoute component={Curriculum} publicAccess={true} />} />
      <Route path="/about" component={() => <ProtectedRoute component={About} publicAccess={true} />} />
      <Route path="/ai" component={() => <ProtectedRoute component={AIOverview} publicAccess={true} />} />
      <Route path="/ai/module1" component={() => <ProtectedRoute component={AIModule1} publicAccess={true} />} />
      <Route path="/ai/module1/introduction" component={() => <ProtectedRoute component={AIIntroduction} publicAccess={true} />} />
      <Route path="/ai/module1/how-ai-works" component={() => <ProtectedRoute component={AIHowItWorks} publicAccess={true} />} />
      <Route path="/ai/module1/ai-applications" component={() => <ProtectedRoute component={AIApplications} publicAccess={true} />} />
      <Route path="/ai/module1/machine-learning-basics" component={() => <ProtectedRoute component={AIMLBasics} publicAccess={true} />} />
      <Route path="/ai/module1/neural-networks" component={() => <ProtectedRoute component={AINeuralNetworks} publicAccess={true} />} />
      <Route path="/ai/module1/quiz" component={() => <ProtectedRoute component={AIModule1Quiz} publicAccess={true} />} />
      <Route path="/ai/module2" component={() => <ProtectedRoute component={AIModule2} publicAccess={true} />} />
      <Route path="/ai/module2/natural-language-processing" component={() => <ProtectedRoute component={NaturalLanguageProcessing} publicAccess={true} />} />
      <Route path="/ai/module2/computer-vision" component={() => <ProtectedRoute component={ComputerVision} publicAccess={true} />} />
      <Route path="/ai/module2/robotics-automation" component={() => <ProtectedRoute component={RoboticsAutomation} publicAccess={true} />} />
      <Route path="/ai/module2/ai-ethics" component={() => <ProtectedRoute component={AIEthics} publicAccess={true} />} />
      <Route path="/ai/module2/quiz" component={() => <ProtectedRoute component={AIModule2Quiz} publicAccess={true} />} />
      <Route path="/ai/module3" component={() => <ProtectedRoute component={AIModule3} publicAccess={true} />} /> {/* Added route */}


      {/* Authentication routes */}
      <Route path="/login" component={AuthPage} />
      <Route path="/register" component={AuthPage} />

      {/* Admin routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <ProtectedRoute path="/admin" component={AdminDashboard} adminOnly />
      <ProtectedRoute path="/admin/users" component={AdminUsers} adminOnly />
      <ProtectedRoute path="/admin/analytics" component={AdminAnalytics} adminOnly />

      {/* Protected routes */}
      <Route path="/account" component={() => <ProtectedRoute component={AccountPage} />} />
      <Route path="/games" component={() => <ProtectedRoute component={Games} />} />
      <Route path="/achievements" component={() => <ProtectedRoute component={Achievements} />} />
      <Route path="/deck" component={() => <ProtectedRoute component={Deck} />} />
      <Route path="/wallet-simulator" component={() => <ProtectedRoute component={WalletSimulator} />} />
      <Route path="/trading-simulator" component={() => <ProtectedRoute component={TradingSimulator} />} />
      <Route path="/glossary" component={() => <ProtectedRoute component={GlossaryPage} />} />

      {/* Module 1 Routes */}
      <ProtectedRoute path="/modules/module1" component={Module1Landing} />
      <ProtectedRoute path="/modules/module1/quiz" component={Module1Quiz} />
      <ProtectedRoute path="/modules/module1/exercises" component={ModuleExercises} />
      <ProtectedRoute path="/modules/module1/digital-currencies" component={DigitalCurrenciesSection} />
      <ProtectedRoute path="/modules/module1/history-of-money" component={HistoryOfMoneySection} />
      <ProtectedRoute path="/modules/module1/bitcoin" component={BitcoinSection} />
      <ProtectedRoute path="/modules/module1/altcoins-tokens" component={AltcoinsTokensSection} />
      <ProtectedRoute path="/modules/module1/crypto-market" component={CryptoMarketSection} />
      <ProtectedRoute path="/modules/module1/cryptography" component={CryptographySection} />
      <ProtectedRoute path="/modules/module1/security" component={SecuritySection} />
      <ProtectedRoute path="/modules/module1/applications" component={PracticalApplicationsSection} />
      <ProtectedRoute path="/modules/module1/getting-started" component={GettingStartedSection} />
      {/* Module 2 Routes */}
      <ProtectedRoute path="/modules/module2" component={Module2Landing} />
      <ProtectedRoute path="/modules/module2/bitcoin-fundamentals" component={BitcoinFundamentalsSection} />
      <ProtectedRoute path="/modules/module2/bitcoin-investment" component={BitcoinInvestmentSection} />
      <ProtectedRoute path="/modules/module2/security-risk" component={SecurityRiskSection} />
      <ProtectedRoute path="/modules/module2/exercises" component={Module2Exercises} />
      <ProtectedRoute path="/modules/module2/quiz" component={Module2Quiz} />
      {/* Module 3 Routes */}
      <ProtectedRoute path="/modules/module3" component={Module3} />
      <ProtectedRoute path="/modules/module3/ethereum-fundamentals" component={EthereumFundamentalsSection} />
      <ProtectedRoute path="/modules/module3/smart-contracts" component={SmartContractsSection} />
      <ProtectedRoute path="/modules/module3/investment-value" component={InvestmentValueSection} />
      <ProtectedRoute path="/modules/module3/security-risks" component={SecurityRisksSection} />
      <ProtectedRoute path="/modules/module3/exercises" component={Module3Exercises} />
      <ProtectedRoute path="/modules/module3/quiz" component={Module3Quiz} />
      {/* Module 4 Routes */}
      <ProtectedRoute path="/modules/module4" component={Module4Landing} />
      <ProtectedRoute path="/modules/module4/digital-vs-traditional" component={DigitalVsTraditionalSection} />
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
          </div>
          <Toaster />
        </ProgressProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;