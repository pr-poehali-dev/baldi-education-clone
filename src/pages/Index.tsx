import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type Screen = 'menu' | 'game' | 'settings' | 'achievements' | 'tutorial';

interface GameSettings {
  soundVolume: number;
  musicVolume: number;
  sensitivity: number;
  graphicsQuality: 'low' | 'medium' | 'high';
  mobileControls: boolean;
  touchMode: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

interface Question {
  question: string;
  answer: number;
  options: number[];
}

const Index = () => {
  const [screen, setScreen] = useState<Screen>('menu');
  const [settings, setSettings] = useState<GameSettings>({
    soundVolume: 70,
    musicVolume: 50,
    sensitivity: 50,
    graphicsQuality: 'medium',
    mobileControls: true,
    touchMode: false,
  });

  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const achievements: Achievement[] = [
    { id: '1', title: 'Первые шаги', description: 'Завершите первый уровень', unlocked: true, icon: 'Award' },
    { id: '2', title: 'Математик', description: 'Решите 10 задач подряд', unlocked: true, icon: 'Brain' },
    { id: '3', title: 'Быстрый ум', description: 'Решите задачу за 5 секунд', unlocked: false, icon: 'Zap' },
    { id: '4', title: 'Мастер', description: 'Достигните уровня 10', unlocked: false, icon: 'Trophy' },
    { id: '5', title: 'Безошибочный', description: 'Пройдите уровень без ошибок', unlocked: false, icon: 'Star' },
    { id: '6', title: 'Настойчивый', description: 'Играйте 7 дней подряд', unlocked: false, icon: 'Flame' },
  ];

  const questions: Question[] = [
    { question: '5 + 3 = ?', answer: 8, options: [7, 8, 9, 10] },
    { question: '12 - 4 = ?', answer: 8, options: [6, 7, 8, 9] },
    { question: '6 × 2 = ?', answer: 12, options: [10, 11, 12, 13] },
    { question: '15 ÷ 3 = ?', answer: 5, options: [4, 5, 6, 7] },
    { question: '9 + 6 = ?', answer: 15, options: [14, 15, 16, 17] },
  ];

  const handleAnswer = (selectedAnswer: number) => {
    const correct = questions[currentQuestion].answer === selectedAnswer;
    
    if (correct) {
      setScore(score + 10);
      toast.success('Правильно! +10 очков');
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setCurrentLevel(currentLevel + 1);
        setCurrentQuestion(0);
        toast.success(`Уровень ${currentLevel} пройден!`);
      }
    } else {
      setLives(lives - 1);
      toast.error('Неправильно! Попробуй снова');
      
      if (lives <= 1) {
        toast.error('Игра окончена!');
        setScreen('menu');
        setLives(3);
        setScore(0);
        setCurrentLevel(1);
        setCurrentQuestion(0);
      }
    }
  };

  const MenuScreen = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-primary/20 via-background to-accent/20">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Учим вместе! 📚
        </h1>
        <p className="text-xl text-muted-foreground">Образовательная игра для всех возрастов</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
        <Card 
          className="p-8 hover:scale-105 transition-all duration-300 cursor-pointer bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0 shadow-xl"
          onClick={() => setScreen('game')}
        >
          <div className="flex flex-col items-center gap-4">
            <Icon name="Play" size={48} />
            <h2 className="text-2xl font-bold">Начать игру</h2>
            <p className="text-center opacity-90">Решай задачи и побеждай!</p>
          </div>
        </Card>

        <Card 
          className="p-8 hover:scale-105 transition-all duration-300 cursor-pointer bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground border-0 shadow-xl"
          onClick={() => setScreen('tutorial')}
        >
          <div className="flex flex-col items-center gap-4">
            <Icon name="BookOpen" size={48} />
            <h2 className="text-2xl font-bold">Обучение</h2>
            <p className="text-center opacity-90">Узнай правила игры</p>
          </div>
        </Card>

        <Card 
          className="p-8 hover:scale-105 transition-all duration-300 cursor-pointer bg-gradient-to-br from-accent to-accent/80 text-accent-foreground border-0 shadow-xl"
          onClick={() => setScreen('achievements')}
        >
          <div className="flex flex-col items-center gap-4">
            <Icon name="Trophy" size={48} />
            <h2 className="text-2xl font-bold">Достижения</h2>
            <p className="text-center opacity-90">Твой прогресс</p>
          </div>
        </Card>

        <Card 
          className="p-8 hover:scale-105 transition-all duration-300 cursor-pointer bg-gradient-to-br from-muted to-muted/80 text-foreground border-0 shadow-xl"
          onClick={() => setScreen('settings')}
        >
          <div className="flex flex-col items-center gap-4">
            <Icon name="Settings" size={48} />
            <h2 className="text-2xl font-bold">Настройки</h2>
            <p className="text-center opacity-90">Управление и звук</p>
          </div>
        </Card>
      </div>

