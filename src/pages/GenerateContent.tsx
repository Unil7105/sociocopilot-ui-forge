import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Sparkles, Loader2, Wand2, CalendarDays } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function GenerateContent() {
  const [promptText, setPromptText] = useState('');
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fromDate, setFromDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [toDate, setToDate] = useState(dayjs().add(6, 'day').format('YYYY-MM-DD'));
  const { toast } = useToast();

  const generateCards = async () => {
    if (!promptText.trim() || !fromDate || !toDate) {
      toast({
        title: "Complete all fields",
        description: "Please enter your content idea and select both dates",
        variant: "destructive",
      });
      return;
    }

    if (dayjs(toDate).isBefore(dayjs(fromDate))) {
      toast({
        title: "Invalid date range",
        description: "End date must be after start date",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    toast({
      title: "Creating your content...",
      description: "This will take just a moment",
    });

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate content for selected date range
    const startDate = dayjs(fromDate);
    const endDate = dayjs(toDate);
    const days = [];
    
    let currentDate = startDate;
    while (currentDate.valueOf() <= endDate.valueOf()) {
      days.push({
        date: currentDate.format('YYYY-MM-DD'),
        content: `💡 ${currentDate.format('ddd, MMM D')}: ${promptText} - AI-generated engaging post idea with trending hashtags and optimal posting time.`
      });
      currentDate = currentDate.add(1, 'day');
    }

    setCards(days);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-[600px] space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto">
            <Wand2 className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Generate Content</h1>
            <p className="text-muted-foreground text-lg">What would you like to create content about?</p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-card rounded-3xl shadow-sm border border-border p-8 space-y-6">
          {/* Content Input */}
          <div className="space-y-4">
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              rows={4}
              placeholder="e.g. AI trends in healthcare, sustainable living tips, productivity hacks..."
              className="w-full border-2 border-border rounded-2xl px-6 py-4 text-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-4 focus:ring-ring/10 resize-none bg-background/50 transition-all duration-200"
              style={{ lineHeight: '1.5' }}
            />
          </div>

          {/* Date Range */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground">Date Range</label>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 flex-1">
                <CalendarDays className="w-4 h-4 text-muted-foreground" />
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="flex-1 border-2 border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 bg-background/50 transition-all duration-200"
                />
              </div>
              <span className="text-muted-foreground">to</span>
              <div className="flex-1">
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full border-2 border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 bg-background/50 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateCards}
            disabled={isLoading || !promptText.trim() || !fromDate || !toDate}
            className="w-full h-14 bg-primary hover:bg-primary/90 hover:shadow-lg hover:scale-[1.02] text-primary-foreground rounded-2xl text-lg font-semibold transition-all duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-ring/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-3 shadow-md"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating your content...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Content
              </>
            )}
          </button>
        </div>

        {/* Empty State */}
        {cards.length === 0 && !isLoading && (
          <div className="text-center py-8 space-y-4">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6 text-muted-foreground/60" />
            </div>
            <div className="space-y-1">
              <p className="text-foreground font-medium">Ready when you are</p>
              <p className="text-muted-foreground text-sm">Enter your topic above to get started</p>
            </div>
          </div>
        )}
      </div>

      {/* Generated Cards Modal */}
      {cards.length > 0 && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50" onClick={() => setCards([])}>
          <div className="bg-card rounded-3xl shadow-2xl border border-border max-w-4xl w-full max-h-[85vh] overflow-auto p-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-foreground">Your Content Ideas</h2>
                <p className="text-muted-foreground">{cards.length} {cards.length === 1 ? 'day' : 'days'} of engaging content ready to go</p>
              </div>
              <button
                onClick={() => setCards([])}
                className="w-10 h-10 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full flex items-center justify-center transition-all duration-200"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="bg-background/80 border border-border/60 rounded-2xl p-6 hover:shadow-md hover:border-border transition-all duration-200 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {dayjs(card.date).format('dddd, MMMM D')}
                    </p>
                  </div>
                  <p className="text-foreground leading-relaxed">{card.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}