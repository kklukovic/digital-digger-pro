import { useState, useEffect, useCallback } from "react";
import { Phone, Loader2, Clock } from "lucide-react";
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

const COOLDOWN_DURATION = 120; // 2 minutes in seconds
const DAILY_LIMIT = 2;
const STORAGE_KEY_COOLDOWN = "callme_cooldown_end";
const STORAGE_KEY_CALLS = "callme_daily_calls";

interface DailyCallData {
  calls: number[];
  date: string;
}

const CallMeButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const [honeypot, setHoneypot] = useState("");

  // Check and update cooldown timer
  useEffect(() => {
    const checkCooldown = () => {
      const cooldownEnd = localStorage.getItem(STORAGE_KEY_COOLDOWN);
      if (cooldownEnd) {
        const remaining = Math.ceil((parseInt(cooldownEnd) - Date.now()) / 1000);
        if (remaining > 0) {
          setCooldownRemaining(remaining);
        } else {
          setCooldownRemaining(0);
          localStorage.removeItem(STORAGE_KEY_COOLDOWN);
        }
      }
    };

    checkCooldown();
    const interval = setInterval(checkCooldown, 1000);
    return () => clearInterval(interval);
  }, []);

  const getDailyCallData = useCallback((): DailyCallData => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem(STORAGE_KEY_CALLS);
    
    if (stored) {
      try {
        const data: DailyCallData = JSON.parse(stored);
        // Reset if it's a new day
        if (data.date !== today) {
          return { calls: [], date: today };
        }
        return data;
      } catch {
        return { calls: [], date: today };
      }
    }
    return { calls: [], date: today };
  }, []);

  const recordCall = useCallback(() => {
    const data = getDailyCallData();
    data.calls.push(Date.now());
    localStorage.setItem(STORAGE_KEY_CALLS, JSON.stringify(data));
  }, [getDailyCallData]);

  const startCooldown = useCallback(() => {
    const cooldownEnd = Date.now() + COOLDOWN_DURATION * 1000;
    localStorage.setItem(STORAGE_KEY_COOLDOWN, cooldownEnd.toString());
    setCooldownRemaining(COOLDOWN_DURATION);
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCallMe = async () => {
    // Honeypot check - if filled, silently fail (bots won't know)
    if (honeypot) {
      toast.success("Call initiated! You should receive a call shortly.");
      setPhoneNumber("");
      setIsOpen(false);
      return;
    }

    // Check daily limit
    const dailyData = getDailyCallData();
    if (dailyData.calls.length >= DAILY_LIMIT) {
      toast.error("Demo limit reached. Please contact us directly.", {
        description: "You've reached the maximum number of demo calls for today.",
        duration: 5000,
      });
      return;
    }

    // Check cooldown
    if (cooldownRemaining > 0) {
      toast.error(`Please wait ${formatTime(cooldownRemaining)} before requesting another call.`);
      return;
    }

    if (!phoneNumber.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    // Basic validation - allow various formats
    const digitsOnly = phoneNumber.replace(/\D/g, "");
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
        // Check if it's a rate limit error from server
        if (data.error.includes("Too many") || data.error.includes("rate limit")) {
          toast.error("Please wait before requesting another call.", {
            description: "Server rate limit reached. Try again in 30 minutes.",
          });
        } else {
          toast.error(data.error);
        }
        return;
      }

      // Success - record call and start cooldown
      recordCall();
      startCooldown();
      
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

  const isDisabled = isLoading || cooldownRemaining > 0;
  const dailyData = getDailyCallData();
  const callsRemaining = DAILY_LIMIT - dailyData.calls.length;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 gap-2"
          disabled={cooldownRemaining > 0}
        >
          {cooldownRemaining > 0 ? (
            <>
              <Clock className="w-5 h-5" />
              Wait {formatTime(cooldownRemaining)}
            </>
          ) : (
            <>
              <Phone className="w-5 h-5" />
              Call Me
            </>
          )}
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
              disabled={isDisabled}
            />
            <p className="text-xs text-muted-foreground">
              Include your country code for international numbers
            </p>
          </div>
          
          {/* Honeypot field - hidden from users, only bots fill this */}
          <div className="absolute -left-[9999px] opacity-0 h-0 overflow-hidden" aria-hidden="true">
            <label htmlFor="website_url">Website URL</label>
            <Input
              id="website_url"
              name="website_url"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          {callsRemaining <= 1 && callsRemaining > 0 && (
            <p className="text-xs text-amber-500">
              {callsRemaining} demo call remaining today
            </p>
          )}

          {cooldownRemaining > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <Clock className="w-4 h-4" />
              <span>Please wait {formatTime(cooldownRemaining)} before requesting another call</span>
            </div>
          )}

          <Button
            onClick={handleCallMe}
            disabled={isDisabled}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Initiating Call...
              </>
            ) : cooldownRemaining > 0 ? (
              <>
                <Clock className="w-4 h-4 mr-2" />
                Wait {formatTime(cooldownRemaining)}
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
