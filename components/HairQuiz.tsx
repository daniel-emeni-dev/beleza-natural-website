"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { ChevronRight, ChevronLeft, Sparkles, Check, Loader2, RotateCcw, Droplets, Activity, Layers } from "lucide-react";

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
    id: "scalp_hydration",
    title: "Scalp Hydration Sebum Profile",
    question: "How does your scalp surface feel roughly 48 hours after a wash?",
    options: [
      { value: "dry", label: "Dry & Flaky", desc: "Feels tight, itchy, or exhibits fine, dry flakes due to low oil production." },
      { value: "balanced", label: "Normal / Balanced", desc: "Feels comfortable without excess oil buildup or irritation." },
      { value: "oily", label: "Oily / Overactive", desc: "Feels slick or greasy to the touch; heavy oil production at the root system." }
    ]
  }
];

// Phase 2: Dynamic Decision Matrix Engine Execution Handler
function generateClinicalRoutine(answers: Record<string, string>) {
  let summary = "";
  let steps: string[] = [];
  let products: string[] = [];

  // --- 1. BASE LAYER: POROSITY HYDRATION CHANNELING ---
  if (answers.porosity === "low") {
    summary = "Your cuticles are tightly closed, creating a dense biological barrier that locks moisture out.";
    steps = [
      "Clarify with warm water to gently lift stubborn, closed cuticles before applying treatments.",
      "Apply deep conditioning masques underneath indirect heat or a warm plastic cap to force moisture absorption.",
      "Incorporate lightweight, water-soluble humectants that slip easily beneath the cuticle layer."
    ];
    products = ["Glycerin-based leave-in serums", "Lightweight sweet almond oil", "Hydrolyzed protein treatments"];
  } else if (answers.porosity === "high") {
    summary = "Your cuticles are widely separated or structurally compromised, letting moisture escape just as fast as it enters.";
    steps = [
      "Incorporate regular protein rinses to structurally fill gaps along your fragmented cuticle scales.",
      "Layer your hydration strictly using the LOC/LCO method (Liquid, Cream, Oil) to lock in water layers.",
      "Rinse out conditioners with cool water to induce mechanical contraction and close the cuticles."
    ];
    products = ["Heavy black castor oil", "Amino acid repair masques", "Shea butter-infused sealants"];
  } else {
    summary = "Your cuticles are perfectly balanced, absorbing, transmitting, and retaining vital hydration optimally.";
    steps = [
      "Maintain a consistent weekly hydration washing interval to sustain your natural moisture balance.",
      "Protect your delicate fiber structure nightly using a premium silk or satin wrap.",
      "Alternate smoothly between pure moisture therapies and light protein reinforcing masques."
    ];
    products = ["Jojoba oil balancing mist", "Aloe vera leave-in conditioners", "Gentle sulfate-free cleansers"];
  }

  // --- 2. SECONDARY LAYER: SCALP INTERCEPTION MODIFIERS ---
  if (answers.scalp_hydration === "oily") {
    summary += " Because your sebum profile is overactive, your protocol focuses heavily on stabilizing the root ecosystem and avoiding heavy buildup.";
    steps.unshift("Execute a targeted scalp-only double cleanse during washdays to break down oxidized sebum sheets.");
    products.push("Salicylic acid scalp pre-treatment");
    
    // SAFETY REFACTOR (Con Avoided): Filter out heavy sealants or blocking butters if scalp is oily
    products = products.filter(p => !p.includes("Heavy") && !p.includes("butter") && !p.includes("castor"));
  } else if (answers.scalp_hydration === "dry") {
    summary += " Additionally, your scalp moisture barrier is slightly compromised, requiring extra lipid replenishment at the base.";
    steps.push("Massage a botanical lipid directly onto clean scalp skin post-wash to reduce flaking and itching.");
    products.push("Soothing tea tree scalp serum");
  } else {
    summary += " Your scalp sebum production is perfectly stable, providing an ideal, healthy foundation for hair growth.";
  }

  // --- 3. TERTIARY LAYER: TEXTURE MATRICES ---
  if (answers.texture === "coily") {
    steps.push("Utilize low-tension protective styling methods to buffer high mechanical shrinkage stress and eliminate split-end fraying.");
  } else if (answers.texture === "curly") {
    steps.push("Apply stylers when your hair is soaking wet to maximize definition and minimize ambient frizz formation.");
  } else if (answers.texture === "wavy") {
    steps.push("Prioritize lightweight styling mists and foams rather than heavy custards to maximize volume along your S-shaped hair matrix.");
  }

  return { summary, steps, products };
}

