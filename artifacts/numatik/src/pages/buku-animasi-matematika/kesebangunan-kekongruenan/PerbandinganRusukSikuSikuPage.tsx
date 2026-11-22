import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { BookOpen, Lightbulb, Calculator, Target } from "lucide-react";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { pickLang } from "@/lib/pickLang";
import { playPopSound } from "@/hooks/useAudio";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

const id = {
  title: "PERBANDINGAN/RASIO RUSUK-RUSUK SEGITIGA SIKU-SIKU",
  subtitle: "Dengan Konsep Kesebangunan",
  grade: "Kelas 9 · Kesebangunan dan Kekongruenan · Materi Matematika",
  setup: "📐 Setup: Segitiga Siku-siku dengan Garis Tinggi",
  intro: "Pada segitiga siku-siku, jika dari titik sudut siku-siku kita tarik",
  altitude: "garis tinggi ke sisi miring",
  intro2: ", maka segitiga besar terbagi menjadi dua segitiga kecil yang",
  similar: "sebangun satu sama lain",
  intro3: "dan sebangun dengan segitiga besarnya!",
  diagramTitle: "🔍 SEGITIGA ABC SIKU-SIKU DI A, AD GARIS TINGGI:",
  formed: "Dari garis tinggi AD, terbentuk:",
  similarTriangles: "△ABD ~ △CAD ~ △CAB (semuanya saling sebangun!)",
  projectionBase: "📘 (a) Proyeksi Rusuk Alas pada Rusuk Miring",
  projectionVertical: "📘 (b) Proyeksi Rusuk Tegak pada Rusuk Miring",
  altitudeFormula: "📘 (c) Rumus Garis Tinggi △ABC Siku-siku di A",
  sideRelation: "📘 (d) Hubungan Rusuk-rusuk dan Garis Tinggi",
  takeaway: "🎯 Ringkasan Intisari",
  noticeABD: "Perhatikan △ABD dan △CAB. Karena keduanya sebangun:",
  corresponding: "(rusuk bersesuaian sebanding)",
  baseSquare: "Kuadrat rusuk alas = proyeksi alas × sisi miring",
  noticeCDA: "Perhatikan △CDA dan △CAB. Karena keduanya sebangun:",
  verticalSquare: "Kuadrat rusuk tegak = proyeksi tegak × sisi miring",
  noticeAltitude: "Perhatikan △ADB dan △ADC. Keduanya sebangun menghasilkan:",
  altitudeSquare: "Garis tinggi kuadrat = hasil kali dua proyeksi pada sisi miring",
  areaIntro: "Dari dua cara menghitung luas △ABC siku-siku di A:",
  areaWay1: "Cara 1 (alas-tinggi dengan AB dan AC):",
  areaWay2: "Cara 2 (alas-tinggi dengan BC dan AD):",
  equalAreas: "Karena luasnya sama, maka:",
  areaRelation: "alas × tegak = miring × garis tinggi",
  allFormulas: "📊 RANGKUMAN SEMUA RUMUS (△ABC siku-siku di A, AD tinggi ke BC):",
  formula: "Rumus",
  note: "Keterangan",
  baseProjection: "Proyeksi alas",
  verticalProjection: "Proyeksi tegak",
  altitudeLabel: "Garis tinggi",
  relationLabel: "Hubungan rusuk & tinggi",
  examples: "📝 Contoh Soal — Perbandingan Rusuk Siku-siku",
  easy: "MUDAH",
  medium: "SEDANG",
  hard: "SULIT",
  example: "Contoh",
  question1: "Pada gambar berikut, diketahui panjang",
  and: "dan",
  question1End: ".",
  question1Ask: "Panjang",
  question1AskEnd: "berturut-turut adalah . . . .",
  solution: "PEMBAHASAN:",
  ex1Given: "△CAB siku-siku di A, AD ⊥ CB, dengan BD = 3 cm dan CD = 12 cm.",
  step1BC: "Langkah 1 — Cari BC:",
  step2AD: "Langkah 2 — Cari AD (garis tinggi):",
  step3AB: "Langkah 3 — Cari AB:",
  step4AC: "Langkah 4 — Cari AC:",
  ex1Answer: "AD = 6 cm, AB = 3√5 cm, AC = 6√5 cm.",
  ex3Question: "△ABC siku-siku di A, AD ⊥ BC. Diketahui luas △ABD = 54 cm² dan BD = 9 cm. Hitunglah panjang AD, BC, AC, dan luas △ABC!",
  findAD: "(a) Cari AD:",
  findDC: "(b) Cari DC:",
  findBCAC: "(c) Cari BC dan AC:",
  findArea: "(d) Luas △ABC:",
  ex3Answer: "AD = 12 cm, DC = 16 cm, BC = 25 cm, AC = 20 cm, L = 150 cm².",
  summary: "📋 Rangkuman — Perbandingan Rusuk Segitiga Siku-Siku",
  summaryIntro: "Pada segitiga siku-siku ABC (siku-siku di A), dengan garis tinggi AD tegak lurus BC:",
  meaning: "Artinya",
  memory: "Ingatan",
  altitudeMean: "Garis tinggi = rata-rata geometri dua segmen alas",
  middleEnds: "Tengah × dua ujung",
  leftHyp: "Sisi miring kiri² = segmen kiri × seluruh alas",
  leftBase: "Kaki kiri × alas penuh",
  rightHyp: "Sisi miring kanan² = segmen kanan × seluruh alas",
  rightBase: "Kaki kanan × alas penuh",
  threeSimilarTitle: "Tiga segitiga sebangun:",
  threeSimilarText: "△ABC ~ △ABD ~ △ACD (semua memiliki sudut yang sama)",
  pythagorasTitle: "Hubungan dengan Pythagoras:",
  pythagorasText: "Rumus-rumus ini dapat diturunkan dari teorema Pythagoras + kesebangunan segitiga",
  conditionTitle: "Syarat:",
  conditionText: "Garis AD harus tegak lurus (⊥) terhadap BC agar semua rumus berlaku",
  tips: "💡 Tips & Trik — Teknik Air Terjun",
  waterfallTip: "Teknik Air Terjun — ingat pola seperti ini:",
  smallLarge: '⬆ segmen kecil · segmen besar = sisi² yang "terjepit"',
  order: "Urutan langkah saat mengerjakan soal:",
  draw: "Gambar segitiga dan beri label BD, DC, BC, AD, AB, AC",
  findBC: "Cari BC terlebih dulu jika belum diketahui:",
  useFormula: "Gunakan rumus yang sesuai untuk mencari yang ditanya",
  check: "Cek dengan Pythagoras:",
  areaProblem: "Soal luas segitiga:",
  areaProblemText: "Luas △ABC bisa dihitung dua cara:",
  or: "atau",
  areaProblemEnd: ". Gunakan cara yang lebih mudah berdasarkan data yang diketahui.",
  variedNotation: "Notasi bervariasi:",
  variedText: "Soal bisa memakai segitiga ABC siku-siku di A, atau segitiga lain. Yang penting: identifikasi dulu",
  rightVertex: "titik siku-siku",
  andWord: "dan",
  altitudeFoot: "kaki garis tinggi",
  variedEnd: "-nya, lalu terapkan pola yang sama.",
  conclusion: "✅ Kesimpulan",
  conclusionText: "Garis tinggi pada segitiga siku-siku menciptakan",
  conclusionEmphasis: "tiga segitiga yang semuanya sebangun",
  conclusionEnd: "satu sama lain, dan dari kesebangunan inilah lahir ketiga rumus perbandingan rusuk.",
  oneAltitude: "🔹 Satu garis tinggi AD menghasilkan",
  threeFormulas: "3 rumus sekaligus",
  forSides: ": untuk AD, AB, dan AC",
  principle: "🔹 Semua rumus berasal dari satu prinsip:",
  geometricMean: "mean geometri dua segmen",
  hot: "🔹 Rumus ini sering diuji dalam soal HOTS — kuasai langkah sistematisnya!",
  finalCheck: "🔹 Selalu akhiri dengan cek Pythagoras untuk memvalidasi jawaban",
  noteText: "Topik ini menggabungkan kesebangunan segitiga dengan teorema Pythagoras — dua konsep paling fundamental dalam geometri SMP.",
  back: "← Kembali ke Kesebangunan dan Kekongruenan",
  waterfallStory1: "🌊 Bayangkan air menyemprot dari",
  throughVertical: "melewati sisi tegak, lalu di titik",
  waterFlows: "air langsung",
  twoDirections: "menyembur dua arah terpisah",
  to: "ke",
  andThen: "dan",
  directTo: "langsung ke",
  memoryFormula1: ". Itulah cara hafal rumus",
  sourceWater: "Sumber air",
  squared: "dikuadratkan",
  equalTo: "sama dengan",
  resultSplash: "Hasil muncrat",
  resultShooting: "Hasil semburan",
  twoWays: "dua arah",
  key: "💡 Kunci Hafal:",
  rememberWater: "Ingat arah air —",
  sprayUp: "menyemprot naik (A→B)",
  then: ", lalu",
  splashTwo: "muncrat dua arah (B→D) dan (B→C)",
  commaPeriod: ".",
  sprayVerb: "dikuadratkan",
  splashVerb: "dikalikan",
  waterfallStory2: "🌊 Bayangkan air mengalir dari",
  alongBase: "sepanjang alas, lalu di titik",
  flows: "air",
  waterTwoDirections: "menyembur dua arah",
  memorize: ". Itulah cara hafal rumus",
  flowingBase: "mengalir di alas (A→C)",
  splashCDCB: "menyembur dua arah (C→D) dan (C→B)",
  waterfallStory3: "🌊 Bayangkan air mengalir dari",
  alongAltitude: "sepanjang garis tinggi, lalu di titik",
  flowingAltitude: "mengalir di garis tinggi (A→D)",
  splashDBDC: "menyembur dua arah (D→B) dan (D→C)",
  diagramSource1: "A→B menyemprot",
  diagramSplash1: "menyembur busur ① ke D  dan  busur ② ke C",
  diagramSource2: "A→C mengalir",
  diagramSplash2: "menyembur busur ① ke D  dan  busur ② ke B",
  diagramSource3: "A→D mengalir (garis tinggi)",
  diagramSplash3: "menyembur busur ① ke B  dan  busur ② ke C",
  diagramFormulaMeaning: "kuadrat sumber  =  semburan ① × semburan ②",
  projectionCaption1: "Proyeksi Rusuk Tegak AB:",
  projectionCaption2: "Proyeksi Rusuk Mendatar AC:",
  altitudeCaption: "Garis Tinggi ke Sisi Miring:",
  relationCaption: "Hubungan Rusuk &amp; Tinggi:",
  similarCaption: "△ABD ~ △CAD ~ △CAB (tiga segitiga saling sebangun)",
  waterfallA: "💧 Teknik Air Terjun (a) — AB² = BD × BC",
  waterfallB: "💧 Teknik Air Terjun (b) — AC² = CD × CB",
  waterfallC: "💧 Teknik Air Terjun (c) — AD² = DB × DC",
};
type T = typeof id;
const en: T = {
  title: "RATIOS OF THE SIDES OF A RIGHT TRIANGLE", subtitle: "Using Similarity", grade: "Grade 9 · Similarity and Congruence · Mathematics",
  setup: "📐 Setup: A Right Triangle with an Altitude", intro: "In a right triangle, if we draw an", altitude: "altitude to the hypotenuse", intro2: ", the large triangle is divided into two smaller triangles that are", similar: "similar to each other", intro3: "and to the original triangle!",
  diagramTitle: "🔍 TRIANGLE ABC IS RIGHT-ANGLED AT A, WITH ALTITUDE AD:", formed: "The altitude AD forms:", similarTriangles: "△ABD ~ △CAD ~ △CAB (all three triangles are similar!)",
  projectionBase: "📘 (a) Projection of the Base Leg onto the Hypotenuse", projectionVertical: "📘 (b) Projection of the Vertical Leg onto the Hypotenuse", altitudeFormula: "📘 (c) Altitude Formula for Right Triangle △ABC at A", sideRelation: "📘 (d) Relationship Between the Sides and the Altitude",
  takeaway: "🎯 Key Idea", noticeABD: "Consider △ABD and △CAB. Since they are similar:", corresponding: "(corresponding sides are proportional)", baseSquare: "Square of the base leg = base projection × hypotenuse", noticeCDA: "Consider △CDA and △CAB. Since they are similar:", verticalSquare: "Square of the vertical leg = vertical projection × hypotenuse", noticeAltitude: "△ADB and △ADC are similar, giving:", altitudeSquare: "Altitude squared = product of the two projections on the hypotenuse",
  areaIntro: "There are two ways to calculate the area of right triangle △ABC at A:", areaWay1: "Method 1 (base and height using AB and AC):", areaWay2: "Method 2 (base and height using BC and AD):", equalAreas: "Since the areas are equal:", areaRelation: "base × vertical leg = hypotenuse × altitude", allFormulas: "📊 SUMMARY OF ALL FORMULAS (△ABC right-angled at A, AD is the altitude to BC):", formula: "Formula", note: "Description", baseProjection: "Base projection", verticalProjection: "Vertical projection", altitudeLabel: "Altitude", relationLabel: "Side and altitude relationship",
  examples: "📝 Practice Problems — Right-Triangle Side Ratios", easy: "EASY", medium: "MEDIUM", hard: "HARD", example: "Example", question1: "In the diagram, the lengths", and: "and", question1End: "are given.", question1Ask: "Find the lengths", question1AskEnd: "in that order.", solution: "SOLUTION:", ex1Given: "△CAB is right-angled at A, AD ⊥ CB, with BD = 3 cm and CD = 12 cm.", step1BC: "Step 1 — Find BC:", step2AD: "Step 2 — Find AD (the altitude):", step3AB: "Step 3 — Find AB:", step4AC: "Step 4 — Find AC:", ex1Answer: "AD = 6 cm, AB = 3√5 cm, AC = 6√5 cm.",
  ex3Question: "△ABC is right-angled at A, AD ⊥ BC. The area of △ABD is 54 cm² and BD = 9 cm. Find AD, BC, AC, and the area of △ABC!", findAD: "(a) Find AD:", findDC: "(b) Find DC:", findBCAC: "(c) Find BC and AC:", findArea: "(d) Area of △ABC:", ex3Answer: "AD = 12 cm, DC = 16 cm, BC = 25 cm, AC = 20 cm, L = 150 cm².",
  summary: "📋 Summary — Right-Triangle Side Ratios", summaryIntro: "In right triangle ABC (right angle at A), altitude AD is perpendicular to BC:", meaning: "Meaning", memory: "Remember", altitudeMean: "Altitude = geometric mean of the two base segments", middleEnds: "Middle × two ends", leftHyp: "Left leg² = left segment × entire hypotenuse", leftBase: "Left leg × full hypotenuse", rightHyp: "Right leg² = right segment × entire hypotenuse", rightBase: "Right leg × full hypotenuse",
  threeSimilarTitle: "Three similar triangles:", threeSimilarText: "△ABC ~ △ABD ~ △ACD (they have the same angles)", pythagorasTitle: "Connection to Pythagoras:", pythagorasText: "These formulas can be derived from the Pythagorean theorem and triangle similarity", conditionTitle: "Condition:", conditionText: "AD must be perpendicular (⊥) to BC for all formulas to apply", tips: "💡 Tips & Tricks — Waterfall Method", waterfallTip: "Waterfall method — remember this pattern:", smallLarge: "⬆ smaller segment · larger segment = the side² caught between them", order: "Steps for solving problems:", draw: "Draw the triangle and label BD, DC, BC, AD, AB, and AC", findBC: "Find BC first if it is not given:", useFormula: "Use the appropriate formula to find the requested value", check: "Check using Pythagoras:", areaProblem: "Triangle area problems:", areaProblemText: "The area of △ABC can be found in two ways:", or: "or", areaProblemEnd: ". Use the easier method based on the given information.", variedNotation: "Different labels:", variedText: "A problem may use triangle ABC right-angled at A or another triangle. First identify the", rightVertex: "right-angle vertex", andWord: "and", altitudeFoot: "foot of the altitude", variedEnd: ", then apply the same pattern.", conclusion: "✅ Conclusion", conclusionText: "An altitude in a right triangle creates", conclusionEmphasis: "three triangles that are all similar", conclusionEnd: "to one another, giving rise to the three side-ratio formulas.", oneAltitude: "🔹 One altitude AD gives", threeFormulas: "three formulas at once", forSides: ": for AD, AB, and AC", principle: "🔹 All formulas come from one principle:", geometricMean: "the geometric mean of two segments", hot: "🔹 These formulas often appear in higher-order thinking questions—master the systematic steps!", finalCheck: "🔹 Always finish by checking with Pythagoras", noteText: "This topic combines triangle similarity and the Pythagorean theorem—two fundamental concepts in middle-school geometry.", back: "← Back to Similarity and Congruence",
  waterfallStory1: "🌊 Imagine water spraying from", throughVertical: "up the vertical leg, then at point", waterFlows: "the water immediately", twoDirections: "splits into two streams", to: "to", andThen: "and", directTo: "straight to", memoryFormula1: ". This helps you remember the formula", sourceWater: "Water source", squared: "squared", equalTo: "equals", resultSplash: "Water streams", resultShooting: "Water streams", twoWays: "two directions", key: "💡 Key idea:", rememberWater: "Remember the water's path —", sprayUp: "sprays upward (A→B)", then: ", then", splashTwo: "splits toward D (B→D) and C (B→C)", commaPeriod: ".", sprayVerb: "is squared", splashVerb: "are multiplied", waterfallStory2: "🌊 Imagine water flowing from", alongBase: "along the base, then at point", flows: "the water", waterTwoDirections: "splits into two streams", memorize: ". This helps you remember the formula", flowingBase: "flows along the base (A→C)", splashCDCB: "splits toward D (C→D) and B (C→B)", waterfallStory3: "🌊 Imagine water flowing from", alongAltitude: "along the altitude, then at point", flowingAltitude: "flows along the altitude (A→D)", splashDBDC: "splits toward B (D→B) and C (D→C)", diagramSource1: "A→B sprays", diagramSplash1: "splits along arc ① to D and arc ② to C", diagramSource2: "A→C flows", diagramSplash2: "splits along arc ① to D and arc ② to B", diagramSource3: "A→D flows (altitude)", diagramSplash3: "splits along arc ① to B and arc ② to C", diagramFormulaMeaning: "source squared = stream ① × stream ②",
  projectionCaption1: "Projection of vertical leg AB:", projectionCaption2: "Projection of horizontal leg AC:", altitudeCaption: "Altitude to the hypotenuse:", relationCaption: "Relationship between sides &amp; altitude:", similarCaption: "△ABD ~ △CAD ~ △CAB (three similar triangles)",
  waterfallA: "💧 Waterfall Method (a) — AB² = BD × BC", waterfallB: "💧 Waterfall Method (b) — AC² = CD × CB", waterfallC: "💧 Waterfall Method (c) — AD² = DB × DC",
};
const msMY: T = {
  title: "NISBAH SISI-SISI SEGITIGA BERSUDUT TEGAK", subtitle: "Dengan Konsep Keserupaan", grade: "Tingkatan 3 · Keserupaan dan Kekongruenan · Matematik",
  setup: "📐 Persediaan: Segi Tiga Bersudut Tegak dengan Garis Tinggi", intro: "Dalam segi tiga bersudut tegak, jika kita lukis", altitude: "garis tinggi ke hipotenus", intro2: ", segi tiga besar terbahagi kepada dua segi tiga kecil yang", similar: "serupa antara satu sama lain", intro3: "dan dengan segi tiga asal!",
  diagramTitle: "🔍 SEGITIGA ABC BERSUDUT TEGAK DI A, DENGAN GARIS TINGGI AD:", formed: "Garis tinggi AD membentuk:", similarTriangles: "△ABD ~ △CAD ~ △CAB (ketiga-tiga segi tiga serupa!)",
  projectionBase: "📘 (a) Unjuran Kaki Tapak pada Hipotenus", projectionVertical: "📘 (b) Unjuran Kaki Tegak pada Hipotenus", altitudeFormula: "📘 (c) Rumus Garis Tinggi △ABC Bersudut Tegak di A", sideRelation: "📘 (d) Hubungan Sisi dengan Garis Tinggi",
  takeaway: "🎯 Inti Pati", noticeABD: "Perhatikan △ABD dan △CAB. Oleh sebab kedua-duanya serupa:", corresponding: "(sisi sepadan adalah berkadar)", baseSquare: "Kuasa dua kaki tapak = unjuran tapak × hipotenus", noticeCDA: "Perhatikan △CDA dan △CAB. Oleh sebab kedua-duanya serupa:", verticalSquare: "Kuasa dua kaki tegak = unjuran tegak × hipotenus", noticeAltitude: "△ADB dan △ADC serupa, maka:", altitudeSquare: "Kuasa dua garis tinggi = hasil darab dua unjuran pada hipotenus",
  areaIntro: "Luas △ABC bersudut tegak di A boleh dikira dengan dua cara:", areaWay1: "Cara 1 (tapak dan tinggi menggunakan AB dan AC):", areaWay2: "Cara 2 (tapak dan tinggi menggunakan BC dan AD):", equalAreas: "Oleh sebab luasnya sama:", areaRelation: "tapak × kaki tegak = hipotenus × garis tinggi", allFormulas: "📊 RUMUSAN SEMUA RUMUS (△ABC bersudut tegak di A, AD ialah garis tinggi ke BC):", formula: "Rumus", note: "Keterangan", baseProjection: "Unjuran tapak", verticalProjection: "Unjuran tegak", altitudeLabel: "Garis tinggi", relationLabel: "Hubungan sisi & garis tinggi",
  examples: "📝 Contoh Soalan — Nisbah Sisi Segi Tiga Bersudut Tegak", easy: "MUDAH", medium: "SEDERHANA", hard: "SUKAR", example: "Contoh", question1: "Dalam rajah berikut, panjang", and: "dan", question1End: "diberikan.", question1Ask: "Panjang", question1AskEnd: "masing-masing ialah . . . .", solution: "PENYELESAIAN:", ex1Given: "△CAB bersudut tegak di A, AD ⊥ CB, dengan BD = 3 cm dan CD = 12 cm.", step1BC: "Langkah 1 — Cari BC:", step2AD: "Langkah 2 — Cari AD (garis tinggi):", step3AB: "Langkah 3 — Cari AB:", step4AC: "Langkah 4 — Cari AC:", ex1Answer: "AD = 6 cm, AB = 3√5 cm, AC = 6√5 cm.",
  ex3Question: "△ABC bersudut tegak di A, AD ⊥ BC. Luas △ABD ialah 54 cm² dan BD = 9 cm. Cari panjang AD, BC, AC dan luas △ABC!", findAD: "(a) Cari AD:", findDC: "(b) Cari DC:", findBCAC: "(c) Cari BC dan AC:", findArea: "(d) Luas △ABC:", ex3Answer: "AD = 12 cm, DC = 16 cm, BC = 25 cm, AC = 20 cm, L = 150 cm².",
  summary: "📋 Rumusan — Nisbah Sisi Segi Tiga Bersudut Tegak", summaryIntro: "Dalam segi tiga bersudut tegak ABC (sudut tegak di A), garis tinggi AD berserenjang dengan BC:", meaning: "Maksud", memory: "Ingat", altitudeMean: "Garis tinggi = min geometri dua segmen tapak", middleEnds: "Tengah × dua hujung", leftHyp: "Kaki kiri² = segmen kiri × seluruh hipotenus", leftBase: "Kaki kiri × hipotenus penuh", rightHyp: "Kaki kanan² = segmen kanan × seluruh hipotenus", rightBase: "Kaki kanan × hipotenus penuh",
  threeSimilarTitle: "Tiga segi tiga serupa:", threeSimilarText: "△ABC ~ △ABD ~ △ACD (semuanya mempunyai sudut yang sama)", pythagorasTitle: "Hubungan dengan Pythagoras:", pythagorasText: "Rumus ini boleh diterbitkan daripada teorem Pythagoras dan keserupaan segi tiga", conditionTitle: "Syarat:", conditionText: "AD mestilah berserenjang (⊥) dengan BC agar semua rumus terpakai", tips: "💡 Petua & Trik — Teknik Air Terjun", waterfallTip: "Teknik Air Terjun — ingat pola ini:", smallLarge: "⬆ segmen kecil · segmen besar = sisi² yang \"terhimpit\"", order: "Langkah menyelesaikan soalan:", draw: "Lukis segi tiga dan labelkan BD, DC, BC, AD, AB dan AC", findBC: "Cari BC dahulu jika belum diketahui:", useFormula: "Gunakan rumus yang sesuai untuk mencari nilai yang diminta", check: "Semak dengan Pythagoras:", areaProblem: "Soalan luas segi tiga:", areaProblemText: "Luas △ABC boleh dikira dengan dua cara:", or: "atau", areaProblemEnd: ". Gunakan cara yang lebih mudah berdasarkan maklumat yang diberi.", variedNotation: "Notasi berbeza-beza:", variedText: "Soalan mungkin menggunakan segi tiga ABC bersudut tegak di A atau segi tiga lain. Kenal pasti dahulu", rightVertex: "bucu sudut tegak", andWord: "dan", altitudeFoot: "kaki garis tinggi", variedEnd: "-nya, kemudian gunakan pola yang sama.", conclusion: "✅ Kesimpulan", conclusionText: "Garis tinggi dalam segi tiga bersudut tegak menghasilkan", conclusionEmphasis: "tiga segi tiga yang semuanya serupa", conclusionEnd: "antara satu sama lain, lalu menghasilkan tiga rumus nisbah sisi.", oneAltitude: "🔹 Satu garis tinggi AD menghasilkan", threeFormulas: "3 rumus serentak", forSides: ": untuk AD, AB dan AC", principle: "🔹 Semua rumus berdasarkan satu prinsip:", geometricMean: "min geometri dua segmen", hot: "🔹 Rumus ini kerap diuji dalam soalan aras tinggi — kuasai langkah yang sistematik!", finalCheck: "🔹 Sentiasa akhiri dengan semakan Pythagoras", noteText: "Topik ini menggabungkan keserupaan segi tiga dengan teorem Pythagoras—dua konsep asas dalam geometri sekolah menengah.", back: "← Kembali ke Keserupaan dan Kekongruenan",
  waterfallStory1: "🌊 Bayangkan air memancut dari", throughVertical: "naik sepanjang kaki tegak, kemudian di titik", waterFlows: "air terus", twoDirections: "berpecah kepada dua aliran", to: "ke", andThen: "dan", directTo: "terus ke", memoryFormula1: ". Ini cara mengingati rumus", sourceWater: "Sumber air", squared: "dikuasa duakan", equalTo: "bersamaan", resultSplash: "Aliran air", resultShooting: "Aliran air", twoWays: "dua arah", key: "💡 Kunci Ingatan:", rememberWater: "Ingat laluan air —", sprayUp: "memancut ke atas (A→B)", then: ", kemudian", splashTwo: "berpecah ke D (B→D) dan C (B→C)", commaPeriod: ".", sprayVerb: "dikuasa duakan", splashVerb: "didarabkan", waterfallStory2: "🌊 Bayangkan air mengalir dari", alongBase: "sepanjang tapak, kemudian di titik", flows: "air", waterTwoDirections: "berpecah kepada dua aliran", memorize: ". Ini cara mengingati rumus", flowingBase: "mengalir di tapak (A→C)", splashCDCB: "berpecah ke D (C→D) dan B (C→B)", waterfallStory3: "🌊 Bayangkan air mengalir dari", alongAltitude: "sepanjang garis tinggi, kemudian di titik", flowingAltitude: "mengalir di garis tinggi (A→D)", splashDBDC: "berpecah ke B (D→B) dan C (D→C)", diagramSource1: "A→B memancut", diagramSplash1: "mengalir pada lengkung ① ke D dan lengkung ② ke C", diagramSource2: "A→C mengalir", diagramSplash2: "mengalir pada lengkung ① ke D dan lengkung ② ke B", diagramSource3: "A→D mengalir (garis tinggi)", diagramSplash3: "mengalir pada lengkung ① ke B dan lengkung ② ke C", diagramFormulaMeaning: "kuasa dua sumber = aliran ① × aliran ②",
  projectionCaption1: "Unjuran kaki tegak AB:", projectionCaption2: "Unjuran kaki mendatar AC:", altitudeCaption: "Garis tinggi ke hipotenus:", relationCaption: "Hubungan sisi &amp; garis tinggi:", similarCaption: "△ABD ~ △CAD ~ △CAB (tiga segi tiga serupa)",
  waterfallA: "💧 Teknik Air Terjun (a) — AB² = BD × BC", waterfallB: "💧 Teknik Air Terjun (b) — AC² = CD × CB", waterfallC: "💧 Teknik Air Terjun (c) — AD² = DB × DC",
};
const ja: T = {
  title: "直角三角形の辺の比", subtitle: "相似の考え方を使って", grade: "中学3年 · 相似と合同 · 数学",
  setup: "📐 基本設定：高さを引いた直角三角形", intro: "直角三角形の直角の頂点から", altitude: "斜辺に垂線を引くと", intro2: "大きな三角形は二つの小さな三角形に分かれ、互いに", similar: "相似になり", intro3: "元の三角形とも相似になります！",
  diagramTitle: "🔍 △ABCはAが直角、ADは高さ：", formed: "高さADによってできる三角形：", similarTriangles: "△ABD ~ △CAD ~ △CAB（3つの三角形は互いに相似）",
  projectionBase: "📘 (a) 底辺の脚の斜辺への射影", projectionVertical: "📘 (b) 垂直な脚の斜辺への射影", altitudeFormula: "📘 (c) Aが直角の△ABCの高さの公式", sideRelation: "📘 (d) 辺と高さの関係", takeaway: "🎯 要点", noticeABD: "△ABDと△CABに注目します。相似なので：", corresponding: "（対応する辺の比は等しい）", baseSquare: "底辺の脚の2乗 = 底辺への射影 × 斜辺", noticeCDA: "△CDAと△CABに注目します。相似なので：", verticalSquare: "垂直な脚の2乗 = 垂直な脚への射影 × 斜辺", noticeAltitude: "△ADBと△ADCは相似なので：", altitudeSquare: "高さの2乗 = 斜辺上の2つの射影の積",
  areaIntro: "Aが直角の△ABCの面積は、次の2通りで求められます：", areaWay1: "方法1（ABとACを底辺と高さとして使う）：", areaWay2: "方法2（BCとADを底辺と高さとして使う）：", equalAreas: "面積は等しいので：", areaRelation: "底辺 × 垂直な脚 = 斜辺 × 高さ", allFormulas: "📊 公式まとめ（△ABCはAが直角、ADはBCへの高さ）：", formula: "公式", note: "説明", baseProjection: "底辺への射影", verticalProjection: "垂直な脚への射影", altitudeLabel: "高さ", relationLabel: "辺と高さの関係",
  examples: "📝 練習問題 — 直角三角形の辺の比", easy: "基本", medium: "標準", hard: "発展", example: "例", question1: "図で、次の長さが与えられています：", and: "と", question1End: "。", question1Ask: "長さ", question1AskEnd: "を順に求めましょう。", solution: "解説：", ex1Given: "△CABはAが直角、AD ⊥ CB、BD = 3 cm、CD = 12 cmです。", step1BC: "手順1 — BCを求める：", step2AD: "手順2 — AD（高さ）を求める：", step3AB: "手順3 — ABを求める：", step4AC: "手順4 — ACを求める：", ex1Answer: "AD = 6 cm、AB = 3√5 cm、AC = 6√5 cm。",
  ex3Question: "△ABCはAが直角、AD ⊥ BCです。△ABDの面積は54 cm²、BD = 9 cmです。AD、BC、ACの長さと△ABCの面積を求めましょう！", findAD: "(a) ADを求める：", findDC: "(b) DCを求める：", findBCAC: "(c) BCとACを求める：", findArea: "(d) △ABCの面積：", ex3Answer: "AD = 12 cm、DC = 16 cm、BC = 25 cm、AC = 20 cm、L = 150 cm²。",
  summary: "📋 まとめ — 直角三角形の辺の比", summaryIntro: "△ABCはAが直角で、高さADはBCに垂直です：", meaning: "意味", memory: "覚え方", altitudeMean: "高さ = 底辺の2つの区間の幾何平均", middleEnds: "中央 × 両端", leftHyp: "左の脚² = 左の区間 × 斜辺全体", leftBase: "左の脚 × 斜辺全体", rightHyp: "右の脚² = 右の区間 × 斜辺全体", rightBase: "右の脚 × 斜辺全体",
  threeSimilarTitle: "相似な3つの三角形：", threeSimilarText: "△ABC ~ △ABD ~ △ACD（すべて角が等しい）", pythagorasTitle: "ピタゴラスの定理との関係：", pythagorasText: "これらの公式はピタゴラスの定理と三角形の相似から導けます", conditionTitle: "条件：", conditionText: "すべての公式が成り立つには、AD ⊥ BCであることが必要です", tips: "💡 ヒント — 滝のイメージ", waterfallTip: "滝のイメージで、このパターンを覚えましょう：", smallLarge: "⬆ 短い区間 × 長い区間 = 間に挟まれた辺²", order: "問題を解く手順：", draw: "三角形を描き、BD、DC、BC、AD、AB、ACと記す", findBC: "分からない場合は、まずBCを求める：", useFormula: "求めるものに合った公式を使う", check: "ピタゴラスの定理で確かめる：", areaProblem: "三角形の面積：", areaProblemText: "△ABCの面積は次の2通りで計算できます：", or: "または", areaProblemEnd: "。与えられた値から計算しやすい方法を選びましょう。", variedNotation: "頂点の表記が異なる場合：", variedText: "△ABCのAが直角の場合も、別の三角形の場合もあります。まず", rightVertex: "直角の頂点", andWord: "と", altitudeFoot: "高さの足", variedEnd: "を見つけ、同じパターンを使いましょう。", conclusion: "✅ まとめ", conclusionText: "直角三角形に高さを引くと、互いに", conclusionEmphasis: "相似な3つの三角形", conclusionEnd: "ができ、そこから辺の比に関する3つの公式が導かれます。", oneAltitude: "🔹 高さADから", threeFormulas: "3つの公式", forSides: "（AD、AB、AC）が得られます", principle: "🔹 すべての公式の基本原理：", geometricMean: "2区間の幾何平均", hot: "🔹 これらの公式は応用問題によく出ます。手順を身につけましょう！", finalCheck: "🔹 最後に必ずピタゴラスの定理で答えを確認しましょう", noteText: "この単元では、三角形の相似とピタゴラスの定理という、中学幾何の基本概念を組み合わせます。", back: "← 相似と合同に戻る",
  waterfallStory1: "🌊 水が", throughVertical: "垂直な辺を通って上がり、点", waterFlows: "ですぐに", twoDirections: "2方向に分かれる", to: "へ", andThen: "そして", directTo: "そのまま", memoryFormula1: "と想像しましょう。公式を覚えるイメージです：", sourceWater: "水の出発点", squared: "2乗", equalTo: "等しい", resultSplash: "水の流れ", resultShooting: "水の流れ", twoWays: "2方向", key: "💡 覚え方：", rememberWater: "水の流れを思い出そう —", sprayUp: "上に噴き出す (A→B)", then: "、続いて", splashTwo: "D (B→D) と C (B→C) に分かれる", commaPeriod: "。", sprayVerb: "2乗する", splashVerb: "掛け合わせる", waterfallStory2: "🌊 水が", alongBase: "底辺を流れ、点", flows: "水は", waterTwoDirections: "2方向に分かれる", memorize: "と想像しましょう。公式を覚えるイメージです：", flowingBase: "底辺を流れる (A→C)", splashCDCB: "D (C→D) と B (C→B) に分かれる", waterfallStory3: "🌊 水が", alongAltitude: "高さに沿って流れ、点", flowingAltitude: "高さに沿って流れる (A→D)", splashDBDC: "B (D→B) と C (D→C) に分かれる", diagramSource1: "A→Bから噴き出す", diagramSplash1: "弧①はDへ、弧②はCへ流れる", diagramSource2: "A→Cに流れる", diagramSplash2: "弧①はDへ、弧②はBへ流れる", diagramSource3: "A→Dに流れる（高さ）", diagramSplash3: "弧①はBへ、弧②はCへ流れる", diagramFormulaMeaning: "出発点の2乗 = 流れ① × 流れ②",
  projectionCaption1: "垂直な辺ABの射影：", projectionCaption2: "水平な辺ACの射影：", altitudeCaption: "斜辺への高さ：", relationCaption: "辺と高さの関係：", similarCaption: "△ABD ~ △CAD ~ △CAB（3つの三角形は相似）", waterfallA: "💧 滝のイメージ (a) — AB² = BD × BC", waterfallB: "💧 滝のイメージ (b) — AC² = CD × CB", waterfallC: "💧 滝のイメージ (c) — AD² = DB × DC",
};
const zhCN: T = {
  title: "直角三角形边长之比", subtitle: "利用相似的概念", grade: "九年级 · 相似与全等 · 数学",
  setup: "📐 基本图形：带高线的直角三角形", intro: "在直角三角形中，从直角顶点向", altitude: "斜边作高", intro2: "，大三角形就被分成两个小三角形，它们", similar: "彼此相似", intro3: "，也都与原三角形相似！",
  diagramTitle: "🔍 △ABC在A处为直角，AD为高：", formed: "作高AD后得到：", similarTriangles: "△ABD ~ △CAD ~ △CAB（三个三角形彼此相似！）",
  projectionBase: "📘 (a) 底边直角边在斜边上的射影", projectionVertical: "📘 (b) 竖直直角边在斜边上的射影", altitudeFormula: "📘 (c) △ABC在A处为直角时的高线公式", sideRelation: "📘 (d) 边与高线的关系", takeaway: "🎯 核心要点", noticeABD: "观察△ABD和△CAB。因为它们相似：", corresponding: "（对应边成比例）", baseSquare: "底边直角边的平方 = 底边射影 × 斜边", noticeCDA: "观察△CDA和△CAB。因为它们相似：", verticalSquare: "竖直直角边的平方 = 竖直边射影 × 斜边", noticeAltitude: "△ADB和△ADC相似，因此：", altitudeSquare: "高的平方 = 斜边上两个射影的乘积",
  areaIntro: "△ABC在A处为直角，其面积有两种计算方法：", areaWay1: "方法1（以AB和AC作为底和高）：", areaWay2: "方法2（以BC和AD作为底和高）：", equalAreas: "两种方法的面积相等，因此：", areaRelation: "底边 × 竖直直角边 = 斜边 × 高", allFormulas: "📊 所有公式汇总（△ABC在A处为直角，AD是BC上的高）：", formula: "公式", note: "说明", baseProjection: "底边射影", verticalProjection: "竖直边射影", altitudeLabel: "高线", relationLabel: "边与高的关系",
  examples: "📝 练习题 — 直角三角形边长之比", easy: "简单", medium: "中等", hard: "困难", example: "例题", question1: "图中已知长度", and: "和", question1End: "。", question1Ask: "依次求", question1AskEnd: "的长度。", solution: "解答：", ex1Given: "△CAB在A处为直角，AD ⊥ CB，BD = 3 cm，CD = 12 cm。", step1BC: "步骤1 — 求BC：", step2AD: "步骤2 — 求AD（高）：", step3AB: "步骤3 — 求AB：", step4AC: "步骤4 — 求AC：", ex1Answer: "AD = 6 cm，AB = 3√5 cm，AC = 6√5 cm。",
  ex3Question: "△ABC在A处为直角，AD ⊥ BC。已知△ABD的面积为54 cm²，BD = 9 cm。求AD、BC、AC的长度以及△ABC的面积！", findAD: "(a) 求AD：", findDC: "(b) 求DC：", findBCAC: "(c) 求BC和AC：", findArea: "(d) △ABC的面积：", ex3Answer: "AD = 12 cm，DC = 16 cm，BC = 25 cm，AC = 20 cm，L = 150 cm²。",
  summary: "📋 总结 — 直角三角形边长之比", summaryIntro: "在△ABC中，A为直角，AD垂直于BC：", meaning: "含义", memory: "记忆方法", altitudeMean: "高 = 底边两段的几何平均数", middleEnds: "中间 × 两端", leftHyp: "左直角边² = 左段 × 整条斜边", leftBase: "左直角边 × 整条斜边", rightHyp: "右直角边² = 右段 × 整条斜边", rightBase: "右直角边 × 整条斜边",
  threeSimilarTitle: "三个相似三角形：", threeSimilarText: "△ABC ~ △ABD ~ △ACD（它们的角都相同）", pythagorasTitle: "与勾股定理的关系：", pythagorasText: "这些公式可以由勾股定理和三角形相似推导得出", conditionTitle: "条件：", conditionText: "AD必须垂直（⊥）于BC，所有公式才成立", tips: "💡 技巧 — 瀑布记忆法", waterfallTip: "用瀑布记忆法记住这个规律：", smallLarge: "⬆ 较短线段 × 较长线段 = 夹在中间的边²", order: "解题步骤：", draw: "画出三角形并标记BD、DC、BC、AD、AB、AC", findBC: "若BC未知，先求BC：", useFormula: "选择合适的公式求所需的量", check: "用勾股定理检验：", areaProblem: "三角形面积题：", areaProblemText: "△ABC的面积可以用两种方法计算：", or: "或", areaProblemEnd: "。根据已知条件选择更方便的方法。", variedNotation: "顶点标记可能不同：", variedText: "题目可能使用A处为直角的△ABC，也可能使用其他三角形。首先找出", rightVertex: "直角顶点", andWord: "和", altitudeFoot: "高的垂足", variedEnd: "，再应用相同规律。", conclusion: "✅ 结论", conclusionText: "在直角三角形中作高，会得到彼此", conclusionEmphasis: "相似的三个三角形", conclusionEnd: "，并由此得到三条边长比例公式。", oneAltitude: "🔹 一条高AD可以得到", threeFormulas: "3个公式", forSides: "：分别求AD、AB和AC", principle: "🔹 所有公式都基于一个原理：", geometricMean: "两段的几何平均数", hot: "🔹 这些公式常出现在综合题中——掌握系统的解题步骤！", finalCheck: "🔹 最后务必用勾股定理检验答案", noteText: "本主题结合了三角形相似和勾股定理，这是初中几何中的两个基础概念。", back: "← 返回相似与全等",
  waterfallStory1: "🌊 想象水从", throughVertical: "沿竖直边向上喷，到达点", waterFlows: "后，水立刻", twoDirections: "分成两股", to: "流向", andThen: "以及", directTo: "直接流向", memoryFormula1: "。用这个画面记住公式：", sourceWater: "水源", squared: "平方", equalTo: "等于", resultSplash: "水流", resultShooting: "水流", twoWays: "两个方向", key: "💡 记忆要点：", rememberWater: "记住水流方向——", sprayUp: "向上喷出 (A→B)", then: "，接着", splashTwo: "分向D (B→D) 和C (B→C)", commaPeriod: "。", sprayVerb: "平方", splashVerb: "相乘", waterfallStory2: "🌊 想象水从", alongBase: "沿底边流动，到达点", flows: "水", waterTwoDirections: "分成两股", memorize: "。用这个画面记住公式：", flowingBase: "沿底边流动 (A→C)", splashCDCB: "分向D (C→D) 和B (C→B)", waterfallStory3: "🌊 想象水从", alongAltitude: "沿高线流动，到达点", flowingAltitude: "沿高线流动 (A→D)", splashDBDC: "分向B (D→B) 和C (D→C)", diagramSource1: "A→B喷水", diagramSplash1: "弧线①流向D，弧线②流向C", diagramSource2: "A→C流动", diagramSplash2: "弧线①流向D，弧线②流向B", diagramSource3: "A→D流动（高线）", diagramSplash3: "弧线①流向B，弧线②流向C", diagramFormulaMeaning: "水源的平方 = 水流① × 水流②",
  projectionCaption1: "竖直边AB的射影：", projectionCaption2: "水平边AC的射影：", altitudeCaption: "斜边上的高：", relationCaption: "边与高的关系：", similarCaption: "△ABD ~ △CAD ~ △CAB（三个三角形相似）", waterfallA: "💧 瀑布记忆法 (a) — AB² = BD × BC", waterfallB: "💧 瀑布记忆法 (b) — AC² = CD × CB", waterfallC: "💧 瀑布记忆法 (c) — AD² = DB × DC",
};
const ru: T = {
  title: "ОТНОШЕНИЯ СТОРОН ПРЯМОУГОЛЬНОГО ТРЕУГОЛЬНИКА", subtitle: "На основе подобия", grade: "9 класс · Подобие и конгруэнтность · Математика",
  setup: "📐 Построение: прямоугольный треугольник с высотой", intro: "В прямоугольном треугольнике, если из вершины прямого угла провести", altitude: "высоту к гипотенузе", intro2: ", большой треугольник разделится на два меньших, которые", similar: "подобны друг другу", intro3: "и исходному треугольнику!",
  diagramTitle: "🔍 В △ABC угол A прямой, AD — высота:", formed: "Высота AD образует:", similarTriangles: "△ABD ~ △CAD ~ △CAB (все три треугольника подобны!)",
  projectionBase: "📘 (a) Проекция катета основания на гипотенузу", projectionVertical: "📘 (b) Проекция вертикального катета на гипотенузу", altitudeFormula: "📘 (c) Формула высоты △ABC с прямым углом A", sideRelation: "📘 (d) Связь сторон и высоты", takeaway: "🎯 Главное", noticeABD: "Рассмотрим △ABD и △CAB. Они подобны, поэтому:", corresponding: "(соответствующие стороны пропорциональны)", baseSquare: "Квадрат катета основания = проекция основания × гипотенуза", noticeCDA: "Рассмотрим △CDA и △CAB. Они подобны, поэтому:", verticalSquare: "Квадрат вертикального катета = его проекция × гипотенуза", noticeAltitude: "△ADB и △ADC подобны, откуда:", altitudeSquare: "Квадрат высоты = произведение двух проекций на гипотенузу",
  areaIntro: "Площадь △ABC с прямым углом A можно найти двумя способами:", areaWay1: "Способ 1 (основание и высота AB и AC):", areaWay2: "Способ 2 (основание и высота BC и AD):", equalAreas: "Площади равны, значит:", areaRelation: "основание × вертикальный катет = гипотенуза × высота", allFormulas: "📊 ВСЕ ФОРМУЛЫ (в △ABC угол A прямой, AD — высота к BC):", formula: "Формула", note: "Пояснение", baseProjection: "Проекция основания", verticalProjection: "Вертикальная проекция", altitudeLabel: "Высота", relationLabel: "Связь сторон и высоты",
  examples: "📝 Задачи — Отношения сторон прямоугольного треугольника", easy: "ЛЁГКИЙ", medium: "СРЕДНИЙ", hard: "СЛОЖНЫЙ", example: "Пример", question1: "На рисунке даны длины", and: "и", question1End: ".", question1Ask: "Найдите длины", question1AskEnd: "по порядку.", solution: "РЕШЕНИЕ:", ex1Given: "В △CAB угол A прямой, AD ⊥ CB, BD = 3 см и CD = 12 см.", step1BC: "Шаг 1 — Найдите BC:", step2AD: "Шаг 2 — Найдите AD (высоту):", step3AB: "Шаг 3 — Найдите AB:", step4AC: "Шаг 4 — Найдите AC:", ex1Answer: "AD = 6 см, AB = 3√5 см, AC = 6√5 см.",
  ex3Question: "В △ABC угол A прямой, AD ⊥ BC. Площадь △ABD равна 54 см², BD = 9 см. Найдите длины AD, BC, AC и площадь △ABC!", findAD: "(a) Найдите AD:", findDC: "(b) Найдите DC:", findBCAC: "(c) Найдите BC и AC:", findArea: "(d) Площадь △ABC:", ex3Answer: "AD = 12 см, DC = 16 см, BC = 25 см, AC = 20 см, L = 150 см².",
  summary: "📋 Итоги — Отношения сторон прямоугольного треугольника", summaryIntro: "В △ABC угол A прямой, высота AD перпендикулярна BC:", meaning: "Значение", memory: "Запомните", altitudeMean: "Высота = среднее геометрическое двух отрезков основания", middleEnds: "Середина × два конца", leftHyp: "Левый катет² = левый отрезок × вся гипотенуза", leftBase: "Левый катет × вся гипотенуза", rightHyp: "Правый катет² = правый отрезок × вся гипотенуза", rightBase: "Правый катет × вся гипотенуза",
  threeSimilarTitle: "Три подобных треугольника:", threeSimilarText: "△ABC ~ △ABD ~ △ACD (у них одинаковые углы)", pythagorasTitle: "Связь с теоремой Пифагора:", pythagorasText: "Эти формулы можно вывести из теоремы Пифагора и подобия треугольников", conditionTitle: "Условие:", conditionText: "Для применимости всех формул AD должна быть перпендикулярна (⊥) BC", tips: "💡 Советы — Метод водопада", waterfallTip: "Метод водопада — запомните эту закономерность:", smallLarge: "⬆ меньший отрезок × больший отрезок = заключённая между ними сторона²", order: "Порядок решения задач:", draw: "Нарисуйте треугольник и обозначьте BD, DC, BC, AD, AB и AC", findBC: "Если BC не задан, сначала найдите BC:", useFormula: "Выберите подходящую формулу для поиска неизвестного", check: "Проверьте по теореме Пифагора:", areaProblem: "Задачи на площадь треугольника:", areaProblemText: "Площадь △ABC можно вычислить двумя способами:", or: "или", areaProblemEnd: ". Выберите более удобный способ исходя из известных данных.", variedNotation: "Разные обозначения:", variedText: "В задаче может использоваться △ABC с прямым углом A или другой треугольник. Сначала найдите", rightVertex: "вершину прямого угла", andWord: "и", altitudeFoot: "основание высоты", variedEnd: ", затем примените ту же закономерность.", conclusion: "✅ Вывод", conclusionText: "Высота в прямоугольном треугольнике образует", conclusionEmphasis: "три попарно подобных треугольника", conclusionEnd: ", из подобия которых следуют три формулы отношений сторон.", oneAltitude: "🔹 Одна высота AD даёт", threeFormulas: "сразу 3 формулы", forSides: ": для AD, AB и AC", principle: "🔹 Все формулы основаны на одном принципе:", geometricMean: "среднем геометрическом двух отрезков", hot: "🔹 Эти формулы часто встречаются в сложных задачах — освойте алгоритм решения!", finalCheck: "🔹 Всегда проверяйте ответ по теореме Пифагора", noteText: "В этой теме сочетаются подобие треугольников и теорема Пифагора — два основных понятия геометрии средней школы.", back: "← Назад к подобию и конгруэнтности",
  waterfallStory1: "🌊 Представьте, что вода бьёт из", throughVertical: "вверх по вертикальному катету и в точке", waterFlows: "вода сразу", twoDirections: "разделяется на два потока", to: "к", andThen: "и", directTo: "прямо к", memoryFormula1: ". Так проще запомнить формулу:", sourceWater: "Источник воды", squared: "в квадрате", equalTo: "равно", resultSplash: "Потоки воды", resultShooting: "Потоки воды", twoWays: "в двух направлениях", key: "💡 Как запомнить:", rememberWater: "Проследите путь воды —", sprayUp: "бьёт вверх (A→B)", then: ", затем", splashTwo: "разделяется к D (B→D) и C (B→C)", commaPeriod: ".", sprayVerb: "возводится в квадрат", splashVerb: "перемножаются", waterfallStory2: "🌊 Представьте, что вода течёт от", alongBase: "по основанию и в точке", flows: "вода", waterTwoDirections: "разделяется на два потока", memorize: ". Так проще запомнить формулу:", flowingBase: "течёт по основанию (A→C)", splashCDCB: "разделяется к D (C→D) и B (C→B)", waterfallStory3: "🌊 Представьте, что вода течёт от", alongAltitude: "по высоте и в точке", flowingAltitude: "течёт по высоте (A→D)", splashDBDC: "разделяется к B (D→B) и C (D→C)", diagramSource1: "Вода бьёт A→B", diagramSplash1: "поток ① по дуге к D, поток ② по дуге к C", diagramSource2: "Вода течёт A→C", diagramSplash2: "поток ① по дуге к D, поток ② по дуге к B", diagramSource3: "Вода течёт A→D (высота)", diagramSplash3: "поток ① по дуге к B, поток ② по дуге к C", diagramFormulaMeaning: "квадрат источника = поток ① × поток ②",
  projectionCaption1: "Проекция вертикального катета AB:", projectionCaption2: "Проекция горизонтального катета AC:", altitudeCaption: "Высота к гипотенузе:", relationCaption: "Связь сторон и высоты:", similarCaption: "△ABD ~ △CAD ~ △CAB (три подобных треугольника)", waterfallA: "💧 Метод водопада (a) — AB² = BD × BC", waterfallB: "💧 Метод водопада (b) — AC² = CD × CB", waterfallC: "💧 Метод водопада (c) — AD² = DB × DC",
};
const translations = { id, en, "ms-MY": msMY, ja, "zh-CN": zhCN, ru } satisfies Record<Language, T>;
/* ── DIAGRAMS ──
   △ABC siku-siku di A, AB VERTIKAL, AC HORIZONTAL.
   B = kiri atas, A = kiri bawah (AB vertikal), C = kanan bawah (AC horizontal).
   BC = sisi miring (hipotenusa, diagonal). AD ⊥ BC, D pada BC.
   Koordinat: B=(55,22), A=(55,182), C=(175,182)
   AB=160 (vertikal), AC=120 (horizontal), BC=200, AD=96, BD=128, DC=72  (3-4-5 × 40)
   BC_unit = (C-B)/|BC| = (120,160)/200 = (0.6,0.8)
   t = (A-B)·BC_unit = (0,160)·(0.6,0.8) = 128
   D = B + 128*(0.6,0.8) = (55+76.8, 22+102.4) = (131.8,124.4) ≈ (132,124)
──────────────────────────────────────────── */

