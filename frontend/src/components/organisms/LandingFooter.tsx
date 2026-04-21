export const LandingFooter = () => {
  return (
    <footer className="py-6 md:px-8 md:py-0 border-t border-border/40 bg-muted/20">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by your awesome team. The source code is available on <a href="#" className="font-medium underline underline-offset-4 pointer-events-none">GitHub</a>.
        </p>
      </div>
    </footer>
  )
}
