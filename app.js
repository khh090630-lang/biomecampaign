import React, { useState } from 'react';

// --- [데이터 영역] 추출된 문제, 표, 그래프 데이터 ---
const questionsData = [
  {
    id: 1,
    title: "[문제 1] 제공된 그래프는 무기물 표면에서 방역 물질 X, Y 수용액의 농도 변화에 따른 세균 사멸 시간을 측정한 것이다. 이에 대한 설명으로 옳은 것만을 <보기>에서 있는 대로 고른 것은? (단, X, Y는 각각 에탄올과 계면활성제 중 하나이며, Y 처리 시에는 수류 세정이 동반된다고 가정한다.)",
    visual: (
      <div className="flex justify-center my-4">
        <svg viewBox="0 0 350 250" className="w-80 h-auto border border-gray-300 p-4 bg-white">
          {/* Axes */}
          <polyline points="40,20 40,200 320,200" fill="none" stroke="black" strokeWidth="2" />
          {/* Arrows */}
          <polygon points="37,20 43,20 40,10" fill="black" />
          <polygon points="320,197 320,203 330,200" fill="black" />
          {/* Labels */}
          <text x="15" y="30" fontSize="12" fontWeight="bold">세균</text>
          <text x="5" y="45" fontSize="12" fontWeight="bold">사멸시간</text>
          <text x="270" y="225" fontSize="12" fontWeight="bold">수용액 농도</text>
          {/* X Curve */}
          <path d="M 50,40 Q 120,190 180,180 Q 230,140 260,60" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="270" y="55" fontSize="14" fontWeight="bold">X</text>
          {/* Y Curve */}
          <path d="M 60,80 Q 120,190 180,190 L 300,180" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="310" y="185" fontSize="14" fontWeight="bold">Y</text>
          {/* C marker */}
          <line x1="180" y1="198" x2="180" y2="202" stroke="black" strokeWidth="2" />
          <text x="175" y="215" fontSize="14" fontWeight="bold">C</text>
        </svg>
      </div>
    ),
    bogi: [
      "ㄱ. 물질 X의 농도가 특정 농도보다 커질 때 사멸 시간이 급격히 증가하는 이유는 세균 표면 단백질의 급격한 응고로 인해 X 분자의 내부 투과가 차단되기 때문이다.",
      "ㄴ. 농도 C에서 세균 사멸 직후 병원체의 사체를 피부 표면에서 이탈시키는 비율은 Y가 X보다 높다.",
      "ㄷ. 농도가 C로 고정된 X 수용액을 유기물이 다량 존재하는 표면에 각각 도포할 경우, X의 그래프는 +y 방향으로 평행이동할 것이다."
    ],
    options: ["① ㄱ", "② ㄴ", "③ ㄱ, ㄴ", "④ ㄴ, ㄷ", "⑤ ㄱ, ㄴ, ㄷ"],
    answer: 3
  },
  {
    id: 2,
    title: "[문제 2] 표는 환경 (가)와 (나)에 방역 물질 X ~ Z를 각각 단독 처리했을 때의 세균 생존율 상대값을 나타낸 것이다. X ~ Z는 각각 70% 에탄올, 100% 에탄올, 계면활성제 중 하나이고, (가)와 (나)는 각각 건조한 손과 유분이 있는 손 중 하나이다.",
    visual: (
      <div className="flex flex-col md:flex-row items-center gap-4 my-4">
        <table className="w-full md:w-auto text-center border-collapse text-sm bg-black text-white">
          <thead>
            <tr>
              <th className="border border-gray-600 p-2 min-w-[60px]">환경</th>
              <th className="border border-gray-600 p-2 min-w-[80px]">X 처리 시</th>
              <th className="border border-gray-600 p-2 min-w-[80px]">Y 처리 시</th>
              <th className="border border-gray-600 p-2 min-w-[80px]">Z 처리 시</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-600 p-2">(가)</td>
              <td className="border border-gray-600 p-2">100</td>
              <td className="border border-gray-600 p-2">a</td>
              <td className="border border-gray-600 p-2">0</td>
            </tr>
            <tr>
              <td className="border border-gray-600 p-2">(나)</td>
              <td className="border border-gray-600 p-2">0</td>
              <td className="border border-gray-600 p-2">b</td>
              <td className="border border-gray-600 p-2">0</td>
            </tr>
          </tbody>
        </table>
        <div className="text-sm text-gray-600 italic mt-2 md:mt-0">
          (단, 세균 생존율 상대값은 0~100 사이의 값을 가지며, 수치가 높을수록 방역에 실패함을 의미한다. 계면활성제 처리 시 흐르는 물 세정이 동반되었다고 가정한다.)
        </div>
      </div>
    ),
    bogi: [
      "ㄱ. X는 100% 에탄올, (가)는 유분이 있는 손이다.",
      "ㄴ. b > a 이다.",
      "ㄷ. (가) 환경에서 Z를 처리한 후 피부 표면에 남아있는 세균 사체량은 Y를 처리했을 때보다 많다."
    ],
    options: ["① ㄱ", "② ㄴ", "③ ㄱ, ㄴ", "④ ㄱ, ㄷ", "⑤ ㄴ, ㄷ"],
    answer: 1
  },
  {
    id: 3,
    title: "[문제 3] 다음은 방역 물질 A, B와 병원체의 상호작용 특성 ㉠, ㉡의 유무를 나타낸 표이다. A, B는 각각 비누와 70% 에탄올 중 하나이고, ㉠, ㉡은 각각 '분산력 작용', '수소 결합 교란', '미셀 형성' 중 하나이다.",
    visual: (
      <div className="my-4">
        <table className="text-center border-collapse text-sm bg-black text-white w-full max-w-md">
          <thead>
            <tr>
              <th className="border border-gray-600 p-2">물질</th>
              <th className="border border-gray-600 p-2">㉠</th>
              <th className="border border-gray-600 p-2">㉡</th>
              <th className="border border-gray-600 p-2">방역 후 사체 잔류 여부</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-600 p-2">A</td>
              <td className="border border-gray-600 p-2">O</td>
              <td className="border border-gray-600 p-2">?</td>
              <td className="border border-gray-600 p-2">잔류함</td>
            </tr>
            <tr>
              <td className="border border-gray-600 p-2">B</td>
              <td className="border border-gray-600 p-2">X</td>
              <td className="border border-gray-600 p-2">O</td>
              <td className="border border-gray-600 p-2">?</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    bogi: [
      "ㄱ. ㉡은 '수소 결합 교란'이다.",
      "ㄴ. B의 분자 구조에는 수용액 상태에서 무극성 용매와 상호작용하는 부위가 존재한다.",
      "ㄷ. 땀이 범벅된 손에 A를 도포할 경우, ㉠ 작용으로 인해 병원체의 생존율이 급감한다."
    ],
    options: ["① ㄱ", "② ㄴ", "③ ㄱ, ㄴ", "④ ㄱ, ㄷ", "⑤ ㄴ, ㄷ"],
    answer: 3
  },
  {
    id: 4,
    title: "[문제 4] 표는 학생 P~R이 각기 다른 초기 수분량(w)을 가진 손에 물질 X 또는 Y를 도포한 실험의 결과이다. X, Y는 각각 에탄올(70%)과 비누 중 하나이며, S1 ~ S3는 최종 세균 생존율이다. (단, P~R은 도포 후 자연 건조 또는 추가 조치를 완료한 상태이다.)",
    visual: (
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-center border-collapse text-sm bg-black text-white">
          <thead>
            <tr>
              <th className="border border-gray-600 p-2">학생</th>
              <th className="border border-gray-600 p-2">손의 초기 상태</th>
              <th className="border border-gray-600 p-2">도포 물질</th>
              <th className="border border-gray-600 p-2">추가 조치</th>
              <th className="border border-gray-600 p-2">생존율</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-600 p-2">P</td>
              <td className="border border-gray-600 p-2">물기가 전혀 없음 (w = 0)</td>
              <td className="border border-gray-600 p-2">X</td>
              <td className="border border-gray-600 p-2">자연 건조</td>
              <td className="border border-gray-600 p-2 text-italic">S₁</td>
            </tr>
            <tr>
              <td className="border border-gray-600 p-2">Q</td>
              <td className="border border-gray-600 p-2">물기가 흥건함 (w = 10)</td>
              <td className="border border-gray-600 p-2">X</td>
              <td className="border border-gray-600 p-2">자연 건조</td>
              <td className="border border-gray-600 p-2 text-italic">S₂</td>
            </tr>
            <tr>
              <td className="border border-gray-600 p-2">R</td>
              <td className="border border-gray-600 p-2">땀과 피지가 많음 (w = 2)</td>
              <td className="border border-gray-600 p-2">Y</td>
              <td className="border border-gray-600 p-2">10초 마찰 후 마른 휴지로 닦음</td>
              <td className="border border-gray-600 p-2 text-italic">S₃</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    bogi: [
      "ㄱ. S1 < S2 이다.",
      "ㄴ. R의 손 표면에서는 Y 분자의 양친매성에 의해 물리적 이탈이 발생했다.",
      "ㄷ. Q의 손에서 방역 효율이 떨어지는 이유는 수분에 의해 X의 농도가 희석되어 임계 미셀 농도 미만으로 떨어졌기 때문이다."
    ],
    options: ["① ㄱ", "② ㄴ", "③ ㄱ, ㄷ", "④ ㄴ, ㄷ", "⑤ ㄱ, ㄴ, ㄷ"],
    answer: 1
  },
  {
    id: 5,
    title: "[문제 5] 그림은 유기물이 존재하는 피부 표면에 물질 P를 도포했을 때 임의의 세 시점 t1, t2, t3에서 측정한 '표면 단백질 응고 두께(d)'와 '세균 생존율(v)'을 순서 없이 나타낸 개형 추론표이다. (단, P는 70% 에탄올이며, 시간의 흐름에 따라 응고 두께는 지속적으로 증가한다. 세균 생존율은 초기 도포 직후 소폭 하락하나 0에 수렴하지 않는다.)",
    visual: (
      <div className="flex flex-col md:flex-row gap-4 my-4">
        <table className="text-center border-collapse text-sm bg-black text-white min-w-[200px]">
          <tbody>
            <tr>
              <th className="border border-gray-600 p-2 text-left bg-gray-900">시간</th>
              <td className="border border-gray-600 p-2 italic">t₁</td>
              <td className="border border-gray-600 p-2 italic">t₂</td>
              <td className="border border-gray-600 p-2 italic">t₃</td>
            </tr>
            <tr>
              <th className="border border-gray-600 p-2 text-left bg-gray-900">응고 두께(d)</th>
              <td className="border border-gray-600 p-2 italic">d₁</td>
              <td className="border border-gray-600 p-2 italic">d₂</td>
              <td className="border border-gray-600 p-2 italic">d₃</td>
            </tr>
            <tr>
              <th className="border border-gray-600 p-2 text-left bg-gray-900">생존율(v)</th>
              <td className="border border-gray-600 p-2 italic">v₁</td>
              <td className="border border-gray-600 p-2 italic">v₂</td>
              <td className="border border-gray-600 p-2 italic">v₃</td>
            </tr>
          </tbody>
        </table>
        <div className="text-sm bg-gray-100 p-3 rounded border border-gray-300">
          <strong>[조건]</strong><br />
          1. t1, t2, t3는 도포 후 경과 시간 T1, T2, T3 (T1 {'<'} T2 {'<'} T3)를 순서 없이 나타낸 것이다.<br />
          2. 응고 두께는 d2가 d1, d2, d3 중 최댓값이다.<br />
          3. 생존율은 v3 {'>'} v1 이다.
        </div>
      </div>
    ),
    bogi: [
      "ㄱ. 이 실험에서 실제 시간의 흐름은 t3 -> t1 -> t2 순서이다.",
      "ㄴ. d가 형성되고 시간이 지날수록 두꺼워지는 주된 화학적 원인은, P 분자의 소수성 꼬리가 유기물 내부로 침투하여 분산력을 작용시켰기 때문이다.",
      "ㄷ. t2 시점에서 v2가 0에 수렴하지 않고 높은 수치를 유지하는 이유는, d가 P의 병원체 침투를 막는 현상이 발생했기 때문이다."
    ],
    options: ["① ㄱ", "② ㄷ", "③ ㄱ, ㄴ", "④ ㄱ, ㄷ", "⑤ ㄴ, ㄷ"],
    answer: 4
  },
  {
    id: 6,
    title: "[문제 6] 다음은 방역 물질 (가)~(다)의 특성을 벤 다이어그램으로 나타낸 것이다. (가)~(다)는 각각 70% 에탄올, 100% 에탄올, 비누 중 하나이다.\n\n• 조건 1: '세균 표면의 수분을 급격히 탈취하여 방어막 붕괴를 지연시킴'은 a에 속한다.\n• 조건 2: '물 분자가 방역 기전의 핵심 촉매로 작용함'은 b+c에 속한다.",
    visual: (
      <div className="flex justify-center my-4">
        <svg viewBox="0 0 240 220" className="w-56 h-auto bg-white border border-gray-200 p-2">
          {/* 가 */}
          <circle cx="85" cy="85" r="60" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="30" y="40" fontSize="14" fontWeight="bold">가</text>
          {/* 나 */}
          <circle cx="155" cy="85" r="60" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="195" y="40" fontSize="14" fontWeight="bold">나</text>
          {/* 다 */}
          <circle cx="120" cy="145" r="60" fill="none" stroke="black" strokeWidth="1.5" />
          <text x="160" y="210" fontSize="14" fontWeight="bold">다</text>
          
          {/* Labels */}
          <text x="65" y="80" fontSize="14">a</text>
          <text x="115" y="80" fontSize="14">b</text>
          <text x="165" y="80" fontSize="14">?</text>
          <text x="115" y="115" fontSize="14">c</text>
          <text x="85" y="135" fontSize="14">?</text>
          <text x="145" y="135" fontSize="14">d</text>
        </svg>
      </div>
    ),
    bogi: [
      "ㄱ. (가)는 100% 에탄올이다.",
      "ㄴ. '유기물 표면에서 캡슐화 역효과를 유발할 수 있음'은 (나)만의 고유 영역에 속한다.",
      "ㄷ. '열역학적으로 엔트로피가 증가하는 방향으로 자발적 미셀을 형성함'은 (다)만의 고유 영역에 속한다. (단, (다)는 양친매성 분자이다.)"
    ],
    options: ["① ㄱ", "② ㄴ", "③ ㄱ, ㄷ", "④ ㄴ, ㄷ", "⑤ ㄱ, ㄴ, ㄷ"],
    answer: 1
  },
  {
    id: 7,
    title: "[문제 7] 표는 4개의 통제된 배양 접시(I~IV)에 대장균을 배양한 후, 변인을 조작하여 방역을 수행한 결과이다.",
    visual: (
      <div className="flex flex-col gap-2 my-4">
        <table className="w-full text-center border-collapse text-sm bg-black text-white">
          <thead>
            <tr>
              <th className="border border-gray-600 p-2">접시</th>
              <th className="border border-gray-600 p-2">인공 피지(유기물) 첨가 여부</th>
              <th className="border border-gray-600 p-2">처리 물질</th>
              <th className="border border-gray-600 p-2">물 세정 유무</th>
              <th className="border border-gray-600 p-2">최종 잔류 세균 수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-600 p-2">I</td>
              <td className="border border-gray-600 p-2">X</td>
              <td className="border border-gray-600 p-2 italic">P</td>
              <td className="border border-gray-600 p-2">X</td>
              <td className="border border-gray-600 p-2">0</td>
            </tr>
            <tr>
              <td className="border border-gray-600 p-2">II</td>
              <td className="border border-gray-600 p-2">O</td>
              <td className="border border-gray-600 p-2 italic">P</td>
              <td className="border border-gray-600 p-2">X</td>
              <td className="border border-gray-600 p-2 italic">N₁</td>
            </tr>
            <tr>
              <td className="border border-gray-600 p-2">III</td>
              <td className="border border-gray-600 p-2">O</td>
              <td className="border border-gray-600 p-2 italic">Q</td>
              <td className="border border-gray-600 p-2">O</td>
              <td className="border border-gray-600 p-2">0</td>
            </tr>
            <tr>
              <td className="border border-gray-600 p-2">IV</td>
              <td className="border border-gray-600 p-2">O</td>
              <td className="border border-gray-600 p-2 italic">Q</td>
              <td className="border border-gray-600 p-2">X</td>
              <td className="border border-gray-600 p-2 italic">N₂</td>
            </tr>
          </tbody>
        </table>
        <div className="text-sm text-gray-600 italic">
          (단, P, Q는 각각 70% 에탄올과 비누 중 하나이며, N1과 N2는 0보다 큰 양수이다.)
        </div>
      </div>
    ),
    bogi: [
      "ㄱ. P는 비누이다.",
      "ㄴ. II에서 N1 > 0 인 이유는 P의 펩타이드 결합을 끊는 능력이 인공 피지에 의해 억제되었기 때문이다.",
      "ㄷ. IV에서 N2 > 0 인 이유는 미셀 구조가 형성되었음에도 불구하고 물리적 이탈의 동력이 부족했기 때문이다."
    ],
    options: ["① ㄱ", "② ㄷ", "③ ㄱ, ㄴ", "④ ㄱ, ㄷ", "⑤ ㄴ, ㄷ"],
    answer: 2
  },
  {
    id: 8,
    title: "[문제 8] 그림은 미세 구조 단위에서 세 가지 분자 간 상호작용 (a), (b), (c)를 모식화한 것이다.\n\n(a) 에탄올의 -OH 기와 세균 단백질 사이의 결합 교란\n(b) 비누의 소수성 꼬리와 유기물(지방) 사이의 결합\n(c) 비누의 친수성 머리와 흐르는 물 사이의 결합",
    visual: null,
    bogi: [
      "ㄱ. (a) 과정에서 주로 파괴되는 것은 단백질의 무극성 공유 결합이다.",
      "ㄴ. (b)에서 작용하는 주된 힘은 '분산력'이다.",
      "ㄷ. 방역이 완벽히 성공하기 위해서는 유분이 많은 환경에서는 (b)와 (c)가 순차적으로 일어나야 하고, 유분이 없는 환경에서는 (a) 단독 작용만으로도 충분하다."
    ],
    options: ["① ㄱ", "② ㄴ", "③ ㄱ, ㄷ", "④ ㄴ, ㄷ", "⑤ ㄱ, ㄴ, ㄷ"],
    answer: 4
  },
  {
    id: 9,
    title: "[문제 9] 표는 교내 4개 구역의 특성과 방역 물질 X, Y의 매칭 적합도를 상대적 점수로 나타낸 것이다.",
    visual: (
      <div className="my-4 overflow-x-auto">
        <table className="w-full max-w-lg text-center border-collapse text-sm bg-black text-white">
          <thead>
            <tr>
              <th className="border border-gray-600 p-2">구역 특성</th>
              <th className="border border-gray-600 p-2">X 단독 도포</th>
              <th className="border border-gray-600 p-2">Y 단독 도포 및 세정</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-600 p-2 font-bold">Z1 (접촉성 건조 오염)</td>
              <td className="border border-gray-600 p-2">100</td>
              <td className="border border-gray-600 p-2">100</td>
            </tr>
            <tr>
              <td className="border border-gray-600 p-2 font-bold">Z2 (기름진 식사 후)</td>
              <td className="border border-gray-600 p-2">0</td>
              <td className="border border-gray-600 p-2">100</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    bogi: [
      "ㄱ. Z2에서 X의 적합도가 0인 가장 큰 이유는 X의 양친매성 부재로 인한 용해력 결여 및 캡슐화 역효과 때문이다.",
      "ㄴ. Z1에서 Y의 적합도가 100인 이유는 Y가 병원체의 단백질 구조를 즉각적으로 변성시켰기 때문이다.",
      "ㄷ. 만약 X와 Y를 혼합하여 Z2에 도포할 경우, 방역 효율은 100점 이상으로 상승할 것이다."
    ],
    options: ["① ㄱ", "② ㄷ", "③ ㄱ, ㄴ", "④ ㄱ, ㄷ", "⑤ ㄴ, ㄷ"],
    answer: 1
  },
  {
    id: 10,
    title: "[문제 10] 다음은 미지의 화학 물질 M의 수용액 내 농도(C)에 따른 병원체 표면 상호작용 데이터이다.\n\n(조건 1) C < C1 일 때: 수용액 표면에만 단분자층으로 존재하며 방어막 용해력 없음.\n(조건 2) C >= C1 일 때: 수용액 내부에 구형 구조체를 자발적으로 형성하며 병원체의 방어막을 뜯어냄.",
    visual: null,
    bogi: [
      "ㄱ. C1은 임계 마이셀 농도를 의미하며, M은 계면활성제이다.",
      "ㄴ. C >= C1 상태에서 병원체 방어막이 뜯겨 나가는 과정은 M의 소수성 꼬리가 수용액 내 물 분자와 강한 수소 결합을 형성하기 때문이다.",
      "ㄷ. 유기물이 존재하는 환경에서 M 대신 70% 에탄올을 도포하면 조건 2의 용해 작용을 대체할 수 있다."
    ],
    options: ["① ㄱ", "② ㄴ", "③ ㄱ, ㄷ", "④ ㄴ, ㄷ", "⑤ ㄱ, ㄴ, ㄷ"],
    answer: 1
  },
  {
    id: 11,
    title: "[문제 11] 다음은 교내 방역 로봇의 의사결정 회로도이다.\n\n[입력] 손 표면 스캔 ➔ [조건판별 A] ➔ (YES일 경우) 출력 [결과 1: 물질 X 분사 후 건조] / (NO일 경우) 출력 [결과 2: 물질 Y 도포 후 흐르는 물 세정]\n\n(단, X와 Y는 각각 에탄올과 비누 중 하나이며, 결과 1과 결과 2는 각 상황에서 방역 효율이 최적화된 처방이다.)",
    visual: null,
    bogi: [
      "ㄱ. [조건판별 A]의 기준은 \"표면에 유기물이 존재하는가?\" 이다.",
      "ㄴ. X는 사체를 표면에 잔류시키는 방식을 취한다.",
      "ㄷ. 이 로봇의 알고리즘 상, 건조한 도서관 문손잡이를 만진 학생에게는 [결과 1]이 처방된다."
    ],
    options: ["① ㄱ", "② ㄴ", "③ ㄱ, ㄴ", "④ ㄴ, ㄷ", "⑤ ㄱ, ㄴ, ㄷ"],
    answer: 4
  },
  {
    id: 12,
    title: "[문제 12] 표는 동일한 수의 병원체가 존재하는 피부 표면 (가)와 (나)에 방역 물질 X ~ Z를 각각 단독 처리한 실험 I~IV의 결과이다. (가)와 (나)는 각각 '유기물이 없는 건조한 손'과 '땀과 피지가 많은 손' 중 하나이고, X ~ Z는 각각 70% 에탄올, 100% 에탄올, 계면활성제 중 하나이다. (단, 계면활성제 처리 시 수류 세정이 동반되며, 표의 상대값 최대치는 10이다.)",
    visual: (
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-center border-collapse text-sm bg-black text-white">
          <thead>
            <tr>
              <th className="border border-gray-600 p-2">실험</th>
              <th className="border border-gray-600 p-2">피부 환경</th>
              <th className="border border-gray-600 p-2">처리 물질</th>
              <th className="border border-gray-600 p-2">방역 성공률(상대값)</th>
              <th className="border border-gray-600 p-2">피부 잔류 DNA 총량(상대값)</th>
              <th className="border border-gray-600 p-2">표면 단백질</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-600 p-2">I</td>
              <td className="border border-gray-600 p-2">(가)</td>
              <td className="border border-gray-600 p-2 italic">X</td>
              <td className="border border-gray-600 p-2">10</td>
              <td className="border border-gray-600 p-2">0</td>
              <td className="border border-gray-600 p-2">0</td>
            </tr>
            <tr>
              <td className="border border-gray-600 p-2">II</td>
              <td className="border border-gray-600 p-2">(가)</td>
              <td className="border border-gray-600 p-2 italic">Y</td>
              <td className="border border-gray-600 p-2">10</td>
              <td className="border border-gray-600 p-2">10</td>
              <td className="border border-gray-600 p-2 italic">a</td>
            </tr>
            <tr>
              <td className="border border-gray-600 p-2">III</td>
              <td className="border border-gray-600 p-2">(나)</td>
              <td className="border border-gray-600 p-2 italic">Y</td>
              <td className="border border-gray-600 p-2">2</td>
              <td className="border border-gray-600 p-2">10</td>
              <td className="border border-gray-600 p-2">5</td>
            </tr>
            <tr>
              <td className="border border-gray-600 p-2">IV</td>
              <td className="border border-gray-600 p-2">(나)</td>
              <td className="border border-gray-600 p-2 italic">Z</td>
              <td className="border border-gray-600 p-2">0</td>
              <td className="border border-gray-600 p-2">10</td>
              <td className="border border-gray-600 p-2">10</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    bogi: [
      "ㄱ. X는 분자 내에 친수성 부위와 소수성 부위를 모두 가지며, IV에서 방역 성공률이 0인 원인은 수분 결핍에 의한 표면 단백질의 급격한 응고이다.",
      "ㄴ. a > 5 이다.",
      "ㄷ. III에서 관측된 표면 단백질의 주된 출처는 병원체 자체의 지질막 구조물이다."
    ],
    options: ["① ㄱ", "② ㄷ", "③ ㄱ, ㄴ", "④ ㄱ, ㄷ", "⑤ ㄴ, ㄷ"],
    answer: 1
  }
];

// --- [모의 데이터] 문항별 글로벌 통계 (정답률) ---
const globalStats = {
  1: { correct: 450, total: 1000 },
  2: { correct: 720, total: 1000 },
  3: { correct: 610, total: 1000 },
  4: { correct: 580, total: 1000 },
  5: { correct: 310, total: 1000 },
  6: { correct: 490, total: 1000 },
  7: { correct: 820, total: 1000 },
  8: { correct: 540, total: 1000 },
  9: { correct: 750, total: 1000 },
  10: { correct: 880, total: 1000 },
  11: { correct: 670, total: 1000 },
  12: { correct: 220, total: 1000 },
};

// --- [React 컴포넌트] ---
export default function ExamApp() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (questionId, optionIndex) => {
    if (submitted) return;
    setAnswers({ ...answers, [questionId]: optionIndex + 1 });
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questionsData.length) {
      if (!window.confirm("아직 풀지 않은 문제가 있습니다. 정말 제출하시겠습니까?")) {
        return;
      }
    }
    
    let currentScore = 0;
    questionsData.forEach(q => {
      if (answers[q.id] === q.answer) {
        currentScore += 100 / questionsData.length;
      }
    });
    setScore(Math.round(currentScore));
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  const resetExam = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden border border-gray-300">
        
        {/* 헤더 */}
        <div className="bg-blue-900 text-white p-6 text-center border-b-4 border-blue-700">
          <h1 className="text-3xl font-extrabold tracking-tight">화학/생명과학 융합 방역 모의고사</h1>
          <p className="mt-2 text-blue-200">총 12문항 | 화학적 매커니즘 및 방역 물질 특성 평가</p>
        </div>

        {/* 결과 대시보드 (제출 시 렌더링) */}
        {submitted ? (
          <div className="p-8 bg-blue-50 border-b border-blue-200">
            <h2 className="text-2xl font-bold text-center mb-6 text-blue-900">시험 결과 및 문항 분석</h2>
            <div className="text-center mb-8">
              <div className="text-5xl font-black text-blue-600 mb-2">{score}점</div>
              <p className="text-gray-600 font-medium">수고하셨습니다. 아래에서 오답 및 전체 정답률을 확인하세요.</p>
            </div>

            <div className="space-y-4">
              {questionsData.map((q) => {
                const isCorrect = answers[q.id] === q.answer;
                const stat = globalStats[q.id];
                const accuracyRate = Math.round((stat.correct / stat.total) * 100);

                return (
                  <div key={`result-${q.id}`} className={`p-4 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} flex flex-col md:flex-row items-center justify-between`}>
                    <div className="flex-1 mb-4 md:mb-0">
                      <h3 className="font-bold text-lg mb-1">
                        {isCorrect ? '✅' : '❌'} 문항 {q.id}
                      </h3>
                      <p className="text-sm text-gray-700">내 답: {answers[q.id] ? `${answers[q.id]}번` : '미응답'} | 정답: {q.answer}번</p>
                    </div>
                    
                    {/* 정답률 프로그레스 바 */}
                    <div className="w-full md:w-1/2 bg-white p-3 rounded shadow-sm border border-gray-200">
                      <div className="flex justify-between text-xs mb-1 font-bold">
                        <span className="text-gray-600">전체 정답률</span>
                        <span className={accuracyRate < 40 ? 'text-red-500' : 'text-blue-600'}>{accuracyRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className={`h-2.5 rounded-full ${accuracyRate < 40 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${accuracyRate}%` }}></div>
                      </div>
                      <div className="text-right text-[10px] text-gray-400 mt-1">{stat.total}명 참여</div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 text-center">
              <button onClick={resetExam} className="px-8 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition">
                다시 풀기
              </button>
            </div>
          </div>
        ) : null}

        {/* 문제지 영역 */}
        <div className="p-4 md:p-8 space-y-12">
          {questionsData.map((q) => (
            <div key={q.id} className="border-b-2 border-gray-200 pb-8 last:border-0">
              {/* 문제 텍스트 */}
              <div className="text-lg font-bold leading-relaxed mb-4 whitespace-pre-wrap">
                {q.title}
              </div>

              {/* 시각 자료 (표, 그래프) */}
              {q.visual && (
                <div className="my-6">
                  {q.visual}
                </div>
              )}

              {/* <보기> 박스 */}
              {q.bogi && q.bogi.length > 0 && (
                <div className="border-2 border-gray-800 p-4 mb-6 bg-white rounded-sm">
                  <div className="font-bold mb-2">{"<보기>"}</div>
                  {q.bogi.map((item, idx) => (
                    <div key={idx} className="mb-1 text-base leading-relaxed">{item}</div>
                  ))}
                </div>
              )}

              {/* 선지 선택 */}
              <div className="flex flex-wrap gap-4 mt-4">
                {q.options.map((opt, idx) => (
                  <label 
                    key={idx} 
                    className={`flex items-center space-x-2 cursor-pointer p-2 rounded transition-colors ${answers[q.id] === idx + 1 ? 'bg-blue-100 font-bold' : 'hover:bg-gray-100'}`}
                  >
                    <input 
                      type="radio" 
                      name={`question-${q.id}`} 
                      value={idx + 1}
                      checked={answers[q.id] === idx + 1}
                      onChange={() => handleSelect(q.id, idx)}
                      disabled={submitted}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 하단 컨트롤 */}
        {!submitted && (
          <div className="bg-gray-50 border-t border-gray-200 p-6 flex justify-between items-center sticky bottom-0">
            <div className="text-sm font-bold text-gray-600">
              진행률: {Object.keys(answers).length} / {questionsData.length}
            </div>
            <button 
              onClick={handleSubmit} 
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded shadow-lg transition-transform transform hover:scale-105"
            >
              답안지 제출 및 채점
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