/* Sudut siku-siku di A=(55,182): AB ke atas (0,-1), AC ke kanan (1,0) → kotak axis-aligned */
const RightAngleA = () => (
  <path d="M 55,173 L 64,173 L 64,182" fill="none" stroke="#f97316" strokeWidth="1.5"/>
);

/* Sudut siku-siku di D=(132,124): AD⊥BC
   DA_unit (D→A) = (55-132,182-124)/96 = (-76.8,57.6)/96 = (-0.8,0.6)
   BC_unit = (0.6,0.8), s=8 */
const RightAngleD = () => {
  const s = 8;
  const p1 = { x: 132 + s*(-0.8), y: 124 + s*(0.6)  };  // toward A
  const p2 = { x: 132 + s*(0.6),  y: 124 + s*(0.8)  };  // along BC
  const corner = { x: p1.x + s*(0.6), y: p1.y + s*(0.8) };
  return <path d={`M ${p1.x.toFixed(1)},${p1.y.toFixed(1)} L ${corner.x.toFixed(1)},${corner.y.toFixed(1)} L ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`} fill="none" stroke="#facc15" strokeWidth="1.5"/>;
};

const DiagramSikuSiku = ({ t }: { t: T }) => (
  <svg viewBox="0 0 260 218" className="w-full max-w-sm mx-auto">
    {/* Sub-triangles shaded */}
    <polygon points="55,182 55,22 132,124"  fill="#4ade80"  fillOpacity="0.18" stroke="none"/>
    <polygon points="55,182 175,182 132,124" fill="#a855f7" fillOpacity="0.18" stroke="none"/>
    {/* Main triangle ABC */}
    <polygon points="55,22 55,182 175,182" fill="none" stroke="#60a5fa" strokeWidth="2.2"/>
    {/* Altitude AD */}
    <line x1="55" y1="182" x2="132" y2="124" stroke="#facc15" strokeWidth="2" strokeDasharray="5,3"/>
    <RightAngleA />
    <RightAngleD />
    {/* Vertex labels */}
    <text x="36"  y="20"  fontSize="12" fill="#93c5fd" fontWeight="bold">B</text>
    <text x="36"  y="197" fontSize="12" fill="#93c5fd" fontWeight="bold">A</text>
    <text x="178" y="197" fontSize="12" fill="#93c5fd" fontWeight="bold">C</text>
    <text x="136" y="120" fontSize="11" fill="#fde68a" fontWeight="bold">D</text>
    {/* Legend */}
    <rect x="3" y="202" width="254" height="14" rx="4" fill="#0f172a" stroke="#334155"/>
    <text x="130" y="212" textAnchor="middle" fontSize="8" fill="#fde68a" fontWeight="bold">{t.similarCaption}</text>
  </svg>
);

