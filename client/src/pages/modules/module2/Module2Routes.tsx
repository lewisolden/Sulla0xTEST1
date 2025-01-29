import React from 'react';
import { Route, Switch } from "wouter";
import Overview from './overview';
import BlockchainBasics from './blockchain-basics';
import DistributedLedger from './distributed-ledger';
import ConsensusMechanisms from './consensus-mechanisms';
import SmartContracts from './smart-contracts';
import Quiz from './quiz';

// Quiz components
import OverviewQuiz from './overview-quiz';
import BlockchainBasicsQuiz from './blockchain-basics-quiz';
import DistributedLedgerQuiz from './distributed-ledger-quiz';
import ConsensusMechanismsQuiz from './consensus-mechanisms-quiz';
import SmartContractsQuiz from './smart-contracts-quiz';

const Module2Routes = () => {
  return (
    <Switch>
      <Route path="/modules/module2" component={Overview} />
      <Route path="/modules/module2/overview-quiz" component={OverviewQuiz} />
      <Route path="/modules/module2/blockchain-basics" component={BlockchainBasics} />
      <Route path="/modules/module2/blockchain-basics-quiz" component={BlockchainBasicsQuiz} />
      <Route path="/modules/module2/distributed-ledger" component={DistributedLedger} />
      <Route path="/modules/module2/distributed-ledger-quiz" component={DistributedLedgerQuiz} />
      <Route path="/modules/module2/consensus-mechanisms" component={ConsensusMechanisms} />
      <Route path="/modules/module2/consensus-mechanisms-quiz" component={ConsensusMechanismsQuiz} />
      <Route path="/modules/module2/smart-contracts" component={SmartContracts} />
      <Route path="/modules/module2/smart-contracts-quiz" component={SmartContractsQuiz} />
      <Route path="/modules/module2/quiz" component={Quiz} />
    </Switch>
  );
};

export default Module2Routes;