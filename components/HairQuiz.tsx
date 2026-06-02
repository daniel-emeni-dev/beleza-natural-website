"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Sparkles, Check } from "lucide-react";

// Explicit step structures for our clinical assessment engine
const QUIZ_STEPS = [
  {
    id: "porosity",
    title: "Determine Cuticle Porosity",
    question: "How does your hair behave when exposed to water or moisture?",
    options: [
      { value: "low", label: "Low Porosity", desc: "Water beads up on the hair strand; takes a long time to fully saturate and dry." },
      { value: "medium", label: "Normal Porosity", desc: "Absorbs moisture easily and retains it effortlessly without getting greasy." },
      { value: "high", label: "High Porosity", desc: "Absorbs water instantly but dries almost immediately; prone to frizz and tangling." }
    ]
  },
  {
    id: "texture",
    title: "Identify Follicle Pattern",
    question: "Which pattern best describes your dominant natural curl matrix?",
    options: [
      { value: "wavy", label: "Type 2: Wavy", desc: "S-shaped curves that lay relatively close to the scalp." },
      { value: "curly", label: "Type 3: Curly", desc: "Defined, springy loops ranging from loose curls to tight corkscrews." },
      { value: "coily", label: "Type 4: Coily/Kinky", desc: "Very tight, compact Z-shaped or O-shaped coils with high shrinkage thresholds." }
    ]
  },
  {
    id: "scalp",
    title: "Scalp Hydration Sebum Profile",
    question: "How does your scalp surface feel roughly 48 hours after a wash?",
    options: [
      { value: "dry", label: "Dry & Flaky", desc: "Feels tight, itchy, or exhibits fine, dry flakes due to low oil production." },
      { value: "balanced", label: "Normal / Balanced", desc: "Feels comfortable without excess oil buildup or irritation." },
      { value: "oily", label: "Oily / Overactive", desc: "Feels slick or greasy to the touch; heavy oil production at the root system." }
    ]
  }
];

interface HairQuizProps {
  onClose: () => void;
}

export default function HairQuiz({ onClose }: HairQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const stepData = QUIZ_STEPS[currentStep];
  const isLastStep = currentStep === QUIZ_STEPS.length - 1;

  const handleSelectOption = (value: string) => {
    setAnswers((prev) => ({ ...prev, [stepData.id]: value }));
  };

  const handleNext = () => {
    if (!answers[stepData.id]) return; // Enforce selection before moving forward
    if (isLastStep) {
      // Form complete! Pass payload to our engine handler
      console.log("Diagnostic Submission Payload:", answers);
      alert("Analysis Engine running logic processing...");
      onClose();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="space-y-6">
      {/* Header Profile Indicators */}
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Step {currentStep + 1} of {QUIZ_STEPS.length}
          </span>
        </div>
        {/* Progress Bar Micro-indicator */}
        <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${((currentStep + 1) / QUIZ_STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Question Header */}
      <div className="space-y-1">
        <h3 className="font-serif text-xl font-normal text-foreground">{stepData.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{stepData.question}</p>
      </div>

      {/* Interactive Options Stack Container */}
      <div className="space-y-3">
        {stepData.options.map((option) => {
          const isSelected = answers[stepData.id] === option.value;
          return (
            <button
              key={option.value}
              onClick={() => handleSelectOption(option.value)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3 group relative ${
                isSelected 
                  ? "border-primary bg-primary/[0.02] ring-1 ring-primary" 
                  : "border-border hover:border-muted-foreground/40 hover:bg-secondary/20"
              }`}
            >
              {/* Check Radio Dot Indicator */}
              <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border group-hover:border-muted-foreground/40"
              }`}>
                {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
              
              <div className="space-y-0.5">
                <p className={`text-sm font-medium transition-colors ${isSelected ? "text-primary" : "text-foreground"}`}>
                  {option.label}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {option.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation Footer Action Row */}
      <div className="flex items-center justify-between pt-4 border-t border-border/60">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="inline-flex items-center gap-1.5 px-4 h-10 rounded-full text-xs font-medium border border-border hover:bg-secondary disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={!answers[stepData.id]}
          className="inline-flex items-center gap-1.5 px-6 h-10 rounded-full text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:pointer-events-none shadow-xs transition-all"
        >
          {isLastStep ? "Submit Profile" : "Continue"}
          {!isLastStep && <ChevronRight className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}