const DiagramProyeksiAlas = ({ t }: { t: T }) => (
  <svg viewBox="0 0 260 242" className="w-full max-w-sm mx-auto">
    <polygon points="55,182 55,22 132,124" fill="#4ade80" fillOpacity="0.18" stroke="none"/>
    <polygon points="55,22 55,182 175,182" fill="none" stroke="#60a5fa" strokeWidth="2"/>
    <line x1="55" y1="182" x2="132" y2="124" stroke="#facc15" strokeWidth="1.8" strokeDasharray="5,3"/>
    <RightAngleA />
    <RightAngleD />
    <text x="36"  y="20"  fontSize="12" fill="#93c5fd" fontWeight="bold">B</text>
    <text x="36"  y="197" fontSize="12" fill="#93c5fd" fontWeight="bold">A</text>
    <text x="178" y="197" fontSize="12" fill="#93c5fd" fontWeight="bold">C</text>
    <text x="136" y="120" fontSize="11" fill="#fde68a" fontWeight="bold">D</text>
    <rect x="3" y="208" width="254" height="30" rx="4" fill="#0f172a" stroke="#4ade80" strokeWidth="1"/>
    <text x="130" y="220" textAnchor="middle" fontSize="12" fill="#fde68a" fontWeight="bold">{t.projectionCaption1}</text>
    <text x="130" y="235" textAnchor="middle" fontSize="12" fill="#4ade80" fontWeight="bold">AB² = BD × BC</text>
  </svg>
);

