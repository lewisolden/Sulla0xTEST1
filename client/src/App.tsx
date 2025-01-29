import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ProgressProvider } from "@/context/progress-context";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Module1Landing from "@/pages/modules/module1";
import Module1Quiz from "@/pages/modules/module1/quiz";
import DigitalCurrenciesSection from "@/pages/modules/module1/digital-currencies";
import HistoryOfMoneySection from "@/pages/modules/module1/history-of-money";
import BitcoinSection from "@/pages/modules/module1/bitcoin";
import AltcoinsTokensSection from "@/pages/modules/module1/altcoins-tokens";
import CryptoMarketSection from "@/pages/modules/module1/crypto-market";
import CryptographySection from "@/pages/modules/module1/cryptography";
import Module2Landing from "@/pages/modules/module2";
import BlockchainBasicsSection from "@/pages/modules/module2/blockchain-basics";
import DistributedLedgerSection from "@/pages/modules/module2/distributed-ledger";
import ConsensusMechanismsSection from "@/pages/modules/module2/consensus-mechanisms";
import SmartContractsSection from "@/pages/modules/module2/smart-contracts";
import Module3 from "@/pages/modules/module3";
import Navigation from "@/components/layout/navigation";
import TradingSimulator from "@/pages/trading-simulator";
import GlossaryPage from "@/pages/glossary";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {/* Module 1 Routes */}
      <Route path="/modules/module1" component={Module1Landing} />
      <Route path="/modules/module1/quiz" component={Module1Quiz} />
      <Route path="/modules/module1/digital-currencies" component={DigitalCurrenciesSection} />
      <Route path="/modules/module1/history-of-money" component={HistoryOfMoneySection} />
      <Route path="/modules/module1/bitcoin" component={BitcoinSection} />
      <Route path="/modules/module1/altcoins-tokens" component={AltcoinsTokensSection} />
      <Route path="/modules/module1/crypto-market" component={CryptoMarketSection} />
      <Route path="/modules/module1/cryptography" component={CryptographySection} />
      {/* Module 2 Routes */}
      <Route path="/modules/module2" component={Module2Landing} />
      <Route path="/modules/module2/blockchain-basics" component={BlockchainBasicsSection} />
      <Route path="/modules/module2/distributed-ledger" component={DistributedLedgerSection} />
      <Route path="/modules/module2/consensus-mechanisms" component={ConsensusMechanismsSection} />
      <Route path="/modules/module2/smart-contracts" component={SmartContractsSection} />
      <Route path="/modules/module3" component={Module3} />
      {/* Trading Simulator */}
      <Route path="/trading-simulator" component={TradingSimulator} />
      {/* Glossary */}
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