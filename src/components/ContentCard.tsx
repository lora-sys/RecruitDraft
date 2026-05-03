import React from 'react';
import ReactMarkdown from 'react-markdown';
import { FileText, Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface ContentCardProps {
  title: string;
  content: string;
  icon: React.ReactNode;
}

export const ContentCard: React.FC<ContentCardProps> = ({ title, content, icon }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-natural-card rounded-xl border border-natural-border shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col h-full"
    >
      <div className="px-5 py-4 border-b border-[#F0F0E8] flex items-center justify-between bg-white">
        <div className="flex items-center gap-2 font-bold text-[12px] uppercase tracking-wider text-[#535C4A]">
          {icon} <span>{title}</span>
        </div>
        <button
          onClick={handleCopy}
          className="p-1.5 hover:bg-natural-tag rounded transition-colors text-natural-muted flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider"
        >
          {copied ? <Check className="w-3 h-3 text-natural-primary" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="p-6 overflow-y-auto flex-1 prose prose-slate prose-sm max-w-none prose-headings:font-serif prose-headings:text-natural-accent prose-p:text-natural-text/80 prose-li:text-natural-text/80">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      <div className="px-5 py-3 bg-[#FAFAF8] border-t border-[#F0F0E8] flex justify-end">
        <span className="text-[9px] font-bold text-natural-muted uppercase tracking-widest bg-white px-2 py-0.5 rounded border border-natural-border">
          Ready
        </span>
      </div>
    </motion.div>
  );
};