const DiagramProyeksiTegak = ({ t }: { t: T }) => (
  <svg viewBox="0 0 260 242" className="w-full max-w-sm mx-auto">
    <polygon points="55,182 175,182 132,124" fill="#c084fc" fillOpacity="0.18" stroke="none"/>
    <polygon points="55,22 55,182 175,182" fill="none" stroke="#c084fc" strokeWidth="2"/>
    <line x1="55" y1="182" x2="132" y2="124" stroke="#facc15" strokeWidth="1.8" strokeDasharray="5,3"/>
    <RightAngleA />
    <RightAngleD />
    <text x="36"  y="20"  fontSize="12" fill="#e9d5ff" fontWeight="bold">B</text>
    <text x="36"  y="197" fontSize="12" fill="#e9d5ff" fontWeight="bold">A</text>
    <text x="178" y="197" fontSize="12" fill="#e9d5ff" fontWeight="bold">C</text>
    <text x="136" y="120" fontSize="11" fill="#fde68a" fontWeight="bold">D</text>
    <rect x="3" y="208" width="254" height="30" rx="4" fill="#0f172a" stroke="#c084fc" strokeWidth="1"/>
    <text x="130" y="220" textAnchor="middle" fontSize="12" fill="#fde68a" fontWeight="bold">{t.projectionCaption2}</text>
    <text x="130" y="235" textAnchor="middle" fontSize="12" fill="#c084fc" fontWeight="bold">AC² = DC × BC</text>
  </svg>
);

