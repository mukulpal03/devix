import { ArrowRight, Circle, Code2, TerminalSquare } from "lucide-react";
import { Button } from "../ui/button";
import { useCreateProject } from "../../hooks/useCreateProject";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../ui/spinner";
import { Alert } from "../ui/alert";

export const LandingHero = () => {
  const { createProject, isCreatingProject, projectError } = useCreateProject();
  const navigate = useNavigate();

  const handleCreateProject = async () => {
    try {
      const response = await createProject();
      navigate(`/project/${response.id}`);
    } catch (e) {
      // Error handled by hook
    }
  };

  return (
    <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 flex flex-col items-center justify-center text-center container mx-auto px-4">
      <div className="absolute top-0 -translate-y-12 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-30 blur-[100px] pointer-events-none rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500" />

      <div className="relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
        <div className="inline-flex items-center rounded-full border border-border/50 bg-background/50 px-3 py-1 text-sm font-medium backdrop-blur-xl mb-8 transition-colors hover:bg-muted/50 cursor-default">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 shadow-[0_0_12px_rgba(99,102,241,0.8)]"></span>
          Devix Workspace
          <span className="ml-2 text-muted-foreground border-l border-border/50 pl-2">
            v1.0 is shipping
          </span>
        </div>

        <h1 className="max-w-4xl mx-auto text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
          The development <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50 dark:from-neutral-100 dark:to-neutral-500">
            system for makers
          </span>
        </h1>

        <p className="mt-8 max-w-2xl mx-auto text-lg leading-8 text-muted-foreground font-medium">
          Purpose-built for speed and collaboration. Instantly spin up a
          containerized React environment right in your browser, and build at
          the speed of thought.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button
            size="lg"
            onClick={() => void handleCreateProject()}
            disabled={isCreatingProject}
            className="h-14 px-8 text-base shadow-[0_0_40px_rgba(99,102,241,0.3)] transition-transform hover:scale-105 active:scale-95 bg-primary text-primary-foreground font-semibold rounded-full"
          >
            {isCreatingProject ? (
              <>
                <Spinner className="mr-2 h-5 w-5" />
                Allocating Container...
              </>
            ) : (
              <>
                Start Building for Free <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>

        {projectError && (
          <div className="mt-8 w-full max-w-md mx-auto animate-in fade-in">
            <Alert
              variant="destructive"
              className="text-left backdrop-blur-sm bg-destructive/10 border-destructive/20"
            >
              {projectError}
            </Alert>
          </div>
        )}
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto mt-24 mb-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both">
        <div className="relative rounded-xl border border-border/50 bg-background/40 backdrop-blur-2xl shadow-2xl overflow-hidden ring-1 ring-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none" />

          {/* Header */}
          <div className="flex items-center px-4 py-3 border-b border-border/50 bg-muted/20">
            <div className="flex space-x-2">
              <Circle className="h-3 w-3 fill-red-500 text-red-500" />
              <Circle className="h-3 w-3 fill-yellow-500 text-yellow-500" />
              <Circle className="h-3 w-3 fill-green-500 text-green-500" />
            </div>
            <div className="mx-auto flex items-center space-x-2 text-xs font-medium text-muted-foreground/80">
              <Code2 className="h-3 w-3" />
              <span>frontend / App.tsx</span>
            </div>
          </div>

          {/* Editor Body */}
          <div className="flex h-[400px]">
            {/* Sidebar Mock */}
            <div className="w-16 sm:w-48 border-r border-border/50 p-4 space-y-4 hidden sm:block bg-muted/10">
              <div className="h-3 w-1/2 bg-muted rounded animate-pulse" />
              <div className="h-3 w-3/4 bg-muted rounded animate-pulse delay-75" />
              <div className="h-3 w-2/3 bg-muted rounded animate-pulse delay-150" />
              <div className="h-3 w-full bg-primary/20 rounded" />
              <div className="h-3 w-4/5 bg-muted rounded animate-pulse delay-300" />
            </div>
            {/* Syntax Mock */}
            <div className="flex-1 p-6 text-left font-mono text-sm leading-relaxed overflow-hidden relative">
              <div className="text-blue-400">
                import <span className="text-foreground">{"{"}</span>{" "}
                <span className="text-indigo-300">useState</span>{" "}
                <span className="text-foreground">{"}"}</span> from{" "}
                <span className="text-green-400">'react'</span>;
              </div>
              <br />
              <div className="text-purple-400">
                export default function{" "}
                <span className="text-yellow-300">App</span>() {"{"}
              </div>
              <div className="pl-4 text-foreground">
                const [count, setCount] ={" "}
                <span className="text-indigo-300">useState</span>(0);
              </div>
              <br />
              <div className="pl-4 text-purple-400">return (</div>
              <div className="pl-8 text-gray-300">
                {'<div className="min-h-screen bg-black text-white">'}
              </div>
              <div className="pl-12 text-foreground">
                {"<h1>"}Devix is blazing fast{"</h1>"}
              </div>
              <div className="pl-8 text-gray-300">{"</div>"}</div>
              <div className="pl-4 text-purple-400">);</div>
              <div className="text-purple-400">{"}"}</div>

              {/* Terminal Mock superimposed at the bottom right */}
              <div className="absolute right-4 bottom-4 w-64 h-32 rounded-lg border border-border/50 bg-background/80 backdrop-blur shadow-2xl p-3 flex flex-col hidden sm:flex">
                <div className="flex items-center mb-2 text-xs text-muted-foreground space-x-1">
                  <TerminalSquare className="h-3 w-3" />
                  <span>bash</span>
                </div>
                <div className="font-mono text-xs text-green-400">
                  <span className="text-fuchsia-400">~</span>$ pnpm run dev
                </div>
                <div className="font-mono text-xs text-muted-foreground mt-1">
                  VITE v6.0.0 ready in 150 ms
                </div>
                <div className="font-mono text-xs text-blue-400 mt-1">
                  ➜ Local: http://localhost:5173/
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
