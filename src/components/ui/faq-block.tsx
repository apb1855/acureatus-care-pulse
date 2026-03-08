"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, ThumbsDown, Sparkles, Search } from "lucide-react";

export interface FAQBlockProps {
  faqs: { question: string; answer: string }[];
}

function getPersonalizedFaqs(faqs: { question: string; answer: string }[]) {
  const shuffled = [...faqs].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
}

const FAQBlock = ({ faqs }: FAQBlockProps) => {
  const [search, setSearch] = useState("");
  const [feedback, setFeedback] = useState<{ [q: string]: "up" | "down" | undefined }>({});
  const [showFeedbackInput, setShowFeedbackInput] = useState<{ [q: string]: boolean }>({});
  const [feedbackText, setFeedbackText] = useState<{ [q: string]: string }>({});
  const [aiInput, setAiInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  const handleFeedback = (q: string, type: "up" | "down") => {
    setFeedback((fb) => ({ ...fb, [q]: type }));
    if (type === "down") setShowFeedbackInput((fb) => ({ ...fb, [q]: true }));
  };

  const handleAiAsk = () => {
    setAiLoading(true);
    setTimeout(() => {
      setAiResponse(
        aiInput.trim()
          ? `Sorry, I couldn't find an exact answer, but here's my best guess: "${aiInput}" is a great question! Please contact support for more details.`
          : ""
      );
      setAiLoading(false);
    }, 1200);
  };

  const personalizedFaqs = getPersonalizedFaqs(faqs);

  return (
    <Card className="w-full shadow-sm border border-border">
      <CardContent className="flex flex-col gap-6 p-4 md:p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Search FAQs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Accordion type="single" collapsible className="w-full">
          {filteredFaqs.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <p className="text-muted-foreground text-sm">No FAQs found.</p>
              <div className="flex flex-col gap-3 w-full max-w-md">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Ask our AI Assistant
                </div>
                <Textarea
                  placeholder="Type your question..."
                  value={aiInput}
                  onChange={(e) => {
                    setAiInput(e.target.value);
                    setAiResponse("");
                  }}
                  rows={2}
                />
                <Button
                  onClick={handleAiAsk}
                  disabled={aiLoading || !aiInput.trim()}
                  className="self-end"
                  size="sm"
                >
                  {aiLoading ? "Thinking..." : "Ask AI"}
                </Button>
                {aiResponse && (
                  <div className="bg-accent rounded-md p-3 text-sm text-accent-foreground">
                    {aiResponse}
                  </div>
                )}
              </div>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => (
              <AccordionItem key={idx} value={faq.question}>
                <AccordionTrigger className="text-sm md:text-base text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-3">
                    <div className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-muted-foreground">Was this helpful?</span>
                      <Button
                        size="icon"
                        variant={feedback[faq.question] === "up" ? "secondary" : "ghost"}
                        onClick={() => handleFeedback(faq.question, "up")}
                        aria-label="Helpful"
                        className="h-8 w-8"
                      >
                        <ThumbsUp className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant={feedback[faq.question] === "down" ? "secondary" : "ghost"}
                        onClick={() => handleFeedback(faq.question, "down")}
                        aria-label="Not helpful"
                        className="h-8 w-8"
                      >
                        <ThumbsDown className="h-3.5 w-3.5" />
                      </Button>
                      {feedback[faq.question] === "up" && (
                        <span className="text-xs text-primary">Thank you for your feedback!</span>
                      )}
                    </div>
                    {showFeedbackInput[faq.question] && (
                      <div className="flex flex-col gap-2">
                        <Textarea
                          placeholder="How can we improve this answer?"
                          value={feedbackText[faq.question] || ""}
                          onChange={(e) =>
                            setFeedbackText((fb) => ({ ...fb, [faq.question]: e.target.value }))
                          }
                          rows={2}
                        />
                        <Button
                          size="sm"
                          className="self-end"
                          onClick={() =>
                            setShowFeedbackInput((fb) => ({ ...fb, [faq.question]: false }))
                          }
                        >
                          Submit Feedback
                        </Button>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))
          )}
        </Accordion>
        <div className="flex flex-col gap-1">
          <div className="font-semibold text-sm text-muted-foreground">
            You might also be interested in:
          </div>
          <ul className="list-disc pl-5 flex flex-col gap-1">
            {personalizedFaqs.map((faq, i) => (
              <li key={i} className="text-sm text-muted-foreground">
                {faq.question}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default FAQBlock;