const DiagramGarisTinggi = ({ t }: { t: T }) => (
  <svg viewBox="0 0 260 242" className="w-full max-w-sm mx-auto">
    <polygon points="55,182 55,22 132,124"  fill="#facc15" fillOpacity="0.10" stroke="none"/>
    <polygon points="55,182 175,182 132,124" fill="#facc15" fillOpacity="0.10" stroke="none"/>
    <polygon points="55,22 55,182 175,182" fill="none" stroke="#22c55e" strokeWidth="2"/>
    <line x1="55" y1="182" x2="132" y2="124" stroke="#facc15" strokeWidth="2" strokeDasharray="5,3"/>
    <RightAngleA />
    <RightAngleD />
    <text x="36"  y="20"  fontSize="12" fill="#86efac" fontWeight="bold">B</text>
    <text x="36"  y="197" fontSize="12" fill="#86efac" fontWeight="bold">A</text>
    <text x="178" y="197" fontSize="12" fill="#86efac" fontWeight="bold">C</text>
    <text x="136" y="120" fontSize="11" fill="#fde68a" fontWeight="bold">D</text>
    <rect x="3" y="208" width="254" height="30" rx="4" fill="#0f172a" stroke="#22c55e" strokeWidth="1"/>
    <text x="130" y="220" textAnchor="middle" fontSize="12" fill="#fde68a" fontWeight="bold">{t.altitudeCaption}</text>
    <text x="130" y="235" textAnchor="middle" fontSize="12" fill="#22c55e" fontWeight="bold">AD² = BD × DC</text>
  </svg>
);

const DiagramHubunganRusuk = ({ t }: { t: T }) => (
  <svg viewBox="0 0 260 242" className="w-full max-w-sm mx-auto">
    {/* Shading seluruh segitiga */}
    <polygon points="55,22 55,182 175,182" fill="#f97316" fillOpacity="0.12" stroke="none"/>
    {/* Sisi AB (tegak) — kuning */}
    <line x1="55" y1="22" x2="55" y2="182" stroke="#facc15" strokeWidth="3"/>
    {/* Sisi AC (alas) — hijau */}
    <line x1="55" y1="182" x2="175" y2="182" stroke="#4ade80" strokeWidth="3"/>
    {/* Sisi BC (miring) — biru */}
    <line x1="55" y1="22" x2="175" y2="182" stroke="#60a5fa" strokeWidth="3"/>
    {/* Garis tinggi AD — oranye putus-putus */}
    <line x1="55" y1="182" x2="132" y2="124" stroke="#f97316" strokeWidth="2.5" strokeDasharray="5,3"/>
    <RightAngleA />
    <RightAngleD />
    {/* Label sisi */}
    <text x="38"  y="108" fontSize="11" fill="#facc15" fontWeight="bold" textAnchor="middle">AB</text>
    <text x="115" y="197" fontSize="11" fill="#4ade80" fontWeight="bold" textAnchor="middle">AC</text>
    <text x="122" y="95"  fontSize="11" fill="#60a5fa" fontWeight="bold" textAnchor="middle">BC</text>
    <text x="82"  y="160" fontSize="11" fill="#fb923c" fontWeight="bold" textAnchor="middle">AD</text>
    {/* Vertex labels */}
    <text x="36"  y="20"  fontSize="12" fill="#fed7aa" fontWeight="bold">B</text>
    <text x="36"  y="197" fontSize="12" fill="#fed7aa" fontWeight="bold">A</text>
    <text x="178" y="197" fontSize="12" fill="#fed7aa" fontWeight="bold">C</text>
    <text x="136" y="120" fontSize="11" fill="#fde68a" fontWeight="bold">D</text>
    {/* Legend */}
    <rect x="3" y="208" width="254" height="30" rx="4" fill="#0f172a" stroke="#f97316" strokeWidth="1"/>
    <text x="130" y="220" textAnchor="middle" fontSize="12" fill="#fde68a" fontWeight="bold">{t.relationCaption}</text>
    <text x="130" y="235" textAnchor="middle" fontSize="12" fill="#f97316" fontWeight="bold">AB × AC = BC × AD</text>
  </svg>
);

/* ── WATERFALL ANIMATION ──────────────────────────────────────────────────
   Segitiga: B=(55,22) kiri atas, A=(55,182) kiri bawah, C=(175,182) kanan bawah
   D=(132,124) pada BC (kaki tinggi dari A).
   Air menyemprot A→B (vertikal ke atas), lalu muncrat dari B ke D dan B ke C.
   AB² = BD × BC
──────────────────────────────────────────────────────────────────────────── */
const WaterfallAnimasiAlas = ({ t }: { t: T }) => {
  /*
    Koordinat segitiga:
      B = (55, 22)   — kiri atas (sudut lancip)
      A = (55, 182)  — kiri bawah (sudut siku-siku)
      C = (175, 182) — kanan bawah
      D = (132, 124) — pada BC, kaki garis tinggi dari A

    viewBox hanya 10px ekstra ke atas: "0 -10 260 278"
    busur sangat kecil, puncak hanya 5-6px di atas titik B.

    Stream 1 — B→D — busur SANGAT KECIL (Q 130,-5):
      puncak ≈ y≈17, hanya 5px di atas B

    Stream 2 — B→C — busur KECIL (Q 190,-15):
      puncak ≈ y≈16, hanya 6px di atas B, busur lebih lebar
  */
  const pathAB  = "M 55,182 L 55,22";
  const pathBD  = "M 55,22 Q 130,-5 132,124";   // busur kecil B→D
  const pathBC  = "M 55,22 Q 190,-15 175,182";  // busur kecil B→C (lebih lebar)

  /* Aliran air realistis: tiga lapisan stroke-dashoffset yang mengalir */
  const flowStream = (path: string, color: string, highlight: string, dur: number, width: number) => (
    <>
      {/* lapisan cahaya luar (glow) */}
      <path d={path} fill="none" stroke={color} strokeWidth={width + 5}
        strokeOpacity="0.10" strokeLinecap="round" filter="url(#wfGlow)"/>
      {/* aliran utama — ruas besar */}
      <path d={path} fill="none" stroke={color} strokeWidth={width}
        strokeDasharray="13 8" strokeLinecap="round" strokeOpacity="0.70">
        <animate attributeName="stroke-dashoffset" from="21" to="0"
          dur={`${dur}s`} repeatCount="indefinite"/>
      </path>
      {/* lapisan kedua — ruas kecil, lebih cepat */}
      <path d={path} fill="none" stroke={color} strokeWidth={width - 0.8}
        strokeDasharray="6 15" strokeLinecap="round" strokeOpacity="0.45">
        <animate attributeName="stroke-dashoffset" from="21" to="0"
          dur={`${(dur * 0.62).toFixed(2)}s`} repeatCount="indefinite"/>
      </path>
      {/* utas kilap tipis di atas */}
      <path d={path} fill="none" stroke={highlight} strokeWidth={0.9}
        strokeDasharray="4 17" strokeLinecap="round" strokeOpacity="0.90">
        <animate attributeName="stroke-dashoffset" from="21" to="0"
          dur={`${(dur * 0.42).toFixed(2)}s`} repeatCount="indefinite"/>
      </path>
    </>
  );

  return (
    <div className="space-y-4">
      {/* Keterangan teknik */}
      <div className="bg-blue-950/60 border border-blue-400/30 rounded-lg p-4">
        <p className="font-body text-xs text-blue-200 leading-relaxed">
          {t.waterfallStory1}{" "}
          <strong className="text-white">A → B</strong> {t.throughVertical}{" "}
          <strong className="text-white">B</strong> {t.waterFlows}{" "}
          <strong className="text-cyan-300">{t.twoDirections}</strong>:{" "}
          <span className="text-cyan-300 font-bold">① {t.to} D</span> {t.andThen}{" "}
          <span className="text-sky-200 font-bold">② {t.directTo} C</span>{t.memoryFormula1}{" "}
          <strong className="text-cyan-300">AB² = BD × BC!</strong>
        </p>
      </div>

      {/* Legenda warna */}
      <div className="flex gap-3 justify-center font-body text-xs">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-8 h-2 rounded-full" style={{background:"#06b6d4"}}/>
          <span className="text-cyan-300 font-semibold">① B → D</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-8 h-2 rounded-full" style={{background:"#bae6fd"}}/>
          <span className="text-sky-200 font-semibold">② B → C</span>
        </div>
      </div>

      {/* SVG animasi */}
      <div className="bg-slate-950/90 border border-blue-500/25 rounded-xl p-3">
        {/*
          viewBox diperluas 52px ke atas (y mulai -52) supaya busur
          parabola yang naik melewati titik B masih terlihat dalam frame.
          Total tinggi koordinat: -52 → 268 = 320 unit.
        */}
        <svg viewBox="0 -10 260 304" className="w-full max-w-sm mx-auto">
          <defs>
            <filter id="wfGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2.8" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Segitiga utama — tiap rusuk digambar terpisah */}
          {/* Rusuk AB (tegak) — biru air */}
          <line x1="55" y1="22" x2="55" y2="182" stroke="#38bdf8" strokeWidth="2.2"/>
          {/* Rusuk AC (alas) — kuning */}
          <line x1="55" y1="182" x2="175" y2="182" stroke="#facc15" strokeWidth="2.2"/>
          {/* Rusuk BC (miring) — kuning */}
          <line x1="55" y1="22" x2="175" y2="182" stroke="#facc15" strokeWidth="2.2"/>
          {/* Garis tinggi AD (kuning putus) */}
          <line x1="55" y1="182" x2="132" y2="124" stroke="#facc15" strokeWidth="1.8" strokeDasharray="5,3"/>
          {/* Sudut siku-siku di A */}
          <path d="M 55,173 L 64,173 L 64,182" fill="none" stroke="#f97316" strokeWidth="1.5"/>
          {/* Sudut siku-siku di D */}
          <path d="M 125.6,129.6 L 121.6,122.8 L 128.4,118.8" fill="none" stroke="#f97316" strokeWidth="1.5"/>

          {/* ── Aliran A→B (vertikal, biru air) ── */}
          {flowStream(pathAB, "#38bdf8", "#e0f2fe", 2.2, 3.0)}

          {/* ── Aliran B→D (busur kecil, cyan terang) ── */}
          {flowStream(pathBD, "#06b6d4", "#a5f3fc", 1.8, 2.8)}

          {/* ── Aliran B→C (busur lebar, biru muda) ── */}
          {flowStream(pathBC, "#bae6fd", "#f0f9ff", 2.6, 2.8)}

          {/* ── Ripple di B (titik percabangan) ── */}
          <circle cx="55" cy="22" r="5" fill="#38bdf8" opacity="0.9">
            <animate attributeName="r" values="4;18;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.9;0;0.9" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="55" cy="22" r="3" fill="#e0f2fe" opacity="0.7">
            <animate attributeName="r" values="3;11;3" dur="2s" begin="0.3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.7;0;0.7" dur="2s" begin="0.3s" repeatCount="indefinite"/>
          </circle>

          {/* ── Splash di D (endpoint stream 1) ── */}
          <circle cx="132" cy="124" r="4" fill="#06b6d4" opacity="0">
            <animate attributeName="r" values="3;10;3" dur="1.9s" begin="0.05s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;0.75;0" dur="1.9s" begin="0.05s" repeatCount="indefinite"/>
          </circle>

          {/* ── Splash di C (endpoint stream 2) ── */}
          <circle cx="175" cy="182" r="4" fill="#bae6fd" opacity="0">
            <animate attributeName="r" values="3;11;3" dur="2.8s" begin="0.1s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;0.75;0" dur="2.8s" begin="0.1s" repeatCount="indefinite"/>
          </circle>


          {/* Label vertex — putih */}
          <text x="36" y="20"  fontSize="13" fill="#ffffff" fontWeight="bold">B</text>
          <text x="36" y="197" fontSize="13" fill="#ffffff" fontWeight="bold">A</text>
          <text x="178" y="197" fontSize="13" fill="#ffffff" fontWeight="bold">C</text>
          <text x="136" y="120" fontSize="13" fill="#ffffff" fontWeight="bold">D</text>

          {/* Label segmen — hijau cerah */}
          <text x="43" y="108" fontSize="11" fill="#4ade80" fontWeight="bold" textAnchor="middle">AB</text>
          {/* Label BD① — dekat puncak busur B→D (puncak ≈ x=113, y=17) */}
          <text x="113" y="14" fontSize="10" fill="#4ade80" fontWeight="bold" textAnchor="middle">BD ①</text>
          {/* Label BC② — di sisi kanan busur B→C, dekat jalur air (t=0.5 ≈ x=153, y=44) */}
          <text x="158" y="43" fontSize="10" fill="#4ade80" fontWeight="bold" textAnchor="start">BC ②</text>

          {/* Kotak rumus — jarak 20px dari alas segitiga (y=182), cukup lapang */}
          <rect x="8" y="210" width="244" height="82" rx="7" fill="#020d1a" stroke="#38bdf8" strokeWidth="1.8"/>
          <text x="130" y="226" textAnchor="middle" fontSize="8.5" fill="#7dd3fc" fontWeight="bold">
            {t.diagramSource1}
          </text>
          <text x="130" y="238" textAnchor="middle" fontSize="8.5" fill="#7dd3fc" fontWeight="bold">
            {t.diagramSplash1}
          </text>
          <line x1="20" y1="246" x2="240" y2="246" stroke="#38bdf8" strokeOpacity="0.25" strokeWidth="0.8"/>
          <text x="130" y="267" textAnchor="middle" fontSize="16" fill="#facc15" fontWeight="bold">AB² = BD × BC</text>
          <text x="130" y="282" textAnchor="middle" fontSize="7.5" fill="#bae6fd" opacity="0.7">
            {t.diagramFormulaMeaning}
          </text>
        </svg>
      </div>

      {/* Rangkuman cara hafal */}
      <div className="grid grid-cols-3 gap-2 text-center font-body text-xs">
        <div className="bg-blue-900/40 border border-blue-500/30 rounded-lg p-3 space-y-1">
          <p className="text-white/50">{t.sourceWater}</p>
          <p className="text-base">💧</p>
          <p className="text-cyan-300 font-bold">A → B</p>
          <p className="text-white/60">{t.squared}<br/><strong className="text-white">AB²</strong></p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-white/40 text-lg">=</p>
          <p className="text-white/30 text-[10px]">{t.equalTo}</p>
        </div>
        <div className="bg-blue-900/40 border border-blue-500/30 rounded-lg p-3 space-y-1">
          <p className="text-white/50">{t.resultSplash}</p>
          <p className="text-base">💦</p>
          <p className="text-cyan-300 font-bold">BD × BC</p>
          <p className="text-white/60">{t.twoWays}<br/><strong className="text-white">BD × BC</strong></p>
        </div>
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 text-center">
        <p className="font-body text-sm font-bold text-white">{t.key}</p>
        <p className="font-body text-xs text-white/70 mt-1 leading-relaxed">
          {t.rememberWater} <span className="text-cyan-300">{t.sprayUp}</span>{t.then}{" "}
          <span className="text-cyan-300">{t.splashTwo}</span>{t.commaPeriod}{" "}
          <span>{t.sourceWater}</span> <strong className="text-white">{t.sprayVerb}</strong>,
          {` `}{t.twoWays} <strong className="text-white">{t.splashVerb}</strong>!
        </p>
      </div>
    </div>
  );
};

