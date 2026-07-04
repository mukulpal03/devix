const FEATURES = [
  {
    id: "instant_environments",
    label: "Instant Environments",
    copy: "Zero setup. Pick a template and get a fully configured runtime in under 3 seconds.",
    visual: (
      <div className="font-mono text-[11px] leading-relaxed">
        <div className="flex items-center gap-2" style={{ color: '#788C5D' }}>
          <span className="h-[3px] w-[3px]" style={{ backgroundColor: '#788C5D' }} />
          <span>Installing dependencies...</span>
        </div>
        <div className="flex items-center gap-2 mt-1" style={{ color: '#788C5D' }}>
          <span className="h-[3px] w-[3px]" style={{ backgroundColor: '#788C5D' }} />
          <span>Configuring runtime...</span>
        </div>
        <div className="flex items-center gap-2 mt-1" style={{ color: 'var(--text-heading)' }}>
          <span className="h-[3px] w-[3px]" style={{ backgroundColor: 'var(--accent-clay)' }} />
          <span>Environment ready <span style={{ color: 'var(--text-body-muted)' }}>in 2.4s</span></span>
        </div>
        <div className="mt-3 pt-2" style={{ borderTop: '1px solid var(--border-default-subtle)' }}>
          <span style={{ color: 'var(--text-body-subtle)' }}>~/app</span>
          <span style={{ color: 'var(--text-body-muted)' }}> $ </span>
          <span className="font-medium" style={{ color: 'var(--text-heading)' }}>pnpm dev</span>
        </div>
      </div>
    ),
    size: "large",
  },
  {
    id: "integrated_terminal",
    label: "Integrated Terminal",
    copy: "Full-featured bash/zsh terminal, right where you code.",
    visual: (
      <div className="font-mono text-[11px] leading-relaxed" style={{ color: 'var(--text-body-subtle)' }}>
        <div>$ node -v</div>
        <div className="font-medium" style={{ color: 'var(--text-heading)' }}>v22.4.0</div>
        <div className="mt-1">$ git branch</div>
        <div className="font-medium" style={{ color: '#788C5D' }}>* main</div>
      </div>
    ),
    size: "narrow",
  },
  {
    id: "file_system",
    label: "File System",
    copy: "VS Code-style folder tree. Full git support.",
    visual: (
      <div className="font-mono text-[11px] leading-relaxed space-y-1" style={{ color: 'var(--text-body-subtle)' }}>
        <div className="flex items-center gap-2">
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M1 3.5A1 1 0 012 2.5h3l1 1h4a1 1 0 011 1V9.5a1 1 0 01-1 1H2a1 1 0 01-1-1V3.5z" fill="currentColor" opacity="0.5" /></svg>
          <span className="font-medium" style={{ color: 'var(--text-heading)' }}>src</span>
        </div>
        <div className="flex items-center gap-2 pl-4" style={{ borderLeft: '1px solid var(--border-default-subtle)' }}>
          <svg width="9" height="11" viewBox="0 0 10 12" fill="none"><rect x="0" y="0" width="7" height="9" rx="0" fill="currentColor" opacity="0.4" /></svg>
          <span>App.tsx</span>
        </div>
        <div className="flex items-center gap-2 pl-4" style={{ borderLeft: '1px solid var(--border-default-subtle)' }}>
          <svg width="9" height="11" viewBox="0 0 10 12" fill="none"><rect x="0" y="0" width="7" height="9" rx="0" fill="currentColor" opacity="0.4" /></svg>
          <span>main.tsx</span>
        </div>
      </div>
    ),
    size: "narrow",
  },
  {
    id: "collaborative_editing",
    label: "Collaborative Editing",
    copy: "Pair program in real time. Multiple cursors, shared terminals, live presence.",
    visual: (
      <div className="flex items-center gap-3">
        <div className="flex" style={{ marginRight: '-4px' }}>
          <div
            className="flex h-7 w-7 items-center justify-center font-sans text-[10px] font-medium"
            style={{
              backgroundColor: 'var(--bg-brand)',
              color: 'var(--text-on-brand)',
              border: '2px solid var(--surface-page-base)',
              borderRadius: '0px',
            }}
          >SC</div>
          <div
            className="flex h-7 w-7 items-center justify-center font-sans text-[10px] font-medium"
            style={{
              backgroundColor: 'var(--surface-warm-card)',
              color: 'var(--text-heading)',
              border: '2px solid var(--surface-page-base)',
              borderRadius: '0px',
              marginLeft: '-8px',
            }}
          >TK</div>
        </div>
        <span className="text-[11px] font-medium" style={{ color: 'var(--text-body-subtle)' }}>2 active editors</span>
      </div>
    ),
    size: "narrow",
  },
];