      <div className="mt-12 flex items-center gap-4 text-muted-foreground">
        <Icon name="Users" size={20} />
        <span>Игроков онлайн: 1,234</span>
      </div>
    </div>
  );

  const GameScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={() => setScreen('menu')}>
            <Icon name="ArrowLeft" size={20} />
            <span className="ml-2">Меню</span>
          </Button>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Icon name="Target" size={24} className="text-primary" />
              <span className="text-xl font-bold">Уровень {currentLevel}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Icon name="Star" size={24} className="text-secondary" />
              <span className="text-xl font-bold">{score}</span>
            </div>
            
            <div className="flex items-center gap-1">
              {[...Array(3)].map((_, i) => (
                <Icon 
                  key={i} 
                  name="Heart" 
                  size={24} 
                  className={i < lives ? 'text-red-500 fill-red-500' : 'text-gray-300'}
                />
              ))}
            </div>
          </div>
        </div>

        <Card className="p-8 md:p-12 bg-white shadow-2xl animate-scale-in">
          <div className="text-center mb-8">
            <Badge className="mb-4 text-lg px-4 py-2">Вопрос {currentQuestion + 1} из {questions.length}</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{questions[currentQuestion].question}</h2>
            <Progress value={(currentQuestion / questions.length) * 100} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {questions[currentQuestion].options.map((option) => (
              <Button
                key={option}
                size="lg"
                className="h-20 text-2xl font-bold hover:scale-105 transition-transform"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </Card>

        <div className="mt-8 text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <Icon name="Lightbulb" size={20} />
            Подсказка: Внимательно читай вопрос перед ответом!
          </p>
        </div>
      </div>
    </div>
  );

  const SettingsScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="outline" onClick={() => setScreen('menu')}>
            <Icon name="ArrowLeft" size={20} />
            <span className="ml-2">Назад</span>
          </Button>
          <h1 className="text-4xl font-bold ml-auto">Настройки</h1>
        </div>

        <Tabs defaultValue="audio" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="audio">Звук</TabsTrigger>
            <TabsTrigger value="graphics">Графика</TabsTrigger>
            <TabsTrigger value="controls">Управление</TabsTrigger>
            <TabsTrigger value="mobile">Мобильные</TabsTrigger>
          </TabsList>

          <TabsContent value="audio">
            <Card className="p-6">
              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-lg font-medium flex items-center gap-2">
                      <Icon name="Volume2" size={20} />
                      Громкость звуков
                    </label>
                    <span className="text-muted-foreground">{settings.soundVolume}%</span>
                  </div>
                  <Slider
                    value={[settings.soundVolume]}
                    onValueChange={(v) => setSettings({ ...settings, soundVolume: v[0] })}
                    max={100}
                    step={1}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-lg font-medium flex items-center gap-2">
                      <Icon name="Music" size={20} />
                      Громкость музыки
                    </label>
                    <span className="text-muted-foreground">{settings.musicVolume}%</span>
                  </div>
                  <Slider
                    value={[settings.musicVolume]}
                    onValueChange={(v) => setSettings({ ...settings, musicVolume: v[0] })}
                    max={100}
                    step={1}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="graphics">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="text-lg font-medium mb-4 block">Качество графики</label>
                  <div className="grid grid-cols-3 gap-4">
                    {(['low', 'medium', 'high'] as const).map((quality) => (
                      <Button
                        key={quality}
                        variant={settings.graphicsQuality === quality ? 'default' : 'outline'}
                        onClick={() => setSettings({ ...settings, graphicsQuality: quality })}
                        className="capitalize"
                      >
                        {quality === 'low' ? 'Низкое' : quality === 'medium' ? 'Среднее' : 'Высокое'}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 text-muted-foreground text-sm">
                  <p className="flex items-start gap-2">
                    <Icon name="Info" size={16} className="mt-1" />
                    <span>Более высокое качество графики может влиять на производительность на слабых устройствах</span>
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="controls">
            <Card className="p-6">
              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-lg font-medium flex items-center gap-2">
                      <Icon name="Crosshair" size={20} />
                      Чувствительность
                    </label>
                    <span className="text-muted-foreground">{settings.sensitivity}%</span>
                  </div>
                  <Slider
                    value={[settings.sensitivity]}
                    onValueChange={(v) => setSettings({ ...settings, sensitivity: v[0] })}
                    max={100}
                    step={1}
                  />
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Icon name="Keyboard" size={20} />
                    Управление клавиатурой
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">W A S D</Badge>
                      <span>Движение</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Пробел</Badge>
                      <span>Прыжок</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">E</Badge>
                      <span>Действие</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">ESC</Badge>
                      <span>Меню</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="mobile">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-lg font-medium flex items-center gap-2">
                      <Icon name="Smartphone" size={20} />
                      Мобильное управление
                    </label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Включить экранные кнопки на мобильных устройствах
                    </p>
                  </div>
                  <Switch
                    checked={settings.mobileControls}
                    onCheckedChange={(v) => setSettings({ ...settings, mobileControls: v })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-lg font-medium flex items-center gap-2">
                      <Icon name="Hand" size={20} />
                      Сенсорный режим
                    </label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Оптимизировать интерфейс для сенсорных экранов
                    </p>
                  </div>
                  <Switch
                    checked={settings.touchMode}
                    onCheckedChange={(v) => setSettings({ ...settings, touchMode: v })}
                  />
                </div>

                <div className="bg-primary/10 p-4 rounded-lg mt-4">
                  <p className="text-sm flex items-start gap-2">
                    <Icon name="Lightbulb" size={16} className="mt-1 text-primary" />
                    <span>Рекомендуем включить оба режима для лучшего опыта на смартфонах и планшетах</span>
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );

  const AchievementsScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 via-background to-primary/10 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="outline" onClick={() => setScreen('menu')}>
            <Icon name="ArrowLeft" size={20} />
            <span className="ml-2">Назад</span>
          </Button>
          <h1 className="text-4xl font-bold ml-auto">Достижения</h1>
        </div>

        <div className="grid gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-r from-primary to-secondary text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Текущий уровень</p>
                <h2 className="text-4xl font-bold">{currentLevel}</h2>
              </div>
              <div>
                <p className="text-sm opacity-90 mb-1">Всего очков</p>
                <h2 className="text-4xl font-bold">{score}</h2>
              </div>
              <div>
                <p className="text-sm opacity-90 mb-1">Открыто</p>
                <h2 className="text-4xl font-bold">
                  {achievements.filter(a => a.unlocked).length}/{achievements.length}
                </h2>
              </div>
            </div>
            <Progress value={(achievements.filter(a => a.unlocked).length / achievements.length) * 100} className="mt-4 h-2 bg-white/20" />
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <Card
              key={achievement.id}
              className={`p-6 transition-all duration-300 ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-primary/20 to-accent/20 border-primary/50'
                  : 'opacity-50 grayscale'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full ${achievement.unlocked ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <Icon name={achievement.icon as any} size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{achievement.title}</h3>
                  <p className="text-muted-foreground text-sm">{achievement.description}</p>
                  {achievement.unlocked && (
                    <Badge className="mt-3">
                      <Icon name="Check" size={14} className="mr-1" />
                      Открыто
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const TutorialScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-background to-accent/10 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="outline" onClick={() => setScreen('menu')}>
            <Icon name="ArrowLeft" size={20} />
            <span className="ml-2">Назад</span>
          </Button>
          <h1 className="text-4xl font-bold ml-auto">Обучение</h1>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <div className="flex items-start gap-4">
              <Icon name="BookOpen" size={32} />
              <div>
                <h2 className="text-2xl font-bold mb-2">Как играть?</h2>
                <p className="opacity-90">
                  Решай математические задачи, чтобы продвигаться по уровням. Каждый правильный ответ приносит очки!
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="Target" size={24} className="text-primary" />
              Правила игры
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Badge>1</Badge>
                <span>Отвечай на вопросы, выбирая правильный вариант из четырёх</span>
              </li>
              <li className="flex items-start gap-3">
                <Badge>2</Badge>
                <span>За каждый правильный ответ ты получаешь 10 очков</span>
              </li>
              <li className="flex items-start gap-3">
                <Badge>3</Badge>
                <span>У тебя есть 3 жизни. Неправильный ответ отнимает одну жизнь</span>
              </li>
              <li className="flex items-start gap-3">
                <Badge>4</Badge>
                <span>Пройди все вопросы уровня, чтобы перейти на следующий</span>
              </li>
              <li className="flex items-start gap-3">
                <Badge>5</Badge>
                <span>Открывай достижения за особые успехи!</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="Zap" size={24} className="text-secondary" />
              Советы
            </h3>
            <div className="space-y-3 text-muted-foreground">
              <p className="flex items-start gap-2">
                <Icon name="CheckCircle" size={20} className="mt-0.5 text-primary" />
                <span>Внимательно читай вопрос перед тем, как выбрать ответ</span>
              </p>
              <p className="flex items-start gap-2">
                <Icon name="CheckCircle" size={20} className="mt-0.5 text-primary" />
                <span>Не торопись! Лучше подумать немного дольше, чем потерять жизнь</span>
              </p>
              <p className="flex items-start gap-2">
                <Icon name="CheckCircle" size={20} className="mt-0.5 text-primary" />
                <span>Регулярная практика поможет тебе решать задачи быстрее</span>
              </p>
            </div>
          </Card>

          <Button 
            size="lg" 
            className="w-full"
            onClick={() => setScreen('game')}
          >
            <Icon name="Play" size={20} />
            <span className="ml-2">Начать играть!</span>
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {screen === 'menu' && <MenuScreen />}
      {screen === 'game' && <GameScreen />}
      {screen === 'settings' && <SettingsScreen />}
      {screen === 'achievements' && <AchievementsScreen />}
      {screen === 'tutorial' && <TutorialScreen />}
    </>
  );
};

export default Index;