/* ── WATERFALL (b) ────────────────────────────────────────────────────────
   Air mengalir A→C (alas), menyembur dari C ke D dan ke B.
   AC² = CD × CB
──────────────────────────────────────────────────────────────────────────── */
const WaterfallAnimasiTegak = ({ t }: { t: T }) => {
  // B=(55,22)  A=(55,182)  C=(175,182)  D=(132,124)
  const pathAC  = "M 55,182 L 175,182";
  // Busur C→D: bows sedikit ke kanan
  const pathCD  = "M 175,182 Q 185,148 132,124";
  // Busur C→B: diperbesar agar tidak berdempet dengan garis CB
  const pathCB  = "M 175,182 Q 155,70 55,22";

  const flowStream = (path: string, color: string, highlight: string, dur: number, width: number) => (
    <>
      <path d={path} fill="none" stroke={color} strokeWidth={width + 5}
        strokeOpacity="0.10" strokeLinecap="round" filter="url(#wfGlow2)"/>
      <path d={path} fill="none" stroke={color} strokeWidth={width}
        strokeDasharray="13 8" strokeLinecap="round" strokeOpacity="0.70">
        <animate attributeName="stroke-dashoffset" from="21" to="0"
          dur={`${dur}s`} repeatCount="indefinite"/>
      </path>
      <path d={path} fill="none" stroke={color} strokeWidth={width - 0.8}
        strokeDasharray="6 15" strokeLinecap="round" strokeOpacity="0.45">
        <animate attributeName="stroke-dashoffset" from="21" to="0"
          dur={`${(dur * 0.62).toFixed(2)}s`} repeatCount="indefinite"/>
      </path>
      <path d={path} fill="none" stroke={highlight} strokeWidth={0.9}
        strokeDasharray="4 17" strokeLinecap="round" strokeOpacity="0.90">
        <animate attributeName="stroke-dashoffset" from="21" to="0"
          dur={`${(dur * 0.42).toFixed(2)}s`} repeatCount="indefinite"/>
      </path>
    </>
  );

  return (
    <div className="space-y-4">
      <div className="bg-blue-950/60 border border-blue-400/30 rounded-lg p-4">
        <p className="font-body text-xs text-blue-200 leading-relaxed">
          {t.waterfallStory2}{" "}
          <strong className="text-white">A → C</strong> {t.alongBase}{" "}
          <strong className="text-white">C</strong> {t.flows}{" "}
          <strong className="text-cyan-300">{t.waterTwoDirections}</strong>:{" "}
          <span className="text-cyan-300 font-bold">① {t.to} D</span> {t.andThen}{" "}
          <span className="text-sky-200 font-bold">② {t.to} B</span>{t.memorize}{" "}
          <strong className="text-cyan-300">AC² = CD × CB!</strong>
        </p>
      </div>

      <div className="flex gap-3 justify-center font-body text-xs">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-8 h-2 rounded-full" style={{background:"#06b6d4"}}/>
          <span className="text-cyan-300 font-semibold">① C → D</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-8 h-2 rounded-full" style={{background:"#bae6fd"}}/>
          <span className="text-sky-200 font-semibold">② C → B</span>
        </div>
      </div>

      <div className="bg-slate-950/90 border border-blue-500/25 rounded-xl p-3">
        <svg viewBox="0 0 260 290" className="w-full max-w-sm mx-auto">
          <defs>
            <filter id="wfGlow2" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2.8" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Segitiga */}
          <line x1="55" y1="22" x2="55" y2="182" stroke="#facc15" strokeWidth="2.2"/>
          <line x1="55" y1="182" x2="175" y2="182" stroke="#38bdf8" strokeWidth="2.2"/>
          <line x1="55" y1="22" x2="175" y2="182" stroke="#facc15" strokeWidth="2.2"/>
          <line x1="55" y1="182" x2="132" y2="124" stroke="#facc15" strokeWidth="1.8" strokeDasharray="5,3"/>
          <path d="M 55,173 L 64,173 L 64,182" fill="none" stroke="#f97316" strokeWidth="1.5"/>
          <path d="M 125.6,129.6 L 121.6,122.8 L 128.4,118.8" fill="none" stroke="#f97316" strokeWidth="1.5"/>

          {/* Aliran A→C */}
          {flowStream(pathAC, "#38bdf8", "#e0f2fe", 2.0, 3.0)}
          {/* Busur C→D */}
          {flowStream(pathCD, "#06b6d4", "#a5f3fc", 1.7, 2.8)}
          {/* Busur C→B */}
          {flowStream(pathCB, "#bae6fd", "#f0f9ff", 2.5, 2.8)}

          {/* Ripple di C */}
          <circle cx="175" cy="182" r="5" fill="#38bdf8" opacity="0.9">
            <animate attributeName="r" values="4;18;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.9;0;0.9" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="175" cy="182" r="3" fill="#e0f2fe" opacity="0.7">
            <animate attributeName="r" values="3;11;3" dur="2s" begin="0.3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.7;0;0.7" dur="2s" begin="0.3s" repeatCount="indefinite"/>
          </circle>

          {/* Splash di D */}
          <circle cx="132" cy="124" r="4" fill="#06b6d4" opacity="0">
            <animate attributeName="r" values="3;10;3" dur="1.7s" begin="0.05s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;0.75;0" dur="1.7s" begin="0.05s" repeatCount="indefinite"/>
          </circle>
          {/* Splash di B */}
          <circle cx="55" cy="22" r="4" fill="#bae6fd" opacity="0">
            <animate attributeName="r" values="3;10;3" dur="2.5s" begin="0.1s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;0.75;0" dur="2.5s" begin="0.1s" repeatCount="indefinite"/>
          </circle>

          {/* Label vertex */}
          <text x="36" y="20"  fontSize="13" fill="#ffffff" fontWeight="bold">B</text>
          <text x="36" y="197" fontSize="13" fill="#ffffff" fontWeight="bold">A</text>
          <text x="178" y="197" fontSize="13" fill="#ffffff" fontWeight="bold">C</text>
          <text x="136" y="120" fontSize="13" fill="#ffffff" fontWeight="bold">D</text>

          {/* Label segmen */}
          <text x="115" y="197" fontSize="11" fill="#4ade80" fontWeight="bold" textAnchor="middle">AC</text>
          {/* CD① — dekat titik tengah busur C→D (≈ x=169, y=151) */}
          <text x="190" y="152" fontSize="10" fill="#4ade80" fontWeight="bold" textAnchor="start">CD ①</text>
          {/* CB② — dekat titik tengah busur C→B (≈ x=125, y=96) */}
          <text x="128" y="88" fontSize="10" fill="#4ade80" fontWeight="bold" textAnchor="middle">CB ②</text>

          {/* Kotak rumus */}
          <rect x="8" y="200" width="244" height="82" rx="7" fill="#020d1a" stroke="#38bdf8" strokeWidth="1.8"/>
          <text x="130" y="216" textAnchor="middle" fontSize="8.5" fill="#7dd3fc" fontWeight="bold">
            {t.diagramSource2}
          </text>
          <text x="130" y="228" textAnchor="middle" fontSize="8.5" fill="#7dd3fc" fontWeight="bold">
            {t.diagramSplash2}
          </text>
          <line x1="20" y1="236" x2="240" y2="236" stroke="#38bdf8" strokeOpacity="0.25" strokeWidth="0.8"/>
          <text x="130" y="257" textAnchor="middle" fontSize="16" fill="#facc15" fontWeight="bold">AC² = CD × CB</text>
          <text x="130" y="272" textAnchor="middle" fontSize="7.5" fill="#bae6fd" opacity="0.7">
            {t.diagramFormulaMeaning}
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2 font-body text-xs text-center">
        <div className="bg-blue-900/40 border border-blue-500/30 rounded-lg p-3 space-y-1">
          <p className="text-white/50">{t.sourceWater}</p>
          <p className="text-base">💧</p>
          <p className="text-cyan-300 font-bold">A → C</p>
          <p className="text-white/60">{t.squared}<br/><strong className="text-white">AC²</strong></p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-white/40 text-lg">=</p>
          <p className="text-white/30 text-[10px]">{t.equalTo}</p>
        </div>
        <div className="bg-blue-900/40 border border-blue-500/30 rounded-lg p-3 space-y-1">
          <p className="text-white/50">{t.resultShooting}</p>
          <p className="text-base">💦</p>
          <p className="text-cyan-300 font-bold">CD × CB</p>
          <p className="text-white/60">{t.twoWays}<br/><strong className="text-white">CD × CB</strong></p>
        </div>
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 text-center">
        <p className="font-body text-sm font-bold text-white">{t.key}</p>
        <p className="font-body text-xs text-white/70 mt-1 leading-relaxed">
          {t.flows} <span className="text-cyan-300">{t.flowingBase}</span>{t.then}{" "}
          <span className="text-cyan-300">{t.splashCDCB}</span>{t.commaPeriod}{" "}
          <strong className="text-white">{t.sprayVerb}</strong>, {t.twoWays}{" "}
          <strong className="text-white">{t.splashVerb}</strong>!
        </p>
      </div>
    </div>
  );
};

