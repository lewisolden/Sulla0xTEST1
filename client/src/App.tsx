import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ProgressProvider } from "@/context/progress-context";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Curriculum from "@/pages/curriculum";
import About from "@/pages/about";
import Games from "@/pages/games";
import WalletSimulator from "@/pages/wallet-simulator";
import Achievements from "@/pages/achievements";
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
import Navigation from "@/components/layout/navigation";
import TradingSimulator from "@/pages/trading-simulator";
import GlossaryPage from "@/pages/glossary";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/curriculum" component={Curriculum} />
      <Route path="/about" component={About} />
      <Route path="/games" component={Games} />
      <Route path="/achievements" component={Achievements} />
      {/* Module 1 Routes */}
      <Route path="/modules/module1" component={Module1Landing} />
      <Route path="/modules/module1/quiz" component={Module1Quiz} />
      <Route path="/modules/module1/exercises" component={ModuleExercises} />
      <Route path="/modules/module1/digital-currencies" component={DigitalCurrenciesSection} />
      <Route path="/modules/module1/history-of-money" component={HistoryOfMoneySection} />
      <Route path="/modules/module1/bitcoin" component={BitcoinSection} />
      <Route path="/modules/module1/altcoins-tokens" component={AltcoinsTokensSection} />
      <Route path="/modules/module1/crypto-market" component={CryptoMarketSection} />
      <Route path="/modules/module1/cryptography" component={CryptographySection} />
      <Route path="/modules/module1/security" component={SecuritySection} />
      <Route path="/modules/module1/applications" component={PracticalApplicationsSection} />
      <Route path="/modules/module1/getting-started" component={GettingStartedSection} />
      {/* Module 2 Routes */}
      <Route path="/modules/module2" component={Module2Landing} />
      <Route path="/modules/module2/bitcoin-fundamentals" component={BitcoinFundamentalsSection} />
      <Route path="/modules/module2/bitcoin-investment" component={BitcoinInvestmentSection} />
      <Route path="/modules/module2/security-risk" component={SecurityRiskSection} />
      <Route path="/modules/module2/exercises" component={Module2Exercises} />
      <Route path="/modules/module2/quiz" component={Module2Quiz} />
      {/* Module 3 Routes */}
      <Route path="/modules/module3" component={Module3} />
      <Route path="/modules/module3/ethereum-fundamentals" component={EthereumFundamentalsSection} />
      <Route path="/modules/module3/smart-contracts" component={SmartContractsSection} />
      <Route path="/modules/module3/investment-value" component={InvestmentValueSection} />
      <Route path="/modules/module3/security-risks" component={SecurityRisksSection} />
      <Route path="/modules/module3/exercises" component={Module3Exercises} />
      <Route path="/modules/module3/quiz" component={Module3Quiz} />
      {/* Module 4 Routes */}
      <Route path="/modules/module4" component={Module4Landing} />
      <Route path="/modules/module4/digital-vs-traditional" component={DigitalVsTraditionalSection} />
      <Route path="/wallet-simulator" component={WalletSimulator} />
      <Route path="/trading-simulator" component={TradingSimulator} />
      <Route path="/glossary" component={GlossaryPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProgressProvider>
        <Navigation />
        <Router />
        <Toaster />
      </ProgressProvider>
    </QueryClientProvider>
  );
}

export default App;