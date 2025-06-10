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
          {/* Content Type */}
          <div className="flex items-center gap-6">
            <Radio className="w-5 h-5 text-muted-foreground" />
            <label className="font-semibold text-sm text-muted-foreground">Content Type:</label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="trend"
                checked={type === 'trend'}
                onChange={() => setType('trend')}
                className="accent-primary"
              />
              <span className="text-sm">Trend</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="niche"
                checked={type === 'niche'}
                onChange={() => setType('niche')}
                className="accent-primary"
              />
              <span className="text-sm">Different Niche</span>
            </label>
          </div>

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

          {/* Prompt Text Area */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Type className="w-5 h-5 text-muted-foreground" />
              <label className="font-semibold text-sm text-muted-foreground">Add a prompt or idea to guide content generation:</label>
            </div>
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              rows={4}
              placeholder="Eg: Focus on tech trends in AI or Social Media hooks for Gen Z..."
              className="w-full border border-input rounded-md px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none bg-background"
            />
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