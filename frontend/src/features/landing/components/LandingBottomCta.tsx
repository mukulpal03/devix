export const LandingBottomCta = () => (
  <section
    className="px-6 text-center"
    style={{
      backgroundColor: 'var(--surface-page-base)',
      paddingTop: '84px',
      paddingBottom: '84px',
    }}
  >
    <div className="mx-auto" style={{ maxWidth: '560px' }}>
      <h2
        className="mb-6 font-display font-semibold leading-[1.15] tracking-tight"
        style={{
          fontSize: 'clamp(28px, 4vw, 40px)',
          color: 'var(--text-heading)',
          letterSpacing: '-0.01em',
        }}
      >
        Start <span className="emphasis-underline">building</span> today.
      </h2>
      <p
        className="mb-10 font-sans text-[18px] leading-[1.4] mx-auto"
        style={{ color: 'var(--text-body)', maxWidth: '420px', letterSpacing: '-0.002em' }}
      >
        No credit card. No setup. Just open a project and code.
      </p>

      {/* Brand button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="btn-brand font-sans text-[15px] font-medium px-[31px] py-[12px]"
        style={{ letterSpacing: '-0.002em' }}
      >
        Back to Top
      </button>
    </div>
  </section>
);
