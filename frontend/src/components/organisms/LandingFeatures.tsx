import { Terminal, Code2, Users, Cpu, ArrowRight } from 'lucide-react'

const features = [
  {
    name: 'Browser-based IDE',
    description: 'Code from anywhere with a full-featured development environment right in your browser. No complex local setups.',
    icon: Code2,
  },
  {
    name: 'Instant Environments',
    description: 'Spin up a new React + Vite project in seconds. We handle the boilerplate so you can focus on writing code.',
    icon: Cpu,
  },
  {
    name: 'Docker Containers',
    description: 'Isolated, reproducible, and secure terminal environments powered by Docker, ensuring your code runs the same everywhere.',
    icon: Terminal,
  },
  {
    name: 'Collaborative Coding',
    description: 'Share your workspace and code together with your team in real-time, just like Google Docs for developers.',
    icon: Users,
  },
]

export const LandingFeatures = () => {
  return (
    <section className="container mx-auto px-4 py-24 sm:py-32 relative">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-sm font-semibold tracking-wide uppercase text-indigo-500">Everything you need</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl text-foreground">
          A seamless workflow.
        </p>
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-xl mx-auto">
          Devix combines the power of a local IDE with the accessibility of the web. Focus on shipping, we handle the infrastructure.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-5xl sm:mt-20 lg:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div key={feature.name} className="group relative rounded-2xl border border-border/50 bg-muted/10 p-8 shadow-sm transition-all hover:bg-muted/30 hover:border-border overflow-hidden">
              <div className="absolute opacity-0 group-hover:opacity-100 inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-background/50 border border-border/50 shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <feature.icon className="h-6 w-6 text-indigo-400" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.name}</h3>
                <p className="text-muted-foreground flex-1">
                  {feature.description}
                </p>
                <div className="mt-6 flex items-center text-sm font-medium text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
