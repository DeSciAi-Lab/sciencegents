
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import ScienceGentDetails from "./pages/ScienceGentDetails";
import ExploreCapabilities from "./pages/ExploreCapabilities";
import CapabilityDetails from "./pages/CapabilityDetails";
import CreateCapability from "./pages/CreateCapability";
import CreateScienceGent from "./pages/CreateScienceGent";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/sciencegent/:address" element={<ScienceGentDetails />} />
          <Route path="/capabilities" element={<ExploreCapabilities />} />
          <Route path="/capability/:id" element={<CapabilityDetails />} />
          <Route path="/create-capability" element={<CreateCapability />} />
          <Route path="/create-sciencegent" element={<CreateScienceGent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
