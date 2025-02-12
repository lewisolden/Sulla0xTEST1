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
import AIModule1 from "@/pages/ai/module1";
import AIIntroduction from "@/pages/ai/module1/introduction";
import AIHowItWorks from "@/pages/ai/module1/how-ai-works";
import AIApplications from "@/pages/ai/module1/ai-applications";
import AIMLBasics from "@/pages/ai/module1/machine-learning-basics";
import AINeuralNetworks from "@/pages/ai/module1/neural-networks";
import AIModule1Quiz from "@/pages/ai/module1/quiz";

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

  // Check if the user has the required role for admin routes
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

      {/* Authentication routes */}
      <Route path="/login" component={AuthPage} />
      <Route path="/register" component={AuthPage} />

      {/* Admin routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <ProtectedRoute path="/admin" component={AdminDashboard} adminOnly />
      <ProtectedRoute path="/admin/users" component={AdminUsers} adminOnly />
      <ProtectedRoute path="/admin/analytics" component={AdminAnalytics} adminOnly />

      {/* Protected routes */}
      <ProtectedRoute path="/account" component={AccountPage} />
      <ProtectedRoute path="/games" component={Games} />
      <ProtectedRoute path="/achievements" component={Achievements} />
      <ProtectedRoute path="/deck" component={Deck} />
      <ProtectedRoute path="/wallet-simulator" component={WalletSimulator} />
      <ProtectedRoute path="/trading-simulator" component={TradingSimulator} />
      <ProtectedRoute path="/glossary" component={GlossaryPage} />

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