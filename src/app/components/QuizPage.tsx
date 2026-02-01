import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Brain, Clock, CheckCircle, XCircle, Trophy, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Progress } from '@/app/components/ui/progress';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  category?: string;
  questions: Question[];
  timeLimit: number;
  difficulty?: string;
  points: number;
}

interface QuizResult {
  quizId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number;
  completedAt: any;
}

export function QuizPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Load quiz data
  useEffect(() => {
    const loadQuiz = async () => {
      if (!quizId) return;
      
      try {
        const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
        if (quizDoc.exists()) {
          const quizData = { id: quizDoc.id, ...quizDoc.data() } as Quiz;
          setQuiz(quizData);
          setTimeRemaining(quizData.timeLimit * 60); // Convert minutes to seconds
        } else {
          toast.error('Quiz not found');
          navigate('/quizzes');
        }
      } catch (error) {
        console.error('Error loading quiz:', error);
        toast.error('Failed to load quiz');
        navigate('/quizzes');
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [quizId, navigate]);

  // Timer countdown
  useEffect(() => {
    if (!quizStarted || quizCompleted || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, quizCompleted, timeRemaining]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answerIndex,
    });
  };

  const handleNextQuestion = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!quiz || !currentUser) return;

    setQuizCompleted(true);
    
    // Calculate score
    let correctCount = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / quiz.questions.length) * 100);
    const timeTaken = quiz.timeLimit * 60 - timeRemaining;
    
    setScore(finalScore);

    // Save result to Firebase
    try {
      const result: QuizResult = {
        quizId: quiz.id,
        userId: currentUser.uid,
        score: finalScore,
        totalQuestions: quiz.questions.length,
        correctAnswers: correctCount,
        timeTaken: timeTaken,
        completedAt: serverTimestamp(),
      };

      await setDoc(
        doc(db, 'quizResults', `${currentUser.uid}_${quiz.id}_${Date.now()}`),
        result
      );

      // Update user progress
      const progressRef = doc(db, 'userProgress', currentUser.uid);
      const progressDoc = await getDoc(progressRef);
      
      if (progressDoc.exists()) {
        const currentProgress = progressDoc.data();
        await setDoc(progressRef, {
          ...currentProgress,
          completedQuizzes: (currentProgress.completedQuizzes || 0) + 1,
          totalPoints: (currentProgress.totalPoints || 0) + (finalScore >= 70 ? quiz.points : 0),
        }, { merge: true });
      } else {
        await setDoc(progressRef, {
          userId: currentUser.uid,
          completedQuizzes: 1,
          assignmentsSubmitted: 0,
          totalPoints: finalScore >= 70 ? quiz.points : 0,
          coursesCompleted: 0,
        });
      }

      toast.success('Quiz submitted successfully!');
      setShowResults(true);
    } catch (error) {
      console.error('Error saving quiz result:', error);
      toast.error('Failed to save quiz result');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Quiz not found</p>
          <Button onClick={() => navigate('/quizzes')}>Back to Quizzes</Button>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-100 p-3 rounded-xl">
                  <Brain className="w-8 h-8 text-indigo-600" />
                </div>
                <div>
                  <CardTitle className="text-3xl">{quiz.title}</CardTitle>
                  <CardDescription className="text-lg mt-2">{quiz.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Total Questions</span>
                  <span className="font-bold text-lg">{quiz.questions.length}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Time Limit
                  </span>
                  <span className="font-bold text-lg">{quiz.timeLimit} minutes</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Points
                  </span>
                  <span className="font-bold text-lg text-indigo-600">{quiz.points}</span>
                </div>
                {quiz.difficulty && (
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Difficulty</span>
                    <span className="font-bold text-lg">{quiz.difficulty}</span>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <Button
                  onClick={handleStartQuiz}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 text-lg"
                >
                  Start Quiz
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/quizzes')}
                  className="w-full"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Quizzes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showResults) {
    const correctAnswers = quiz.questions.filter(
      (q, index) => selectedAnswers[index] === q.correctAnswer
    ).length;
    const earnedPoints = score >= 70 ? quiz.points : 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-4">Quiz Results</CardTitle>
              <CardDescription className="text-center text-lg">{quiz.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
                  <span className="text-4xl font-bold text-white">{score}%</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {score >= 70 ? 'Congratulations! 🎉' : 'Keep Practicing! 💪'}
                </h3>
                <p className="text-gray-600">
                  You answered {correctAnswers} out of {quiz.questions.length} questions correctly
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{correctAnswers}</div>
                  <div className="text-sm text-gray-600">Correct Answers</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{earnedPoints}</div>
                  <div className="text-sm text-gray-600">Points Earned</div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-lg">Review Answers:</h4>
                {quiz.questions.map((question, index) => {
                  const userAnswer = selectedAnswers[index];
                  const isCorrect = userAnswer === question.correctAnswer;
                  
                  return (
                    <div
                      key={question.id}
                      className={`p-4 rounded-lg border-2 ${
                        isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-2">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-semibold mb-2">{question.question}</p>
                          <div className="space-y-1">
                            <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                              Your answer: {question.options[userAnswer]}
                            </p>
                            {!isCorrect && (
                              <p className="text-sm text-green-700">
                                Correct answer: {question.options[question.correctAnswer]}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => navigate('/quizzes')}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                >
                  Back to Quizzes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  className="w-full"
                >
                  Go to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-800">{quiz.title}</h1>
              <p className="text-sm text-gray-600">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-lg">
                <Clock className="w-5 h-5 text-red-600" />
                <span className="font-bold text-red-600">{formatTime(timeRemaining)}</span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl mb-4">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswers[currentQuestionIndex] === index
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswers[currentQuestionIndex] === index
                          ? 'border-indigo-500 bg-indigo-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedAnswers[currentQuestionIndex] === index && (
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              <div className="text-sm text-gray-600">
                {Object.keys(selectedAnswers).length} of {quiz.questions.length} answered
              </div>
              {currentQuestionIndex === quiz.questions.length - 1 ? (
                <Button
                  onClick={handleSubmitQuiz}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                >
                  Submit Quiz
                </Button>
              ) : (
                <Button
                  onClick={handleNextQuestion}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                >
                  Next
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

