import React, { useState } from 'react';
import dayjs from 'dayjs';
import { CalendarDays, Type } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <CalendarDays className="text-primary w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Generate AI Content</h1>
          </div>
          <p className="text-muted-foreground text-lg">Create engaging content for your social media calendar</p>
        </div>

        {/* Input Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Type className="w-5 h-5 text-primary" />
              Content Prompt
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="prompt" className="text-base font-medium">
                What type of content would you like to generate?
              </Label>
              <div className="relative">
                <Textarea
                  id="prompt"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  rows={4}
                  placeholder="E.g., Tech trends in AI, motivational quotes, business tips..."
                  className="pt-12 text-base resize-none"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <Label className="text-sm text-muted-foreground">Days:</Label>
                  <select
                    value={range}
                    onChange={(e) => setRange(Number(e.target.value))}
                    className="bg-background border border-input rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value={7}>7 Days</option>
                    <option value={15}>15 Days</option>
                    <option value={30}>30 Days</option>
                  </select>
                </div>
              </div>
            </div>

            <Button
              onClick={generateCards}
              className="w-full text-base h-12"
              size="lg"
            >
              Generate Content Calendar
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {cards.length > 0 && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Generated Content ({cards.length} days)</span>
                <div className="text-sm font-normal bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {cards.length} posts ready
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {visibleCards.map((card, idx) => (
                  <div key={idx} className="p-4 border border-border rounded-lg bg-card hover:bg-accent/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium min-w-fit">
                        {dayjs(card.date).format('MMM D')}
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground text-sm leading-relaxed">{card.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {cards.length > 7 && (
                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setShowAll(!showAll)}
                  >
                    {showAll ? 'Show Less' : `Show All ${cards.length} Posts`}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}