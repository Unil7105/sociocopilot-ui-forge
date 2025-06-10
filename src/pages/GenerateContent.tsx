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
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-[760px] bg-card rounded-2xl shadow-sm border border-border p-8 space-y-6">
        {/* Header */}
        <div className="text-left space-y-2">
          <h2 className="text-[28px] font-semibold text-foreground leading-tight">✨ Generate AI Content</h2>
          <p className="text-[14px] text-muted-foreground">Plan engaging posts in minutes</p>
        </div>

        {/* Date Range Section */}
        <div className="space-y-4">
          <label className="text-[14px] font-medium text-muted-foreground">Date Range</label>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-muted-foreground" />
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border-none border-b-2 border-border bg-transparent px-0 py-2 text-[16px] text-foreground focus:outline-none focus:border-primary transition-all duration-200"
              />
            </div>
            <span className="text-[14px] text-muted-foreground">to</span>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border-none border-b-2 border-border bg-transparent px-0 py-2 text-[16px] text-foreground focus:outline-none focus:border-primary transition-all duration-200"
              />
            </div>
            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => setQuickDate(7)}
                className="px-3 py-1.5 text-[14px] text-muted-foreground border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              >
                7 days
              </button>
              <button
                onClick={() => setQuickDate(30)}
                className="px-3 py-1.5 text-[14px] text-muted-foreground border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              >
                30 days
              </button>
            </div>
          </div>
        </div>

        {/* Strategy Pills */}
        <div className="space-y-4">
          <label className="text-[14px] font-medium text-muted-foreground">Content Strategy</label>
          <div className="flex gap-3 flex-wrap">
            <label className={`cursor-pointer rounded-lg px-6 py-3 border-2 transition-all duration-200 ${
              type === 'trend' 
                ? 'bg-secondary border-secondary text-foreground shadow-sm' 
                : 'border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground'
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
            <label className={`cursor-pointer rounded-lg px-6 py-3 border-2 transition-all duration-200 ${
              type === 'niche' 
                ? 'bg-secondary border-secondary text-foreground shadow-sm' 
                : 'border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground'
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
        <div className="space-y-4">
          <label className="text-[14px] font-medium text-muted-foreground">Content Prompt</label>
          <div className="relative">
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              rows={5}
              placeholder="Eg: Focus on AI trends, viral TikTok challenges, or breaking tech news..."
              className="w-full h-[120px] border border-border rounded-lg px-4 py-3 text-[16px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 resize-none bg-card transition-all duration-200"
              style={{ lineHeight: '1.45' }}
            />
            {type === 'trend' && (
              <div className="absolute top-3 right-3 bg-secondary text-primary px-2 py-1 rounded text-[12px] font-medium flex items-center gap-1 shadow-sm">
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
          className="w-full h-[52px] bg-primary hover:bg-primary/90 text-primary-foreground rounded-full text-[16px] font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
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
          <div className="text-center py-16 space-y-3">
            <Sparkles className="w-16 h-16 text-muted mx-auto mb-4 opacity-50" />
            <div className="space-y-1">
              <p className="text-foreground text-[16px] font-medium">Ready to create amazing content?</p>
              <p className="text-muted-foreground text-[14px]">Fill out the form above to get started</p>
            </div>
          </div>
        )}
      </div>

      {/* Generated Cards */}
      {cards.length > 0 && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fade-in" onClick={() => setCards([])}>
          <div className="bg-card rounded-2xl shadow-lg border border-border max-w-4xl w-full max-h-[80vh] overflow-auto p-8 animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <LayoutGrid className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-[20px] font-semibold text-foreground">Generated Content ({cards.length} Days)</h2>
              </div>
              <button
                onClick={() => setCards([])}
                className="text-muted-foreground hover:text-foreground text-[24px] p-1 rounded-full hover:bg-accent transition-all duration-200"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="bg-background border border-border rounded-xl p-5 hover:shadow-md hover:scale-[1.02] transition-all duration-200 space-y-3"
                >
                  <p className="text-[12px] text-muted-foreground font-medium">{card.date}</p>
                  <h3 className="font-medium text-[14px] text-foreground leading-tight">{card.content}</h3>
                  <p className="text-[12px] text-muted-foreground">This is a preview. Replace with actual AI-generated insights.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}