/* ── WATERFALL (c) ────────────────────────────────────────────────────────
   Air mengalir A→D (garis tinggi), menyembur dari D ke B dan ke C.
   AD² = DB × DC
──────────────────────────────────────────────────────────────────────────── */
const WaterfallAnimasiTinggi = ({ t }: { t: T }) => {
  // B=(55,22)  A=(55,182)  C=(175,182)  D=(132,124)
  const pathAD  = "M 55,182 L 132,124";
  // Busur D→B: diperbesar, melengkung ke kanan-atas agar jelas terpisah dari garis DB
  const pathDB  = "M 132,124 Q 120,40 55,22";
  // Busur D→C: melengkung ke bawah-kanan (pendek)
  const pathDC  = "M 132,124 Q 168,143 175,182";

  const flowStream = (path: string, color: string, highlight: string, dur: number, width: number) => (
    <>
      <path d={path} fill="none" stroke={color} strokeWidth={width + 5}
        strokeOpacity="0.10" strokeLinecap="round" filter="url(#wfGlow3)"/>
      <path d={path} fill="none" stroke={color} strokeWidth={width}
        strokeDasharray="13 8" strokeLinecap="round" strokeOpacity="0.70">
        <animate attributeName="stroke-dashoffset" from="21" to="0"
          dur={`${dur}s`} repeatCount="indefinite"/>
      </path>
      <path d={path} fill="none" stroke={color} strokeWidth={width - 0.8}
        strokeDasharray="6 15" strokeLinecap="round" strokeOpacity="0.45">
        <animate attributeName="stroke-dashoffset" from="21" to="0"
          dur={`${(dur * 0.62).toFixed(2)}s`} repeatCount="indefinite"/>
      </path>
      <path d={path} fill="none" stroke={highlight} strokeWidth={0.9}
        strokeDasharray="4 17" strokeLinecap="round" strokeOpacity="0.90">
        <animate attributeName="stroke-dashoffset" from="21" to="0"
          dur={`${(dur * 0.42).toFixed(2)}s`} repeatCount="indefinite"/>
      </path>
    </>
  );

  return (
    <div className="space-y-4">
      <div className="bg-blue-950/60 border border-blue-400/30 rounded-lg p-4">
        <p className="font-body text-xs text-blue-200 leading-relaxed">
          {t.waterfallStory3}{" "}
          <strong className="text-white">A → D</strong> {t.alongAltitude}{" "}
          <strong className="text-white">D</strong> {t.flows}{" "}
          <strong className="text-cyan-300">{t.waterTwoDirections}</strong>:{" "}
          <span className="text-cyan-300 font-bold">① {t.to} B</span> {t.andThen}{" "}
          <span className="text-sky-200 font-bold">② {t.to} C</span>{t.memorize}{" "}
          <strong className="text-cyan-300">AD² = DB × DC!</strong>
        </p>
      </div>

      <div className="flex gap-3 justify-center font-body text-xs">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-8 h-2 rounded-full" style={{background:"#06b6d4"}}/>
          <span className="text-cyan-300 font-semibold">① D → B</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-8 h-2 rounded-full" style={{background:"#bae6fd"}}/>
          <span className="text-sky-200 font-semibold">② D → C</span>
        </div>
      </div>

      <div className="bg-slate-950/90 border border-blue-500/25 rounded-xl p-3">
        <svg viewBox="0 0 260 290" className="w-full max-w-sm mx-auto">
          <defs>
            <filter id="wfGlow3" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2.8" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Segitiga */}
          <line x1="55" y1="22" x2="55" y2="182" stroke="#facc15" strokeWidth="2.2"/>
          <line x1="55" y1="182" x2="175" y2="182" stroke="#facc15" strokeWidth="2.2"/>
          <line x1="55" y1="22" x2="175" y2="182" stroke="#facc15" strokeWidth="2.2"/>
          {/* Garis tinggi AD — biru air (sumber) */}
          <line x1="55" y1="182" x2="132" y2="124" stroke="#38bdf8" strokeWidth="2.2"/>
          <path d="M 55,173 L 64,173 L 64,182" fill="none" stroke="#f97316" strokeWidth="1.5"/>
          <path d="M 125.6,129.6 L 121.6,122.8 L 128.4,118.8" fill="none" stroke="#f97316" strokeWidth="1.5"/>

          {/* Aliran A→D */}
          {flowStream(pathAD, "#38bdf8", "#e0f2fe", 1.8, 3.0)}
          {/* Busur D→B */}
          {flowStream(pathDB, "#06b6d4", "#a5f3fc", 2.0, 2.8)}
          {/* Busur D→C */}
          {flowStream(pathDC, "#bae6fd", "#f0f9ff", 1.5, 2.8)}

          {/* Ripple di D */}
          <circle cx="132" cy="124" r="5" fill="#38bdf8" opacity="0.9">
            <animate attributeName="r" values="4;18;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.9;0;0.9" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="132" cy="124" r="3" fill="#e0f2fe" opacity="0.7">
            <animate attributeName="r" values="3;11;3" dur="2s" begin="0.3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.7;0;0.7" dur="2s" begin="0.3s" repeatCount="indefinite"/>
          </circle>

          {/* Splash di B */}
          <circle cx="55" cy="22" r="4" fill="#06b6d4" opacity="0">
            <animate attributeName="r" values="3;10;3" dur="2.0s" begin="0.05s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;0.75;0" dur="2.0s" begin="0.05s" repeatCount="indefinite"/>
          </circle>
          {/* Splash di C */}
          <circle cx="175" cy="182" r="4" fill="#bae6fd" opacity="0">
            <animate attributeName="r" values="3;10;3" dur="1.5s" begin="0.1s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;0.75;0" dur="1.5s" begin="0.1s" repeatCount="indefinite"/>
          </circle>

          {/* Label vertex */}
          <text x="36" y="20"  fontSize="13" fill="#ffffff" fontWeight="bold">B</text>
          <text x="36" y="197" fontSize="13" fill="#ffffff" fontWeight="bold">A</text>
          <text x="178" y="197" fontSize="13" fill="#ffffff" fontWeight="bold">C</text>
          <text x="136" y="120" fontSize="13" fill="#ffffff" fontWeight="bold">D</text>

          {/* Label segmen */}
          {/* AD — tengah garis tinggi (≈ x=93,y=153) */}
          <text x="72" y="156" fontSize="11" fill="#4ade80" fontWeight="bold" textAnchor="middle">AD</text>
          {/* DB① — tengah busur D→B (busur baru ≈ x=107,y=57) */}
          <text x="122" y="50" fontSize="10" fill="#4ade80" fontWeight="bold" textAnchor="start">DB ①</text>
          {/* DC② — tengah busur D→C (≈ x=161,y=148) */}
          <text x="178" y="146" fontSize="10" fill="#4ade80" fontWeight="bold" textAnchor="start">DC ②</text>

          {/* Kotak rumus */}
          <rect x="8" y="200" width="244" height="82" rx="7" fill="#020d1a" stroke="#38bdf8" strokeWidth="1.8"/>
          <text x="130" y="216" textAnchor="middle" fontSize="8.5" fill="#7dd3fc" fontWeight="bold">
            {t.diagramSource3}
          </text>
          <text x="130" y="228" textAnchor="middle" fontSize="8.5" fill="#7dd3fc" fontWeight="bold">
            {t.diagramSplash3}
          </text>
          <line x1="20" y1="236" x2="240" y2="236" stroke="#38bdf8" strokeOpacity="0.25" strokeWidth="0.8"/>
          <text x="130" y="257" textAnchor="middle" fontSize="16" fill="#facc15" fontWeight="bold">AD² = DB × DC</text>
          <text x="130" y="272" textAnchor="middle" fontSize="7.5" fill="#bae6fd" opacity="0.7">
            {t.diagramFormulaMeaning}
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2 font-body text-xs text-center">
        <div className="bg-blue-900/40 border border-blue-500/30 rounded-lg p-3 space-y-1">
          <p className="text-white/50">{t.sourceWater}</p>
          <p className="text-base">💧</p>
          <p className="text-cyan-300 font-bold">A → D</p>
          <p className="text-white/60">{t.squared}<br/><strong className="text-white">AD²</strong></p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-white/40 text-lg">=</p>
          <p className="text-white/30 text-[10px]">{t.equalTo}</p>
        </div>
        <div className="bg-blue-900/40 border border-blue-500/30 rounded-lg p-3 space-y-1">
          <p className="text-white/50">{t.resultShooting}</p>
          <p className="text-base">💦</p>
          <p className="text-cyan-300 font-bold">DB × DC</p>
          <p className="text-white/60">{t.twoWays}<br/><strong className="text-white">DB × DC</strong></p>
        </div>
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 text-center">
        <p className="font-body text-sm font-bold text-white">{t.key}</p>
        <p className="font-body text-xs text-white/70 mt-1 leading-relaxed">
          {t.flows} <span className="text-cyan-300">{t.flowingAltitude}</span>{t.then}{" "}
          <span className="text-cyan-300">{t.splashDBDC}</span>{t.commaPeriod}{" "}
          <strong className="text-white">{t.sprayVerb}</strong>, {t.twoWays}{" "}
          <strong className="text-white">{t.splashVerb}</strong>!
        </p>
      </div>
    </div>
  );
};

