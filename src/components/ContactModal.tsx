import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, MessageCircle, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactModal = ({ open, onOpenChange }: ContactModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Free Mockup Request from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService Type: ${formData.serviceType}\n\nMessage:\n${formData.message}`
    );
    
    window.location.href = `mailto:kris@localdigitalops.com?subject=${subject}&body=${body}`;
    
    toast({
      title: "Opening your email client...",
      description: "Your message details have been prepared. Just hit send!",
    });
    
    setIsSubmitting(false);
    onOpenChange(false);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi Kreso! I'm interested in getting a free mockup for my business.\n\nName: ${formData.name || "[Your Name]"}\nService Type: ${formData.serviceType || "[Your Service]"}`
    );
    window.open(`https://wa.me/385989821111?text=${message}`, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg glass border-accent/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Get Your Free Mockup</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Tell me about your business and I'll create a custom mockup for you within 48 hours.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name *</Label>
              <Input
                id="name"
                required
                placeholder="John Smith"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-background/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceType">What type of service do you offer? *</Label>
            <Input
              id="serviceType"
              required
              placeholder="e.g., Plumbing, Roofing, Pool Cleaning..."
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Tell me about your current website (optional)</Label>
            <Textarea
              id="message"
              placeholder="Do you have a website? What's working? What's not?"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-background/50 min-h-[80px]"
            />
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
              <Send className="w-4 h-4 mr-2" />
              Send Request via Email
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or reach out directly</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={openWhatsApp}
                className="border-green-500/50 text-green-400 hover:bg-green-500/10"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => window.location.href = "tel:+385989821111"}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
