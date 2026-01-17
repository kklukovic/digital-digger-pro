import { Smartphone, Bell, Users, TrendingUp, MessageSquare, Calendar } from "lucide-react";

const CommandCenterSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
      
      <div className="container-tight relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6">
            <Smartphone className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Your Command Center</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Take Control of{" "}
            <span className="text-gradient">Your Leads</span>
          </h2>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Dashboard mockup */}
          <div className="relative">
            <div className="glass rounded-3xl p-4 shadow-2xl">
              {/* Phone frame */}
              <div className="bg-background rounded-2xl overflow-hidden border border-border/50">
                {/* Status bar */}
                <div className="bg-muted/50 px-4 py-2 flex justify-between items-center text-xs text-muted-foreground">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-2 bg-accent rounded-sm" />
                  </div>
                </div>
                
                {/* App header */}
                <div className="px-4 py-4 border-b border-border/30">
                  <h3 className="font-bold text-lg">Lead Dashboard</h3>
                  <p className="text-xs text-muted-foreground">Today's Overview</p>
                </div>
                
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3 p-4">
                  <div className="glass-light rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-accent" />
                      <span className="text-xs text-muted-foreground">New Leads</span>
                    </div>
                    <p className="text-2xl font-bold text-accent">12</p>
                  </div>
                  <div className="glass-light rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-muted-foreground">Conversion</span>
                    </div>
                    <p className="text-2xl font-bold text-green-400">68%</p>
                  </div>
                  <div className="glass-light rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-muted-foreground">AI Chats</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-400">47</p>
                  </div>
                  <div className="glass-light rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <span className="text-xs text-muted-foreground">Bookings</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-400">8</p>
                  </div>
                </div>
                
                {/* Recent leads */}
                <div className="px-4 pb-4">
                  <p className="text-xs text-muted-foreground mb-3">Recent Leads</p>
                  <div className="space-y-2">
                    {[
                      { name: "John D.", service: "Pool Cleaning", time: "2m ago" },
                      { name: "Sarah M.", service: "Roof Repair", time: "15m ago" },
                      { name: "Mike R.", service: "HVAC Service", time: "1h ago" },
                    ].map((lead, i) => (
                      <div key={i} className="flex items-center justify-between glass-light rounded-lg px-3 py-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                            <Bell className="w-4 h-4 text-accent" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{lead.name}</p>
                            <p className="text-xs text-muted-foreground">{lead.service}</p>
                          </div>
                        </div>
                        <span className="text-xs text-accent">{lead.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative glow */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-[80px]" />
          </div>

          {/* Text content */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Stop chasing leads in your inbox. Our <strong className="text-foreground">Growth</strong> and{" "}
              <strong className="text-foreground">Enterprise</strong> systems include a custom mobile dashboard 
              where you can see every inquiry, quote, and appointment captured by your AI in real-time.
            </p>
            <p className="text-xl font-semibold text-foreground">
              Manage your business from your pocket.
            </p>
            
            {/* Value comparison box */}
            <div className="glass rounded-2xl p-6 border-accent/20">
              <h4 className="font-bold text-lg mb-4">Value Comparison</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-muted-foreground">Traditional Agency</p>
                    <p className="text-xs text-muted-foreground">4-6 weeks delivery</p>
                  </div>
                  <span className="text-xl font-bold text-muted-foreground line-through">$3,500+</span>
                </div>
                <div className="h-px bg-border/50" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-accent">Local Digital Ops</p>
                    <p className="text-xs text-accent/80">48-hour delivery + AI Tools</p>
                  </div>
                  <span className="text-xl font-bold text-accent">$1,000</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground italic">
                "I trade a lower price for your testimonial and results."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommandCenterSection;
