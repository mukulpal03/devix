export const LandingPricing = () => {
  return (
    <section
      id="pricing"
      className="px-6 border-t border-[var(--border-default-subtle)]"
      style={{
        backgroundColor: "var(--surface-page-base)",
      }}
    >
      <div className="mx-auto w-full max-w-[1200px] flex flex-col md:flex-row py-24 md:py-32 items-start gap-12 md:gap-24">
        
        {/* Left: Metadata & Title */}
        <div className="w-full md:w-1/3 flex flex-col items-start">
           <div className="font-mono text-[13px] font-medium uppercase tracking-[0.06em] text-[var(--text-body-muted)] mb-6">
             Phase 1 // Alpha
           </div>
           <h2 className="font-display text-[48px] md:text-[64px] font-semibold leading-[1.1] tracking-tight" style={{ color: "var(--text-heading)" }}>
             Pricing
           </h2>
        </div>

        {/* Right: Copy & Stats */}
        <div className="w-full md:w-2/3 flex flex-col items-start md:border-l border-[var(--border-default-subtle)] pt-8 md:pt-0 pl-0 md:pl-24">
           <h3 className="font-sans text-[28px] md:text-[36px] font-medium leading-[1.3] mb-6" style={{ color: "var(--text-heading)" }}>
             Coming soon.
           </h3>
           <p className="font-sans text-[20px] leading-[1.6] mb-16" style={{ color: "var(--text-body)", maxWidth: "560px" }}>
             We're currently in alpha and everything is entirely free. Create unlimited projects and use real-time collaborative editing without artificial throttles while we build the most powerful browser-based IDE.
           </p>

           <div className="flex gap-16 md:gap-24">
             <div className="flex flex-col">
                <span className="font-display text-[56px] md:text-[80px] font-semibold leading-none" style={{ color: "var(--text-heading)" }}>$0</span>
                <span className="font-mono text-[13px] uppercase tracking-[0.06em] text-[var(--text-body-muted)] mt-4">Current Price</span>
             </div>
             <div className="flex flex-col">
                <span className="font-display text-[56px] md:text-[80px] font-semibold leading-none" style={{ color: "var(--accent-clay)" }}>∞</span>
                <span className="font-mono text-[13px] uppercase tracking-[0.06em] text-[var(--text-body-muted)] mt-4">Projects Limit</span>
             </div>
           </div>
        </div>

      </div>
    </section>
  );
};
