import React, { useState } from 'react';
import dayjs from 'dayjs';
import { CalendarDays, Type } from 'lucide-react';

export default function GenerateContent() {
  const [range, setRange] = useState(7);
  const [promptText, setPromptText] = useState('');
  const [cards, setCards] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const generateCards = () => {
    if (!promptText.trim()) {
      return alert('Please add a prompt to guide content generation.');
    }

    const today = dayjs();
    const days = [];
    for (let i = 0; i < range; i++) {
      const d = today.add(i, 'day');
      days.push({
        date: d.format('YYYY-MM-DD'),
        content: `🪄 AI content for ${d.format('ddd, MMM D')} — Prompt: ${promptText}`,
      });
    }
    setCards(days);
    setShowAll(false);
  };

  const visibleCards = showAll ? cards : cards.slice(0, 7);

  return (
    <div className="min-h-screen bg-[#ffffff] p-6 text-gray-800 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <CalendarDays className="text-orange-500 w-6 h-6" />
          <h1 className="text-2xl font-bold text-orange-600">Generate AI Content</h1>
        </div>

        {/* Input Section */}
        <div className="space-y-4">
          {/* Prompt with embedded range selector in textarea container */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Type className="w-4 h-4 text-gray-500" />
              <label className="font-medium text-sm text-gray-700">Prompt & Range:</label>
            </div>
            <div className="relative">
              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                rows={4}
                placeholder="E.g., Tech trends in AI..."
                className="w-full border px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none pt-10"
              />
              <select
                value={range}
                onChange={(e) => setRange(Number(e.target.value))}
                className="absolute top-2 right-2 bg-white border px-2 py-1 text-xs rounded focus:outline-none focus:ring-1 focus:ring-orange-400"
              >
                <option value={7}>7 Days</option>
                <option value={15}>15 Days</option>
                <option value={30}>30 Days</option>
              </select>
              <div className="absolute top-2 left-3 text-xs text-gray-500">
                Range:
              </div>
            </div>
          </div>

          <button
            onClick={generateCards}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-sm rounded shadow transition"
          >
            Generate
          </button>
        </div>

        {/* Results */}
        {cards.length > 0 && (
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-2">
              Results ({cards.length} days)
            </h2>
            <ul className="space-y-2 list-disc list-inside">
              {visibleCards.map((card, idx) => (
                <li key={idx} className="text-sm text-gray-700">
                  <strong className="text-xs text-gray-500 mr-2">{card.date}:</strong>
                  {card.content}
                </li>
              ))}
            </ul>
            {cards.length > 7 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="mt-3 text-sm text-orange-600 underline"
              >
                {showAll ? 'Show Less' : `Show All (${cards.length})`}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}