import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { MATH_POOL, MathQuestion } from './mathPool';
import { 
  Swords, 
  Heart, 
  Zap, 
  Award, 
  Activity, 
  AlertCircle, 
  Camera, 
  CheckCircle2, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  BookOpen, 
  Flame, 
  HelpCircle, 
  ArrowRight, 
  CornerDownRight,
  Shield,
  Info,
  Trophy,
  Cpu,
  RefreshCw,
  Download,
  AlertTriangle,
  MoveUp,
  MoveRight
} from 'lucide-react';

// SOUND SYSTEM using Web Audio API for immersive active chiptune sound design
class SoundSystem {
  ctx: AudioContext | null = null;
  volume: number = 0.15;
  soundOn: boolean = true;

  init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.warn("Audio Context not supported");
    }
  }

  playTone(freq: number, type: OscillatorType, duration: number, slideTo?: number) {
    if (!this.soundOn) return;
    this.init();
    if (!this.ctx) return;

    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      if (slideTo) {
        osc.frequency.exponentialRampToValueAtTime(slideTo, this.ctx.currentTime + duration);
      }

      gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Ignored
    }
  }

  playHover() {
    this.playTone(600, 'triangle', 0.04);
  }

  playClick() {
    this.playTone(440, 'triangle', 0.08);
  }

  playCast() {
    this.playTone(180, 'sine', 0.8, 550);
  }

  playCorrect() {
    this.playTone(523.25, 'sine', 0.08);
    setTimeout(() => this.playTone(659.25, 'sine', 0.08), 60);
    setTimeout(() => this.playTone(783.99, 'sine', 0.08), 120);
    setTimeout(() => this.playTone(1046.50, 'sine', 0.2), 180);
  }

  playWrong() {
    this.playTone(200, 'sawtooth', 0.12);
    setTimeout(() => this.playTone(150, 'sawtooth', 0.25), 100);
  }

  playHit() {
    this.playTone(100, 'sawtooth', 0.15, 30);
  }

  playLevelUp() {
    this.playTone(261.63, 'sine', 0.1);
    setTimeout(() => this.playTone(392.00, 'sine', 0.1), 80);
    setTimeout(() => this.playTone(523.25, 'sine', 0.1), 160);
    setTimeout(() => this.playTone(659.25, 'sine', 0.1), 240);
    setTimeout(() => this.playTone(1046.50, 'sine', 0.3), 320);
  }

  playDefeat() {
    this.playTone(140, 'sawtooth', 0.3, 30);
    setTimeout(() => this.playTone(70, 'sawtooth', 0.45, 15), 120);
  }
}

const audio = new SoundSystem();

// Pose specifications updated for 4 poses matching signals 0, 1, 2, 3
interface PoseSpec {
  id: string;
  signal: number;
  name: string;
  skillName: string;
  element: string;
  color: string;
  glowColor: string;
  desc: string;
  kcalPerSec: number;
}

const POSES: Record<string, PoseSpec> = {
  SQUAT: {
    id: 'SQUAT',
    signal: 0,
    name: '스쿼트',
    skillName: '가이아의 타격',
    element: '대지 (Earth)',
    color: 'from-amber-600 to-emerald-700',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    desc: '무릎을 굽혀 깊게 자세를 낮추세요. (대지의 기운 마력장 수축)',
    kcalPerSec: 0.15
  },
  LUNGE: {
    id: 'LUNGE',
    signal: 1,
    name: '런지',
    skillName: '질풍참',
    element: '바람 (Wind)',
    color: 'from-cyan-500 to-sky-600',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    desc: '한쪽 다리를 뻗어 상체를 내미세요. (바람의 잔상 돌격 연타)',
    kcalPerSec: 0.12
  },
  BEND_FORWARD: {
    id: 'BEND_FORWARD',
    signal: 2,
    name: '윗몸 앞으로 굽히기',
    skillName: '에테르 기가실드',
    element: '장벽 (Shield)',
    color: 'from-purple-600 to-pink-700',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    desc: '허리를 천천히 숙여 양손을 아래로 두세요. (유연성의 기운)',
    kcalPerSec: 0.08
  },
  RAISE_ARMS: {
    id: 'RAISE_ARMS',
    signal: 3,
    name: '양손 번쩍 만세',
    skillName: '천상의 아스트랄 광선',
    element: '신성 (Divine)',
    color: 'from-yellow-400 to-orange-500',
    glowColor: 'rgba(234, 179, 8, 0.4)',
    desc: '양손을 어깨 위로 활짝 높게 올리세요. (우주의 기운 대방출)',
    kcalPerSec: 0.18
  }
};

const SIGNAL_TO_POSE_KEY: Record<number, string> = {
  0: 'SQUAT',
  1: 'LUNGE',
  2: 'BEND_FORWARD',
  3: 'RAISE_ARMS'
};

// MathQuestion interface and MATH_POOL database are now loaded modularly from './mathPool' to support 100+ highly conceptual questions.

interface Enemy {
  name: string;
  type: 'COMMON' | 'ELITE' | 'BOSS';
  hp: number;
  maxHp: number;
  desc: string;
  portrait: string;
}

