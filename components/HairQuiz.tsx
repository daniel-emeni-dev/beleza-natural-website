'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { saveQuizResults } from '@/lib/quizActions';

interface QuizState {
  fullName: string;
  phoneNumber: string;
  hairType: string;
  porosity: string;
  scalpIssue: string;
}

const animationVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export function HairQuiz() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [quizData, setQuizData] = useState<QuizState>(({
    fullName: '', 
    phoneNumber: '',
    hairType: '',
    porosity: '',
    scalpIssue: ''
  }));

  const hairTypes = ['4C', '4B', '4A', '3C', '3B', '3A', '2C', '2B', '2A', '1C', '1B', '1A'];
  const porosityOptions = ['High', 'Medium', 'Low'];
  const scalpIssues = ['Dryness', 'Oiliness', 'Flaking', 'Sensitivity', 'Healthy'];

  const handleNext = () => {
    setServerError(null); // Clear errors when moving forward
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setServerError(null);
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setServerError(null);

    try {
      // Cast the string options exactly into the literal types expected by Zod
      const payload = {
        fullName: quizData.fullName.trim(),
        phoneNumber: quizData.phoneNumber.trim(),
        hairType: quizData.hairType as any,
        porosity: quizData.porosity as any,
        scalpIssue: quizData.scalpIssue.trim(),
      };

      const result = await saveQuizResults(payload);

      if (result.success) {
        setSuccess(true);
      } else {
        // Capture specific backend Zod or Database messages directly
        setServerError(result.error || 'An error occurred while saving your data.');
      }
    } catch (err) {
      console.error('[Frontend Exception] Submission failure:', err);
      setServerError('A network connectivity or server fault occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={animationVariants}
      className="w-full bg-card p-6 sm:p-8 rounded-2xl shadow-xl border border-primary/10 relative"
    >
      {success ? (
        <div className="text-center py-8 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-2">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-serif font-semibold text-foreground">Analysis Complete</h3>
          <p className="text-foreground/70 max-w-md mx-auto font-light">
            Your clinical profile and scalp assessment have been logged. A trichology expert will review your metrics shortly.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Section Header */}
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-serif font-semibold text-foreground">
              {step === 0 && 'Welcome to Beleza Analysis'}
              {step === 1 && 'What is your Name?'}
              {step === 2 && 'What is your Phone Number?'}
              {step === 3 && 'Identify your Hair Type'}
              {step === 4 && 'Determine your Hair Porosity'}
              {step === 5 && 'Primary Scalp Concern'}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-light">
              {step <= 2 ? 'Personal Demographics' : 'Clinical Variables'}
            </p>
          </div>

          {/* Server Error Alert Display */}
          {serverError && (
            <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm p-4 rounded-xl animate-fade-in">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Submission halted:</span> {serverError}
              </div>
            </div>
          )}

          {/* Form Step Inputs */}
          <div className="min-h-[100px] flex items-center">
            {step === 0 && (
              <p className="text-foreground/80 font-light leading-relaxed">
                This diagnostic matches your unique hair characteristics against targeted treatments. Please provide authentic inputs for an accurate configuration.
              </p>
            )}

            {step === 1 && (
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={quizData.fullName}
                  onChange={(e) => setQuizData({ ...quizData, fullName: e.target.value })}
                  className="w-full bg-background border border-primary/20 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            )}

            {step === 2 && (
              <div className="w-full">
                <input
                  type="tel"
                  placeholder="e.g. +234 801 234 5678"
                  value={quizData.phoneNumber}
                  onChange={(e) => setQuizData({ ...quizData, phoneNumber: e.target.value })}
                  className="w-full bg-background border border-primary/20 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            )}

            {step === 3 && (
              <div className="grid grid-cols-3 gap-2 w-full">
                {hairTypes.map((type) => (
                  <Button
                    key={type}
                    variant={quizData.hairType === type ? 'default' : 'outline'}
                    onClick={() => setQuizData({ ...quizData, hairType: type })}
                    className="rounded-xl py-4"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col gap-2 w-full">
                {porosityOptions.map((opt) => (
                  <Button
                    key={opt}
                    variant={quizData.porosity === opt ? 'default' : 'outline'}
                    onClick={() => setQuizData({ ...quizData, porosity: opt })}
                    className="rounded-xl py-6 text-left justify-start px-6"
                  >
                    {opt} Porosity
                  </Button>
                ))}
              </div>
            )}

            {step === 5 && (
              <div className="flex flex-col gap-2 w-full">
                {scalpIssues.map((issue) => (
                  <Button
                    key={issue}
                    variant={quizData.scalpIssue === issue ? 'default' : 'outline'}
                    onClick={() => setQuizData({ ...quizData, scalpIssue: issue })}
                    className="rounded-xl py-6 text-left justify-start px-6"
                  >
                    {issue}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Footer Action Controller Navigation */}
          <div className="flex gap-4 pt-4 border-t border-primary/10">
            {step > 0 && (
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={loading}
                className="flex-1 rounded-xl transition-all border-primary/20 text-foreground hover:bg-primary/5"
              >
                Back
              </Button>
            )}
            {step < 5 ? (
              <Button
                onClick={handleNext}
                disabled={step === 1 ? !quizData.fullName : step === 2 ? !quizData.phoneNumber : step === 3 ? !quizData.hairType : step === 4 ? !quizData.porosity : false}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground transition-transform hover:scale-105 rounded-xl"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loading || !quizData.fullName || !quizData.phoneNumber || !quizData.hairType || !quizData.porosity || !quizData.scalpIssue}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground transition-transform hover:scale-105 rounded-xl"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving System Data...
                  </>
                ) : (
                  'Submit Evaluation'
                )}
              </Button>
            )}
          </div>

          {/* Stepper Progress Bars */}
          <div className="flex gap-1 mt-6">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i <= step ? 'bg-primary' : 'bg-primary/20'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}