/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { RoleInput } from "./components/RoleInput";
import { ContentCard } from "./components/ContentCard";
import { generateRecruitmentMaterials } from "./services/gemini";
import { FileText, MessageSquareQuote, RefreshCw, Sparkles, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    jobDescription: string;
    interviewGuide: string;
    roleTitle: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (roleTitle: string, notes: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await generateRecruitmentMaterials({ roleTitle, notes });
      setResults({ ...data, roleTitle });
    } catch (err) {
      setError("Failed to generate recruitment materials. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResults(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-natural-bg text-natural-text font-sans selection:bg-natural-primary/10 selection:text-natural-accent">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-natural-card border-b border-natural-border z-50">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2 font-serif text-2xl font-bold text-natural-primary">
            <span>RecruitDraft<span className="italic font-light opacity-60">.sandbox</span></span>
          </div>
          {results && (
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline-flex px-3 py-1 bg-[#DDE2D7] text-natural-primary text-[10px] font-bold uppercase tracking-wider rounded">
                Drafting: {results.roleTitle}
              </span>
              <button
                onClick={reset}
                className="px-4 py-2 text-sm font-medium border border-natural-primary text-natural-primary rounded-lg hover:bg-natural-primary hover:text-white transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Start New
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!results ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-3xl mx-auto"
            >
              <div className="text-center mb-12 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-natural-tag text-natural-primary text-[10px] font-bold uppercase tracking-[1.5px]">
                  <Sparkles className="w-3 h-3 text-natural-primary/60" /> Version 2.4.0
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-black text-natural-accent tracking-tight">
                  RecruitDraft Sandbox
                </h1>
                <p className="text-natural-muted text-lg max-w-xl mx-auto">
                  Transform raw interview notes into high-impact job descriptions and interview guides.
                </p>
              </div>

              <RoleInput onSubmit={handleGenerate} isLoading={isLoading} />
              
              {error && (
                <p className="mt-4 text-center text-red-600 text-sm font-medium">{error}</p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-natural-border pb-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-natural-muted uppercase tracking-[2px]">Artifact for</p>
                  <h2 className="text-3xl font-serif font-bold text-natural-accent">{results.roleTitle}</h2>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-320px)] min-h-[550px]">
                <ContentCard 
                  title="LinkedIn Job Description" 
                  content={results.jobDescription} 
                  icon={<FileText className="w-4 h-4 text-natural-primary" />}
                />
                <ContentCard 
                  title="Interview Prep Guide" 
                  content={results.interviewGuide} 
                  icon={<MessageSquareQuote className="w-4 h-4 text-natural-primary" />}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-auto py-8 text-center text-natural-muted text-[10px] uppercase tracking-[1px] border-t border-natural-border">
        RecruitDraft • Built with Natural Tones & AI
      </footer>
    </div>
  );
}

