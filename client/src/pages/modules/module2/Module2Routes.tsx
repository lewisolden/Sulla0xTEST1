import React from 'react';
import { Route, Switch } from "wouter";
import Overview from './overview';
import BlockchainBasics from './blockchain-basics';
import DistributedLedger from './distributed-ledger';
import ConsensusMechanisms from './consensus-mechanisms';
import SmartContracts from './smart-contracts';

const Module2Routes = () => {
  return (
    <Switch>
      <Route path="/modules/module2" component={Overview} />
      <Route path="/modules/module2/blockchain-basics" component={BlockchainBasics} />
      <Route path="/modules/module2/distributed-ledger" component={DistributedLedger} />
      <Route path="/modules/module2/consensus-mechanisms" component={ConsensusMechanisms} />
      <Route path="/modules/module2/smart-contracts" component={SmartContracts} />
    </Switch>
  );
};

export default Module2Routes;