export default function App() {
  // Navigation & States
  const [gameState, setGameState] = useState<'LOADING' | 'INTRO' | 'PLAY' | 'REVIEW' | 'VICTORY' | 'GAMEOVER'>('INTRO');
  
  // Sound
  const [soundOn, setSoundOn] = useState<boolean>(true);

  // Web Serial API states
  const [serialSupported, setSerialSupported] = useState<boolean>(false);
  const [serialConnected, setSerialConnected] = useState<boolean>(false);
  const [activePort, setActivePort] = useState<any | null>(null);
  const [serialLogs, setSerialLogs] = useState<string[]>([]);
  const [lastReceivedSignal, setLastReceivedSignal] = useState<string>("수신 신호 없음");
  const [serialErrorAlert, setSerialErrorAlert] = useState<string | null>(null);

  // Player RPG stats
  const [playerHP, setPlayerHP] = useState<number>(100);
  const [playerMaxHP] = useState<number>(100);
  const [exp, setExp] = useState<number>(0);
  const [kcal, setKcal] = useState<number>(0);
  const [overallStage, setOverallStage] = useState<number>(1); // 5 stages total
  const [timeLeft, setTimeLeft] = useState<number>(30); // 30 seconds count down limit

  // Monsters
  const [currentMonsterIndex, setCurrentMonsterIndex] = useState<number>(0);
  const [monsterHP, setMonsterHP] = useState<number>(100);
  const [monsters, setMonsters] = useState<Enemy[]>([
    { name: "자릿수 왜곡 고블린", type: 'COMMON', hp: 100, maxHp: 100, desc: "신전 입구에 기생하며 수수점 첫째 자리를 어지럽히는 졸개 몬스터입니다.", portrait: "👹" },
    { name: "소수점 왜곡 사제 아라크", type: 'ELITE', hp: 100, maxHp: 100, desc: "비정칭 자릿수 왜곡 마법 가스를 살포해 모험가를 현혹시킵니다.", portrait: "🧙‍♂️" },
    { name: "에테르 소수 파괴 코어신", type: 'BOSS', hp: 100, maxHp: 100, desc: "고대 상형 문자로 수립된 최강의 난제 엔진. 오직 정량 캐스팅만이 격파 가능합니다.", portrait: "👁️" }
  ]);
  const activeMonster = monsters[currentMonsterIndex];

  // Mathematical active problems
  const [activeQuestion, setActiveQuestion] = useState<MathQuestion>(MATH_POOL.COMMON[0]);
  const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
  const [shuffledChoices, setShuffledChoices] = useState<{ value: number; pose: string }[]>([]);
  const [targetPose, setTargetPose] = useState<string>('SQUAT');

  // Input & Simulation Action
  const [playerPose, setPlayerPose] = useState<string>('NONE');
  const [isCasting, setIsCasting] = useState<boolean>(false);
  const [activeCastingPose, setActiveCastingPose] = useState<string>('NONE');
  const [castingProgress, setCastingProgress] = useState<number>(0);

  // Feedback, Battle statistics, and logs
  const [gameGuide, setGameGuide] = useState<string>("준비 완료! 신전의 제단에 올라 시리얼 포트를 설정하거나 1, 2, 3, 4 키를 눌러 공습하세요.");
  const [combatLogs, setCombatLogs] = useState<string[]>([
    "수하 전초전에 보정 에테르 시스템이 긴장 속에 기동되었습니다."
  ]);

  // Special Visual FX
  const [playerActionEffect, setPlayerActionEffect] = useState<string | null>(null);
  const [monsterActionEffect, setMonsterActionEffect] = useState<string | null>(null);
  const [shakingMonster, setShakingMonster] = useState<boolean>(false);
  const [damagePopup, setDamagePopup] = useState<{ text: string; isPlayer: boolean } | null>(null);

  // Incorrect records folder for holographic review screen
  const [mistakes, setMistakes] = useState<MathQuestion[]>([]);
  const [hologramPlayStep, setHologramPlayStep] = useState<number>(1); // Step 1: Base state, 2: Shifted, 3: Answer
  const [currentReviewIndex, setCurrentReviewIndex] = useState<number>(0);

  // Canvas context reference for live feedback skeletal representation
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Detect Web Serial capability inside browser
  useEffect(() => {
    if (typeof navigator !== 'undefined' && ('serial' in navigator || (navigator as any).serial)) {
      setSerialSupported(true);
    } else {
      setSerialSupported(false);
    }
  }, []);

  // Keyboard Event Handlers (Alternative physical keys 1, 2, 3, 4 map to signals 0, 1, 2, 3)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'PLAY') return;
      if (e.key === '1') {
        runSignalInput(0);
      } else if (e.key === '2') {
        runSignalInput(1);
      } else if (e.key === '3') {
        runSignalInput(2);
      } else if (e.key === '4') {
        runSignalInput(3);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, shuffledChoices, activeQuestion]);

  // Synchronize system mute state
  useEffect(() => {
    audio.soundOn = soundOn;
  }, [soundOn]);

  // Web Serial Reader Thread Loop
  const connectSerial = async () => {
    if (!serialSupported) {
      setSerialErrorAlert("사용 중이신 브라우저가 Web Serial API를 지원하지 않습니다. Chrome, Edge 또는 오페라 환경을 활성화하세요.");
      return;
    }

    try {
      setSerialErrorAlert(null);
      audio.playClick();
      const port = await (navigator as any).serial.requestPort();
      await port.open({ baudRate: 115200 });
      setActivePort(port);
      setSerialConnected(true);
      setLastReceivedSignal("연결 수립됨 (115200 Baud)");
      
      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();

      setCombatLogs(prev => ["[시리얼 통신] 아두이노 포트와 원활하게 주파수가 연계되었습니다.", ...prev]);

      // Read loop in background
      (async () => {
        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) {
              setLastReceivedSignal("포트 수신 종료");
              reader.releaseLock();
              break;
            }
            if (value) {
              // Extract numeric byte signal (either 0, 1, 2, or 3)
              // Handle incoming ASCII strings or binary stream
              const trimmed = value.trim();
              for (let i = 0; i < trimmed.length; i++) {
                const char = trimmed[i];
                if (['0', '1', '2', '3'].includes(char)) {
                  const signalNum = parseInt(char);
                  setLastReceivedSignal(`신호 ${signalNum} (${SIGNAL_TO_POSE_KEY[signalNum]})`);
                  runSignalInput(signalNum);
                }
              }
            }
          }
        } catch (error: any) {
          console.error("Reader loop error", error);
          setSerialErrorAlert(`수신 에러 발생: ${error?.message || "연결 유실"}`);
          setSerialConnected(false);
        }
      })();

    } catch (err: any) {
      console.error("Web Serial opening failed:", err);
      setSerialErrorAlert(`시리얼 포트 개방 실패: ${err?.message || "사용자 거부 또는 포트 점유 상태"}`);
    }
  };

  const handleQuickClick = (choiceVal: number, choicePose: string) => {
    audio.playClick();
    const designSpec = POSES[choicePose];
    if (designSpec) {
      runSignalInput(designSpec.signal);
    }
  };

  // Process the raw serial payload
  const runSignalInput = (signalType: number) => {
    const matchedPoseKey = SIGNAL_TO_POSE_KEY[signalType];
    if (!matchedPoseKey) return;

    setPlayerPose(matchedPoseKey);

    // Casting starting sequence
    setIsCasting(true);
    setActiveCastingPose(matchedPoseKey);
    setCastingProgress(0);
    setGameGuide(`⚡ [${POSES[matchedPoseKey].name}] 신호 포착! 마력 고정을 위한 실시간 캐스팅 유지 루프 수립 중...`);
  };

  // Load next question depending on overall progress (Stage 1~5)
  const loadQuestionForStage = (stageNum: number, currentAskedHistory = askedQuestions) => {
    let pool: MathQuestion[] = MATH_POOL.COMMON;
    if (stageNum >= 4) {
      pool = MATH_POOL.BOSS;
    } else if (stageNum >= 2) {
      pool = MATH_POOL.ELITE;
    }

    // Filter out already asked questions, fallback to entire pool if all are asked
    let available = pool.filter(q => !currentAskedHistory.includes(q.question));
    if (available.length === 0) {
      available = pool;
    }

    const randomIdx = Math.floor(Math.random() * available.length);
    const selectedQ = available[randomIdx];
    
    // Add to asked questions list
    setAskedQuestions(prev => {
      const base = currentAskedHistory === askedQuestions ? prev : currentAskedHistory;
      if (!base.includes(selectedQ.question)) {
        return [...base, selectedQ.question];
      }
      return base;
    });

    setActiveQuestion(selectedQ);

    const poseKeys = ['SQUAT', 'LUNGE', 'BEND_FORWARD', 'RAISE_ARMS'];
    
    // Shuffle only the choice values, but map them to static, sequential poses
    // This keeps the columns on the screen in a consistent static order (squat, lunge, shield, celestial)
    const randomizedChoices = [...selectedQ.choices].sort(() => Math.random() - 0.5);

    const mapped = randomizedChoices.map((choiceVal, idx) => {
      const targetPos = poseKeys[idx];
      if (choiceVal === selectedQ.correctAnswer) {
        setTargetPose(targetPos);
      }
      return { value: choiceVal, pose: targetPos };
    });

    setShuffledChoices(mapped);
    setCastingProgress(0);
    setIsCasting(false);
    setActiveCastingPose('NONE');
    setTimeLeft(30); // Reset timer to 30 for the new question
    setGameGuide("새로운 에테르 결계 발견! 알맞은 답을 가진 신전의 석조 동작을 실시간 유지하십시오.");
  };

  // Start pristine sequence
  const startEpicGame = () => {
    audio.playClick();
    setPlayerHP(100);
    setMonsterHP(100);
    setCurrentMonsterIndex(0);
    setOverallStage(1);
    setExp(0);
    setKcal(0);
    setTimeLeft(30); // Initial 30 seconds set
    setMistakes([]);
    setAskedQuestions([]);
    setCombatLogs(["에테르 코어 가상 수조 가동... 제 1구역 제단의 적들과 격돌합니다!"]);
    setGameState('PLAY');
    loadQuestionForStage(1, []);
  };

  // Casting state machine progress loop
  useEffect(() => {
    let castingTimer: NodeJS.Timeout;

    if (isCasting && activeCastingPose !== 'NONE') {
      audio.playCast();
      castingTimer = setInterval(() => {
        setCastingProgress(prev => {
          const tickSpeed = 10; // Rate to hit 100 in ~1.5 seconds under 150ms steps
          const nextVal = prev + tickSpeed;

          // Compute estimated burned calories
          const activeSpec = POSES[activeCastingPose];
          if (activeSpec) {
            setKcal(k => +(k + activeSpec.kcalPerSec * 0.15).toFixed(3));
          }

          if (nextVal >= 100) {
            clearInterval(castingTimer);
            setIsCasting(false);
            resolveCastedSpell(activeCastingPose);
            return 100;
          }
          return nextVal;
        });
      }, 150);
    }

    return () => clearInterval(castingTimer);
  }, [isCasting, activeCastingPose]);

  // 30 seconds countdown timer for active questions
  useEffect(() => {
    if (gameState !== 'PLAY') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time expired! Take penalty
          audio.playWrong();
          audio.playHit();
          setPlayerHP(p => {
            const nextL = Math.max(0, p - 15);
            if (nextL <= 0) {
              setGameState('GAMEOVER');
              audio.playDefeat();
            }
            return nextL;
          });
          setDamagePopup({ text: `-15 시간 초과!`, isPlayer: true });
          setCombatLogs(prevLogs => [
            `⏰ [결계 시한 초과] 에테르 마력 고정 시간이 초과되어 몬스터가 15만큼 기습 타격했습니다! 정밀 계산을 서두르십시오.`,
            ...prevLogs
          ]);
          setGameGuide("시간 초과! 괴물이 기습 타격을 입혔습니다. 다시 기운을 집중해 정답을 찾아보세요.");
          // Reset the timer for the same question so the student can keep solving
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, activeQuestion]);

  // Evaluate success or wrong results
  const resolveCastedSpell = (castingPose: string) => {
    const pairedChoice = shuffledChoices.find(sc => sc.pose === castingPose);
    if (!pairedChoice) return;

    const isWinner = pairedChoice.value === activeQuestion.correctAnswer;
    const skillSpec = POSES[castingPose];

    if (isWinner) {
      // Correct!
      confetti({
        particleCount: 100,
        spread: 80,
        colors: ['#06fa9d', '#38bdf8', '#eab308']
      });
      audio.playCorrect();
      audio.playHit();

      setShakingMonster(true);
      setPlayerActionEffect(castingPose);
      setDamagePopup({ text: `-20 에테르 타격! (약점 관통)`, isPlayer: false });

      // Stat awards
      setExp(x => x + 20);
      const nextMonsterHP = Math.max(0, monsterHP - 20);
      setMonsterHP(nextMonsterHP);

      const combatMsg = `💥 [정화 완수] '${skillSpec.skillName}'(${skillSpec.element.split(' ')[0]}) 정량 방출 성공! 정답 소수 배정인 '${pairedChoice.value}' 수치를 정수화 관철해 몬스터 체력을 20 파괴했습니다! (단계 클리어를 위해 총 5개의 문제가 정밀 필요합니다)`;
      setCombatLogs(prev => [combatMsg, ...prev]);

      if (nextMonsterHP <= 0) {
        setTimeout(() => {
          setShakingMonster(false);
          advanceStageOrVictory();
        }, 1200);
      } else {
        setGameGuide("결계에 균열이 발생했습니다! 연계 타격을 위해 다음 수식 해체에 들어가세요.");
        setTimeout(() => {
          setShakingMonster(false);
          loadQuestionForStage(overallStage);
        }, 1300);
      }

    } else {
      // Wrong Answer!
      audio.playWrong();
      audio.playHit();

      setMonsterActionEffect('CHARGE');
      setDamagePopup({ text: `-20 신전 오염 데미지!`, isPlayer: true });

      // Save to mistake ledger for review
      setMistakes(m => {
        if (m.some(x => x.question === activeQuestion.question)) return m;
        return [...m, activeQuestion];
      });

      const nextPlayerHP = Math.max(0, playerHP - 20);
      setPlayerHP(nextPlayerHP);

      const errorMsg = `⚠️ [자릿수 왜곡 오폭] '${pairedChoice.value}' 수치는 고대 제단의 소수 자릿점 궤적에 부합하지 않습니다! 마법 유지가 차단되어 괴물이 20의 반격을 날렸습니다.`;
      setCombatLogs(prev => [errorMsg, ...prev]);

      if (nextPlayerHP <= 0) {
        setTimeout(() => {
          setGameState('GAMEOVER');
          audio.playDefeat();
        }, 1000);
      } else {
        setGameGuide("틀렸습니다! 우측 상단의 '도움말 해설' 또는 결계 패턴을 복기하고, 동일한 문제의 올바른 정답 동작을 취해 보세요.");
        setTimeout(() => {
          setCastingProgress(0);
          setIsCasting(false);
          setActiveCastingPose('NONE');
        }, 1400);
      }
    }

    // Reset combat flags
    setTimeout(() => {
      setPlayerActionEffect(null);
      setMonsterActionEffect(null);
      setDamagePopup(null);
    }, 1500);
  };

  // Progression Engine: Handle stages escalation up to 5 stages
  const advanceStageOrVictory = () => {
    audio.playLevelUp();
    
    if (overallStage >= 5) {
      // Final complete overall victory
      setGameState('VICTORY');
      confetti({
        particleCount: 180,
        spread: 120,
        scalar: 1.4
      });
      return;
    }

    const nextStage = overallStage + 1;
    setOverallStage(nextStage);

    // Switch monster logic dynamically across 5 stages
    if (nextStage === 3) {
      setCurrentMonsterIndex(1);
      setMonsterHP(100);
      setCombatLogs(prev => [`⚔️ 신전 제 2계층 진입 완료! 새로운 수식 사제 '${monsters[1].name}'가 군림합니다.`, ...prev]);
    } else if (nextStage === 5) {
      setCurrentMonsterIndex(2);
      setMonsterHP(100);
      setCombatLogs(prev => [`🔥 핵심 수조 성전 도달! 최종 파괴 코어신 '${monsters[2].name}'가 가상의 포화를 개시합니다!`, ...prev]);
    } else {
      setMonsterHP(100);
      setCombatLogs(prev => [`🎉 제 ${nextStage} 수호 단계 진입! 적이 연산 마법 주파수를 극적 교란 전향합니다.`, ...prev]);
    }

    loadQuestionForStage(nextStage);
  };

  // Render high-frequency fantasy skeletal projection inside neon stone background
  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    let frameCount = 0;

    const drawHologramScene = () => {
      frameCount++;
      const width = canvasRef.current?.width || 320;
      const height = canvasRef.current?.height || 240;

      // Fill rich obsidian temple grid
      ctx.fillStyle = '#0a0f1d';
      ctx.fillRect(0, 0, width, height);

      // Neon grid lines
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Circle of runes in retro perspective
      ctx.strokeStyle = 'rgba(6, 250, 157, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(width / 2, height - 30, 60, 20, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Cyber status text overlay
      ctx.fillStyle = 'rgba(226, 232, 240, 0.7)';
      ctx.font = '10px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`HARDWARE RECEIVED: [${playerPose}]`, 15, 25);
      ctx.fillText(`TARGET CALIBRATION: ${targetPose}`, 15, 40);

      // Draw custom skeleton structures mimicking received posture logic
      if (playerPose !== 'NONE') {
        const bounce = Math.sin(frameCount * 0.15) * 5;
        let headY = 80 + bounce;
        let hipY = 145;
        let leftLegToX = 120, rightLegToX = 200;
        let leftLegToY = 210, rightLegToY = 210;
        let leftArmToX = 110, rightArmToX = 210;
        let leftArmToY = 100, rightArmToY = 100;

        if (playerPose === 'SQUAT') {
          // Flatten body
          headY = 110 + bounce;
          hipY = 165;
          leftLegToX = 110; rightLegToX = 210;
          leftLegToY = 210; rightLegToY = 210;
        } else if (playerPose === 'LUNGE') {
          headY = 95 + bounce;
          leftLegToX = 100; rightLegToX = 230;
          leftLegToY = 210; rightLegToY = 195;
        } else if (playerPose === 'BEND_FORWARD') {
          // Bent forward, hands way down
          headY = 120;
          hipY = 110;
          leftArmToX = 140; rightArmToX = 150;
          leftArmToY = 200; rightArmToY = 200;
        } else if (playerPose === 'RAISE_ARMS') {
          // Arms lifted high
          headY = 75 + bounce;
          leftArmToX = 120; rightArmToX = 200;
          leftArmToY = 35; rightArmToY = 35;
        }

        // Highlight Active Element Color
        const activeColor = POSES[playerPose]?.glowColor || 'rgba(99, 102, 241, 0.4)';

        // Draw outer mystical energy shield around bones
        ctx.strokeStyle = activeColor;
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(160, headY);
        ctx.lineTo(160, hipY);
        ctx.stroke();

        // Core glow vector bones
        ctx.strokeStyle = '#06fa9d';
        ctx.lineWidth = 4;
        ctx.beginPath();
        // Head circle
        ctx.arc(160, headY, 14, 0, Math.PI * 2);
        ctx.fillStyle = '#06fa9d';
        ctx.fill();
        ctx.stroke();

        // Spine
        ctx.beginPath();
        ctx.moveTo(160, headY + 14);
        ctx.lineTo(160, hipY);

        // Arms from shoulders
        ctx.moveTo(160, headY + 22);
        ctx.lineTo(120, leftArmToY);
        ctx.moveTo(160, headY + 22);
        ctx.lineTo(200, rightArmToY);

        // Legs from hips
        ctx.moveTo(160, hipY);
        ctx.lineTo(leftLegToX, leftLegToY);
        ctx.moveTo(160, hipY);
        ctx.lineTo(rightLegToX, rightLegToY);
        ctx.stroke();

        // Draw hot joints in cherry pink
        ctx.fillStyle = '#f43f5e';
        const joints = [
          [160, headY + 22],
          [120, leftArmToY],
          [200, rightArmToY],
          [160, hipY],
          [leftLegToX, leftLegToY],
          [rightLegToX, rightLegToY]
        ];
        joints.forEach(([jx, jy]) => {
          ctx.beginPath();
          ctx.arc(jx, jy, 4, 0, Math.PI * 2);
          ctx.fill();
        });
      } else {
        // Holographic standby circle
        ctx.fillStyle = 'rgba(99, 102, 241, 0.3)';
        ctx.textAlign = 'center';
        ctx.font = '11px sans-serif';
        ctx.fillText("수호전사 대기 상태", width / 2, height / 2 - 10);
        ctx.fillText("포즈 수신 신호를 기다리고 있습니다", width / 2, height / 2 + 10);
      }

      animationFrameId.current = requestAnimationFrame(drawHologramScene);
    };

    animationFrameId.current = requestAnimationFrame(drawHologramScene);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [playerPose, targetPose]);

  // Download Standalone Code functionality
  const downloadSingleHTMLFile = () => {
    audio.playClick();
    
    // Create the self-contained pure HTML system that works on arbitrary systems with CDN Tailwind, Lucide, Web Serial
    const fileContent = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>고대 신전: 에테르 코어의 수호자 (Web Serial Edition)</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Canvas Confetti CDN -->
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Noto+Sans+KR:wght@300;500;700;900&display=swap');
    body {
      font-family: 'Noto Sans KR', sans-serif;
      background-color: #050811;
    }
    .neon-text-green {
      text-shadow: 0 0 8px #06fa9d, 0 0 15px rgba(6, 250, 157, 0.5);
    }
  </style>
</head>
<body class="text-slate-100 min-h-screen">
  <div class="max-w-4xl mx-auto p-6">
    <header class="border-b border-indigo-950 pb-6 mb-8 text-center">
      <h1 class="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400 uppercase tracking-widest font-serif">
        ✨ 고대 신전: 에테르 코어의 수호자
      </h1>
      <p class="text-xs text-indigo-400 mt-2 font-mono">STANDALONE WEB SERIAL HARDWARE INTEGRATION PAGE</p>
    </header>

    <div class="bg-indigo-950/40 border border-indigo-900 rounded-2xl p-6 shadow-xl mb-6">
      <h2 class="text-lg font-bold text-teal-300 mb-2 flex items-center gap-2">🔌 아두이노 및 AI 카메라 직렬 수신</h2>
      <p class="text-xs text-slate-400 mb-4 leading-relaxed">
        이 단일 파일은 아두이노 기기에서 유입되는 시리얼 통신 신호(Baud Rate 115200)를 Web Serial API를 활용해 웹브라우저에서 직접 수용합니다.
      </p>

      <div class="flex flex-wrap gap-4 items-center mb-4">
        <button id="btn-connect" class="px-5 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-indigo-600 font-bold text-xs hover:opacity-90 cursor-pointer">
          디바이스 시리얼 포트 연결
        </button>
        <div id="connection-status" class="px-4 py-2 border border-slate-700 rounded bg-slate-900 text-xs font-mono text-red-400">
          ● 미연결 (Offline)
        </div>
        <div id="incoming-preview" class="px-4 py-2 border border-slate-700 rounded bg-slate-900 text-xs font-mono text-amber-400">
          수신된 신호 : 없음
        </div>
      </div>

      <div class="bg-black/40 p-3 rounded text-xs font-mono text-slate-400 max-h-32 overflow-y-auto" id="serial-logs">
        [시스템] 포트 연결을 시도해 신호를 획득하시면 자동으로 게임이 실행됩니다. AI카메라가 없을 때에는 [키보드 숫자 키 1, 2, 3, 4]를 사용하여 수동 시뮬레이션 제어가 완비되어 있습니다.
      </div>
    </div>

    <div class="p-6 rounded-2xl border border-indigo-950 bg-slate-900/60 text-center mb-8">
      <h3 class="text-xl font-bold mb-4">🎮 게임 실행 가이드</h3>
      <p class="text-sm text-slate-300 leading-relaxed mb-6">
        이 다운로드된 단일 파일은 HTML5 및 순수 JS로 빌드되었습니다. 우주 최강의 에테르 코어 수호 전투를 시작하기 위해서 브라우저에서 '수학전사: 에테르 코어의 수호자' 원본 웹앱을 기동하시거나, 마더 시스템을 활용해 연동해 주시기 바랍니다.
      </p>
      <a href="` + window.location.origin + `" class="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-bold inline-block">
        온라인 마더 서버 접속하기
      </a>
    </div>
  </div>

  <script>
    let port;
    let reader;
    const btnConnect = document.getElementById('btn-connect');
    const statusDiv = document.getElementById('connection-status');
    const incomingPreview = document.getElementById('incoming-preview');
    const logsDiv = document.getElementById('serial-logs');

    function logMsg(msg) {
      const p = document.createElement('p');
      p.textContent = msg;
      logsDiv.appendChild(p);
      logsDiv.scrollTop = logsDiv.scrollHeight;
    }

    if (!('serial' in navigator)) {
      btnConnect.disabled = true;
      statusDiv.textContent = '❌ Web Serial 비지원 브라우저';
      logMsg('[경고] 이 웹 브라우저는 Web Serial API를 사용할 수 없습니다. Chrome 이나 Edge를 활용해 주세요.');
    }

    btnConnect.addEventListener('click', async () => {
      try {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115200 });
        statusDiv.textContent = '● 연결 성공 (115200 Baud)';
        statusDiv.className = 'px-4 py-2 border border-emerald-950 rounded bg-emerald-950/40 text-xs font-mono text-emerald-400';
        logMsg('[성공] 시리얼 통신 스트리밍이 재개되었습니다.');

        const textDecoder = new TextDecoderStream();
        const readableStreamClosed = port.pipeTo(textDecoder.writable);
        reader = textDecoder.readable.getReader();

        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            reader.releaseLock();
            break;
          }
          if (value) {
            incomingPreview.textContent = '수신 : ' + value;
            logMsg('[데이터 수신] ' + value.trim());
          }
        }
      } catch (err) {
        logMsg('[에러] 포트 수용에 실패했습니다 : ' + err.message);
      }
    });

    window.addEventListener('keydown', (e) => {
      if (['1', '2', '3', '4'].includes(e.key)) {
        logMsg('[키보드 에뮬레이트] 신호 ' + (parseInt(e.key) - 1).toString() + ' 주입');
      }
    });
  </script>
