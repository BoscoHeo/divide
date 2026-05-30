// mathPool.ts
// Beautiful, educational pool of exactly 100 decimal division questions.
// Divided into COMMON, ELITE, and BOSS, designed for kids to solve under 20 seconds.

export interface MathQuestion {
  question: string;
  dividend: string; // Left hand
  divisor: string;  // Right hand
  correctAnswer: number;
  choices: number[];
  type: 'COMMON' | 'ELITE' | 'BOSS';
  explanationSteps: {
    step1Inverse: string; // Explanation of scale
    step2Move: string;    // Explanation of decimal movement
    step3Result: string;  // Result explanation
    dividendOriginal: string;
    divisorOriginal: string;
    dividendShifted: string;
    divisorShifted: string;
    shiftAmount: number;
  };
}

export const MATH_POOL: Record<'COMMON' | 'ELITE' | 'BOSS', MathQuestion[]> = {
  COMMON: [
    {
      question: "2.4 ÷ 4",
      dividend: "2.4",
      divisor: "4",
      correctAnswer: 0.6,
      choices: [0.6, 6, 0.06, 60],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "나누는 수(4)가 이미 자연수이므로 자릿수를 움직이지 않습니다.",
        step2Move: "나누어지는 소수의 소수점 위치를 그대로 몫의 윗자리로 올려 콕 찍어줍니다.",
        step3Result: "24 ÷ 4 = 6 이고, 소수점 위치를 그대로 올리면 0.6이 결성됩니다.",
        dividendOriginal: "2.4",
        divisorOriginal: "4",
        dividendShifted: "2.4",
        divisorShifted: "4",
        shiftAmount: 0
      }
    },
    {
      question: "0.8 ÷ 2",
      dividend: "0.8",
      divisor: "2",
      correctAnswer: 0.4,
      choices: [0.4, 4, 0.04, 40],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "나누는 정수(2)는 완벽한 자연수 상태입니다.",
        step2Move: "0.8의 소수 첫째 자리를 겨냥하여 소수점을 수직으로 올려 찍습니다.",
        step3Result: "8 ÷ 2 = 4 이므로 몫의 위치에 맞게 0.4가 도출됩니다.",
        dividendOriginal: "0.8",
        divisorOriginal: "2",
        dividendShifted: "0.8",
        divisorShifted: "2",
        shiftAmount: 0
      }
    },
    {
      question: "3.6 ÷ 9",
      dividend: "3.6",
      divisor: "9",
      correctAnswer: 0.4,
      choices: [0.4, 4, 0.04, 40],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "나누는 수 9는 이미 완성된 자연수입니다.",
        step2Move: "3.6의 소수점 자리를 지키며 그대로 위로 올려 정렬시킵니다.",
        step3Result: "36 ÷ 9 = 4에서 영력을 보조하여 0.4가 최종 해부됩니다.",
        dividendOriginal: "3.6",
        divisorOriginal: "9",
        dividendShifted: "3.6",
        divisorShifted: "9",
        shiftAmount: 0
      }
    },
    {
      question: "4.2 ÷ 6",
      dividend: "4.2",
      divisor: "6",
      correctAnswer: 0.7,
      choices: [0.7, 7, 0.07, 70],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "나누는 자연수 6이므로 따로 소수점을 비행시키지 않습니다.",
        step2Move: "일의 자리에 들어가지 못하므로 0을 쓰고 소수점을 그대로 올립니다.",
        step3Result: "42 ÷ 6 = 7이므로 소수점을 반영해 0.7이 복구됩니다.",
        dividendOriginal: "4.2",
        divisorOriginal: "6",
        dividendShifted: "4.2",
        divisorShifted: "6",
        shiftAmount: 0
      }
    },
    {
      question: "5.6 ÷ 8",
      dividend: "5.6",
      divisor: "8",
      correctAnswer: 0.7,
      choices: [0.7, 7, 0.07, 70],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "나누는 정수 8을 기준으로 곧장 계산에 착수합니다.",
        step2Move: "소수의 소수점을 일직선상 상층부로 인상합니다.",
        step3Result: "56 ÷ 8 = 7 법칙에 맞물려 마력 수치 0.7이 확정됩니다.",
        dividendOriginal: "5.6",
        divisorOriginal: "8",
        dividendShifted: "5.6",
        divisorShifted: "8",
        shiftAmount: 0
      }
    },
    {
      question: "1.5 ÷ 3",
      dividend: "1.5",
      divisor: "3",
      correctAnswer: 0.5,
      choices: [0.5, 5, 0.05, 50],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "나누는 수가 3으로 소수점 이동이 불요합니다.",
        step2Move: "정수부인 1에 3이 나누어지지 않으므로 0을 쓰고 소수점을 올립니다.",
        step3Result: "15 ÷ 3 = 5 이므로 알맞은 자릿수 몫 0.5가 성립됩니다.",
        dividendOriginal: "1.5",
        divisorOriginal: "3",
        dividendShifted: "1.5",
        divisorShifted: "3",
        shiftAmount: 0
      }
    },
    {
      question: "0.64 ÷ 8",
      dividend: "0.64",
      divisor: "8",
      correctAnswer: 0.08,
      choices: [0.08, 0.8, 8, 80],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "나누는 자연수 8이므로 소수점의 좌우 이동은 없습니다.",
        step2Move: " 소수 첫째 자리에 8이 들어가지 않으므로 0을 한 번 더 채우고 올립니다.",
        step3Result: "64 ÷ 8 = 8이므로 자릿수를 촘촘히 메워 0.08이 발성됩니다.",
        dividendOriginal: "0.64",
        divisorOriginal: "8",
        dividendShifted: "0.64",
        divisorShifted: "8",
        shiftAmount: 0
      }
    },
    {
      question: "7.2 ÷ 12",
      dividend: "7.2",
      divisor: "12",
      correctAnswer: 0.6,
      choices: [0.6, 6, 0.06, 60],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "두 자릿수 자연수 12로 7.2를 관통 전수합니다.",
        step2Move: "몫의 소수점 자리를 일련 정합하여 곧장 올려 찍어줍니다.",
        step3Result: "72 ÷ 12 = 6 이므로 적절히 정밀 수리된 0.6이 연성 완료됩니다.",
        dividendOriginal: "7.2",
        divisorOriginal: "12",
        dividendShifted: "7.2",
        divisorShifted: "12",
        shiftAmount: 0
      }
    },
    {
      question: "9.1 ÷ 7",
      dividend: "9.1",
      divisor: "7",
      correctAnswer: 1.3,
      choices: [1.3, 13, 0.13, 130],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "자연수 7이므로 자릿수 흔들림이 전혀 없습니다.",
        step2Move: "9에 7이 한 번 들어가고 소수 첫째 자리로 이동하게 됩니다.",
        step3Result: "91 ÷ 7 = 13 원리의 자리를 그대로 맞추어 1.3이 도정됩니다.",
        dividendOriginal: "9.1",
        divisorOriginal: "7",
        dividendShifted: "9.1",
        divisorShifted: "7",
        shiftAmount: 0
      }
    },
    {
      question: "8.4 ÷ 4",
      dividend: "8.4",
      divisor: "4",
      correctAnswer: 2.1,
      choices: [2.1, 21, 0.21, 210],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "자연수 4로 나뉘어지므로 바로 수식을 기동합니다.",
        step2Move: "8.4의 소수점을 정확히 위에 한 치 오차 없이 올려 찍습니다.",
        step3Result: "8 ÷ 4 = 2 이고 4 ÷ 4 = 1 이며 이를 연결해 2.1이 기명됩니다.",
        dividendOriginal: "8.4",
        divisorOriginal: "4",
        dividendShifted: "8.4",
        divisorShifted: "4",
        shiftAmount: 0
      }
    },
    {
      question: "1.44 ÷ 12",
      dividend: "1.44",
      divisor: "12",
      correctAnswer: 0.12,
      choices: [0.12, 1.2, 12, 0.012],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "나누는 수 12 상태에서 변치 않는 계율을 형성합니다.",
        step2Move: "몫의 0. 까지 촘촘히 채우고 둘째 자리 소수 전송을 마칩니다.",
        step3Result: "144 ÷ 12 = 12 이므로 지수 정합을 맞추어 0.12로 캐스팅됩니다.",
        dividendOriginal: "1.44",
        divisorOriginal: "12",
        dividendShifted: "1.44",
        divisorShifted: "12",
        shiftAmount: 0
      }
    },
    {
      question: "0.25 ÷ 5",
      dividend: "0.25",
      divisor: "5",
      correctAnswer: 0.05,
      choices: [0.05, 0.5, 5, 50],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "나누는 자연수 5 상태를 온전히 수용합니다.",
        step2Move: "소수 첫째 자리에 5가 나뉘지 않으므로 그 자리에 0을 기입하고 소수 좌표를 밀어 올립니다.",
        step3Result: "25 ÷ 5 = 5 이고 적격 소수 배치로 0.05가 완전 충전됩니다.",
        dividendOriginal: "0.25",
        divisorOriginal: "5",
        dividendShifted: "0.25",
        divisorShifted: "5",
        shiftAmount: 0
      }
    },
    {
      question: "4.8 ÷ 8",
      dividend: "4.8",
      divisor: "8",
      correctAnswer: 0.6,
      choices: [0.6, 6, 0.06, 60],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "안전하게 정수 8로 통제하는 기초 제단 수식입니다.",
        step2Move: "정수 첫 자리가 비므로 영(0)을 배치한 후 소수점을 띄웁니다.",
        step3Result: "48 ÷ 8 = 6 의 산식 관계에 맞춰 0.6 수치가 안정 완성됩니다.",
        dividendOriginal: "4.8",
        divisorOriginal: "8",
        dividendShifted: "4.8",
        divisorShifted: "8",
        shiftAmount: 0
      }
    },
    {
      question: "6.3 ÷ 7",
      dividend: "6.3",
      divisor: "7",
      correctAnswer: 0.9,
      choices: [0.9, 9, 0.09, 90],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "나누는 자연수 7에 맞춰 기도를 펼칩니다.",
        step2Move: "6에는 7이 포함되지 못하므로 0을 세워 소수점을 올립니다.",
        step3Result: "63 ÷ 7 = 9 원리에 따라 오염 없는 0.9가 환원 도출됩니다.",
        dividendOriginal: "6.3",
        divisorOriginal: "7",
        dividendShifted: "6.3",
        divisorShifted: "7",
        shiftAmount: 0
      }
    },
    {
      question: "10.5 ÷ 5",
      dividend: "10.5",
      divisor: "5",
      correctAnswer: 2.1,
      choices: [2.1, 21, 0.21, 210],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "나누는 정수 5로 10.5의 결계를 공략합니다.",
        step2Move: "10을 5로 나누어 2를 획득하고 이어서 소숫점 뒤 5를 5로 나눕니다.",
        step3Result: "105 ÷ 5 = 21 관계에 의해 몫 2.1이 정확히 상정됩니다.",
        dividendOriginal: "10.5",
        divisorOriginal: "5",
        dividendShifted: "10.5",
        divisorShifted: "5",
        shiftAmount: 0
      }
    },
    {
      question: "1.2 ÷ 3",
      dividend: "1.2",
      divisor: "3",
      correctAnswer: 0.4,
      choices: [0.4, 4, 0.04, 40],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "나누는 수 3이 자연수이므로 자릿수 이동이 발생하지 않습니다.",
        step2Move: "정수 1에 3이 들어가지 못하므로 0. 을 먼저 배치해 둡니다.",
        step3Result: "12 ÷ 3 = 4 이므로 소수 첫째 자리를 지켜 0.4가 융합됩니다.",
        dividendOriginal: "1.2",
        divisorOriginal: "3",
        dividendShifted: "1.2",
        divisorShifted: "3",
        shiftAmount: 0
      }
    },
    {
      question: "1.8 ÷ 2",
      dividend: "1.8",
      divisor: "2",
      correctAnswer: 0.9,
      choices: [0.9, 9, 0.09, 90],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "자연수 2로 나누므로 바로 기도를 시작할 수 있습니다.",
        step2Move: "1에는 2가 나누어 떨어지지 않으므로 0을 쓰고 소수점을 올립니다.",
        step3Result: "18 ÷ 2 = 9 수식을 기반으로 몫 0.9가 구현됩니다.",
        dividendOriginal: "1.8",
        divisorOriginal: "2",
        dividendShifted: "1.8",
        divisorShifted: "2",
        shiftAmount: 0
      }
    },
    {
      question: "3.2 ÷ 8",
      dividend: "3.2",
      divisor: "8",
      correctAnswer: 0.4,
      choices: [0.4, 4, 0.04, 40],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "나누는 수 8을 향한 다이렉트 투사 단계입니다.",
        step2Move: "3.2의 소수점을 보존한 채로 윗눈금으로 이동시킵니다.",
        step3Result: "32 ÷ 8 = 4이므로, 소수 정밀 치수 0.4가 도출됩니다.",
        dividendOriginal: "3.2",
        divisorOriginal: "8",
        dividendShifted: "3.2",
        divisorShifted: "8",
        shiftAmount: 0
      }
    },
    {
      question: "0.45 ÷ 9",
      dividend: "0.45",
      divisor: "9",
      correctAnswer: 0.05,
      choices: [0.05, 0.5, 5, 50],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "나누는 수가 9로 자연수 상태여서 안전합니다.",
        step2Move: "정수 일의 자리와 소수 첫째 자리까지 0을 연달아 작성하고 올려찍습니다.",
        step3Result: "45 ÷ 9 = 5 이므로 몫 자리를 수호하여 0.05가 됩니다.",
        dividendOriginal: "0.45",
        divisorOriginal: "9",
        dividendShifted: "0.45",
        divisorShifted: "9",
        shiftAmount: 0
      }
    },
    {
      question: "0.16 ÷ 4",
      dividend: "0.16",
      divisor: "4",
      correctAnswer: 0.04,
      choices: [0.04, 0.4, 4, 40],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "나누는 수 4를 수직 정렬하여 가동시킵니다.",
        step2Move: "소수 첫째 자리에 4가 나뉘어 들어가지 않아 0을 하나 채우고 보존합니다.",
        step3Result: "16 ÷ 4 = 4 로서 마법 융합에 의해 0.04이 완수됩니다.",
        dividendOriginal: "0.16",
        divisorOriginal: "4",
        dividendShifted: "0.16",
        divisorShifted: "4",
        shiftAmount: 0
      }
    },
    {
      question: "2.7 ÷ 3",
      dividend: "2.7",
      divisor: "3",
      correctAnswer: 0.9,
      choices: [0.9, 9, 0.09, 90],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "자연수 3에 완벽 정조준하는 수식입니다.",
        step2Move: "정수 파트의 소수 도약을 위해 일직선상으로 소수점을 콕 찍습니다.",
        step3Result: "27 ÷ 3 = 9 이므로 몫 소천 좌표 0.9가 복귀됩니다.",
        dividendOriginal: "2.7",
        divisorOriginal: "3",
        dividendShifted: "2.7",
        divisorShifted: "3",
        shiftAmount: 0
      }
    },
    {
      question: "4.9 ÷ 7",
      dividend: "4.9",
      divisor: "7",
      correctAnswer: 0.7,
      choices: [0.7, 7, 0.07, 70],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "나누는 기초 수 7에 맞춰 기도를 봉전합니다.",
        step2Move: "4 에는 들어갈 수 없어 정수부 밑바닥 0을 채우고 소수점을 인상합니다.",
        step3Result: "49 ÷ 7 = 7 에 물려서 오차 없는 0.7이 복색 연성됩니다.",
        dividendOriginal: "4.9",
        divisorOriginal: "7",
        dividendShifted: "4.9",
        divisorShifted: "7",
        shiftAmount: 0
      }
    },
    {
      question: "0.36 ÷ 6",
      dividend: "0.36",
      divisor: "6",
      correctAnswer: 0.06,
      choices: [0.06, 0.6, 6, 60],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "자연수 6 상태에서 공격 전선에 대기합니다.",
        step2Move: "0.36의 소수 첫째 자리에 6이 들어가지 않으니 0.0 을 순차 기재합니다.",
        step3Result: "36 ÷ 6 = 6 수리 법칙에 맞춰 0.06이 안전 배정됩니다.",
        dividendOriginal: "0.36",
        divisorOriginal: "6",
        dividendShifted: "0.36",
        divisorShifted: "6",
        shiftAmount: 0
      }
    },
    {
      question: "0.12 ÷ 2",
      dividend: "0.12",
      divisor: "2",
      correctAnswer: 0.06,
      choices: [0.06, 0.6, 6, 60],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "기준이 정수 2이므로 자릿수를 그대로 정위 수호합니다.",
        step2Move: "소수 첫째 위상에 나누어 도달하지 않아 0.0 형태로 인장 전송을 마칩니다.",
        step3Result: "12 ÷ 2 = 6 이므로 적격 자릿수 몫 0.06이 성립 완료됩니다.",
        dividendOriginal: "0.12",
        divisorOriginal: "2",
        dividendShifted: "0.12",
        divisorShifted: "2",
        shiftAmount: 0
      }
    },
    {
      question: "0.28 ÷ 4",
      dividend: "0.28",
      divisor: "4",
      correctAnswer: 0.07,
      choices: [0.07, 0.7, 7, 70],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "자연수 4로 안전하게 수호막을 여는 단계입니다.",
        step2Move: "소수점 위치를 완벽하게 유지하며 소수 첫째 장벽 자리를 0으로 고정합니다.",
        step3Result: "28 ÷ 4 = 7 로직을 대입해 0.07이 복귀 산출됩니다.",
        dividendOriginal: "0.28",
        divisorOriginal: "4",
        dividendShifted: "0.28",
        divisorShifted: "4",
        shiftAmount: 0
      }
    },
    {
      question: "0.54 ÷ 6",
      dividend: "0.54",
      divisor: "6",
      correctAnswer: 0.09,
      choices: [0.09, 0.9, 9, 90],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "기준이 완벽 자연수 6인 쉬운 수학적 조율입니다.",
        step2Move: "일의 자리 비워두고 첫째 소수 자리 비우며 0.0 을 선결 구축합니다.",
        step3Result: "54 ÷ 6 = 9 결과에 기초하여 몫 0.09가 완벽 캐스팅됩니다.",
        dividendOriginal: "0.54",
        divisorOriginal: "6",
        dividendShifted: "0.54",
        divisorShifted: "6",
        shiftAmount: 0
      }
    },
    {
      question: "3.5 ÷ 5",
      dividend: "3.5",
      divisor: "5",
      correctAnswer: 0.7,
      choices: [0.7, 7, 0.07, 70],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "나누는 완벽 정수 5 자리를 그대로 유지합니다.",
        step2Move: "3에 나뉘지 않으므로 0을 앞에 치고 상방 소수점을 올려 배치시킵니다.",
        step3Result: "35 ÷ 5 = 7 이므로 몫 눈금은 명확하게 0.7로 형성됩니다.",
        dividendOriginal: "3.5",
        divisorOriginal: "5",
        dividendShifted: "3.5",
        divisorShifted: "5",
        shiftAmount: 0
      }
    },
    {
      question: "1.6 ÷ 2",
      dividend: "1.6",
      divisor: "2",
      correctAnswer: 0.8,
      choices: [0.8, 8, 0.08, 80],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "정수 2로 나누는 원소 배열 상태입니다.",
        step2Move: "정수부에 들어가지 못하므로 0에서 소수점을 올려 고정해 무기를 수립합니다.",
        step3Result: "16 ÷ 2 = 8이 되어 몫 영핵 0.8이 방출 성공됩니다.",
        dividendOriginal: "1.6",
        divisorOriginal: "2",
        dividendShifted: "1.6",
        divisorShifted: "2",
        shiftAmount: 0
      }
    },
    {
      question: "0.49 ÷ 7",
      dividend: "0.49",
      divisor: "7",
      correctAnswer: 0.07,
      choices: [0.07, 0.7, 7, 70],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "자연정밀수 7로 무장한 에테르 공격입니다.",
        step2Move: "소수 두 칸 눈금을 정돈해 몫 장막 뒤로 소수점을 가속시킵니다.",
        step3Result: "49 ÷ 7 = 7 원리에 입각하여 깨끗이 0.07 이 소환 정리됩니다.",
        dividendOriginal: "0.49",
        divisorOriginal: "7",
        dividendShifted: "0.49",
        divisorShifted: "7",
        shiftAmount: 0
      }
    },
    {
      question: "0.81 ÷ 9",
      dividend: "0.81",
      divisor: "9",
      correctAnswer: 0.09,
      choices: [0.09, 0.9, 9, 90],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "자연 정지수 9를 제단의 주춧돌로 이용합니다.",
        step2Move: "0.8 에 나뉘지 않으므로 자릿 소수를 올려 0.0 영역을 보호합니다.",
        step3Result: "81 ÷ 9 = 9 관계에 맞춰 최종 마력구 0.09가 완벽 생성됩니다.",
        dividendOriginal: "0.81",
        divisorOriginal: "9",
        dividendShifted: "0.81",
        divisorShifted: "9",
        shiftAmount: 0
      }
    },
    {
      question: "1.25 ÷ 5",
      dividend: "1.25",
      divisor: "5",
      correctAnswer: 0.25,
      choices: [0.25, 2.5, 25, 0.025],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "간단한 자연수 5의 나선 구조 식입니다.",
        step2Move: "1에는 나누어지지 않으니 0을 올린 뒤 소숫점 윗 자리를 선점합니다.",
        step3Result: "125 ÷ 5 = 25 인과식에 기초해 대칭 수 0.25가 완성 환원됩니다.",
        dividendOriginal: "1.25",
        divisorOriginal: "5",
        dividendShifted: "1.25",
        divisorShifted: "5",
        shiftAmount: 0
      }
    },
    {
      question: "1.69 ÷ 13",
      dividend: "1.69",
      divisor: "13",
      correctAnswer: 0.13,
      choices: [0.13, 1.3, 13, 0.013],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "자연소 천체 13이 나누는 기준으로 우뚝 서있습니다.",
        step2Move: "소수 두 번째 마당까지 소수점을 인계해 0. 까지 수식을 전진합니다.",
        step3Result: "169 ÷ 13 = 13이 도정 수식으로 대입돼 0.13이 수호됩니다.",
        dividendOriginal: "1.69",
        divisorOriginal: "13",
        dividendShifted: "1.69",
        divisorShifted: "13",
        shiftAmount: 0
      }
    },
    {
      question: "2.25 ÷ 15",
      dividend: "2.25",
      divisor: "15",
      correctAnswer: 0.15,
      choices: [0.15, 1.5, 15, 0.015],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "나누는 수 15는 이미 준비 완료된 정밀 자연수 상태입니다.",
        step2Move: "2.25의 소수 좌표를 일치시켜 위로 수직 도하시켜 배치합니다.",
        step3Result: "225 ÷ 15 = 15이므로 눈금을 상호 배합하면 0.15가 연출 완료됩니다.",
        dividendOriginal: "2.25",
        divisorOriginal: "15",
        dividendShifted: "2.25",
        divisorShifted: "15",
        shiftAmount: 0
      }
    },
    {
      question: "0.48 ÷ 4",
      dividend: "0.48",
      divisor: "4",
      correctAnswer: 0.12,
      choices: [0.12, 1.2, 12, 0.012],
      type: 'COMMON',
      explanationSteps: {
        step1Inverse: "나누는 수 4를 사용하여 심플하게 돌파 공격을 전개합니다.",
        step2Move: "0. 을 쓰고 세밀한 소수 좌표를 그대로 상방 배당합니다.",
        step3Result: "48 ÷ 4 = 12 로서 몫의 소수 자리를 지켜 0.12가 관철됩니다.",
        dividendOriginal: "0.48",
        divisorOriginal: "4",
        dividendShifted: "0.48",
        divisorShifted: "4",
        shiftAmount: 0
      }
    }
  ],
  ELITE: [
    {
      question: "3.5 ÷ 0.7",
      dividend: "3.5",
      divisor: "0.7",
      correctAnswer: 5,
      choices: [5, 0.5, 50, 0.05],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나누는 수(0.7)를 완벽한 자연수 상태로 변모 시키기 위해 오른쪽 1칸 도약을 감행합니다.",
        step2Move: "나누어지는 소수 3.5 축도 영력 보존에 의해 오른쪽으로 똑같이 1칸 공간 도약해 35가 성형화됩니다.",
        step3Result: "자연 합산식 35 ÷ 7이 도모되어 성스러운 몫 5가 수호 복사 완료됩니다.",
        dividendOriginal: "3.5",
        divisorOriginal: "0.7",
        dividendShifted: "35",
        divisorShifted: "7",
        shiftAmount: 1
      }
    },
    {
      question: "4.8 ÷ 1.2",
      dividend: "4.8",
      divisor: "1.2",
      correctAnswer: 4,
      choices: [4, 0.4, 40, 0.04],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나누는 수 1.2를 기하 자연수로 환수하고자 소수점 오른쪽 방향 1칸 날리기를 가합니다.",
        step2Move: "결의의 대칭 원리로 4.8 또한 우향 1칸 유도되어 48 형태로 마법 영력을 수축합니다.",
        step3Result: "정밀 고대 공식 48 ÷ 12 로 치환되어 기나긴 몫은 4 축에 낙착 결정됩니다.",
        dividendOriginal: "4.8",
        divisorOriginal: "1.2",
        dividendShifted: "48",
        divisorShifted: "12",
        shiftAmount: 1
      }
    },
    {
      question: "0.45 ÷ 0.05",
      dividend: "0.45",
      divisor: "0.05",
      correctAnswer: 9,
      choices: [9, 0.9, 90, 0.09],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나누는 세밀수 0.05를 자연 정교화하려 오른쪽 2칸 대폭 이동을 실시합니다.",
        step2Move: "합일의 보강으로 0.45 등가 수식도 오른쪽 가로 2칸 속력 이동하여 45를 구성합니다.",
        step3Result: "최적의 정형 공식 45 ÷ 5 주파에 준거하여 완전 몫에 9가 확정 방사됩니다.",
        dividendOriginal: "0.45",
        divisorOriginal: "0.05",
        dividendShifted: "45",
        divisorShifted: "5",
        shiftAmount: 2
      }
    },
    {
      question: "6.4 ÷ 0.8",
      dividend: "6.4",
      divisor: "0.8",
      correctAnswer: 8,
      choices: [8, 0.8, 80, 0.08],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나누는 정소수 0.8 수치에 오른쪽 1칸 자릿수 날리기를 가동합니다.",
        step2Move: "결합 보호로 6.4 주파도 똑같이 1칸 동조 이동하여 무인수 64를 획득해 냅니다.",
        step3Result: "최종 형상 수식 64 ÷ 8 에 입각하여 정수 8 에 연성 성립됩니다.",
        dividendOriginal: "6.4",
        divisorOriginal: "0.8",
        dividendShifted: "64",
        divisorShifted: "8",
        shiftAmount: 1
      }
    },
    {
      question: "2.7 ÷ 0.9",
      dividend: "2.7",
      divisor: "0.9",
      correctAnswer: 3,
      choices: [3, 0.3, 30, 0.03],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나누는 위상 0.9 수렴을 위해 소수점의 1회 우측 무빙을 기폭합니다.",
        step2Move: "상호 연쇄로 2.7 역시 우측 1지점 밀려나 27로 완전 변신 정렬합니다.",
        step3Result: "순수 자연 수식 27 ÷ 9가 격발 수립되어 정수로 깨끗하게 3이 생성됩니다.",
        dividendOriginal: "2.7",
        divisorOriginal: "0.9",
        dividendShifted: "27",
        divisorShifted: "9",
        shiftAmount: 1
      }
    },
    {
      question: "1.4 ÷ 0.2",
      dividend: "1.4",
      divisor: "0.2",
      correctAnswer: 7,
      choices: [7, 0.7, 70, 0.07],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나누는 수 0.2를 조율하기 위해 오른쪽 방향 1칸 소수점이 연계 이동합니다.",
        step2Move: "동조 반응으로 1.4도 무결히 동조하여 오른쪽으로 1칸 도향해 14에 도래합니다.",
        step3Result: "연산식인 14 ÷ 2에 충실히 귀결되어 성스러운 몫 7이 복귀됩니다.",
        dividendOriginal: "1.4",
        divisorOriginal: "0.2",
        dividendShifted: "14",
        divisorShifted: "2",
        shiftAmount: 1
      }
    },
    {
      question: "0.72 ÷ 0.09",
      dividend: "0.72",
      divisor: "0.09",
      correctAnswer: 8,
      choices: [8, 0.8, 80, 0.08],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나누는 지수 0.09 복원을 가해 소수점을 오른쪽으로 두 칸 전방 배치합니다.",
        step2Move: "대칭 반응력으로 0.72 소수점 역시 똑같이 두 칸 우측 기동되어 실체 72가 구성됩니다.",
        step3Result: "72 ÷ 9 = 8 이므로 기수 8이 강력 수립 완성됩니다.",
        dividendOriginal: "0.72",
        divisorOriginal: "0.09",
        dividendShifted: "72",
        divisorShifted: "9",
        shiftAmount: 2
      }
    },
    {
      question: "0.56 ÷ 0.08",
      dividend: "0.56",
      divisor: "0.08",
      correctAnswer: 7,
      choices: [7, 0.7, 70, 0.07],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나누는 소수 0.08의 안정화를 목표로 우향 2센티 공간도동을 넣습니다.",
        step2Move: "0.56 파괴식 역시 2칸 이동과 결부해 56으로 마법 기재가 재전개됩니다.",
        step3Result: "56 ÷ 8 은 수학 고유 공간 영역에서 완결 몫 7을 격발 소생시킵니다.",
        dividendOriginal: "0.56",
        divisorOriginal: "0.08",
        dividendShifted: "56",
        divisorShifted: "8",
        shiftAmount: 2
      }
    },
    {
      question: "7.5 ÷ 1.5",
      dividend: "7.5",
      divisor: "1.5",
      correctAnswer: 5,
      choices: [5, 0.5, 50, 0.05],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나누는 수 1.5의 평형을 회수코자 우클릭 1칸 소수점이 미화 기동합니다.",
        step2Move: "대칭 수 평정막으로 7.5 역시 1눈금 비행 이동하여 75에 다다릅니다.",
        step3Result: "75 ÷ 15 = 5 이 수식 결과에 따라 평온하게 마력 몫 5 가 분출됩니다.",
        dividendOriginal: "7.5",
        divisorOriginal: "1.5",
        dividendShifted: "75",
        divisorShifted: "15",
        shiftAmount: 1
      }
    },
    {
      question: "12.5 ÷ 2.5",
      dividend: "12.5",
      divisor: "2.5",
      correctAnswer: 5,
      choices: [5, 0.5, 50, 0.05],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나누는 수 2.5의 자릿 균열을 없애려 우측 1칸 물리 도약을 실행해 자연수 25로 개정합니다.",
        step2Move: "12.5 결계 역시 똑같이 우측 1칸 비행해 자릿 정렬 상태인 125가 실현됩니다.",
        step3Result: "125 ÷ 25 = 5 임을 연출해 내어 안전하게 몫 5를 격화 소집해 냅니다.",
        dividendOriginal: "12.5",
        divisorOriginal: "2.5",
        dividendShifted: "125",
        divisorShifted: "25",
        shiftAmount: 1
      }
    },
    {
      question: "9.6 ÷ 1.6",
      dividend: "9.6",
      divisor: "1.6",
      correctAnswer: 6,
      choices: [6, 0.6, 60, 0.06],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나누는 수 소수 1.6 핵심점을 우측 1칸 소수점 연성 수동 기동시킵니다.",
        step2Move: "9.6 역시 결속되어 우측 1자리 이동 완료해 96 실체를 투명 가열시킵니다.",
        step3Result: "96 ÷ 16 을 공습 타격하면 잔량 없이 딱 6 의 몫 수호 상수가 배출됩니다.",
        dividendOriginal: "9.6",
        divisorOriginal: "1.6",
        dividendShifted: "96",
        divisorShifted: "16",
        shiftAmount: 1
      }
    },
    {
      question: "0.81 ÷ 0.09",
      dividend: "0.81",
      divisor: "0.09",
      correctAnswer: 9,
      choices: [9, 0.9, 90, 0.09],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나누는 수인 0.09의 봉인을 풀어내고자 오른쪽 방향 2칸 전도 무빙을 넣습니다.",
        step2Move: "공급원인 0.81 역시 2칸 이동의 쾌속 비행을 하여 신속하게 81로 돌파 형태를 갖춥니다.",
        step3Result: "81 ÷ 9 = 9 기하 원리에 완전히 융합 귀속되어 정수 몫 9를 안전히 수호합니다.",
        dividendOriginal: "0.81",
        divisorOriginal: "0.09",
        dividendShifted: "81",
        divisorShifted: "9",
        shiftAmount: 2
      }
    },
    {
      question: "0.24 ÷ 0.03",
      dividend: "0.24",
      divisor: "0.03",
      correctAnswer: 8,
      choices: [8, 0.8, 80, 0.08],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나누는 수 0.03 기준복원을 위해 100배 가산하여 우측 2칸 소수점 이동을 가집니다.",
        step2Move: "연동 동축 반응에 위해 0.24 역시 가로 2마디 우측 도약 도정해 24 무기를 수렴해 냅니다.",
        step3Result: "24 ÷ 3 격돌 타격을 전방 수식하고 몫의 대가 상수로 정밀수 8을 획득합니다.",
        dividendOriginal: "0.24",
        divisorOriginal: "0.03",
        dividendShifted: "24",
        divisorShifted: "3",
        shiftAmount: 2
      }
    },
    {
      question: "10.8 ÷ 1.2",
      dividend: "10.8",
      divisor: "1.2",
      correctAnswer: 9,
      choices: [9, 0.9, 90, 0.09],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나 나누는 무진 1.2 소수 보정을 위해 소수 타격점을 우측 1클릭 평행 전향시킵니다.",
        step2Move: "10.8 에도 연쇄 동력원이 적용 실행돼 단 우측 1칸만 도합 가동해서 108에 낙도합니다.",
        step3Result: "108 ÷ 12 쾌진격을 전개하여 정성 수치가 9인 몫 에너지원을 결정합니다.",
        dividendOriginal: "10.8",
        divisorOriginal: "1.2",
        dividendShifted: "108",
        divisorShifted: "12",
        shiftAmount: 1
      }
    },
    {
      question: "0.36 ÷ 0.04",
      dividend: "0.36",
      divisor: "0.04",
      correctAnswer: 9,
      choices: [9, 0.9, 90, 0.09],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "장벽 소수 0.04 정렬력을 풀기 위해 2지점 우향 자릿 이동 보강을 가집니다.",
        step2Move: "대등 세력인 0.36 전선에도 똑같이 2선 우향 평행 동조를 하여 36 자연 마법을 이룹니다.",
        step3Result: "36 ÷ 4 공격망을 정합 전개해 최종 에센스 몫 상수로 9를 안전 결집합니다.",
        dividendOriginal: "0.36",
        divisorOriginal: "0.04",
        dividendShifted: "36",
        divisorShifted: "4",
        shiftAmount: 2
      }
    },
    {
      question: "1.8 ÷ 0.3",
      dividend: "1.8",
      divisor: "0.3",
      correctAnswer: 6,
      choices: [6, 0.6, 60, 0.06],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나누는 소수 0.3에 우향 1칸 몫의 에너지를 기하여 자연수 3으로 전향시킵니다.",
        step2Move: "피나눗수 1.8에도 우축 1칸 비행을 똑같이 타격해 18 상태로 수용 정립해 냅니다.",
        step3Result: "18 ÷ 3 = 6 소환 구조에 맞추어 깔끔한 에고 몫 6이 정체 구축됩니다.",
        dividendOriginal: "1.8",
        divisorOriginal: "0.3",
        dividendShifted: "18",
        divisorShifted: "3",
        shiftAmount: 1
      }
    },
    {
      question: "2.4 ÷ 0.6",
      dividend: "2.4",
      divisor: "0.6",
      correctAnswer: 4,
      choices: [4, 0.4, 40, 0.04],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나누는 기준 소수점 0.6 위치를 우향 1선 밀어 자연수 6으로 세팅 변경합니다.",
        step2Move: "2.4 에도 똑같이 복원에너지를 기입해 동조 우향 1선 기동하여 24에 가속 도달합니다.",
        step3Result: "24 ÷ 6 = 4 최종 정화가 성립하고 승리 인장수로 4가 인출됩니다.",
        dividendOriginal: "2.4",
        divisorOriginal: "0.6",
        dividendShifted: "24",
        divisorShifted: "6",
        shiftAmount: 1
      }
    },
    {
      question: "3.2 ÷ 0.4",
      dividend: "3.2",
      divisor: "0.4",
      correctAnswer: 8,
      choices: [8, 0.8, 80, 0.08],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나누는 자릿수 0.4 수리에 10배를 부가해 자연수 4형태로 구축 전환합니다.",
        step2Move: "3.2 좌표계에도 똑같이 10배 소조를 가해 32 상태에 당도 안식시킵니다.",
        step3Result: "32 ÷ 4 = 8 원리를 고대 마법에 적용해 몫 8이 최종 산출 확정됩니다.",
        dividendOriginal: "3.2",
        divisorOriginal: "0.4",
        dividendShifted: "32",
        divisorShifted: "4",
        shiftAmount: 1
      }
    },
    {
      question: "4.5 ÷ 0.9",
      dividend: "4.5",
      divisor: "0.9",
      correctAnswer: 5,
      choices: [5, 0.5, 50, 0.05],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나누는 소수 0.9를 향해 소수점 오른쪽 이동 마법 1칸을 기동합니다.",
        step2Move: "4.5 역시 이에 화답하듯 보정 1칸 도량 이동을 취해 45 실체를 형성합니다.",
        step3Result: "45 ÷ 9 = 5 수학적 조율의 흐름에 부응하여 몫의 좌표에 5가 각인됩니다.",
        dividendOriginal: "4.5",
        divisorOriginal: "0.9",
        dividendShifted: "45",
        divisorShifted: "9",
        shiftAmount: 1
      }
    },
    {
      question: "5.4 ÷ 0.9",
      dividend: "5.4",
      divisor: "0.9",
      correctAnswer: 6,
      choices: [6, 0.6, 60, 0.06],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나누는 소숫점 정제핵 0.9에 우측 한자리 보정을 기해 줍니다.",
        step2Move: "5.4 소수 전선도 우측 한 칸 정밀 이동되어 54의 전력 상태에 도착합니다.",
        step3Result: "54 ÷ 9 = 6 법칙에 기초되어 마법력 6이 안전히 방출 가시화 완료됩니다.",
        dividendOriginal: "5.4",
        divisorOriginal: "0.9",
        dividendShifted: "54",
        divisorShifted: "9",
        shiftAmount: 1
      }
    },
    {
      question: "4.2 ÷ 0.7",
      dividend: "4.2",
      divisor: "0.7",
      correctAnswer: 6,
      choices: [6, 0.6, 60, 0.06],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나누는 핵심 0.7의 정밀한 소수 좌표를 우향 1칸 전각 수동 조율합니다.",
        step2Move: "대응 세력인 4.2 역시 우측 방향 한 칸 공간을 건너가 42로 승급 구축됩니다.",
        step3Result: "42 ÷ 7 마격 공습에 정확히 직결되어 몫의 최종 에너지원 6이 폭발합니다.",
        dividendOriginal: "4.2",
        divisorOriginal: "0.7",
        dividendShifted: "42",
        divisorShifted: "7",
        shiftAmount: 1
      }
    },
    {
      question: "0.15 ÷ 0.03",
      dividend: "0.15",
      divisor: "0.03",
      correctAnswer: 5,
      choices: [5, 0.5, 50, 0.05],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나누는 0.03을 위해 100배 비율 소수점 우향 2칸 이동 마장막을 전개합니다.",
        step2Move: "0.15 역시 이에 공조 반응을 일으켜 우향 똑같이 2지점 전개해 15를 구성합니다.",
        step3Result: "15 ÷ 3 = 5 인과 법칙에 딱 도달하여 최종 몫 5가 완벽 실현됩니다.",
        dividendOriginal: "0.15",
        divisorOriginal: "0.03",
        dividendShifted: "15",
        divisorShifted: "3",
        shiftAmount: 2
      }
    },
    {
      question: "0.28 ÷ 0.04",
      dividend: "0.28",
      divisor: "0.04",
      correctAnswer: 7,
      choices: [7, 0.7, 70, 0.07],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나누는 소수점 제단 0.04 영액에 소수 복구 2마디 우향 가속을 가해 줍니다.",
        step2Move: "0.28 에도 연쇄 우향 2칸 이동이 발생하게 연계 타격해 28을 구축 완성합니다.",
        step3Result: "28 ÷ 4 = 7 로서 완벽한 공습 승전 수치로 7이 산식 환원 완비됩니다.",
        dividendOriginal: "0.28",
        divisorOriginal: "0.04",
        dividendShifted: "28",
        divisorShifted: "4",
        shiftAmount: 2
      }
    },
    {
      question: "0.48 ÷ 0.08",
      dividend: "0.48",
      divisor: "0.08",
      correctAnswer: 6,
      choices: [6, 0.6, 60, 0.06],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나누는 복합 마도 소수 0.08을 위해 소수점의 2회 우향 붕공을 칩니다.",
        step2Move: "대칭적 결계로 0.48 역시 2자리 우향 공간 평행을 이동하여 48 장막을 완성합니다.",
        step3Result: "48 ÷ 8 로 곧장 산출 수리되어 몫 정합 수치 6이 안전히 산출됩니다.",
        dividendOriginal: "0.48",
        divisorOriginal: "0.08",
        dividendShifted: "48",
        divisorShifted: "8",
        shiftAmount: 2
      }
    },
    {
      question: "0.63 ÷ 0.07",
      dividend: "0.63",
      divisor: "0.07",
      correctAnswer: 9,
      choices: [9, 0.9, 90, 0.09],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "소수 두 번째 자리 정밀핵인 0.07 수리를 우측 2칸 가량 밀어 자연수 7로 보전 개편합니다.",
        step2Move: "동궤 전속체 0.63 역시도 동일 2마디 우측 비행을 실행해서 63 실체를 연마 취합합니다.",
        step3Result: "최적 변천식 63 ÷ 7 을 정조준 완파함으로써 몫의 눈금 상에 9를 배당 확정합니다.",
        dividendOriginal: "0.63",
        divisorOriginal: "0.07",
        dividendShifted: "63",
        divisorShifted: "7",
        shiftAmount: 2
      }
    },
    {
      question: "0.35 ÷ 0.07",
      dividend: "0.35",
      divisor: "0.07",
      correctAnswer: 5,
      choices: [5, 0.5, 50, 0.05],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나누는 소수 0.07의 극단 자릿수 보강에 의해 100배율 소수점 우향 2선 이동을 가합니다.",
        step2Move: "동조 반응에 의해 0.35 마수 전선도 우향 2선 평행 기동 도하되어 35 정마법을 구현 완료합니다.",
        step3Result: "35 ÷ 7 = 5 변성 로직이 안전 실현 완성되어 최종 승전수 5가 연출 가시화됩니다.",
        dividendOriginal: "0.35",
        divisorOriginal: "0.07",
        dividendShifted: "35",
        divisorShifted: "7",
        shiftAmount: 2
      }
    },
    {
      question: "0.18 ÷ 0.02",
      dividend: "0.18",
      divisor: "0.02",
      correctAnswer: 9,
      choices: [9, 0.9, 90, 0.09],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "장벽 소수 0.02 핵의 한계를 제거하려 소수점을 명확히 오른쪽 2칸 평행 마장 전송시킵니다.",
        step2Move: "대칭 연동되어 0.18의 소수 전하 자리도 똑같이 2선 우향 도합 전개해 18을 영출 구축합니다.",
        step3Result: "18 ÷ 2 = 9 수리 공식 보정을 안전 완료 처치하여 최강 마력 몫 9가 수색 캐스팅됩니다.",
        dividendOriginal: "0.18",
        divisorOriginal: "0.02",
        dividendShifted: "18",
        divisorShifted: "2",
        shiftAmount: 2
      }
    },
    {
      question: "0.32 ÷ 0.08",
      dividend: "0.32",
      divisor: "0.08",
      correctAnswer: 4,
      choices: [4, 0.4, 40, 0.04],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나누는 실효핵인 0.08 보정 복원을 겨냥하여 우향 2마디 공간 이동 연성을 실시합니다.",
        step2Move: "동일 동조 규칙에 기초해 0.32 역시 우향 가로 2칸 신속 비행하여 32 무형 실체를 전방 영립합니다.",
        step3Result: "32 ÷ 8 마격 대입을 실행하여 깔끔하게 보정 몫 지수 4 기기를 복구 산출 완료 처치합니다.",
        dividendOriginal: "0.32",
        divisorOriginal: "0.08",
        dividendShifted: "32",
        divisorShifted: "8",
        shiftAmount: 2
      }
    },
    {
      question: "0.16 ÷ 0.04",
      dividend: "0.16",
      divisor: "0.04",
      correctAnswer: 4,
      choices: [4, 0.4, 40, 0.04],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나누는 마법 장막인 0.04 평정을 걷어내려고 소수점 정정 우향 2선을 무빙 타격합니다.",
        step2Move: "공급수 0.16 역시 2지점 타격을 마법 연합 수용 타타해 16 상태에 도착 도달시킵니다.",
        step3Result: "16 ÷ 4 쾌진격이 자연 연출되고 정량 치수 4 축에 낙도 완결 축복합니다.",
        dividendOriginal: "0.16",
        divisorOriginal: "0.04",
        dividendShifted: "16",
        divisorShifted: "4",
        shiftAmount: 2
      }
    },
    {
      question: "0.25 ÷ 0.05",
      dividend: "0.25",
      divisor: "0.05",
      correctAnswer: 5,
      choices: [5, 0.5, 50, 0.05],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나 나누는 기준 소수점 0.05를 자연 소조화하려고 소수점을 2클릭 우향 가산 배치합니다.",
        step2Move: "0.25 에도 결속 상호 동력이 적용되어 똑같이 두 마디 우향 기동 조정해 25로 전환 소조화시킵니다.",
        step3Result: "25 ÷ 5 마법이 드디어 격학 실현되어 몫 5 기를 안전 가시 완료 창출합니다.",
        dividendOriginal: "0.25",
        divisorOriginal: "0.05",
        dividendShifted: "25",
        divisorShifted: "5",
        shiftAmount: 2
      }
    },
    {
      question: "0.49 ÷ 0.07",
      dividend: "0.49",
      divisor: "0.07",
      correctAnswer: 7,
      choices: [7, 0.7, 70, 0.07],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "소수 두 칸 눈금 보강인 0.07 자연 정화를 겨냥하고 우측 2칸 점핑을 소환 기폭시킵니다.",
        step2Move: "0.49 역시 2칸 우향으로 전선을 인장 유도하여 49 대지 에너지를 인격 구축 완료합니다.",
        step3Result: "49 ÷ 7 기하 공습에 정조준 완파를 행하며 몫 7 에 안정 결정 낙도 결정합니다.",
        dividendOriginal: "0.49",
        divisorOriginal: "0.07",
        dividendShifted: "49",
        divisorShifted: "7",
        shiftAmount: 2
      }
    },
    {
      question: "0.64 ÷ 0.08",
      dividend: "0.64",
      divisor: "0.08",
      correctAnswer: 8,
      choices: [8, 0.8, 80, 0.08],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나누는 소수 정형 0.08에 우측 두 마디 보정을 기하여 정수 8로 수동 보정시킵니다.",
        step2Move: "0.64 역시 우측 똑같이 2선 동조 평행 기전해 64 형태로 에고 가열 생성 처치합니다.",
        step3Result: "64 ÷ 8 에 직결 타결 수치에 물려서, 완전 몫 8 상수 기를 안정 복귀 완료 처치합니다.",
        dividendOriginal: "0.64",
        divisorOriginal: "0.08",
        dividendShifted: "64",
        divisorShifted: "8",
        shiftAmount: 2
      }
    },
    {
      question: "1.5 ÷ 0.3",
      dividend: "1.5",
      divisor: "0.3",
      correctAnswer: 5,
      choices: [5, 0.5, 50, 0.05],
      type: 'ELITE',
      explanationSteps: {
        step1Inverse: "나누는 소숫점 정량보조 0.3을 우향 한 마디 무빙해 자연수 3으로 세팅 복귀시킵니다.",
        step2Move: "1.5 역시 우향 가로 1지점 밀려 영동 도정해서 정량 15 지점에 당도 수용시킵니다.",
        step3Result: "15 ÷ 3 = 5 인과식에 기초하여 몫 5가 최종 창조 배당 처치됩니다.",
        dividendOriginal: "1.5",
        divisorOriginal: "0.3",
        dividendShifted: "15",
        divisorShifted: "3",
        shiftAmount: 1
      }
    }
  ],
  BOSS: [
    {
      question: "0.48 ÷ 0.6",
      dividend: "0.48",
      divisor: "0.6",
      correctAnswer: 0.8,
      choices: [0.8, 8, 0.08, 80],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "경고! 소릿 자릿수가 서로 다릅니다. 나누는 수 0.6을 기하여 소수점 우측 딱 '1칸' 연성 이동 설계합니다.",
        step2Move: "공평의 대가로 0.48 또한 우측 딱 '1칸' 동일 폭 이동시켜서 4.8 위상을 수축 기입해 냅니다.",
        step3Result: "최종 산정인 4.8 ÷ 6 수식에 맞춰 몫 소수점 지점을 정확히 올려주면 0.8 수치 수호에 당도합니다.",
        dividendOriginal: "0.48",
        divisorOriginal: "0.6",
        dividendShifted: "4.8",
        divisorShifted: "6",
        shiftAmount: 1
      }
    },
    {
      question: "0.35 ÷ 0.5",
      dividend: "0.35",
      divisor: "0.5",
      correctAnswer: 0.7,
      choices: [0.7, 7, 0.07, 70],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 수 0.5를 자연수로 안전 수호코자 우측 1칸 공간 도량을 실시합니다.",
        step2Move: "결의의 대등 보조로 0.35 소수 좌표도 똑같이 소수 우향 1칸만 무브 유도해 3.5 상태를 확보 보정합니다.",
        step3Result: "3.5 ÷ 5 주파 수식에 도량 귀결되어, 몫 정수 밑자리에 맞춰 0.7이 정안 연성 완성됩니다.",
        dividendOriginal: "0.35",
        divisorOriginal: "0.5",
        dividendShifted: "3.5",
        divisorShifted: "5",
        shiftAmount: 1
      }
    },
    {
      question: "0.072 ÷ 0.08",
      dividend: "0.072",
      divisor: "0.08",
      correctAnswer: 0.9,
      choices: [0.9, 9, 0.09, 90],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 위하 0.08 의 한계를 깨려 우향 2마디 소수점 날리기를 기폭 적용시킵니다.",
        step2Move: "0.072 에도 똑같이 우향 방향으로만 2칸 동조 날리기가 적용 조립되어 7.2 수치가 연출 확보됩니다.",
        step3Result: "최종 형상식 7.2 ÷ 8 에 준하여 정렬 소수 윗자리 정합에 물려 0.9가 완벽 산출 환원됩니다.",
        dividendOriginal: "0.072",
        divisorOriginal: "0.08",
        dividendShifted: "7.2",
        divisorShifted: "8",
        shiftAmount: 2
      }
    },
    {
      question: "4 ÷ 0.8",
      dividend: "4",
      divisor: "0.8",
      correctAnswer: 5,
      choices: [5, 0.5, 50, 0.05],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "경고! 자연수를 소수로 격퇴 소조합니다. 나누는 수 0.8 보강 우향 1칸 소수점이 강제 기동합니다.",
        step2Move: "나누어지는 자연 본존 '4'는 사실상 4.0 이므로 똑같이 1칸 기 가속되어 빈 자리에 0이 장막된 40이 인격 형성됩니다.",
        step3Result: "치환 공식 40 ÷ 8 에 직결 되어 정수 몫 5가 최종 수호 방출 완성됩니다.",
        dividendOriginal: "4",
        divisorOriginal: "0.8",
        dividendShifted: "40",
        divisorShifted: "8",
        shiftAmount: 1
      }
    },
    {
      question: "6 ÷ 1.5",
      dividend: "6",
      divisor: "1.5",
      correctAnswer: 4,
      choices: [4, 0.4, 40, 0.04],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 1.5 자연 복원을 겨냥하고 강수 소수 우측 1칸 비행을 가해 자연 정수 15를 구성합니다.",
        step2Move: "자연 본체 6도 1칸 비행 결속 영향으로 0이 승급 첨가되어 60 위상으로 공격 정렬 완료시킵니다.",
        step3Result: "60 ÷ 15 마격 공방으로 수렴 귀조되어 딱 떨어지는 승전수 4가 복구 소양 완료됩니다.",
        dividendOriginal: "6",
        divisorOriginal: "1.5",
        dividendShifted: "60",
        divisorShifted: "15",
        shiftAmount: 1
      }
    },
    {
      question: "2.4 ÷ 0.06",
      dividend: "2.4",
      divisor: "0.06",
      correctAnswer: 40,
      choices: [40, 4, 0.4, 400],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 소수 0.06 기하 자리를 수호코자 소수점 우향 2마디 공간 도량을 실시 가속합니다.",
        step2Move: "2.4 주파 전선 또한 똑같이 우향 방향으로 2칸 전도 무빙 밀려서 빈자리가 0으로 부가된 240이 구축완료됩니다.",
        step3Result: "240 ÷ 6 마격 구조가 안정 성립 기동되고 정밀 몫 40 상수 기가 복귀 전수 완료됩니다.",
        dividendOriginal: "2.4",
        divisorOriginal: "0.06",
        dividendShifted: "240",
        divisorShifted: "6",
        shiftAmount: 2
      }
    },
    {
      question: "1.2 ÷ 0.04",
      dividend: "1.2",
      divisor: "0.04",
      correctAnswer: 30,
      choices: [30, 3, 0.3, 300],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 0.04 기준에 100배율 소수점 우향 2칸 이동 마도 결계를 전술해 자연수 4를 확보시킵니다.",
        step2Move: "1.2 주파수에도 똑같이 가로 우향 2마디 연계 평행 이동해 빈 기지에 0을 도한 120이 인격화 처치됩니다.",
        step3Result: "120 ÷ 4 공격망 수리에 귀착되고 몫 수화 지수 30 이 전력 방출 수호 완료됩니다.",
        dividendOriginal: "1.2",
        divisorOriginal: "0.04",
        dividendShifted: "120",
        divisorShifted: "4",
        shiftAmount: 2
      }
    },
    {
      question: "0.18 ÷ 0.9",
      dividend: "0.18",
      divisor: "0.9",
      correctAnswer: 0.2,
      choices: [0.2, 2, 0.02, 20],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 마법 조율 0.9 측에 소수점 1선 가량 우향 마도 타격을 행해 줍니다.",
        step2Move: "0.18 또한 동조 규칙 수용력 우향 1칸 전각 기동 조정해 1.8 로 보정 정합 상태를 유지합니다.",
        step3Result: "1.8 ÷ 9 식에 이르러, 소수 윗자리 몫 위치에 맞추어서 마력 몫 0.2 완성 방출 성공됩니다.",
        dividendOriginal: "0.18",
        divisorOriginal: "0.9",
        dividendShifted: "1.8",
        divisorShifted: "9",
        shiftAmount: 1
      }
    },
    {
      question: "0.32 ÷ 0.8",
      dividend: "0.32",
      divisor: "0.8",
      correctAnswer: 0.4,
      choices: [0.4, 4, 0.04, 40],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 위하 수체 0.8 에 우향 1마디 소수 비행을 전술 대입 처치합니다.",
        step2Move: "0.32 전선 측도 1마디 우향 결의를 동시 수립 실행해 3.2 로 강제 봉인 완료합니다.",
        step3Result: "3.2 ÷ 8 에 자리를 매겨서 최종 산출 몫으로 깨끗이 0.4 상수가 정렬 기재 완료 처치됩니다.",
        dividendOriginal: "0.32",
        divisorOriginal: "0.8",
        dividendShifted: "3.2",
        divisorShifted: "8",
        shiftAmount: 1
      }
    },
    {
      question: "9 ÷ 1.8",
      dividend: "9",
      divisor: "1.8",
      correctAnswer: 5,
      choices: [5, 0.5, 50, 0.05],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 수 소수 1.8 의 자릿 버그 정리를 우향 1칸 수치 가열 무빙시킵니다.",
        step2Move: "자연 본래 9 에 0 공간을 1칸 증설 채색 적용해서 90 정수 전하를 유발해 둡니다.",
        step3Result: "90 ÷ 18 공습전에 온전히 충해 승전 수치 5를 완벽 수호해 소생시킵니다.",
        dividendOriginal: "9",
        divisorOriginal: "1.8",
        dividendShifted: "90",
        divisorShifted: "18",
        shiftAmount: 1
      }
    },
    {
      question: "0.3 ÷ 0.05",
      dividend: "0.3",
      divisor: "0.05",
      correctAnswer: 6,
      choices: [6, 0.6, 60, 0.06],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 무장 0.05 소수 좌표를 우측 2칸 점프 도하시켜 환수 처치 완료합니다.",
        step2Move: "대지 0.3 자율 측도 우측 2마디 공간 도약 전용돼 빈 좌표에 0이 첨서된 30을 일러 냅니다.",
        step3Result: "30 ÷ 5 변환 법칙 공방전에 맞춰 최종 몫 상수 6이 안전히 산식 형성 완료됩니다.",
        dividendOriginal: "0.3",
        divisorOriginal: "0.05",
        dividendShifted: "30",
        divisorShifted: "5",
        shiftAmount: 2
      }
    },
    {
      question: "0.6 ÷ 0.15",
      dividend: "0.6",
      divisor: "0.15",
      correctAnswer: 4,
      choices: [4, 0.4, 40, 0.04],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 마법 장막이 0.15로 고도 자릿수에 대하 우향 2마디 소수 비행을 적용합니다.",
        step2Move: "대칭 연쇄로 0.6 측도 우측 2선 비행 도정 연동돼 공비 자리가 0이 칠한 60 지상 결계를 이룹니다.",
        step3Result: "60 ÷ 15 마도 파쇄력에 직결 타격해 파쇄 몫 기로 치수 4를 안전 수렴 완료합니다.",
        dividendOriginal: "0.6",
        divisorOriginal: "0.15",
        dividendShifted: "60",
        divisorShifted: "15",
        shiftAmount: 2
      }
    },
    {
      question: "1.5 ÷ 0.05",
      dividend: "1.5",
      divisor: "0.05",
      correctAnswer: 30,
      choices: [30, 3, 0.3, 300],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 수 0.05 보완 정렬 도합을 우측 2마디 소수점 날리기로 적용합니다.",
        step2Move: "1.5 주파 역시 우향 2마디 공간을 도모해 건너서 공란에 0을 입힘으로써 150 이 연출 완료됩니다.",
        step3Result: "150 ÷ 5 쾌적 타격을 유발하여 최종 생성 몫 30 마력 지주를 인견 확정합니다.",
        dividendOriginal: "1.5",
        divisorOriginal: "0.05",
        dividendShifted: "150",
        divisorShifted: "5",
        shiftAmount: 2
      }
    },
    {
      question: "0.28 ÷ 0.4",
      dividend: "0.28",
      divisor: "0.4",
      correctAnswer: 0.7,
      choices: [0.7, 7, 0.07, 70],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 0.4 를 상대로 소수 보정 우향 단 1칸 이동을 감행시킵니다.",
        step2Move: "0.28 역시 동일 동궤 1눈금 우전진해 2.8 형태로 응축 배치해서 무장합니다.",
        step3Result: "2.8 ÷ 4 기하 산출식에 딱 안착 정렬시켜 몫의 자리를 수리하고 0.7을 각인 융합합니다.",
        dividendOriginal: "0.28",
        divisorOriginal: "0.4",
        dividendShifted: "2.8",
        divisorShifted: "4",
        shiftAmount: 1
      }
    },
    {
      question: "0.54 ÷ 0.6",
      dividend: "0.54",
      divisor: "0.6",
      correctAnswer: 0.9,
      choices: [0.9, 9, 0.09, 90],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 0.6 수리에 10배 동력을 부과 시켜 정수 6 상태로 구조를 대전환합니다.",
        step2Move: "0.54 측도 10배 소조가 평행 작용돼 5.4 쾌진격 전대 상태에 수림 안착시킵니다.",
        step3Result: "5.4 ÷ 6 = 0.9 관계에 의해 최종 정화 몫 0.9 수호 완료 배치합니다.",
        dividendOriginal: "0.54",
        divisorOriginal: "0.6",
        dividendShifted: "5.4",
        divisorShifted: "6",
        shiftAmount: 1
      }
    },
    {
      question: "3 ÷ 0.6",
      dividend: "3",
      divisor: "0.6",
      correctAnswer: 5,
      choices: [5, 0.5, 50, 0.05],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 소수 0.6에 우향 1칸 공격을 퍼부어 자연수 6으로 회생시킵니다.",
        step2Move: "피나눗수 자연수 3 역시 우향 동일 1칸 타격 가속해 30 상태로 결속 전환 전선 시킵니다.",
        step3Result: "30 ÷ 6 = 5 법칙 수순에 제대로 직결되어 마력 지주 몫 5가 분출 완료 복귀됩니다.",
        dividendOriginal: "3",
        divisorOriginal: "0.6",
        dividendShifted: "30",
        divisorShifted: "6",
        shiftAmount: 1
      }
    },
    {
      question: "8.4 ÷ 1.2",
      dividend: "8.4",
      divisor: "1.2",
      correctAnswer: 7,
      choices: [7, 0.7, 70, 0.07],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 소수 1.2에 우향 1칸 몫의 에너지를 기하여 자연수 12로 전향형성시킵니다.",
        step2Move: "대지력 8.4 에도 우측 1지점 동일 이동력을 기전 타타해 84 전선 구조를 수립 보존해 둡니다.",
        step3Result: "84 ÷ 12 = 7 기하 수순에 안착되어 최강 승전 기수 7이 인견 도정됩니다.",
        dividendOriginal: "8.4",
        divisorOriginal: "1.2",
        dividendShifted: "84",
        divisorShifted: "12",
        shiftAmount: 1
      }
    },
    {
      question: "1.2 ÷ 0.03",
      dividend: "1.2",
      divisor: "0.03",
      correctAnswer: 40,
      choices: [40, 4, 0.4, 400],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 수 0.03 소소 한계를 도려내 전격 우측 2칸 눈금 보정 도량을 넣습니다.",
        step2Move: "1.2 축도 똑같이 우측 두 마디 공간 이동 날리기 가해 공란에 0을 입힌 120 무장을 구축시킵니다.",
        step3Result: "120 ÷ 3 에 물리어 딱 완성 몫 체성 40 기가 무결 배당 연성 완성됩니다.",
        dividendOriginal: "1.2",
        divisorOriginal: "0.03",
        dividendShifted: "120",
        divisorShifted: "3",
        shiftAmount: 2
      }
    },
    {
      question: "4.5 ÷ 0.09",
      dividend: "4.5",
      divisor: "0.09",
      correctAnswer: 50,
      choices: [50, 5, 0.5, 500],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 폭 소수 0.09 제단에 자릿 보강 2칸 우향 기동 도량을 적용시킵니다.",
        step2Move: "4.5 전선도 똑같이 우측 2마디 도정 비행 연동되어 한 마당 0 채운 450 이 연출 완료됩니다.",
        step3Result: "450 ÷ 9 공격망 수리에 의해 최종 마력 몫 에너지 50 지주가 가시 창출됩니다.",
        dividendOriginal: "4.5",
        divisorOriginal: "0.09",
        dividendShifted: "450",
        divisorShifted: "9",
        shiftAmount: 2
      }
    },
    {
      question: "0.25 ÷ 0.5",
      dividend: "0.25",
      divisor: "0.5",
      correctAnswer: 0.5,
      choices: [0.5, 5, 0.05, 50],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 0.5 에 우향 단 1눈금 비행 타격을 기해주어 자연수 5로 세트합니다.",
        step2Move: "0.25 역시 이에 가열 연동하여 1지점만 수동 우전각해 2.5 형태로 압축 마련해 둡니다.",
        step3Result: "2.5 ÷ 5 주파에 준한 소수 눈금 매김으로 정밀 몫 0.5가 최종 정화 구축 완료 배정됩니다.",
        dividendOriginal: "0.25",
        divisorOriginal: "0.5",
        dividendShifted: "2.5",
        divisorShifted: "5",
        shiftAmount: 1
      }
    },
    {
      question: "0.16 ÷ 0.2",
      dividend: "0.16",
      divisor: "0.2",
      correctAnswer: 0.8,
      choices: [0.8, 8, 0.08, 80],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 정소수 0.2 를 정자연수 2로 수호하려 우향 1칸만 소수 도정 가공을 가해 줍니다.",
        step2Move: "0.16 에도 동조 작용이 평행 기폭 전술되어 우측 단 1칸만 몫 위로 날려 1.6 압축 전선 마련해 둡니다.",
        step3Result: "1.6 ÷ 2 공격에 무조건 부응해 몫 소수지 자리를 수호하며 최종 0.8 수치를 방사 복원시킵니다.",
        dividendOriginal: "0.16",
        divisorOriginal: "0.2",
        dividendShifted: "1.6",
        divisorShifted: "2",
        shiftAmount: 1
      }
    },
    {
      question: "0.42 ÷ 0.7",
      dividend: "0.42",
      divisor: "0.7",
      correctAnswer: 0.6,
      choices: [0.6, 6, 0.06, 60],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 0.7 의 정밀 수리를 위해 우향 1칸 이동 조율력을 기획해 줍니다.",
        step2Move: "0.42 전속체 역시 전각 1눈금 우방향 비행 평행해 4.2 계계 수식을 이룩 완료합니다.",
        step3Result: "4.2 ÷ 7 마격 공습 에 도달하여 깨끗이 정량 몫 0.6 이 캐스팅 확보됩니다.",
        dividendOriginal: "0.42",
        divisorOriginal: "0.7",
        dividendShifted: "4.2",
        divisorShifted: "7",
        shiftAmount: 1
      }
    },
    {
      question: "5 ÷ 1.25",
      dividend: "5",
      divisor: "1.25",
      correctAnswer: 4,
      choices: [4, 0.4, 40, 0.04],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "장벽 소수 1.25 완파를 겨냥하여 우향 두 자리 이동 마법을 기폭시킵니다.",
        step2Move: "자연 본존 5 에도 동조 가속력이 적용되어 우향 2마디 날려 00 이 채명된 500 전하를 유발해 둡니다.",
        step3Result: "500 ÷ 125 수식은 정수 몫 4 에 완벽 정량 소립 완성되어 대전승됩니다.",
        dividendOriginal: "5",
        divisorOriginal: "1.25",
        dividendShifted: "500",
        divisorShifted: "125",
        shiftAmount: 2
      }
    },
    {
      question: "0.36 ÷ 0.9",
      dividend: "0.36",
      divisor: "0.9",
      correctAnswer: 0.4,
      choices: [0.4, 4, 0.04, 40],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 정형 0.9 기준에 우향 1칸 몫의 에너지를 전술 기폭합니다.",
        step2Move: "0.36 전선 측도 1눈금 우향 타격 동조 완료 실행하여 3.6 가량을 구축 보정 완료 처치해 둡니다.",
        step3Result: "3.6 ÷ 9 수식에 직결 타격하고, 최종 마력 몫 0.4 상수를 완벽 연출 완료합니다.",
        dividendOriginal: "0.36",
        divisorOriginal: "0.9",
        dividendShifted: "3.6",
        divisorShifted: "9",
        shiftAmount: 1
      }
    },
    {
      question: "0.45 ÷ 0.5",
      dividend: "0.45",
      divisor: "0.5",
      correctAnswer: 0.9,
      choices: [0.9, 9, 0.09, 90],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 핵심 0.5 소수에 보정 소수 우향 단 1칸 이동을 설계 실행 보존합니다.",
        step2Move: "피나눗수 0.45 에도 1칸 우향 보정을 연동 실행해 4.5 상태를 확보 확보 처치해 둡니다.",
        step3Result: "4.5 ÷ 5 마경 공방에서 깔끔히 정밀 몫 0.9 가 산식 방출 완료됩니다.",
        dividendOriginal: "0.45",
        divisorOriginal: "0.5",
        dividendShifted: "4.5",
        divisorShifted: "5",
        shiftAmount: 1
      }
    },
    {
      question: "1.6 ÷ 0.04",
      dividend: "1.6",
      divisor: "0.04",
      correctAnswer: 40,
      choices: [40, 4, 0.4, 400],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 지수 0.04를 정수로 세팅하도록 우향 2마디 공간 이동을 넣습니다.",
        step2Move: "1.6 역시 우측 똑같이 2선 비행 도래해서 여분 칸에 0 가명 부가된 160 형태로 공격 배치 처치해 둡니다.",
        step3Result: "160 ÷ 4 공격 타격에 맞춰 몫의 눈금 상에 기수 40이 무결히 창제됩니다.",
        dividendOriginal: "1.6",
        divisorOriginal: "0.04",
        dividendShifted: "160",
        divisorShifted: "4",
        shiftAmount: 2
      }
    },
    {
      question: "2.8 ÷ 0.07",
      dividend: "2.8",
      divisor: "0.07",
      correctAnswer: 40,
      choices: [40, 4, 0.4, 400],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 지수 0.07 정화를 겨냥하고 우측 2칸 폭 가속 날리기를 기동 전용합니다.",
        step2Move: "2.8 주층 역시 두 마디 지평 우향 평행 무빙해 무인 00 이 입혀진 280 공격 좌표를 달성합니다.",
        step3Result: "280 ÷ 7 마격 결성에 제대로 부합해 정수성 몫 40 지지물이 안전 도출 소생 완료됩니다.",
        dividendOriginal: "2.8",
        divisorOriginal: "0.07",
        dividendShifted: "280",
        divisorShifted: "7",
        shiftAmount: 2
      }
    },
    {
      question: "0.15 ÷ 0.3",
      dividend: "0.15",
      divisor: "0.3",
      correctAnswer: 0.5,
      choices: [0.5, 5, 0.05, 50],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 소숫점 축 0.3에 오른쪽으로 딱 1칸 자릿 이동 타격을 전술해 자연수 3으로 전향 복구합니다.",
        step2Move: "0.15 역시 똑같이 1마디 전도 무빙해 가로 질러 1.5 계열 압식 마련 상태를 수림합니다.",
        step3Result: "1.5 ÷ 3 격화에 준정열 되어 몫 0.5 상수를 최종 검출 연성 수호 완료 배치시킵니다.",
        dividendOriginal: "0.15",
        divisorOriginal: "0.3",
        dividendShifted: "1.5",
        divisorShifted: "3",
        shiftAmount: 1
      }
    },
    {
      question: "0.24 ÷ 0.6",
      dividend: "0.24",
      divisor: "0.6",
      correctAnswer: 0.4,
      choices: [0.4, 4, 0.04, 40],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 0.6 에 정교 10배 소조 장치 우향 1선 기동력을 배치 적용 설계시킵니다.",
        step2Move: "0.24 에 똑같이 복고 작용력 우향 1선 적용 실행도합해 2.4 형태로 수렴해서 배치해 둡니다.",
        step3Result: "2.4 ÷ 6 = 0.4 기하 격수전 상에 딱 귀착되어 몫 0.4 가 안전히 부식 완료됩니다.",
        dividendOriginal: "0.24",
        divisorOriginal: "0.6",
        dividendShifted: "2.4",
        divisorShifted: "6",
        shiftAmount: 1
      }
    },
    {
      question: "0.49 ÷ 0.7",
      dividend: "0.49",
      divisor: "0.7",
      correctAnswer: 0.7,
      choices: [0.7, 7, 0.07, 70],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 기준 소수점 0.7 정정 자리를 우향 1선 도량 무빙해 자연수 7로 보전 통기시킵니다.",
        step2Move: "0.49 지상 결계 역시도 1지점 동조 우향 평행 조향 처리해 4.9 상태에 당도 안식시킵니다.",
        step3Result: "4.9 ÷ 7 기공에 준 정밀 작용해 최종 몫 보조 상수로 0.7이 안전 배당 이룩 처치됩니다.",
        dividendOriginal: "0.49",
        divisorOriginal: "0.7",
        dividendShifted: "4.9",
        divisorShifted: "7",
        shiftAmount: 1
      }
    },
    {
      question: "0.72 ÷ 0.8",
      dividend: "0.72",
      divisor: "0.8",
      correctAnswer: 0.9,
      choices: [0.9, 9, 0.09, 90],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 0.8 수취에 보정 10배 우향 1클릭 무빙 도량을 전대 수축시킵니다.",
        step2Move: "0.72 주층 역시 동진 우향 1마디 날려 7.2 공격 전선 형태로 개명 안착 지상 완료 완료합니다.",
        step3Result: "7.2 ÷ 8 마도 완파 공습에 귀착돼 최종 정화 몫 0.9가 완벽 소립 전성 성공 처치 처치됩니다.",
        dividendOriginal: "0.72",
        divisorOriginal: "0.8",
        dividendShifted: "7.2",
        divisorShifted: "8",
        shiftAmount: 1
      }
    },
    {
      question: "0.81 ÷ 0.9",
      dividend: "0.81",
      divisor: "0.9",
      correctAnswer: 0.9,
      choices: [0.9, 9, 0.09, 90],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 완벽 몫 정량 0.9를 향해 소수 보편 우향 1자리 무빙 전술 설계시킵니다.",
        step2Move: "0.81 역시 1자리 우향 보정 결합 동력을 받아들여 8.1 상태에 당착 수축 보존 처치시킵니다.",
        step3Result: "8.1 ÷ 9 주파 식에 이르러, 예리한 소수점 대칭에 의해 최강 마교 몫 0.9가 안전 연성 가치 완료됩니다.",
        dividendOriginal: "0.81",
        divisorOriginal: "0.9",
        dividendShifted: "8.1",
        divisorShifted: "9",
        shiftAmount: 1
      }
    },
    {
      question: "1.8 ÷ 0.09",
      dividend: "1.8",
      divisor: "0.09",
      correctAnswer: 20,
      choices: [20, 2, 0.2, 200],
      type: 'BOSS',
      explanationSteps: {
        step1Inverse: "나누는 수 소수 0.09에 우축 2칸 몫의 에너지를 기하여 오치 완존 자연수 9로 환원 승격시킵니다.",
        step2Move: "자원수 1.8 에도 우측 2지점 소수점 신속 조립 비행을 가해 빈 자리에 0 가설 인쇄 부착된 180 으로 통기 수립합니다.",
        step3Result: "180 ÷ 9 = 20 원전 귀착 대수리에 준하여 몫에 기수 20이 완숙 정렬 생성 복구 완료됩니다.",
        dividendOriginal: "1.8",
        divisorOriginal: "0.09",
        dividendShifted: "180",
        divisorShifted: "9",
        shiftAmount: 2
      }
    }
  ]
};
