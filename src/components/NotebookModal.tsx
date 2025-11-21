import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface NotebookModalProps {
  onClose: () => void;
  onSubmit: (correct: boolean) => void;
}

const questions = [
  { question: '5 + 3', answer: 8, operation: 'сложение' },
  { question: '12 - 4', answer: 8, operation: 'вычитание' },
  { question: '6 × 2', answer: 12, operation: 'умножение' },
  { question: '15 ÷ 3', answer: 5, operation: 'деление' },
  { question: '9 + 6', answer: 15, operation: 'сложение' },
  { question: '20 - 7', answer: 13, operation: 'вычитание' },
  { question: '8 × 3', answer: 24, operation: 'умножение' },
  { question: '24 ÷ 4', answer: 6, operation: 'деление' },
  { question: '7 + 8', answer: 15, operation: 'сложение' },
  { question: '18 - 9', answer: 9, operation: 'вычитание' },
  { question: '5 × 5', answer: 25, operation: 'умножение' },
  { question: '36 ÷ 6', answer: 6, operation: 'деление' },
  { question: '11 + 4', answer: 15, operation: 'сложение' },
  { question: '25 - 12', answer: 13, operation: 'вычитание' },
  { question: '9 × 4', answer: 36, operation: 'умножение' },
  { question: '48 ÷ 8', answer: 6, operation: 'деление' },
  { question: '13 + 7', answer: 20, operation: 'сложение' },
  { question: '30 - 15', answer: 15, operation: 'вычитание' },
  { question: '7 × 6', answer: 42, operation: 'умножение' },
  { question: '56 ÷ 7', answer: 8, operation: 'деление' },
];

const NotebookModal = ({ onClose, onSubmit }: NotebookModalProps) => {
  const [currentQuestions, setCurrentQuestions] = useState<typeof questions>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 3);
    setCurrentQuestions(shuffled);
  }, []);

  const handleSubmit = () => {
    const userAnswer = parseInt(answer);
    const correct = userAnswer === currentQuestions[currentIndex].answer;

    if (correct) {
      if (currentIndex < currentQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setAnswer('');
        setAttempts(0);
      } else {
        onSubmit(true);
      }
    } else {
      setAttempts(attempts + 1);
      if (attempts >= 2) {
        onSubmit(false);
      } else {
        alert('Неправильно! Попробуй ещё раз');
        setAnswer('');
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (currentQuestions.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <Card className="max-w-2xl w-full p-8 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Icon name="BookOpen" size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Блокнот с заданиями</h2>
              <p className="text-sm text-gray-600">Вопрос {currentIndex + 1} из {currentQuestions.length}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose} size="icon">
            <Icon name="X" size={24} />
          </Button>
        </div>

        <div className="bg-white rounded-xl p-6 mb-6 shadow-lg border-4 border-blue-300">
          <div className="mb-4">
            <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
              {currentQuestions[currentIndex].operation}
            </span>
          </div>
          <div className="text-5xl font-bold text-center mb-8 text-gray-800 font-mono">
            {currentQuestions[currentIndex].question} = ?
          </div>

          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Введи ответ:
            </label>
            <Input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Твой ответ..."
              className="text-3xl text-center h-16 font-bold"
              autoFocus
            />
          </div>

          {attempts > 0 && (
            <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg flex items-center gap-2 text-red-700">
              <Icon name="AlertCircle" size={20} />
              <span>Попыток осталось: {3 - attempts}</span>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <Button
            size="lg"
            className="flex-1 h-14 text-lg"
            onClick={handleSubmit}
            disabled={!answer}
          >
            <Icon name="Check" size={24} />
            <span className="ml-2">Ответить</span>
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={onClose}
            className="h-14"
          >
            <Icon name="X" size={24} />
            <span className="ml-2">Закрыть</span>
          </Button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p className="flex items-center justify-center gap-2">
            <Icon name="Info" size={16} />
            Нажми Enter для отправки ответа
          </p>
        </div>
      </Card>
    </div>
  );
};

export default NotebookModal;
