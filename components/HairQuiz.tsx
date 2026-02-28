'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2 } from 'lucide-react';
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
  const [quizData, setQuizData] = useState<QuizState>({
    fullName: '',
    phoneNumber: '',
    hairType: '',
    porosity: '',
    scalpIssue: ''
  });

  const hairTypes = ['4C', '4B', '4A', '3C', '3B', '3A', '2C', '2B', '2A', '1C', '1B', '1A'];
  const porosityOptions = ['High', 'Medium', 'Low'];
  const scalpIssues = ['Dryness', 'Oiliness', 'Flaking', 'Sensitivity', 'Buildup', 'None'];

  const handleInputChange = (field: keyof QuizState, value: string) => {
    setQuizData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await saveQuizResults(quizData);
      setSuccess(true);
      
      // Redirect to WhatsApp after 2 seconds
      setTimeout(() => {
        const message = `Hello! I just completed the Beleza Natural Hair Diagnostic Quiz. Here are my results: Hair Type: ${quizData.hairType}, Porosity: ${quizData.porosity}, Scalp Issue: ${quizData.scalpIssue}`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/2348012345678?text=${encodedMessage}`, '_blank');
      }, 2000);
    } catch (error) {
      console.error('Error saving quiz results:', error);
      alert('Error saving results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={animationVariants}
      className="w-full max-w-2xl mx-auto p-6 bg-secondary border border-primary/10 rounded-2xl glassmorphism"
    >
      {success ? (
        <div className="text-center space-y-4">
          <CheckCircle2 className="w-16 h-16 text-primary mx-auto animate-bounce" />
          <h2 className="text-2xl font-serif font-semibold text-foreground">Results Saved!</h2>
          <p className="text-foreground/70">Redirecting to WhatsApp to connect with our specialists...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Step 1: Full Name */}
          {step === 0 && (
            <motion.div initial="hidden" animate="visible" variants={animationVariants} className="space-y-4">
              <div>
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">Your Hair Profile</h2>
                <p className="text-foreground/70">Let's get to know your hair better</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={quizData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-primary/20 rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </motion.div>
          )}

          {/* Step 2: Phone Number */}
          {step === 1 && (
            <motion.div initial="hidden" animate="visible" variants={animationVariants} className="space-y-4">
              <div>
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">Contact Information</h2>
                <p className="text-foreground/70">We'll use this to follow up with your results</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+234 xxx xxx xxxx"
                  value={quizData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-primary/20 rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </motion.div>
          )}

          {/* Step 3: Hair Type */}
          {step === 2 && (
            <motion.div initial="hidden" animate="visible" variants={animationVariants} className="space-y-4">
              <div>
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">Hair Type</h2>
                <p className="text-foreground/70">Select your hair type (Andre's Classification)</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {hairTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => handleInputChange('hairType', type)}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                      quizData.hairType === type
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background border border-primary/20 text-foreground hover:border-primary/40'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Porosity */}
          {step === 3 && (
            <motion.div initial="hidden" animate="visible" variants={animationVariants} className="space-y-4">
              <div>
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">Hair Porosity</h2>
                <p className="text-foreground/70">How easily does your hair absorb moisture?</p>
              </div>
              <div className="space-y-2">
                {porosityOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => handleInputChange('porosity', option)}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all text-left ${
                      quizData.porosity === option
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background border border-primary/20 text-foreground hover:border-primary/40'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 5: Scalp Issue */}
          {step === 4 && (
            <motion.div initial="hidden" animate="visible" variants={animationVariants} className="space-y-4">
              <div>
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">Scalp Concerns</h2>
                <p className="text-foreground/70">What's your main scalp concern?</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {scalpIssues.map(issue => (
                  <button
                    key={issue}
                    onClick={() => handleInputChange('scalpIssue', issue)}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                      quizData.scalpIssue === issue
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background border border-primary/20 text-foreground hover:border-primary/40'
                    }`}
                  >
                    {issue}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 6: Review & Submit */}
          {step === 5 && (
            <motion.div initial="hidden" animate="visible" variants={animationVariants} className="space-y-4">
              <div>
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">Review Your Results</h2>
                <p className="text-foreground/70">Confirm your information before submitting</p>
              </div>
              <div className="space-y-3 bg-background rounded-lg p-4 border border-primary/10">
                <div>
                  <p className="text-sm text-foreground/60">Full Name</p>
                  <p className="font-semibold text-foreground">{quizData.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Phone Number</p>
                  <p className="font-semibold text-foreground">{quizData.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Hair Type</p>
                  <p className="font-semibold text-foreground">{quizData.hairType}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Porosity</p>
                  <p className="font-semibold text-foreground">{quizData.porosity}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Scalp Issue</p>
                  <p className="font-semibold text-foreground">{quizData.scalpIssue}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 pt-6">
            {step > 0 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="flex-1 border-primary/20 text-primary hover:bg-primary/10"
              >
                Back
              </Button>
            )}
            {step < 5 ? (
              <Button
                onClick={handleNext}
                disabled={!Object.values(quizData)[step]}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground transition-transform hover:scale-105"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loading || !quizData.fullName || !quizData.phoneNumber || !quizData.hairType || !quizData.porosity || !quizData.scalpIssue}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground transition-transform hover:scale-105"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Submit & Get Recommendations'
                )}
              </Button>
            )}
          </div>

          {/* Progress Indicator */}
          <div className="flex gap-1 mt-6">
            {[0, 1, 2, 3, 4, 5].map(i => (
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
