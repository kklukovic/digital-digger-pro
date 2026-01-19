import { useState } from "react";
import { Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const CallMeButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCallMe = async () => {
    if (!phoneNumber.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    // Basic validation - allow various formats
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      toast.error("Please enter a valid phone number with at least 10 digits");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("retell-call", {
        body: { phoneNumber: phoneNumber.trim() },
      });

      if (error) {
        console.error("Error calling retell-call function:", error);
        toast.error(error.message || "Failed to initiate call. Please try again.");
        return;
      }

      if (data?.error) {
        toast.error(data.error);
        return;
      }

      toast.success(data?.message || "Call initiated! You should receive a call shortly.");
      setPhoneNumber("");
      setIsOpen(false);
    } catch (error: any) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="lg"
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 gap-2"
        >
          <Phone className="w-5 h-5" />
          Call Me
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            Request a Call
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter your phone number and our AI assistant will call you right away to discuss how we can help your business.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-foreground">
              Phone Number
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="bg-background border-border"
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              Include your country code for international numbers
            </p>
          </div>
          <Button
            onClick={handleCallMe}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Initiating Call...
              </>
            ) : (
              <>
                <Phone className="w-4 h-4 mr-2" />
                Call Me Now
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CallMeButton;
