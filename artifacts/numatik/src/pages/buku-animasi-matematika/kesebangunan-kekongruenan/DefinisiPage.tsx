import {
  cloneElement,
  isValidElement,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { BookOpen, ChevronDown, ChevronUp, Lightbulb, Calculator, Target } from "lucide-react";
import { playPopSound } from "@/hooks/useAudio";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import SimilarityAnimation from "@/components/SimilarityAnimation";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { pickLang } from "@/lib/pickLang";

const id = {
  text: [
    "SEBANGUN (∼)",
    "sudut sama, rusuk sebanding",
    "Contoh segitiga dan segiempat kongruen",
    "CONTOH SEGITIGA KONGRUEN",
    "bentuk dan ukuran sama",
    "CONTOH TAMBAHAN: SEGIEMPAT KONGRUEN",
    "sisi-sisi dan sudut-sudut bersesuaian sama",
    "Dua pentagon kongruen, salah satunya diputar",
    "rotasi 180°",
    "Pentagon tak beraturan — ukuran sama, arah berbeda",
    "Dua segi delapan cekung kongruen, salah satunya dicerminkan",
    "cermin horizontal",
    "ABCDEFGH · segi-8 cekung",
    "PQRSTUVW · segi-8 cekung",
    "Segi-8 cekung — cermin mengubah arah, bukan ukuran",
    "sudut bersesuaian sama besar",
    "rusuk bersesuaian sebanding",
    "KONGRUEN (≅)",
    "seperti sebangun, PLUS",
    "ukuran (rusuk) juga SAMA",
    "Kongruen ⊂ Sebangun",
    "Dua bangun berundak sebangun pada grid",
    "Dua bangun bersisi miring sebangun pada grid",
    "DEFINISI KESEBANGUNAN DAN KEKONGRUENAN",
    "Kelas 9 · Kesebangunan dan Kekongruenan · Materi Matematika",
    "🏙️ Dari Maket Gedung sampai Ubin Lantai",
    "Pernah lihat maket gedung atau miniatur rumah di kantor arsitek? Miniatur itu punya bentuk persis sama dengan bangunan aslinya, hanya skalanya lebih kecil — itulah",
    "kesebangunan",
    "dalam kehidupan nyata!",
    "Maket gedung di meja arsitek dengan bangunan asli terlihat di latar belakang",
    "Maket gedung (depan) dan bangunan aslinya (belakang) — bentuk sama, ukuran berbeda. Inilah kesebangunan!",
    "bing.com/images/create",
    "dan ukuran yang persis sama, bukan hanya mirip bentuknya saja. Nah, itu namanya",
    "kekongruenan",
    "! 🧱",
    "Perbedaan Kunci:",
    "Dua bangun",
    "sebangun",
    "jika bentuknya sama (ukuran boleh beda). Dua bangun",
    "kongruen",
    "jika bentuk DAN ukurannya sama persis.",
    "📘 Sub-Bab 1: Definisi Kesebangunan",
    "🎯 Ringkasan Intisari",
    "Dua bangun datar disebut",
    "jika keduanya memenuhi dua syarat secara bersamaan:",
    "📊 Representasi Visual — warna sama = sisi bersesuaian",
    "①",
    "Sudut-sudut yang bersesuaian sama besar",
    "— setiap sudut di bangun pertama punya pasangan sudut yang sama besar di bangun kedua.",
    "②",
    "Rusuk-rusuk yang bersesuaian sebanding",
    "— panjang sisi-sisinya membentuk perbandingan yang sama.",
    "k = faktor skala (rasio kesebangunan)",
    "Tips:",
    "Penulisan dua bangun sebangun menggunakan simbol \"",
    "\". Contoh: ABCD",
    "EFGH. Urutan huruf menunjukkan titik-titik yang saling bersesuaian, jadi jangan sampai keliru urutannya!",
    "📝 Contoh Soal — Kesebangunan Bangun Datar",
    "MUDAH",
    "Contoh 1",
    "Persegi panjang ABCD dengan panjang",
    "cm dan lebar",
    "cm sebangun dengan persegi panjang PQRS. Jika",
    "cm, tentukan panjang",
    "!",
    "PEMBAHASAN:",
    "Langkah 1:",
    "Karena sebangun, rusuk-rusuk yang bersesuaian sebanding:",
    "Langkah 2:",
    "Selesaikan dengan perkalian silang:",
    "Panjang QR = 9 cm.",
    "SEDANG",
    "Contoh 2",
    "Segiempat ABCD",
    "EFGH. Diketahui",
    ". Tentukan besar",
    ", dan",
    "Sudut bersesuaian sama besar: ∠E=∠A, ∠F=∠B, ∠G=∠C, ∠H=∠D",
    "Cari",
    "dari jumlah sudut segiempat = 360°:",
    "Karena sebangun, sudut yang bersesuaian sama besar:",
    "∠E = 80°, ∠F = 95°, ∠G = 100°, ∠H = 85°.",
    "SULIT",
    "Contoh 3",
    "Segitiga ABC",
    "segitiga PQR dengan",
    "cm,",
    "cm. Jika keliling segitiga PQR = 45 cm, tentukan panjang PQ, QR, dan PR!",
    "Hitung keliling △ABC:",
    "Faktor skala dari ABC ke PQR:",
    "Langkah 3:",
    "Hitung setiap sisi △PQR:",
    "PQ = 12 cm, QR = 18 cm, PR = 15 cm.",
    "📝 Contoh Soal — Kesebangunan pada Grid",
    "Contoh 4",
    "Perhatikan dua bangun berundak pada grid berikut. Bangun ABCDEF dan PQRSTU sebangun. Jika",
    "kotak dan",
    "kotak, tentukan panjang",
    "dalam satuan kotak!",
    "Tentukan faktor skala dari bangun kecil ke bangun besar.",
    "Pada grid, panjang DE adalah 1 kotak. Sisi DE bersesuaian dengan ST.",
    "DE = 1 kotak dan ST = 2 kotak.",
    "Semua sisi yang bersesuaian memiliki perbandingan 1 : 2.",
    "Contoh 5",
    "Bangun ABCDE dan PQRST memiliki bentuk yang sama seperti pada grid. Diketahui",
    "kotak. Jika",
    "kotak, tentukan faktor skala dari PQRST ke ABCDE, serta panjang",
    "Gunakan pasangan sisi tegak DE dan ST untuk mencari faktor skala.",
    "Kalikan sisi-sisi bangun kecil dengan",
    "k = 2, AB = 4 kotak, dan CD = 4 kotak.",
    "Sisi miring juga ikut dikalikan 2, sehingga bentuk tetap sebangun.",
    "📘 Sub-Bab 2: Definisi Kekongruenan",
    "Kekongruenan",
    "adalah \"kesebangunan spesial\" — dua bangun datar disebut",
    "jika memenuhi:",
    "Rusuk-rusuk yang bersesuaian sama panjang",
    "(bukan hanya sebanding, tapi SAMA!)",
    "Simbol kongruen: ≅ (sama dan sebangun)",
    "🔍 ILUSTRASI DUA SEGITIGA KONGRUEN:",
    "🔍 HUBUNGAN SEBANGUN DAN KONGRUEN:",
    "Kunci Hubungan:",
    "Bangun yang",
    "sudah pasti",
    ", tapi bangun yang sebangun belum tentu kongruen (kecuali faktor skalanya",
    ").",
    "📝 Contoh Soal — Kekongruenan Bangun Datar",
    "Diketahui △ABC ≅ △PQR dengan",
    "cm, dan",
    "Kongruen → semua sisi & sudut bersesuaian SAMA. QR = √(12²+5²) = 13 cm",
    "Karena kongruen, sisi yang bersesuaian SAMA PANJANG:",
    "Cari QR dengan Teorema Pythagoras:",
    "PQ = 12 cm, PR = 5 cm, QR = 13 cm.",
    "Apakah pasangan berikut kongruen? Pentagon tak beraturan ABCDE dan PQRST memiliki ukuran sisi serta sudut bersesuaian yang sama. Bangun PQRST diputar 180° dari ABCDE. Jelaskan apakah perbedaan arah membuat keduanya tidak kongruen!",
    "Cek ukuran dan bentuk:",
    "Kedua pentagon memiliki sisi serta sudut bersesuaian yang sama.",
    "Cek posisi:",
    "Rotasi 180° hanya mengubah arah dan posisi, tidak mengubah panjang sisi maupun besar sudut.",
    "Kesimpulan: Kedua pentagon KONGRUEN ✓",
    "meskipun salah satunya tidak searah.",
    "Dua bangun cekung segi-8 ABCDEFGH dan PQRSTUVW memiliki bentuk serta ukuran yang sama. Bangun PQRSTUVW merupakan cerminan horizontal dari ABCDEFGH. Apakah kedua bangun tersebut kongruen? Jelaskan mengapa posisi terbalik tidak mengubah jawabannya!",
    "Cek jumlah sisi:",
    "Kedua bangun sama-sama merupakan segi-8 cekung, sehingga setiap titik dan sisi memiliki pasangan yang bersesuaian.",
    "Pencerminan hanya membalik arah bangun; panjang sisi dan besar sudut tetap sama.",
    "Faktor skala tidak berubah:",
    "Kedua segi-8 cekung tersebut SEBANGUN dan KONGRUEN.",
    "Cermin tidak mengubah ukuran bangun.",
    "Catatan: Rotasi dan pencerminan adalah transformasi yang mempertahankan jarak dan sudut.",
    "📋 Rangkuman — Definisi Kesebangunan & Kekongruenan",
    "Konsep",
    "Sudut",
    "Rusuk",
    "Faktor Skala",
    "Simbol",
    "Sebangun",
    "Sama besar",
    "Sebanding",
    "(bebas)",
    "Kongruen",
    "Sama panjang",
    "📌",
    "Hubungan penting:",
    "Kongruen ⊂ Sebangun (setiap bangun yang kongruen pasti sebangun, tetapi tidak sebaliknya)",
    "📌 Sebangun = \"bentuk sama, ukuran bisa berbeda\"   |  Kongruen = \"bentuk sama, ukuran tepat sama\"",
    "📌 Dua bangun sebangun jika: (1) semua sudut bersesuaian sama besar, DAN (2) semua rusuk bersesuaian sebanding dengan rasio",
    "yang konstan",
    "💡 Tips & Trik",
    "Cara cepat bedakan Sebangun vs Kongruen:",
    "Tanyakan \"apakah ukurannya persis sama?\" — jika YA → kongruen; jika TIDAK tapi bentuknya sama → sebangun.",
    "Hitung faktor skala k:",
    "Pilih sembarang pasang rusuk yang bersesuaian, lalu bagi:",
    ". Cek dengan pasangan lain — jika sama, berarti sebangun ✓",
    "③",
    "Perhatikan urutan penulisan:",
    "artinya A↔P, B↔Q, C↔R, D↔S. Urutan huruf menentukan pasangan sisi dan sudut!",
    "④",
    "Bangun beraturan sejenis selalu sebangun:",
    "Semua lingkaran sebangun, semua persegi sebangun, semua segitiga sama sisi sebangun — karena sudutnya selalu sama!",
    "✅ Kesimpulan",
    "Kesebangunan dan kekongruenan adalah dua konsep dasar dalam geometri yang mendeskripsikan",
    "hubungan antara dua bangun datar",
    "🔹",
    "Sebangun (",
    ")",
    "— \"saudara kembar berbeda ukuran\": bentuk sama, sudut sama, sisi sebanding",
    "Kongruen (",
    "— \"kembar identik\": bentuk sama, sudut sama, sisi sama persis",
    "🔹 Kongruen adalah kasus khusus sebangun dengan faktor skala",
    "Konsep ini menjadi dasar untuk mempelajari segitiga sebangun, menghitung panjang rusuk, dan membuktikan sifat-sifat geometri lanjutan.",
    "← Kembali ke Kesebangunan dan Kekongruenan"
],
  decimalOneHalf: "1,5",
  decimalTwoAndHalf: "2,5",
  decimalThreeAndHalf: "3,5",
  decimalThreeAndThreeQuarter: "3,75",
  decimalThousandsDisplay: "1.234,5",
  decimalThousandsMath: "1.234{,}5",
  scaleLabel: "Faktor skala",
  decimalThousandsLabel: "Contoh format desimal:",
  architectureIntro: "Pernah lihat maket gedung atau miniatur rumah di kantor arsitek? Miniatur itu punya bentuk persis sama dengan bangunan aslinya, hanya skalanya lebih kecil — itulah kesebangunan dalam kehidupan nyata!",
  modelAlt: "Maket gedung di meja arsitek dengan bangunan asli terlihat di latar belakang",
  modelCaption: "Maket gedung (depan) dan bangunan aslinya (belakang) — bentuk sama, ukuran berbeda. Inilah kesebangunan!",
  tileIntro: "Sebaliknya, coba perhatikan ubin-ubin di lantai ruang kelasmu. Semua ubin punya bentuk dan ukuran yang persis sama, bukan hanya mirip bentuknya saja. Nah, itu namanya kekongruenan! 🧱",
};

type T = typeof id;

const en: T = { text: [
    "SIMILAR (∼)",
    "equal angles, proportional sides",
    "Examples of congruent triangles and quadrilaterals",
    "CONGRUENT TRIANGLE EXAMPLES",
    "same shape and size",
    "ADDITIONAL EXAMPLE: CONGRUENT QUADRILATERALS",
    "corresponding sides and angles are equal",
    "Two congruent pentagons, one rotated",
    "180° rotation",
    "Irregular pentagon — equal size, different direction",
    "Two congruent concave octagons, one reflected",
    "horizontal reflection",
    "ABCDEFGH · concave octagon",
    "PQRSTUVW · concave octagon",
    "Concave octagon — reflection changes direction, not size",
    "corresponding angles are equal",
    "corresponding sides are proportional",
    "CONGRUENT (≅)",
    "like similar shapes, PLUS",
    "the size (sides) is also EQUAL",
    "Congruent ⊂ Similar",
    "Two stepped shapes similar on a grid",
    "Two slanted-sided shapes similar on a grid",
    "DEFINITIONS OF SIMILARITY AND CONGRUENCE",
    "Grade 9 · Similarity and Congruence · Mathematics",
    "🏙️ From Architectural Models to Floor Tiles",
    "Have you seen a building model or miniature house in an architect's office? The miniature has exactly the same shape as the original building, but at a smaller scale — that is",
    "similarity",
    "in real life!",
    "Architectural model on a desk with the original building in the background",
    "The building model (front) and the original building (back) have the same shape but different sizes. This is similarity!",
    "bing.com/images/create",
    "and exactly the same size, not merely similar in shape. That is called",
    "congruence",
    "! 🧱",
    "Key Difference:",
    "Two shapes are",
    "similar",
    "if they have the same shape (size may differ). Two shapes are",
    "congruent",
    "if their shape AND size are exactly the same.",
    "📘 Chapter 1: Definition of Similarity",
    "🎯 Key Summary",
    "Two plane shapes are called",
    "if both satisfy these two conditions simultaneously:",
    "📊 Visual Representation — matching colors = corresponding sides",
    "①",
    "Corresponding angles are equal",
    "— every angle in the first shape has a matching angle of equal measure in the second shape.",
    "②",
    "Corresponding sides are proportional",
    "— the side lengths form the same ratio.",
    "k = scale factor (similarity ratio)",
    "Tips:",
    "Two similar shapes are written with the symbol \"",
    "\". Example: ABCD",
    "EFGH. The letter order indicates corresponding vertices, so it must not be changed!",
    "📝 Practice — Similar Plane Shapes",
    "EASY",
    "Example 1",
    "Rectangle ABCD has length",
    "cm and width",
    "cm and is similar to rectangle PQRS. If",
    "cm, find the length of",
    "!",
    "SOLUTION:",
    "Step 1:",
    "Because the shapes are similar, corresponding sides are proportional:",
    "Step 2:",
    "Solve by cross multiplication:",
    "QR = 9 cm.",
    "MEDIUM",
    "Example 2",
    "Quadrilateral ABCD",
    "EFGH. Given",
    "— find",
    ", and",
    "Corresponding angles are equal: ∠E=∠A, ∠F=∠B, ∠G=∠C, ∠H=∠D",
    "Find",
    "from the sum of quadrilateral angles = 360°:",
    "Because the shapes are similar, corresponding angles are equal:",
    "∠E = 80°, ∠F = 95°, ∠G = 100°, ∠H = 85°.",
    "HARD",
    "Example 3",
    "Triangle ABC",
    "triangle PQR with",
    "cm,",
    "cm. If the perimeter of triangle PQR is 45 cm, find the lengths of PQ, QR, and PR!",
    "Find the perimeter of △ABC:",
    "Scale factor from ABC to PQR:",
    "Step 3:",
    "Find every side of △PQR:",
    "PQ = 12 cm, QR = 18 cm, PR = 15 cm.",
    "📝 Practice — Similarity on a Grid",
    "Example 4",
    "Consider the two stepped shapes on the grid. Shapes ABCDEF and PQRSTU are similar. If",
    "grid squares and",
    "grid squares, find the lengths of",
    "in grid-square units!",
    "Find the scale factor from the small shape to the large shape.",
    "On the grid, DE is 1 grid square. Side DE corresponds to ST.",
    "DE = 1 grid square and ST = 2 grid squares.",
    "All corresponding sides have ratio 1 : 2.",
    "Example 5",
    "Shapes ABCDE and PQRST have the same form on the grid. Given",
    "grid squares. If",
    "grid squares, find the scale factor from PQRST to ABCDE and the lengths of",
    "Use the vertical sides DE and ST to find the scale factor.",
    "Multiply the sides of the small shape by",
    "k = 2, AB = 4 grid squares, and CD = 4 grid squares.",
    "The slanted sides are also multiplied by 2, so the shapes remain similar.",
    "📘 Chapter 2: Definition of Congruence",
    "Congruence",
    "is \"special similarity\" — two plane shapes are called",
    "if they satisfy:",
    "Corresponding sides have equal lengths",
    "(not merely proportional, but EQUAL!)",
    "Congruence symbol: ≅ (equal and similar)",
    "🔍 ILLUSTRATION OF TWO CONGRUENT TRIANGLES:",
    "🔍 RELATIONSHIP BETWEEN SIMILARITY AND CONGRUENCE:",
    "Relationship Key:",
    "Shapes that are",
    "are always",
    ", but similar shapes are not necessarily congruent (unless the scale factor is",
    ").",
    "📝 Practice — Congruent Plane Shapes",
    "Given △ABC ≅ △PQR with",
    "cm, and",
    "Congruence → all corresponding sides and angles are EQUAL. QR = √(12²+5²) = 13 cm",
    "Since the shapes are congruent, corresponding sides have the SAME length:",
    "Find QR using the Pythagorean theorem:",
    "PQ = 12 cm, PR = 5 cm, QR = 13 cm.",
    "Are the following pairs congruent? Irregular pentagons ABCDE and PQRST have corresponding sides and angles of equal size. PQRST is rotated 180° from ABCDE. Explain whether the difference in direction makes them not congruent!",
    "Check size and shape:",
    "Both pentagons have equal corresponding sides and angles.",
    "Check position:",
    "A 180° rotation only changes direction and position, not side lengths or angle measures.",
    "Conclusion: The two pentagons are CONGRUENT ✓",
    "even though they face different directions.",
    "The two concave octagons ABCDEFGH and PQRSTUVW have the same shape and size. PQRSTUVW is a horizontal reflection of ABCDEFGH. Are the two shapes congruent? Explain why an upside-down position does not change the answer!",
    "Check the number of sides:",
    "Both shapes are concave octagons, so every vertex and side has a corresponding pair.",
    "Reflection only reverses the shape's direction; side lengths and angle measures stay the same.",
    "Scale factor unchanged:",
    "The two concave octagons are SIMILAR and CONGRUENT.",
    "Reflection does not change the shape's size.",
    "Note: Rotation and reflection are transformations that preserve distance and angle measure.",
    "📋 Summary — Similarity & Congruence",
    "Concept",
    "Angle",
    "Side",
    "Scale Factor",
    "Symbol",
    "Similar",
    "Equal",
    "Proportional",
    "(free)",
    "Congruent",
    "Equal length",
    "📌",
    "Key relationship:",
    "Congruent ⊂ Similar (every congruent shape is similar, but the reverse is not necessarily true)",
    "📌 Similar = \"same shape, size may differ\"   |  Congruent = \"same shape, exact size\"",
    "📌 Two shapes are similar if: (1) all corresponding angles are equal, AND (2) all corresponding sides are proportional with ratio",
    "constant",
    "💡 Tips & Tricks",
    "Quick way to distinguish Similar vs Congruent:",
    "Ask \"is the size exactly the same?\" — if YES → congruent; if NO but the shape is the same → similar.",
    "Calculate scale factor k:",
    "Choose any pair of corresponding sides, then divide:",
    "— Check another pair — if it is the same, the shapes are similar ✓",
    "③",
    "Check the letter order:",
    "means A↔P, B↔Q, C↔R, D↔S. Letter order determines corresponding sides and angles!",
    "④",
    "Regular shapes of the same type are always similar:",
    "All circles are similar, all squares are similar, and all equilateral triangles are similar — because their angles are always equal!",
    "✅ Conclusion",
    "Similarity and congruence are two basic geometry concepts that describe",
    "the relationship between two plane shapes",
    "🔹",
    "Similar (",
    ")",
    "— “identical twins with different sizes”: same shape, equal angles, proportional sides",
    "Congruent (",
    "— “identical twins”: same shape, equal angles, exact equal sides",
    "🔹 Congruence is a special case of similarity with scale factor",
    "These concepts form the basis for studying similar triangles, finding side lengths, and proving further geometric properties.",
    "← Back to Similarity and Congruence"
],
  decimalOneHalf: "1.5", decimalTwoAndHalf: "2.5", decimalThreeAndHalf: "3.5", decimalThreeAndThreeQuarter: "3.75",
  decimalThousandsDisplay: "1,234.5", decimalThousandsMath: "1{,}234.5", scaleLabel: "Scale factor",
  decimalThousandsLabel: "Decimal format example:",
  architectureIntro: "Have you seen a building model or a miniature house in an architect's office? The miniature has exactly the same shape as the original building, just at a smaller scale—that is similarity in real life!",
  modelAlt: "Architectural model on a desk, with the original building visible in the background.",
  modelCaption: "The building model (front) and the original building (back) have the same shape but different sizes. This is similarity!",
  tileIntro: "Now consider the tiles on your classroom floor. All the tiles have exactly the same shape and size, not merely a similar shape. That is congruence! 🧱",
};
const msMY: T = { text: [    "SERUPA (∼)",
    "sudut sama, sisi sepadan berkadar",
    "Contoh segi tiga dan segi empat yang kongruen",
    "CONTOH SEGITIGA KONGRUEN",
    "bentuk dan saiz yang sama",
    "CONTOH TAMBAHAN: SEGI EMPAT KONGRUEN",
    "sisi dan sudut sepadan adalah sama",
    "Dua segi lima kongruen, satu diputar",
    "Putaran 180°",
    "Segi lima tidak sekata — saiz sama, arah berbeza",
    "Dua segi lapan cekung kongruen, satu dipantulkan",
    "Pantulan mendatar",
    "ABCDEFGH · segi lapan cekung",
    "PQRSTUVW · segi lapan cekung",
    "Segi lapan cekung — pantulan mengubah arah, bukan saiz",
    "sudut sepadan sama besar",
    "sisi sepadan berkadar",
    "KONGRUEN (≅)",
    "seperti serupa, TAMBAH",
    "saiz (sisi) juga SAMA",
    "Kongruen ⊂ Serupa",
    "Dua bentuk bertangga yang serupa pada grid",
    "Dua bentuk bersisi condong yang serupa pada grid",
    "DEFINISI KESERUPAAN DAN KEKONGRUENAN",
    "Tingkatan 3 · Kesebangunan dan Kekongruenan · Matematik",
    "🏙️ Dari Model Bangunan hingga Jubin Lantai",
    "Pernahkah anda melihat model bangunan atau rumah mini di pejabat arkitek? Model itu mempunyai bentuk yang sama tepat seperti bangunan asal, cuma skalanya lebih kecil — itulah",
    "keserupaan",
    "dalam kehidupan sebenar!",
    "Model bangunan di atas meja dengan bangunan asal kelihatan di latar belakang",
    "Model bangunan (depan) dan bangunan asal (belakang) mempunyai bentuk yang sama tetapi saiz yang berbeza. Inilah keserupaan!",
    "bing.com/images/create",
    "dan saiz yang sama tepat, bukan sekadar bentuk yang serupa. Itulah yang dipanggil",
    "kekongruenan",
    "! 🧱",
    "Perbezaan Utama:",
    "Dua bentuk ialah",
    "serupa",
    "jika bentuknya sama (saiz boleh berbeza). Dua bentuk ialah",
    "kongruen",
    "jika bentuk DAN saiznya sama tepat.",
    "📘 Sub-Bab 1: Definisi Keserupaan",
    "🎯 Ringkasan Utama",
    "Dua bentuk satah disebut",
    "jika kedua-duanya memenuhi dua syarat serentak:",
    "📊 Perwakilan Visual — warna sama = sisi sepadan",
    "①",
    "Sudut-sudut sepadan adalah sama besar",
    "— setiap sudut pada bentuk pertama mempunyai pasangan sudut yang sama besar pada bentuk kedua.",
    "②",
    "Sisi-sisi sepadan adalah berkadar",
    "— panjang sisinya membentuk nisbah yang sama.",
    "k = faktor skala (nisbah keserupaan)",
    "Petua:",
    "Penulisan dua bentuk serupa menggunakan simbol “",
    "”. Contoh: ABCD",
    "EFGH. Susunan huruf menunjukkan bucu yang sepadan, jadi jangan tersalah susun!",
    "📝 Contoh — Bentuk Satah Serupa",
    "MUDAH",
    "Contoh 1",
    "Segi empat tepat ABCD mempunyai panjang",
    "cm dan lebar",
    "cm dan serupa dengan segi empat tepat PQRS. Jika",
    "cm, cari panjang",
    "!",
    "PERBINCANGAN:",
    "Langkah 1:",
    "Memandangkan bentuk serupa, sisi-sisi sepadan adalah berkadar:",
    "Langkah 2:",
    "Selesaikan dengan pendaraban silang:",
    "QR = 9 cm.",
    "SEDERHANA",
    "Contoh 2",
    "Segi empat ABCD",
    "EFGH. Diberi",
    "— cari",
    ", dan",
    "Sudut sepadan sama besar: ∠E=∠A, ∠F=∠B, ∠G=∠C, ∠H=∠D",
    "Cari",
    "daripada jumlah sudut segi empat = 360°:",
    "Oleh sebab bentuk-bentuk itu serupa, sudut sepadan adalah sama besar:",
    "∠E = 80°, ∠F = 95°, ∠G = 100°, ∠H = 85°.",
    "SUKAR",
    "Contoh 3",
    "Segi tiga ABC",
    "segi tiga PQR dengan",
    "cm,",
    "cm. Jika perimeter segi tiga PQR = 45 cm, tentukan panjang PQ, QR dan PR!",
    "Hitung perimeter △ABC:",
    "Faktor skala daripada ABC kepada PQR:",
    "Langkah 3:",
    "Hitung setiap sisi △PQR:",
    "PQ = 12 cm, QR = 18 cm, PR = 15 cm.",
    "📝 Contoh — Keserupaan pada Grid",
    "Contoh 4",
    "Perhatikan dua bentuk bertangga pada grid berikut. Bentuk ABCDEF dan PQRSTU adalah serupa. Jika",
    "petak dan",
    "petak, tentukan panjang",
    "dalam unit petak!",
    "Tentukan faktor skala dari bentuk kecil ke bentuk besar.",
    "Pada grid, panjang DE ialah 1 petak. Sisi DE sepadan dengan ST.",
    "DE = 1 petak dan ST = 2 petak.",
    "Semua sisi sepadan mempunyai nisbah 1 : 2.",
    "Contoh 5",
    "Bentuk ABCDE dan PQRST mempunyai bentuk yang sama seperti pada grid. Diberi",
    "petak. Jika",
    "petak, tentukan faktor skala daripada PQRST kepada ABCDE serta panjang",
    "Gunakan pasangan sisi tegak DE dan ST untuk mencari faktor skala.",
    "Darab sisi-sisi bentuk kecil dengan",
    "k = 2, AB = 4 petak dan CD = 4 petak.",
    "Sisi condong juga didarab dengan 2, maka bentuk-bentuk itu kekal serupa.",
    "📘 Bab 2: Takrif Kekongruenan",
    "Kekongruenan",
    "ialah “keserupaan khas” — dua bentuk satah disebut",
    "jika memenuhi:",
    "Sisi-sisi sepadan mempunyai panjang yang sama",
    "(bukan sekadar berkadar, tetapi SAMA!)",
    "Simbol kekongruenan: ≅ (sama dan serupa)",
    "🔍 ILUSTRASI DUA SEGITIGA KONGRUEN:",
    "🔍 HUBUNGAN ANTARA KESEBANGUNAN DAN KEKONGRUENAN:",
    "Hubungan Utama:",
    "Bentuk yang",
    "semestinya",
    ", tetapi bentuk serupa belum tentu kongruen (kecuali faktor skalanya",
    ").",
    "📝 Contoh — Bentuk Satah Kongruen",
    "Diberi △ABC ≅ △PQR dengan",
    "cm, dan",
    "Kekongruenan → semua sisi dan sudut sepadan SAMA. QR = √(12²+5²) = 13 cm",
    "Oleh sebab kongruen, sisi sepadan mempunyai panjang yang SAMA:",
    "Cari QR menggunakan Teorem Pythagoras:",
    "PQ = 12 cm, PR = 5 cm, QR = 13 cm.",
    "Adakah pasangan berikut kongruen? Segi lima tidak sekata ABCDE dan PQRST mempunyai sisi dan sudut sepadan yang sama saiz. PQRST diputar 180° daripada ABCDE. Jelaskan sama ada arah yang berbeza menyebabkan kedua-duanya tidak kongruen!",
    "Semak ukuran dan bentuk:",
    "Kedua-dua segi lima mempunyai sisi dan sudut sepadan yang sama.",
    "Semak kedudukan:",
    "Putaran 180° hanya mengubah arah dan kedudukan, bukan panjang sisi atau ukuran sudut.",
    "Kesimpulan: Kedua-dua pentagon adalah KONGRUEN ✓",
    "walaupun salah satunya menghadap arah yang berbeza.",
    "Dua segi lapan cekung ABCDEFGH dan PQRSTUVW mempunyai bentuk serta saiz yang sama. PQRSTUVW ialah pantulan mendatar ABCDEFGH. Adakah kedua-dua bentuk itu kongruen? Jelaskan mengapa kedudukan terbalik tidak mengubah jawapannya!",
    "Semak bilangan sisi:",
    "Kedua-dua bentuk ialah segi lapan cekung, maka setiap bucu dan sisi mempunyai pasangan sepadan.",
    "Pantulan hanya membalikkan arah bentuk; panjang sisi dan ukuran sudut kekal sama.",
    "Faktor skala tidak berubah:",
    "Kedua-dua oktagon cekung itu adalah SERUPA dan KONGRUEN.",
    "Pencerminan tidak mengubah saiz bentuk.",
    "Nota: Putaran dan pencerminan ialah penjelmaan yang mengekalkan jarak dan sudut.",
    "📋 Ringkasan — Keserupaan & Kekongruenan",
    "Konsep",
    "Sudut",
    "Sisi",
    "Faktor skala",
    "Simbol",
    "Serupa",
    "Sama besar",
    "Berkadar",
    "(bebas)",
    "Kongruen",
    "Sama panjang",
    "📌",
    "Hubungan penting:",
    "Kongruen ⊂ Serupa (setiap bentuk kongruen pasti serupa, tetapi bukan sebaliknya)",
    "📌 Serupa = “bentuk sama, saiz boleh berbeza” | Kongruen = “bentuk sama, saiz tepat sama”",
    "📌 Dua bentuk serupa jika: (1) semua sudut sepadan sama besar, DAN (2) semua sisi sepadan berkadar dengan nisbah",
    "yang tetap",
    "💡 Petua & Cara",
    "Cara pantas membezakan Serupa dengan Kongruen:",
    "Tanya “adakah saiznya benar-benar sama?” — jika YA → kongruen; jika TIDAK tetapi bentuknya sama → serupa.",
    "Kira faktor skala k:",
    "Pilih sebarang pasangan sisi sepadan, kemudian bahagikan:",
    "— Semak dengan pasangan lain; jika hasilnya sama, bentuk itu serupa ✓",
    "③",
    "Perhatikan susunan huruf:",
    "bermaksud A↔P, B↔Q, C↔R, D↔S. Susunan huruf menentukan pasangan sisi dan sudut!",
    "④",
    "Bentuk sekata daripada jenis yang sama sentiasa serupa:",
    "Semua bulatan serupa, semua segi empat sama serupa dan semua segi tiga sama sisi serupa — kerana sudutnya sentiasa sama!",
    "✅ Kesimpulan",
    "Keserupaan dan kekongruenan ialah dua konsep asas dalam geometri yang menerangkan",
    "hubungan antara dua bentuk satah",
    "🔹",
    "Serupa (",
    ")",
    "— “adik kembar berbeza saiz”: bentuk sama, sudut sama, sisi berkadar",
    "Kongruen (",
    "— “adik kembar seiras”: bentuk sama, sudut sama, sisi sama tepat",
    "🔹 Kekongruenan ialah kes khas keserupaan dengan faktor skala",
    "Konsep ini menjadi asas untuk mengkaji segi tiga serupa, mencari panjang sisi dan membuktikan sifat geometri yang lebih lanjut.",
    "← Kembali ke Keserupaan dan Kekongruenan"
],
  decimalOneHalf: "1.5", decimalTwoAndHalf: "2.5", decimalThreeAndHalf: "3.5", decimalThreeAndThreeQuarter: "3.75",
  decimalThousandsDisplay: "1,234.5", decimalThousandsMath: "1{,}234.5", scaleLabel: "Faktor skala",
  decimalThousandsLabel: "Contoh format perpuluhan:",
  architectureIntro: "Pernahkah anda melihat model bangunan atau rumah mini di pejabat arkitek? Model itu mempunyai bentuk yang sama tepat seperti bangunan asal, cuma skalanya lebih kecil — itulah keserupaan dalam kehidupan sebenar!",
  modelAlt: "Model bangunan di atas meja dengan bangunan asal kelihatan di latar belakang",
  modelCaption: "Model bangunan (depan) dan bangunan asal (belakang) mempunyai bentuk yang sama tetapi saiz yang berbeza. Inilah keserupaan!",
  tileIntro: "Sebaliknya, perhatikan jubin di lantai bilik darjah anda. Semua jubin mempunyai bentuk dan saiz yang sama tepat, bukan sekadar bentuk yang serupa. Itulah kekongruenan! 🧱",
};
const ja: T = { text: [    "相似（∼）",
    "角は等しく、対応する辺は比例する",
    "合同な三角形と四角形の例",
    "合同な三角形の例",
    "形も大きさも同じ",
    "追加例：合同な四角形",
    "対応する辺と角は等しい",
    "合同な五角形。片方を回転",
    "180°回転",
    "不規則な五角形 — 大きさは同じで向きが異なる",
    "合同な凹八角形。片方を反転",
    "水平反転",
    "ABCDEFGH · 凹八角形",
    "PQRSTUVW · 凹八角形",
    "凹八角形 — 反射で向きは変わるが、大きさは変わらない",
    "対応する角は等しい",
    "対応する辺は比例する",
    "合同（≅）",
    "相似と同じで、さらに",
    "辺の長さも等しい",
    "合同 ⊂ 相似",
    "方眼上の階段形の相似な図形",
    "方眼上の斜めの辺をもつ相似な図形",
    "相似と合同の定義",
    "中学3年 · 相似と合同 · 数学",
    "🏙️ 建築模型から床のタイルまで",
    "建築家の事務所にある建物の模型やミニチュアの家を見たことがありますか？模型は実際の建物と形がまったく同じで、縮尺だけが小さくなっています。これが",
    "相似",
    "日常生活にある相似の例です！",
    "机の上の建物模型。背景には実際の建物が見えます",
    "建物の模型（手前）と実際の建物（奥）は形が同じで、大きさが異なります。これが相似です！",
    "bing.com/images/create",
    "形が似ているだけでなく、大きさもまったく同じです。これを",
    "合同",
    "! 🧱",
    "主な違い：",
    "二つの図形は",
    "相似",
    "形が同じ（大きさは異なってもよい）場合に相似です。二つの図形は",
    "合同",
    "形も大きさも完全に同じです。",
    "📘 第1部：相似の定義",
    "🎯 要点",
    "二つの平面図形は、次の二つの条件を同時に満たすとき",
    "相似と呼ばれます：",
    "📊 視覚的表現 — 同じ色＝対応する辺",
    "①",
    "対応する角が等しい",
    "— 1つ目の図形の各角に、2つ目の図形で同じ大きさの対応する角があります。",
    "②",
    "対応する辺の比が等しい",
    "— 対応する辺の長さが同じ比になります。",
    "k = 相似比（相似の係数）",
    "ヒント：",
    "二つの相似な図形は記号「",
    "」で表します。例：ABCD",
    "EFGH。文字の順序は対応する頂点を示すため、順番を間違えないようにしましょう！",
    "📝 練習 — 平面図形の相似",
    "基本",
    "例題1",
    "長方形ABCDの長さは",
    "cm、幅は",
    "cmで、長方形PQRSと相似です。",
    "cmのとき、長さ",
    "!",
    "解説：",
    "手順1：",
    "図形が相似なので、対応する辺の比は等しい：",
    "手順2：",
    "交差乗法で解く：",
    "QR = 9 cm。",
    "標準",
    "例題2",
    "四角形ABCD",
    "EFGH。条件は",
    "。角の大きさを求めましょう",
    "、および",
    "対応する角は等しい：∠E=∠A、∠F=∠B、∠G=∠C、∠H=∠D",
    "求める",
    "四角形の内角の和 = 360°より：",
    "相似なので、対応する角は等しい：",
    "∠E = 80°, ∠F = 95°, ∠G = 100°, ∠H = 85°.",
    "発展",
    "例題3",
    "三角形ABC",
    "三角形PQRと相似で、",
    "cm,",
    "cmです。三角形PQRの周の長さが45 cmのとき、PQ、QR、PRの長さを求めましょう！",
    "△ABCの周長を求める：",
    "ABCからPQRへの相似比：",
    "手順3：",
    "△PQRの各辺を求めます：",
    "PQ = 12 cm、QR = 18 cm、PR = 15 cm。",
    "📝 練習 — グリッド上の相似",
    "例題4",
    "次の方眼上の二つの階段形に注目しましょう。図形ABCDEFとPQRSTUは相似です。",
    "マスと",
    "マスのとき、長さ",
    "をマス目の単位で求めましょう！",
    "小さい図形から大きい図形への相似比を求めます。",
    "方眼では、DEの長さは1マスです。辺DEはSTに対応します。",
    "DE = 1マス、ST = 2マスです。",
    "対応するすべての辺の比は1 : 2です。",
    "例題5",
    "図形ABCDEとPQRSTは方眼上で同じ形です。条件は",
    "マスです。",
    "マスのとき、PQRSTからABCDEへの相似比と各辺の長さ",
    "垂直な辺DEとSTの組を使って相似比を求めます。",
    "小さい図形の各辺に",
    "k = 2を掛けると、AB = 4マス、CD = 4マスです。",
    "斜めの辺も2倍になるため、図形は相似のままです。",
    "📘 第2部：合同の定義",
    "合同",
    "は「特別な相似」です。二つの平面図形が合同であるとは",
    "次の条件を満たすことです：",
    "対応する辺の長さが等しい",
    "（比が等しいだけではなく、同じ長さです！）",
    "合同記号：≅（同じ形と大きさ）",
    "🔍 合同な二つの三角形の図：",
    "🔍相似と合同の関係：",
    "関係のポイント：",
    "図形は",
    "必ず",
    ", ただし相似な図形が必ず合同とは限りません（相似比が",
    ").",
    "📝 練習 — 平面図形の合同",
    "△ABC ≅ △PQRで、",
    "cm、",
    "合同なら対応する辺と角はすべて等しい。QR = √(12²+5²) = 13 cm",
    "合同なので、対応する辺の長さは等しい：",
    "三平方の定理でQRを求めます：",
    "PQ = 12 cm, PR = 5 cm, QR = 13 cm.",
    "次の図形の組は合同でしょうか？不規則な五角形ABCDEとPQRSTは、対応する辺と角の大きさが同じです。PQRSTはABCDEを180°回転した図形です。向きが異なると合同でなくなるのか、説明しましょう！",
    "大きさと形を確認：",
    "二つの五角形は対応する辺と角が等しいです。",
    "位置を確認：",
    "180°回転しても向きと位置が変わるだけで、辺の長さや角の大きさは変わりません。",
    "結論：二つの五角形は合同です ✓",
    "片方の向きが異なっていても、",
    "凹八角形ABCDEFGHとPQRSTUVWは形も大きさも同じです。PQRSTUVWはABCDEFGHを水平に反転した図形です。二つの図形は合同でしょうか？上下が逆でも答えが変わらない理由を説明しましょう！",
    "辺の数を確認：",
    "どちらも凹八角形で、すべての頂点と辺に対応する相手があります。",
    "反射は図形の向きを変えるだけで、辺の長さや角の大きさは変わりません。",
    "相似比は変わりません：",
    "二つの凹八角形は相似かつ合同です。",
    "鏡映では図形の大きさは変わりません。",
    "注意：回転と鏡映は、距離と角を保つ変換です。",
    "📋 要約 — 相似と合同",
    "概念",
    "角",
    "辺",
    "相似比",
    "記号",
    "相似",
    "等しい",
    "比例",
    "（自由）",
    "合同",
    "長さが等しい",
    "📌",
    "重要な関係：",
    "合同 ⊂ 相似（合同な図形は必ず相似ですが、その逆は限りません）",
    "📌 相似 =「形は同じで大きさは異なることがある」 | 合同 =「形も大きさも同じ」",
    "📌 二つの図形が相似である条件：(1) 対応する角がすべて等しい、(2) 対応する辺の比が",
    "一定である",
    "💡ヒントとコツ",
    "相似と合同をすばやく見分ける方法：",
    "「大きさもまったく同じですか？」と確認します。はいなら合同、いいえでも形が同じなら相似です。",
    "相似比kを求める：",
    "対応する辺を任意に一組選び、比を求めます：",
    "。別の組でも比が同じなら、相似です ✓",
    "③",
    "文字の順序に注意：",
    "はA↔P、B↔Q、C↔R、D↔Sを意味します。文字の順序で対応する辺と角が決まります！",
    "④",
    "同じ種類の正多角形は常に相似です：",
    "すべての円、正方形、正三角形は相似です。対応する角が常に等しいからです！",
    "✅ まとめ",
    "相似と合同は、二つの平面図形の関係を表す幾何学の基本概念です。",
    "二つの平面図形の関係",
    "🔹",
    "相似（",
    ")",
    "—「大きさだけ異なる双子」：形も角も同じで、辺は比例",
    "合同（",
    "—「完全に同じ双子」：形も角も辺も完全に一致",
    "🔹合同は相似比が1の場合にあたります",
    "これらの概念は、相似な三角形、辺の長さの計算、さらに高度な幾何学的性質の証明を学ぶ基礎となります。",
    "← 相似と合同へ戻る"
],
  decimalOneHalf: "1.5", decimalTwoAndHalf: "2.5", decimalThreeAndHalf: "3.5", decimalThreeAndThreeQuarter: "3.75",
  decimalThousandsDisplay: "1,234.5", decimalThousandsMath: "1{,}234.5", scaleLabel: "相似比",
  decimalThousandsLabel: "小数形式：",
  architectureIntro: "建築家の事務所にある建物の模型やミニチュアの家を見たことがありますか？模型は実際の建物と形がまったく同じで、縮尺だけが小さくなっています。これが日常生活にある相似の例です！",
  modelAlt: "机の上の建物模型。背景には実際の建物が見えます。",
  modelCaption: "建物の模型（手前）と実際の建物（奥）は形が同じで、大きさが異なります。これが相似です！",
  tileIntro: "次に、教室の床のタイルを見てみましょう。すべてのタイルは形も大きさもまったく同じで、形が似ているだけではありません。これを合同といいます！🧱",
};
const zhCN: T = { text: [    "相似 (∼)",
    "角相等，边成比例",
    "全等三角形和四边形示例",
    "全等三角形示例",
    "形状和大小相同",
    "补充示例：全等四边形",
    "对应边和对应角相等",
    "两个全等五边形，其中一个旋转",
    "旋转180°",
    "不规则五边形 — 大小相同，方向不同",
    "两个全等凹八边形，其中一个经过镜像",
    "水平镜像",
    "ABCDEFGH · 凹八边形",
    "PQRSTUVW · 凹八边形",
    "凹八边形 — 镜像改变方向，不改变大小",
    "对应角相等",
    "对应边成比例",
    "全等 (≅)",
    "与相似相似，此外",
    "大小（边长）也相同",
    "全等 ⊂ 相似",
    "方格上的两个阶梯形状相似",
    "方格上的两个斜边形状相似",
    "相似与全等的定义",
    "九年级 · 相似与全等 · 数学",
    "🏙️ 从建筑模型到地板瓷砖",
    "你见过建筑师办公室里的建筑模型或房屋模型吗？模型与原建筑形状完全相同，只是比例更小——这就是",
    "相似",
    "在现实生活中的例子！",
    "桌上的建筑模型，背景可见原始建筑",
    "建筑模型（前景）和原始建筑（背景）形状相同，但大小不同。这就是相似！",
    "bing.com/images/create",
    "而且大小完全相同，而不只是形状相似。这就是",
    "全等",
    "！ 🧱",
    "关键区别：",
    "两个图形",
    "相似",
    "时形状相同（大小可以不同）。两个图形",
    "全等",
    "时形状和大小完全相同。",
    "📘 第一小节：相似的定义",
    "🎯 核心总结",
    "两个平面图形同时满足以下两个条件时，称为",
    "：",
    "📊 图形表示 — 相同颜色表示对应边",
    "①",
    "对应角相等",
    "— 第一个图形中的每个角都与第二个图形中的一个相等角对应。",
    "②",
    "对应边成比例",
    "— 各边长度形成相同的比。",
    "k = 相似比（相似比例）",
    "提示：",
    "用符号“",
    "”来表示两个相似图形。例：ABCD",
    "EFGH。字母顺序表示对应顶点，不能写错顺序！",
    "📝 练习 — 平面图形的相似",
    "简单",
    "例1",
    "矩形ABCD的长",
    "cm，宽",
    "cm，它与矩形PQRS相似。如果",
    "cm，求",
    "的长度！",
    "解析：",
    "步骤1：",
    "因为图形相似，对应边成比例：",
    "步骤2：",
    "用交叉相乘求解：",
    "QR = 9 cm。",
    "中等",
    "例2",
    "四边形ABCD",
    "EFGH。已知",
    "，求",
    "及",
    "对应角相等：∠E=∠A，∠F=∠B，∠G=∠C，∠H=∠D",
    "由四边形内角和为360°求",
    "：",
    "由于图形相似，对应角相等：",
    "∠E = 80°，∠F = 95°，∠G = 100°，∠H = 85°。",
    "困难",
    "例3",
    "三角形ABC",
    "三角形PQR，其中",
    "cm，",
    "cm。如果三角形PQR的周长为45 cm，求PQ、QR和PR的长度！",
    "计算△ABC的周长：",
    "从ABC到PQR的相似比：",
    "步骤3：",
    "计算△PQR的每条边：",
    "PQ = 12 cm，QR = 18 cm，PR = 15 cm。",
    "📝 练习 — 方格上的相似",
    "例4",
    "观察方格中的两个阶梯形状。图形ABCDEF与PQRSTU相似。如果",
    "个方格和",
    "个方格，求",
    "的长度（单位：方格）！",
    "求从小图形到大图形的相似比。",
    "在方格中，DE的长度为1格。边DE对应ST。",
    "DE = 1格，ST = 2格。",
    "所有对应边的比都是1 : 2。",
    "例5",
    "图形ABCDE和PQRST在方格中形状相同。已知",
    "格。如果",
    "格，求从PQRST到ABCDE的相似比，以及",
    "用对应的竖边DE和ST求相似比。",
    "将小图形的边乘以",
    "k = 2，AB = 4格，CD = 4格。",
    "斜边也乘以2，因此形状仍然相似。",
    "📘 第二小节：全等的定义",
    "全等",
    "是“特殊的相似”——两个平面图形满足下列条件时称为",
    "：",
    "对应边长度相等",
    "（不只是成比例，而且完全相等！）",
    "全等符号：≅（形状相同且大小相同）",
    "🔍 两个全等三角形的示意图：",
    "🔍 相似与全等的关系：",
    "关系要点：",
    "图形",
    "已经必然",
    "，但相似图形不一定全等（除非相似比为",
    "）。",
    "📝 练习 — 平面图形全等",
    "已知△ABC ≅ △PQR，且",
    "cm，",
    "全等 → 所有对应边和角都相等。QR = √(12²+5²) = 13 cm",
    "因为图形全等，对应边的长度相同：",
    "用勾股定理求QR：",
    "PQ = 12 cm，PR = 5 cm，QR = 13 cm。",
    "下面的图形对是否全等？不规则五边形ABCDE和PQRST的对应边和角大小相同。PQRST由ABCDE旋转180°得到。方向差异会使它们不全等吗？",
    "检查大小和形状：",
    "检查大小和形状：",
    "检查位置：",
    "旋转180°只改变方向和位置，不改变边长或角的大小。",
    "结论：两个五边形全等 ✓",
    "即使其中一个方向相反。",
    "凹八边形ABCDEFGH和PQRSTUVW形状和大小相同。PQRSTUVW是ABCDEFGH的水平镜像。它们全等吗？请解释上下翻转为何不改变结论！",
    "检查边数：",
    "检查边数：",
    "镜像只改变图形方向；边长和角的大小保持不变。",
    "相似比不变：",
    "两个凹八边形既相似又全等。",
    "镜像不会改变图形的大小。",
    "注意：旋转和镜像是保持距离和角度的变换。",
    "📋 总结 — 相似与全等",
    "概念",
    "角",
    "边",
    "相似比",
    "符号",
    "相似",
    "相等",
    "成比例",
    "（任意）",
    "全等",
    "长度相等",
    "📌",
    "重要关系：",
    "全等 ⊂ 相似（全等图形必然相似，但反之不一定）",
    "📌 相似 = “形状相同，大小可以不同” | 全等 = “形状相同，大小完全相同”",
    "📌 两个图形相似需满足：(1) 所有对应角相等，且 (2) 所有对应边以恒定比",
    "成比例",
    "💡 技巧与方法",
    "快速区分相似与全等：",
    "问“大小是否完全相同？”——如果是 → 全等；如果形状相同但大小不同 → 相似。",
    "计算相似比k：",
    "任选一对对应边，然后相除：",
    "。用另一对边验证；如果比相同，则图形相似 ✓",
    "③",
    "注意字母顺序：",
    "表示A↔P，B↔Q，C↔R，D↔S。字母顺序决定对应边和角！",
    "④",
    "同类规则图形总是相似：",
    "所有圆都相似，所有正方形都相似，所有等边三角形都相似——因为它们的角始终相同！",
    "✅ 结论",
    "相似和全等是几何学中描述两个平面图形关系的两个基本概念。",
    "两个平面图形之间的关系",
    "🔹",
    "相似（",
    ")",
    "—“大小不同的双胞胎”：形状相同，角相等，边成比例",
    "全等（",
    "—“完全相同的双胞胎”：形状相同，角相等，边完全相等",
    "🔹全等是相似比为1的特殊情况",
    "这些概念是学习相似三角形、计算边长和证明更多几何性质的基础。",
    "← 返回相似与全等"
],
  decimalOneHalf: "1.5", decimalTwoAndHalf: "2.5", decimalThreeAndHalf: "3.5", decimalThreeAndThreeQuarter: "3.75",
  decimalThousandsDisplay: "1,234.5", decimalThousandsMath: "1{,}234.5", scaleLabel: "相似比",
  decimalThousandsLabel: "小数格式示例：",
  architectureIntro: "你在建筑师的办公室里见过建筑模型或微缩房屋吗？模型与原建筑的形状完全相同，只是比例更小——这就是相似在现实生活中的例子！",
  modelAlt: "桌上的建筑模型，背景中可以看到原始建筑。",
  modelCaption: "建筑模型（前景）和原建筑（背景）形状相同，但大小不同。这就是相似！",
  tileIntro: "再看看教室地面上的瓷砖。所有瓷砖的形状和大小都完全相同，不只是形状相似。这就是全等！🧱",
};
const ru: T = { text: [    "ПОДОБИЕ (∼)",
    "углы равны, стороны пропорциональны",
    "Примеры конгруэнтных треугольников и четырёхугольников",
    "ПРИМЕРЫ РАВНЫХ ТРЕУГОЛЬНИКОВ",
    "одинаковая форма и размер",
    "ДОПОЛНИТЕЛЬНЫЙ ПРИМЕР: РАВНЫЕ ЧЕТЫРЁХУГОЛЬНИКИ",
    "соответствующие стороны и углы равны",
    "Два конгруэнтных пятиугольника, один повёрнут",
    "поворот на 180°",
    "Неправильный пятиугольник — одинаковый размер, разное направление",
    "Два конгруэнтных вогнутых восьмиугольника, один отражён",
    "горизонтальное отражение",
    "ABCDEFGH · вогнутый восьмиугольник",
    "PQRSTUVW · вогнутый восьмиугольник",
    "Вогнутый восьмиугольник — отражение меняет направление, но не размер",
    "соответствующие углы равны",
    "соответствующие стороны пропорциональны",
    "КОНГРУЭНТНОСТЬ (≅)",
    "как подобие, НО",
    "размер (стороны) тоже ОДИНАКОВЫЙ",
    "Конгруэнтность ⊂ Подобие",
    "Две ступенчатые фигуры подобны на сетке",
    "Две фигуры с наклонными сторонами подобны на сетке",
    "ОПРЕДЕЛЕНИЯ ПОДОБИЯ И КОНГРУЭНТНОСТИ ФИГУР",
    "9 класс · Подобие и конгруэнтность · Математика",
    "🏙️ От макета здания до плитки пола",
    "Вы видели макет здания или миниатюрный дом в офисе архитектора? Миниатюра имеет ту же форму, что и исходное здание, но меньший масштаб — это",
    "подобие",
    "в реальной жизни!",
    "Макет здания на столе с исходным зданием на заднем плане",
    "Макет здания (спереди) и исходное здание (сзади) имеют одинаковую форму, но разный размер. Это подобие!",
    "bing.com/images/create",
    "и совершенно одинаковый размер, а не просто похожую форму. Это называется",
    "конгруэнтность",
    "! 🧱",
    "Ключевое различие:",
    "Две фигуры",
    "подобны",
    "если они имеют одинаковую форму (размер может отличаться). Две фигуры",
    "конгруэнтны",
    "если форма И размер полностью совпадают.",
    "📘 Часть 1: Определение подобия",
    "🎯 Краткое содержание",
    "Две плоские фигуры называются",
    "если одновременно выполняются два условия:",
    "📊 Визуальное представление — одинаковый цвет = соответствующие стороны",
    "①",
    "Соответствующие углы равны",
    "— каждому углу первой фигуры соответствует угол той же величины во второй.",
    "②",
    "Соответствующие стороны пропорциональны",
    "— длины сторон образуют одно и то же отношение.",
    "k = коэффициент подобия",
    "Совет:",
    "Две подобные фигуры записывают символом «",
    "». Пример: ABCD",
    "EFGH. Порядок букв показывает соответствующие вершины, поэтому менять его нельзя!",
    "📝 Задания — Подобные плоские фигуры",
    "ЛЁГКИЙ",
    "Пример 1",
    "Прямоугольник ABCD имеет длину",
    "см и ширину",
    "см и подобен прямоугольнику PQRS. Если",
    "см, найдите длину",
    "!",
    "РЕШЕНИЕ:",
    "Шаг 1:",
    "Поскольку фигуры подобны, соответствующие стороны пропорциональны:",
    "Шаг 2:",
    "Решите методом перекрёстного умножения:",
    "QR = 9 см.",
    "СРЕДНИЙ",
    "Пример 2",
    "Четырёхугольник ABCD",
    "EFGH. Дано",
    "Найдите",
    "и",
    "Соответствующие углы равны: ∠E=∠A, ∠F=∠B, ∠G=∠C, ∠H=∠D",
    "Найдите",
    "из суммы углов четырёхугольника = 360°:",
    "Поскольку фигуры подобны, соответствующие углы равны:",
    "∠E = 80°, ∠F = 95°, ∠G = 100°, ∠H = 85°.",
    "СЛОЖНЫЙ",
    "Пример 3",
    "Треугольник ABC",
    "треугольник PQR с",
    "см,",
    "см. Если периметр треугольника PQR равен 45 см, найдите PQ, QR и PR!",
    "Найдите периметр △ABC:",
    "Коэффициент подобия от ABC к PQR:",
    "Шаг 3:",
    "Найдите каждую сторону △PQR:",
    "PQ = 12 см, QR = 18 см, PR = 15 см.",
    "📝 Задания — Подобие на сетке",
    "Пример 4",
    "Рассмотрите две ступенчатые фигуры на сетке. Фигуры ABCDEF и PQRSTU подобны. Если",
    "клеток и",
    "клеток, найдите длину",
    "в единицах клеток!",
    "Найдите коэффициент подобия от меньшей фигуры к большей.",
    "На сетке длина DE равна 1 клетке. Сторона DE соответствует ST.",
    "DE = 1 клетка и ST = 2 клетки.",
    "Все соответствующие стороны имеют отношение 1 : 2.",
    "Пример 5",
    "Фигуры ABCDE и PQRST имеют одинаковую форму на сетке. Дано",
    "клеток. Если",
    "клеток, найдите коэффициент подобия от PQRST к ABCDE и длины",
    "Используйте пару вертикальных сторон DE и ST для нахождения коэффициента подобия.",
    "Умножьте стороны меньшей фигуры на",
    "k = 2, AB = 4 клетки и CD = 4 клетки.",
    "Наклонные стороны также умножаются на 2, поэтому фигуры остаются подобными.",
    "📘 Часть 2: Определение конгруэнтности",
    "Конгруэнтность",
    "— это «особое подобие» — две плоские фигуры называются",
    "если выполняются:",
    "Соответствующие стороны имеют равную длину",
    "(не только пропорциональны, но РАВНЫ!)",
    "Знак конгруэнтности: ≅ (одинаковые форма и размер)",
    "🔍 ИЛЛЮСТРАЦИЯ ДВУХ КОНГРУЭНТНЫХ ТРЕУГОЛЬНИКОВ:",
    "🔍 СВЯЗЬ ПОДОБИЯ И КОНГРУЭНТНОСТИ:",
    "Ключ к связи:",
    "Фигура",
    "уже наверняка",
    ", но подобная фигура необязательно конгруэнтна (если только коэффициент подобия",
    ").",
    "📝 Задания — Конгруэнтные плоские фигуры",
    "Дано △ABC ≅ △PQR, причём",
    "см, и",
    "Конгруэнтность → все соответствующие стороны и углы РАВНЫ. QR = √(12²+5²) = 13 см",
    "Поскольку фигуры конгруэнтны, соответствующие стороны имеют ОДИНАКОВУЮ длину:",
    "Найдите QR по теореме Пифагора:",
    "PQ = 12 см, PR = 5 см, QR = 13 см.",
    "Конгруэнтны ли следующие пары? Неправильные пятиугольники ABCDE и PQRST имеют равные соответствующие стороны и углы. PQRST получен поворотом ABCDE на 180°. Объясните, мешает ли различие направления конгруэнтности!",
    "Проверьте размер и форму:",
    "Проверьте размер и форму:",
    "Проверьте положение:",
    "Поворот на 180° меняет только направление и положение, не длины сторон и величины углов.",
    "Вывод: два пятиугольника КОНГРУЭНТНЫ ✓",
    "даже если они смотрят в разные стороны.",
    "Два вогнутых восьмиугольника ABCDEFGH и PQRSTUVW имеют одинаковую форму и размер. PQRSTUVW является горизонтальным отражением ABCDEFGH. Конгруэнтны ли эти фигуры? Объясните, почему перевёрнутое положение не меняет ответа!",
    "Проверьте число сторон:",
    "Проверьте число сторон:",
    "Отражение лишь меняет направление фигуры; длины сторон и углы остаются прежними.",
    "Коэффициент подобия не изменился:",
    "Два вогнутых восьмиугольника ПОДОБНЫ и КОНГРУЭНТНЫ.",
    "Отражение не меняет размер фигуры.",
    "Примечание: поворот и отражение — преобразования, сохраняющие расстояния и углы.",
    "📋 Краткое содержание — Подобие и конгруэнтность",
    "Понятие",
    "Углы",
    "Стороны",
    "Коэффициент подобия",
    "Знак",
    "Подобные",
    "Равны",
    "Пропорциональны",
    "(произвольный)",
    "Конгруэнтные",
    "Равная длина",
    "📌",
    "Важная связь:",
    "Конгруэнтность ⊂ Подобие (каждая конгруэнтная фигура подобна, но обратное неверно)",
    "📌 Подобие = «одинаковая форма, размер может отличаться» | Конгруэнтность = «одинаковая форма, точный размер»",
    "📌 Фигуры подобны, если: (1) все соответствующие углы равны И (2) все соответствующие стороны пропорциональны с коэффициентом",
    "постоянным",
    "💡 Советы и приёмы",
    "Как быстро отличить подобие от конгруэнтности:",
    "Спросите: «размер точно такой же?» — если ДА → конгруэнтны; если НЕТ, но форма одинакова → подобны.",
    "Найдите коэффициент подобия k:",
    "Выберите любую пару соответствующих сторон и разделите:",
    "Проверьте другую пару — если отношение совпадает, фигуры подобны ✓",
    "③",
    "Обратите внимание на порядок букв:",
    "означает A↔P, B↔Q, C↔R, D↔S. Порядок букв определяет соответствующие стороны и углы!",
    "④",
    "Правильные фигуры одного типа всегда подобны:",
    "Все окружности подобны, все квадраты подобны, все равносторонние треугольники подобны — потому что их углы всегда равны!",
    "✅ Вывод",
    "Подобие и конгруэнтность — два основных геометрических понятия, описывающие",
    "отношение между двумя плоскими фигурами",
    "🔹",
    "Подобие (",
    ")",
    "— «близнецы разного размера»: форма одинакова, углы равны, стороны пропорциональны",
    "Конгруэнтность (",
    "— «идентичные близнецы»: форма одинакова, углы и стороны полностью совпадают",
    "🔹 Конгруэнтность — частный случай подобия с коэффициентом 1",
    "Эти понятия лежат в основе изучения подобных треугольников, вычисления длин сторон и доказательства более сложных геометрических свойств.",
    "← Вернуться к подобию и конгруэнтности"
],
  decimalOneHalf: "1,5", decimalTwoAndHalf: "2,5", decimalThreeAndHalf: "3,5", decimalThreeAndThreeQuarter: "3,75",
  decimalThousandsDisplay: "1\u202F234,5", decimalThousandsMath: "1\\,234{,}5", scaleLabel: "Коэффициент подобия",
  decimalThousandsLabel: "Пример формата десятичного числа:",
  architectureIntro: "Вы видели макет здания или миниатюрный дом в архитектурном бюро? У макета та же форма, что и у настоящего здания, но меньший масштаб — это пример подобия в реальной жизни!",
  modelAlt: "Макет здания на столе, на заднем плане видно настоящее здание.",
  modelCaption: "Макет здания (спереди) и настоящее здание (сзади) имеют одинаковую форму, но разный размер. Это подобие!",
  tileIntro: "Теперь рассмотрим плитку на полу классной комнаты. Все плитки имеют одинаковую форму и размер, а не только похожую форму. Это и есть конгруэнтность! 🧱",
};

const translations = {
  id,
  en,
  "ms-MY": msMY,
  ja,
  "zh-CN": zhCN,
  ru,
} satisfies Record<Language, T>;

const normalizeVisibleText = (value: string) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function localizeTree(node: ReactNode, content: T["text"]): ReactNode {
  const dictionary = new Map(
    id.text.map((source, index) => [
      normalizeVisibleText(source),
      content[index],
    ]),
  );
  const localizeString = (value: string): string => {
    const translated = dictionary.get(normalizeVisibleText(value));
    if (translated === undefined) return value;
    const leadingWhitespace = value.match(/^\s*/)?.[0] ?? "";
    const trailingWhitespace = value.match(/\s*$/)?.[0] ?? "";
    return `${leadingWhitespace}${translated}${trailingWhitespace}`;
  };
  const visit = (value: ReactNode): ReactNode => {
    if (typeof value === "string") {
      return localizeString(value);
    }
    if (Array.isArray(value)) return value.map(visit);
    if (!isValidElement<{ children?: ReactNode }>(value)) return value;
    const props = { ...value.props };
    for (const name of ["aria-label", "alt", "title", "label", "placeholder"]) {
      const prop = props[name as keyof typeof props];
      if (typeof prop === "string") {
        props[name as keyof typeof props] =
          localizeString(prop);
      }
    }
    return cloneElement(value, props, visit(value.props.children));
  };
  return visit(node);
}

/* ── DIAGRAMS ── */

const DiagramSebangun = () => {
  const { language } = useLanguage();
  const t = pickLang(translations, language);
  return (
  <svg viewBox="0 0 340 160" className="w-full max-w-sm mx-auto">
    {/* Rectangle 1 */}
    <rect x="20" y="40" width="80" height="50" fill="#3b82f6" fillOpacity="0.25" stroke="#60a5fa" strokeWidth="2" rx="2" />
    <text x="60" y="72" textAnchor="middle" fontSize="9" fill="#93c5fd">ABCD</text>
    <text x="60" y="105" textAnchor="middle" fontSize="8" fill="#64748b">{`4 cm × ${t.decimalTwoAndHalf} cm`}</text>
    {/* Arrow */}
    <text x="120" y="70" fontSize="18" fill="#facc15">~</text>
    {/* Rectangle 2 */}
    <rect x="150" y="25" width="120" height="75" fill="#22c55e" fillOpacity="0.25" stroke="#4ade80" strokeWidth="2" rx="2" />
    <text x="210" y="65" textAnchor="middle" fontSize="9" fill="#86efac">EFGH</text>
    <text x="210" y="115" textAnchor="middle" fontSize="8" fill="#64748b">{`6 cm × ${t.decimalThreeAndThreeQuarter} cm`}</text>
    {/* Ratio labels */}
    <text x="170" y="15" fontSize="8" fill="#fde68a">AB/EF = BC/FG = 2/3</text>
    {/* Angle indicators */}
    <path d="M20,40 Q30,40 30,50" fill="none" stroke="#f97316" strokeWidth="1.5" />
    <path d="M150,25 Q162,25 162,37" fill="none" stroke="#f97316" strokeWidth="1.5" />
    <text x="22" y="58" fontSize="7" fill="#f97316">90°</text>
    <text x="152" y="43" fontSize="7" fill="#f97316">90°</text>
    <text x="60" y="20" textAnchor="middle" fontSize="9" fill="#facc15" fontWeight="bold">{t.text[0]}</text>
    <text x="230" y="20" textAnchor="middle" fontSize="9" fill="#facc15" fontWeight="bold">{t.text[1]}</text>
  </svg>
  );
};

const DiagramKongruen = () => {
  const { language } = useLanguage();
  const t = pickLang(translations, language);
  return (
  <svg viewBox="0 0 420 300" className="w-full max-w-lg mx-auto" role="img" aria-label={t.text[2]}>
    <defs>
      <pattern id="kongruen-hatch-purple" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
        <rect width="10" height="10" fill="#7c3aed" fillOpacity="0.18" />
        <path d="M0 0V10" stroke="#c4b5fd" strokeWidth="2" strokeOpacity="0.7" />
      </pattern>
      <pattern id="kongruen-hatch-teal" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
        <rect width="10" height="10" fill="#0f766e" fillOpacity="0.2" />
        <path d="M0 0V10" stroke="#5eead4" strokeWidth="2" strokeOpacity="0.7" />
      </pattern>
    </defs>

    <text x="210" y="16" textAnchor="middle" fontSize="10" fill="#facc15" fontWeight="bold">{t.text[3]}</text>
    {/* Segitiga kedua diputar 180° agar tidak tampil sebagai salinan berdampingan. */}
    <polygon points="34,110 112,110 76,38" fill="url(#kongruen-hatch-purple)" stroke="#c084fc" strokeWidth="2" strokeLinejoin="round" />
    <g transform="translate(205 0) rotate(180 76 74)">
      <polygon points="34,110 112,110 76,38" fill="url(#kongruen-hatch-purple)" stroke="#c084fc" strokeWidth="2" strokeLinejoin="round" />
    </g>
    <text x="76" y="128" textAnchor="middle" fontSize="9" fill="#e9d5ff">△ABC</text>
    <text x="281" y="128" textAnchor="middle" fontSize="9" fill="#e9d5ff">△PQR</text>
    <text x="190" y="82" textAnchor="middle" fontSize="20" fill="#facc15">≅</text>
    <text x="210" y="145" textAnchor="middle" fontSize="8" fill="#fde68a">{t.text[4]}</text>

    <text x="210" y="169" textAnchor="middle" fontSize="10" fill="#2dd4bf" fontWeight="bold">{t.text[5]}</text>
    {/* Sepasang segiempat orisinal; bangun kanan adalah cerminan horizontal bangun kiri. */}
    <polygon points="28,252 28,194 86,158 144,252" fill="url(#kongruen-hatch-teal)" stroke="#2dd4bf" strokeWidth="2" strokeLinejoin="round" />
    <g transform="translate(392 0) scale(-1 1)">
      <polygon points="28,252 28,194 86,158 144,252" fill="url(#kongruen-hatch-teal)" stroke="#5eead4" strokeWidth="2" strokeLinejoin="round" />
    </g>
    <text x="86" y="270" textAnchor="middle" fontSize="9" fill="#99f6e4">ABCD</text>
    <text x="306" y="270" textAnchor="middle" fontSize="9" fill="#99f6e4">EFGH</text>
    <text x="196" y="220" textAnchor="middle" fontSize="20" fill="#facc15">≅</text>
    <text x="210" y="288" textAnchor="middle" fontSize="8" fill="#94a3b8">{t.text[6]}</text>
  </svg>
  );
};

const KongruenPentagonDiagram = () => {
  const { language } = useLanguage();
  const t = pickLang(translations, language);
  return (
  <svg viewBox="0 0 420 150" className="w-full max-w-lg mx-auto" role="img" aria-label={t.text[7]}>
    <polygon points="30,118 42,55 86,28 132,50 116,116" fill="rgba(250,204,21,0.16)" stroke="#facc15" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="30" cy="118" r="2.5" fill="#facc15" />
    <circle cx="42" cy="55" r="2.5" fill="#facc15" />
    <circle cx="86" cy="28" r="2.5" fill="#facc15" />
    <circle cx="132" cy="50" r="2.5" fill="#facc15" />
    <circle cx="116" cy="116" r="2.5" fill="#facc15" />
    <text x="20" y="126" fontSize="8" fill="#fef3c7" fontWeight="bold">A</text>
    <text x="34" y="52" fontSize="8" fill="#fef3c7" fontWeight="bold">B</text>
    <text x="84" y="20" fontSize="8" fill="#fef3c7" fontWeight="bold">C</text>
    <text x="135" y="48" fontSize="8" fill="#fef3c7" fontWeight="bold">D</text>
    <text x="118" y="126" fontSize="8" fill="#fef3c7" fontWeight="bold">E</text>
    <text x="31" y="92" fontSize="7" fill="#fde68a">AB = 4 cm</text>
    <text x="57" y="39" fontSize="7" fill="#fde68a">BC = 3 cm</text>
    <text x="108" y="35" fontSize="7" fill="#fde68a">CD = 3 cm</text>
    <text x="126" y="87" fontSize="7" fill="#fde68a">DE = 4 cm</text>
    <text x="70" y="119" fontSize="7" fill="#fde68a">EA = 5 cm</text>
    <text x="74" y="140" textAnchor="middle" fontSize="9" fill="#fde68a">ABCDE</text>

    <text x="208" y="79" textAnchor="middle" fontSize="20" fill="#facc15">≅</text>
    <text x="208" y="97" textAnchor="middle" fontSize="8" fill="#fde68a">{t.text[8]}</text>

    <g transform="translate(255 0) rotate(180 81 72)">
      <polygon points="30,118 42,55 86,28 132,50 116,116" fill="rgba(167,139,250,0.16)" stroke="#a78bfa" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="30" cy="118" r="2.5" fill="#a78bfa" />
      <circle cx="42" cy="55" r="2.5" fill="#a78bfa" />
      <circle cx="86" cy="28" r="2.5" fill="#a78bfa" />
      <circle cx="132" cy="50" r="2.5" fill="#a78bfa" />
      <circle cx="116" cy="116" r="2.5" fill="#a78bfa" />
    </g>
    <text x="390" y="22" fontSize="8" fill="#ddd6fe" fontWeight="bold">P</text>
    <text x="377" y="102" fontSize="8" fill="#ddd6fe" fontWeight="bold">Q</text>
    <text x="327" y="128" fontSize="8" fill="#ddd6fe" fontWeight="bold">R</text>
    <text x="274" y="102" fontSize="8" fill="#ddd6fe" fontWeight="bold">S</text>
    <text x="296" y="22" fontSize="8" fill="#ddd6fe" fontWeight="bold">T</text>
    <text x="365" y="50" fontSize="7" fill="#c4b5fd">PQ = 4 cm</text>
    <text x="345" y="105" fontSize="7" fill="#c4b5fd">QR = 3 cm</text>
    <text x="298" y="105" fontSize="7" fill="#c4b5fd">RS = 3 cm</text>
    <text x="278" y="57" fontSize="7" fill="#c4b5fd">ST = 4 cm</text>
    <text x="325" y="25" fontSize="7" fill="#c4b5fd">TP = 5 cm</text>
    <text x="336" y="140" textAnchor="middle" fontSize="9" fill="#c4b5fd">PQRST</text>
    <text x="210" y="15" textAnchor="middle" fontSize="9" fill="#facc15" fontWeight="bold">{t.text[9]}</text>
  </svg>
  );
};

const KongruenOctagonDiagram = () => {
  const { language } = useLanguage();
  const t = pickLang(translations, language);
  return (
  <svg viewBox="0 0 460 180" className="w-full max-w-lg mx-auto" role="img" aria-label={t.text[10]}>
    <polygon points="32,148 26,94 64,66 47,30 103,48 142,29 174,91 145,148" fill="rgba(34,211,238,0.15)" stroke="#22d3ee" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="32" cy="148" r="2.5" fill="#22d3ee" />
    <circle cx="26" cy="94" r="2.5" fill="#22d3ee" />
    <circle cx="64" cy="66" r="2.5" fill="#22d3ee" />
    <circle cx="47" cy="30" r="2.5" fill="#22d3ee" />
    <circle cx="103" cy="48" r="2.5" fill="#22d3ee" />
    <circle cx="142" cy="29" r="2.5" fill="#22d3ee" />
    <circle cx="174" cy="91" r="2.5" fill="#22d3ee" />
    <circle cx="145" cy="148" r="2.5" fill="#22d3ee" />
    <text x="19" y="159" fontSize="8" fill="#cffafe" fontWeight="bold">A</text>
    <text x="12" y="93" fontSize="8" fill="#cffafe" fontWeight="bold">B</text>
    <text x="61" y="63" fontSize="8" fill="#cffafe" fontWeight="bold">C</text>
    <text x="38" y="24" fontSize="8" fill="#cffafe" fontWeight="bold">D</text>
    <text x="104" y="45" fontSize="8" fill="#cffafe" fontWeight="bold">E</text>
    <text x="145" y="22" fontSize="8" fill="#cffafe" fontWeight="bold">F</text>
    <text x="177" y="93" fontSize="8" fill="#cffafe" fontWeight="bold">G</text>
    <text x="148" y="159" fontSize="8" fill="#cffafe" fontWeight="bold">H</text>
    <text x="4" y="124" fontSize="7" fill="#a5f3fc">AB = 4 cm</text>
    <text x="28" y="82" fontSize="7" fill="#a5f3fc">{`BC = ${t.decimalThreeAndHalf}`}</text>
    <text x="34" y="49" fontSize="7" fill="#a5f3fc">CD = 3</text>
    <text x="74" y="40" fontSize="7" fill="#a5f3fc">DE = 4</text>
    <text x="111" y="36" fontSize="7" fill="#a5f3fc">EF = 3</text>
    <text x="151" y="58" fontSize="7" fill="#a5f3fc">FG = 5</text>
    <text x="155" y="125" fontSize="7" fill="#a5f3fc">GH = 2</text>
    <text x="84" y="158" fontSize="7" fill="#a5f3fc">HA = 7</text>
    <text x="100" y="168" textAnchor="middle" fontSize="9" fill="#a5f3fc">{t.text[12]}</text>

    <text x="228" y="91" textAnchor="middle" fontSize="20" fill="#facc15">≅</text>
    <text x="228" y="110" textAnchor="middle" fontSize="8" fill="#fde68a">{t.text[11]}</text>

    <g transform="translate(432 0) scale(-1 1)">
      <polygon points="32,148 26,94 64,66 47,30 103,48 142,29 174,91 145,148" fill="rgba(244,114,182,0.15)" stroke="#f472b6" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="32" cy="148" r="2.5" fill="#f472b6" />
      <circle cx="26" cy="94" r="2.5" fill="#f472b6" />
      <circle cx="64" cy="66" r="2.5" fill="#f472b6" />
      <circle cx="47" cy="30" r="2.5" fill="#f472b6" />
      <circle cx="103" cy="48" r="2.5" fill="#f472b6" />
      <circle cx="142" cy="29" r="2.5" fill="#f472b6" />
      <circle cx="174" cy="91" r="2.5" fill="#f472b6" />
      <circle cx="145" cy="148" r="2.5" fill="#f472b6" />
    </g>
    <text x="402" y="159" fontSize="8" fill="#fbcfe8" fontWeight="bold">P</text>
    <text x="408" y="93" fontSize="8" fill="#fbcfe8" fontWeight="bold">Q</text>
    <text x="370" y="63" fontSize="8" fill="#fbcfe8" fontWeight="bold">R</text>
    <text x="388" y="24" fontSize="8" fill="#fbcfe8" fontWeight="bold">S</text>
    <text x="327" y="45" fontSize="8" fill="#fbcfe8" fontWeight="bold">T</text>
    <text x="287" y="22" fontSize="8" fill="#fbcfe8" fontWeight="bold">U</text>
    <text x="252" y="93" fontSize="8" fill="#fbcfe8" fontWeight="bold">V</text>
    <text x="279" y="159" fontSize="8" fill="#fbcfe8" fontWeight="bold">W</text>
    <text x="395" y="124" fontSize="7" fill="#f9a8d4">PQ = 4 cm</text>
    <text x="369" y="82" fontSize="7" fill="#f9a8d4">{`QR = ${t.decimalThreeAndHalf}`}</text>
    <text x="353" y="49" fontSize="7" fill="#f9a8d4">RS = 3</text>
    <text x="317" y="40" fontSize="7" fill="#f9a8d4">ST = 4</text>
    <text x="279" y="36" fontSize="7" fill="#f9a8d4">TU = 3</text>
    <text x="256" y="58" fontSize="7" fill="#f9a8d4">UV = 5</text>
    <text x="252" y="125" fontSize="7" fill="#f9a8d4">VW = 2</text>
    <text x="326" y="158" fontSize="7" fill="#f9a8d4">WP = 7</text>
    <text x="360" y="168" textAnchor="middle" fontSize="9" fill="#f9a8d4">{t.text[13]}</text>
    <text x="230" y="15" textAnchor="middle" fontSize="9" fill="#22d3ee" fontWeight="bold">{t.text[14]}</text>
  </svg>
  );
};

const DiagramHubungan = () => {
  const { language } = useLanguage();
  const t = pickLang(translations, language);
  return (
  <svg viewBox="0 0 320 130" className="w-full max-w-sm mx-auto">
    <ellipse cx="160" cy="65" rx="150" ry="55" fill="#3b82f6" fillOpacity="0.1" stroke="#60a5fa" strokeWidth="1.5" />
    <text x="160" y="18" textAnchor="middle" fontSize="10" fill="#93c5fd" fontWeight="bold">{t.text[0]}</text>
    <text x="160" y="32" textAnchor="middle" fontSize="8" fill="#64748b">{t.text[15]}</text>
    <text x="160" y="44" textAnchor="middle" fontSize="8" fill="#64748b">{t.text[16]}</text>
    <ellipse cx="160" cy="85" rx="90" ry="33" fill="#22c55e" fillOpacity="0.15" stroke="#4ade80" strokeWidth="1.5" />
    <text x="160" y="80" textAnchor="middle" fontSize="10" fill="#86efac" fontWeight="bold">{t.text[17]}</text>
    <text x="160" y="93" textAnchor="middle" fontSize="8" fill="#64748b">{t.text[18]}</text>
    <text x="160" y="105" textAnchor="middle" fontSize="8" fill="#64748b">{t.text[19]}</text>
    <text x="12" y="65" fontSize="8" fill="#fde68a">{t.text[20]}</text>
  </svg>
  );
};

const GridBangunBerundak = () => {
  const { language } = useLanguage();
  const t = pickLang(translations, language);
  return (
  <svg viewBox="0 0 560 198" className="w-full max-w-2xl mx-auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={t.text[21]}>
    <defs>
      <pattern id="contoh4-grid" x="20" y="8" width="22" height="22" patternUnits="userSpaceOnUse">
        <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#475569" strokeWidth="0.8" />
      </pattern>
      <pattern id="contoh4-hatch-cyan" width="12" height="12" patternUnits="userSpaceOnUse">
        <rect width="12" height="12" fill="#0891b2" fillOpacity="0.2" />
        <path d="M-3,3 L3,-3 M0,12 L12,0 M9,15 L15,9" stroke="#67e8f9" strokeWidth="1.2" strokeOpacity="0.7" />
      </pattern>
      <pattern id="contoh4-hatch-violet" width="12" height="12" patternUnits="userSpaceOnUse">
        <rect width="12" height="12" fill="#7c3aed" fillOpacity="0.18" />
        <path d="M-3,3 L3,-3 M0,12 L12,0 M9,15 L15,9" stroke="#c4b5fd" strokeWidth="1.2" strokeOpacity="0.7" />
      </pattern>
    </defs>
    <rect width="560" height="198" rx="10" fill="#0f172a" />
    <rect x="8" y="8" width="544" height="182" rx="7" fill="url(#contoh4-grid)" opacity="0.9" />

    {/* Bangun kecil: A(2,2), B(5,2), C(5,4), D(4,4), E(4,5), F(2,5) */}
    <polygon points="64,52 130,52 130,96 108,96 108,118 64,118" fill="url(#contoh4-hatch-cyan)" stroke="#22d3ee" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="64" cy="52" r="3" fill="#22d3ee" />
    <circle cx="130" cy="52" r="3" fill="#22d3ee" />
    <circle cx="130" cy="96" r="3" fill="#22d3ee" />
    <circle cx="108" cy="96" r="3" fill="#22d3ee" />
    <circle cx="108" cy="118" r="3" fill="#22d3ee" />
    <circle cx="64" cy="118" r="3" fill="#22d3ee" />
    {/* Bangun besar: P(13,1), Q(19,1), R(19,5), S(17,5), T(17,7), U(13,7) */}
    <polygon points="286,30 418,30 418,118 374,118 374,162 286,162" fill="url(#contoh4-hatch-violet)" stroke="#a78bfa" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="286" cy="30" r="3" fill="#a78bfa" />
    <circle cx="418" cy="30" r="3" fill="#a78bfa" />
    <circle cx="418" cy="118" r="3" fill="#a78bfa" />
    <circle cx="374" cy="118" r="3" fill="#a78bfa" />
    <circle cx="374" cy="162" r="3" fill="#a78bfa" />
    <circle cx="286" cy="162" r="3" fill="#a78bfa" />
  </svg>
  );
};

const GridBangunMiring = () => {
  const { language } = useLanguage();
  const t = pickLang(translations, language);
  return (
  <svg viewBox="0 0 560 225" className="w-full max-w-2xl mx-auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={t.text[22]}>
    <defs>
      <pattern id="contoh5-grid" x="18" y="10" width="18" height="18" patternUnits="userSpaceOnUse">
        <path d="M 18 0 L 0 0 0 18" fill="none" stroke="#475569" strokeWidth="0.8" />
      </pattern>
      <pattern id="contoh5-hatch-amber" width="13" height="13" patternUnits="userSpaceOnUse">
        <rect width="13" height="13" fill="#b45309" fillOpacity="0.2" />
        <path d="M-3,3 L3,-3 M0,13 L13,0 M10,16 L16,10" stroke="#fcd34d" strokeWidth="1.2" strokeOpacity="0.75" />
      </pattern>
      <pattern id="contoh5-hatch-rose" width="13" height="13" patternUnits="userSpaceOnUse">
        <rect width="13" height="13" fill="#be123c" fillOpacity="0.18" />
        <path d="M-3,3 L3,-3 M0,13 L13,0 M10,16 L16,10" stroke="#fda4af" strokeWidth="1.2" strokeOpacity="0.75" />
      </pattern>
    </defs>
    <rect width="560" height="225" rx="10" fill="#0f172a" />
    <rect x="8" y="8" width="544" height="209" rx="7" fill="url(#contoh5-grid)" opacity="0.9" />
    {/* Bangun besar: variasi pentagon dengan satu sisi miring */}
    <polygon points="54,190 54,118 90,46 162,46 162,190" fill="url(#contoh5-hatch-amber)" stroke="#fbbf24" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="54" cy="190" r="3" fill="#fbbf24" />
    <circle cx="54" cy="118" r="3" fill="#fbbf24" />
    <circle cx="90" cy="46" r="3" fill="#fbbf24" />
    <circle cx="162" cy="46" r="3" fill="#fbbf24" />
    <circle cx="162" cy="190" r="3" fill="#fbbf24" />
    {/* Bangun kecil: bentuk sama dengan susunan dan proporsi yang divariasikan */}
    <polygon points="342,172 342,136 360,100 396,100 396,172" fill="url(#contoh5-hatch-rose)" stroke="#fb7185" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="342" cy="172" r="3" fill="#fb7185" />
    <circle cx="342" cy="136" r="3" fill="#fb7185" />
    <circle cx="360" cy="100" r="3" fill="#fb7185" />
    <circle cx="396" cy="100" r="3" fill="#fb7185" />
    <circle cx="396" cy="172" r="3" fill="#fb7185" />
  </svg>
  );
};

const DefinisiPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const t = pickLang(translations, language);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "intro", "konsep1", "contoh1", "konsep2", "contoh2", "konsep3",
  ]);
  const toggleSection = (s: string) => {
    playPopSound();
    setExpandedSections(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };
  const Header = ({ id, icon, color, label }: { id: string; icon: React.ReactNode; color: string; label: string }) => (
    <button onClick={() => toggleSection(id)} className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer">
      <div className="flex items-center gap-3"><span style={{ color }}>{icon}</span><span className="font-body font-semibold text-white">{label}</span></div>
      <ChevronUp className="w-5 h-5 text-primary" />
    </button>
  );

  return localizeTree(
    <div className={`relative min-h-screen flex flex-col items-center gradient-space overflow-hidden kesebangunan-kekongruenan-route ${isDark ? "" : "definition-light-svg-labels"}`}>
      {!isDark && (
        <style>{`
          .definition-light-svg-labels svg text,
          .definition-light-svg-labels svg text tspan {
            fill: #1e293b !important;
          }
        `}</style>
      )}
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <BookOpen className="w-10 h-10 text-primary mx-auto mb-3" />
        <h1 className="font-display text-xl md:text-2xl font-bold text-primary text-glow-cyan mb-2 text-center">DEFINISI KESEBANGUNAN DAN KEKONGRUENAN</h1>
        <p className="text-white/50 text-xs text-center mb-6 font-body">Kelas 9 · Kesebangunan dan Kekongruenan · Materi Matematika</p>

        <div className="flex flex-col gap-4 animate-slide-up">

          {/* INTRO */}
          <div id="contoh-grid" className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <Header id="intro" icon={<Lightbulb className="w-5 h-5" />} color="#facc15" label="🏙️ Dari Maket Gedung sampai Ubin Lantai" />
            {true && (
              <div className="px-5 pb-5 space-y-4">
                <p className="font-body text-sm text-white/80 leading-relaxed">
                  {t.architectureIntro}
                </p>
                <div className="rounded-xl overflow-hidden border border-cyan-500/20 shadow-lg shadow-cyan-900/20">
                  <img
                    src="/arsitektur-maket.png"
                    alt={t.modelAlt}
                    className="w-full object-cover max-h-64"
                  />
                  <div className="bg-slate-800/80 px-4 py-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 text-xs">📐</span>
                      <p className="font-body text-xs text-white/50 italic">{t.modelCaption}</p>
                    </div>
                    <p className="font-body text-xs text-white/30 shrink-0">bing.com/images/create</p>
                  </div>
                </div>
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                  <p className="font-body text-sm text-cyan-200 leading-relaxed">
                    {t.tileIntro}
                  </p>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <p className="font-body text-sm text-yellow-200">
                    <strong>Perbedaan Kunci:</strong> Dua bangun <strong className="text-yellow-300">sebangun</strong> jika bentuknya sama (ukuran boleh beda). Dua bangun <strong className="text-green-300">kongruen</strong> jika bentuk DAN ukurannya sama persis.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* SUB-BAB 1: KESEBANGUNAN */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <Header id="konsep1" icon={<Target className="w-5 h-5" />} color="#4ade80" label="📘 Sub-Bab 1: Definisi Kesebangunan" />
            {true && (
              <div className="px-5 pb-5 space-y-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 space-y-3">
                  <p className="font-body text-sm font-semibold text-green-300">🎯 Ringkasan Intisari</p>
                  <p className="font-body text-sm text-white/80 leading-relaxed">
                    Dua bangun datar disebut <strong className="text-green-300">sebangun</strong> jika keduanya memenuhi dua syarat secara bersamaan:
                  </p>

                  {/* Visual SVG representasi rumus */}
                  <div className="bg-slate-900/70 rounded-lg p-3">
                    <p className="font-body text-xs text-slate-400 text-center mb-2">📊 Representasi Visual — warna sama = sisi bersesuaian</p>
                    <svg viewBox="0 0 340 148" className="w-full" xmlns="http://www.w3.org/2000/svg">
                      {/* ── Large rect ABCD ── */}
                      <rect x="16" y="25" width="148" height="88" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" rx="2"/>
                      {/* AB – amber */}
                      <line x1="16" y1="25" x2="164" y2="25" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
                      {/* BC – rose */}
                      <line x1="164" y1="25" x2="164" y2="113" stroke="#fb7185" strokeWidth="3" strokeLinecap="round"/>
                      {/* CD – emerald */}
                      <line x1="164" y1="113" x2="16" y2="113" stroke="#34d399" strokeWidth="3" strokeLinecap="round"/>
                      {/* DA – violet */}
                      <line x1="16" y1="113" x2="16" y2="25" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round"/>
                      {/* Vertex labels – ABCD */}
                      <text x="10"  y="22" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace" fontWeight="bold">A</text>
                      <text x="166" y="22" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace" fontWeight="bold">B</text>
                      <text x="166" y="124" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace" fontWeight="bold">C</text>
                      <text x="10"  y="124" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace" fontWeight="bold">D</text>
                      {/* ── Dashed connecting lines B→E and C→H ── */}
                      <line x1="164" y1="25" x2="196" y2="39" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 3"/>
                      <line x1="164" y1="113" x2="196" y2="101" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 3"/>
                      {/* k label between rects */}
                      <text x="180" y="71" fill="rgba(255,255,255,0.35)" fontSize="11" textAnchor="middle" fontFamily="sans-serif" fontStyle="italic">k</text>
                      {/* ── Small rect EFGH ── */}
                      <rect x="196" y="39" width="99" height="59" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" rx="2"/>
                      {/* EF – amber */}
                      <line x1="196" y1="39" x2="295" y2="39" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
                      {/* FG – rose */}
                      <line x1="295" y1="39" x2="295" y2="98" stroke="#fb7185" strokeWidth="3" strokeLinecap="round"/>
                      {/* GH – emerald */}
                      <line x1="295" y1="98" x2="196" y2="98" stroke="#34d399" strokeWidth="3" strokeLinecap="round"/>
                      {/* HE – violet */}
                      <line x1="196" y1="98" x2="196" y2="39" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round"/>
                      {/* Vertex labels – EFGH */}
                      <text x="188" y="37" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace" fontWeight="bold">E</text>
                      <text x="297" y="37" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace" fontWeight="bold">F</text>
                      <text x="297" y="110" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace" fontWeight="bold">G</text>
                      <text x="188" y="110" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace" fontWeight="bold">H</text>
                      {/* Similarity symbol */}
                      <text x="170" y="140" fill="rgba(255,255,255,0.3)" fontSize="9" textAnchor="middle" fontFamily="sans-serif">ABCD  ~  EFGH</text>
                    </svg>
                  </div>

                  <div className="bg-slate-900/60 rounded-lg p-4 space-y-2 font-body text-sm text-white/80">
                    <div className="flex items-start gap-2">
                      <span className="text-green-400 font-bold shrink-0">①</span>
                      <p><strong className="text-green-300">Sudut-sudut yang bersesuaian sama besar</strong> — setiap sudut di bangun pertama punya pasangan sudut yang sama besar di bangun kedua.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400 font-bold shrink-0">②</span>
                      <p><strong className="text-green-300">Rusuk-rusuk yang bersesuaian sebanding</strong> — panjang sisi-sisinya membentuk perbandingan yang sama.</p>
                    </div>
                  </div>
                  <div className="bg-slate-900/60 rounded-lg p-3 text-center">
                    <BlockMath math="\frac{AB}{EF} = \frac{BC}{FG} = \frac{CD}{GH} = \frac{DA}{HE} = k" />
                    <p className="font-body text-xs text-white/50 mt-1">k = faktor skala (rasio kesebangunan)</p>
                  </div>

                </div>
                {/* Interactive Similarity Animation */}
                <SimilarityAnimation lang={language} />

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <p className="font-body text-sm text-yellow-200">
                    <strong>Tips:</strong> Penulisan dua bangun sebangun menggunakan simbol "<InlineMath math="\sim" />". Contoh: ABCD <InlineMath math="\sim" /> EFGH. Urutan huruf menunjukkan titik-titik yang saling bersesuaian, jadi jangan sampai keliru urutannya!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* CONTOH SOAL 1 */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <Header id="contoh1" icon={<Calculator className="w-5 h-5" />} color="#60a5fa" label="📝 Contoh Soal — Kesebangunan Bangun Datar" />
            {true && (
              <div className="px-5 pb-5 space-y-6">
                {/* MUDAH */}
                <div className="border-l-4 border-green-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">MUDAH</span>
                    <span className="font-body font-semibold text-white">Contoh 1</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                    <p className="font-body text-sm text-white">Persegi panjang ABCD dengan panjang <InlineMath math="AB = 10" /> cm dan lebar <InlineMath math="BC = 6" /> cm sebangun dengan persegi panjang PQRS. Jika <InlineMath math="PQ = 15" /> cm, tentukan panjang <InlineMath math="QR" />!</p>
                    {/* Diagram dua persegi panjang sebangun */}
                    <div className="flex justify-center">
                      <svg viewBox="0 0 380 130" className="w-full max-w-lg" xmlns="http://www.w3.org/2000/svg">
                        {/* Persegi panjang ABCD (10×6) — skala: ×8 = 80×48 */}
                        <rect x="20" y="35" width="80" height="48" fill="rgba(96,165,250,0.15)" stroke="#60a5fa" strokeWidth="1.5" rx="1"/>
                        {/* Titik sudut ABCD */}
                        <circle cx="20" cy="35" r="2.5" fill="#60a5fa"/>
                        <circle cx="100" cy="35" r="2.5" fill="#60a5fa"/>
                        <circle cx="100" cy="83" r="2.5" fill="#60a5fa"/>
                        <circle cx="20" cy="83" r="2.5" fill="#60a5fa"/>
                        {/* Label sudut */}
                        <text x="11" y="32" fill="#93c5fd" fontSize="9" fontFamily="sans-serif" fontWeight="bold">A</text>
                        <text x="102" y="32" fill="#93c5fd" fontSize="9" fontFamily="sans-serif" fontWeight="bold">B</text>
                        <text x="102" y="92" fill="#93c5fd" fontSize="9" fontFamily="sans-serif" fontWeight="bold">C</text>
                        <text x="11" y="92" fill="#93c5fd" fontSize="9" fontFamily="sans-serif" fontWeight="bold">D</text>
                        {/* Label sisi */}
                        <text x="55" y="29" fill="#bfdbfe" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">10 cm</text>
                        <text x="108" y="61" fill="#bfdbfe" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">6 cm</text>
                        {/* Nama */}
                        <text x="60" y="68" fill="rgba(255,255,255,0.5)" fontSize="8" textAnchor="middle" fontFamily="sans-serif">ABCD</text>

                        {/* Simbol ~ */}
                        <text x="158" y="64" fill="#facc15" fontSize="20" textAnchor="middle" fontFamily="sans-serif">~</text>

                        {/* Persegi panjang PQRS (15×9) — skala: ×8 = 120×72 */}
                        <rect x="190" y="23" width="120" height="72" fill="rgba(52,211,153,0.15)" stroke="#34d399" strokeWidth="1.5" rx="1"/>
                        {/* Titik sudut PQRS */}
                        <circle cx="190" cy="23" r="2.5" fill="#34d399"/>
                        <circle cx="310" cy="23" r="2.5" fill="#34d399"/>
                        <circle cx="310" cy="95" r="2.5" fill="#34d399"/>
                        <circle cx="190" cy="95" r="2.5" fill="#34d399"/>
                        {/* Label sudut */}
                        <text x="180" y="21" fill="#6ee7b7" fontSize="9" fontFamily="sans-serif" fontWeight="bold">P</text>
                        <text x="313" y="21" fill="#6ee7b7" fontSize="9" fontFamily="sans-serif" fontWeight="bold">Q</text>
                        <text x="313" y="104" fill="#6ee7b7" fontSize="9" fontFamily="sans-serif" fontWeight="bold">R</text>
                        <text x="180" y="104" fill="#6ee7b7" fontSize="9" fontFamily="sans-serif" fontWeight="bold">S</text>
                        {/* Label sisi */}
                        <text x="250" y="17" fill="#a7f3d0" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">15 cm</text>
                        <text x="322" y="61" fill="#a7f3d0" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">? cm</text>
                        {/* Nama */}
                        <text x="250" y="63" fill="rgba(255,255,255,0.5)" fontSize="8" textAnchor="middle" fontFamily="sans-serif">PQRS</text>

                        {/* Keterangan faktor skala */}
                        <text x="190" y="118" fill="rgba(250,204,21,0.7)" fontSize="7.5" fontFamily="sans-serif">{t.scaleLabel}: 15/10 = {t.decimalOneHalf}×</text>
                      </svg>
                    </div>
                  </div>
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-green-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-2 font-body text-sm text-white/80">
                      <p><strong>Langkah 1:</strong> Karena sebangun, rusuk-rusuk yang bersesuaian sebanding:</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="\frac{AB}{PQ} = \frac{BC}{QR}" />
                        <BlockMath math="\frac{10}{15} = \frac{6}{QR}" />
                      </div>
                      <p><strong>Langkah 2:</strong> Selesaikan dengan perkalian silang:</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="10 \times QR = 15 \times 6 = 90" />
                        <BlockMath math="QR = \frac{90}{10} = 9 \,\mathrm{cm}" />
                      </div>
                      <p><strong className="text-green-300">Panjang QR = 9 cm.</strong></p>
                    </div>
                  </div>
                </div>
                {/* SEDANG */}
                <div className="border-l-4 border-yellow-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded">SEDANG</span>
                    <span className="font-body font-semibold text-white">Contoh 2</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                    <p className="font-body text-sm text-white">Segiempat ABCD <InlineMath math="\sim" /> EFGH. Diketahui <InlineMath math="\angle A = 80°" />, <InlineMath math="\angle B = 95°" />, <InlineMath math="\angle C = 100°" />. Tentukan besar <InlineMath math="\angle E" />, <InlineMath math="\angle F" />, <InlineMath math="\angle G" />, dan <InlineMath math="\angle H" />!</p>
                    {/* Diagram dua segiempat sebangun dengan label sudut */}
                    <div className="flex justify-center">
                      <svg viewBox="0 0 380 120" className="w-full max-w-lg" xmlns="http://www.w3.org/2000/svg">
                        {/* Segiempat ABCD */}
                        <polygon points="22,18 102,12 108,78 18,84" fill="rgba(250,204,21,0.1)" stroke="#facc15" strokeWidth="1.5"/>
                        <circle cx="22" cy="18" r="2.5" fill="#facc15"/>
                        <circle cx="102" cy="12" r="2.5" fill="#facc15"/>
                        <circle cx="108" cy="78" r="2.5" fill="#facc15"/>
                        <circle cx="18" cy="84" r="2.5" fill="#facc15"/>
                        {/* Label titik */}
                        <text x="9" y="16" fill="#fde68a" fontSize="9" fontFamily="sans-serif" fontWeight="bold">A</text>
                        <text x="105" y="11" fill="#fde68a" fontSize="9" fontFamily="sans-serif" fontWeight="bold">B</text>
                        <text x="111" y="86" fill="#fde68a" fontSize="9" fontFamily="sans-serif" fontWeight="bold">C</text>
                        <text x="6" y="93" fill="#fde68a" fontSize="9" fontFamily="sans-serif" fontWeight="bold">D</text>
                        {/* Label sudut */}
                        <text x="26" y="32" fill="#fbbf24" fontSize="7.5" fontFamily="sans-serif">80°</text>
                        <text x="88" y="28" fill="#fbbf24" fontSize="7.5" fontFamily="sans-serif">95°</text>
                        <text x="88" y="72" fill="#fbbf24" fontSize="7.5" fontFamily="sans-serif">100°</text>
                        <text x="24" y="74" fill="#fbbf24" fontSize="7.5" fontFamily="sans-serif">85°</text>
                        <text x="60" y="52" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle" fontFamily="sans-serif">ABCD</text>

                        {/* Simbol ~ */}
                        <text x="155" y="52" fill="#facc15" fontSize="20" textAnchor="middle" fontFamily="sans-serif">~</text>

                        {/* Segiempat EFGH (sedikit lebih besar, bentuk serupa) */}
                        <polygon points="178,15 272,8 280,82 174,90" fill="rgba(167,139,250,0.1)" stroke="#a78bfa" strokeWidth="1.5"/>
                        <circle cx="178" cy="15" r="2.5" fill="#a78bfa"/>
                        <circle cx="272" cy="8" r="2.5" fill="#a78bfa"/>
                        <circle cx="280" cy="82" r="2.5" fill="#a78bfa"/>
                        <circle cx="174" cy="90" r="2.5" fill="#a78bfa"/>
                        {/* Label titik */}
                        <text x="164" y="13" fill="#c4b5fd" fontSize="9" fontFamily="sans-serif" fontWeight="bold">E</text>
                        <text x="274" y="8" fill="#c4b5fd" fontSize="9" fontFamily="sans-serif" fontWeight="bold">F</text>
                        <text x="283" y="91" fill="#c4b5fd" fontSize="9" fontFamily="sans-serif" fontWeight="bold">G</text>
                        <text x="161" y="99" fill="#c4b5fd" fontSize="9" fontFamily="sans-serif" fontWeight="bold">H</text>
                        {/* Label sudut */}
                        <text x="182" y="30" fill="#a78bfa" fontSize="7.5" fontFamily="sans-serif">80°</text>
                        <text x="254" y="25" fill="#a78bfa" fontSize="7.5" fontFamily="sans-serif">95°</text>
                        <text x="254" y="76" fill="#a78bfa" fontSize="7.5" fontFamily="sans-serif">100°</text>
                        <text x="178" y="78" fill="#a78bfa" fontSize="7.5" fontFamily="sans-serif">85°</text>
                        <text x="228" y="52" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle" fontFamily="sans-serif">EFGH</text>

                        {/* Keterangan */}
                        <text x="178" y="108" fill="rgba(250,204,21,0.7)" fontSize="7.5" fontFamily="sans-serif">Sudut bersesuaian sama besar: ∠E=∠A, ∠F=∠B, ∠G=∠C, ∠H=∠D</text>
                      </svg>
                    </div>
                  </div>
                  <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-yellow-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-2 font-body text-sm text-white/80">
                      <p><strong>Langkah 1:</strong> Cari <InlineMath math="\angle D" /> dari jumlah sudut segiempat = 360°:</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="\angle D = 360° - 80° - 95° - 100° = 85°" />
                      </div>
                      <p><strong>Langkah 2:</strong> Karena sebangun, sudut yang bersesuaian sama besar:</p>
                      <div className="bg-slate-900/50 rounded p-3 space-y-1 text-sm">
                        <p><InlineMath math="\angle E = \angle A = 80°" /></p>
                        <p><InlineMath math="\angle F = \angle B = 95°" /></p>
                        <p><InlineMath math="\angle G = \angle C = 100°" /></p>
                        <p><InlineMath math="\angle H = \angle D = 85°" /></p>
                      </div>
                      <p><strong className="text-yellow-300">∠E = 80°, ∠F = 95°, ∠G = 100°, ∠H = 85°.</strong></p>
                    </div>
                  </div>
                </div>
                {/* SULIT */}
                <div className="border-l-4 border-red-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded">SULIT</span>
                    <span className="font-body font-semibold text-white">Contoh 3</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                    <p className="font-body text-sm text-white">Segitiga ABC <InlineMath math="\sim" /> segitiga PQR dengan <InlineMath math="AB = 8" /> cm, <InlineMath math="BC = 12" /> cm, <InlineMath math="AC = 10" /> cm. Jika keliling segitiga PQR = 45 cm, tentukan panjang PQ, QR, dan PR!</p>
                    {/* Diagram dua segitiga sebangun */}
                    <div className="flex justify-center">
                      <svg viewBox="0 0 380 125" className="w-full max-w-lg" xmlns="http://www.w3.org/2000/svg">
                        {/* Segitiga ABC: A(atas), B(kiri-bawah), C(kanan-bawah) */}
                        {/* AB=8, BC=12, AC=10 → skala 5px/cm */}
                        {/* B=(15,88), C=(75,88), A=(30,28) */}
                        <polygon points="30,20 15,88 87,88" fill="rgba(248,113,113,0.12)" stroke="#f87171" strokeWidth="1.5"/>
                        <circle cx="30" cy="20" r="2.5" fill="#f87171"/>
                        <circle cx="15" cy="88" r="2.5" fill="#f87171"/>
                        <circle cx="87" cy="88" r="2.5" fill="#f87171"/>
                        {/* Label titik */}
                        <text x="25" y="13" fill="#fca5a5" fontSize="9" fontFamily="sans-serif" fontWeight="bold">A</text>
                        <text x="4" y="96" fill="#fca5a5" fontSize="9" fontFamily="sans-serif" fontWeight="bold">B</text>
                        <text x="90" y="96" fill="#fca5a5" fontSize="9" fontFamily="sans-serif" fontWeight="bold">C</text>
                        {/* Label sisi */}
                        {/* AB = 8 cm (sisi kiri miring) */}
                        <text x="14" y="50" fill="#fca5a5" fontSize="8" fontFamily="sans-serif">8 cm</text>
                        {/* BC = 12 cm (alas) */}
                        <text x="45" y="100" fill="#fca5a5" fontSize="8" textAnchor="middle" fontFamily="sans-serif">12 cm</text>
                        {/* AC = 10 cm (sisi kanan miring) */}
                        <text x="66" y="50" fill="#fca5a5" fontSize="8" fontFamily="sans-serif">10 cm</text>
                        <text x="51" y="60" fill="rgba(255,255,255,0.35)" fontSize="8" textAnchor="middle" fontFamily="sans-serif">△ABC</text>

                        {/* Simbol ~ */}
                        <text x="145" y="58" fill="#facc15" fontSize="20" textAnchor="middle" fontFamily="sans-serif">~</text>

                        {/* Segitiga PQR: lebih besar (k=1.5) */}
                        {/* PQ=12, QR=18, PR=15 → skala 5px/cm */}
                        {/* Q=(175,88), R=(265,88), P=(197,18) */}
                        <polygon points="200,12 175,100 283,100" fill="rgba(52,211,153,0.12)" stroke="#34d399" strokeWidth="1.5"/>
                        <circle cx="200" cy="12" r="2.5" fill="#34d399"/>
                        <circle cx="175" cy="100" r="2.5" fill="#34d399"/>
                        <circle cx="283" cy="100" r="2.5" fill="#34d399"/>
                        {/* Label titik */}
                        <text x="195" y="8" fill="#6ee7b7" fontSize="9" fontFamily="sans-serif" fontWeight="bold">P</text>
                        <text x="163" y="110" fill="#6ee7b7" fontSize="9" fontFamily="sans-serif" fontWeight="bold">Q</text>
                        <text x="286" y="110" fill="#6ee7b7" fontSize="9" fontFamily="sans-serif" fontWeight="bold">R</text>
                        {/* Label sisi */}
                        {/* PQ = 12 cm */}
                        <text x="175" y="52" fill="#6ee7b7" fontSize="8" fontFamily="sans-serif">12 cm</text>
                        {/* QR = 18 cm */}
                        <text x="224" y="114" fill="#6ee7b7" fontSize="8" textAnchor="middle" fontFamily="sans-serif">18 cm</text>
                        {/* PR = 15 cm */}
                        <text x="251" y="52" fill="#6ee7b7" fontSize="8" fontFamily="sans-serif">15 cm</text>
                        <text x="229" y="68" fill="rgba(255,255,255,0.35)" fontSize="8" textAnchor="middle" fontFamily="sans-serif">△PQR</text>

                        {/* Keterangan faktor skala */}
                        <text x="175" y="122" fill="rgba(250,204,21,0.7)" fontSize="7.5" fontFamily="sans-serif">{t.scaleLabel} k = 45/30 = {t.decimalOneHalf}×</text>
                      </svg>
                    </div>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-red-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-3 font-body text-sm text-white/80">
                      <p><strong>Langkah 1:</strong> Hitung keliling △ABC:</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="K_{ABC} = 8 + 12 + 10 = 30 \,\mathrm{cm}" />
                      </div>
                      <p><strong>Langkah 2:</strong> Faktor skala dari ABC ke PQR:</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="k = \frac{K_{PQR}}{K_{ABC}} = \frac{45}{30} = \frac{3}{2}" />
                      </div>
                      <p><strong>Langkah 3:</strong> Hitung setiap sisi △PQR:</p>
                      <div className="bg-slate-900/50 rounded p-3 space-y-1">
                        <BlockMath math="PQ = \frac{3}{2} \times 8 = 12 \,\mathrm{cm}" />
                        <BlockMath math="QR = \frac{3}{2} \times 12 = 18 \,\mathrm{cm}" />
                        <BlockMath math="PR = \frac{3}{2} \times 10 = 15 \,\mathrm{cm}" />
                      </div>
                      <p><strong className="text-primary">PQ = 12 cm, QR = 18 cm, PR = 15 cm.</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CONTOH 4 & 5 — GRID BANGUN DATAR */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <Header id="contoh-grid" icon={<Calculator className="w-5 h-5" />} color="#22d3ee" label="📝 Contoh Soal — Kesebangunan pada Grid" />
            {true && (
              <div className="px-5 pb-5 space-y-6">
                {/* SEDANG — CONTOH 4 */}
                <div className="border-l-4 border-cyan-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-cyan-500/20 text-cyan-300 text-xs font-bold px-2 py-1 rounded">SEDANG</span>
                    <span className="font-body font-semibold text-white">Contoh 4</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                    <p className="font-body text-sm text-white">
                      Perhatikan dua bangun berundak pada grid berikut. Bangun ABCDEF dan PQRSTU sebangun.
                      Jika <InlineMath math="AB = 3" /> kotak dan <InlineMath math="PQ = 6" /> kotak,
                      tentukan panjang <InlineMath math="DE" /> dan <InlineMath math="ST" /> dalam satuan kotak!
                    </p>
                    <div className="flex justify-center rounded-lg overflow-hidden">
                      <GridBangunBerundak />
                    </div>
                  </div>
                  <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-cyan-300 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-2 font-body text-sm text-white/80">
                      <p><strong>Langkah 1:</strong> Tentukan faktor skala dari bangun kecil ke bangun besar.</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="k = \frac{PQ}{AB} = \frac{6}{3} = 2" />
                      </div>
                      <p><strong>Langkah 2:</strong> Pada grid, panjang DE adalah 1 kotak. Sisi DE bersesuaian dengan ST.</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="ST = k \times DE = 2 \times 1 = 2" />
                      </div>
                      <p><strong className="text-cyan-300">DE = 1 kotak dan ST = 2 kotak.</strong> Semua sisi yang bersesuaian memiliki perbandingan 1 : 2.</p>
                    </div>
                  </div>
                </div>
                {/* SULIT — CONTOH 5 */}
                <div className="border-l-4 border-rose-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-rose-500/20 text-rose-300 text-xs font-bold px-2 py-1 rounded">SULIT</span>
                    <span className="font-body font-semibold text-white">Contoh 5</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                    <p className="font-body text-sm text-white">
                      Bangun ABCDE dan PQRST memiliki bentuk yang sama seperti pada grid.
                      Diketahui <InlineMath math="DE = 8" /> kotak dan <InlineMath math="ST = 4" /> kotak.
                      Jika <InlineMath math="PQ = RS = 2" /> kotak, tentukan faktor skala dari PQRST ke ABCDE,
                      serta panjang <InlineMath math="AB" /> dan <InlineMath math="CD" /> dalam satuan kotak!
                    </p>
                    <div className="flex justify-center rounded-lg overflow-hidden">
                      <GridBangunMiring />
                    </div>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-rose-300 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-2 font-body text-sm text-white/80">
                      <p><strong>Langkah 1:</strong> Gunakan pasangan sisi tegak DE dan ST untuk mencari faktor skala.</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="k = \frac{DE}{ST} = \frac{8}{4} = 2" />
                      </div>
                      <p><strong>Langkah 2:</strong> Kalikan sisi-sisi bangun kecil dengan <InlineMath math="k = 2" />.</p>
                      <div className="bg-slate-900/50 rounded p-3 space-y-1">
                        <p><InlineMath math="AB = k \times PQ = 2 \times 2 = 4" /></p>
                        <p><InlineMath math="CD = k \times RS = 2 \times 2 = 4" /></p>
                      </div>
                      <p><strong className="text-rose-300">k = 2, AB = 4 kotak, dan CD = 4 kotak.</strong> Sisi miring juga ikut dikalikan 2, sehingga bentuk tetap sebangun.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SUB-BAB 2: KEKONGRUENAN */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <Header id="konsep2" icon={<Target className="w-5 h-5" />} color="#c084fc" label="📘 Sub-Bab 2: Definisi Kekongruenan" />
            {true && (
              <div className="px-5 pb-5 space-y-4">
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 space-y-3">
                  <p className="font-body text-sm font-semibold text-purple-300">🎯 Ringkasan Intisari</p>
                  <p className="font-body text-sm text-white/80 leading-relaxed">
                    <strong className="text-purple-300">Kekongruenan</strong> adalah "kesebangunan spesial" — dua bangun datar disebut <strong>kongruen</strong> jika memenuhi:
                  </p>
                  <div className="bg-slate-900/60 rounded-lg p-4 space-y-2 font-body text-sm text-white/80">
                    <div className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold shrink-0">①</span>
                      <p><strong className="text-purple-300">Sudut-sudut yang bersesuaian sama besar</strong></p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold shrink-0">②</span>
                      <p><strong className="text-purple-300">Rusuk-rusuk yang bersesuaian sama panjang</strong> (bukan hanya sebanding, tapi SAMA!)</p>
                    </div>
                  </div>
                  <div className="bg-slate-900/60 rounded-lg p-3 text-center">
                    <BlockMath math="AB = PQ,\; BC = QR,\; AC = PR" />
                    <p className="font-body text-xs text-white/50 mt-1">Simbol kongruen: ≅ (sama dan sebangun)</p>
                  </div>
                </div>
                <div className="bg-slate-800/60 border border-slate-600/40 rounded-lg p-4">
                  <p className="font-body text-xs font-semibold text-slate-300 mb-3">🔍 ILUSTRASI DUA SEGITIGA KONGRUEN:</p>
                  <DiagramKongruen />
                </div>
                <div className="bg-slate-800/60 border border-slate-600/40 rounded-lg p-4">
                  <p className="font-body text-xs font-semibold text-slate-300 mb-3">🔍 HUBUNGAN SEBANGUN DAN KONGRUEN:</p>
                  <DiagramHubungan />
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <p className="font-body text-sm text-yellow-200">
                    <strong>Kunci Hubungan:</strong> Bangun yang <strong className="text-purple-300">kongruen</strong> sudah pasti <strong className="text-green-300">sebangun</strong>, tapi bangun yang sebangun belum tentu kongruen (kecuali faktor skalanya <InlineMath math="k = 1" />).
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* CONTOH SOAL 2 */}
          <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden">
            <Header id="contoh2" icon={<Calculator className="w-5 h-5" />} color="#c084fc" label="📝 Contoh Soal — Kekongruenan Bangun Datar" />
            {true && (
              <div className="px-5 pb-5 space-y-6">
                {/* MUDAH */}
                <div className="border-l-4 border-green-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">MUDAH</span>
                    <span className="font-body font-semibold text-white">Contoh 1</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                    <p className="font-body text-sm text-white">Diketahui △ABC ≅ △PQR dengan <InlineMath math="AB = 12" /> cm, <InlineMath math="AC = 5" /> cm, dan <InlineMath math="\angle A = 90°" />. Tentukan panjang PQ, PR, dan QR!</p>
                    {/* Diagram dua segitiga siku-siku kongruen */}
                    <div className="flex justify-center">
                      <svg viewBox="0 0 340 110" className="w-full max-w-lg" xmlns="http://www.w3.org/2000/svg">
                        {/* Segitiga ABC: sudut siku-siku di A */}
                        {/* A=(20,85), B=(20,25) AB=12→60px, C=(45,85) AC=5→25px */}
                        <polygon points="20,85 20,25 45,85" fill="rgba(52,211,153,0.12)" stroke="#34d399" strokeWidth="1.5"/>
                        {/* Tanda siku-siku di A */}
                        <polyline points="20,78 27,78 27,85" fill="none" stroke="#34d399" strokeWidth="1"/>
                        <circle cx="20" cy="85" r="2.5" fill="#34d399"/>
                        <circle cx="20" cy="25" r="2.5" fill="#34d399"/>
                        <circle cx="45" cy="85" r="2.5" fill="#34d399"/>
                        <text x="7"  y="89" fill="#6ee7b7" fontSize="9" fontFamily="sans-serif" fontWeight="bold">A</text>
                        <text x="7"  y="23" fill="#6ee7b7" fontSize="9" fontFamily="sans-serif" fontWeight="bold">B</text>
                        <text x="47" y="89" fill="#6ee7b7" fontSize="9" fontFamily="sans-serif" fontWeight="bold">C</text>
                        {/* Label sisi */}
                        <text x="4"  y="58" fill="#a7f3d0" fontSize="8" fontFamily="sans-serif">12</text>
                        <text x="27" y="93" fill="#a7f3d0" fontSize="8" fontFamily="sans-serif">5</text>
                        <text x="38" y="52" fill="#a7f3d0" fontSize="8" fontFamily="sans-serif">13</text>
                        <text x="25" y="65" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="sans-serif">△ABC</text>

                        {/* Simbol ≅ */}
                        <text x="118" y="62" fill="#facc15" fontSize="16" textAnchor="middle" fontFamily="sans-serif">≅</text>

                        {/* Segitiga PQR: kongruen dengan ABC */}
                        <polygon points="175,85 175,25 200,85" fill="rgba(96,165,250,0.12)" stroke="#60a5fa" strokeWidth="1.5"/>
                        {/* Tanda siku-siku di P */}
                        <polyline points="175,78 182,78 182,85" fill="none" stroke="#60a5fa" strokeWidth="1"/>
                        <circle cx="175" cy="85" r="2.5" fill="#60a5fa"/>
                        <circle cx="175" cy="25" r="2.5" fill="#60a5fa"/>
                        <circle cx="200" cy="85" r="2.5" fill="#60a5fa"/>
                        <text x="162" y="89" fill="#93c5fd" fontSize="9" fontFamily="sans-serif" fontWeight="bold">P</text>
                        <text x="162" y="23" fill="#93c5fd" fontSize="9" fontFamily="sans-serif" fontWeight="bold">Q</text>
                        <text x="202" y="89" fill="#93c5fd" fontSize="9" fontFamily="sans-serif" fontWeight="bold">R</text>
                        <text x="158" y="58" fill="#bfdbfe" fontSize="8" fontFamily="sans-serif">12</text>
                        <text x="182" y="93" fill="#bfdbfe" fontSize="8" fontFamily="sans-serif">5</text>
                        <text x="193" y="52" fill="#bfdbfe" fontSize="8" fontFamily="sans-serif">13</text>
                        <text x="180" y="65" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="sans-serif">△PQR</text>

                        {/* Keterangan */}
                        <text x="20" y="105" fill="rgba(250,204,21,0.7)" fontSize="7.5" fontFamily="sans-serif">Kongruen → semua sisi & sudut bersesuaian SAMA. QR = √(12²+5²) = 13 cm</text>
                      </svg>
                    </div>
                  </div>
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-green-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-2 font-body text-sm text-white/80">
                      <p>Karena kongruen, sisi yang bersesuaian SAMA PANJANG:</p>
                      <div className="bg-slate-900/50 rounded p-3 space-y-1">
                        <p><InlineMath math="PQ = AB = 12 \,\mathrm{cm}" /></p>
                        <p><InlineMath math="PR = AC = 5 \,\mathrm{cm}" /></p>
                        <p><InlineMath math="\angle P = \angle A = 90°" /></p>
                      </div>
                      <p>Cari QR dengan Teorema Pythagoras:</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="QR = \sqrt{PQ^2 + PR^2} = \sqrt{144 + 25} = \sqrt{169} = 13 \,\mathrm{cm}" />
                      </div>
                      <p><strong className="text-green-300">PQ = 12 cm, PR = 5 cm, QR = 13 cm.</strong></p>
                    </div>
                  </div>
                </div>
                {/* SEDANG */}
                <div className="border-l-4 border-yellow-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded">SEDANG</span>
                    <span className="font-body font-semibold text-white">Contoh 2</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                    <p className="font-body text-sm text-white">Apakah pasangan berikut kongruen? Pentagon tak beraturan ABCDE dan PQRST memiliki ukuran sisi serta sudut bersesuaian yang sama. Bangun PQRST diputar 180° dari ABCDE. Jelaskan apakah perbedaan arah membuat keduanya tidak kongruen!</p>
                    <div className="flex justify-center">
                      <KongruenPentagonDiagram />
                    </div>
                  </div>
                  <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-yellow-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-2 font-body text-sm text-white/80">
                      <p><strong>Cek ukuran dan bentuk:</strong> Kedua pentagon memiliki sisi serta sudut bersesuaian yang sama.</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <BlockMath math="k = \frac{PQRST}{ABCDE} = 1" />
                      </div>
                      <p><strong>Cek posisi:</strong> Rotasi 180° hanya mengubah arah dan posisi, tidak mengubah panjang sisi maupun besar sudut.</p>
                      <p><strong className="text-yellow-300">Kesimpulan: Kedua pentagon KONGRUEN ✓</strong> meskipun salah satunya tidak searah.</p>
                    </div>
                  </div>
                </div>
                {/* SULIT */}
                <div className="border-l-4 border-red-500 pl-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded">SULIT</span>
                    <span className="font-body font-semibold text-white">Contoh 3</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                    <p className="font-body text-sm text-white">Dua bangun cekung segi-8 ABCDEFGH dan PQRSTUVW memiliki bentuk serta ukuran yang sama. Bangun PQRSTUVW merupakan cerminan horizontal dari ABCDEFGH. Apakah kedua bangun tersebut kongruen? Jelaskan mengapa posisi terbalik tidak mengubah jawabannya!</p>
                    <div className="flex justify-center">
                      <KongruenOctagonDiagram />
                    </div>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                    <p className="font-body text-xs font-semibold text-red-400 mb-3">PEMBAHASAN:</p>
                    <div className="space-y-2 font-body text-sm text-white/80">
                      <p><strong>Cek jumlah sisi:</strong> Kedua bangun sama-sama merupakan segi-8 cekung, sehingga setiap titik dan sisi memiliki pasangan yang bersesuaian.</p>
                      <p><strong>Cek posisi:</strong> Pencerminan hanya membalik arah bangun; panjang sisi dan besar sudut tetap sama.</p>
                      <div className="bg-slate-900/50 rounded p-3">
                        <p className="text-sm text-white/80">Faktor skala tidak berubah:</p>
                        <BlockMath math="k = 1" />
                      </div>
                      <p><strong className="text-primary">Kedua segi-8 cekung tersebut SEBANGUN dan KONGRUEN.</strong> Cermin tidak mengubah ukuran bangun.</p>
                      <p className="text-xs text-white/60">Catatan: Rotasi dan pencerminan adalah transformasi yang mempertahankan jarak dan sudut.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── RANGKUMAN, TIPS & TRIK, KESIMPULAN ── */}
          <div className="space-y-4">

            {/* Rangkuman */}
            <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 rounded-xl p-5 space-y-4">
              <p className="font-body text-base font-bold text-cyan-300">📋 Rangkuman — Definisi Kesebangunan &amp; Kekongruenan</p>
              <div className="overflow-x-auto">
                <table className="w-full font-body text-xs text-white/80">
                  <thead><tr className="border-b border-cyan-500/30">
                    <th className="text-left py-2 pr-3 text-cyan-300">Konsep</th>
                    <th className="text-left py-2 pr-3 text-cyan-300">Sudut</th>
                    <th className="text-left py-2 pr-3 text-cyan-300">Rusuk</th>
                    <th className="text-left py-2 pr-3 text-cyan-300">Faktor Skala</th>
                    <th className="text-left py-2 text-cyan-300">Simbol</th>
                  </tr></thead>
                  <tbody className="divide-y divide-slate-700">
                    <tr>
                      <td className="py-2 pr-3 text-green-300 font-semibold">Sebangun</td>
                      <td className="py-2 pr-3">Sama besar</td>
                      <td className="py-2 pr-3">Sebanding</td>
                      <td className="py-2 pr-3"><InlineMath math="k \neq 0" /> (bebas)</td>
                      <td className="py-2"><InlineMath math="\sim" /></td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 text-purple-300 font-semibold">Kongruen</td>
                      <td className="py-2 pr-3">Sama besar</td>
                      <td className="py-2 pr-3">Sama panjang</td>
                      <td className="py-2 pr-3"><InlineMath math="k = 1" /></td>
                      <td className="py-2"><InlineMath math="\cong" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-slate-900/60 rounded-lg p-3 space-y-1 font-body text-xs text-white/75">
                <p>📌 <strong className="text-cyan-300">Hubungan penting:</strong> Kongruen ⊂ Sebangun (setiap bangun yang kongruen pasti sebangun, tetapi tidak sebaliknya)</p>
                <p>📌 Sebangun = "bentuk sama, ukuran bisa berbeda" &nbsp;|&nbsp; Kongruen = "bentuk sama, ukuran tepat sama"</p>
                <p>📌 Dua bangun sebangun jika: (1) semua sudut bersesuaian sama besar, DAN (2) semua rusuk bersesuaian sebanding dengan rasio <InlineMath math="k" /> yang konstan</p>
              </div>
            </div>

            {/* Tips & Trik */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 space-y-3">
              <p className="font-body text-base font-bold text-amber-300">💡 Tips &amp; Trik</p>
              <div className="space-y-3 font-body text-sm text-white/80">
                <div className="flex gap-3">
                  <span className="text-amber-400 font-bold shrink-0">①</span>
                  <p><strong className="text-amber-300">Cara cepat bedakan Sebangun vs Kongruen:</strong> Tanyakan "apakah ukurannya persis sama?" — jika YA → kongruen; jika TIDAK tapi bentuknya sama → sebangun.</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-amber-400 font-bold shrink-0">②</span>
                  <p><strong className="text-amber-300">Hitung faktor skala k:</strong> Pilih sembarang pasang rusuk yang bersesuaian, lalu bagi: <InlineMath math="k = \frac{L}{S}" />. Cek dengan pasangan lain — jika sama, berarti sebangun ✓</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-amber-400 font-bold shrink-0">③</span>
                  <p><strong className="text-amber-300">Perhatikan urutan penulisan:</strong> <InlineMath math="ABCD \sim PQRS" /> artinya A↔P, B↔Q, C↔R, D↔S. Urutan huruf menentukan pasangan sisi dan sudut!</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-amber-400 font-bold shrink-0">④</span>
                  <p><strong className="text-amber-300">Bangun beraturan sejenis selalu sebangun:</strong> Semua lingkaran sebangun, semua persegi sebangun, semua segitiga sama sisi sebangun — karena sudutnya selalu sama!</p>
                </div>
              </div>
            </div>

            {/* Kesimpulan */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5 space-y-3">
              <p className="font-body text-base font-bold text-green-300">✅ Kesimpulan</p>
              <div className="space-y-2 font-body text-sm text-white/80">
                <p>Kesebangunan dan kekongruenan adalah dua konsep dasar dalam geometri yang mendeskripsikan <strong className="text-yellow-300">hubungan antara dua bangun datar</strong>.</p>
                <p>{t.decimalThousandsLabel} {t.decimalThousandsDisplay} (<InlineMath math={t.decimalThousandsMath} />)</p>
                <div className="bg-slate-900/60 rounded-lg p-3 space-y-1">
                  <p>🔹 <strong className="text-green-300">Sebangun (<InlineMath math="\sim" />)</strong> — "saudara kembar berbeda ukuran": bentuk sama, sudut sama, sisi sebanding</p>
                  <p>🔹 <strong className="text-purple-300">Kongruen (<InlineMath math="\cong" />)</strong> — "kembar identik": bentuk sama, sudut sama, sisi sama persis</p>
                  <p>🔹 Kongruen adalah kasus khusus sebangun dengan faktor skala <InlineMath math="k = 1" /></p>
                </div>
                <p className="text-xs text-white/55 italic">Konsep ini menjadi dasar untuk mempelajari segitiga sebangun, menghitung panjang rusuk, dan membuktikan sifat-sifat geometri lanjutan.</p>
              </div>
            </div>

          </div>

        </div>
        <div className="mt-8 text-center">
          <button onClick={() => { playPopSound(); navigate("/buku-animasi-matematika/kesebangunan-kekongruenan"); }} className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer font-body">
            ← Kembali ke Kesebangunan dan Kekongruenan
          </button>
        </div>
      </div>
    </div>,
    t.text,
  );
};
export default DefinisiPage;
