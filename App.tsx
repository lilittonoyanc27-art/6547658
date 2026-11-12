/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Eye, 
  ChevronRight, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Languages, 
  Sparkles,
  Trophy,
  Play,
  HelpCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

export interface PasapalabraQuestion {
  id: number;
  letter: string;
  type: 'starts' | 'contains';
  typeLabelEs: string;
  typeLabelAm: string;
  questionEs: string;
  questionAm: string;
  answerEs: string;
  answerAm: string;
  categoryEs: string;
  categoryAm: string;
  acceptableAnswers?: string[];
}

export const PASAPALABRA_QUESTIONS: PasapalabraQuestion[] = [
  {
    id: 1,
    letter: 'A',
    type: 'starts',
    typeLabelEs: 'Empieza por A',
    typeLabelAm: 'Սկսվում է A տառով',
    questionEs: '¿Qué planta grande tiene raíces, un tronco, ramas y hojas, y puede vivir muchos años?',
    questionAm: 'Ո՞ր մեծ բույսն ունի արմատներ, բուն, ճյուղեր և տերևներ ու կարող է ապրել երկար տարիներ։',
    answerEs: 'Árbol',
    answerAm: 'Ծառ',
    categoryEs: 'Naturaleza',
    categoryAm: 'Բնություն',
    acceptableAnswers: ['arbol', 'árbol']
  },
  {
    id: 2,
    letter: 'B',
    type: 'starts',
    typeLabelEs: 'Empieza por B',
    typeLabelAm: 'Սկսվում է B տառով',
    questionEs: '¿Qué objeto necesitas comprar para poder entrar al cine, viajar en autobús o asistir a un partido?',
    questionAm: 'Ի՞նչ պետք է գնել կինոթատրոն մտնելու, ավտոբուսով ճանապարհորդելու կամ ֆուտբոլային հանդիպմանը մասնակցելու համար։',
    answerEs: 'Billete',
    answerAm: 'Տոմս',
    categoryEs: 'Cosas cotidianas',
    categoryAm: 'Առօրյա իրեր',
    acceptableAnswers: ['billete', 'boleto', 'entrada']
  },
  {
    id: 3,
    letter: 'C',
    type: 'starts',
    typeLabelEs: 'Empieza por C',
    typeLabelAm: 'Սկսվում է C տառով',
    questionEs: '¿Qué objeto usamos para abrir una puerta que está cerrada con llave?',
    questionAm: 'Ի՞նչ առարկա ենք օգտագործում բանալիով կողպված դուռը բացելու համար։',
    answerEs: 'Cerradura',
    answerAm: 'Կողպեք',
    categoryEs: 'Hogar',
    categoryAm: 'Տուն և առարկաներ',
    acceptableAnswers: ['cerradura', 'candado']
  },
  {
    id: 4,
    letter: 'D',
    type: 'starts',
    typeLabelEs: 'Empieza por D',
    typeLabelAm: 'Սկսվում է D տառով',
    questionEs: '¿Qué parte de la mano usamos para señalar algo, escribir en el móvil o contar números?',
    questionAm: 'Ձեռքի ո՞ր մասն ենք օգտագործում ինչ-որ բան ցույց տալու, հեռախոսով գրելու կամ թվերը հաշվելու համար։',
    answerEs: 'Dedo',
    answerAm: 'Մատ',
    categoryEs: 'Cuerpo humano',
    categoryAm: 'Մարդու մարմին',
    acceptableAnswers: ['dedo', 'dedos']
  },
  {
    id: 5,
    letter: 'E',
    type: 'starts',
    typeLabelEs: 'Empieza por E',
    typeLabelAm: 'Սկսվում է E տառով',
    questionEs: '¿Qué animal pequeño tiene el cuerpo cubierto de púas y se hace una bola cuando tiene miedo?',
    questionAm: 'Ո՞ր փոքրիկ կենդանու մարմինը պատված է փշերով, և որը վախենալիս կծկվում է ու դառնում գնդակի նման։',
    answerEs: 'Erizo',
    answerAm: 'Ոզնի',
    categoryEs: 'Animales',
    categoryAm: 'Կենդանիներ',
    acceptableAnswers: ['erizo']
  },
  {
    id: 6,
    letter: 'F',
    type: 'starts',
    typeLabelEs: 'Empieza por F',
    typeLabelAm: 'Սկսվում է F տառով',
    questionEs: '¿Qué parte de la cara está encima de los ojos y debajo del pelo?',
    questionAm: 'Դեմքի ո՞ր մասն է գտնվում աչքերից վերև և մազերից ներքև։',
    answerEs: 'Frente',
    answerAm: 'Ճակատ',
    categoryEs: 'Cuerpo humano',
    categoryAm: 'Մարդու մարմին',
    acceptableAnswers: ['frente']
  },
  {
    id: 7,
    letter: 'G',
    type: 'starts',
    typeLabelEs: 'Empieza por G',
    typeLabelAm: 'Սկսվում է G տառով',
    questionEs: '¿Qué animal doméstico maúlla, tiene bigotes y suele perseguir ratones?',
    questionAm: 'Ո՞ր ընտանի կենդանին է մլավում, ունի բեղիկներ և հաճախ հետապնդում է մկներին։',
    answerEs: 'Gato',
    answerAm: 'Կատու',
    categoryEs: 'Animales',
    categoryAm: 'Կենդանիներ',
    acceptableAnswers: ['gato', 'gata']
  },
  {
    id: 8,
    letter: 'H',
    type: 'starts',
    typeLabelEs: 'Empieza por H',
    typeLabelAm: 'Սկսվում է H տառով',
    questionEs: '¿Qué utilizamos para hacer pan, pasteles y galletas?',
    questionAm: 'Ի՞նչ ենք օգտագործում հաց, տորթեր և թխվածքաբլիթներ պատրաստելու համար։',
    answerEs: 'Harina',
    answerAm: 'Ալյուր',
    categoryEs: 'Comida',
    categoryAm: 'Սնունդ',
    acceptableAnswers: ['harina']
  },
  {
    id: 9,
    letter: 'I',
    type: 'starts',
    typeLabelEs: 'Empieza por I',
    typeLabelAm: 'Սկսվում է I տառով',
    questionEs: '¿Qué lugar está rodeado de agua por todas partes?',
    questionAm: 'Ո՞ր ցամաքային տարածքն է բոլոր կողմերից շրջապատված ջրով։',
    answerEs: 'Isla',
    answerAm: 'Կղզի',
    categoryEs: 'Geografía',
    categoryAm: 'Աշխարհագրություն',
    acceptableAnswers: ['isla']
  },
  {
    id: 10,
    letter: 'J',
    type: 'starts',
    typeLabelEs: 'Empieza por J',
    typeLabelAm: 'Սկսվում է J տառով',
    questionEs: '¿Qué animal tiene el cuello muy largo y puede comer hojas de los árboles altos?',
    questionAm: 'Ո՞ր կենդանին ունի շատ երկար պարանոց և կարող է ուտել բարձր ծառերի տերևները։',
    answerEs: 'Jirafa',
    answerAm: 'Ընձուղտ',
    categoryEs: 'Animales',
    categoryAm: 'Կենդանիներ',
    acceptableAnswers: ['jirafa']
  },
  {
    id: 11,
    letter: 'K',
    type: 'starts',
    typeLabelEs: 'Empieza por K',
    typeLabelAm: 'Սկսվում է K տառով',
    questionEs: '¿Qué unidad de medida se utiliza para expresar la potencia de los motores y equivale a mil vatios?',
    questionAm: 'Չափման ո՞ր միավորն են օգտագործում շարժիչների հզորությունը նշելու համար, և որը հավասար է հազար վատտի։',
    answerEs: 'Kilovatio',
    answerAm: 'Կիլովատ',
    categoryEs: 'Ciencia y Técnica',
    categoryAm: 'Գիտություն և տեխնիկա',
    acceptableAnswers: ['kilovatio', 'kilowatt']
  },
  {
    id: 12,
    letter: 'L',
    type: 'starts',
    typeLabelEs: 'Empieza por L',
    typeLabelAm: 'Սկսվում է L տառով',
    questionEs: '¿Qué objeto utilizamos para escribir o dibujar y podemos borrar con una goma?',
    questionAm: 'Ի՞նչ առարկա ենք օգտագործում գրելու կամ նկարելու համար, և որը կարող ենք ջնջել ռետինով։',
    answerEs: 'Lápiz',
    answerAm: 'Մատիտ',
    categoryEs: 'Educación y Arte',
    categoryAm: 'Կրթություն և արվեստ',
    acceptableAnswers: ['lapiz', 'lápiz']
  },
  {
    id: 13,
    letter: 'M',
    type: 'starts',
    typeLabelEs: 'Empieza por M',
    typeLabelAm: 'Սկսվում է M տառով',
    questionEs: '¿Qué objeto utilizamos para escuchar música, hablar por teléfono o grabar nuestra voz?',
    questionAm: 'Ի՞նչ սարք ենք օգտագործում մեր ձայնը ձայնագրելու կամ հեռախոսով խոսելու ժամանակ։',
    answerEs: 'Micrófono',
    answerAm: 'Խոսափող',
    categoryEs: 'Tecnología',
    categoryAm: 'Տեխնոլոգիա',
    acceptableAnswers: ['microfono', 'micrófono']
  },
  {
    id: 14,
    letter: 'N',
    type: 'starts',
    typeLabelEs: 'Empieza por N',
    typeLabelAm: 'Սկսվում է N տառով',
    questionEs: '¿Qué aparece en el cielo cuando pequeñas gotas de agua o cristales de hielo se agrupan en la atmósfera?',
    questionAm: 'Ի՞նչ է առաջանում երկնքում, երբ ջրի մանր կաթիլները կամ սառույցի բյուրեղները կուտակվում են մթնոլորտում։',
    answerEs: 'Nube',
    answerAm: 'Ամպ',
    categoryEs: 'Naturaleza',
    categoryAm: 'Բնություն',
    acceptableAnswers: ['nube', 'nubes']
  },
  {
    id: 15,
    letter: 'Ñ',
    type: 'contains',
    typeLabelEs: 'Contiene la Ñ',
    typeLabelAm: 'Պարունակում է Ñ տառը',
    questionEs: '¿Qué objeto usamos en el baño para lavarnos y que tiene un grifo?',
    questionAm: 'Ի՞նչ առարկա ենք օգտագործում լոգարանում լվացվելու համար, որն ունի ծորակ։',
    answerEs: 'Bañera',
    answerAm: 'Լոգարան',
    categoryEs: 'Hogar',
    categoryAm: 'Տուն և առօրյա',
    acceptableAnswers: ['banera', 'bañera']
  },
  {
    id: 16,
    letter: 'O',
    type: 'starts',
    typeLabelEs: 'Empieza por O',
    typeLabelAm: 'Սկսվում է O տառով',
    questionEs: '¿Qué metal precioso de color amarillo se utiliza para fabricar joyas, anillos y monedas?',
    questionAm: 'Ո՞ր դեղին գույնի թանկարժեք մետաղն են օգտագործում զարդեր, մատանիներ և մետաղադրամներ պատրաստելու համար։',
    answerEs: 'Oro',
    answerAm: 'Ոսկի',
    categoryEs: 'Minerales',
    categoryAm: 'Միներալներ և հարստություն',
    acceptableAnswers: ['oro']
  },
  {
    id: 17,
    letter: 'P',
    type: 'starts',
    typeLabelEs: 'Empieza por P',
    typeLabelAm: 'Սկսվում է P տառով',
    questionEs: '¿Qué fruta tiene una piel fina, puede ser verde o amarilla y tiene una forma alargada y redondeada?',
    questionAm: 'Ո՞ր միրգն ունի բարակ կեղև, կարող է լինել կանաչ կամ դեղին և ունի երկարավուն, կլորավուն ձև։',
    answerEs: 'Pera',
    answerAm: 'Տանձ',
    categoryEs: 'Comida',
    categoryAm: 'Սնունդ և մրգեր',
    acceptableAnswers: ['pera']
  },
  {
    id: 18,
    letter: 'Q',
    type: 'starts',
    typeLabelEs: 'Empieza por Q',
    typeLabelAm: 'Սկսվում է Q տառով',
    questionEs: '¿Qué número viene después del quinientos y antes del quinientos dos?',
    questionAm: 'Ո՞ր թիվն է գալիս հինգ հարյուրից հետո և հինգ հարյուր երկուսից առաջ։',
    answerEs: 'Quinientos uno',
    answerAm: 'Հինգ հարյուր մեկ',
    categoryEs: 'Matemáticas',
    categoryAm: 'Մաթեմատիկա',
    acceptableAnswers: ['quinientos uno', '501', 'quinientos 1']
  },
  {
    id: 19,
    letter: 'R',
    type: 'contains',
    typeLabelEs: 'Contiene la R',
    typeLabelAm: 'Պարունակում է R տառը',
    questionEs: '¿Qué objeto tiene dos ruedas, un manillar y un motor, y se usa para viajar por carretera?',
    questionAm: 'Ո՞ր տրանսպորտային միջոցն ունի երկու անիվ, ղեկ և շարժիչ, և օգտագործվում է ճանապարհով երթևեկելու համար։',
    answerEs: 'Motor',
    answerAm: 'Շարժիչ',
    categoryEs: 'Vehículos',
    categoryAm: 'Տրանսպորտ',
    acceptableAnswers: ['motor', 'moto', 'motocicleta']
  },
  {
    id: 20,
    letter: 'S',
    type: 'starts',
    typeLabelEs: 'Empieza por S',
    typeLabelAm: 'Սկսվում է S տառով',
    questionEs: '¿Qué alimento líquido se come con cuchara y suele prepararse con verduras, carne o fideos?',
    questionAm: 'Ո՞ր հեղուկ ուտեստն են ուտում գդալով և սովորաբար պատրաստում բանջարեղենով, մսով կամ արիշտայով։',
    answerEs: 'Sopa',
    answerAm: 'Ապուր',
    categoryEs: 'Comida',
    categoryAm: 'Սնունդ',
    acceptableAnswers: ['sopa']
  },
  {
    id: 21,
    letter: 'T',
    type: 'starts',
    typeLabelEs: 'Empieza por T',
    typeLabelAm: 'Սկսվում է T տառով',
    questionEs: '¿Qué vehículo viaja sobre raíles y transporta pasajeros entre ciudades?',
    questionAm: 'Ո՞ր տրանսպորտային միջոցն է շարժվում ռելսերով և ուղևորներ տեղափոխում քաղաքների միջև։',
    answerEs: 'Tren',
    answerAm: 'Գնացք',
    categoryEs: 'Viajes',
    categoryAm: 'Ճանապարհորդություն',
    acceptableAnswers: ['tren']
  },
  {
    id: 22,
    letter: 'U',
    type: 'starts',
    typeLabelEs: 'Empieza por U',
    typeLabelAm: 'Սկսվում է U տառով',
    questionEs: '¿Qué lugar tiene facultades, profesores y estudiantes que se preparan para ejercer una profesión?',
    questionAm: 'Ո՞ր ուսումնական հաստատությունն ունի ֆակուլտետներ, դասախոսներ և ուսանողներ, որոնք պատրաստվում են մասնագիտություն ձեռք բերել։',
    answerEs: 'Universidad',
    answerAm: 'Համալսարան',
    categoryEs: 'Educación',
    categoryAm: 'Կրթություն',
    acceptableAnswers: ['universidad']
  },
  {
    id: 23,
    letter: 'V',
    type: 'starts',
    typeLabelEs: 'Empieza por V',
    typeLabelAm: 'Սկսվում է V տառով',
    questionEs: '¿Qué palabra utilizamos para hablar de un desplazamiento de una ciudad o un país a otro?',
    questionAm: 'Ի՞նչ բառ ենք օգտագործում մի քաղաքից կամ երկրից մյուսը մեկնելու մասին խոսելիս։',
    answerEs: 'Viaje',
    answerAm: 'Ճանապարհորդություն',
    categoryEs: 'Viajes',
    categoryAm: 'Ճանապարհորդություն',
    acceptableAnswers: ['viaje']
  },
  {
    id: 24,
    letter: 'W',
    type: 'starts',
    typeLabelEs: 'Empieza por W',
    typeLabelAm: 'Սկսվում է W տառով',
    questionEs: '¿Cómo se llama la conexión inalámbrica que usamos para acceder a Internet?',
    questionAm: 'Ինչպե՞ս է կոչվում անլար կապը, որով միանում ենք ինտերնետին։',
    answerEs: 'Wifi',
    answerAm: 'Վայֆայ',
    categoryEs: 'Tecnología',
    categoryAm: 'Տեխնոլոգիա',
    acceptableAnswers: ['wifi', 'wi-fi']
  },
  {
    id: 25,
    letter: 'X',
    type: 'contains',
    typeLabelEs: 'Contiene la X',
    typeLabelAm: 'Պարունակում է X տառը',
    questionEs: '¿Qué palabra utilizamos cuando algo es exactamente igual a otra cosa, sin ninguna diferencia?',
    questionAm: 'Ի՞նչ բառ ենք օգտագործում, երբ ինչ-որ բան ճիշտ նույնն է, ինչ մյուսը՝ առանց որևէ տարբերության։',
    answerEs: 'Exacto',
    answerAm: 'Ճշգրիտ',
    categoryEs: 'Conceptos',
    categoryAm: 'Հասկացություններ',
    acceptableAnswers: ['exacto', 'exacta']
  },
  {
    id: 26,
    letter: 'Y',
    type: 'starts',
    typeLabelEs: 'Empieza por Y',
    typeLabelAm: 'Սկսվում է Y տառով',
    questionEs: '¿Qué alimento cremoso se hace con leche y se suele comer con frutas o cereales?',
    questionAm: 'Ո՞ր թանձր կաթնամթերքն են հաճախ ուտում մրգերի կամ ձավարեղենի հետ։',
    answerEs: 'Yogur',
    answerAm: 'Յոգուրտ',
    categoryEs: 'Comida',
    categoryAm: 'Սնունդ',
    acceptableAnswers: ['yogur', 'yogurt']
  },
  {
    id: 27,
    letter: 'Z',
    type: 'starts',
    typeLabelEs: 'Empieza por Z',
    typeLabelAm: 'Սկսվում է Z տառով',
    questionEs: '¿Cómo se llama el jugo que se obtiene al exprimir una naranja o un limón?',
    questionAm: 'Ինչպե՞ս է կոչվում այն հյութը, որը ստանում ենք նարինջը կամ կիտրոնը քամելով։',
    answerEs: 'Zumo',
    answerAm: 'Հյութ',
    categoryEs: 'Comida y Bebida',
    categoryAm: 'Սնունդ և ըմպելիք',
    acceptableAnswers: ['zumo', 'jugo']
  }
];