interface HairQuizProps {
  onClose: () => void;
}

export default function HairQuiz({ onClose }: HairQuizProps) {
  // Personalization State Layers
  const [userName, setUserName] = useState("");
  const [isStarted, setIsStarted] = useState(false);

  // Standard Quiz State Controls
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const stepData = QUIZ_STEPS[currentStep];
  const isLastStep = currentStep === QUIZ_STEPS.length - 1;

  const handleSelectOption = (value: string) => {
    setAnswers((prev) => ({ ...prev, [stepData.id]: value }));
  };

  const handleNext = async () => {
    if (!answers[stepData.id]) return;
    
    if (isLastStep) {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const { error } = await supabase
          .from("diagnostics")
          .insert([
            {
              user_name: userName.trim() || "Guest",
              porosity: answers.porosity,
              texture: answers.texture,
              scalp_hydration: answers.scalp_hydration,
            }
          ]);

        if (error) throw error;
        setShowResults(true);
      } catch (error: any) {
        console.error("Submission Error:", error);
        setSubmitError(error.message || "Failed to submit evaluation record.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setSubmitError(null);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResults(false);
    setSubmitError(null);
    setUserName("");
    setIsStarted(false);
  };

  // 1. WELCOME STEP: Prompt for personalization before firing metrics engine
  if (!isStarted) {
    return (
      <div className="space-y-6 text-left animate-in fade-in duration-300">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary uppercase tracking-wider">
            Bespoke Diagnostic Setup
          </div>
          <h3 className="font-serif text-2xl font-normal text-foreground leading-tight">
            Let's customize your assessment.
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your custom trichology protocol maps specific biological parameters. What name should we sign your prescription to?
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
            Your First Name
          </label>
          <input
            type="text"
            placeholder="e.g. Daniel"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full h-11 bg-secondary/30 rounded-xl border border-border px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && userName.trim()) setIsStarted(true);
            }}
          />
        </div>

        <div className="pt-4 border-t border-border/60 flex justify-end">
          <button
            onClick={() => setIsStarted(true)}
            disabled={!userName.trim()}
            className="inline-flex items-center gap-1.5 px-6 h-11 rounded-full text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:pointer-events-none shadow-xs transition-all"
          >
            Configure Engine
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // 2. RESULTS VIEW: Display personalized dashboard configuration
  if (showResults) {
    // Generate routine dynamically by routing state answers directly through the matrix compiler
    const routine = generateClinicalRoutine(answers);
    
    return (
      <div className="space-y-6 text-left animate-in fade-in slide-in-from-bottom-4 duration-500 print:p-6">
        <div className="flex items-center justify-between pb-2 border-b border-border/60 print:border-neutral-300">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 print:hidden">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-medium text-foreground print:text-black capitalize">
                {userName}'s Analysis
              </h3>
              <p className="text-xs text-muted-foreground print:text-neutral-500">Your trichology profile generated instantly</p>
            </div>
          </div>
          
          <button
            onClick={() => window.print()}
            className="text-xs font-medium px-3 py-1.5 rounded-full border border-border hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground print:hidden flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V2h12v7"></path><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            Print / Save PDF
          </button>
        </div>

        {/* Profile Pill Badge Matrix */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs print:flex print:gap-4 print:text-left">
          <div className="p-2.5 rounded-xl bg-secondary/50 border border-border flex flex-col items-center gap-1 print:bg-transparent print:border-none print:p-0 print:items-start">
            <Layers className="w-3.5 h-3.5 text-primary print:hidden" />
            <span className="text-muted-foreground font-medium uppercase tracking-tight print:text-neutral-500">Porosity</span>
            <span className="font-semibold capitalize text-foreground print:text-black">{answers.porosity}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-secondary/50 border border-border flex flex-col items-center gap-1 print:bg-transparent print:border-none print:p-0 print:items-start">
            <Activity className="w-3.5 h-3.5 text-primary print:hidden" />
            <span className="text-muted-foreground font-medium uppercase tracking-tight print:text-neutral-500">Matrix</span>
            <span className="font-semibold capitalize text-foreground print:text-black">{answers.texture}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-secondary/50 border border-border flex flex-col items-center gap-1 print:bg-transparent print:border-none print:p-0 print:items-start">
            <Droplets className="w-3.5 h-3.5 text-primary print:hidden" />
            <span className="text-muted-foreground font-medium uppercase tracking-tight print:text-neutral-500">Scalp</span>
            <span className="font-semibold capitalize text-foreground print:text-black">{answers.scalp_hydration?.replace('_', ' ')}</span>
          </div>
        </div>

        {/* Executive Care Roadmap Summary */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground text-xs print:text-neutral-700">Clinical Profile Analysis</h4>
          <p className="text-sm text-muted-foreground leading-relaxed bg-secondary/20 p-4 rounded-xl border border-border/40 print:bg-transparent print:p-0 print:border-none print:text-neutral-800">
            {routine.summary}
          </p>
        </div>

        {/* Targeted Regime Actions List */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground text-xs print:text-neutral-700">Targeted Routine Protocol</h4>
          <ul className="space-y-2">
            {routine.steps.map((step, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-foreground flex gap-2.5 items-start">
                <span className="flex h-5 w-5 rounded-full bg-primary/10 text-primary items-center justify-center font-bold text-xs shrink-0 mt-0.5 print:bg-neutral-200 print:text-black">
                  {idx + 1}
                </span>
                <span className="leading-relaxed text-muted-foreground print:text-neutral-800">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Primary Recommended Formulations */}
        <div className="space-y-2 pt-1">
          <h4 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground text-xs print:text-neutral-700">Recommended Core Ingredients</h4>
          <div className="flex flex-wrap gap-2 print:flex-row">
            {routine.products.map((prod, idx) => (
              <span key={idx} className="text-xs bg-primary/5 text-primary border border-primary/10 px-3 py-1 rounded-full font-medium print:bg-none print:border-neutral-300 print:text-black">
                {prod}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Action Toggles Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border/60 print:hidden">
          <button
            onClick={resetQuiz}
            className="inline-flex items-center gap-1.5 px-4 h-10 rounded-full text-xs font-medium border border-border hover:bg-secondary transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Retake Quiz
          </button>
          <button
            onClick={onClose}
            className="px-6 h-10 rounded-full text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // 3. MAIN EVALUATION STEPS
  return (
    <div className="space-y-6 text-left">
      {/* Header Indicators */}
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Step {currentStep + 1} of {QUIZ_STEPS.length}
          </span>
        </div>
        <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${((currentStep + 1) / QUIZ_STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Error Banner */}
      {submitError && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
          <span className="font-medium">Submission halted:</span> {submitError}
        </div>
      )}

      {/* Main Question Header */}
      <div className="space-y-1">
        <h3 className="font-serif text-xl font-normal text-foreground">{stepData.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{stepData.question}</p>
      </div>

      {/* Options Stack */}
      <div className="space-y-3">
        {stepData.options.map((option) => {
          const isSelected = answers[stepData.id] === option.value;
          return (
            <button
              key={option.value}
              disabled={isSubmitting}
              onClick={() => handleSelectOption(option.value)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3 group relative ${
                isSelected 
                  ? "border-primary bg-primary/[0.02] ring-1 ring-primary" 
                  : "border-border hover:border-muted-foreground/40 hover:bg-secondary/20"
              } disabled:opacity-50`}
            >
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

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border/60">
        <button
          onClick={handleBack}
          disabled={currentStep === 0 || isSubmitting}
          className="inline-flex items-center gap-1.5 px-4 h-10 rounded-full text-xs font-medium border border-border hover:bg-secondary disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={!answers[stepData.id] || isSubmitting}
          className="inline-flex items-center gap-1.5 px-6 h-10 rounded-full text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:pointer-events-none shadow-xs transition-all"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Processing...
            </>
          ) : isLastStep ? (
            "Submit Evaluation"
          ) : (
            "Continue"
          )}
          {!isLastStep && !isSubmitting && <ChevronRight className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}