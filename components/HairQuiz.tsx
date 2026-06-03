"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Sparkles, Loader2 } from "lucide-react";

// Friendly, relatable quiz questions tailored for regular people
const QUIZ_STEPS = [
  {
    id: "porosity",
    question: "How does your hair handle water?",
    description: "Think about what happens when you wash it or go out in high humidity.",
    options: [
      { value: "low", label: "Water seems to roll right off it", sub: "It takes forever to get fully wet, and products tend to just sit on top of my hair instead of sinking in." },
      { value: "normal", label: "It behaves pretty normally", sub: "It absorbs water easily, holds onto moisture well, and doesn't require too much fuss." },
      { value: "high", label: "It drinks up water but dries out fast", sub: "It gets wet instantly, but loses that moisture just as quickly, leaving it feeling dry and frizzy." }
    ]
  },
  {
    id: "scalp",
    question: "How would you describe your scalp?",
    description: "Focus on how your roots feel a day or two after a wash.",
    options: [
      { value: "oily", label: "It gets oily pretty quickly", sub: "My roots feel greasy fast, and I find myself needing to wash it frequently to keep it feeling fresh." },
      { value: "normal", label: "Balanced and comfortable", sub: "Not too dry, not too greasy. It stays relatively clean and happy between wash days." },
      { value: "dry", label: "It feels dry, tight, or flaky", sub: "My scalp craves moisture, rarely gets oily, and sometimes feels a bit itchy or irritated." }
    ]
  },
  {
    id: "pattern",
    question: "What does your natural shape look like?",
    description: "Choose the option that matches your hair when it's completely air-dried with no product.",
    options: [
      { value: "wavy", label: "Loose waves or 'S' shapes", sub: "It has a gentle bend, lies relatively flat at the roots, and can easily be weighed down by heavy products." },
      { value: "curly", label: "Defined curls or loops", sub: "Clear springy shapes ranging from loose loops to tight corkscrews that love moisture." },
      { value: "coily", label: "Tight coils or zig-zag patterns", sub: "Beautiful, dense textures with micro-coils that experience quite a bit of natural shrinkage." }
    ]
  }
];

interface HairQuizProps {
  onClose: () => void;
}

export default function HairQuiz({ onClose }: HairQuizProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const stepData = QUIZ_STEPS[currentStep];

  const handleSelectOption = (value: string) => {
    setAnswers((prev) => ({ ...prev, [stepData.id]: value }));
  };

  const handleNext = async () => {
    if (currentStep < QUIZ_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      await handleSubmitQuiz();
    }
  }; This is my HairQuiz.tsx, make the updates for me please, with out changing anything else

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      onClose();
    }
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const payload = {
        user_id: session?.user?.id || null,
        porosity_score: answers.porosity,
        scalp_type: answers.scalp,
        curl_pattern: answers.pattern,
        created_at: new Date().toISOString()
      };

      // Save to Supabase diagnostic tables
      const { error } = await supabase.from("hair_diagnostics").insert([payload]);

      if (error) throw error;

      // Direct page change right over to their private routine room
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Error saving quiz:", err.message);
      setErrorMessage("Something went wrong on our end. Let's try submitting that again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedValue = answers[stepData.id];

  return (
    <div className="space-y-6">
      {/* Quiz Progress Status Strip */}
      <div className="flex items-center justify-between text-xs text-muted-foreground font-medium mb-2">
        <span>Step {currentStep + 1} of {QUIZ_STEPS.length}</span>
        <div className="flex gap-1">
          {QUIZ_STEPS.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx <= currentStep ? "w-6 bg-primary" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Dynamic Header Block */}
      <div className="space-y-1.5">
        <h2 className="font-serif text-2xl font-medium text-foreground tracking-tight">
          {stepData.question}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {stepData.description}
        </p>
      </div>

      {/* Error Bar */}
      {errorMessage && (
        <div className="p-3 bg-destructive/10 border-2 border-destructive/20 text-destructive text-xs font-medium rounded-xl">
          {errorMessage}
        </div>
      )}

      {/* Option Selection List Frame */}
      <div className="space-y-3 py-2">
        {stepData.options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <button
              key={option.value}
              onClick={() => handleSelectOption(option.value)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-4 ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-xs"
                  : "border-border bg-card hover:bg-secondary/40"
              }`}
            >
              <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                isSelected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"
              }`}>
                {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
              <div className="space-y-1">
                <p className={`text-sm font-semibold transition-colors ${isSelected ? "text-primary" : "text-foreground"}`}>
                  {option.label}
                </p>
                <p className="text-xs text-muted-foreground leading-normal">
                  {option.sub}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation Footer Toolbar */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <button
          onClick={handleBack}
          disabled={isSubmitting}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={!selectedValue || isSubmitting}
          className="inline-flex items-center justify-center gap-2 text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-5 rounded-full shadow-sm transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Saving your plan...
            </>
          ) : currentStep === QUIZ_STEPS.length - 1 ? (
            <>
              See My Routine
              <Sparkles className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              Next Question
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}