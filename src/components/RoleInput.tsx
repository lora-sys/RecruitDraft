import React, { useState } from 'react';
import { Briefcase, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface RoleInputProps {
  onSubmit: (roleTitle: string, notes: string) => void;
  isLoading: boolean;
}

export const RoleInput: React.FC<RoleInputProps> = ({ onSubmit, isLoading }) => {
  const [roleTitle, setRoleTitle] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (roleTitle && notes) {
      onSubmit(roleTitle, notes);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="roleTitle" className="text-[10px] font-bold text-natural-muted uppercase tracking-[1.5px] flex items-center gap-2">
            Role Identity
          </label>
          <input
            id="roleTitle"
            type="text"
            value={roleTitle}
            onChange={(e) => setRoleTitle(e.target.value)}
            placeholder="e.g. Lead Ecosystem Architect"
            className="w-full px-4 py-3 rounded-lg border border-natural-border bg-natural-card text-sm focus:ring-1 focus:ring-natural-primary focus:border-natural-primary outline-none transition-all placeholder:text-natural-muted/50"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="notes" className="text-[10px] font-bold text-natural-muted uppercase tracking-[1.5px]">
            Raw Role Scratches
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Paste raw bullet points, stakeholder quotes, or messy requirements here..."
            className="w-full h-56 px-4 py-3 rounded-lg border border-natural-border bg-[#FAFAF8] text-sm focus:ring-1 focus:ring-natural-primary focus:border-natural-primary outline-none transition-all resize-none placeholder:text-natural-muted/50"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            "w-full py-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all uppercase tracking-widest",
            isLoading 
              ? "bg-natural-tag text-natural-muted cursor-not-allowed" 
              : "bg-natural-primary text-white hover:opacity-90 active:scale-[0.99]"
          )}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-natural-muted border-t-white rounded-full"
              />
              Generating Artifacts...
            </span>
          ) : (
            <>
              Generate Artifacts <Send className="w-4 h-4 opacity-70" />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};
