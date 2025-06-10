import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Sparkles, CalendarDays, Radio, LayoutGrid, Type } from 'lucide-react';

export default function GenerateContent() {
  const [type, setType] = useState('trend');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [promptText, setPromptText] = useState('');
  const [cards, setCards] = useState([]);

  const generateCards = () => {
    if (!fromDate || !toDate || !promptText.trim()) {
      return alert('Please complete all fields.');
    }

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
  };

  return (
    <div className="min-h-screen bg-background p-10 text-foreground font-sans">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Title */}
        <div className="flex items-center gap-4">
          <Sparkles className="text-primary w-8 h-8" />
          <h1 className="text-4xl font-bold text-primary">Generate AI Content</h1>
        </div>

        {/* Input Section */}
        <div className="bg-card rounded-2xl p-8 shadow-md border space-y-6">
          {/* Date Range */}
          <div className="flex gap-6 items-center">
            <CalendarDays className="w-5 h-5 text-muted-foreground" />
            <label className="font-semibold text-sm text-muted-foreground">Select Date Range:</label>
            <input
              type="date"
              className="border border-input rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <span className="text-sm text-muted-foreground">to</span>
            <input
              type="date"
              className="border border-input rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          {/* Enhanced Prompt Section with Content Type */}
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/20">
            <div className="flex items-center gap-2 mb-4">
              <Type className="w-5 h-5 text-primary" />
              <label className="font-semibold text-base text-foreground">Content Strategy & Prompt</label>
            </div>
            
            {/* Content Type Selection */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-3">Choose your content focus:</p>
              <div className="flex gap-4">
                <label className={`flex items-center gap-3 bg-card rounded-lg px-4 py-3 border-2 transition-all cursor-pointer hover:bg-primary/5 hover:border-primary/50 ${
                  type === 'trend' ? 'border-primary bg-primary/10' : 'border-border'
                }`}>
                  <input
                    type="radio"
                    name="type"
                    value="trend"
                    checked={type === 'trend'}
                    onChange={() => setType('trend')}
                    className="accent-primary"
                  />
                  <div>
                    <span className="font-medium text-sm text-foreground">Trending Topics</span>
                    <p className="text-xs text-muted-foreground">Focus on viral, current trends</p>
                  </div>
                </label>
                <label className={`flex items-center gap-3 bg-card rounded-lg px-4 py-3 border-2 transition-all cursor-pointer hover:bg-secondary/5 hover:border-secondary/50 ${
                  type === 'niche' ? 'border-secondary bg-secondary/10' : 'border-border'
                }`}>
                  <input
                    type="radio"
                    name="type"
                    value="niche"
                    checked={type === 'niche'}
                    onChange={() => setType('niche')}
                    className="accent-secondary"
                  />
                  <div>
                    <span className="font-medium text-sm text-foreground">Niche Strategy</span>
                    <p className="text-xs text-muted-foreground">Target specific audience interests</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Textarea with dynamic styling */}
            <div className="relative">
              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                rows={4}
                placeholder={`Eg: ${type === 'trend' ? 'Focus on AI trends, viral TikTok challenges, or breaking tech news...' : 'Deep dive into productivity hacks for remote workers, sustainable living tips, or niche hobby communities...'}`}
                className={`w-full border-2 rounded-lg px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 resize-none transition-all bg-background ${
                  type === 'trend' 
                    ? 'border-primary/30 focus:ring-primary/20 focus:border-primary' 
                    : 'border-secondary/30 focus:ring-secondary/20 focus:border-secondary'
                }`}
              />
              <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${
                type === 'trend' 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-secondary/10 text-secondary'
              }`}>
                {type === 'trend' ? '🔥 Trending' : '🎯 Niche'}
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateCards}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-sm rounded-xl shadow-md transition-all"
          >
            ✨ Generate Content
          </button>
        </div>

        {/* Cards Section */}
        {cards.length > 0 && (
          <>
            <div className="flex items-center gap-2 mt-10 mb-4">
              <LayoutGrid className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold text-foreground">Generated Content ({cards.length} Days)</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-5 shadow hover:shadow-lg transition-all"
                >
                  <p className="text-xs text-muted-foreground mb-1">{card.date}</p>
                  <h3 className="font-semibold text-base mb-2">{card.content}</h3>
                  <p className="text-sm text-muted-foreground">This is a preview. Replace with actual AI-generated insights tailored to the selected focus and prompt.</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}