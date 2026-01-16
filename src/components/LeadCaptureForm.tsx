import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Rocket, CheckCircle2, Loader2 } from "lucide-react";
import { z } from "zod";

const leadSchema = z.object({
  businessName: z.string().trim().min(1, "Business name is required").max(100, "Business name must be less than 100 characters"),
  websiteUrl: z.string().trim().min(1, "Website URL is required").max(255, "URL must be less than 255 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
});

const LeadCaptureForm = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    websiteUrl: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = leadSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const trimmedData = {
        businessName: result.data.businessName.trim(),
        websiteUrl: result.data.websiteUrl.trim(),
        email: result.data.email.trim(),
      };

      // Save to database
      const { error } = await supabase.from("leads").insert({
        business_name: trimmedData.businessName,
        website_url: trimmedData.websiteUrl,
        email: trimmedData.email,
      });

      if (error) {
        throw error;
      }

      // Send email notification (don't block on failure)
      supabase.functions.invoke("send-lead-notification", {
        body: trimmedData,
      }).catch((err) => {
        console.error("Email notification failed:", err);
      });

      setIsSubmitted(true);
      toast.success("Demo request submitted successfully!");
    } catch (error) {
      console.error("Error submitting lead:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="demo" className="section-padding bg-gradient-to-b from-background to-card/50">
        <div className="container-tight">
          <div className="max-w-2xl mx-auto">
            <div className="glass rounded-2xl p-8 md:p-12 border border-accent/20 shadow-accent-glow text-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Got it! 🎉
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I am reviewing your site now and will WhatsApp/Email you the demo link within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="demo" className="section-padding bg-gradient-to-b from-background to-card/50">
      <div className="container-tight">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              Free Demo
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get a Free Demo of Your New Site
            </h2>
            <p className="text-muted-foreground text-lg">
              See exactly what your business could look like online — no commitment required.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 border border-border/50 shadow-card">
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-foreground font-medium">
                  Business Name
                </Label>
                <Input
                  id="businessName"
                  name="businessName"
                  type="text"
                  placeholder="e.g., Joe's Plumbing"
                  value={formData.businessName}
                  onChange={handleChange}
                  className={`bg-background/50 border-border/50 focus:border-accent ${errors.businessName ? "border-destructive" : ""}`}
                  disabled={isSubmitting}
                />
                {errors.businessName && (
                  <p className="text-sm text-destructive">{errors.businessName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="websiteUrl" className="text-foreground font-medium">
                  Current Website URL <span className="text-muted-foreground font-normal">(or social page)</span>
                </Label>
                <Input
                  id="websiteUrl"
                  name="websiteUrl"
                  type="text"
                  placeholder="e.g., www.joesplumbing.com or facebook.com/joesplumbing"
                  value={formData.websiteUrl}
                  onChange={handleChange}
                  className={`bg-background/50 border-border/50 focus:border-accent ${errors.websiteUrl ? "border-destructive" : ""}`}
                  disabled={isSubmitting}
                />
                {errors.websiteUrl && (
                  <p className="text-sm text-destructive">{errors.websiteUrl}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g., joe@joesplumbing.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-background/50 border-border/50 focus:border-accent ${errors.email ? "border-destructive" : ""}`}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Rocket className="w-5 h-5" />
                    Request Demo
                  </>
                )}
              </Button>
            </div>

            <p className="text-center text-muted-foreground text-sm mt-4">
              100% free. No credit card required. No spam, ever.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureForm;