type QuestionStatus = 'pending' | 'correct' | 'wrong' | 'passed';

function normalizeText(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents for lenient checking
    .replace(/[^a-z0-9ñ]/g, "");
}

// Sound effects generator using Web Audio API
class SoundPlayer {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playSuccess() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    const now = this.ctx.currentTime;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
    osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
    osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.start(now);
    osc.stop(now + 0.5);
  }

  playWrong() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    const now = this.ctx.currentTime;
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.setValueAtTime(160, now + 0.15);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  playPass() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    const now = this.ctx.currentTime;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.setValueAtTime(554.37, now + 0.1);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  playPeek() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    const now = this.ctx.currentTime;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.start(now);
    osc.stop(now + 0.2);
  }
}

const sounds = new SoundPlayer();

export default function App() {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'completed'>('ready');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [statuses, setStatuses] = useState<Record<number, QuestionStatus>>(() => {
    const initial: Record<number, QuestionStatus> = {};
    PASAPALABRA_QUESTIONS.forEach((_, idx) => {
      initial[idx] = 'pending';
    });
    return initial;
  });

  const [inputVal, setInputVal] = useState<string>('');
  const [showArmenianTranslation, setShowArmenianTranslation] = useState<boolean>(false);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'wrong' | 'passed' | 'peek' | null; msg: string }>({
    type: null,
    msg: ''
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [seconds, setSeconds] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [lastSubmittedAnswer, setLastSubmittedAnswer] = useState<Record<number, string>>({});

  const inputRef = useRef<HTMLInputElement>(null);

  const handleStartGame = () => {
    sounds.playSuccess();
    setSeconds(0);
    setTimerActive(true);
    setGameState('playing');
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  // Sync sound player mute state
  useEffect(() => {
    sounds.enabled = soundEnabled;
  }, [soundEnabled]);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing' || !timerActive) return;
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState, timerActive]);

  // Focus input automatically whenever current question changes
  useEffect(() => {
    if (gameState === 'playing' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex, gameState]);

  const currentQ = PASAPALABRA_QUESTIONS[currentIndex];

  // Stats calculation
  const totalQuestions = PASAPALABRA_QUESTIONS.length;
  const correctCount = useMemo(() => Object.values(statuses).filter(s => s === 'correct').length, [statuses]);
  const wrongCount = useMemo(() => Object.values(statuses).filter(s => s === 'wrong').length, [statuses]);
  const pendingCount = useMemo(() => Object.values(statuses).filter(s => s === 'pending' || s === 'passed').length, [statuses]);

  // Find next unanswered or passed question
  const getNextAvailableIndex = (fromIndex: number, currentMap: Record<number, QuestionStatus>): number | null => {
    // 1st pass: look from next index to end
    for (let i = fromIndex + 1; i < totalQuestions; i++) {
      if (currentMap[i] === 'pending' || currentMap[i] === 'passed') {
        return i;
      }
    }
    // 2nd pass: wrap around from start to current
    for (let i = 0; i <= fromIndex; i++) {
      if (currentMap[i] === 'pending' || currentMap[i] === 'passed') {
        return i;
      }
    }
    return null;
  };

  const handleNextQuestion = (nextIndex: number | null) => {
    if (nextIndex === null) {
      // Check if all are done
      const remaining = Object.values(statuses).some(s => s === 'pending' || s === 'passed');
      if (!remaining) {
        setGameState('completed');
        setTimerActive(false);
      }
      return;
    }
    setCurrentIndex(nextIndex);
    setInputVal('');
    setShowArmenianTranslation(false);
  };

  // Submit Answer
  const handleCheckAnswer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;

    const normalizedInput = normalizeText(inputVal);
    const normalizedCorrect = normalizeText(currentQ.answerEs);
    const acceptable = (currentQ.acceptableAnswers || [currentQ.answerEs]).map(a => normalizeText(a));

    const isMatch = normalizedInput === normalizedCorrect || acceptable.includes(normalizedInput);

    setLastSubmittedAnswer(prev => ({ ...prev, [currentIndex]: inputVal.trim() }));

    if (isMatch) {
      sounds.playSuccess();
      const nextMap = { ...statuses, [currentIndex]: 'correct' as QuestionStatus };
      setStatuses(nextMap);
      setFeedback({
        type: 'correct',
        msg: `¡Correcto! / Ճիշտ է։ ${currentQ.answerEs} — ${currentQ.answerAm}`
      });

      const next = getNextAvailableIndex(currentIndex, nextMap);
      setTimeout(() => {
        setFeedback({ type: null, msg: '' });
        handleNextQuestion(next);
      }, 700);
    } else {
      sounds.playWrong();
      // Requirement: "если ответ неверный всё равно продолжить играть"
      const nextMap = { ...statuses, [currentIndex]: 'wrong' as QuestionStatus };
      setStatuses(nextMap);
      setFeedback({
        type: 'wrong',
        msg: `No es correcto. ¡Puedes continuar o ver la respuesta! / Սխալ է, բայց կարող ես շարունակել խաղալ։`
      });

      const next = getNextAvailableIndex(currentIndex, nextMap);
      setTimeout(() => {
        setFeedback({ type: null, msg: '' });
        handleNextQuestion(next);
      }, 900);
    }
  };

  // PASAPALABRA (Pass to next turn without marking wrong)
  const handlePasapalabra = () => {
    sounds.playPass();
    const nextMap = {
      ...statuses,
      [currentIndex]: statuses[currentIndex] === 'pending' ? 'passed' : statuses[currentIndex]
    };
    setStatuses(nextMap);
    setFeedback({
      type: 'passed',
      msg: '¡Pasapalabra! Pasamos a la siguiente letra.'
    });

    const next = getNextAvailableIndex(currentIndex, nextMap);
    setTimeout(() => {
      setFeedback({ type: null, msg: '' });
      if (next !== null) {
        handleNextQuestion(next);
      } else {
        // If only this question remains
        setInputVal('');
      }
    }, 450);
  };

  // Requirement: "отдельно кнопка посмотреть ответ но после нажатия на посмотреть ответ пусть ответ не будет сосчитан неверным а просто посмотреть ответ и тоже можно было ответить на этот вопрос"
  const handlePeekAnswer = () => {
    sounds.playPeek();
    setRevealedAnswers(prev => ({
      ...prev,
      [currentIndex]: true
    }));
    setFeedback({
      type: 'peek',
      msg: `Pista: Respuesta correcta: ${currentQ.answerEs} (${currentQ.answerAm}). ¡Escríbela para sumar acierto!`
    });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Reset / Play Again
  const handleRestart = (autoStart: boolean = false) => {
    const initial: Record<number, QuestionStatus> = {};
    PASAPALABRA_QUESTIONS.forEach((_, idx) => {
      initial[idx] = 'pending';
    });
    setStatuses(initial);
    setCurrentIndex(0);
    setInputVal('');
    setShowArmenianTranslation(false);
    setRevealedAnswers({});
    setFeedback({ type: null, msg: '' });
    setSeconds(0);
    if (autoStart) {
      setTimerActive(true);
      setGameState('playing');
    } else {
      setTimerActive(false);
      setGameState('ready');
    }
    setLastSubmittedAnswer({});
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Rosco coordinate calculation for 27 circular letter nodes
  const roscoItems = useMemo(() => {
    return PASAPALABRA_QUESTIONS.map((q, idx) => {
      // 27 points along the circle starting from top (angle = -90 deg)
      const total = PASAPALABRA_QUESTIONS.length;
      const angle = (idx / total) * 2 * Math.PI - Math.PI / 2;
      return {
        ...q,
        index: idx,
        status: statuses[idx],
        isActive: idx === currentIndex,
        angle
      };
    });
  }, [statuses, currentIndex]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navigation Bar: Exhaustive 3-Zone Contract */}
      <header className="flex items-center justify-between gap-8 px-6 py-3.5 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 flex items-center justify-center shadow-lg shadow-blue-500/20 font-display font-black text-white text-lg">
            P
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2">
              PASAPALABRA
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                ES ⇄ AM
              </span>
            </h1>
          </div>
        </div>

        {/* Zone 2: Navigation / Stats Indicators & Timer with Start Button */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs text-slate-300">
          <div className="hidden md:flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-sm shadow-emerald-500/50"></span>
            <span>Aciertos: <strong className="text-white text-sm tabular-nums">{correctCount}</strong></span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shadow-sm shadow-rose-500/50"></span>
            <span>Fallos: <strong className="text-white text-sm tabular-nums">{wrongCount}</strong></span>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block shadow-sm shadow-blue-500/50"></span>
            <span>Restantes: <strong className="text-white text-sm tabular-nums">{pendingCount}</strong></span>
          </div>
          
          {/* Timer and Start/Pause button right next to it */}
          <div className="flex items-center gap-2 sm:pl-3 sm:border-l sm:border-slate-800 bg-slate-800/40 px-2.5 py-1 rounded-xl border border-slate-700/50">
            <Clock className={`w-4 h-4 ${timerActive ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} />
            <span className="font-mono text-sm sm:text-base font-semibold text-white tabular-nums tracking-wide">
              {formatTime(seconds)}
            </span>

            {/* Button right next to time */}
            {!timerActive ? (
              <button
                onClick={handleStartGame}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-95 rounded-lg transition-all shadow-sm shadow-emerald-600/30 cursor-pointer"
                title="Начать игру (запустить время)"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Начать</span>
              </button>
            ) : (
              <button
                onClick={() => setTimerActive(false)}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-amber-300 bg-amber-500/20 hover:bg-amber-500/30 rounded-lg border border-amber-500/30 transition-all cursor-pointer"
                title="Пауза"
              >
                Пауза
              </button>
            )}
          </div>
        </div>

        {/* Zone 3: Primary Action & Audio Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Silenciar sonido' : 'Activar sonido'}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-blue-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>
          <button
            onClick={() => handleRestart(false)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700/80 rounded-lg border border-slate-700/60 transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center">
        {gameState === 'completed' ? (
          /* Victory / Game Over Summary */
          <div className="w-full max-w-2xl bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl text-center backdrop-blur-xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-blue-500 to-amber-500"></div>
            
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-xl shadow-amber-500/10">
              <Trophy className="w-10 h-10" />
            </div>

            <h2 className="text-3xl font-display font-extrabold text-white tracking-tight mb-2">
              ¡Rosco Finalizado!
            </h2>
            <p className="text-slate-400 font-armenian text-base mb-8">
              Դուք ավարտեցիք բոլոր 27 հարցերը։ Ահա ձեր արդյունքը։
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <span className="text-3xl font-display font-black text-emerald-400 tabular-nums">{correctCount}</span>
                <span className="block text-xs font-medium text-emerald-300/80 mt-1">Aciertos / Ճիշտ</span>
              </div>
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center">
                <span className="text-3xl font-display font-black text-rose-400 tabular-nums">{wrongCount}</span>
                <span className="block text-xs font-medium text-rose-300/80 mt-1">Fallos / Սխալ</span>
              </div>
              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center">
                <span className="text-3xl font-display font-black text-blue-400 tabular-nums">{formatTime(seconds)}</span>
                <span className="block text-xs font-medium text-blue-300/80 mt-1">Tiempo / Ժամանակ</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => handleRestart(true)}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                Jugar de nuevo / Խաղալ նորից
              </button>
            </div>
          </div>
        ) : (
          /* Active Playing Layout: Two-Column / Rosco Grid */
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl">
            {/* Left / Center Column: Circular Rosco Wheel */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              {/* Interactive Rosco Component */}
              <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] flex items-center justify-center select-none">
                {/* Center Core HUD of the Rosco */}
                <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-full bg-slate-900/90 border-2 border-slate-800/80 shadow-2xl flex flex-col items-center justify-center text-center p-4 backdrop-blur-md relative z-10">
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-0.5">
                    Letra actual
                  </div>
                  <div className="text-4xl sm:text-5xl font-display font-black text-white bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">
                    {currentQ.letter}
                  </div>
                  <div className="text-[11px] font-medium text-blue-400 mt-1">
                    {currentQ.typeLabelEs}
                  </div>
                  <div className="text-[11px] font-armenian text-slate-400">
                    {currentQ.typeLabelAm}
                  </div>
                </div>

                {/* 27 Circular Rosco Nodes */}
                {roscoItems.map((item) => {
                  // Diameter math: radius ~140px on small screen, ~180px on larger
                  const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 142 : 180;
                  const x = Math.cos(item.angle) * radius;
                  const y = Math.sin(item.angle) * radius;

                  // Dynamic node styling by state
                  let nodeColor = 'bg-blue-600/90 text-white border-blue-400/40 hover:bg-blue-500'; // Default pending blue
                  if (item.status === 'correct') {
                    nodeColor = 'bg-emerald-500 text-white border-emerald-300 shadow-md shadow-emerald-500/30';
                  } else if (item.status === 'wrong') {
                    nodeColor = 'bg-rose-500 text-white border-rose-300 shadow-md shadow-rose-500/30';
                  } else if (item.status === 'passed') {
                    nodeColor = 'bg-amber-500 text-slate-950 font-black border-amber-300 shadow-md shadow-amber-500/30';
                  }

                  const activeClass = item.isActive
                    ? 'ring-4 ring-white ring-offset-2 ring-offset-slate-950 scale-110 z-20 font-black shadow-lg animate-rosco-active'
                    : 'opacity-90 hover:opacity-100 hover:scale-105';

                  return (
                    <button
                      key={item.letter}
                      type="button"
                      onClick={() => {
                        setCurrentIndex(item.index);
                        setShowArmenianTranslation(false);
                      }}
                      title={`${item.letter} — ${item.typeLabelEs} (${item.status})`}
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                      className={`absolute w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-display text-xs sm:text-sm font-bold border cursor-pointer transition-all duration-200 ${nodeColor} ${activeClass}`}
                    >
                      {item.letter}
                    </button>
                  );
                })}
              </div>

              {/* Rosco Legend */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
                  <span>Pendiente</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                  <span>Pasapalabra</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                  <span>Acierto</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
                  <span>Fallo</span>
                </div>
              </div>
            </div>

            {/* Right Column: Question Card & Controls */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
                {/* Question Header & Category */}
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-display font-black text-sm">
                      {currentQ.letter}
                    </span>
                    <div>
                      <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 block">
                        {currentQ.typeLabelEs}
                      </span>
                      <span className="text-[11px] font-armenian text-slate-500">
                        {currentQ.typeLabelAm}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Categoría</span>
                    <span className="text-xs font-medium text-slate-200">
                      {currentQ.categoryEs} · <span className="font-armenian text-slate-400">{currentQ.categoryAm}</span>
                    </span>
                  </div>
                </div>

                {/* Spanish Question (Click to reveal Armenian translation) */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-400/90 flex items-center gap-1.5">
                      🇪🇸 Español
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowArmenianTranslation(!showArmenianTranslation)}
                      className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors px-2 py-0.5 rounded hover:bg-blue-500/10"
                    >
                      <Languages className="w-3.5 h-3.5" />
                      {showArmenianTranslation ? 'Ocultar armenio' : 'Traducir al armenio (🇦🇲)'}
                    </button>
                  </div>

                  {/* Interactive card: Click on Spanish question opens Armenian translation */}
                  <div
                    onClick={() => setShowArmenianTranslation(!showArmenianTranslation)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setShowArmenianTranslation(!showArmenianTranslation);
                      }
                    }}
                    title="Haz clic para ver/ocultar la traducción al armenio"
                    className="p-4 rounded-2xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500/40 cursor-pointer transition-all duration-200 group relative"
                  >
                    <p className="text-lg sm:text-xl font-medium text-white leading-relaxed">
                      {currentQ.questionEs}
                    </p>
                    <div className="mt-2 text-xs text-slate-400 group-hover:text-blue-400 transition-colors flex items-center gap-1">
                      <span>💡 Clic aquí para ver la traducción al armenio</span>
                    </div>
                  </div>
                </div>

                {/* Armenian Translation Box (Toggles upon clicking Spanish or translate button) */}
                {showArmenianTranslation && (
                  <div className="mb-5 p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-100 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-1.5">
                      🇦🇲 Հայերեն թարգմանություն
                    </div>
                    <p className="text-base sm:text-lg font-armenian leading-relaxed text-slate-100">
                      {currentQ.questionAm}
                    </p>
                  </div>
                )}

                {/* Peek Answer Box (if user clicked "Посмотреть ответ") */}
                {revealedAnswers[currentIndex] && (
                  <div className="mb-5 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" />
                        Respuesta correcta / Ճիշտ պատասխան
                      </span>
                      <span className="text-[11px] font-normal normal-case text-amber-300/80">
                        No cuenta como fallo — ¡puedes escribirla!
                      </span>
                    </div>
                    <div className="text-lg font-bold text-white flex items-center gap-2">
                      <span>{currentQ.answerEs}</span>
                      <span className="text-slate-400 font-normal">·</span>
                      <span className="font-armenian text-amber-300">{currentQ.answerAm}</span>
                    </div>
                  </div>
                )}

                {/* Feedback Toast */}
                {feedback.msg && (
                  <div className={`mb-4 p-3 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 animate-in fade-in duration-150 ${
                    feedback.type === 'correct' 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                      : feedback.type === 'wrong'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : feedback.type === 'passed'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  }`}>
                    {feedback.type === 'correct' && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />}
                    {feedback.type === 'wrong' && <XCircle className="w-4 h-4 shrink-0 text-rose-400" />}
                    {feedback.type === 'passed' && <ChevronRight className="w-4 h-4 shrink-0 text-amber-400" />}
                    {feedback.type === 'peek' && <Eye className="w-4 h-4 shrink-0 text-blue-400" />}
                    <span>{feedback.msg}</span>
                  </div>
                )}

                {/* Answer Form */}
                <form onSubmit={handleCheckAnswer} className="space-y-4">
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      placeholder="Escribe tu respuesta aquí en español..."
                      className="w-full px-4 py-3.5 bg-slate-950/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-medium transition-all"
                    />
                    {inputVal && (
                      <button
                        type="button"
                        onClick={() => setInputVal('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs px-2 py-1 rounded"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Buttons Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    {/* Primary Submit Button */}
                    <button
                      type="submit"
                      disabled={!inputVal.trim()}
                      className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-md shadow-blue-600/20 text-sm flex items-center justify-center gap-1.5"
                    >
                      <ArrowRight className="w-4 h-4" />
                      Responder / Պատասխանել
                    </button>

                    {/* Pasapalabra Button */}
                    <button
                      type="button"
                      onClick={handlePasapalabra}
                      className="w-full py-3 px-4 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 font-semibold rounded-xl transition-all text-sm flex items-center justify-center gap-1.5"
                    >
                      <ChevronRight className="w-4 h-4" />
                      Pasapalabra
                    </button>

                    {/* Peek Answer Button */}
                    <button
                      type="button"
                      onClick={handlePeekAnswer}
                      className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700 font-medium rounded-xl transition-all text-sm flex items-center justify-center gap-1.5"
                      title="Ver la respuesta sin marcarla como fallo. Podrás responderla igualmente."
                    >
                      <Eye className="w-4 h-4 text-amber-400" />
                      Посмотреть ответ
                    </button>
                  </div>
                </form>

                {/* Subtext info */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Presiona <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">Enter</kbd> para enviar</span>
                  <span>Pregunta {currentIndex + 1} de {totalQuestions}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-3 px-6 text-center text-xs text-slate-400">
        <span>Pasapalabra 27 preguntas · Español / Հայերեն · Vocabulario y agilidad mental</span>
      </footer>
    </div>
  );
}
