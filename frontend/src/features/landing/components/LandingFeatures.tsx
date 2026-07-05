import { motion } from "framer-motion";

const FEATURES = [
  {
    id: "instant_environments",
    label: "Instant Environments",
    copy: "Zero setup. Pick a template and get a fully configured runtime in under 3 seconds. The environment is instantly booted, dependencies are cached, and you're ready to code.",
    glow: "linear-gradient(135deg, #788C5D, #E3DACC)", // Olive to Warm Stone
    visual: (
      <img
        src="/environment.png"
        alt="Instant Environments"
        className="w-full h-auto object-cover block"
      />
    ),
  },
  {
    id: "integrated_terminal",
    label: "Integrated Terminal",
    copy: "A full-featured bash/zsh terminal right where you code. Run servers, execute scripts, and manage version control without ever leaving the browser.",
    glow: "linear-gradient(135deg, #E35C38, #E3DACC)", // Clay to Warm Stone
    visual: (
      <img
        src="/terminal.png"
        alt="Integrated Terminal"
        className="w-full h-auto object-cover block"
      />
    ),
  },
  {
    id: "file_system",
    label: "Persistent File System",
    copy: "A familiar VS Code-style folder tree. Create, move, and edit files with full git support and instant state synchronization.",
    glow: "linear-gradient(135deg, #788C5D, #E35C38)", // Olive to Clay
    visual: (
      <img
        src="/file-tree.png"
        alt="File System"
        className="w-full h-auto object-cover block"
      />
    ),
  },
  {
    id: "collaborative_editing",
    label: "Collaborative Editing",
    copy: "Pair program in real time. Experience multiple cursors, shared terminal sessions, and live presence tracking with zero latency.",
    glow: "linear-gradient(135deg, #E35C38, #788C5D)", // Clay to Olive
    visual: (
      <img
        src="/collaborative.png"
        alt="Collaborative Editing"
        className="w-full h-auto object-cover block"
      />
    ),
  },
];

export const LandingFeatures = () => {
  return (
    <section
      id="features"
      className="px-6"
      style={{
        backgroundColor: "var(--surface-page-base)",
        paddingTop: "160px",
        paddingBottom: "160px",
      }}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Section Header */}
        <div
          className="mb-24 md:mx-auto md:text-center flex flex-col md:items-center"
          style={{ maxWidth: "720px" }}
        >
          <div
            className="mb-6 font-mono text-[12px] font-medium uppercase tracking-[0.06em]"
            style={{ color: "var(--text-body-muted)" }}
          >
            Capabilities
          </div>
          <h2
            className="mb-6 font-display font-semibold tracking-tight"
            style={{
              fontSize: "clamp(40px, 5vw, 64px)",
              color: "var(--text-heading)",
              letterSpacing: "-0.02em",
              lineHeight: "1.05",
            }}
          >
            A completely seamless development workflow.
          </h2>
          <p
            className="font-sans text-[20px] leading-[1.6]"
            style={{ color: "var(--text-body)" }}
          >
            Devix merges the uncompromising power of a local IDE with the
            frictionless accessibility of the web.
          </p>
        </div>

        {/* Staggered Editorial Narrative */}
        <div className="flex flex-col">
          {FEATURES.map((feature, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <div
                key={feature.id}
                className="py-24 border-t border-[var(--border-default-subtle)] last:border-b last:border-[var(--border-default-subtle)]"
              >
                <div
                  className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${isReversed ? "lg:flex-row-reverse" : ""}`}
                >
                  {/* Text Content */}
                  <div className="w-full lg:w-1/2 flex flex-col items-start">
                    <span className="font-mono text-[13px] font-medium uppercase tracking-[0.06em] text-[var(--text-body-muted)] mb-6">
                      0{index + 1} // {feature.id.replace("_", " ")}
                    </span>
                    <h3
                      className="font-display text-[32px] md:text-[40px] font-semibold leading-[1.15] tracking-tight mb-6"
                      style={{ color: "var(--text-heading)" }}
                    >
                      {feature.label}
                    </h3>
                    <p
                      className="font-sans text-[18px] leading-[1.6]"
                      style={{ color: "var(--text-body)", maxWidth: "480px" }}
                    >
                      {feature.copy}
                    </p>
                  </div>

                  {/* Visual Frame - Floating 3D Image with Colorful Ambient Glow */}
                  <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                    <div className="w-full relative max-w-[600px] flex items-center justify-center" style={{ perspective: "1200px" }}>
                      
                      {/* Colorful Ambient Background */}
                      <div 
                         className="absolute w-[60%] h-[60%] z-0 rounded-full blur-[100px] opacity-20"
                         style={{ background: feature.glow || "var(--accent-clay)" }}
                      />

                      <motion.div
                        className="w-full relative z-10"
                        animate={{ y: [-12, 12, -12] }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 6, 
                          ease: "easeInOut",
                          delay: index * 0.4 // Stagger the floating so they aren't synchronized
                        }}
                        style={{
                          // Soft dark shadow for depth + subtle white glow to separate from black BG
                          filter: "drop-shadow(0 40px 50px rgba(0,0,0,0.8)) drop-shadow(0 10px 40px rgba(255,255,255,0.06))",
                          // Tilt inwards depending on which side of the screen it's on
                          transform: `rotateX(4deg) rotateY(${isReversed ? 6 : -6}deg)`,
                          transformStyle: "preserve-3d"
                        }}
                      >
                        {feature.visual}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
