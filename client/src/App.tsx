import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Module1Landing from "@/pages/modules/module1";
import Module1Quiz from "@/pages/modules/module1/quiz";
import Module2 from "@/pages/modules/module2";
import Module3 from "@/pages/modules/module3";
import Navigation from "@/components/layout/navigation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/modules/module1" component={Module1Landing} />
      <Route path="/modules/module1/quiz" component={Module1Quiz} />
      <Route path="/modules/module2" component={Module2} />
      <Route path="/modules/module3" component={Module3} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;