const PerbandinganRusukSikuSikuPage = () => {
  const { language } = useLanguage();
  const t = pickLang(translations, language);
  const navigate = useNavigate();
  const expandedSections = { includes: (_: string) => true };
  const Header = ({ icon, color, label }: { id?: string; icon: React.ReactNode; color: string; label: string }) => (
    <div className="w-full flex items-center px-5 py-4">
      <div className="flex items-center gap-3"><span style={{ color }}>{icon}</span><span className="font-body font-semibold text-white">{label}</span></div>
    </div>
  );

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden kesebangunan-kekongruenan-route">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <BookOpen className="w-10 h-10 text-primary mx-auto mb-3" />
        <h1 className="font-display text-xl md:text-2xl font-bold text-primary text-glow-cyan mb-2 text-center">{t.title}</h1>
        <p className="text-white/50 text-xs text-center mb-2 font-body">{t.subtitle}</p>
        <p className="text-white/50 text-xs text-center mb-6 font-body">{t.grade}</p>

        <div className="flex flex-col gap-4 animate-slide-up">

          {/* INTRO */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <Header id="intro" icon={<Lightbulb className="w-5 h-5" />} color="#facc15" label={t.setup} />
            {true && (
              <div className="px-5 pb-5 space-y-4">
                <p className="font-body text-sm text-white/80 leading-relaxed">
                  {t.intro} <strong className="text-cyan-300">{t.altitude}</strong>{t.intro2} <strong>{t.similar}</strong> {t.intro3}
                </p>
                <div className="bg-slate-800/60 border border-slate-600/40 rounded-lg p-4">
                  <p className="font-body text-xs font-semibold text-slate-300 mb-3">{t.diagramTitle}</p>
                  <DiagramSikuSiku t={t} />
                </div>
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                  <p className="font-body text-sm text-cyan-200">
                    <strong>{t.formed}</strong><br />
                    {t.similarTriangles}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* a: PROYEKSI RUSUK ALAS */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <Header id="konsep1" icon={<Target className="w-5 h-5" />} color="#4ade80" label={t.projectionBase} />
            {true && (
              <div className="px-5 pb-5 space-y-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 space-y-3">
                  <p className="font-body text-sm font-semibold text-green-300">{t.takeaway}</p>
                  <p className="font-body text-sm text-white/80">{t.noticeABD}</p>
                  <div className="bg-slate-900/60 rounded-lg p-4 space-y-2">
                    <p className="font-body text-sm text-white/70"><InlineMath math="\frac{BD}{AB} = \frac{AB}{BC} = \frac{AD}{AC}" /> {t.corresponding}</p>
                    <BlockMath math="\boxed{AB^2 = BD \times BC}" />
                    <p className="font-body text-xs text-white/60 text-center">{t.baseSquare}</p>
                  </div>
                </div>

                <div className="bg-slate-800/60 border border-slate-600/40 rounded-lg p-4">
                  <DiagramProyeksiAlas t={t} />
                </div>
              </div>
            )}
          </div>

          {/* WATERFALL (a) — AB² = BD × BC */}
          <div className="bg-card/80 backdrop-blur border border-blue-500/40 rounded-xl overflow-hidden">
            <Header id="waterfall" icon={<span className="text-base">💧</span>} color="#38bdf8" label={t.waterfallA} />
            {true && (
              <div className="px-5 pb-5 pt-2">
                <WaterfallAnimasiAlas t={t} />
              </div>
            )}
          </div>

          {/* b: PROYEKSI RUSUK TEGAK */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <Header id="konsep2" icon={<Target className="w-5 h-5" />} color="#c084fc" label={t.projectionVertical} />
            {true && (
              <div className="px-5 pb-5 space-y-4">
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 space-y-3">
                  <p className="font-body text-sm font-semibold text-purple-300">{t.takeaway}</p>
                  <p className="font-body text-sm text-white/80">{t.noticeCDA}</p>
                  <div className="bg-slate-900/60 rounded-lg p-4 space-y-2">
                    <p className="font-body text-sm text-white/70"><InlineMath math="\frac{CD}{AC} = \frac{AC}{BC} = \frac{AD}{AB}" /></p>
                    <BlockMath math="\boxed{AC^2 = CD \times CB}" />
                    <p className="font-body text-xs text-white/60 text-center">{t.verticalSquare}</p>
                  </div>
                </div>

                <div className="bg-slate-800/60 border border-slate-600/40 rounded-lg p-4">
                  <DiagramProyeksiTegak t={t} />
                </div>
              </div>
            )}
          </div>

          {/* WATERFALL (b) — AC² = CD × CB */}
          <div className="bg-card/80 backdrop-blur border border-blue-500/40 rounded-xl overflow-hidden">
            <Header id="waterfall2" icon={<span className="text-base">💧</span>} color="#38bdf8" label={t.waterfallB} />
            {true && (
              <div className="px-5 pb-5 pt-2">
                <WaterfallAnimasiTegak t={t} />
              </div>
            )}
          </div>

          {/* c: GARIS TINGGI */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <Header id="konsep3" icon={<Target className="w-5 h-5" />} color="#22c55e" label={t.altitudeFormula} />
            {true && (
              <div className="px-5 pb-5 space-y-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 space-y-3">
                  <p className="font-body text-sm font-semibold text-green-300">{t.takeaway}</p>
                  <p className="font-body text-sm text-white/80">{t.noticeAltitude}</p>
                  <div className="bg-slate-900/60 rounded-lg p-4 space-y-2">
                    <p className="font-body text-sm text-white/70"><InlineMath math="\frac{BD}{AD} = \frac{AD}{BD} = \frac{BD}{AC}" /></p>
                    <BlockMath math="\boxed{AD^2 = BD \times DC}" />
                    <p className="font-body text-xs text-white/60 text-center">{t.altitudeSquare}</p>
                  </div>
                </div>

                <div className="bg-slate-800/60 border border-slate-600/40 rounded-lg p-4">
                  <DiagramGarisTinggi t={t} />
                </div>
              </div>
            )}
          </div>

          {/* WATERFALL (c) — AD² = DB × DC */}
          <div className="bg-card/80 backdrop-blur border border-blue-500/40 rounded-xl overflow-hidden">
            <Header id="waterfall3" icon={<span className="text-base">💧</span>} color="#38bdf8" label={t.waterfallC} />
            {true && (
              <div className="px-5 pb-5 pt-2">
                <WaterfallAnimasiTinggi t={t} />
              </div>
            )}
          </div>

          {/* d: HUBUNGAN RUSUK */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <Header id="konsep4" icon={<Target className="w-5 h-5" />} color="#f97316" label={t.sideRelation} />
            {true && (
              <div className="px-5 pb-5 space-y-4">
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 space-y-3">
                  <p className="font-body text-sm font-semibold text-orange-300">{t.takeaway}</p>
                  <p className="font-body text-sm text-white/80">{t.areaIntro}</p>
                  <div className="bg-slate-900/60 rounded-lg p-4 space-y-2">
                    <p className="font-body text-sm text-white/70">{t.areaWay1}</p>
                    <BlockMath math="L = \frac{AB \times AC}{2}" />
                    <p className="font-body text-sm text-white/70">{t.areaWay2}</p>
                    <BlockMath math="L = \frac{BC \times AD}{2}" />
                    <p className="font-body text-sm text-white/70">{t.equalAreas}</p>
                    <BlockMath math="\boxed{AB \times AC = BC \times AD}" />
                    <p className="font-body text-xs text-white/60 text-center">{t.areaRelation}</p>
                  </div>
                </div>

                <div className="bg-slate-800/60 border border-slate-600/40 rounded-lg p-4">
                  <DiagramHubunganRusuk t={t} />
                </div>

                {/* Rangkuman semua rumus */}
                <div className="bg-slate-800/60 border border-orange-500/30 rounded-lg p-4">
                  <p className="font-body text-xs font-semibold text-orange-300 mb-3">{t.allFormulas}</p>
                  <div className="overflow-x-auto">
                    <table className="w-full font-body text-xs text-white/80">
                      <thead><tr className="border-b border-orange-500/30">
                        <th className="text-left py-2 text-orange-300">{t.formula}</th>
                        <th className="text-left py-2 text-orange-300">{t.note}</th>
                      </tr></thead>
                      <tbody className="divide-y divide-slate-700">
                        <tr><td className="py-2"><InlineMath math="AB^2 = BD \times BC" /></td><td className="py-2 text-green-300">{t.baseProjection}</td></tr>
                        <tr><td className="py-2"><InlineMath math="AC^2 = CD \times CB" /></td><td className="py-2 text-purple-300">{t.verticalProjection}</td></tr>
                        <tr><td className="py-2"><InlineMath math="AD^2 = BD \times DC" /></td><td className="py-2 text-cyan-300">{t.altitudeLabel}</td></tr>
                        <tr><td className="py-2"><InlineMath math="AB \times AC = BC \times AD" /></td><td className="py-2 text-yellow-300">{t.relationLabel}</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CONTOH SOAL */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <Header id="contoh1" icon={<Calculator className="w-5 h-5" />} color="#60a5fa" label={t.examples} />
            {true && (
              <div className="px-5 pb-5 space-y-6">
                {/* MUDAH */}
                <div className="border-l-4 border-green-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">{t.easy}</span>
                    <span className="font-body font-semibold text-white">{t.example} 1</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                    <p className="font-body text-sm text-white">{t.question1} <InlineMath math="BD = 3" /> cm {t.and} <InlineMath math="CD = 12" /> cm{t.question1End}</p>
                    {/* Diagram — △CAB siku-siku di A, D pada CB dengan AD⊥CB */}
                    <svg viewBox="0 0 270 215" className="w-full max-w-xs mx-auto">
                      {/* Segitiga CAB */}
                      <polygon points="80,20 80,180 210,180" fill="none" stroke="#facc15" strokeWidth="2"/>
                      {/* Garis tinggi AD */}
                      <line x1="80" y1="180" x2="158" y2="116" stroke="#facc15" strokeWidth="1.8"/>
                      {/* Sudut siku-siku di A */}
                      <path d="M 80,170 L 90,170 L 90,180" fill="none" stroke="#60a5fa" strokeWidth="1.8"/>
                      {/* Sudut siku-siku di D: p1 ke B, corner, p2 ke A */}
                      <path d="M 163.7,123.0 L 156.7,128.7 L 151.0,121.7" fill="none" stroke="#60a5fa" strokeWidth="1.8"/>
                      {/* Label vertex */}
                      <text x="72" y="16"  fontSize="14" fill="#ffffff" fontWeight="bold">C</text>
                      <text x="62" y="198" fontSize="14" fill="#ffffff" fontWeight="bold">A</text>
                      <text x="213" y="198" fontSize="14" fill="#ffffff" fontWeight="bold">B</text>
                      <text x="162" y="113" fontSize="14" fill="#ffffff" fontWeight="bold">D</text>
                      {/* Label sisi: BD=3, CD=12 */}
                      <text x="192" y="141" fontSize="12" fill="#ffffff" fontWeight="bold" textAnchor="middle">3</text>
                      <text x="136" y="63"  fontSize="12" fill="#ffffff" fontWeight="bold" textAnchor="middle">12</text>
                    </svg>
                    <p className="font-body text-sm text-white text-center">{t.question1Ask} <InlineMath math="AD" />, <InlineMath math="AB" />, {t.and} <InlineMath math="AC" /> {t.question1AskEnd}</p>
                  </div>
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-green-400 mb-3">{t.solution}</p>
                    <div className="space-y-2 font-body text-sm text-white/80">
                      <p>{t.ex1Given}</p>
                      <p><strong>{t.step1BC}</strong></p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="BC = BD + CD = 3 + 12 = 15\,\mathrm{cm}" />
                      </div>
                      <p><strong>{t.step2AD}</strong></p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="AD^2 = BD \times CD = 3 \times 12 = 36" />
                        <BlockMath math="AD = \sqrt{36} = 6\,\mathrm{cm}" />
                      </div>
                      <p><strong>{t.step3AB}</strong></p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="AB^2 = BD \times BC = 3 \times 15 = 45" />
                        <BlockMath math="AB = \sqrt{45} = 3\sqrt{5}\,\mathrm{cm}" />
                      </div>
                      <p><strong>{t.step4AC}</strong></p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="AC^2 = CD \times BC = 12 \times 15 = 180" />
                        <BlockMath math="AC = \sqrt{180} = 6\sqrt{5}\,\mathrm{cm}" />
                      </div>
                      <p><strong className="text-green-300">{t.ex1Answer}</strong></p>
                    </div>
                  </div>
                </div>
                {/* SULIT */}
                <div className="border-l-4 border-red-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded">{t.hard}</span>
                    <span className="font-body font-semibold text-white">{t.example} 3</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                    <p className="font-body text-sm text-white">{t.ex3Question}</p>
                    {/* Diagram — △ABC siku-siku di A, D pada BC dekat B, △ABD di-shading */}
                    <svg viewBox="0 0 260 218" className="w-full max-w-xs mx-auto">
                      {/* Shading △ABD (merah) */}
                      <polygon points="55,22 55,182 98,80" fill="#ef4444" fillOpacity="0.18" stroke="none"/>
                      {/* Shading △ADC (gelap) */}
                      <polygon points="55,182 175,182 98,80" fill="#94a3b8" fillOpacity="0.08" stroke="none"/>
                      {/* Segitiga utama ABC */}
                      <polygon points="55,22 55,182 175,182" fill="none" stroke="#facc15" strokeWidth="2"/>
                      {/* Garis tinggi AD */}
                      <line x1="55" y1="182" x2="98" y2="80" stroke="#facc15" strokeWidth="1.8"/>
                      {/* Sudut siku-siku di A */}
                      <path d="M 55,173 L 64,173 L 64,182" fill="none" stroke="#60a5fa" strokeWidth="1.8"/>
                      {/* Sudut siku-siku di D */}
                      <path d="M 102.8,86.4 L 99.7,93.8 L 94.9,87.4" fill="none" stroke="#60a5fa" strokeWidth="1.8"/>
                      {/* Label vertex */}
                      <text x="36"  y="20"  fontSize="13" fill="#ffffff" fontWeight="bold">B</text>
                      <text x="36"  y="197" fontSize="13" fill="#ffffff" fontWeight="bold">A</text>
                      <text x="178" y="197" fontSize="13" fill="#ffffff" fontWeight="bold">C</text>
                      <text x="101" y="76"  fontSize="13" fill="#ffffff" fontWeight="bold">D</text>
                      {/* Label BD = 9 */}
                      <text x="62"  y="52"  fontSize="11" fill="#fde68a" fontWeight="bold" textAnchor="middle">9</text>
                      {/* Label luas △ABD = 54 cm² di dalam shading merah */}
                      <text x="63"  y="108" fontSize="10" fill="#fca5a5" fontWeight="bold" textAnchor="middle">54 cm²</text>
                    </svg>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-red-400 mb-3">{t.solution}</p>
                    <div className="space-y-3 font-body text-sm text-white/80">
                      <div className="bg-slate-900/50 rounded p-3 space-y-2">
                        <p><strong>{t.findAD}</strong></p>
                        <BlockMath math="L_{ABD} = \frac{AD \times BD}{2} \Rightarrow 54 = \frac{AD \times 9}{2} \Rightarrow AD = 12\,\mathrm{cm}" />
                        <p><strong>{t.findDC}</strong></p>
                        <BlockMath math="AD^2 = BD \times DC \Rightarrow 144 = 9 \times DC \Rightarrow DC = 16\,\mathrm{cm}" />
                        <p><strong>{t.findBCAC}</strong></p>
                        <BlockMath math="BC = BD + DC = 9 + 16 = 25\,\mathrm{cm}" />
                        <BlockMath math="AC^2 = DC \times BC = 16 \times 25 = 400" />
                        <BlockMath math="AC = \sqrt{400} = 20\,\mathrm{cm}" />
                        <p><strong>{t.findArea}</strong></p>
                        <BlockMath math="L = \frac{BC \times AD}{2} = \frac{25 \times 12}{2} = 150\,\mathrm{cm}^2" />
                      </div>
                      <p><strong className="text-primary">{t.ex3Answer}</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>


          {/* ── RANGKUMAN, TIPS & TRIK, KESIMPULAN ── */}
          <div className="space-y-4">

            {/* Rangkuman */}
            <div className="bg-gradient-to-br from-violet-900/40 to-purple-900/40 border border-violet-500/30 rounded-xl p-5 space-y-4">
              <p className="font-body text-base font-bold text-violet-300">{t.summary}</p>
              <p className="font-body text-xs text-white/60">{t.summaryIntro}</p>
              <div className="overflow-x-auto">
                <table className="w-full font-body text-xs text-white/80">
                  <thead>
                    <tr className="border-b border-violet-500/30">
                      <th className="text-left py-2 pr-4 text-violet-300">{t.formula}</th>
                      <th className="text-left py-2 pr-4 text-violet-300">{t.meaning}</th>
                      <th className="text-left py-2 text-violet-300">{t.memory}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    <tr>
                      <td className="py-2 pr-4 font-mono"><InlineMath math="AD^2 = BD \times DC" /></td>
                      <td className="py-2 pr-4">{t.altitudeMean}</td>
                      <td className="py-2 text-yellow-300">{t.middleEnds}</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono"><InlineMath math="AB^2 = BD \times BC" /></td>
                      <td className="py-2 pr-4">{t.leftHyp}</td>
                      <td className="py-2 text-cyan-300">{t.leftBase}</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono"><InlineMath math="AC^2 = DC \times BC" /></td>
                      <td className="py-2 pr-4">{t.rightHyp}</td>
                      <td className="py-2 text-green-300">{t.rightBase}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-slate-900/60 rounded-lg p-3 space-y-1 font-body text-xs text-white/75">
                <p>📌 <strong className="text-violet-300">{t.threeSimilarTitle}</strong> {t.threeSimilarText}</p>
                <p>📌 <strong className="text-violet-300">{t.pythagorasTitle}</strong> {t.pythagorasText}</p>
                <p>📌 <strong className="text-violet-300">{t.conditionTitle}</strong> {t.conditionText}</p>
              </div>
            </div>

            {/* Tips & Trik */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 space-y-3">
              <p className="font-body text-base font-bold text-amber-300">{t.tips}</p>
              <div className="space-y-3 font-body text-sm text-white/80">
                <div className="flex gap-3">
                  <span className="text-amber-400 font-bold shrink-0">①</span>
                  <div>
                    <p><strong className="text-amber-300">{t.waterfallTip}</strong></p>
                    <div className="bg-slate-900/50 rounded p-3 mt-1 font-mono text-xs space-y-1 text-center">
                      <p className="text-yellow-300">AD² = BD · DC</p>
                      <p className="text-cyan-300">AB² = BD · BC &nbsp; | &nbsp; AC² = DC · BC</p>
                      <p className="text-white/50 text-xs mt-1">{t.smallLarge}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-amber-400 font-bold shrink-0">②</span>
                  <div>
                    <p><strong className="text-amber-300">{t.order}</strong></p>
                    <ol className="list-decimal list-inside space-y-1 ml-2 text-white/70 text-xs mt-1">
                      <li>{t.draw}</li>
                      <li>{t.findBC} <InlineMath math="BC = BD + DC" /></li>
                      <li>{t.useFormula}</li>
                      <li>{t.check} <InlineMath math="AB^2 + AC^2 = BC^2" /></li>
                    </ol>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-amber-400 font-bold shrink-0">③</span>
                  <p><strong className="text-amber-300">{t.areaProblem}</strong> {t.areaProblemText} <InlineMath math="\frac{1}{2} \times BC \times AD" /> {t.or} <InlineMath math="\frac{1}{2} \times AB \times AC" />{t.areaProblemEnd}</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-amber-400 font-bold shrink-0">④</span>
                  <p><strong className="text-amber-300">{t.variedNotation}</strong> {t.variedText} <em>{t.rightVertex}</em> {t.andWord} <em>{t.altitudeFoot}</em>{t.variedEnd}</p>
                </div>
              </div>
            </div>

            {/* Kesimpulan */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5 space-y-3">
              <p className="font-body text-base font-bold text-green-300">{t.conclusion}</p>
              <div className="space-y-2 font-body text-sm text-white/80">
                <p>{t.conclusionText} <strong className="text-yellow-300">{t.conclusionEmphasis}</strong> {t.conclusionEnd}</p>
                <div className="bg-slate-900/60 rounded-lg p-3 space-y-1">
                  <p>{t.oneAltitude} <strong className="text-violet-300">{t.threeFormulas}</strong>{t.forSides}</p>
                  <p>{t.principle} <strong className="text-cyan-300">{t.geometricMean}</strong></p>
                  <p>{t.hot}</p>
                  <p>{t.finalCheck}</p>
                </div>
                <p className="text-xs text-white/55 italic">{t.noteText}</p>
              </div>
            </div>

          </div>

        </div>
        <div className="mt-8 text-center">
          <button onClick={() => { playPopSound(); navigate("/buku-animasi-matematika/kesebangunan-kekongruenan"); }} className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body">
            {t.back}
          </button>
        </div>
      </div>
    </div>
  );
};
export default PerbandinganRusukSikuSikuPage;
