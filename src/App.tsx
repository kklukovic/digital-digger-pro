import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import HowItWorks from "./pages/HowItWorks";
import Checkout from "./pages/Checkout";
import CheckoutGrowth from "./pages/CheckoutGrowth";
import FreebieDownload from "./pages/FreebieDownload";
import Accelerator from "./pages/Accelerator";
import AcceleratorOffer from "./pages/AcceleratorOffer";
import NotFound from "./pages/NotFound";
import { lazy, Suspense } from "react";

const Nwi = lazy(() => import("./pages/Nwi"));
const NwiBook = lazy(() => import("./pages/NwiBook"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/nwi" element={<Suspense fallback={<div role="status" className="p-8">Loading Local Digital Ops...</div>}><Nwi /></Suspense>} />
          <Route path="/nwi/book" element={<Suspense fallback={<div role="status" className="p-8">Loading booking page...</div>}><NwiBook /></Suspense>} />
          <Route path="/" element={<Index />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-growth" element={<CheckoutGrowth />} />
          <Route path="/free-guide" element={<FreebieDownload />} />
          <Route path="/accelerator" element={<Accelerator />} />
          <Route path="/accelerator-offer" element={<AcceleratorOffer />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