</body>
</html>`;

    const blob = new Blob([fileContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ether-core-guardian-serial-loader.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div id="math-temple-root" className="min-h-screen bg-[#060a13] text-[#e2e8f0] font-sans antialiased selection:bg-[#06fa9d] selection:text-[#060a13] relative overflow-x-hidden">
      
      {/* Mystical glowing overlay */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* HEADER SECTION WITH WEBSERIAL INTEGRATOR */}
      <header id="godtemple-header" className="border-b border-[#1e293b] bg-[#070c18]/90 backdrop-blur-md px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-700 to-emerald-600 shadow-md shadow-indigo-500/20 animate-pulse">
            <Cpu className="w-6 h-6 text-[#06fa9d]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 id="temple-title" className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-[#06fa9d] tracking-wide">
                고대 신전: 에테르 코어의 수호자
              </h1>
              <span className="hidden sm:inline-block text-[10px] bg-emerald-950 text-emerald-400 font-mono font-bold px-2 py-0.5 rounded border border-emerald-900">
                Web Serial API 115200 Baud
              </span>
            </div>
            <p className="text-xs text-[#64748b]">AI 카메라 센서 신호 연동 | 스쿼트(0)ㆍ런지(1)ㆍ앞굽히기(2)ㆍ만세(3) 전신 수련</p>
          </div>
        </div>

        {/* COMBINED STATS BAR & EXTRAS */}
        <div className="flex flex-wrap items-center gap-3 text-sm font-mono">
          {/* Web Serial Connector Widget */}
          <div className="flex items-center gap-2 bg-[#10192e] px-3 py-1.5 rounded-xl border border-indigo-950">
            <span className={`w-2 h-2 rounded-full ${serialConnected ? 'bg-[#06fa9d] animate-ping' : 'bg-rose-500'}`}></span>
            <span className="text-[11px] text-slate-400">카메라 하드웨어:</span>
            <button 
              id="serial-conn-trigger"
              onClick={connectSerial}
              className={`text-[10px] font-bold px-2.5 py-1 rounded cursor-pointer transition-all ${
                serialConnected 
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow'
              }`}
            >
              {serialConnected ? "연결 완료" : "시리얼 카메라 연결"}
            </button>
          </div>

          <button
            id="download-standalone-html"
            onClick={downloadSingleHTMLFile}
            className="flex items-center gap-1.5 px-3 py-2 border border-emerald-900 text-xs font-bold text-[#06fa9d] bg-emerald-950/20 rounded-xl hover:bg-emerald-950/50 transition-all cursor-pointer shadow-md"
            title="인증 포트 연동용 단일 HTML 파일로 추출하기"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">단일 HTML 추출</span>
          </button>

          <div className="flex items-center gap-1.5">
            <button 
              id="toggle-muting"
              onClick={() => {
                setSoundOn(!soundOn);
                audio.playTone(320, 'sine', 0.1);
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 cursor-pointer text-xs"
              title="오디오 음소거"
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => { audio.playClick(); setGameState('INTRO'); }}
              className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 text-xs flex items-center gap-1 hover:bg-slate-800 cursor-pointer transition-all"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>가이드</span>
            </button>
          </div>
        </div>
      </header>

      {/* IF SERIAL HAS ERROR NOTIFY EXCEPTION */}
      {serialErrorAlert && (
        <div id="serial-error-banner" className="bg-rose-950/90 backdrop-blur-md border-b-2 border-rose-600 font-sans z-50 relative p-4 md:px-8 shadow-xl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-rose-950 border border-rose-800 text-rose-400 mt-0.5">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-rose-200">
                  {serialErrorAlert.toLowerCase().includes('permissions policy') || serialErrorAlert.toLowerCase().includes('disallowed')
                    ? "🔒 브라우저 보안 규정상 Iframe 내 시리얼(Web Serial) 접근 차단됨"
                    : "⚠️ 시리얼 하드웨어 통신 중 예외 발생"}
                </h4>
                <p className="text-xs text-rose-300 max-w-3xl leading-relaxed">
                  {serialErrorAlert.toLowerCase().includes('permissions policy') || serialErrorAlert.toLowerCase().includes('disallowed') ? (
                    <>
                      구글 AI 스튜디오의 <strong>미리보기 창(Iframe) 안에서는 보안 정책(Permissions Policy)으로 인해</strong> USB 및 시리얼 통신 장치 접근이 금지되어 있습니다. 
                      이 문제는 <strong>우측 상단의 새 창 열기 아이콘 [↗]</strong>을 클릭하여 개별 탭에서 실행하거나, 아래의 <u>새 탭에서 게임 열기</u> 버튼을 누르면 즉시 해결 및 100% 정상 연동됩니다!
                    </>
                  ) : (
                    `원인: ${serialErrorAlert}`
                  )}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <button
                onClick={() => {
                  audio.playClick();
                  window.open(window.location.origin, '_blank');
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-lg transition-all shadow-md shadow-rose-950/50 cursor-pointer flex items-center gap-1.5"
              >
                <span>새 탭에서 게임 열기 (해결책)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              
              <button 
                onClick={() => setSerialErrorAlert(null)}
                className="px-3 py-2 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-lg cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- INTRO PLAYGROUND GATE --- */}
      {gameState === 'INTRO' && (
        <main id="intro-screen" className="max-w-4xl mx-auto px-6 py-10">
          <div className="relative text-center rounded-3xl overflow-hidden border border-[#1e293b] bg-gradient-to-b from-[#111e38] to-[#0a1122] p-8 md:p-12 shadow-2xl">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
            
            <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-[#06fa9d] to-indigo-600 flex items-center justify-center shadow-lg shadow-[#06fa9d]/20 mb-6 relative">
              <Swords className="w-12 h-12 text-[#06fa9d]" />
              <div className="absolute inset-0 rounded-full bg-emerald-400/10 animate-ping" style={{ animationDuration: '3s' }}></div>
            </div>

            <h2 id="intro-subtitle" className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-4 font-mono tracking-wide">
              고대 신전: 에테르 코어의 수호자
            </h2>
            <p className="text-[#94a3b8] max-w-xl mx-auto text-xs md:text-sm leading-relaxed mb-6">
              사악한 소수점 왜곡 몬스터들이 신전의 고대 핵심 코어 수식을 공격합니다! 온몸을 굽히고 펴 호흡하며 왜곡된 소수 자릿점 함정을 간파하고 정화의 화살을 발사하십시오.
            </p>

            {/* PRESET INFO TILES UPDATED */}
            <h3 className="text-[11px] uppercase text-[#64748b] tracking-widest font-black mb-4">🔮 고대 수호자 4대 정량 시리얼 코어 포즈</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-left mb-8">
              {Object.values(POSES).map((pose) => (
                <div key={pose.id} className="bg-slate-950/60 p-4 rounded-xl border border-indigo-950 flex flex-col justify-between hover:border-slate-800 transition-all">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <div className={`h-2 w-12 rounded-full bg-gradient-to-r ${pose.color}`}></div>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded font-bold border border-cyan-900">
                        신호 {pose.signal}번
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1 font-mono">
                      {pose.name}
                    </h4>
                    <p className="text-[10px] text-[#94a3b8] mt-1.5 leading-relaxed">{pose.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-900/40 flex justify-between items-center text-[9px] font-mono text-[#06fa9d]">
                    <span>스킬: {pose.skillName}</span>
                    <span className="text-amber-500">{(pose.kcalPerSec * 10).toFixed(1)} kcal/회</span>
                  </div>
                </div>
              ))}
            </div>

            {/* SYNERGY HIGHLIGHTS WITH WEBSERIAL DETECT */}
            <div className="bg-[#0b1324] border border-indigo-950 p-5 rounded-2xl text-left max-w-2xl mx-auto mb-8 text-xs leading-relaxed space-y-3">
              <div className="flex items-center gap-2 font-bold text-[#06fa9d]">
                <Cpu className="w-4 h-4" /> 
                <span>아두이노 시리얼 통신 연동 안내 (115200 Baud):</span>
              </div>
              <p className="text-slate-400">
                1) AI카메라를 탑재한 아두이노 장비를 PC와 연계합니다.<br />
                2) 상단 우측의 <strong className="text-cyan-400">"시리얼 카메라 연결"</strong> 버튼을 클릭하여 장치가 물려 있는 포트를 인증 지정합니다.<br />
                3) 준비가 다 되었으면 바로 1.5초 동작을 취해 캐스팅에 임하십시오. <br />
                <span className="text-amber-400 font-bold">※ 장비가 준비되지 않았어도 1, 2, 3, 4번 키보드 버튼으로 완벽하게 수동 훈련할 수 있습니다!</span>
              </p>
            </div>

            <button
              id="start-game-btn"
              onClick={startEpicGame}
              className="px-12 py-5 rounded-xl bg-gradient-to-r from-teal-500 via-indigo-600 to-purple-600 text-white font-extrabold text-base select-none cursor-pointer tracking-widest hover:opacity-95 shadow-xl shadow-indigo-500/20 active:scale-95 transition-all"
            >
              성전 수호 타격 개시 !
            </button>
          </div>
        </main>
      )}

      {/* --- MAIN GAMEPLAY BOARD --- */}
      {gameState === 'PLAY' && (
        <main id="gameplay-screen" className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          
          {/* LEFT PANELS: BATTLE SCREEN & MATHEMATICAL DECK (8 cols) */}
          <section className="lg:col-span-8 flex flex-col gap-6">
            
            {/* 1. FIGHT ARENA DISPLAY */}
            <div className="relative rounded-2xl border border-indigo-950 bg-[#070b13] h-80 w-full overflow-hidden shadow-inner font-mono">
              {/* Dynamic Aura color glow */}
              <div className={`absolute inset-0 opacity-10 transition-all ${
                currentMonsterIndex === 0 ? 'bg-amber-900' : currentMonsterIndex === 1 ? 'bg-cyan-900' : 'bg-purple-950'
              }`}></div>

              {/* Grid Watermarks */}
              <div className="absolute top-3 left-4 bg-slate-950/80 px-2 py-1 rounded text-[10px] text-slate-400 uppercase tracking-widest border border-indigo-950 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Raid Dimension Stage: {overallStage}/5
              </div>

              {/* Dynamic Countdown Timer */}
              <div className="absolute top-3 right-4 bg-slate-950/80 px-2.5 py-1 rounded text-[10px] uppercase tracking-widest border border-indigo-950 flex items-center gap-1.5 backdrop-blur">
                <span className={`h-1.5 w-1.5 rounded-full ${timeLeft <= 10 ? 'bg-rose-500 animate-ping' : timeLeft <= 20 ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
                <span className="text-slate-400">제한시간:</span>
                <span className={`font-black text-xs ${timeLeft <= 10 ? 'text-rose-400 animate-pulse' : timeLeft <= 20 ? 'text-amber-400' : 'text-[#06fa9d]'}`}>{timeLeft}초</span>
              </div>

              {/* ACTORS DECK */}
              <div id="versus-board" className="flex justify-between items-center h-full px-4 md:px-10 relative z-10 pt-4">
                
                {/* A. GUARDIAN WARRIOR COMPONENT */}
                <div className="flex flex-col items-center relative">
                  {playerActionEffect && (
                    <span className="absolute -top-12 text-[10px] font-black px-2.5 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-bounce text-slate-950 shadow-md">
                      ⚔️ {POSES[playerActionEffect]?.skillName || "연격!"}
                    </span>
                  )}
                  {damagePopup && damagePopup.isPlayer && (
                    <span className="absolute top-2 z-30 text-base font-black text-rose-500 animate-ping bg-black/90 px-2 py-1 rounded border border-rose-900">
                      {damagePopup.text}
                    </span>
                  )}

                  {/* Character Block */}
                  <div className={`w-28 h-28 rounded-2xl flex items-center justify-center border bg-slate-950/40 relative transition-all duration-300 ${
                    playerActionEffect ? 'border-[#06fa9d] rotate-3 scale-110 shadow-lg shadow-emerald-500/10' : 'border-indigo-500/20'
                  }`}>
                    {playerPose !== 'NONE' && (
                      <div className="absolute inset-0 rounded-2xl bg-indigo-500/15 animate-ping"></div>
                    )}
                    
                    {/* Retro character avatar skeleton */}
                    <div className="text-center">
                      <span className="text-4xl block mb-1">🛡️</span>
                      <span className="text-[10px] text-slate-400 font-bold block">수호 전사</span>
                    </div>

                    {/* Passive status indicators */}
                    <div className="absolute bottom-1 bg-slate-950/90 text-[8px] px-2 py-0.5 rounded text-[#06fa9d] border border-indigo-950">
                      {playerPose === 'NONE' ? 'STANCE: 대기' : `STANCE: ${POSES[playerPose]?.name}`}
                    </div>
                  </div>

                  {/* HP bar */}
                  <div className="w-28 mt-3">
                    <div className="flex justify-between items-center text-[9px] mb-1">
                      <span className="font-bold flex items-center gap-1 text-slate-300">
                        <Heart className="w-3 h-3 text-[#ff3366] fill-[#ff3366]" /> HP
                      </span>
                      <span className="text-slate-400">{playerHP}/100</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden p-0.5 border border-indigo-950">
                      <div 
                        className="bg-gradient-to-r from-rose-500 to-pink-500 h-1 rounded-full transition-all duration-300" 
                        style={{ width: `${playerHP}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* VS BAR Indicator */}
                <div className="flex flex-col items-center">
                  <div className="text-slate-800 font-extrabold text-lg italic tracking-widest bg-slate-950/80 px-2 py-1 rounded border border-indigo-950">
                    VS
                  </div>
                  <div className="text-[9px] text-[#06fa9d] mt-1 text-center font-mono">
                    이동 자릿수 타격
                  </div>
                </div>

                {/* B. ENEMY MONSTER COMPONENT */}
                <div className="flex flex-col items-center relative">
                  {damagePopup && !damagePopup.isPlayer && (
                    <span className="absolute top-2 z-30 text-base font-black text-emerald-400 anim-popup bg-black/95 px-2 py-1 rounded border border-[#06fa9d]">
                      {damagePopup.text}
                    </span>
                  )}
                  {monsterActionEffect && (
                    <span className="absolute -top-12 text-[10px] font-black px-2.5 py-1 rounded-full bg-rose-600 animate-bounce text-white shadow-md">
                      ⚠️ 자릿수 암흑포!
                    </span>
                  )}

                  {/* Monster Card Display */}
                  <div className={`w-28 h-28 rounded-2xl flex flex-col items-center justify-center border bg-slate-950/40 relative transition-all duration-300 ${
                    shakingMonster ? 'animate-bounce border-emerald-400 scale-105' : 'border-indigo-500/20'
                  }`}>
                    <span className="text-5xl block select-none mb-1">{activeMonster.portrait}</span>
                    <span className="text-[9px] text-slate-400 font-bold block">{activeMonster.name}</span>

                    <span className="absolute top-1 right-2 bg-rose-950 text-[8px] text-rose-400 font-mono font-bold px-1.5 rounded border border-rose-900">
                      LV {overallStage * 2 + 1}
                    </span>
                  </div>

                  {/* HP bar */}
                  <div className="w-28 mt-3">
                    <div className="flex justify-between items-center text-[9px] mb-1">
                      <span className="font-bold text-rose-300">{activeMonster.name}</span>
                      <span className="text-slate-400">{monsterHP}/{activeMonster.maxHp}</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden p-0.5 border border-indigo-950">
                      <div 
                        className="bg-gradient-to-r from-[#06fa9d] to-cyan-400 h-1 rounded-full transition-all duration-300" 
                        style={{ width: `${(monsterHP / activeMonster.maxHp) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

              </div>

              {/* BOTTOM REALTIME MAGIC CASTING BANNER */}
              {isCasting && (
                <div className="absolute inset-x-0 bottom-0 bg-[#040811]/95 py-3 px-5 border-t border-indigo-950 z-20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                    </span>
                    <span className="text-[10px] text-slate-100 font-bold font-mono">
                      캐스팅 잠금: [{POSES[activeCastingPose]?.name}] ({castingProgress}%)
                    </span>
                  </div>
                  <div className="w-48 bg-slate-950 h-3 rounded-full overflow-hidden p-[2px] border border-indigo-900 flex-1 mx-4">
                    <div 
                      className="bg-gradient-to-r from-cyan-400 via-[#06fa9d] to-yellow-400 h-full rounded-full transition-all duration-100"
                      style={{ width: `${castingProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-[9px] text-yellow-400 font-bold">1.5초 동작 고정</span>
                </div>
              )}
            </div>

            {/* 2. DYNAMIC MATHEMATICAL EQUATION FORMULA CARD */}
            <div id="math-arena-card" className="p-6 rounded-2xl border border-indigo-950 bg-gradient-to-b from-[#091124] to-[#040810] flex flex-col justify-between shadow-lg">
              
              <div className="flex items-center justify-between pb-3 border-b border-indigo-950/60 mb-5 text-[10px] uppercase font-mono tracking-widest text-slate-400">
                <span className="text-[#06fa9d] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  에테르 궤변 결계 디코더
                </span>
                <span>난이도 수위: {activeQuestion.type === 'COMMON' ? '초급' : activeQuestion.type === 'ELITE' ? '중격 연계' : '보스 상징 파괴'}</span>
              </div>

              {/* LARGE MATH EQUATION TEXT */}
              <div className="text-center py-5">
                <span className="text-[11px] block text-indigo-400 font-mono tracking-widest mb-1">DIVIDE THE TRAJECTORY</span>
                <div className="inline-flex items-center gap-3 text-4xl md:text-5xl font-black font-mono tracking-wider">
                  <span className="text-indigo-200">{activeQuestion.dividend}</span>
                  <span className="text-slate-500 font-light text-2xl">÷</span>
                  <span className="text-yellow-400">{activeQuestion.divisor}</span>
                  <span className="text-slate-500 font-light text-2xl">=</span>
                  <span className="text-[#06fa9d] border-2 border-dashed border-[#06fa9d]/30 px-5 py-1.5 rounded-xl animate-pulse">?</span>
                </div>
              </div>

              {/* DETAILED EDUCATIONAL DECODER MATRIX HINT */}
              <div className="bg-[#050811] border border-indigo-950 p-4 rounded-xl text-xs mt-3">
                <div className="flex items-center gap-2 mb-2 text-indigo-300 font-bold">
                  <span className="p-1 rounded bg-indigo-950 text-[#06fa9d] font-mono text-[9px] uppercase">HINT</span>
                  <span>신전 소량 자릿수 보정법 :</span>
                </div>
                <div className="space-y-1.5 text-slate-400">
                  {activeQuestion.type === 'COMMON' ? (
                    <p>나누는 수 '<strong className="text-yellow-400">{activeQuestion.divisor}</strong>'가 이미 자연수이므로 자릿수 이동 없이, 기존 {activeQuestion.dividend.replace('.', '')} ÷ {activeQuestion.divisor} 의 비례를 맞춰 소수점을 그 자리에 그대로 배치하세요.</p>
                  ) : (
                    <p>나누는 수 '<strong className="text-yellow-400">{activeQuestion.divisor}</strong>'를 자연수로 제작하기 위해 <strong>오른쪽으로 {activeQuestion.explanationSteps.shiftAmount}칸</strong> 이동합니다. 이에 대응하여 나누어지는 수 '<strong className="text-indigo-300">{activeQuestion.dividend}</strong>'도 똑같이 <strong>오른쪽으로 {activeQuestion.explanationSteps.shiftAmount}칸</strong> 이동하게 되어 <strong className="text-white">"{activeQuestion.explanationSteps.dividendShifted} ÷ {activeQuestion.explanationSteps.divisorShifted}"</strong> 골격을 연성하십시오!</p>
                  )}
                </div>
              </div>

            </div>

            {/* 3. FOUR POSE CARDS MATCHING MULTIPLE CHOICES (KEYBOARD INTERACTION TRIGGERS) */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-bold text-slate-400 font-mono flex items-center gap-1.5 uppercase tracking-widest">
                  <MoveUp className="w-4 h-4 text-cyan-400" />
                  동작 전동 매핑 타격 보드
                </h3>
                <span className="text-[10px] text-amber-500 font-bold bg-amber-950/20 px-2 py-0.5 rounded border border-amber-900/60 font-mono">
                  동작을 1.5초 유지하면 즉각 마법이 타격됩니다!
                </span>
              </div>

              <div id="pose-action-deck" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {shuffledChoices.map((choice, index) => {
                  const spec = POSES[choice.pose];
                  const isActive = playerPose === choice.pose;
                  return (
                    <button
                      key={choice.pose}
                      onClick={() => handleQuickClick(choice.value, choice.pose)}
                      className={`p-4 rounded-2xl border text-left cursor-pointer relative overflow-hidden transition-all duration-300 group ${
                        isActive 
                        ? 'border-[#06fa9d] bg-emerald-950/20 shadow-lg shadow-emerald-500/10 scale-103' 
                        : 'border-indigo-950 bg-slate-900/40 hover:border-slate-800'
                      }`}
                    >
                      {/* Interactive focus status bar */}
                      <div className={`absolute top-0 inset-x-0 h-[3px] transition-all ${
                        isActive ? 'bg-[#06fa9d]' : 'bg-transparent'
                      }`}></div>

                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-900">
                          신호 {spec.signal} / [키 {spec.signal + 1}]
                        </span>
                      </div>

                      <div className="text-lg font-black font-mono text-slate-100 group-hover:text-emerald-300 transition-colors">
                        {choice.value}
                      </div>

                      <div className="mt-2">
                        <span className="text-xs font-bold block text-slate-300">{spec.name}</span>
                        <span className="text-[10px] text-slate-400 block font-mono mt-0.5 truncate">{spec.skillName}</span>
                      </div>

                      {/* Hot simulation feedback status */}
                      {isActive && (
                        <div className="absolute right-2 bottom-2 bg-emerald-900 text-[8px] font-mono text-emerald-300 px-1.5 py-0.5 rounded animate-pulse">
                          캐스팅 활성
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Quick simulation manual override banner */}
              <div className="mt-4 bg-[#091124] border border-indigo-950/60 p-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-[#06fa9d]" />
                  <span>카메라 장비 없이 테스트하려면 정답 보기를 <strong>직접 클릭</strong>하거나 <strong>키보드 숫자(1~4)</strong>를 누르세요!</span>
                </span>
                <div className="flex gap-2">
                  {Object.values(POSES).map(p => (
                    <button
                      key={p.id}
                      onClick={() => runSignalInput(p.signal)}
                      className="px-2.5 py-1 text-[10px] font-mono bg-slate-950 border border-indigo-950 text-slate-300 rounded hover:text-white transition-all cursor-pointer"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </section>

          {/* RIGHT CONTAINER: SERIAL FEEDBACKS & MONSTER JOURNAL (LG: 4 cols) */}
          <section className="lg:col-span-4 flex flex-col gap-6">
            
            {/* 1. JIKKOCAM NEON VIRTUAL FEEDBACK SKELETON */}
            <div className="rounded-2xl border border-indigo-950 bg-gradient-to-b from-[#080d1a] to-[#040810] p-4 flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-indigo-950 mb-3">
                <h3 className="text-xs font-bold text-slate-300 font-mono tracking-widest flex items-center gap-1.5 uppercase">
                  <Camera className="w-4 h-4 text-[#06fa9d]" />
                  지코캠 포즈 스켈레톤 HUD
                </h3>
                <span className="text-[10px] bg-indigo-950 text-indigo-400 px-2 py-0.5 rounded font-mono">
                  Live Vector
                </span>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-indigo-950 flex items-center justify-center bg-slate-950">
                <canvas 
                  ref={canvasRef} 
                  width={290} 
                  height={220}
                  className="w-full h-auto aspect-video rounded-xl"
                />
                
                {/* Simulated frame parameters overlay */}
                <div className="absolute top-2 right-2 bg-slate-950/85 px-1.5 py-0.5 rounded text-[8px] text-indigo-400 font-mono flex items-center gap-1">
                  <span>REFRESH: 58FPS</span>
                </div>
              </div>

              <div className="mt-3 text-[10px] text-slate-400 leading-relaxed font-mono flex justify-between items-center bg-[#050912] p-2 rounded border border-indigo-950/80">
                <span>지코캠 하드웨어 수신 상태:</span>
                <span className={`font-bold ${serialConnected ? 'text-[#06fa9d]' : 'text-amber-400'}`}>
                  {serialConnected ? `ACTIVE (수신: ${lastReceivedSignal})` : '대기 (키보드 1~4 구동 가능)'}
                </span>
              </div>
            </div>

            {/* 2. LIVE BATTLE LOG SYSTEM */}
            <div className="rounded-2xl border border-indigo-950 bg-slate-950/50 p-4 flex-1 flex flex-col min-h-[220px]">
              <div className="flex items-center justify-between pb-2 border-b border-indigo-950 mb-3 text-xs">
                <span className="font-bold text-slate-300 font-mono uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  실시간 전장 로깅
                </span>
                <span className="text-[9px] text-[#06fa9d] font-mono">CALORIES: {kcal} kcal</span>
              </div>

              <div id="combat-history-box" className="flex-1 overflow-y-auto max-h-[240px] text-[11px] font-mono leading-relaxed space-y-2.5 pr-1">
                {combatLogs.map((log, index) => (
                  <div key={index} className="p-2 rounded bg-indigo-950/20 border-l-2 border-indigo-500 text-slate-300">
                    <span className="text-slate-500 block text-[9px] mb-0.5">[{new Date().toLocaleTimeString()}]</span>
                    {log}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action options */}
            <button
              onClick={() => {
                audio.playClick();
                setGameState('REVIEW');
                setHologramPlayStep(1);
              }}
              className="py-3 px-4 rounded-xl border border-amber-900/60 bg-amber-950/20 hover:bg-amber-950/40 text-xs font-bold text-amber-400 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>오답 리뷰 & 홀로그램 가이드 ({mistakes.length}개)</span>
            </button>

          </section>

        </main>
      )}

      {/* --- MISTAKE REVIEW SYSTEM: HOLOGRAM CHART GUIDE (소수점 이동 홀로그램 가이드) --- */}
      {gameState === 'REVIEW' && (
        <main id="review-screen" className="max-w-4xl mx-auto px-6 py-10 animate-fade-in">
          <div className="border border-indigo-950 bg-gradient-to-b from-[#0b1224] to-[#040810] rounded-3xl p-6 md:p-8 shadow-2xl relative">
            
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>

            <div className="flex items-center justify-between border-b border-indigo-950 pb-5 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-100 font-mono flex items-center gap-2">
                    소수점 디렉션 홀로그램 피드백 오답노트
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">자주 틀리는 소수점 위상 자릿수 연산 원리를 인터랙티브 그래픽으로 교정하십시오.</p>
                </div>
              </div>
              <button
                onClick={() => {
                  audio.playClick();
                  setGameState('PLAY');
                  loadQuestionForStage(overallStage);
                }}
                className="px-4 py-2.5 bg-slate-900 border border-slate-700 hover:bg-slate-800 rounded-xl text-xs font-bold cursor-pointer text-slate-300"
              >
                전투 복귀 ⚔️
              </button>
            </div>

            {mistakes.length === 0 ? (
              <div className="text-center py-16 text-slate-400 font-mono space-y-3">
                <div className="text-5xl">🏆</div>
                <h3 className="text-lg font-bold text-slate-200">완전 무결점 돌도 수호</h3>
                <p className="text-xs max-w-sm mx-auto leading-relaxed text-indigo-400">오답이 발생하지 않았습니다! 완벽한 소수 연동으로 신전 마법 장벽을 견고하게 유지하고 있습니다.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Left Mistakes index tab (4 cols) */}
                <div className="md:col-span-4 space-y-3 max-h-[350px] overflow-y-auto">
                  <span className="text-[10px] text-slate-500 font-mono block uppercase tracking-wider">Mistakes Catalog</span>
                  {mistakes.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        audio.playClick();
                        setCurrentReviewIndex(idx);
                        setHologramPlayStep(1);
                      }}
                      className={`w-full p-3.5 rounded-xl text-left border cursor-pointer transition-all ${
                        currentReviewIndex === idx 
                        ? 'bg-cyan-950/30 border-cyan-500 text-slate-100' 
                        : 'bg-slate-950/40 border-indigo-950 text-slate-400 hover:bg-slate-950/70'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] mb-1 font-mono">
                        <span className="text-indigo-400">PROBLEM {idx + 1}</span>
                        <span className="text-rose-400 uppercase">{q.type}</span>
                      </div>
                      <div className="text-sm font-black font-mono">{q.question}</div>
                    </button>
                  ))}
                </div>

                {/* Right Interactive Holographic Shift Diagram (8 cols) */}
                <div className="md:col-span-8 bg-[#040810] border border-indigo-950 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center pb-2.5 border-b border-indigo-950 mb-4">
                      <span className="text-[10px] text-cyan-400 font-mono font-bold tracking-widest uppercase flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                        INTERACTIVE HOLOGRAM DECODER
                      </span>
                      <div className="flex gap-1.5">
                        <button 
                          onClick={() => { audio.playClick(); setHologramPlayStep(1); }}
                          className={`text-[9px] px-2.5 py-1 rounded font-mono cursor-pointer transition-all ${
                            hologramPlayStep === 1 ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-900 text-slate-400 border border-indigo-950'
                          }`}
                        >
                          Step 1
                        </button>
                        <button 
                          onClick={() => { audio.playClick(); setHologramPlayStep(2); }}
                          className={`text-[9px] px-2.5 py-1 rounded font-mono cursor-pointer transition-all ${
                            hologramPlayStep === 2 ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-900 text-slate-400 border border-indigo-950'
                          }`}
                        >
                          Step 2 (이동)
                        </button>
                        <button 
                          onClick={() => { audio.playClick(); setHologramPlayStep(3); }}
                          className={`text-[9px] px-2.5 py-1 rounded font-mono cursor-pointer transition-all ${
                            hologramPlayStep === 3 ? 'bg-[#06fa9d] text-[#060a13] font-bold' : 'bg-slate-900 text-slate-400 border border-indigo-950'
                          }`}
                        >
                          Step 3 (정답)
                        </button>
                      </div>
                    </div>

                    {/* Hologram Box Visual Rendering */}
                    <div className="bg-[#050a14] border border-cyan-950/60 p-6 rounded-xl relative overflow-hidden flex flex-col justify-center min-h-[160px] text-center">
                      <div className="absolute top-1 left-2 font-mono text-[8px] text-cyan-500/80">GRID: 10-SCALE EQUALIZER</div>
                      
                      {/* DYNAMIC STEPS RENDERING */}
                      {hologramPlayStep === 1 && (
                        <div>
                          <p className="text-[10px] text-slate-400 font-mono uppercase mb-4 tracking-widest">초기 상태 식 배열</p>
                          <div className="inline-flex items-center gap-2.5 text-2xl font-black font-mono">
                            <span className="text-indigo-300 bg-indigo-950/30 px-3 py-1.5 rounded-lg border border-indigo-900">
                              {mistakes[currentReviewIndex].dividend}
                            </span>
                            <span className="text-slate-500">÷</span>
                            <span className="text-yellow-400 bg-yellow-950/20 px-3 py-1.5 rounded-lg border border-yellow-900">
                              {mistakes[currentReviewIndex].divisor}
                            </span>
                          </div>
                          <p className="text-xs text-[#94a3b8] mt-4 font-sans leading-relaxed">
                            나누는 수인 수식을 자연수로 통일시키기 위해 소수점을 이동 연행해야 합니다.
                          </p>
                        </div>
                      )}

                      {hologramPlayStep === 2 && (
                        <div>
                          <p className="text-[10px] text-cyan-400 font-mono uppercase mb-4 tracking-widest flex items-center justify-center gap-1">
                            소수점 부동 자릿수 이동 완료 
                            <MoveRight className="w-3.5 h-3.5 animate-bounce" />
                          </p>
                          <div className="inline-flex items-center gap-2.5 text-2xl font-black font-mono">
                            <span className="text-indigo-300 bg-indigo-950/40 px-3 py-1.5 rounded-lg border border-[#06fa9d]/40 relative">
                              {mistakes[currentReviewIndex].explanationSteps.dividendShifted}
                              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] text-[#06fa9d] font-mono">
                                {mistakes[currentReviewIndex].explanationSteps.shiftAmount}칸 우측 ✈️
                              </span>
                            </span>
                            <span className="text-slate-500">÷</span>
                            <span className="text-yellow-400 bg-yellow-950/20 px-3 py-1.5 rounded-lg border border-[#06fa9d]/40 relative">
                              {mistakes[currentReviewIndex].explanationSteps.divisorShifted}
                              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] text-[#06fa9d] font-mono">
                                {mistakes[currentReviewIndex].explanationSteps.shiftAmount}칸 우측 ✈️
                              </span>
                            </span>
                          </div>
                          <p className="text-[11px] text-[#06fa9d] mt-7 font-sans leading-relaxed pl-1">
                            나누는 수와 나누어지는 수의 위상을 동일하게 <strong className="text-white">{mistakes[currentReviewIndex].explanationSteps.shiftAmount}칸</strong> 평행 이동하여 <strong className="text-white">{mistakes[currentReviewIndex].explanationSteps.dividendShifted} ÷ {mistakes[currentReviewIndex].explanationSteps.divisorShifted}</strong> 로 안전하게 구축되었습니다.
                          </p>
                        </div>
                      )}

                      {hologramPlayStep === 3 && (
                        <div>
                          <p className="text-[10px] text-emerald-400 font-mono uppercase mb-4 tracking-widest">정밀 나눗셈 몫 계산 완료</p>
                          <div className="inline-flex items-center gap-3.5 text-2xl font-black font-mono">
                            <span className="text-slate-300">
                              {mistakes[currentReviewIndex].explanationSteps.dividendShifted} ÷ {mistakes[currentReviewIndex].explanationSteps.divisorShifted}
                            </span>
                            <span className="text-slate-500">=</span>
                            <span className="text-[#06fa9d] bg-cyan-950/40 px-4 py-2 rounded-xl border border-[#06fa9d] shadow-md shadow-[#06fa9d]/15 scale-105">
                              {mistakes[currentReviewIndex].correctAnswer}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-5 leading-relaxed font-sans max-w-md mx-auto">
                            소수점 연산은 언제나 나누는 수가 자연수가 되는 것을 일차적 목적으로 설계되어 있습니다. 학생 자릿점 함정을 유도하는 우회 오답에 속지 않고 올바른 소수 몫의 주파수를 타격하세요!
                          </p>
                        </div>
                      )}

                    </div>

                    {/* Step description */}
                    <div className="bg-[#0b1324] border border-indigo-950 p-4 rounded-xl text-xs space-y-1.5 mt-5">
                      <span className="font-bold text-indigo-300 block">설명 요약 :</span>
                      <p className="text-slate-400 font-sans leading-relaxed">
                        - {mistakes[currentReviewIndex].explanationSteps.step1Inverse}<br />
                        - {mistakes[currentReviewIndex].explanationSteps.step2Move}<br />
                        - {mistakes[currentReviewIndex].explanationSteps.step3Result}
                      </p>
                    </div>

                  </div>

                  <div className="mt-6 pt-4 border-t border-indigo-950 flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-mono">Current Problem: {currentReviewIndex + 1}/{mistakes.length}</span>
                    <button
                      onClick={() => {
                        audio.playClick();
                        setHologramPlayStep(prev => prev === 3 ? 1 : prev + 1);
                      }}
                      className="px-4 py-2 border border-cyan-800 text-cyan-400 hover:bg-cyan-950/20 rounded-xl cursor-pointer text-xs flex items-center gap-1.5 transition-all"
                    >
                      <span>홀로그램 작동 시연</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            )}

            <div className="mt-8 pt-5 border-t border-indigo-950 text-center">
              <button
                onClick={() => {
                  audio.playClick();
                  setGameState('PLAY');
                  loadQuestionForStage(overallStage);
                }}
                className="px-10 py-4 bg-gradient-to-r from-teal-500 to-indigo-600 rounded-xl text-xs font-bold text-white uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer shadow-md shadow-indigo-500/10"
              >
                교정 완료: 전장으로 출정
              </button>
            </div>

          </div>
        </main>
      )}

      {/* --- LEVEL COMPLETE VICTORY STATE --- */}
      {gameState === 'VICTORY' && (
        <main id="victory-screen" className="max-w-xl mx-auto px-6 py-16 animate-fade-in text-center">
          <div className="border border-indigo-950 bg-gradient-to-b from-[#11241a] to-[#040810] rounded-3xl p-8 md:p-10 shadow-2xl relative">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#06fa9d] to-transparent"></div>

            <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-[#06fa9d] to-teal-500 shadow-lg shadow-[#06fa9d]/20 flex items-center justify-center mb-6">
              <Trophy className="w-12 h-12 text-[#060a13]" />
            </div>

            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-[#06fa9d] tracking-widest font-mono">
              수수 대전 정화 완수 !
            </h2>
            <p className="text-xs text-slate-400 mt-2 font-mono uppercase tracking-widest">
              Temple of the Ether Core Sanctified
            </p>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm mx-auto mt-6">
              모든 소수 자릿수 왜곡 몬스터가 소멸되었습니다! 고대 마도 전력의 에테르 수기가 당신의 인내와 실시간 체력 연동으로 정량 복구되었습니다.
            </p>

            {/* EXP AND KCAL REWARDS BOARD */}
            <div className="grid grid-cols-2 gap-4 my-8 bg-[#040810] border border-indigo-950 p-4 rounded-2xl font-mono text-left">
              <div>
                <span className="text-[10px] text-slate-500 block">TOTAL EXP EARNED</span>
                <span className="text-lg font-black text-[#06fa9d] flex items-center gap-1 mt-1">
                  +{exp} <span className="text-[10px] text-slate-400">포인트</span>
                </span>
              </div>
              <div className="border-l border-indigo-950 pl-4">
                <span className="text-[10px] text-slate-500 block">ESTIMATED METRIC ENERGY</span>
                <span className="text-lg font-black text-rose-500 flex items-center gap-1 mt-1">
                  +{kcal.toFixed(2)} <span className="text-[10px] text-slate-400">kcal</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={startEpicGame}
                className="flex-1 py-4 bg-gradient-to-r from-[#06fa9d] to-teal-500 text-slate-950 font-extrabold text-xs tracking-wider rounded-xl hover:opacity-95 transition-all cursor-pointer uppercase shadow"
              >
                한번 더 정화하기
              </button>
              <button
                onClick={() => {
                  audio.playClick();
                  setGameState('INTRO');
                }}
                className="flex-1 py-4 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                메인 게이트로
              </button>
            </div>
          </div>
        </main>
      )}

      {/* --- RETRO GAME OVER BOARD --- */}
      {gameState === 'GAMEOVER' && (
        <main id="gameover-screen" className="max-w-xl mx-auto px-6 py-16 animate-fade-in text-center">
          <div className="border border-indigo-950 bg-gradient-to-b from-[#241113] to-[#040810] rounded-3xl p-8 md:p-10 shadow-2xl relative">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent"></div>

            <div className="mx-auto w-21 h-21 rounded-full bg-gradient-to-br from-rose-500 to-red-700 shadow-lg shadow-rose-500/20 flex items-center justify-center mb-6">
              <AlertCircle className="w-11 h-11 text-white" />
            </div>

            <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-rose-400 mb-2 font-mono tracking-wide uppercase">
              에테르 폭주: 장벽 분쇄
            </h2>
            <p className="text-xs text-rose-400 font-mono tracking-widest uppercase">
              Core Desynchronized
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto mt-4">
              왜곡 파동으로 인해 수호 전사의 생명력이 유실되었고 마도 동기화 비율이 0%로 추落했습니다.
            </p>

            <div className="my-6 bg-[#040810] border border-indigo-950 p-4 rounded-xl text-xs space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">누적된 오답 수식 개수:</span>
                <span className="text-amber-400 font-bold font-mono">{mistakes.length} 문항</span>
              </div>
              <p className="text-[11px] text-slate-400 text-left mt-2 border-t border-indigo-950/40 pt-2 font-sans leading-relaxed text-center">
                💡 실망하지 마세요! 오답 노트를 활용해 자릿수가 밀려나는 화살표 방향을 확인하시는 게 교정에 극히 유리합니다.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={startEpicGame}
                className="flex-1 py-3.5 bg-gradient-to-r from-rose-500 to-red-600 text-white font-extrabold text-xs tracking-wider rounded-xl hover:opacity-95 transition-all cursor-pointer uppercase shadow-lg shadow-rose-500/10"
              >
                포탈 재탑승 (재도전)
              </button>
              <button
                onClick={() => {
                  audio.playClick();
                  setGameState('REVIEW');
                  setHologramPlayStep(1);
                }}
                className="flex-1 py-3.5 bg-amber-950/40 border border-amber-900/60 text-amber-400 font-bold text-xs rounded-xl hover:bg-amber-950/60 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-4 h-4" />
                <span>틀린 문제 검수</span>
              </button>
            </div>
          </div>
        </main>
      )}

      {/* FOOTER */}
      <footer id="app-footer" className="border-t border-indigo-950 bg-[#04080f] py-5 text-center text-[10px] text-slate-600 font-mono mt-12 relative z-10">
        <p>© 2026 고대 신전: 에테르 코어의 수호자. Realtime Web Serial Port Interceptor. All rights reserved.</p>
      </footer>
    </div>
  );
}