function FeatureCard({ feature, surface }: { feature: (typeof FEATURES)[0]; surface: 'elevated' | 'warm' }) {
  return (
    <div
      className="flex flex-col justify-between h-full transition-colors duration-200 ease-out"
      style={{
        backgroundColor: surface === 'elevated' ? 'var(--surface-elevated)' : 'var(--surface-warm-card)',
        borderRadius: '24px',
        padding: '31px',
        border: 'none',
        boxShadow: 'none',
        minHeight: '220px',
      }}
    >
      <div>
        <h3
          className="mb-2 font-sans text-[20px] font-semibold"
          style={{ color: 'var(--text-heading)' }}
        >
          {feature.label}
        </h3>
        <p
          className="font-sans text-[15px] font-normal leading-[1.4] mb-4"
          style={{ color: 'var(--text-body)' }}
        >
          {feature.copy}
        </p>
      </div>
      {feature.visual && (
        <div
          className="mt-2 p-4"
          style={{
            backgroundColor: 'var(--surface-page-base)',
            borderRadius: '0px',
            border: '1px solid var(--border-default-subtle)',
          }}
        >
          {feature.visual}
        </div>
      )}
    </div>
  );
}

export const LandingFeatures = () => {
  return (
    <section
      id="features"
      className="px-6"
      style={{
        backgroundColor: 'var(--surface-page-base)',
        paddingTop: '84px',
        paddingBottom: '84px',
      }}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Section Header */}
        <div className="mb-12" style={{ maxWidth: '560px' }}>
          <div
            className="mb-4 font-mono text-[12px] font-normal uppercase tracking-[0.04em]"
            style={{ color: 'var(--text-body-muted)' }}
          >
            Everything you need
          </div>
          <h2
            className="mb-4 font-display font-semibold tracking-tight"
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              color: 'var(--text-heading)',
              letterSpacing: '-0.01em',
              lineHeight: '1.15',
            }}
          >
            A seamless workflow.
          </h2>
          <p
            className="font-sans text-[18px] leading-[1.4]"
            style={{ color: 'var(--text-body)', letterSpacing: '-0.002em' }}
          >
            Devix combines the power of a local IDE with the accessibility of the web.
          </p>
        </div>

        {/* Card Grid — 3 column */}
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Row 1 */}
          <div className="sm:col-span-2">
            <FeatureCard feature={FEATURES[0]} surface="elevated" />
          </div>
          <div className="sm:col-span-1">
            <FeatureCard feature={FEATURES[1]} surface="warm" />
          </div>

          {/* Row 2 */}
          <div className="sm:col-span-1">
            <FeatureCard feature={FEATURES[2]} surface="warm" />
          </div>
          <div className="sm:col-span-1">
            <FeatureCard feature={FEATURES[3]} surface="elevated" />
          </div>

          {/* Unlimited Projects — accent card */}
          <div
            className="flex flex-col justify-between"
            style={{
              backgroundColor: 'var(--surface-warm-card)',
              borderRadius: '24px',
              padding: '31px',
              border: 'none',
              boxShadow: 'none',
              minHeight: '220px',
            }}
          >
            <div>
              <div
                className="mb-5 flex h-9 w-9 items-center justify-center font-display text-lg font-bold"
                style={{
                  backgroundColor: 'var(--bg-brand)',
                  color: 'var(--text-on-brand)',
                  borderRadius: '0px',
                }}
              >
                ∞
              </div>
              <h3
                className="mb-2 font-sans text-[20px] font-semibold"
                style={{ color: 'var(--text-heading)' }}
              >
                Unlimited Projects
              </h3>
              <p
                className="font-sans text-[15px] font-normal leading-[1.4]"
                style={{ color: 'var(--text-body)' }}
              >
                Create as many sandboxes as you need, without limits or artificial throttles.
              </p>
            </div>
            <div
              className="mt-4 font-mono text-[12px] uppercase tracking-[0.04em] font-normal"
              style={{ color: 'var(--text-body-muted)' }}
            >
              Always Free in Alpha
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
