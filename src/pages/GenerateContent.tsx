import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Sparkles, CalendarDays, LayoutGrid, Flame, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function GenerateContent() {
  const [type, setType] = useState('trend');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [promptText, setPromptText] = useState('');
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const setQuickDate = (days: number) => {
    const today = dayjs();
    setFromDate(today.format('YYYY-MM-DD'));
    setToDate(today.add(days, 'day').format('YYYY-MM-DD'));
  };

  const generateCards = async () => {
    if (!fromDate || !toDate || !promptText.trim()) {
      toast({
        title: "Missing information",
        description: "Please complete all fields before generating content.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    toast({
      title: "We're cooking up ideas…",
      description: "Your content is being generated",
    });

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 2000));

    const start = dayjs(fromDate);
    const end = dayjs(toDate);
    const days = [];

    for (let d = start; d.isBefore(end) || d.isSame(end); d = d.add(1, 'day')) {
      days.push({
        date: d.format('YYYY-MM-DD'),
        type,
        content: `🪄 AI content for ${d.format('ddd, MMM D')} — Focus: ${type === 'trend' ? 'Trending topics' : 'Niche strategy'} — Prompt: ${promptText}`
      });
    }

    setCards(days);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen font-[Inter] bg-[#FDFCF9] flex items-center justify-center p-6">
      <div className="w-full max-w-[760px] bg-white rounded-2xl shadow-sm p-8 space-y-6">
        {/* Header */}
        <div className="text-left">
          <h2 className="text-[28px] font-semibold text-[#3D3A31] leading-tight">✨ Generate AI Content</h2>
          <p className="text-[14px] text-[#6E675F] mt-1">Plan engaging posts in minutes</p>
        </div>

        {/* Date Range Section */}
        <div className="space-y-3">
          <label className="text-[14px] font-medium text-[#6E675F]">Date Range</label>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-[#6E675F]" />
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border-none border-b-2 border-[#EBDDC8] bg-transparent px-0 py-2 text-[16px] text-[#3D3A31] focus:outline-none focus:border-[#FFB46A] transition-colors"
              />
            </div>
            <span className="text-[14px] text-[#6E675F]">to</span>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border-none border-b-2 border-[#EBDDC8] bg-transparent px-0 py-2 text-[16px] text-[#3D3A31] focus:outline-none focus:border-[#FFB46A] transition-colors"
              />
            </div>
            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => setQuickDate(7)}
                className="px-3 py-1 text-[14px] text-[#6E675F] border border-[#EBDDC8] rounded-lg hover:bg-[#FFF4DD] transition-colors"
              >
                7 days
              </button>
              <button
                onClick={() => setQuickDate(30)}
                className="px-3 py-1 text-[14px] text-[#6E675F] border border-[#EBDDC8] rounded-lg hover:bg-[#FFF4DD] transition-colors"
              >
                30 days
              </button>
            </div>
          </div>
        </div>

        {/* Strategy Pills */}
        <div className="space-y-3">
          <label className="text-[14px] font-medium text-[#6E675F]">Content Strategy</label>
          <div className="flex gap-3">
            <label className={`cursor-pointer rounded-lg px-4 py-3 border-2 transition-all ${
              type === 'trend' 
                ? 'bg-[#FAEBCB] border-[#FAEBCB] text-[#3D3A31]' 
                : 'border-[#EBDDC8] text-[#6E675F] hover:bg-[#FFF4DD]'
            }`}>
              <input
                type="radio"
                name="type"
                value="trend"
                checked={type === 'trend'}
                onChange={() => setType('trend')}
                className="sr-only"
              />
              <span className="text-[16px] font-medium">Trending Topics</span>
            </label>
            <label className={`cursor-pointer rounded-lg px-4 py-3 border-2 transition-all ${
              type === 'niche' 
                ? 'bg-[#FAEBCB] border-[#FAEBCB] text-[#3D3A31]' 
                : 'border-[#EBDDC8] text-[#6E675F] hover:bg-[#FFF4DD]'
            }`}>
              <input
                type="radio"
                name="type"
                value="niche"
                checked={type === 'niche'}
                onChange={() => setType('niche')}
                className="sr-only"
              />
              <span className="text-[16px] font-medium">Niche Strategy</span>
            </label>
          </div>
        </div>

        {/* Prompt Textarea */}
        <div className="space-y-3">
          <label className="text-[14px] font-medium text-[#6E675F]">Content Prompt</label>
          <div className="relative">
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              rows={5}
              placeholder="Eg: Focus on AI trends, viral TikTok challenges, or breaking tech news..."
              className="w-full h-[120px] border border-[#EBDDC8] rounded-lg px-4 py-3 text-[16px] text-[#3D3A31] placeholder-[#6E675F] focus:outline-none focus:border-[#FFB46A] focus:ring-2 focus:ring-[#FFB46A]/20 resize-none shadow-inner bg-white transition-all"
              style={{ lineHeight: '1.45' }}
            />
            {type === 'trend' && (
              <div className="absolute top-2 right-2 bg-[#FFB46A]/20 text-[#FFB46A] px-2 py-1 rounded text-[12px] font-medium flex items-center gap-1">
                <Flame className="w-3 h-3" />
                Trending
              </div>
            )}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateCards}
          disabled={isLoading}
          className="w-full h-[48px] bg-[#412C1A] hover:bg-[#2D1F12] text-white rounded-full text-[16px] font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#FFB46A] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            '✨ Generate Content'
          )}
        </button>

        {/* Empty State */}
        {cards.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Sparkles className="w-12 h-12 text-[#EBDDC8] mx-auto mb-4" />
            <p className="text-[#6E675F] text-[16px]">Ready to create amazing content?</p>
            <p className="text-[#6E675F] text-[14px] mt-1">Fill out the form above to get started</p>
          </div>
        )}
      </div>

      {/* Generated Cards */}
      {cards.length > 0 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50" onClick={() => setCards([])}>
          <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full max-h-[80vh] overflow-auto p-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-[#6E675F]" />
                <h2 className="text-[20px] font-semibold text-[#3D3A31]">Generated Content ({cards.length} Days)</h2>
              </div>
              <button
                onClick={() => setCards([])}
                className="text-[#6E675F] hover:text-[#3D3A31] text-[24px]"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="bg-[#FDFCF9] border border-[#EBDDC8] rounded-xl p-4 hover:shadow-md transition-all"
                >
                  <p className="text-[12px] text-[#6E675F] mb-2">{card.date}</p>
                  <h3 className="font-medium text-[14px] mb-2 text-[#3D3A31] leading-tight">{card.content}</h3>
                  <p className="text-[12px] text-[#6E675F]">This is a preview. Replace with actual AI-generated insights.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}