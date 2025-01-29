import { Route, Switch } from "wouter";
import Overview from './index';
import DigitalCurrencies from './digital-currencies';
import HistoryOfMoney from './history-of-money';
import Bitcoin from './bitcoin';
import AltcoinsTokens from './altcoins-tokens';
import CryptoMarket from './crypto-market';
import Cryptography from './cryptography';
import Quiz from './quiz';
import DigitalCurrenciesQuiz from './digital-currencies-quiz';
import HistoryOfMoneyQuiz from './history-of-money-quiz';
import BitcoinQuiz from './bitcoin-quiz';
import AltcoinsTokensQuiz from './altcoins-tokens-quiz';
import CryptoMarketQuiz from './crypto-market-quiz';
import CryptographyQuiz from './cryptography-quiz';

const Module1Routes = () => {
  return (
    <Switch>
      <Route path="/modules/module1" component={Overview} />
      <Route path="/modules/module1/digital-currencies" component={DigitalCurrencies} />
      <Route path="/modules/module1/digital-currencies-quiz" component={DigitalCurrenciesQuiz} />
      <Route path="/modules/module1/history-of-money" component={HistoryOfMoney} />
      <Route path="/modules/module1/history-of-money-quiz" component={HistoryOfMoneyQuiz} />
      <Route path="/modules/module1/bitcoin" component={Bitcoin} />
      <Route path="/modules/module1/bitcoin-quiz" component={BitcoinQuiz} />
      <Route path="/modules/module1/altcoins-tokens" component={AltcoinsTokens} />
      <Route path="/modules/module1/altcoins-tokens-quiz" component={AltcoinsTokensQuiz} />
      <Route path="/modules/module1/crypto-market" component={CryptoMarket} />
      <Route path="/modules/module1/crypto-market-quiz" component={CryptoMarketQuiz} />
      <Route path="/modules/module1/cryptography" component={Cryptography} />
      <Route path="/modules/module1/cryptography-quiz" component={CryptographyQuiz} />
      <Route path="/modules/module1/quiz" component={Quiz} />
    </Switch>
  );
};

export default Module1Routes;
