# Laporan pemeriksaan i18n materi

Dihasilkan oleh `pnpm i18n:check` menggunakan TypeScript compiler API.
Pemeriksaan membaca objek locale statis; spread atau key komputasi yang menghalangi pembacaan ditandai **tidak terbaca**.

## Ringkasan

- File sumber yang dipindai: 176.
- File dengan objek terjemahan per bahasa: 150.
- File dengan cabang `ja`: 171.
- File tanpa terjemahan yang terdeteksi: 1.
- File dengan objek yang tidak terbaca: 0.
- Ekstraksi angka: 2539 mismatch dengan ekstraktor digit lama; 650 mismatch dengan pembanding sebelum diagnosis; 635 setelah perbaikan parser; 464 setelah klasifikasi. 2048 mismatch digit lama tidak lagi terdeteksi; 144 mismatch baru terungkap.
- Selain selisih yang diklasifikasikan, 319 pasangan angka bernilai sama hanya berbeda format. Kelas adaptasi mata uang memakai pasangan Rp/$ dengan nilai sama atau skala nominal 1.000:1; ini bukan validasi kurs.
- Label jenjang seperti Kelas 7 / Grade 7 / 中学1年 diabaikan pada perbandingan angka karena penomoran jenjang berbeda menurut bahasa.

### 10 file dengan ketidaksesuaian terbanyak

| File | Total | (a) Key id hilang | (b) Key ekstra | (c) Array | Format saja | Mata uang | Nama/konteks | Label | Nilai beda | Ambigu pemisah |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 44 | 0 | 0 | 0 | 3 | 0 | 0 | 0 | 11 | 33 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 18 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 18 | 0 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 16 | 0 | 0 | 0 | 7 | 0 | 0 | 0 | 2 | 14 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 16 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 16 | 0 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 15 | 0 | 0 | 0 | 19 | 0 | 0 | 0 | 9 | 6 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx) | 13 | 0 | 0 | 0 | 11 | 0 | 0 | 0 | 13 | 0 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx) | 11 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 11 | 0 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx) | 10 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 10 | 0 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 10 | 0 | 0 | 0 | 22 | 0 | 0 | 0 | 4 | 6 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx) | 10 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 10 | 0 |

### Rekonsiliasi sebelum dan sesudah perbaikan parser

| Perbandingan | Mismatch numeric | Hilang | Baru terungkap |
| --- | ---: | ---: | ---: |
| Ekstraktor digit lama → parser saat ini | 2539 → 635 | 2048 | 144 |
| Pembanding sebelum diagnosis → sesudah diagnosis | 650 → 635 | 22 | 7 |

### Jumlah ketidaksesuaian per jenis (seluruh file)

| Jenis | Jumlah | Dihitung sebagai mismatch |
| --- | ---: | --- |
| format-saja | 319 | Tidak |
| adaptasi-mata-uang | 156 | Tidak |
| adaptasi-nama-konteks | 12 | Tidak |
| label | 3 | Tidak |
| nilai-beda | 405 | Ya |
| ambigu-pemisah | 59 | Ya |
| **Mismatch numeric sebelum pengecualian adaptasi** | **635** | Ya |
| **Mismatch numeric setelah klasifikasi** | **464** | **464** |
| (a) Key ada di id tetapi tidak ada di locale lain | 8 | Ya |
| (b) Key ada di locale lain tetapi tidak ada di id | 1 | Ya |
| (c) Panjang array berbeda | 1 | Ya |
| **Mismatch struktural** | **10** | Ya |
| **Total mismatch terlapor** | **474** | **474** |

Rekonsiliasi: 635 = 156 adaptasi mata uang + 12 adaptasi nama/konteks + 3 label + 405 nilai-beda + 59 ambigu-pemisah. Setelah 171 adaptasi dikecualikan, tersisa 464 mismatch numeric (405 nilai-beda + 59 ambigu-pemisah); 319 pasangan format-saja bernilai sama dan tidak masuk hitungan mismatch. Ditambah 10 mismatch struktural, totalnya 474.

### Uji hipotesis false positive

Jumlah kasus nilai-beda lama yang berubah menjadi sama setelah setiap penyesuaian. Penghitungan tiap baris independen; kelas pemisah tetap ambigu bila teks tidak menentukan tafsirnya.

| Hipotesis | Kasus nilai-beda hilang |
| --- | ---: |
| Tanda minus ASCII/Unicode (`-`, `−`, `–`, `—`) | 22 |
| Penghitung Jepang dan angka kanji | 0 |
| Angka-kata Inggris / nomor langkah | 0 |
| Pemisah ribuan/desimal | 0 |

Uji separator sengaja tidak mengubah tafsir berdasarkan dugaan: kandidat ambigu tetap dihitung sebagai ambigu-pemisah, bukan dihapus sebagai false positive.

### Sampel acak merata: 30 kasus nilai-beda dari file berbeda

Pemilihan memakai seed tetap untuk hasil yang dapat direproduksi; satu kasus dipilih per file.

| File | Baris | Key | Nilai id lengkap | Nilai en/ja lengkap | Code point angka id | Code point angka en/ja |
| --- | ---: | --- | --- | --- | --- | --- |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/SifatSifatOperasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/SifatSifatOperasiPage.tsx) | 82 | `k4_tip2` | Berlaku juga untuk lebih dari dua faktor: | 3つ以上の因数にも使える： | — | 3=U+0033 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/PerbandinganRusukSikuSikuPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/PerbandinganRusukSikuSikuPage.tsx) | 117 | `conclusionEnd` | satu sama lain, dan dari kesebangunan inilah lahir ketiga rumus perbandingan rusuk. | ができ、そこから辺の比に関する3つの公式が導かれます。 | ,=U+002C, .=U+002E | 3=U+0033, 。=U+3002 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx) | 53 | `q1L2Var2` | = harga 1 kg jeruk ($) | = オレンジ1kgの価格（$） | 1=U+0031 | 1=U+0031 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SifatSudutDuaGarisSejajarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SifatSudutDuaGarisSejajarPage.tsx) | 102 | `s5bold3` | saling berpelurus | 補角（和が180°） | — | 1=U+0031, 8=U+0038, 0=U+0030 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/DilatasisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/DilatasisPage.tsx) | 1869 | `$value` | Dilatasi adalah satu-satunya transformasi di antara keempat jenis yang mengubah ukuran bangun. Faktor skala k menentukan segalanya: besar/kecil, arah, dan posisi bayangan. Dilatasi bukan isometri karena ukurannya berubah, tetapi bentuk tetap sama (sebangun). Kuasai rumus pusat O dan pusat P(a,b), serta ingat bahwa luas bayangan = k² × luas asal! | 拡大・縮小は、4種類の変換の中で唯一図形の大きさを変える変換です。拡大率kがすべてを決定します：大小、向き、像の位置。拡大・縮小は大きさが変わるため等長変換ではありませんが、形は変わりません（相似）。中心Oと中心P(a,b)の公式をマスターし、像の面積 = k² × 元の面積であることを忘れずに！ | -=U+002D, .=U+002E, ,=U+002C | 4=U+0034, 一=U+4E00, 。=U+3002, ,=U+002C |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/KalimatTerbukaTertutupPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/KalimatTerbukaTertutupPage.tsx) | 126 | `c3Question` | Dari kalimat-kalimat berikut, klasifikasikan masing-masing sebagai kalimat terbuka, kalimat tertutup benar, kalimat tertutup salah, atau bukan keduanya. Jika kalimat terbuka, tentukan satu nilai penyelesaiannya! | 次の各文を「開いた文」「真の閉じた文」「偽の閉じた文」「どちらでもない」に分類しなさい。開いた文なら解を1つ求めなさい！ | -=U+002D, ,=U+002C, .=U+002E | 。=U+3002, 1=U+0031 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx) | 396 | `posNegG1` | (satu buah -3) | （-3 が 1 つ） | -=U+002D, 3=U+0033 | -=U+002D, 3=U+0033, 1=U+0031 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GrafikPGLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GrafikPGLPage.tsx) | 243 | `c3_soal_end` | digambar pada satu bidang koordinat. Tentukan titik potong kedua garis tersebut, lalu gambarkan! | を同じ座標平面に描く。2 直線の交点を求め、グラフを描け！ | .=U+002E, ,=U+002C | 。=U+3002, 2=U+0032 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/BentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/BentukDesimalPage.tsx) | 11 | `sec4Notation[]` | 0,16̅ = 0,1666... (angka 6 berulang setelah 1) | 0.16̅ = 0.1666...（1 の後で数字 6 が繰り返す） | 0=U+0030, ,=U+002C, 1=U+0031, 6=U+0036, .=U+002E | 0=U+0030, .=U+002E, 1=U+0031, 6=U+0036 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPtLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPtLSVPage.tsx) | 21 | `introBox` | Contoh situasi: "Kamu hanya punya uang Rp50.000. Kamu ingin membeli beberapa buku seharga Rp12.000 per buku. Paling banyak berapa buku yang bisa kamu beli?" → Ini adalah masalah PtLSV! | 例：「あなたは$50しか持っていません。1冊$12の本を何冊か買いたいです。最大で何冊買えますか？」→ これが一元一次不等式の問題です！ | 5=U+0035, 0=U+0030, .=U+002E, 1=U+0031, 2=U+0032 | 5=U+0035, 0=U+0030, 。=U+3002, 1=U+0031, 2=U+0032, 一=U+4E00 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx) | 53 | `c3ShipPDesc` | 36 km timur, 15 km utara | 東へ36km、北へ15km | 3=U+0033, 6=U+0036, ,=U+002C, 1=U+0031, 5=U+0035 | 3=U+0033, 6=U+0036, 1=U+0031, 5=U+0035 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 45 | `ex1Q` | Bulatkan 4,638 sampai satu desimal | 4,638 を小数第1位まで四捨五入せよ | 4=U+0034, ,=U+002C, 6=U+0036, 3=U+0033, 8=U+0038 | 4=U+0034, ,=U+002C, 6=U+0036, 3=U+0033, 8=U+0038, 1=U+0031, 四=U+56DB, 五=U+4E94 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx) | 114 | `c3VarSolve` | 2x = 24.000 \Rightarrow x = 12.000 | 2x = 24 \Rightarrow x = 12 | 2=U+0032, 4=U+0034, .=U+002E, 0=U+0030, 1=U+0031 | 2=U+0032, 4=U+0034, 1=U+0031 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BrutoNettoTaraPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BrutoNettoTaraPage.tsx) | 132 | `quiz[].penjelasan` | Netto 1 kotak = (1 − 0,05) × 2 = 1,9 kg. Total = 10 × 1,9 = 19 kg. | Net per box = (1 − 0.05) × 2 = 1.9 kg. Total = 10 × 1.9 = 19 kg. | 1=U+0031, −=U+2212, 0=U+0030, ,=U+002C, 5=U+0035, 2=U+0032, 9=U+0039, .=U+002E | 1=U+0031, −=U+2212, 0=U+0030, .=U+002E, 5=U+0035, 2=U+0032, 9=U+0039 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SudutPelurusPenyikuBertolakPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SudutPelurusPenyikuBertolakPage.tsx) | 34 | `s1bold` | daerah yang terbentuk di antara dua sinar garis yang bertemu di satu titik pangkal | 1点から出る2本の直線の間にできる領域 | — | 1=U+0031, 2=U+0032 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx) | 67 | `c3Q` | Sebuah denah lapangan olahraga menggunakan skala 1 : 1.000. Pada denah, luas lapangan tersebut adalah 12 cm². (a) Tentukan luas lapangan sebenarnya dalam m²! (b) Jika lapangan futsal di sebelahnya luasnya 800 m², berapa cm² luasnya di denah? | スポーツグラウンドの間取り図の縮尺は1：1,000です。図面上のグラウンドの面積は12cm²です。 (a) 実際のグラウンドの面積をm²で求めなさい。 (b) 隣接するフットサルコートの実際の面積が800m²のとき、図面上では何cm²ですか？ | 1=U+0031, .=U+002E, 0=U+0030, ,=U+002C, 2=U+0032, 8=U+0038 | 1=U+0031, ,=U+002C, 0=U+0030, 。=U+3002, 2=U+0032, 8=U+0038 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPLPage.tsx) | 56 | `c1_problem` | Dua lingkaran berjari-jari 10 cm dan 4 cm. Jarak antara kedua pusatnya adalah 17 cm. Hitung panjang GSPL! | 半径10 cmと4 cmの2つの円があり、中心間の距離は17 cmです。外接共通接線の長さを求めなさい！ | -=U+002D, 1=U+0031, 0=U+0030, 4=U+0034, .=U+002E, 7=U+0037 | 1=U+0031, 0=U+0030, 4=U+0034, 2=U+0032, 7=U+0037, 。=U+3002 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/PengertianFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/PengertianFungsiPage.tsx) | 43 | `konsepNoteText` | Boleh saja dua anggota domain berbeda dipasangkan ke anggota kodomain yang sama. Yang tidak boleh adalah satu anggota domain punya dua keluaran berbeda! | 異なる定義域要素が同じ終域要素を指すことは問題ありません。許可されないのは、1つの定義域要素が2つの異なる出力を持つことです！ | .=U+002E | 。=U+3002, 1=U+0031, 2=U+0032 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegitigaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegitigaPage.tsx) | 95 | `s4tipText` | Setiap naik 1 tingkat satuan panjang → dikali 10. Tapi satuan luas berarti dikuadratkan → naik 1 tingkat = dikali 100. | Each step up in length unit → multiply by 10. But area units are squared → one step up = multiply by 100. | 1=U+0031, 0=U+0030, .=U+002E | 1=U+0031, 0=U+0030, .=U+002E |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegiempatPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegiempatPage.tsx) | 56 | `s1tipSqEnd` | (satu ukuran dikuadratkan) | （1つの寸法を2乗） | — | 1=U+0031, 2=U+0032 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PengertianKeanggotaanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PengertianKeanggotaanPage.tsx) | 232 | `s4e1a` | Hari dalam seminggu: Senin, Selasa, Rabu, Kamis, Jumat, Sabtu, Minggu → ada 7 hari. | 1週間の日：月、火、水、木、金、土、日 → 7日。 | ,=U+002C, 7=U+0037, .=U+002E | 1=U+0031, 7=U+0037, 。=U+3002 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/OperasiCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/OperasiCampuranPage.tsx) | 105 | `err2Title` | Kesalahan #2: Lupa Aturan Tanda Saat Mengurangi Bilangan Negatif | 間違い②：負の数を引くときの符号を忘れる | 2=U+0032 | — |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaKhususPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaKhususPage.tsx) | 52 | `ex1Ans` | ✅ Jawaban: Suku ke-12 dari barisan 1, 4, 9, 16, ... adalah 144. | ✅ 答え：数列1, 4, 9, 16, ... の第12項は144です。 | -=U+002D, 1=U+0031, 2=U+0032, ,=U+002C, 4=U+0034, 9=U+0039, 6=U+0036, .=U+002E | 1=U+0031, ,=U+002C, 4=U+0034, 9=U+0039, 6=U+0036, .=U+002E, 2=U+0032, 。=U+3002 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx) | 85 | `derivStep1Desc` | Misalkan S_n adalah jumlah n suku pertama. Kita tulis dua kali — maju dan mundur: | S_nを最初のn項の和とする。正順と逆順の2通りで書く： | .=U+002E, —=U+2014 | 。=U+3002, 2=U+0032 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx) | 60 | `c2_problem` | Tiga silinder berjari-jari 14 cm disusun berjajar dan diikat sabuk keliling. Tentukan panjang sabuk minimal! (π = 22/7) | 半径14 cmの3つの円柱が一列に並びベルトで囲まれています。最小ベルト長を求めなさい！（π = 22/7） | -=U+002D, 1=U+0031, 4=U+0034, .=U+002E, 2=U+0032, 7=U+0037 | 1=U+0031, 4=U+0034, 3=U+0033, 一=U+4E00, 。=U+3002, 2=U+0032, 7=U+0037 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/UnsurUnsurCartesiusPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/UnsurUnsurCartesiusPage.tsx) | 83 | `ex2q2` | . Tentukan nilai | が与えられています。点Aがちょうど原点O(0, 0)にある場合、 | .=U+002E | 。=U+3002, 0=U+0030, ,=U+002C |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-datar/PrismaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-datar/PrismaPage.tsx) | 1398 | `subtitle` | Kelas 8 · Bangun Ruang Sisi Datar | 中2 · 空間図形 | 8=U+0038 | 2=U+0032 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PengertianPolaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PengertianPolaPage.tsx) | 109 | `ex2Answer` | ✅ Jawaban: Suku ke-15 dari barisan 6, 12, 20, 30, … adalah 272. | ✅ 答え：数列6, 12, 20, 30, … の第15項は272です。 | -=U+002D, 1=U+0031, 5=U+0035, 6=U+0036, ,=U+002C, 2=U+0032, 0=U+0030, 3=U+0033, 7=U+0037, .=U+002E | 6=U+0036, ,=U+002C, 1=U+0031, 2=U+0032, 0=U+0030, 3=U+0033, 5=U+0035, 7=U+0037, 。=U+3002 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/PenyajianDataPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/PenyajianDataPage.tsx) | 141 | `linePlaceholder` | Contoh: Jan | 例：1月 | — | 1=U+0031 |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/BanyakFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/BanyakFungsiPage.tsx) | 88 | `koresp_visual_no` | ❌ BUKAN KORESPONDENSI 1-1 | ❌ 一対一対応ではない | 1=U+0031, -=U+002D | 一=U+4E00 |

Klasifikasi numeric mismatch: token digit yang sama tetapi ditafsirkan berbeda menurut locale menjadi ambigu-pemisah; label soal/langkah/figur yang bila dihapus menyamakan angka menjadi label; pasangan Rp/$ dengan rasio nominal 1.000:1 menjadi adaptasi-mata-uang; nama orang lokal/netral yang dikenali atau classifier jumlah Jepang yang tidak dinyatakan di id menjadi adaptasi-nama-konteks. Sisa perbedaan menjadi nilai-beda. Pasangan angka sama yang hanya berbeda separator dicatat sebagai format-saja.

### Seluruh kasus nilai-beda dan ambigu-pemisah

| File | Baris | Key | Bahasa pembanding | Nilai id | Nilai en/ja | Angka id | Angka en/ja |
| --- | ---: | --- | --- | --- | --- | --- | --- |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BrutoNettoTaraPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BrutoNettoTaraPage.tsx) | 132 | `quiz[].penjelasan` | en | Netto 1 kotak = (1 − 0,05) × 2 = 1,9 kg. Total = 10 × 1,9 = 19 kg. | Net per box = (1 − 0.05) × 2 = 1.9 kg. Total = 10 × 1.9 = 19 kg. | [1, 1, 0.05, 2, 1.9, 10, 1.9, 19] | [1, 0.05, 2, 1.9, 10, 1.9, 19] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BungaTunggalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BungaTunggalPage.tsx) | 70 | `phModal` | en | contoh: 2000000 | e.g. 2000 | [2000000] | [2000] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BungaTunggalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BungaTunggalPage.tsx) | 70 | `phModal` | ja | contoh: 2000000 | 例：2000 | [2000000] | [2000] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BungaTunggalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BungaTunggalPage.tsx) | 109 | `soalContoh[].soal` | ja | Setelah 2,5 tahun dengan bunga tunggal 8% per tahun, total tabungan Avery menjadi Rp3.600.000. Berapa modal awal yang ia tabungkan? | 年利8%の単利で2.5年後、Averyの合計残高が$3,600になった。元金はいくらか？ | [2.5, 8, 3600000] | [8, 2.5, 3600] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/DiskonPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/DiskonPage.tsx) | 184 | `kalkPH` | en | mis. 300000 | e.g. 300 | [300000] | [300] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/DiskonPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/DiskonPage.tsx) | 185 | `kalkPHBayar` | en | mis. 240000 | e.g. 240 | [240000] | [240] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/DiskonPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/DiskonPage.tsx) | 156 | `quiz[].soal` | en | Harga celana setelah diskon 25% adalah Rp225.000. Berapa harga aslinya? | Pants cost $225 after a 25% discount. What was the original price? | [25, 225000] | [225, 25] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/DiskonPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/DiskonPage.tsx) | 184 | `kalkPH` | ja | mis. 300000 | 例：300 | [300000] | [300] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/DiskonPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/DiskonPage.tsx) | 185 | `kalkPHBayar` | ja | mis. 240000 | 例：240 | [240000] | [240] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx) | 136 | `c1Q` | en | Seorang pedagang membeli 1 karung beras seharga Rp180.000 lalu menjualnya seharga Rp225.000. Hitunglah besar untung dan persentase keuntungannya! | A merchant buys a sack of rice for $180 and sells it for $225. Calculate the profit and profit percentage! | [1, 180000, 225000] | [180, 225] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx) | 81 | `hbInputPH` | en | Contoh: 200000 | e.g. 200 | [200000] | [200] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx) | 82 | `hjInputPH` | en | Contoh: 250000 | e.g. 250 | [250000] | [250] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx) | 141 | `c2Q` | ja | Seorang pedagang buah membeli durian seharga Rp240.000 per buah. Ia ingin mendapatkan untung 35% dari modal. Berapa harga jual yang harus ia patok? | 果物商人がドリアンを1個$240で仕入れた。元金の35%の利益を得たい。売価はいくらに設定すべきか？ | [240000, 35] | [1, 240, 35] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx) | 149 | `c4Q` | ja | Seorang pedagang membeli 10 buah mangga seharga Rp50.000. Ia menjual 7 buah seharga Rp6.000 per buah dan sisanya busuk. Apakah pedagang untung, rugi, atau impas? | 商人がマンゴーを10個$50で買った。7個を1個$6で売り、残りは腐った。商人は利益・損失・損益分岐のどれか？ | [10, 50000, 7, 6000] | [10, 50, 7, 1, 6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx) | 81 | `hbInputPH` | ja | Contoh: 200000 | 例：200 | [200000] | [200] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx) | 82 | `hjInputPH` | ja | Contoh: 250000 | 例：250 | [250000] | [250] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx) | 66 | `pctUntungEx` | ja | Contoh: untung Rp20.000 dari modal Rp100.000 → | 例：元金$100から$20の利益 → | [20000, 100000] | [100, 20] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPhPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPhPage.tsx) | 119 | `tarifTable[].pkp` | en | di atas Rp500 jt | Above Rp500M | [500] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPhPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPhPage.tsx) | 65 | `contoh[].maths2[]` | ja | \text{Besar PPh} = 5\% \times 0 = \text{Rp}0 | \text{所得税} = 5\% \times 0 = 0 | [5, 0] | [5, 0, 0] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPhPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPhPage.tsx) | 205 | `contoh[].soal` | ja | Pak Rudi memiliki penghasilan bruto Rp8.000.000 per bulan dan PTKP Rp3.000.000 per bulan. Setelah dipotong pajak, ia menerima Rp4.750.000. Berapa tarif PPh yang dikenakan? | Rudiさんの月額額面は800万、PTKP月300万。税控除後に475万を受け取っています。適用された税率は？ | [8000000, 3000000, 4750000] | [800, 300, 475] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPhPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPhPage.tsx) | 206 | `contoh[].steps` | ja | 📌 Diketahui: Bruto = Rp8.000.000, PTKP = Rp3.000.000, Bersih = Rp4.750.000 | 📌 既知: 額面 = 800万、PTKP = 300万、手取り = 475万 | [8000000, 3000000, 4750000] | [800, 300, 475] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPhPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPhPage.tsx) | 119 | `tarifTable[].pkp` | ja | di atas Rp500 jt | 5億ルピア超 | [500] | [5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx) | 171 | `contoh[].math2` | en | 102.000 \times 1{,}11 = \text{Rp}113.220 | 102{,}000 \times 1{.}11 = \text{Rp}113{,}220 | [102000, 1.11, 220] | [102000, 1, 11, 220] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx) | 159 | `contoh[].noteKatex` | en | 120.000 \times 1{,}11 = \text{Rp}133.200 | 120{,}000 \times 1{.}11 = \text{Rp}133{,}200 | [120000, 1.11, 200] | [120000, 1, 11, 200] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx) | 169 | `contoh[].math1` | ja | 120.000 \times (100\% - 15\%) = 120.000 \times 85\% = \text{Rp}102.000 | 120{,}000 \times (100\% - 15\%) = 120{,}000 \times 85\% = 102{,}000 | [120000, 100, 15, 120000, 85, 0] | [120000, 100, 15, 120000, 85, 102000] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx) | 171 | `contoh[].math2` | ja | 102.000 \times 1{,}11 = \text{Rp}113.220 | 102{,}000 \times 1{.}11 = 113{,}220 | [102000, 1.11, 220] | [102000, 1, 11, 113220] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx) | 159 | `contoh[].noteKatex` | ja | 120.000 \times 1{,}11 = \text{Rp}133.200 | 120{,}000 \times 1{.}11 = 133{,}200 | [120000, 1.11, 200] | [120000, 1, 11, 133200] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-datar/PrismaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-datar/PrismaPage.tsx) | 1398 | `subtitle` | ja | Kelas 8 · Bangun Ruang Sisi Datar | 中2 · 空間図形 | [] | [2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/KerucutPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/KerucutPage.tsx) | 1535 | `quoteText` | ja | Keduanya punya alas lingkaran, tapi tabung punya dua alas dan tinggi seragam, sedangkan kerucut hanya punya satu alas dan meruncing ke atas! | どちらも円形の底面を持ちますが、円柱は底面が2つあり高さが一定なのに対し、円錐は底面が1つで先端に向かって細くなります！ | [2, 2] | [2, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/KerucutPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/KerucutPage.tsx) | 1761 | `intro` | ja |  Garis pelukis, tinggi, dan jari-jari alas membentuk segitiga siku-siku di pusat alas. Dengan Teorema Pythagoras, kita dapat mencari salah satu unsur jika dua lainnya diketahui.  |  母線・高さ・底面の半径は、底面の中心で直角三角形を作ります。 ピタゴラスの定理を使えば、2つの値がわかれば残り1つを求められます。  | [1, 2] | [2, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/KerucutPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/KerucutPage.tsx) | 2887 | `$value[].answer` | ja |  Langkah 1 — Jari-jari & tinggi kerucut penuh: r_1 = \frac{28}{2} = 14 \text{ cm}, \quad t_1 = 30 \text{ cm} Langkah 2 — Jari-jari kerucut pasir (sebangun): Pasir setinggi 20 cm dari puncak membentuk kerucut kecil sebangun: \frac{r_2}{r_1} = \frac{t_2}{t_1} = \frac{20}{30} = \frac{2}{3} r_2 = 14 \times \frac{2}{3} = \frac{28}{3} \text{ cm} Langkah 3 — Volume pasir: V_2 = \frac{1}{3}\pi r_2^2 \times t_2 = \frac{1}{3} \times \frac{22}{7} \times \left(\frac{28}{3}\right)^2 \times 20 = \frac{1}{3} \times \frac{22}{7} \times \frac{784}{9} \times 20 = \frac{22 \times 784 \times 20}{3 \times 7 \times 9} = \frac{344.960}{189} \approx 1.825{,}7 \text{ cm}^3 ✅ Jawaban: • Jari-jari pasir = 28/3 ≈ 9,33 cm • Volume pasir ≈ 1.825,7 cm³ 💡 Kunci: gunakan sifat kesebangunan kerucut!  |  ステップ1 — 元の円錐（全体）の半径と高さ： r_1 = \frac{28}{2} = 14 \text{ cm}, \quad t_1 = 30 \text{ cm} ステップ2 — 砂の円錐の半径（相似）： 頂点から20cmの高さの砂は、相似な小さい円錐を形成します： \frac{r_2}{r_1} = \frac{t_2}{t_1} = \frac{20}{30} = \frac{2}{3} r_2 = 14 \times \frac{2}{3} = \frac{28}{3} \text{ cm} ステップ3 — 砂の体積： V_2 = \frac{1}{3}\pi r_2^2 \times t_2 = \frac{1}{3} \times \frac{22}{7} \times \left(\frac{28}{3}\right)^2 \times 20 = \frac{1}{3} \times \frac{22}{7} \times \frac{784}{9} \times 20 = \frac{22 \times 784 \times 20}{3 \times 7 \times 9} = \frac{344{,}960}{189} \approx 1{,}825.7 \text{ cm}^3 ✅ 解答： • 砂の円錐の半径 = 28/3 ≈ 9.33 cm • 砂の体積 ≈ 1,825.7 cm³ 💡 ポイント：円錐の相似の性質を使う！  | [1, 28, 2, 14, 30, 2, 20, 20, 30, 2, 3, 14, 2, 3, 28, 3, 3, 1, 3, 2, 1, 3, 22, 7, 28, 3, 2, 20, 1, 3, 22, 7, 784, 9, 20, 22, 784, 20, 3, 7, 9, 344960, 189, 1825.7, 3, 28, 3, 9.33, 1825.7] | [1, 28, 2, 14, 30, 2, 20, 30, 2, 3, 14, 2, 3, 28, 3, 3, 1, 3, 2, 1, 3, 22, 7, 28, 3, 2, 20, 1, 3, 22, 7, 784, 9, 20, 22, 784, 20, 3, 7, 9, 344960, 189, 1825.7, 3, 28, 3, 9.33, 1825.7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/PerubahanVolumePage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/PerubahanVolumePage.tsx) | 295 | `bullet1` | en | Luas permukaan berubah sebesar k² kali (proporsional dengan pangkat 2) | Surface area changes by k² times (proportional to the square) | [2] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/PerubahanVolumePage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/PerubahanVolumePage.tsx) | 296 | `bullet2` | en | Volume berubah sebesar k³ kali (proporsional dengan pangkat 3) | Volume changes by k³ times (proportional to the cube) | [3] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/PerubahanVolumePage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/PerubahanVolumePage.tsx) | 298 | `c1b1` | en | • Luas ~ dimensi pangkat 2 | • Area ~ dimension squared | [2] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/PerubahanVolumePage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/PerubahanVolumePage.tsx) | 299 | `c1b2` | en | • Volume ~ dimensi pangkat 3 | • Volume ~ dimension cubed | [3] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/PerubahanVolumePage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/PerubahanVolumePage.tsx) | 284 | `opening` | en |  Pernahkah kamu bertanya: "Kalau jari-jari tabung diperbesar 2 kali, apakah volumenya juga 2 kali lebih besar?" Jawabannya adalah TIDAK — dan inilah yang akan kita pelajari di bab ini!  |  Have you ever wondered: "If a cylinder's radius is doubled, does its volume also double?" The answer is NO — and that's exactly what we'll explore in this chapter!  | [2, 2] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/NotasiIlmiahPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/NotasiIlmiahPage.tsx) | 39 | `k1_a_desc` | ja | Bilangan desimal antara 1 dan 10 (tidak termasuk 10) | 1以上10未満の小数 | [1, 10, 10] | [1, 10] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/PengertianNotasiPangkatPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/PengertianNotasiPangkatPage.tsx) | 104 | `ex1_hard_q` | ja | Sebuah bakteri membelah diri menjadi 2 setiap jam. Jika awalnya ada 1 bakteri, berapa banyak bakteri setelah 8 jam? Nyatakan jawabanmu menggunakan notasi pangkat! | 細菌は1時間ごとに2倍に分裂する。最初に1個あったとき、8時間後には何個になるか？指数表記で答えよ！ | [2, 1, 8] | [1, 2, 1, 8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/PengertianNotasiPangkatPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/PengertianNotasiPangkatPage.tsx) | 159 | `konsep3_def_zero` | ja | Bilangan apa pun (kecuali nol) yang dipangkatkan nol hasilnya adalah 1: | ゼロでない数を0乗すると常に1になる： | [1] | [0, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/SifatSifatOperasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/SifatSifatOperasiPage.tsx) | 82 | `k4_tip2` | ja | Berlaku juga untuk lebih dari dua faktor: | 3つ以上の因数にも使える： | [2] | [3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/SifatSifatOperasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/SifatSifatOperasiPage.tsx) | 95 | `k6_desc` | ja | Bilangan apa pun (kecuali nol) yang dipangkatkan nol selalu menghasilkan | ゼロでない数の0乗は常に | [] | [0] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx) | 155 | `lcmStoryAns` | ja | Mereka akan bertemu lagi pada tanggal | 3人が次に会うのは | [] | [3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx) | 156 | `lcmStoryAnsDate` | ja | 21 Februari | 2月21日 | [21] | [2, 21] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx) | 146 | `lcmStoryQ4` | ja | . Jika pada tanggal 28 Januari mereka berkunjung bersama-sama, kapan mereka akan bertemu lagi di perpustakaan? | に図書館を訪れる。1月28日に3人が一緒に訪れたとすると、次に図書館で会うのはいつか？ | [28] | [1, 28, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx) | 152 | `lcmStoryS3a` | ja | 28 Januari + 24 hari | 1月28日 + 24日 | [28, 24] | [1, 28, 24] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx) | 153 | `lcmStoryS3b` | ja | Januari memiliki 31 hari, sisa: 31 - 28 = 3 hari | 1月は31日まで、残り: 31 - 28 = 3日 | [31, 31, 28, 3] | [1, 31, 31, 28, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx) | 154 | `lcmStoryS3c` | ja | 24 - 3 = 21 hari di bulan Februari | 24 - 3 = 2月の21日 | [24, 3, 21] | [24, 3, 2, 21] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx) | 48 | `tipMultiples` | ja | Kelipatan suatu bilangan selalu tak terhingga banyaknya, tetapi KPK adalah satu nilai pasti yang merupakan kelipatan terkecil yang dimiliki bersama oleh dua bilangan atau lebih. | ある数の倍数は無限に存在しますが、最小公倍数は2つ以上の数が共有する最小の倍数という唯一の値です。 | [1] | [2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/OperasiCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/OperasiCampuranPage.tsx) | 100 | `bonusAns` | ja | Stok jeruk Pak Budi sekarang adalah 55 kg | ブディさんの在庫は現在55kgです | [55] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/OperasiCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/OperasiCampuranPage.tsx) | 95 | `bonusStory` | ja | Pak Budi seorang pedagang buah. Pada pagi hari, ia memiliki stok 50 kg jeruk. Siang hari terjual 28 kg, lalu sore hari datang kiriman 3 karung yang masing-masing berisi 15 kg. Malam hari, ada 12 kg jeruk yang busuk dan harus dibuang. Berapa kg stok jeruk Pak Budi sekarang? | ブディさんは果物屋です。朝、オレンジが50kg在庫にあります。昼間に28kg売れ、夕方に各15kgの袋が3袋届きました。夜に12kgのオレンジが腐って廃棄されました。今、ブディさんの在庫は何kgですか？ | [50, 28, 3, 15, 12] | [3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/OperasiCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/OperasiCampuranPage.tsx) | 101 | `err1Title` | ja | Kesalahan #1: Mengerjakan dari Kiri ke Kanan Tanpa Melihat Prioritas | 間違い①：優先度を確認せずに左から右へ計算する | [1] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/OperasiCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/OperasiCampuranPage.tsx) | 105 | `err2Title` | ja | Kesalahan #2: Lupa Aturan Tanda Saat Mengurangi Bilangan Negatif | 間違い②：負の数を引くときの符号を忘れる | [2] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/OperasiCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/OperasiCampuranPage.tsx) | 107 | `err3Title` | ja | Kesalahan #3: Tidak Menyelesaikan Kurung Terdalam Lebih Dulu | 間違い③：最も内側の括弧を先に計算しない | [3] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PembagianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PembagianPage.tsx) | 123 | `contoh3ConcBold` | ja | 15 meter ke bawah | 15m下方向 | [15] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PembagianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PembagianPage.tsx) | 118 | `contoh3Known1` | ja | Kedalaman akhir = 120 m di bawah permukaan =  | 最終深度 = 海面下120m =  | [120] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PembagianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PembagianPage.tsx) | 114 | `contoh3Story` | ja | Sebuah kapal selam menyelam dari permukaan laut hingga kedalaman 120 meter di bawah permukaan laut dalam waktu 8 menit dengan kecepatan konstan. Berapa meter perubahan kedalaman kapal selam setiap menitnya? | 潜水艦が海面から8分間で一定の速さで海面下120mの深さまで潜りました。潜水艦の深さは毎分何メートル変化しましたか？ | [120, 8] | [8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PembagianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PembagianPage.tsx) | 116 | `ditanya` | ja | Ditanya: Perubahan kedalaman per menit? | 求めること：1分あたりの深さの変化 | [] | [1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PembagianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PembagianPage.tsx) | 121 | `katexContoh3` | ja | \text{Perubahan per menit} = (-120) \div 8 = -15 \text{ meter} | \text{1分あたりの変化量} = (-120) \div 8 = -15 \text{ m} | [-120, 8, -15] | [1, -120, 8, -15] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PenguranganPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PenguranganPage.tsx) | 1058 | `ex4S2Body` | ja | Hitung dari kiri ke kanan. Pertama, jumlahkan dua bilangan negatif: | 左から右へ計算する。まず、2つの負の数を足す： | [1] | [2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PenguranganPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PenguranganPage.tsx) | 1089 | `sifat4Body` | ja | Mengurangi suatu bilangan dengan nol menghasilkan bilangan itu sendiri. Namun, nol dikurangi bilangan menghasilkan lawan bilangan tersebut. | ある数から0を引くとその数自身になります。しかし、0からある数を引くとその数の反数になります。 | [] | [0, 0] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PenjumlahanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PenjumlahanPage.tsx) | 1059 | `ex4aMeaning2` | ja | berada 8 langkah di sebelah kanan -14: | は−14の8ステップ右にある： | [8, -14] | [-14, 8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PenjumlahanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PenjumlahanPage.tsx) | 979 | `listTemp` | ja | Suhu di bawah | 0°C以下の気温（例： | [] | [0] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PenjumlahanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PenjumlahanPage.tsx) | 1079 | `sifat3Body` | ja | Cara | 3つ以上の数を足すとき、数を | [] | [3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx) | 515 | `conclusionBodyC` | ja | : tanda sama menghasilkan positif, tanda berbeda menghasilkan negatif. Dengan sifat | たった 1 つの黄金則しかありません。 | [] | [1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx) | 372 | `desc2x3Bold` | ja | dua buah tigaan | 3 の 2 つ分 | [2] | [3, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx) | 373 | `desc4x5Bold` | ja | empat buah limaan | 5 の 4 つ分 | [4] | [5, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx) | 396 | `posNegG1` | ja | (satu buah -3) | （-3 が 1 つ） | [1, -3] | [-3, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx) | 397 | `posNegG2` | ja | (dua buah -3) | （-3 が 2 つ） | [2, -3] | [-3, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx) | 398 | `posNegG3` | ja | (tiga buah -3) | （-3 が 3 つ） | [3, -3] | [-3, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx) | 399 | `posNegG4` | ja | (empat buah -3) | （-3 が 4 つ） | [4, -3] | [-3, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx) | 383 | `posPosG1` | ja | (satu buah 3) | （3 が 1 つ） | [1, 3] | [3, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx) | 384 | `posPosG2` | ja | (dua buah 3) | （3 が 2 つ） | [2, 3] | [3, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx) | 386 | `posPosG4` | ja | (empat buah 3) | （3 が 4 つ） | [4, 3] | [3, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/ArtiPecahanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/ArtiPecahanPage.tsx) | 43 | `ex2Q` | ja | Nyatakan 45 menit dari 1 jam dalam bentuk pecahan paling sederhana! | 1 時間のうちの 45 分を、最も簡単な分数で表せ！ | [45, 1] | [1, 45] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/ArtiPecahanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/ArtiPecahanPage.tsx) | 66 | `ex4Q` | ja | Tentukan 2 pecahan yang senilai dengan \frac{2}{3}! | \frac{2}{3} と等価な分数を 2 つ求めよ！ | [2, 2, 3] | [2, 3, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/ArtiPecahanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/ArtiPecahanPage.tsx) | 59 | `sec2VisualExample` | ja |  Contoh Visual: Bayangkan sebuah pizza. Jika dipotong jadi 2 dan kamu ambil 1 potong (\frac{1}{2}), itu sama dengan mengambil 2 potong dari pizza yang dipotong jadi 4 (\frac{2}{4}), atau 3 potong dari pizza yang dipotong jadi 6 (\frac{3}{6}).  |  視覚的な例：ピザを 2 等分して 1 切れ取る（\frac{1}{2}）のは、4 等分して 2 切れ取る（\frac{2}{4}）や、6 等分して 3 切れ取る（\frac{3}{6}）と同じです。  | [2, 1, 1, 2, 2, 4, 2, 4, 3, 6, 3, 6] | [2, 1, 1, 2, 4, 2, 2, 4, 6, 3, 3, 6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/BentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/BentukDesimalPage.tsx) | 36 | `ex3Ans` | en | Jadi, 4,67 sama dengan 4 67/100 | So, 4.67 equals 4 and 67/100 | [4.67, 467, 100] | [4.67, 4, 67, 100] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/BentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/BentukDesimalPage.tsx) | 86 | `sec4TipBody` | en | Jika semua angka setelah koma berulang, penyebut awalnya terdiri dari angka 9. Jika ada angka yang tidak berulang di depan, tambahkan angka 0 pada penyebut untuk setiap angka tersebut. | If all digits after the decimal point repeat, the initial denominator is made of 9s. If non-repeating digits come first, add one 0 to the denominator for each non-repeating digit. | [9, 0] | [1, 0] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/BentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/BentukDesimalPage.tsx) | 74 | `ex10Body` | ja | Misalkan x = 0,3333.... Kalikan 10 karena 1 angka yang berulang. | x = 0.3333... とおきます。1桁が繰り返すので 10 倍します。 | [0.3333, 10, 1] | [0.3333, 1, 10] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/BentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/BentukDesimalPage.tsx) | 27 | `ex1Q` | ja | Tentukan nilai tempat angka 7 pada bilangan 3,478! | 3.478 における数字 7 の位の値を求めよ！ | [7, 3.478] | [3.478, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/BentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/BentukDesimalPage.tsx) | 36 | `ex3Ans` | ja | Jadi, 4,67 sama dengan 4 67/100 | よって、4.67 = 4 と 67/100 | [4.67, 467, 100] | [4.67, 4, 67, 100] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/BentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/BentukDesimalPage.tsx) | 11 | `sec4Notation[]` | ja | 0,16̅ = 0,1666... (angka 6 berulang setelah 1) | 0.16̅ = 0.1666...（1 の後で数字 6 が繰り返す） | [0.16, 0.1666, 6, 1] | [0.16, 0.1666, 1, 6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PecahanCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PecahanCampuranPage.tsx) | 29 | `sec1Visual` | ja | Pecahan \frac{7}{3} artinya 7 bagian dari keseluruhan yang masing-masing dibagi 3. Karena 7 \div 3 = 2 sisa 1, maka \frac{7}{3} = 2\frac{1}{3} (2 bulat dan \frac{1}{3} sisa). | 分数 \frac{7}{3} は、全体を3等分したものが7個分という意味です。7 \div 3 = 2 余り1なので、\frac{7}{3} = 2\frac{1}{3}（整数2つと\frac{1}{3}の余り）になります。 | [7, 3, 7, 3, 7, 3, 2, 1, 7, 3, 2, 1, 3, 2, 1, 3] | [7, 3, 3, 7, 7, 3, 2, 1, 7, 3, 2, 1, 3, 2, 1, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PecahanCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PecahanCampuranPage.tsx) | 96 | `sec3Summary` | ja | Persen (%) adalah cara menyatakan pecahan dengan penyebut 100. Kata "persen" berasal dari bahasa Latin "per centum" yang berarti "per seratus". Persen sangat umum digunakan dalam kehidupan sehari-hari seperti diskon, pajak, dan statistik. | パーセント（%）とは、分母を100とした分数の表し方です。"percent"はラテン語の"per centum"（100あたり）に由来します。パーセントは割引、税金、統計など日常生活で広く使われています。 | [100] | [100, 100] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PecahanCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PecahanCampuranPage.tsx) | 135 | `sumCards[].desc` | ja | p% dari n = (p/100) × n. Contoh: 25% dari 80 = (25/100) × 80 = 20. | n の p% = (p/100) × n。例：80の25% = (25/100) × 80 = 20。 | [100, 25, 80, 25, 100, 80, 20] | [100, 80, 25, 25, 100, 80, 20] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PecahanCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PecahanCampuranPage.tsx) | 142 | `sumTips[].detail` | ja | Diskon 20% dari Rp 150.000 = 150.000 × 20/100 = Rp 30.000. Harga bayar = 150.000 − 30.000 = Rp 120.000. | $150の20%オフ = $150 × 20/100 = $30引き。支払額 = $150 − $30 = $120。 | [20, 150000, 150000, 20, 100, 30000, 150000, 30000, 120000] | [150, 20, 150, 20, 100, 30, 150, 30, 120] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 43 | `ex3Q` | en | Hitunglah hasil pembagian 3456,78 \div 100.000 | Calculate 3456,78 \div 100.000 | [3456.78, 100000] | [3456.78, 100] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 64 | `ex4Q` | en | Hitunglah hasil pembagian 14,245 \div 0,7 | Calculate 14,245 \div 0,7 | [14.245, 0.7] | [14245, 0.7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 68 | `ex5Q` | en | Hitunglah hasil pembagian 1,03248 \div 0,012 | Calculate 1,03248 \div 0,012 | [1.03248, 0.012] | [1.03248, 12] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 43 | `ex3Q` | ja | Hitunglah hasil pembagian 3456,78 \div 100.000 | 計算せよ 3456,78 \div 100.000 | [3456.78, 100000] | [3456.78, 100] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 46 | `ex3s2desc` | ja | Kita perlu menambah 1 angka nol di depan: 03456,78 | 前に0を1つ追加する必要があります：03456,78 | [1, 3456.78] | [0, 1, 3456.78] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 64 | `ex4Q` | ja | Hitunglah hasil pembagian 14,245 \div 0,7 | 計算せよ 14,245 \div 0,7 | [14.245, 0.7] | [14245, 0.7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 68 | `ex5Q` | ja | Hitunglah hasil pembagian 1,03248 \div 0,012 | 計算せよ 1,03248 \div 0,012 | [1.03248, 0.012] | [1.03248, 12] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 91 | `ex7Q` | ja | Andi membeli 2,5 kg gula dengan harga Rp37.500. Berapakah harga gula per kilogram? | Andiは砂糖2.5 kgを$37,500で買いました。砂糖1 kgあたりの価格はいくらですか？ | [2.5, 37500] | [2.5, 37500, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 97 | `ex7ans` | ja | Harga gula per kilogram adalah Rp15.000 | 砂糖1 kgの価格は$15,000です。 | [15000] | [1, 15000] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 94 | `ex7find` | ja | Harga per kilogram | 1 kgあたりの価格 | [] | [1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 95 | `ex7pricePerKg` | ja | Harga per kg =  | 1 kgの価格 =  | [] | [1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 99 | `ex8Q` | ja | Sebuah mobil menempuh jarak 187,5 km dengan menghabiskan 12,5 liter bensin. Berapa kilometer yang dapat ditempuh mobil tersebut untuk setiap liter bensin? | 車が12.5リットルのガソリンで187.5 kmを走りました。1リットルあたり何km走れますか？ | [187.5, 12.5] | [12.5, 187.5, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 106 | `ex8ans` | ja | Mobil dapat menempuh 15 km per liter bensin | 車は1リットルで15 km走れます。 | [15] | [1, 15] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 103 | `ex8distPerLitre` | ja | Jarak per liter =  | 1リットルあたりの距離 =  | [] | [1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx) | 102 | `ex8find` | ja | Jarak per liter bensin | 1リットルあたりの走行距離 | [] | [1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianPecahanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianPecahanPage.tsx) | 119 | `conclusionBody` | ja | Pembagian pecahan adalah perkalian yang tersamarkan! Cukup ingat KCF: Keep, Change, Flip — jaga pecahan pertama, ubah operasi menjadi kali, balik pecahan kedua. Dengan trik ini, tidak ada soal pembagian pecahan yang tidak bisa kamu selesaikan! | 分数の割り算は変装した掛け算です！KCF：Keep, Change, Flip — 最初の分数を保持、演算を掛け算に変える、2つ目の分数を逆にする。このコツで、どんな分数の割り算の問題も解けます！ | [1] | [2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianPecahanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianPecahanPage.tsx) | 47 | `ex3Q` | ja | Untuk memperindah tampilan pada baju yang dirancangnya, seorang penjahit memasang pita pada bagian baju. Jika tersedia 1 gulung pita yang panjangnya 5 meter, dan setiap baju membutuhkan \frac{5}{8} meter pita, berapa banyak baju yang dapat dipasangi pita? | 洋服を飾るためにリボンをつける。5 メートルのリボンが 1 巻あり、各洋服に \frac{5}{8} メートルのリボンが必要です。何着の洋服を飾れますか？ | [1, 5, 5, 8] | [5, 1, 5, 8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianPecahanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianPecahanPage.tsx) | 49 | `ex3s1b` | ja | Banyak baju = panjang total : panjang per baju | 洋服の数 = 全長 ÷ 1着あたりの長さ | [] | [1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 45 | `ex1Q` | en | Bulatkan 4,638 sampai satu desimal | Round 4,638 to one decimal place | [4.638] | [4638] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 47 | `ex1s1desc` | en | 4,\underline{6}38 - Angka 6 adalah desimal ke-1 (yang akan dipertahankan) | 4,\underline{6}38 — digit 6 is the 1st decimal (the one to keep) | [4.638, 6, 1] | [4638, 6, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 100 | `ex6Q` | en | Bulatkan 319,837 ke bilangan satuan terdekat | Round 319,837 to the nearest whole number | [319.837] | [319837] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 102 | `ex6s1desc` | en | 31\underline{9},837 - Satuan = 9, Persepuluhan = 8 | 31\underline{9},837 — ones digit = 9, tenths digit = 8 | [319.837, 9, 8] | [319837, 9, 8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 134 | `ex8Q` | en | Seorang atlet berlari sejauh 10,473 km dalam latihan maraton. Untuk catatan pribadi, ia ingin membulatkan jarak tersebut ke dua desimal. Berapa jarak yang dicatat? | An athlete ran 10,473 km in marathon training. For personal records, they want to round the distance to two decimal places. What distance is recorded? | [10.473] | [10473] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 136 | `ex8s1desc` | en | 10,4\underline{7}3 km - Angka 7 adalah desimal ke-2 | 10,4\underline{7}3 km — digit 7 is the 2nd decimal | [10.473, 7, 2] | [10473, 7, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 152 | `ex9ans` | en | Massa dalam laporan = 2,996 gram | Mass in the report = 2,996 grams | [2.996] | [2996] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 151 | `ex9s4desc` | en | 2,995 \rightarrow 2,996 gram | 2,995 \rightarrow 2,996 grams | [2.995, 2.996] | [2995, 2996] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 45 | `ex1Q` | ja | Bulatkan 4,638 sampai satu desimal | 4,638 を小数第1位まで四捨五入せよ | [4.638, 1] | [4638, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 47 | `ex1s1desc` | ja | 4,\underline{6}38 - Angka 6 adalah desimal ke-1 (yang akan dipertahankan) | 4,\underline{6}38 — 6が小数1桁目（保持する桁） | [4.638, 6, 1] | [4638, 6, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 100 | `ex6Q` | ja | Bulatkan 319,837 ke bilangan satuan terdekat | 319,837 を最も近い整数に四捨五入せよ | [319.837] | [319837] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 102 | `ex6s1desc` | ja | 31\underline{9},837 - Satuan = 9, Persepuluhan = 8 | 31\underline{9},837 — 一の位 = 9、十分の一の位 = 8 | [319.837, 9, 8] | [319837, 9, 8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 134 | `ex8Q` | ja | Seorang atlet berlari sejauh 10,473 km dalam latihan maraton. Untuk catatan pribadi, ia ingin membulatkan jarak tersebut ke dua desimal. Berapa jarak yang dicatat? | あるアスリートがマラソントレーニングで 10,473 km走りました。個人記録として小数第2位に四捨五入した距離を記録したい。記録される距離は？ | [10.473, 2] | [10473, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 136 | `ex8s1desc` | ja | 10,4\underline{7}3 km - Angka 7 adalah desimal ke-2 | 10,4\underline{7}3 km — 7が小数2桁目 | [10.473, 7, 2] | [10473, 7, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 152 | `ex9ans` | ja | Massa dalam laporan = 2,996 gram | レポートに書く質量 = 2,996 グラム | [2.996] | [2996] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx) | 151 | `ex9s4desc` | ja | 2,995 \rightarrow 2,996 gram | 2,995 \rightarrow 2,996 グラム | [2.995, 2.996] | [2995, 2996] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 52 | `s1e2Q` | en | Tentukan hasil penjumlahan 9{,}754 + 52{,}18 | Find the sum of 9{,}754 + 52{,}18 | [9.754, 52.18] | [9754, 52.18] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 56 | `s1e2ans` | en | ∴ Jadi, hasil penjumlahannya adalah 61{,}934 | ∴ Therefore, the sum is 61{,}934 | [61.934] | [61934] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 53 | `s1e2s1` | en | Langkah 1: 52{,}18 punya 2 digit desimal, 9{,}754 punya 3 digit. Tambah 1 nol pada 52{,}18 → 52{,}180 | Step 1: 52{,}18 has 2 decimal digits, 9{,}754 has 3. Add 1 zero to 52{,}18 → 52{,}180 | [1, 52.18, 2, 9.754, 3, 1, 52.18, 52.18] | [1, 52.18, 2, 9754, 3, 1, 52.18, 52180] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 57 | `s1e3Q` | en | Sebuah proyek jalan membutuhkan 3 gulungan kawat. Gulungan pertama sepanjang 934{,}456 m, gulungan kedua sepanjang 70{,}806 m, dan gulungan ketiga sepanjang 8{,}34 m. Berapa meter total panjang kawat yang dibutuhkan? | A road project needs 3 rolls of wire. The first roll is 934{,}456 m long, the second is 70{,}806 m long, and the third is 8{,}34 m long. What is the total length of wire needed? | [3, 934.456, 70.806, 8.34] | [3, 934456, 70806, 8.34] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 62 | `s1e3ans` | en | ∴ Jadi, total panjang kawat yang dibutuhkan adalah 1013{,}602 m | ∴ Therefore, the total length of wire needed is 1013{,}602 m | [1013.602] | [1013602] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 59 | `s1e3katex1` | en | \text{Total} = 934{,}456 + 70{,}806 + 8{,}34 | \text{Total} = 934{,}456 + 70{,}806 + 8{,}34 | [934.456, 70.806, 8.34] | [934456, 70806, 8.34] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 60 | `s1e3s2` | en | Langkah 2: Samakan digit desimal — 8{,}34 menjadi 8{,}340 | Step 2: Equalize decimal digits — 8{,}34 becomes 8{,}340 | [2, 8.34, 8.34] | [2, 8.34, 8340] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 76 | `s2e2Q` | en | Kurangkan 84{,}937 dari 725{,}46 | Subtract 84{,}937 from 725{,}46 | [84.937, 725.46] | [84937, 725.46] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 79 | `s2e2ans` | en | ∴ Jadi, hasilnya adalah 640{,}523 | ∴ Therefore, the result is 640{,}523 | [640.523] | [640523] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 77 | `s2e2note` | en | Perhatian: "Kurangkan A dari B" artinya B - A, jadi soalnya: 725{,}46 - 84{,}937 | Note: "Subtract A from B" means B - A, so the problem is: 725{,}46 - 84{,}937 | [725.46, 84.937] | [725.46, 84937] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 78 | `s2e2s1` | en | Langkah 1: Samakan digit desimal — 725{,}46 menjadi 725{,}460 | Step 1: Equalize decimal digits — 725{,}46 becomes 725{,}460 | [1, 725.46, 725.46] | [1, 725.46, 725460] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 80 | `s2e3Q` | en | Kurangkan 89{,}276 dari 467{,}8. Kemudian kurangkan lagi hasilnya dengan 120{,}05. Berapa hasil akhirnya? | Subtract 89{,}276 from 467{,}8. Then subtract the result by 120{,}05. What is the final answer? | [89.276, 467.8, 120.05] | [89276, 467.8, 120.05] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 84 | `s2e3ans` | en | ∴ Jadi, hasil akhirnya adalah 258{,}474 | ∴ Therefore, the final result is 258{,}474 | [258.474] | [258474] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 81 | `s2e3s1` | en | Langkah 1: Operasi pertama — 467{,}8 - 89{,}276 | Step 1: First operation — 467{,}8 - 89{,}276 | [1, 467.8, 89.276] | [1, 467.8, 89276] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 82 | `s2e3s1b` | en | Samakan digit desimal: 467{,}8 → 467{,}800 | Equalize decimal digits: 467{,}8 → 467{,}800 | [467.8, 467.8] | [467.8, 467800] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 83 | `s2e3s2` | en | Langkah 2: Operasi kedua — 378{,}524 - 120{,}050 | Step 2: Second operation — 378{,}524 - 120{,}050 | [2, 378.524, 120.05] | [2, 378524, 120050] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 93 | `s3e2Q` | en | Hitunglah 45{,}72 - 18{,}5 + 9{,}384 - 6{,}2 | Calculate 45{,}72 - 18{,}5 + 9{,}384 - 6{,}2 | [45.72, 18.5, 9.384, 6.2] | [45.72, 18.5, 9384, 6.2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 99 | `s3e2ans` | en | ∴ Jadi, hasilnya adalah 30{,}404 | ∴ Therefore, the result is 30{,}404 | [30.404] | [30404] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 26 | `sec0Caption` | en | Contoh Ilustrasi: 934{,}456 + 70{,}806 | Illustration: 934{,}456 + 70{,}806 | [934.456, 70.806] | [934456, 70806] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 72 | `sec2Tip` | en | Tips: Kalau bilangan yang dikurangi adalah bilangan bulat (contoh: 467,8 dikurangi sesuatu), kamu bisa tulis bilangan itu dengan nol di belakang koma sesuai kebutuhan. Misal 467{,}8 bisa ditulis 467{,}800 agar punya 3 digit desimal. | Tip: If the minuend has fewer decimal places (e.g., 467.8 being subtracted), write it with trailing zeros as needed. For example 467{,}8 can be written as 467{,}800 to have 3 decimal digits. | [467.8, 467.8, 467.8, 3] | [467.8, 467.8, 467800, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 123 | `conclusionBody` | ja | Penjumlahan dan pengurangan desimal sangat mirip dengan bilangan bulat — bedanya hanya pada posisi koma yang harus disejajarkan. Ingat satu aturan emas: koma di bawah koma, kolom per kolom, nol sebagai placeholder. Dengan disiplin dalam menyejajarkan koma, kamu tidak akan pernah salah! | 小数の加法と減法は整数の計算とよく似ています — 違いは小数点を揃えることだけです。黄金ルールを覚えましょう：小数点の下に小数点、列ごとに計算、0でプレースホルダー。小数点を揃える習慣をつければ、絶対に間違えません！ | [1] | [0] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 48 | `s1e1s1` | ja | Langkah 1: Samakan digit desimal — 14{,}7 menjadi 14{,}70 (tambah 1 nol) | 手順1：小数の桁数を揃える — 14{,}7 を 14{,}70 にする（0を1つ補う） | [1, 14.7, 14.7, 1] | [1, 14.7, 14.7, 0, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 52 | `s1e2Q` | ja | Tentukan hasil penjumlahan 9{,}754 + 52{,}18 | 9{,}754 + 52{,}18 の答えを求めなさい | [9.754, 52.18] | [9754, 52.18] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 56 | `s1e2ans` | ja | ∴ Jadi, hasil penjumlahannya adalah 61{,}934 | ∴ よって、答えは 61{,}934 | [61.934] | [61934] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 53 | `s1e2s1` | ja | Langkah 1: 52{,}18 punya 2 digit desimal, 9{,}754 punya 3 digit. Tambah 1 nol pada 52{,}18 → 52{,}180 | 手順1：52{,}18 は小数2桁、9{,}754 は3桁。52{,}18 に0を1つ補う → 52{,}180 | [1, 52.18, 2, 9.754, 3, 1, 52.18, 52.18] | [1, 52.18, 2, 9754, 3, 52.18, 0, 1, 52180] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 57 | `s1e3Q` | ja | Sebuah proyek jalan membutuhkan 3 gulungan kawat. Gulungan pertama sepanjang 934{,}456 m, gulungan kedua sepanjang 70{,}806 m, dan gulungan ketiga sepanjang 8{,}34 m. Berapa meter total panjang kawat yang dibutuhkan? | 道路工事に針金が3巻き必要です。1巻き目は 934{,}456 m、2巻き目は 70{,}806 m、3巻き目は 8{,}34 m です。針金の合計の長さは何mですか？ | [3, 1, 934.456, 2, 70.806, 3, 8.34] | [3, 1, 934456, 2, 70806, 3, 8.34] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 62 | `s1e3ans` | ja | ∴ Jadi, total panjang kawat yang dibutuhkan adalah 1013{,}602 m | ∴ よって、必要な針金の合計の長さは 1013{,}602 m | [1013.602] | [1013602] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 59 | `s1e3katex1` | ja | \text{Total} = 934{,}456 + 70{,}806 + 8{,}34 | \text{合計} = 934{,}456 + 70{,}806 + 8{,}34 | [934.456, 70.806, 8.34] | [934456, 70806, 8.34] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 60 | `s1e3s2` | ja | Langkah 2: Samakan digit desimal — 8{,}34 menjadi 8{,}340 | 手順2：小数の桁数を揃える — 8{,}34 を 8{,}340 にする | [2, 8.34, 8.34] | [2, 8.34, 8340] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 76 | `s2e2Q` | ja | Kurangkan 84{,}937 dari 725{,}46 | 725{,}46 から 84{,}937 を引きなさい | [84.937, 725.46] | [725.46, 84937] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 79 | `s2e2ans` | ja | ∴ Jadi, hasilnya adalah 640{,}523 | ∴ よって、答えは 640{,}523 | [640.523] | [640523] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 77 | `s2e2note` | ja | Perhatian: "Kurangkan A dari B" artinya B - A, jadi soalnya: 725{,}46 - 84{,}937 | 注意：「AからBを引く」は A - B を意味するので、計算は 725{,}46 - 84{,}937 | [725.46, 84.937] | [725.46, 84937] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 78 | `s2e2s1` | ja | Langkah 1: Samakan digit desimal — 725{,}46 menjadi 725{,}460 | 手順1：小数の桁数を揃える — 725{,}46 を 725{,}460 にする | [1, 725.46, 725.46] | [1, 725.46, 725460] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 80 | `s2e3Q` | ja | Kurangkan 89{,}276 dari 467{,}8. Kemudian kurangkan lagi hasilnya dengan 120{,}05. Berapa hasil akhirnya? | 467{,}8 から 89{,}276 を引き、さらにその結果から 120{,}05 を引きなさい。最終的な答えは何ですか？ | [89.276, 467.8, 120.05] | [467.8, 89276, 120.05] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 84 | `s2e3ans` | ja | ∴ Jadi, hasil akhirnya adalah 258{,}474 | ∴ よって、最終的な答えは 258{,}474 | [258.474] | [258474] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 81 | `s2e3s1` | ja | Langkah 1: Operasi pertama — 467{,}8 - 89{,}276 | 手順1：1回目の計算 — 467{,}8 - 89{,}276 | [1, 1, 467.8, 89.276] | [1, 1, 467.8, 89276] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 82 | `s2e3s1b` | ja | Samakan digit desimal: 467{,}8 → 467{,}800 | 小数の桁数を揃える：467{,}8 → 467{,}800 | [467.8, 467.8] | [467.8, 467800] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 83 | `s2e3s2` | ja | Langkah 2: Operasi kedua — 378{,}524 - 120{,}050 | 手順2：2回目の計算 — 378{,}524 - 120{,}050 | [2, 2, 378.524, 120.05] | [2, 2, 378524, 120050] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 93 | `s3e2Q` | ja | Hitunglah 45{,}72 - 18{,}5 + 9{,}384 - 6{,}2 | 45{,}72 - 18{,}5 + 9{,}384 - 6{,}2 を計算しなさい | [45.72, 18.5, 9.384, 6.2] | [45.72, 18.5, 9384, 6.2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 99 | `s3e2ans` | ja | ∴ Jadi, hasilnya adalah 30{,}404 | ∴ よって、答えは 30{,}404 | [30.404] | [30404] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 26 | `sec0Caption` | ja | Contoh Ilustrasi: 934{,}456 + 70{,}806 | 計算例：934{,}456 + 70{,}806 | [934.456, 70.806] | [934456, 70806] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 39 | `sec1Summary` | ja | Menjumlahkan bilangan desimal itu semudah menjumlahkan bilangan bulat — triknya cuma satu: pastikan tanda koma selalu sejajar secara vertikal. Dengan begitu, angka persepuluhan ketemu persepuluhan, perseratusan ketemu perseratusan, dan seterusnya. Kalau jumlah digit di belakang koma berbeda, tinggal tambahkan nol agar sama panjang. | 小数の加法は整数の加法と同じくらい簡単です。コツはただ一つ：小数点を常に縦に揃えること。そうすれば、十分の一の位どうし、百分の一の位どうしが揃います。小数の桁数が違う場合は、0を補って桁数を合わせましょう。 | [1] | [0] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 64 | `sec2Summary` | ja | Pengurangan desimal prinsipnya sama persis dengan penjumlahan: jajarkan koma, samakan panjang digit desimal dengan menambahkan nol. Bedanya, saat kamu mengurangkan kolom dan angka atas lebih kecil dari angka bawah, kamu perlu meminjam 1 nilai dari kolom sebelah kiri (persis seperti pengurangan bilangan bulat biasa). | 小数の減法の原理は加法と全く同じです：小数点を揃えて、0を補って桁数を揃えましょう。違いは、上の数が下の数より小さいとき、左の列から1借りる必要があることです（整数の引き算と全く同じです）。 | [1] | [0, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx) | 72 | `sec2Tip` | ja | Tips: Kalau bilangan yang dikurangi adalah bilangan bulat (contoh: 467,8 dikurangi sesuatu), kamu bisa tulis bilangan itu dengan nol di belakang koma sesuai kebutuhan. Misal 467{,}8 bisa ditulis 467{,}800 agar punya 3 digit desimal. | ヒント：引かれる数の小数桁数が少ない場合（例：467.8から引く）、必要に応じて0を補って書けます。例えば 467{,}8 を 467{,}800 と書いて小数3桁にできます。 | [467.8, 467.8, 467.8, 3] | [467.8, 0, 467.8, 467800, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganPage.tsx) | 105 | `ex9katex4` | en | = \frac{13}{30} \times 840.000 = \text{Rp}364.000 | = \frac{13}{30} \times 840{,}000 = \$364{,}000 | [13, 30, 840000, 0] | [13, 30, 840000, 364000] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganPage.tsx) | 99 | `ex9Q` | ja | Seseorang mendapat upah Rp840.000 sebulan. Seperenam dari upah digunakan untuk sewa rumah, \frac{2}{5} bagian untuk kebutuhan makan. Berapa rupiah yang digunakan untuk keperluan lain? | ある人の月収は$840,000です。6分の1を家賃、\frac{2}{5} を食費に使います。その他の費用はいくらですか？ | [840000, 2, 5] | [840000, 6, 1, 2, 5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganPage.tsx) | 105 | `ex9katex4` | ja | = \frac{13}{30} \times 840.000 = \text{Rp}364.000 | = \frac{13}{30} \times 840{,}000 = \$364{,}000 | [13, 30, 840000, 0] | [13, 30, 840000, 364000] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 43 | `ex3Q` | en | Hitunglah hasil perkalian 8,6543 \times 100.000 | Calculate 8,6543 \times 100.000 | [8.6543, 100000] | [8.6543, 100] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 81 | `ex6Q` | en | Hitunglah hasil perkalian 3,67 \times 4,258 | Calculate 3,67 \times 4,258 | [3.67, 4.258] | [3.67, 4258] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 100 | `ex7katex1` | en | \text{Harga total} = 15.500 \times 2,5 | \text{Total price} = 15.500 \times 2,5 | [15500, 2.5] | [15.5, 2.5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 43 | `ex3Q` | ja | Hitunglah hasil perkalian 8,6543 \times 100.000 | 計算せよ 8,6543 \times 100.000 | [8.6543, 100000] | [8.6543, 100] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 46 | `ex3s2desc` | ja | Kita perlu menambah 1 angka nol di belakang: 8,65430 | 後ろに0を1つ追加する必要があります：8,65430 | [1, 8.6543] | [0, 1, 8.6543] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 81 | `ex6Q` | ja | Hitunglah hasil perkalian 3,67 \times 4,258 | 計算せよ 3,67 \times 4,258 | [3.67, 4.258] | [3.67, 4258] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 98 | `ex7Q` | ja | Sebuah toko menjual apel seharga Rp15.500 per kg. Berapakah harga yang harus dibayar jika membeli 2,5 kg apel? | あるお店でリンゴが1 kgあたり$15,500で売られています。2.5 kgのリンゴを買うといくらになりますか？ | [15500, 2.5] | [1, 15500, 2.5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 100 | `ex7katex1` | ja | \text{Harga total} = 15.500 \times 2,5 | \text{合計金額} = 15.500 \times 2,5 | [15500, 2.5] | [15.5, 2.5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 108 | `ex8Q` | ja | Sebuah mobil mengonsumsi bensin 8,5 liter untuk menempuh jarak 100 km. Jika harga bensin Rp12.650 per liter, berapa biaya bensin untuk perjalanan sejauh 350 km? | ある車は100 kmを走るのに8.5リットルのガソリンを消費します。ガソリンが1リットル$12,650の場合、350 kmの旅行のガソリン代はいくらですか？ | [8.5, 100, 12650, 350] | [100, 8.5, 1, 12650, 350] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx) | 119 | `ex9Q` | ja | Pak Ahmad memiliki sebidang tanah berbentuk persegi panjang dengan panjang 12,75 m dan lebar 8,4 m. Ia ingin memasang keramik dengan ukuran 0,3 m × 0,3 m. Jika harga keramik Rp25.000 per buah, berapa total biaya yang dibutuhkan untuk membeli keramik? | アフマドさんは縦12.75 m、横8.4 mの長方形の土地を持っています。0.3 m × 0.3 mのタイルを敷こうとしています。タイルが1枚$25,000の場合、タイルの購入総費用はいくらですか？ | [12.75, 8.4, 0.3, 0.3, 25000] | [12.75, 8.4, 0.3, 0.3, 1, 25000] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/HubunganDuaGarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/HubunganDuaGarisPage.tsx) | 72 | `ex3n1` | ja | Segitiga PBQ siku-siku di B (karena AB ⊥ h dan AB = 8 = jarak antar garis): | 三角形PBQはBで直角（AB⊥h、AB=8=2直線間の距離）： | [8] | [8, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/HubunganDuaGarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/HubunganDuaGarisPage.tsx) | 37 | `s2defTxt` | ja | Dua garis berpotongan jika keduanya memiliki tepat satu titik persekutuan (titik potong). | 2直線がちょうど1つの共有点（交点）をもつとき、その2直線は交わるといいます。 | [2, 2, 1] | [2, 1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx) | 26 | `grid4` | en | 🔷 Segi 4 (n=4): | 🔷 Quadrilateral (n=4): | [4, 4] | [4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx) | 27 | `grid5` | en | ⭐ Segi 5 (n=5): | ⭐ Pentagon (n=5): | [5, 5] | [5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx) | 28 | `grid6` | en | 🟢 Segi 6 (n=6): | 🟢 Hexagon (n=6): | [6, 6] | [6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx) | 65 | `s2p1b` | en | dengan menghubungkan dua sudut yang tidak berdekatan (menarik diagonal). Jumlah sudutnya pun menjadi 2 kali jumlah sudut segitiga! | by drawing a diagonal. So its angle sum is twice that of a triangle! | [2] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx) | 39 | `svgSegi6label` | en | Segi 6 | Hexagon | [6] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx) | 26 | `grid4` | ja | 🔷 Segi 4 (n=4): | 🔷 四角形（n=4）： | [4, 4] | [4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx) | 27 | `grid5` | ja | ⭐ Segi 5 (n=5): | ⭐ 五角形（n=5）： | [5, 5] | [5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx) | 28 | `grid6` | ja | 🟢 Segi 6 (n=6): | 🟢 六角形（n=6）： | [6, 6] | [6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx) | 96 | `s4how3` | ja | 3. Kalikan dengan | 3. 180°をかける | [3] | [3, 180] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx) | 39 | `svgSegi6label` | ja | Segi 6 | 六角形 | [6] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SifatSudutDuaGarisSejajarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SifatSudutDuaGarisSejajarPage.tsx) | 102 | `s5bold3` | ja | saling berpelurus | 補角（和が180°） | [] | [180] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SudutPelurusPenyikuBertolakPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SudutPelurusPenyikuBertolakPage.tsx) | 69 | `ex2b` | ja | b) Besar | b) ∠1と∠2の大きさ | [] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SudutPelurusPenyikuBertolakPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SudutPelurusPenyikuBertolakPage.tsx) | 34 | `s1bold` | ja | daerah yang terbentuk di antara dua sinar garis yang bertemu di satu titik pangkal | 1点から出る2本の直線の間にできる領域 | [2, 1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SudutPelurusPenyikuBertolakPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SudutPelurusPenyikuBertolakPage.tsx) | 33 | `s1p1` | ja | Coba bayangkan dua sinar cahaya yang keluar dari satu titik lampu — sudut adalah | 1つの光源から出る2本の光線を想像してください — 角とは | [2, 1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SudutPelurusPenyikuBertolakPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SudutPelurusPenyikuBertolakPage.tsx) | 57 | `s4p2` | ja | Jika sebuah garis membagi pojok itu, dua sudut kecil yang terbentuk adalah pasangan | を形成します。その角を1本の直線で分けると、できる2つの小さな角が | [2] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPDPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPDPage.tsx) | 46 | `c1_problem` | ja | Dua lingkaran berjari-jari 9 cm dan 6 cm, berjarak pusat 25 cm. Hitung panjang GSPD! | 半径9 cmと6 cmの2つの円の中心間距離が25 cmです。内接共通接線の長さを求めなさい！ | [2, 9, 6, 25] | [9, 6, 2, 25] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPDPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPDPage.tsx) | 52 | `c3_problem` | ja | Dua lingkaran berjari-jari R = 10 cm dan r = 6 cm. Panjang GSPL = 4√21 cm. Tentukan panjang GSPD! | 半径R = 10 cm、r = 6 cmの2つの円があります。外接共通接線の長さ = 4√21 cm。内接共通接線の長さを求めなさい！ | [2, 10, 6, 4, 21] | [10, 6, 2, 4, 21] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPLPage.tsx) | 56 | `c1_problem` | ja | Dua lingkaran berjari-jari 10 cm dan 4 cm. Jarak antara kedua pusatnya adalah 17 cm. Hitung panjang GSPL! | 半径10 cmと4 cmの2つの円があり、中心間の距離は17 cmです。外接共通接線の長さを求めなさい！ | [2, 10, 4, 17] | [10, 4, 2, 17] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPLPage.tsx) | 60 | `c2_problem` | ja | Dua lingkaran berjari-jari 8 cm dan 3 cm memiliki GSPL sepanjang 12 cm. Tentukan jarak antara kedua pusat lingkaran! | 半径8 cmと3 cmの2つの円の外接共通接線の長さが12 cmです。2つの中心間の距離を求めなさい！ | [2, 8, 3, 12, 2] | [8, 3, 2, 12, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPLPage.tsx) | 30 | `intro_tip2` | ja | relatif terhadap garis singgung. Pada umumnya terdapat | に位置します。重なり合わない2円には通常 | [] | [2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/PengertianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/PengertianPage.tsx) | 17 | `sec_intro` | ja | 🌟 Garis yang Hanya Menyentuh Sekali | 🌟 1点だけ触れる直線 | [] | [1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx) | 61 | `c2_step1` | en | Tiga silinder bersentuhan: jarak pusat ke pusat = d = 2r = 28 cm. Ada 2 celah, jadi total segmen lurus = 4 × 28 cm. Busur total: setiap silinder di ujung = setengah lingkaran, silinder tengah = 1 lingkaran penuh. Total busur = 2 × setengah + 1 = 2 lingkaran penuh. | Three touching cylinders: center-to-center distance = d = 2r = 28 cm. 2 gaps, so total straight = 4 × 28 cm. Total arcs: end cylinders = semicircle each, middle cylinder = full circle. Total arcs = 2 full circles. | [28, 2, 4, 28, 1, 2, 1, 2] | [3, 28, 2, 4, 28, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx) | 57 | `c1_problem` | ja | Sebuah mesin memiliki dua roda silinder berjari-jari 7 cm yang berjarak pusat 30 cm. Tentukan panjang sabuk minimal yang diperlukan! (Gunakan π = 22/7) | ある機械に半径7 cmの2つの円筒形の車輪があり、中心間距離が30 cmです。必要な最小ベルト長を求めなさい！（π = 22/7を使用） | [2, 7, 30, 22, 7] | [7, 2, 30, 22, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx) | 60 | `c2_problem` | ja | Tiga silinder berjari-jari 14 cm disusun berjajar dan diikat sabuk keliling. Tentukan panjang sabuk minimal! (π = 22/7) | 半径14 cmの3つの円柱が一列に並びベルトで囲まれています。最小ベルト長を求めなさい！（π = 22/7） | [3, 14, 22, 7] | [14, 3, 22, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx) | 61 | `c2_step1` | ja | Tiga silinder bersentuhan: jarak pusat ke pusat = d = 2r = 28 cm. Ada 2 celah, jadi total segmen lurus = 4 × 28 cm. Busur total: setiap silinder di ujung = setengah lingkaran, silinder tengah = 1 lingkaran penuh. Total busur = 2 × setengah + 1 = 2 lingkaran penuh. | 3つの接触円柱：中心間距離 = d = 2r = 28 cm。2つのすき間があるので直線合計 = 4 × 28 cm。弧合計：両端 = 半円ずつ、真ん中 = 全円。合計 = 2全円。 | [28, 2, 4, 28, 1, 2, 1, 2] | [3, 28, 2, 4, 28, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/DiagramVennPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/DiagramVennPage.tsx) | 118 | `s3e2multOf4` | ja | Kelipatan 4 dari 1–20: | 1〜20の4の倍数： | [4, 1, 20] | [1, 20, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/DiagramVennPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/DiagramVennPage.tsx) | 119 | `s3e2multOf6` | ja | Kelipatan 6 dari 1–20: | 1〜20の6の倍数： | [6, 1, 20] | [1, 20, 6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/DiagramVennPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/DiagramVennPage.tsx) | 149 | `s4e2multOf3` | ja | Kelipatan 3 dari 1–15: | 1〜15の3の倍数： | [3, 1, 15] | [1, 15, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/DiagramVennPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/DiagramVennPage.tsx) | 149 | `s4e2multOf5` | ja | Kelipatan 5 dari 1–15: | 1〜15の5の倍数： | [5, 1, 15] | [1, 15, 5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/DiagramVennPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/DiagramVennPage.tsx) | 136 | `s4tip` | ja | 💡 Tips: A − B ≠ B − A! Selisih tidak komutatif. Perhatikan urutan — himpunan pertama adalah "induk", himpunan kedua adalah "yang dikurangi". | 💡 コツ：A − B ≠ B − A！差集合は可換ではありません。順序が重要です — 最初の集合が「ベース」、2番目が「引くもの」です。 | [1] | [2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 116 | `s2e2qMembers` | en | Anggota Q: {2, 3, 5, 7, 11, 13, 17, 19} → n(Q) = 8. | Members of Q: {2,3,5,7,11,13,17,19} → n(Q) = 8. | [2, 3, 5, 7, 11, 13, 17, 19, 8] | [2357111317.19, 8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 152 | `s3e1cRes` | en | E ⊆ F (2, 4, 6 semuanya ada di F). E ⊂ F (sejati). | E ⊆ F (2,4,6 are all in F). E ⊂ F (proper subset). | [2, 4, 6] | [24.6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 17 | `s3e1opts[]` | en | E = {2, 4, 6} dan F = {1, 2, 3, 4, 5, 6} | E = {2,4,6} and F = {1,2,3,4,5,6} | [2, 4, 6, 1, 2, 3, 4, 5, 6] | [24.6, 12345.6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 160 | `s3e3q` | en | Diberikan himpunan S = {1, 2, 3, 4}. Tentukan: | Given S = {1,2,3,4}. Find: | [1, 2, 3, 4] | [123.4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 180 | `s4e1aAns` | en | S = {1,2,3,...,10} atau S = {bilangan asli ≤ 10}. P adalah himpunan bilangan genap dalam S. | S = {1,2,...,10} or S = {natural numbers ≤ 10}. P is the set of even numbers in S. | [12.3, 10, 10] | [1.2, 10, 10] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 182 | `s4e1cAns` | en | S = {bilangan asli ≤ 25} atau S = {1,4,9,...,625} (semua kuadrat sempurna). Tergantung konteks. | S = {natural numbers ≤ 25} or S = {all perfect squares}. Depends on context. | [25, 14.9, 625] | [25] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 17 | `s4e1opts[]` | en | R = {1, 4, 9, 16, 25} adalah himpunan bilangan kuadrat sempurna | R = {1,4,9,16,25} is the set of perfect squares | [1, 4, 9, 16, 25] | [14916.25] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 82 | `s1e3a` | ja | SALAH. {0} berisi angka nol sebagai anggota, sedangkan ∅ tidak memiliki anggota. {0} ≠ ∅ | 偽。{0}は要素として0を含むが、∅は要素がない。{0} ≠ ∅ | [0, 0] | [0, 0, 0] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 48 | `s1emptyWarnText` | ja | adalah himpunan yang berisi angka nol — ini bukan himpunan kosong! Himpunan kosong benar-benar tidak memiliki anggota apapun. | は数字の0を含む集合で、空集合ではありません！空集合は本当に要素が一つもありません。 | [] | [0] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 116 | `s2e2qMembers` | ja | Anggota Q: {2, 3, 5, 7, 11, 13, 17, 19} → n(Q) = 8. | Qの要素：{2,3,5,7,11,13,17,19} → n(Q) = 8。 | [2, 3, 5, 7, 11, 13, 17, 19, 8] | [2357111317.19, 8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 152 | `s3e1cRes` | ja | E ⊆ F (2, 4, 6 semuanya ada di F). E ⊂ F (sejati). | E ⊆ F（2,4,6はすべてFにある）。E ⊂ F（真部分集合）。 | [2, 4, 6] | [24.6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 17 | `s3e1opts[]` | ja | E = {2, 4, 6} dan F = {1, 2, 3, 4, 5, 6} | E = {2,4,6} と F = {1,2,3,4,5,6} | [2, 4, 6, 1, 2, 3, 4, 5, 6] | [24.6, 12345.6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 164 | `s3e3cAns` | ja | Pilih 2 dari 4: C(4,2) = 4!/(2!·2!) = 6 himpunan bagian. | 4つから2つ選ぶ：C(4,2) = 4!/(2!·2!) = 6 個。 | [2, 4, 4.2, 4, 2, 2, 6] | [4, 2, 4.2, 4, 2, 2, 6] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 160 | `s3e3q` | ja | Diberikan himpunan S = {1, 2, 3, 4}. Tentukan: | S = {1,2,3,4} について求めなさい： | [1, 2, 3, 4] | [123.4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 180 | `s4e1aAns` | ja | S = {1,2,3,...,10} atau S = {bilangan asli ≤ 10}. P adalah himpunan bilangan genap dalam S. | S = {1,2,...,10} または S = {10以下の自然数}。PはSの偶数の集合。 | [12.3, 10, 10] | [1.2, 10, 10] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 182 | `s4e1cAns` | ja | S = {bilangan asli ≤ 25} atau S = {1,4,9,...,625} (semua kuadrat sempurna). Tergantung konteks. | S = {25以下の自然数} または S = {すべての完全平方数}。文脈による。 | [25, 14.9, 625] | [25] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 17 | `s4e1opts[]` | ja | R = {1, 4, 9, 16, 25} adalah himpunan bilangan kuadrat sempurna | R = {1,4,9,16,25} は完全平方数の集合 | [1, 4, 9, 16, 25] | [14916.25] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx) | 222 | `s5e2ans` | ja | Ada 10 himpunan bagian yang memiliki tepat 2 anggota. | ちょうど2つの要素を持つ部分集合は10個あります。 | [10, 2] | [2, 10] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/OperasiHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/OperasiHimpunanPage.tsx) | 118 | `s3e2ans3` | en | (P − Q) ∪ (Q − P) = {3, 5, 6, 9, 10, 12} ← Selisih Simetris | (P−Q) ∪ (Q−P) = {3,5,6,9,10,12} ← Symmetric Difference | [3, 5, 6, 9, 10, 12] | [356910.12] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/OperasiHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/OperasiHimpunanPage.tsx) | 81 | `s2e1note` | ja | Hanya 12 yang merupakan kelipatan 3 sekaligus kelipatan 4. | 3の倍数かつ4の倍数は12だけ。 | [12, 3, 4] | [3, 4, 12] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/OperasiHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/OperasiHimpunanPage.tsx) | 75 | `s2e1q` | ja | Diketahui P = {kelipatan 3 dari 1–20} dan Q = {kelipatan 4 dari 1–20}. Tentukan P ∩ Q! | P = {1〜20の3の倍数}、Q = {1〜20の4の倍数}。P ∩ Q を求めなさい！ | [3, 1, 20, 4, 1, 20] | [1, 20, 3, 1, 20, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/OperasiHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/OperasiHimpunanPage.tsx) | 118 | `s3e2ans3` | ja | (P − Q) ∪ (Q − P) = {3, 5, 6, 9, 10, 12} ← Selisih Simetris | (P−Q) ∪ (Q−P) = {3,5,6,9,10,12} ← 対称差 | [3, 5, 6, 9, 10, 12] | [356910.12] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PemecahanMasalahHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PemecahanMasalahHimpunanPage.tsx) | 134 | `s2e3ans` | ja | Ada 14 siswa yang mengikuti ketiga ekskul sekaligus. | 3つの部活すべてに参加する生徒は14人います。 | [14, 3] | [3, 14] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PemecahanMasalahHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PemecahanMasalahHimpunanPage.tsx) | 175 | `s3e3ans` | ja | Ada 60 orang yang hanya menyukai tepat satu warna. | ちょうど1色だけ好きな人は60人です。 | [60, 1] | [1, 60] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PemecahanMasalahHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PemecahanMasalahHimpunanPage.tsx) | 168 | `s3e3q` | ja | Dari 100 orang, setiap orang menyukai setidaknya satu dari tiga warna: Merah (M), Biru (B), Kuning (K). Diketahui: n(M)=60, n(B)=50, n(K)=40, yang menyukai tepat dua warna berjumlah 30, dan yang menyukai ketiga warna berjumlah 10. Berapa yang hanya menyukai satu warna? | 100人全員が3色のうち少なくとも1色が好き：赤(M)、青(B)、黄(K)。n(M)=60, n(B)=50, n(K)=40、ちょうど2色好き：30人、3色すべて好き：10人。ちょうど1色だけ好きな人は何人ですか？ | [100, 1, 3, 60, 50, 40, 2, 30, 3, 10, 1] | [100, 3, 1, 60, 50, 40, 2, 30, 3, 10, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PengertianKeanggotaanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PengertianKeanggotaanPage.tsx) | 33 | `introFactEnd` | en | pada tahun 1870-an. Ia dianggap sebagai "Bapak Teori Himpunan" modern! | in the 1870s. He is considered the "Father of Modern Set Theory"! | [1870] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PengertianKeanggotaanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PengertianKeanggotaanPage.tsx) | 141 | `s2e2pattern` | ja | Pola: bilangan kelipatan 3 dari 3 sampai 15 | パターン：3から15までの3の倍数 | [3, 3, 15] | [3, 15, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PengertianKeanggotaanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PengertianKeanggotaanPage.tsx) | 143 | `s2e2wordsText` | ja | "Himpunan bilangan kelipatan 3 yang kurang dari atau sama dengan 15" | 「15以下の3の倍数の集合」 | [3, 15] | [15, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PengertianKeanggotaanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PengertianKeanggotaanPage.tsx) | 232 | `s4e1a` | ja | Hari dalam seminggu: Senin, Selasa, Rabu, Kamis, Jumat, Sabtu, Minggu → ada 7 hari. | 1週間の日：月、火、水、木、金、土、日 → 7日。 | [7] | [1, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PengertianKeanggotaanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PengertianKeanggotaanPage.tsx) | 254 | `s4e3bTitle` | ja | b. Kelipatan 7 yang lebih dari 0: | b. 0より大きい7の倍数： | [7, 0] | [0, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PengertianKeanggotaanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PengertianKeanggotaanPage.tsx) | 222 | `s4emptyWarnText` | ja | BUKAN himpunan kosong! Ia punya anggota: angka 0. | は空集合ではありません！要素が1つあります：数字の0。 | [0] | [1, 0] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 99 | `k3_s3_adj_angles` | en | (sudut-sudut berdekatan) | (adjacent angles supplement to 180°) | [] | [180] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 178 | `c4_q` | ja | Dua persegi kongruen masing-masing memiliki panjang sisi | 合同な2つの正方形は、それぞれ1辺の長さが | [2] | [2, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 62 | `k2_ara` | ja | ③ Syarat ARA / AAR / RAA — Sudut-Sisi-Sudut / Sudut-Sudut-Sisi / Sisi-Sudut-Sudut | ③ 条件ASA / AAS / SAA — 2角夾辺 / 2角1辺 | [] | [2, 2, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 51 | `k2_p1` | ja | Untuk membuktikan dua segitiga kongruen, cukup tunjukkan | 2つの三角形の合同を証明するには、次の4つの条件の | [2] | [2, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 53 | `k2_p1c` | ja | dari 4 syarat berikut: | を示せば十分です： | [4] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 57 | `k2_rar` | ja | ② Syarat RAR — Sisi-Sudut-Sisi | ② 条件SAS — 2辺夾角 | [] | [2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 54 | `k2_rrr` | ja | ① Syarat RRR — Sisi-Sisi-Sisi | ① 条件SSS — 3辺相等 | [] | [3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 99 | `k3_s3_adj_angles` | ja | (sudut-sudut berdekatan) | （隣接する角の和 = 180°） | [] | [180] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 99 | `k3_s3_adj_angles` | en | (sudut-sudut berdekatan) | (adjacent angles supplement to 180°) | [] | [180] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 178 | `c4_q` | ja | Dua persegi kongruen masing-masing memiliki panjang sisi | 合同な2つの正方形は、それぞれ1辺の長さが | [2] | [2, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 62 | `k2_ara` | ja | ③ Syarat ARA / AAR / RAA — Sudut-Sisi-Sudut / Sudut-Sudut-Sisi / Sisi-Sudut-Sudut | ③ 条件ASA / AAS / SAA — 2角夾辺 / 2角1辺 | [] | [2, 2, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 51 | `k2_p1` | ja | Untuk membuktikan dua segitiga kongruen, cukup tunjukkan | 2つの三角形の合同を証明するには、次の4つの条件の | [2] | [2, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 53 | `k2_p1c` | ja | dari 4 syarat berikut: | を示せば十分です： | [4] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 57 | `k2_rar` | ja | ② Syarat RAR — Sisi-Sudut-Sisi | ② 条件SAS — 2辺夾角 | [] | [2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 54 | `k2_rrr` | ja | ① Syarat RRR — Sisi-Sisi-Sisi | ① 条件SSS — 3辺相等 | [] | [3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx) | 99 | `k3_s3_adj_angles` | ja | (sudut-sudut berdekatan) | （隣接する角の和 = 180°） | [] | [180] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/PerbandinganRusukSikuSikuPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/PerbandinganRusukSikuSikuPage.tsx) | 35 | `altitudeSquare` | ja | Garis tinggi kuadrat = hasil kali dua proyeksi pada sisi miring | 高さの2乗 = 斜辺上の2つの射影の積 | [2] | [2, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/PerbandinganRusukSikuSikuPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/PerbandinganRusukSikuSikuPage.tsx) | 117 | `conclusionEnd` | ja | satu sama lain, dan dari kesebangunan inilah lahir ketiga rumus perbandingan rusuk. | ができ、そこから辺の比に関する3つの公式が導かれます。 | [1] | [3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/PerbandinganRusukSikuSikuPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/PerbandinganRusukSikuSikuPage.tsx) | 23 | `similarTriangles` | ja | △ABD ~ △CAD ~ △CAB (semuanya saling sebangun!) | △ABD ~ △CAD ~ △CAB（3つの三角形は互いに相似） | [] | [3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/PerbandinganRusukSikuSikuPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/PerbandinganRusukSikuSikuPage.tsx) | 35 | `altitudeSquare` | ja | Garis tinggi kuadrat = hasil kali dua proyeksi pada sisi miring | 高さの2乗 = 斜辺上の2つの射影の積 | [2] | [2, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/PerbandinganRusukSikuSikuPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/PerbandinganRusukSikuSikuPage.tsx) | 117 | `conclusionEnd` | ja | satu sama lain, dan dari kesebangunan inilah lahir ketiga rumus perbandingan rusuk. | ができ、そこから辺の比に関する3つの公式が導かれます。 | [1] | [3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/PerbandinganRusukSikuSikuPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/PerbandinganRusukSikuSikuPage.tsx) | 23 | `similarTriangles` | ja | △ABD ~ △CAD ~ △CAB (semuanya saling sebangun!) | △ABD ~ △CAD ~ △CAB（3つの三角形は互いに相似） | [] | [3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifGarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifGarisPage.tsx) | 90 | `ex3ans` | ja | ✅ A dan B berada di sisi yang | ✅ A と B は直線 3x + 2y − 6 = 0 に対して | [] | [6, 0] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifGarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifGarisPage.tsx) | 92 | `ex3ansSuffix` | ja | terhadap garis 3x + 2y − 6 = 0 | にあります | [6, 0] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikAcuanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikAcuanPage.tsx) | 60 | `ex1dirR` | ja | B berada 4 satuan di | Bは | [4] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikAcuanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikAcuanPage.tsx) | 110 | `kesimpulan` | ja | Posisi relatif digunakan di mana-mana — arahan GPS ('belok kiri 200 m'), sistem koordinat robot, peta militer, hingga spreadsheet. Konsep Δx dan Δy adalah dasar dari semua sistem navigasi modern di bumi! | 相対位置はあらゆる場所で使われます — GPS案内（「200m先を左折」）、ロボット座標系、軍事地図、スプレッドシートまで。ΔxとΔyの概念は地球上のすべての現代ナビゲーションシステムの基礎です！ | [200] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikAcuanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikAcuanPage.tsx) | 78 | `step2note` | ja | 💡 Ini sebenarnya membuat barisan aritmetika 2D: A → B → C dengan selisih (5, −3) di setiap langkah! | 💡 実はこれは2次元の等差数列です：A → B → C で各ステップの差は (5, −3)！ | [5, -3] | [2, 5, -3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikDanGarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikDanGarisPage.tsx) | 98 | `ex1aAtas` | ja | atas | Aの上4単位 | [] | [4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikDanGarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikDanGarisPage.tsx) | 96 | `ex1aDesc1` | ja | B berada 4 satuan di | Bは | [4] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikDanGarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikDanGarisPage.tsx) | 97 | `ex1aKanan` | ja | kanan | Aの右4単位 | [] | [4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikDanGarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikDanGarisPage.tsx) | 114 | `ex3aNote` | ja | 💡 Ini sebenarnya membuat barisan aritmetika 2D: A → B → C dengan selisih (5, −3)! | 💡 実はこれは2次元の等差数列です：A → B → C で各ステップの差は (5, −3)！ | [5, -3] | [2, 5, -3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikDanGarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikDanGarisPage.tsx) | 151 | `ex3bAns` | ja | ✅ A dan B berada di sisi yang | ✅ A と B は直線 3x + 2y − 6 = 0 に対して | [] | [6, 0] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikDanGarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikDanGarisPage.tsx) | 153 | `ex3bAnsSuffix` | ja | terhadap garis 3x + 2y − 6 = 0 | にあります | [6, 0] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/UnsurUnsurCartesiusPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/UnsurUnsurCartesiusPage.tsx) | 83 | `ex2q2` | ja | . Tentukan nilai | が与えられています。点Aがちょうど原点O(0, 0)にある場合、 | [] | [0, 0] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/UnsurUnsurCartesiusPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/UnsurUnsurCartesiusPage.tsx) | 85 | `ex2q4` | ja | agar titik A berada tepat di titik asal O(0, 0)! | の値を求めなさい！ | [0, 0] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/UnsurUnsurCartesiusPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/UnsurUnsurCartesiusPage.tsx) | 122 | `r3isi` | ja | Absis (x) adalah jarak ke sumbu Y, dibaca pertama. Ordinat (y) adalah jarak ke sumbu X, dibaca kedua. Penulisan: P(absis, ordinat). | x座標はy軸までの距離で最初に読む。y座標はx軸までの距離で2番目に読む。書き方：P(x座標, y座標)。 | [1] | [2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx) | 19 | `introP` | ja | Dalam soal matematika, kita sering menemukan gambar bangun datar yang saling bertumpang-tindih atau saling berada di dalam satu sama lain. Bagian yang diarsir adalah daerah yang menjadi fokus pertanyaan — bisa berupa sudut-sudut yang tersisa, gabungan dua bangun, atau daerah yang "dipotong" oleh lingkaran. | 数学の問題では、平面図形が重なり合ったり、入れ子になったりする図をよく見かけます。着色された部分が問題の焦点です — 残った角、2つの図形の合計、または円に「切り取られた」領域です。 | [1] | [2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx) | 118 | `k12Soal` | ja | Pada sebuah persegi dengan sisi 14 cm, dibuat dua buah seperempat lingkaran berhadapan (masing-masing di sudut kanan atas dan sudut kiri bawah) dengan jari-jari 7 cm. Daerah yang diarsir (persegi dikurangi kedua seperempat lingkaran) adalah luas yang dicari. Hitunglah luas daerah arsiran! | 14 cmの正方形の右上と左下の角に半径7 cmの四分の一円が描かれている。着色域（正方形 − 2つの四分の一円）の面積を求めなさい！ | [14, 2, 7] | [14, 7, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx) | 142 | `k15Title` | ja | ✏️ Kasus 15 — Bunga 4 Kelopak dalam Persegi 14 cm (π = 22/7) | ✏️ ケース15 — 14 cm正方形の4枚花びら（π = 22/7） | [15, 4, 14, 22, 7] | [15, 14, 4, 22, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx) | 64 | `k5Title` | ja | ✏️ Kasus 5 — Bintang 4 Titik dari Busur dalam Persegi 14 cm (π = 22/7) | ✏️ ケース5 — 14 cm正方形内の4点星（π = 22/7） | [5, 4, 14, 22, 7] | [5, 14, 4, 22, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx) | 73 | `k6Soal` | ja | Daerah arsiran berbentuk "tiga busur" dalam persegi panjang 28 cm × 14 cm. Satu setengah lingkaran besar (R = 14 cm) berada di atas, lalu dua setengah lingkaran kecil (r = 7 cm) dipotong dari bawahnya. Hitunglah (a) luas arsiran dan (b) keliling arsiran! | 28 cm × 14 cmの長方形内に「三重弧」の着色域がある。大きな半円（R = 14 cm）が上にあり、小さな半円2つ（r = 7 cm）が下から切り取られる。(a) 面積と(b) 周長を求めなさい！ | [3, 28, 14, 14, 7] | [28, 14, 14, 2, 7] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx) | 83 | `k7KnownV` | ja |  r = 10 cm, sudut sektor = 90° = ¼ lingkaran penuh. |  r = 10 cm、扇形の角度 = 90° = 1/4円。 | [10, 90] | [10, 90, 1, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx) | 80 | `k7Title` | ja | ✏️ Kasus 7 — Sektor Siku-Siku (¼ Lingkaran) r = 10 cm (π = 3,14) | ✏️ ケース7 — 直角扇形（1/4円）r = 10 cm（π = 3.14） | [7, 10, 3.14] | [7, 1, 4, 10, 3.14] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/FrekuensiHarapanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/FrekuensiHarapanPage.tsx) | 126 | `penjelasanIlustrasi` | ja | Artinya, diharapkan setiap angka muncul sekitar 10 kali dari 60 lemparan. | つまり、60回の中でそれぞれの目がおよそ10回出ると予想される。 | [10, 60] | [60, 10] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/FrekuensiHarapanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/FrekuensiHarapanPage.tsx) | 165 | `s1kunci` | ja | 🔑 Diharapkan sisi Angka muncul sebanyak 40 kali dari 80 lemparan. | 🔑 80回のうち、表は40回出ると期待される。 | [40, 80] | [80, 40] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/FrekuensiHarapanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/FrekuensiHarapanPage.tsx) | 171 | `s3q` | ja | Dalam sebuah kotak terdapat 5 bola merah, 3 bola biru, dan 2 bola kuning. Sebuah bola diambil secara acak, lalu dikembalikan. Percobaan dilakukan sebanyak 300 kali. Hitunglah frekuensi harapan terambilnya:a. Bola merahb. Bola biruc. Bola yang bukan bola kuning | 箱の中に赤玉5個、青玉3個、黄玉2個が入っている。玉を1個ランダムに取り出し、元に戻す。この試行を300回行う。次の玉が出る期待度数を求めよ：a. 赤玉b. 青玉c. 黄玉ではない玉 | [5, 3, 2, 300] | [5, 3, 2, 1, 300] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/KomplementPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/KomplementPage.tsx) | 192 | `s2q` | ja | Dalam sebuah kotak terdapat 4 bola merah, 5 bola putih, dan 3 bola hitam. Sebuah bola diambil secara acak. Tentukan peluang terambil:a. Bola bukan bola merahb. Bola bukan bola hitam | 箱の中に赤玉4個、白玉5個、黒玉3個が入っている。玉を1個ランダムに取り出す。次の玉が出る確率を求めよ：a. 赤玉ではない玉b. 黒玉ではない玉 | [4, 5, 3] | [4, 5, 3, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/KomplementPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/KomplementPage.tsx) | 206 | `s3step3` | ja | Langkah 3 — Frekuensi harapan bukan 12 dalam 360 lemparan: | ステップ3 — 360回中、合計が12ではない期待度数： | [3, 12, 360] | [3, 360, 12] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangEmpirikPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangEmpirikPage.tsx) | 32 | `breadcrumb` | ja | Kelas 9 · Peluang · Materi Matematika | 9年生 · 確率 · 数学 | [] | [9] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangTeoretikPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangTeoretikPage.tsx) | 31 | `breadcrumb` | ja | Kelas 9 · Peluang · Materi Matematika | 9年生 · 確率 · 数学 | [] | [9] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangTeoretikPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangTeoretikPage.tsx) | 81 | `s2q` | ja | Dari satu set kartu bridge (52 kartu), diambil satu kartu secara acak. Tentukan peluang terambil: a. Kartu As (A) b. Kartu berwarna merah c. Kartu King berwarna hitam | 52枚の標準的なトランプから1枚をランダムに引きます。次の確率を求めなさい： a. エースを引く b. 赤いカードを引く c. 黒のキングを引く | [1, 52] | [52, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangTeoretikPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangTeoretikPage.tsx) | 92 | `s3b` | ja | b. Selisih = 2 (\|dadu1 − dadu2\| = 2): | b. 差 = 2（\|サイコロ1 − サイコロ2\| = 2）： | [2, 2] | [2, 1, 2, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganBertingkatPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganBertingkatPage.tsx) | 55 | `c1Check` | en | Cek: 40.000 + 60.000 + 80.000 = 180.000 ✓ | Check: 40 + 60 + 80 = 180 ✓ | [40000, 60000, 80000, 180000] | [40, 60, 80, 180] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganBertingkatPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganBertingkatPage.tsx) | 82 | `c3Check` | en | Cek selisih: 350.000 − 315.000 = 35.000 ✓ | Check difference: 350 − 315 = 35 ✓ | [350000, 315000, 35000] | [350, 315, 35] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganBertingkatPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganBertingkatPage.tsx) | 55 | `c1Check` | ja | Cek: 40.000 + 60.000 + 80.000 = 180.000 ✓ | 確認：40 + 60 + 80 = 180 ✓ | [40000, 60000, 80000, 180000] | [40, 60, 80, 180] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganBertingkatPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganBertingkatPage.tsx) | 82 | `c3Check` | ja | Cek selisih: 350.000 − 315.000 = 35.000 ✓ | 差の確認：350 − 315 = 35 ✓ | [350000, 315000, 35000] | [350, 315, 35] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganBertingkatPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganBertingkatPage.tsx) | 21 | `introCard2Body` | ja | Samakan nilai B di kedua perbandingan menggunakan KPK, lalu gabungkan menjadi satu rasio A : B : C. | 両方の比における B の値を最小公倍数（LCM）で揃え、A : B : C の1つの比にまとめます。 | [2] | [1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganCampuranPage.tsx) | 47 | `c1Q` | ja | Sebanyak 4 orang penjahit mampu menghasilkan 48 baju dalam waktu 6 hari. Jika jumlah penjahit ditambah menjadi 6 orang dan waktu kerja diperpanjang menjadi 9 hari, berapa baju yang bisa dihasilkan? | 4人の縫製工が6日間で48枚のシャツを作れます。縫製工が6人になり、作業日数が9日間に延びた場合、何枚のシャツが作れますか？ | [4, 48, 6, 6, 9] | [4, 6, 48, 6, 9] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganCampuranPage.tsx) | 51 | `c2Q` | ja | Sebanyak 8 orang pekerja dapat membangun tembok sepanjang 120 meter dalam waktu 10 hari. Jika kontraktor ingin membangun tembok 300 meter dalam waktu 15 hari, berapa pekerja yang dibutuhkan? | 8人の作業員が10日間で120メートルの壁を建設できます。請負業者が15日間で300メートルの壁を建設したい場合、何人の作業員が必要ですか？ | [8, 120, 10, 300, 15] | [8, 10, 120, 15, 300] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganCampuranPage.tsx) | 54 | `c2Result` | ja | Dibutuhkan 14 pekerja ⌈13,3⌉ = 14. | 14人の作業員が必要（切り上げ）。 | [14, 13.3, 14] | [14] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganCampuranPage.tsx) | 56 | `c3Q` | ja | Sebuah pabrik dengan 12 mesin dapat memproduksi 360 unit barang dalam waktu 5 hari. Jika 3 mesin mengalami kerusakan dan tidak bisa dioperasikan, berapa hari yang dibutuhkan untuk tetap menghasilkan 480 unit barang? | 12台の機械がある工場で5日間に360個の製品を作れます。3台が故障して動かせない場合、480個の製品を作るのに何日かかりますか？ | [12, 360, 5, 3, 480] | [12, 5, 360, 3, 480] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganCampuranPage.tsx) | 61 | `c3Result` | ja | Dibutuhkan sekitar 9 hari untuk menghasilkan 480 unit. | 480個を作るには約9日かかります。 | [9, 480] | [480, 9] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganCampuranPage.tsx) | 37 | `formulaNote` | ja | Cara Membaca Rumus: "Satu tim (O pekerja selama T waktu) menghasilkan H hasil." Kedua kondisi dibandingkan menggunakan proporsi. Yang belum diketahui (biasanya ada satu variabel) dicari dengan perkalian silang. | 公式の読み方：「1チーム（O人がT時間働く）がH個の成果を出す。」両方の条件を比率で比較します。未知数（通常1変数）は交差乗算で求めます。 | [1, 2] | [1, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganSenilaiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganSenilaiPage.tsx) | 260 | `c1Math1` | en | 5 \times x = 8 \times 20.000 | 5 \times x = 8 \times 20 | [5, 8, 20000] | [5, 8, 20] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganSenilaiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganSenilaiPage.tsx) | 261 | `c1Math2` | en | 5x = 160.000 \Rightarrow x = 32.000 | 5x = 160 \Rightarrow x = 32 | [160000, 32000] | [160, 32] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganSenilaiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganSenilaiPage.tsx) | 178 | `berbalikDef` | ja | adalah hubungan antara dua variabel di mana jika variabel pertama bertambah, variabel kedua justru berkurang, dan sebaliknya — hasil kali keduanya selalu tetap (konstan). | は2つの変数の関係で、最初の変数が増えると2番目の変数は減り、その逆も然り — 両者の積は常に一定（定数）です。 | [2, 1] | [2, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganSenilaiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganSenilaiPage.tsx) | 213 | `berbalikSectionBody` | ja | Pada perbandingan berbalik nilai, hasil kali kedua besaran selalu konstan. Artinya, saat satu naik dua kali lipat, yang lain turun menjadi setengahnya. | 反比例では、2つの量の積は常に一定です。一方が2倍になると、もう一方は半分になります。 | [2, 1] | [2, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganSenilaiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganSenilaiPage.tsx) | 260 | `c1Math1` | ja | 5 \times x = 8 \times 20.000 | 5 \times x = 8 \times 20 | [5, 8, 20000] | [5, 8, 20] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganSenilaiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganSenilaiPage.tsx) | 261 | `c1Math2` | ja | 5x = 160.000 \Rightarrow x = 32.000 | 5x = 160 \Rightarrow x = 32 | [160000, 32000] | [160, 32] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganSenilaiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganSenilaiPage.tsx) | 279 | `c3Q` | ja | Sebuah jembatan direncanakan selesai dalam 30 hari oleh 20 pekerja. Setelah 12 hari berjalan, proyek libur selama 3 hari karena cuaca buruk. Agar proyek selesai tepat waktu, berapa tambahan pekerja yang harus direkrut? | ある橋は20人の作業員で30日で完成する予定でした。12日経過後、悪天候のため3日間プロジェクトが中断されました。期限通りに完成させるために、追加の作業員は何人必要ですか？ | [30, 20, 12, 3] | [20, 30, 12, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganSenilaiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganSenilaiPage.tsx) | 240 | `kasusExQ` | ja | Proyek 20 hari oleh 15 pekerja. Setelah 8 hari, libur 4 hari. Berapa tambahan pekerja? | 15人の作業員による20日間のプロジェクト。8日後、4日間の休憩。追加の作業員は何人必要？ | [20, 15, 8, 4] | [15, 20, 8, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganSenilaiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganSenilaiPage.tsx) | 174 | `senilaiDef` | ja | adalah hubungan antara dua variabel di mana jika variabel pertama bertambah, variabel kedua juga akan ikut bertambah dan jika variabel pertama berkurang, variabel kedua juga ikut berkurang secara proporsional. | は2つの変数の関係で、最初の変数が増えると2番目の変数も比例して増え、最初が減ると2番目も減る関係です。 | [2, 1, 2] | [2, 2, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx) | 113 | `c3VarEq` | en | 5x - 3x = 24.000 | 5x - 3x = 24 | [24000] | [24] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx) | 114 | `c3VarSolve` | en | 2x = 24.000 \Rightarrow x = 12.000 | 2x = 24 \Rightarrow x = 12 | [24000, 12000] | [24, 12] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx) | 79 | `c2Check` | ja | Cek: 12 + 16 + 20 = 48 cm ✓ | 確認：12 + 16 + 20 = 48cm ✓ | [12, 16, 20, 48] | [12, 16, 20] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx) | 76 | `c2Q` | ja | Panjang sisi-sisi segitiga berbanding 3 : 4 : 5. Jika keliling segitiga adalah 48 cm, tentukan panjang setiap sisi! | 三角形の各辺の比は 3：4：5 です。周の長さが48cmのとき、各辺の長さを求めなさい。 | [3, 4, 5, 48] | [3, 4, 5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx) | 83 | `c2Result` | ja | Sisi segitiga: 12 cm, 16 cm, dan 20 cm. | 三角形の辺：12cm、16cm、20cm。 | [12, 16, 20] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx) | 85 | `c3Q` | ja | Uang Dafa dan Rani berbanding 3 : 5. Jika selisih uang mereka adalah Rp24.000, tentukan (a) uang masing-masing, dan (b) jumlah uang keduanya. | Reedのお金とBlairのお金の比は 3：5 です。2人の金額の差が$24のとき、(a) それぞれの金額と、(b) 合計金額を求めなさい。 | [3, 5, 24000, 2] | [3, 5, 2, 24] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx) | 113 | `c3VarEq` | ja | 5x - 3x = 24.000 | 5x - 3x = 24 | [24000] | [24] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx) | 114 | `c3VarSolve` | ja | 2x = 24.000 \Rightarrow x = 12.000 | 2x = 24 \Rightarrow x = 12 | [24000, 12000] | [24, 12] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx) | 18 | `introCard1Body` | ja | Miyu membawa 4 buku. Arvinza membawa 6 buku. Perbandingan buku mereka adalah 4 : 6 = 2 : 3. | Jamieは4冊の本を持っています。Quinnは6冊。2人の本の比は 4：6 = 2：3 です。 | [4, 6, 4, 6, 2, 3] | [4, 6, 2, 4, 6, 2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx) | 58 | `c1Q` | ja | Sebuah peta memiliki skala 1 : 2.000.000. Jarak antara Kota A dan Kota B pada peta tersebut adalah 4,5 cm. Berapa jarak sebenarnya kedua kota itu dalam kilometer? | 地図の縮尺が1：2,000,000です。地図上で都市Aと都市Bの距離は4.5cmです。実際の2都市間の距離は何kmですか？ | [1, 2000000, 4.5, 2] | [1, 2000000, 4, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx) | 59 | `c1Result` | ja | Jarak sebenarnya Kota A ke Kota B = 90 km | 都市Aから都市Bまでの実際の距離 = 90km | [90] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx) | 61 | `c2Q` | ja | Jarak antara dua desa adalah 15 km. Pada sebuah denah wilayah, jarak keduanya digambar sepanjang 3 cm. (a) Tentukan skala denah tersebut! (b) Jika ada desa ketiga yang jaraknya 24 km dari desa pertama, berapa cm jaraknya di denah? | 2つの村の実際の距離は15kmです。地域の地図ではこの距離が3cmで描かれています。 (a) 地図の縮尺を求めなさい。 (b) 3番目の村が1番目の村から24km離れているとき、地図上では何cmですか？ | [15, 3, 24] | [2, 3, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx) | 65 | `c2ResultB` | ja | Jarak di denah = 4,8 cm | 地図上の距離 = 4.8cm | [4.8] | [4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx) | 62 | `c2UbahA` | ja | 15 km = 15 × 100.000 cm = 1.500.000 cm | 15km = 15 × 100,000cm = 1,500,000cm | [15, 15, 100000, 1500000] | [15, 100, 1500] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx) | 63 | `c2UbahB` | ja | 24 km = 2.400.000 cm | 24km = 2,400,000cm | [24, 2400000] | [2400] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx) | 69 | `c3NoteB` | ja | 800 m² = 800 × 10.000 = 8.000.000 cm² | 800m² = 800 × 10,000 = 8,000,000cm² | [800, 800, 10000, 8000000] | [800, 10000, 8000] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx) | 67 | `c3Q` | ja | Sebuah denah lapangan olahraga menggunakan skala 1 : 1.000. Pada denah, luas lapangan tersebut adalah 12 cm². (a) Tentukan luas lapangan sebenarnya dalam m²! (b) Jika lapangan futsal di sebelahnya luasnya 800 m², berapa cm² luasnya di denah? | スポーツグラウンドの間取り図の縮尺は1：1,000です。図面上のグラウンドの面積は12cm²です。 (a) 実際のグラウンドの面積をm²で求めなさい。 (b) 隣接するフットサルコートの実際の面積が800m²のとき、図面上では何cm²ですか？ | [1, 1000, 12, 800] | [1, 1000] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx) | 70 | `c3ResultA` | ja | Luas lapangan sebenarnya = 1.200 m² | 実際のグラウンド面積 = 1,200m² | [1200] | [1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx) | 71 | `c3ResultB` | ja | Luas lapangan futsal di denah = 8 cm² | 図面上のフットサルコート面積 = 8cm² | [8] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx) | 35 | `luasBody` | ja | Ketika berurusan dengan luas (bukan panjang), skala harus dikuadratkan terlebih dahulu karena luas adalah hasil kali dua dimensi panjang. | 長さではなく面積を扱うとき、縮尺を2乗する必要があります。面積は2つの長さの積だからです。 | [2] | [2, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx) | 40 | `luasExQ` | ja | Peta berskala 1:500. Luas taman di peta = 6 cm². Berapa luas sebenarnya? | 縮尺1:500の地図。地図上の公園の面積 = 6cm²。実際の面積は？ | [1, 500, 6] | [1, 500] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx) | 33 | `readNote` | ja | Cara Baca Skala 1 : 500.000: Setiap 1 cm di peta = 500.000 cm (atau 5 km) di dunia nyata. Semakin besar angka di belakang titik dua, semakin kecil gambar dibanding aslinya. | 縮尺 1：500,000 の読み方：地図上の1cm = 実際の500,000cm（= 5km）。コロンの後の数字が大きいほど、図は実物より小さくなります。 | [1, 500000, 1, 500000, 5] | [1, 500000, 500] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GradienPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GradienPage.tsx) | 105 | `c4_ans` | ja | ✅ k = −2, sehingga P(−2, 0). Ketiga titik terletak pada garis y = x + 2 dengan gradien m = 1. | ✅ k = −2 なので P(−2, 0)。3点すべてが傾きm = 1の直線y = x + 2上にある。 | [-2, -2, 0, 3, 2, 1] | [-2, -2, 0, 3, 1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GradienPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GradienPage.tsx) | 101 | `c4_l1` | ja | Langkah 1 — Hitung gradien QR (titik yang sudah diketahui nilai pastinya): | ステップ1 — QRの傾きを求める（値がわかっている2点）： | [1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GrafikPGLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GrafikPGLPage.tsx) | 20 | `sh_titikpotong` | en | 📌 Menggambar Grafik Persamaan Garis dengan 2 Titik Potong Sumbu X dan Sumbu Y | 📌 Drawing a Line Using x- and y-Intercepts | [2] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GrafikPGLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GrafikPGLPage.tsx) | 243 | `c3_soal_end` | ja | digambar pada satu bidang koordinat. Tentukan titik potong kedua garis tersebut, lalu gambarkan! | を同じ座標平面に描く。2 直線の交点を求め、グラフを描け！ | [1] | [2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GrafikPGLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GrafikPGLPage.tsx) | 20 | `sh_titikpotong` | ja | 📌 Menggambar Grafik Persamaan Garis dengan 2 Titik Potong Sumbu X dan Sumbu Y | 📌 x切片・y切片を使って直線を描く | [2] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/Hubungan2GarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/Hubungan2GarisPage.tsx) | 204 | `ber_anim_perp_at` | ja | sudut 90° di | 交点は | [90] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/Hubungan2GarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/Hubungan2GarisPage.tsx) | 124 | `sej_p2` | ja | Bayangkan dua mobil yang melaju dengan kecepatan yang sama: mobil A selalu 5 km di depan mobil B. Mobil B tidak akan pernah menyalip A karena lajunya sama persis. Begitu juga dua garis sejajar — jarak vertikal antara keduanya selalu konstan, sehingga tidak pernah bertemu. | 2台の車が同じ速度で走るとき、車Aは常に車Bの5km前にいる。速度がまったく同じなので車BはAに追いつけない。平行な2直線も同じ — 縦の距離は常に一定で、交わることはない。 | [2, 5] | [2, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/Hubungan2GarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/Hubungan2GarisPage.tsx) | 102 | `sh_intro` | ja | 🌟 Tiga Kemungkinan Hubungan Dua Garis | 🌟 2直線の3つの関係 | [3, 2] | [2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/Hubungan2GarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/Hubungan2GarisPage.tsx) | 140 | `tek_p2` | ja | Untuk mendapat garis yang tegak lurus, kita perlu memutar vektor ini 90°. Rotasi 90° dari (1, m₁) menghasilkan (−m₁, 1) atau (m₁, −1). | 垂直な直線を得るには、このベクトルを90°回転させる必要がある。(1, m₁)を90°回転させると(−m₁, 1)または(m₁, −1)になる。 | [90, 90, 1, 1, -1] | [90, 1, 90, 1, -1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/MenentukanPGLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/MenentukanPGLPage.tsx) | 129 | `c2_p1` | en | Gunakan rumus skenario 2: y − y₁ = m(x − x₁) | Use Scenario 1 formula: y − y₁ = m(x − x₁) | [2] | [1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/MenentukanPGLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/MenentukanPGLPage.tsx) | 129 | `c2_p1` | ja | Gunakan rumus skenario 2: y − y₁ = m(x − x₁) | シナリオ1の公式を使用: y − y₁ = m(x − x₁) | [2] | [1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/KalimatTerbukaTertutupPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/KalimatTerbukaTertutupPage.tsx) | 126 | `c3Question` | ja | Dari kalimat-kalimat berikut, klasifikasikan masing-masing sebagai kalimat terbuka, kalimat tertutup benar, kalimat tertutup salah, atau bukan keduanya. Jika kalimat terbuka, tentukan satu nilai penyelesaiannya! | 次の各文を「開いた文」「真の閉じた文」「偽の閉じた文」「どちらでもない」に分類しなさい。開いた文なら解を1つ求めなさい！ | [2] | [1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPLSVPage.tsx) | 61 | `c2Q` | ja | Usia Ayah sekarang adalah 3 kali usia Jordan. Selisih usia mereka adalah 28 tahun. Berapakah usia Ayah dan Jordan sekarang? | 父の年齢はJordanの年齢の3倍である。2人の年齢の差は28歳である。父とJordanの現在の年齢を求めなさい。 | [3, 28] | [3, 2, 28] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPLSVPage.tsx) | 23 | `introBox` | ja | Contoh: "Usia Alex 5 tahun lebih tua dari Sam. Jika jumlah usia mereka 35 tahun, berapa usia masing-masing?" → Ini bisa diubah menjadi persamaan dan diselesaikan! | 例：「Alexの年齢はSamより5歳上。2人の年齢の合計が35歳なら、それぞれ何歳？」→ これを方程式にして解くことができます！ | [5, 35] | [5, 2, 35] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPtLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPtLSVPage.tsx) | 49 | `c1Q` | ja | Sebuah lift memiliki kapasitas maksimum 480 kg. Berat rata-rata satu orang dewasa adalah 60 kg. Paling banyak berapa orang yang dapat masuk lift sekaligus? | あるエレベーターの最大積載量は480kgです。大人1人の平均体重は60kgとします。最大で何人が同時にエレベーターに乗れますか？ | [480, 60] | [1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPtLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPtLSVPage.tsx) | 57 | `c2Q` | ja | Nilai ujian matematika Morgan pada tiga ulangan pertama adalah 70, 75, dan 80. Berapa nilai minimal yang harus Morgan dapatkan pada ulangan keempat agar rata-ratanya tidak kurang dari 78? | Morganの数学のテスト3回分の点数は70点、75点、80点でした。4回目のテストで何点以上取れば、平均点が78点以上になりますか？ | [3, 1, 70, 75, 80, 78] | [3, 70, 75, 80, 4, 78] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPtLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPtLSVPage.tsx) | 61 | `c2s4` | ja | Morgan harus mendapatkan nilai | Morganは4回目のテストで | [] | [4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPtLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPtLSVPage.tsx) | 63 | `c2s4c` | ja | pada ulangan ke-4. | 取る必要があります。 | [4] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPtLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPtLSVPage.tsx) | 64 | `c3Q` | ja | Seorang pedagang memiliki modal Rp150.000. Ia ingin membeli dua jenis barang: barang A seharga Rp8.000 per unit dan barang B seharga Rp5.000 per unit. Ia sudah pasti membeli 10 unit barang B. Berapa paling banyak unit barang A yang dapat ia beli tanpa melebihi modalnya? | ある商人の予算は$150です。2種類の商品を購入したいと思っています：商品Aは1個$8、商品Bは1個$5です。商品Bはすでに10個買うことが決まっています。予算を超えずに商品Aを最大何個買えますか？ | [150000, 2, 8000, 5000, 10] | [150, 2, 1, 8, 1, 5, 10] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPtLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPtLSVPage.tsx) | 21 | `introBox` | ja | Contoh situasi: "Kamu hanya punya uang Rp50.000. Kamu ingin membeli beberapa buku seharga Rp12.000 per buku. Paling banyak berapa buku yang bisa kamu beli?" → Ini adalah masalah PtLSV! | 例：「あなたは$50しか持っていません。1冊$12の本を何冊か買いたいです。最大で何冊買えますか？」→ これが一元一次不等式の問題です！ | [50000, 12000] | [50, 1, 12] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PengertianPolaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PengertianPolaPage.tsx) | 101 | `ex1Answer` | ja | ✅ Jawaban: Suku ke-12 dari barisan 1, 4, 9, 16, ... adalah 144. | ✅ 答え：数列1, 4, 9, 16, ... の第12項は144です。 | [12, 1, 4, 9, 16, 144] | [1, 4, 9, 16, 12, 144] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PengertianPolaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PengertianPolaPage.tsx) | 109 | `ex2Answer` | ja | ✅ Jawaban: Suku ke-15 dari barisan 6, 12, 20, 30, … adalah 272. | ✅ 答え：数列6, 12, 20, 30, … の第15項は272です。 | [15, 6, 12, 20, 30, 272] | [6, 12, 20, 30, 15, 272] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx) | 85 | `derivStep1Desc` | ja | Misalkan S_n adalah jumlah n suku pertama. Kita tulis dua kali — maju dan mundur: | S_nを最初のn項の和とする。正順と逆順の2通りで書く： | [1] | [2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx) | 102 | `ex2bProblem` | ja | Jumlah 10 suku pertama suatu barisan aritmetika adalah 155 dan suku pertamanya adalah 5. Tentukan beda dan suku ke-10! | ある等差数列の最初の10項の和は155で、第1項は5である。公差と第10項を求めなさい！ | [10, 1, 155, 5, 10] | [10, 155, 1, 5, 10] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx) | 121 | `ex4Ans` | ja | ✅ Jumlah kelipatan 4 antara 200 dan 400 = 14.700 | ✅ 200と400の間の4の倍数の和 = 14,700 | [4, 200, 400, 14700] | [200, 400, 4, 14700] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx) | 116 | `ex4Desc` | ja | Kelipatan 4 di antara 200 dan 400 (tidak termasuk 200 dan 400): | 200と400の間の4の倍数（200と400を含まない）： | [4, 200, 400, 200, 400] | [200, 400, 4, 200, 400] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx) | 120 | `ex4Note` | ja | Catatan: ada 49 bilangan kelipatan 4 di antara 200 dan 400, dari 204 hingga 396. | 注：200と400の間には204から396まで49個の4の倍数がある。 | [49, 4, 200, 400, 204, 396] | [200, 400, 204, 396, 49, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx) | 115 | `ex4Problem` | ja | Jumlah bilangan kelipatan 4 yang terletak di antara 200 dan 400 adalah… | 200と400の間にある4の倍数の和を求めなさい。 | [4, 200, 400] | [200, 400, 4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx) | 54 | `howToUseBody` | ja | Rumus U_n = a + (n-1) \cdot b dapat digunakan untuk menentukan nilai suku manapun dalam suatu barisan aritmetika — suku ke-5, ke-20, bahkan ke-100 — tanpa perlu menghitung satu per satu, asalkan dua hal berikut diketahui: | 公式 U_n = a + (n-1) \cdot b を使えば、等差数列のどの項の値も求められます — 第5項、第20項、第100項でも、1つずつ足さずに、次の2つが分かれば： | [1, 5, 20, 100, 1, 1] | [1, 5, 20, 100, 1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx) | 82 | `seriesSummaryBody` | ja | Jumlah n suku pertama barisan aritmetika (dilambangkan S_n) dapat dihitung menggunakan dua rumus yang ekuivalen — pilih yang paling efisien sesuai informasi yang diketahui. | 等差数列の最初のn項の和（S_n）は、2つの同等な公式で計算できます — 与えられた情報に応じて最も効率的なものを選んでください。 | [1] | [2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx) | 62 | `ex2Ans` | en | a = 2, r = 3, U_{10} = 39{.}366 | a = 2, r = 3, U_{10} = 39{,}366 | [2, 3, 10, 39, 366] | [2, 3, 10, 39366] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx) | 20 | `introBody` | en | Bayangkan sebuah bakteri yang membelah diri menjadi dua setiap 15 menit. Jika pada menit ke-0 ada 1 bakteri, maka setelah 15 menit ada 2, setelah 30 menit ada 4, setelah 45 menit ada 8, dan seterusnya. Setiap suku diperoleh dengan mengalikan suku sebelumnya dengan bilangan tetap (2). Inilah barisan geometri! Perbedaan utama dengan barisan aritmetika: aritmetika menambah bilangan tetap (beda), geometri mengalikan bilangan tetap (rasio). | Imagine a bacterium that splits in two every 15 minutes. If there is 1 bacterium at minute 0, after 15 minutes there are 2, after 30 minutes 4, after 45 minutes 8, and so on. Each term is obtained by multiplying the previous term by a fixed number (2). This is a geometric sequence! The key difference from arithmetic sequences: arithmetic adds a fixed number (common difference), geometric multiplies by a fixed number (common ratio). | [15, 0, 1, 15, 2, 30, 4, 45, 8, 2] | [15, 1, 0, 15, 2, 30, 4, 45, 8, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx) | 62 | `ex2Ans` | ja | a = 2, r = 3, U_{10} = 39{.}366 | a = 2、r = 3、U_{10} = 39{,}366 | [2, 3, 10, 39, 366] | [2, 3, 10, 39366] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx) | 92 | `ex2bProblem` | ja | Jumlah 5 suku pertama suatu deret geometri adalah 62 dan suku pertamanya adalah 2. Tentukan rasio dan suku ke-5! | ある等比級数の最初の5項の和は62で、第1項は2である。公比と第5項を求めなさい！ | [5, 1, 62, 2, 5] | [5, 62, 1, 2, 5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx) | 64 | `ex3Problem` | ja | Sebuah pabrik memproduksi 500 unit pada bulan pertama. Karena peningkatan kapasitas, produksi meningkat sebesar 20% setiap bulan.a) Berapa produksi pada bulan ke-6?b) Pada bulan ke berapa produksi pertama kali melampaui 2.000 unit? | 工場が1ヶ月目に500個を生産する。設備増強により毎月20%増加する。a) 6ヶ月目の生産量は？b) 何ヶ月目に初めて2,000個を超えるか？ | [500, 1, 20, 6, 2000] | [1, 500, 20, 6, 2000] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx) | 20 | `introBody` | ja | Bayangkan sebuah bakteri yang membelah diri menjadi dua setiap 15 menit. Jika pada menit ke-0 ada 1 bakteri, maka setelah 15 menit ada 2, setelah 30 menit ada 4, setelah 45 menit ada 8, dan seterusnya. Setiap suku diperoleh dengan mengalikan suku sebelumnya dengan bilangan tetap (2). Inilah barisan geometri! Perbedaan utama dengan barisan aritmetika: aritmetika menambah bilangan tetap (beda), geometri mengalikan bilangan tetap (rasio). | 15分ごとに2分裂するバクテリアを想像してください。0分目に1個のバクテリアがいたとすると、15分後は2個、30分後は4個、45分後は8個…と続きます。各項は前の項に一定の数(2)を掛けることで得られます。これが等比数列です！等差数列との主な違い：等差は一定の数を足す（公差）、等比は一定の数を掛ける（公比）。 | [2, 15, 0, 1, 15, 2, 30, 4, 45, 8, 2] | [15, 2, 0, 1, 15, 2, 30, 4, 45, 8, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx) | 78 | `seriesSummaryBody` | ja | Deret geometri adalah jumlah n suku pertama barisan geometri. Rumusnya berbeda untuk r \neq 1 (ada dua varian bergantung nilai r) dan untuk r = 1. | 等比級数は等比数列の最初のn項の和。r \neq 1の場合（rの値によって2種類）とr = 1の場合で公式が異なります。 | [1, 1, 1] | [1, 2, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaKhususPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaKhususPage.tsx) | 23 | `animDesc` | ja | Pilih sebuah pola di bawah lalu perhatikan busur melengkung yang menunjukkan beda (selisih) antara dua suku yang berurutan. Busur muncul satu per satu dari kiri ke kanan — amati polanya! | 下のパターンを選択し、連続する項の差を示す曲線の弧を観察してください。弧は左から右へ1つずつ現れます — パターンを観察しましょう！ | [2] | [1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaKhususPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaKhususPage.tsx) | 52 | `ex1Ans` | ja | ✅ Jawaban: Suku ke-12 dari barisan 1, 4, 9, 16, ... adalah 144. | ✅ 答え：数列1, 4, 9, 16, ... の第12項は144です。 | [12, 1, 4, 9, 16, 144] | [1, 4, 9, 16, 12, 144] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaKhususPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaKhususPage.tsx) | 33 | `pascal.desc` | ja | Setiap bilangan = jumlah dua bilangan di atasnya. Baris dimulai dan diakhiri angka 1. | 各数 = 上の2つの数の和。各行は1で始まり1で終わる。 | [2, 1] | [2, 1, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/BanyakFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/BanyakFungsiPage.tsx) | 51 | `intro_idea_p` | ja | Jika A = {1, 2} dan B = {a, b, c}, maka setiap anggota A bisa dipasangkan ke salah satu dari 3 pilihan di B. Karena ada 2 anggota di A, maka total fungsi = 3 × 3 = 3² = 9 fungsi. | A = {1, 2}、B = {a, b, c} のとき、Aの各要素はBの3つの選択肢のうちの1つと対応できます。Aの要素が2つなので、関数の総数 = 3 × 3 = 3² = 9 個です。 | [1, 2, 1, 3, 2, 3, 3, 3, 9] | [1, 2, 3, 1, 2, 3, 3, 3, 9] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/BanyakFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/BanyakFungsiPage.tsx) | 73 | `koresp_def` | ja | Korespondensi satu-satu (bijeksi) adalah fungsi yang memenuhi dua syarat sekaligus: | 全単射（一対一対応）とは、次の2つの条件を同時に満たす関数です： | [1] | [2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/BanyakFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/BanyakFungsiPage.tsx) | 88 | `koresp_visual_no` | ja | ❌ BUKAN KORESPONDENSI 1-1 | ❌ 一対一対応ではない | [1, 1] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/NotasiFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/NotasiFungsiPage.tsx) | 89 | `c3_answer` | ja | ✅ p = 3, q = 2, f(x) = 3x + 2, dan x = 9 saat f(x) = 29 | ✅ p = 3、q = 2、f(x) = 3x + 2、f(x) = 29 のとき x = 9 | [3, 2, 2, 9, 29] | [3, 2, 2, 29, 9] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/NotasiFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/NotasiFungsiPage.tsx) | 47 | `notasi_rows[].baca` | ja | x dipetakan ke dua x tambah tiga | xは 2x + 3 に対応する | [2] | [3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/PengertianFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/PengertianFungsiPage.tsx) | 71 | `pair2Note` | en | Tidak ada nilai x yang muncul 2× dengan y berbeda → ini fungsi ✓ · Range = | No x-value appears twice with a different y → this is a function ✓ · Range = | [2] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/PengertianFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/PengertianFungsiPage.tsx) | 122 | `c2Diagrams[].penj` | ja | x→2, y→2, z→2. Semua anggota domain menunjuk ke satu elemen kodomain yang sama (2). Ini disebut fungsi konstan — tetap sah sebagai fungsi karena setiap domain punya tepat satu pasangan ✓ | x→2, y→2, z→2。すべての定義域要素が同じ終域要素（2）を指します。これを定数関数と呼びます — 各定義域要素に正確に1つの対応があるため有効な関数です ✓ | [2, 2, 2, 1, 2] | [2, 2, 2, 2, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/PengertianFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/PengertianFungsiPage.tsx) | 135 | `c3ConclText` | ja | Yang merupakan fungsi: c dan e. Yang bukan fungsi: a (Maret duplikat), b (Ani & Beti duplikat), d (Selasa duplikat). | 関数：cとe。関数でないもの：a（3月が重複）、b（AniとBetiが重複）、d（火曜が重複）。 | [] | [3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/PengertianFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/PengertianFungsiPage.tsx) | 161 | `c4ConcText` | ja | Grafik a, c, d, e adalah fungsi. Grafik b dan f bukan fungsi karena ada garis vertikal yang memotong grafik di lebih dari satu titik. | グラフa, c, d, eは関数です。グラフbとfは関数ではありません（垂直線が2点以上で交わります）。 | [1] | [2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/PengertianFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/PengertianFungsiPage.tsx) | 57 | `funcDesc` | ja | a→1, b→1, c→3 · Tiap anggota A tepat 1 panah ✓ | a→1, b→1, c→3 · AのすべてがちょうどI本の矢印 ✓ | [1, 1, 3, 1] | [1, 1, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/PengertianFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/PengertianFungsiPage.tsx) | 43 | `konsepNoteText` | ja | Boleh saja dua anggota domain berbeda dipasangkan ke anggota kodomain yang sama. Yang tidak boleh adalah satu anggota domain punya dua keluaran berbeda! | 異なる定義域要素が同じ終域要素を指すことは問題ありません。許可されないのは、1つの定義域要素が2つの異なる出力を持つことです！ | [2, 1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegiempatPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegiempatPage.tsx) | 112 | `ex2q2` | ja | Jika biaya pengecatan Rp 50.000 per m², berapa total biaya untuk mengecat seluruh penampang jembatan tersebut? | ペンキの費用が1 m²あたり50,000円の場合、橋の断面全体を塗るのにかかる費用はいくらですか？ | [50000] | [1, 50000] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegiempatPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegiempatPage.tsx) | 56 | `s1tipSqEnd` | ja | (satu ukuran dikuadratkan) | （1つの寸法を2乗） | [1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegiempatPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegiempatPage.tsx) | 86 | `s4llp1` | ja | Layang-layang juga memiliki dua diagonal yang saling tegak lurus — satu diagonal membagi yang lain menjadi dua. Karena strukturnya mirip belah ketupat, | 凧形にも垂直な2本の対角線があり、一方が他方を2等分します。ひし形と構造が似ているため、 | [2, 1] | [2, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegitigaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegitigaPage.tsx) | 95 | `s4tipText` | en | Setiap naik 1 tingkat satuan panjang → dikali 10. Tapi satuan luas berarti dikuadratkan → naik 1 tingkat = dikali 100. | Each step up in length unit → multiply by 10. But area units are squared → one step up = multiply by 100. | [1, 10, 1, 100] | [10, 1, 100] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegitigaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegitigaPage.tsx) | 106 | `ex2q2` | ja | Jika harga cat dinding Rp 12.000 per cm², berapakah biaya mengecat seluruh permukaan segitiga tersebut? | ペンキの費用が1 cm²あたり12,000円の場合、三角形全体を塗るのにかかる費用はいくらですか？ | [12000] | [1, 12000] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegitigaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegitigaPage.tsx) | 95 | `s4tipText` | ja | Setiap naik 1 tingkat satuan panjang → dikali 10. Tapi satuan luas berarti dikuadratkan → naik 1 tingkat = dikali 100. | 長さの単位が1段階上がるごとに×10。でも面積の単位は2乗なので——1段階上がると×100になります。 | [1, 10, 1, 100] | [1, 10, -1, 100] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx) | 93 | `quiz2Choices[].p1` | en | 2(7.000) + 11.000 = 14.000 + 11.000 = 25.000 | 2(7) + 11 = 14 + 11 = 25 | [2, 7000, 11000, 14000, 11000, 25000] | [2, 7, 11, 14, 11, 25] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx) | 93 | `quiz2Choices[].p2` | en | 7.000 + 2(11.000) = 7.000 + 22.000 = 29.000 \neq 23.000 | 7 + 2(11) = 7 + 22 = 29 \neq 23 | [7000, 2, 11000, 7000, 22000, 29000, 23000] | [7, 2, 11, 7, 22, 29, 23] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx) | 33 | `pldvCoefLabel` | ja | Koefisien variabel (bukan nol) | 変数の係数（0以外） | [] | [0] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx) | 31 | `pldvSummaryDesc` | ja | PLDV (Persamaan Linear Dua Variabel) adalah persamaan yang memiliki tepat dua variabel dan pangkat tertinggi setiap variabelnya adalah 1. Bentuk umumnya adalah ax + by = c dengan a, b ≠ 0. Satu persamaan linear dua variabel memiliki tak hingga banyak solusi karena kita bisa memasangkan nilai x apa saja dengan y yang sesuai. | 2変数の一次方程式は、各変数の次数が1の方程式で、標準形はax + by = c（a, b ≠ 0）です。xの値を何にでも設定できるため、1本の方程式には無数の解があります。 | [2, 2, 1, 0] | [2, 1, 0, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx) | 104 | `q1Problem` | ja | Manakah dari persamaan berikut yang merupakan PLDV? | 次の方程式のうち、2変数の一次方程式はどれ？ | [] | [2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx) | 126 | `q3R1` | ja | 🎯 1 penyelesaian: | 🎯 唯一解： | [1] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx) | 93 | `quiz2Choices[].p1` | ja | 2(7.000) + 11.000 = 14.000 + 11.000 = 25.000 | 2(7) + 11 = 14 + 11 = 25 | [2, 7000, 11000, 14000, 11000, 25000] | [2, 7, 11, 14, 11, 25] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx) | 93 | `quiz2Choices[].p2` | ja | 7.000 + 2(11.000) = 7.000 + 22.000 = 29.000 \neq 23.000 | 7 + 2(11) = 7 + 22 = 29 \neq 23 | [7000, 2, 11000, 7000, 22000, 29000, 23000] | [7, 2, 11, 7, 22, 29, 23] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx) | 57 | `spldvEq2Desc` | ja | PLDV kedua yang berbeda dari pertama | 1番目とは異なる2番目の一次方程式 | [2, 1] | [1, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeCampuranPage.tsx) | 70 | `q3` | ja | Juno membeli 3 kg beras dan 2 kg gula seharga $14. Remy membeli 4 kg beras dan 5 kg gula seharga $24,50. Tentukan harga per kg beras dan gula menggunakan metode campuran! | Junoは米3kgと砂糖2kgを$14で買いました。Remyは米4kgと砂糖5kgを$24.50で買いました。組み合わせ法を使って米と砂糖の1kgあたりの価格を求めてください！ | [3, 2, 14, 4, 5, 24.5] | [14, 24.5] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeCampuranPage.tsx) | 39 | `summaryDesc` | ja | Metode campuran menggabungkan eliminasi (untuk mencari variabel pertama) dan substitusi (untuk mencari variabel kedua). Hasilnya adalah solusi presisi dengan langkah-langkah yang lebih sedikit dibandingkan melakukan eliminasi dua kali. | 組み合わせ法は加減法で最初の変数を求め、代入法で2番目の変数を求めます。加減法を2回行うより少ない手順で正確な解が得られます。 | [1, 2] | [2, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx) | 81 | `q3Answer` | en | 🔑 Harga 1 kg mangga: $16.80 \| Harga 1 kg jeruk: $10.80 | 🔑 Price per kg of mango: $16.80 \| Price per kg of orange: $10.80 | [1, 16.8, 1, 10.8] | [16.8, 10.8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx) | 73 | `q3L2Note` | en | Bagi P1 dengan 2 dan P2 tetap: | Divide Eq 1 by 2 and keep Eq 2: | [2] | [1, 2, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx) | 69 | `q3MangoVar` | en | m = harga 1 kg mangga | m = price per kg of mango | [1] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx) | 70 | `q3OrangeVar` | en | j = harga 1 kg jeruk | j = price per kg of orange | [1] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx) | 26 | `introDesc` | ja | Kata "eliminasi" berasal dari bahasa Latin yang berarti menghilangkan atau mengeliminasi. Ide utama metode ini: kita menghapus salah satu variabel dari sistem persamaan dengan cara menjumlahkan atau mengurangkan kedua persamaan, sehingga tersisa hanya satu variabel yang bisa langsung diselesaikan. | 「消去」とは取り除くことです。加減法の基本的なアイデア：2つの方程式を加算または減算することで一方の変数を消去し、残った1変数の方程式を直接解きます。 | [1, 2] | [2, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx) | 68 | `q3` | ja | Seorang pedagang menjual dua jenis buah: mangga dan jeruk. Pada hari pertama ia menjual 4 kg mangga dan 6 kg jeruk dan mendapat $132. Pada hari kedua ia menjual 3 kg mangga dan 2 kg jeruk dengan pendapatan $72. Tentukan harga per kilogram masing-masing buah menggunakan metode eliminasi! | ある商人が2種類の果物（マンゴーとオレンジ）を販売しています。初日は4kgのマンゴーと6kgのオレンジを$132で売りました。2日目は3kgのマンゴーと2kgのオレンジを$72で売りました。加減法を使って各果物の1kgあたりの価格を求めてください！ | [4, 6, 132, 3, 2, 72] | [2, 132, 2, 72] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx) | 81 | `q3Answer` | ja | 🔑 Harga 1 kg mangga: $16.80 \| Harga 1 kg jeruk: $10.80 | 🔑 マンゴー1kg：$16.80 \| オレンジ1kg：$10.80 | [1, 16.8, 1, 10.8] | [16.8, 10.8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx) | 73 | `q3L2Note` | ja | Bagi P1 dengan 2 dan P2 tetap: | 式1を2で割り、式2はそのまま： | [2] | [1, 2, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx) | 69 | `q3MangoVar` | ja | m = harga 1 kg mangga | m = マンゴー1kgの価格 | [1] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx) | 70 | `q3OrangeVar` | ja | j = harga 1 kg jeruk | j = オレンジ1kgの価格 | [1] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx) | 32 | `summaryDesc` | ja | Metode eliminasi "menghapus" satu variabel dengan membuat koefisiennya sama di kedua persamaan, lalu menjumlahkan atau mengurangkan kedua persamaan tersebut. Proses ini dilakukan dua kali — sekali untuk mencari x, sekali untuk mencari y. | 加減法は、両方の方程式で係数を等しくしてから足し引きすることで変数を消去します。これをxとyそれぞれに対して2回行います。 | [1] | [2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeSubstitusiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeSubstitusiPage.tsx) | 23 | `introDesc` | ja | Kata "substitusi" artinya penggantian. Ide utamanya: dari salah satu persamaan, kita nyatakan satu variabel dalam bentuk variabel lain (misalnya y dalam fungsi x), lalu kita "masukkan" (substitusikan) ekspresi tersebut ke persamaan kedua. Hasilnya: persamaan kedua berubah menjadi persamaan dengan satu variabel saja, yang bisa langsung diselesaikan! | 「代入」とは置き換えのことです。基本的なアイデア：一方の方程式から一方の変数を他の変数で表し（例えばxを使ってyを表す）、その式を他方の方程式に代入します。結果：2番目の方程式が1変数の方程式になり、直接解くことができます！ | [1, 1] | [2, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeSubstitusiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeSubstitusiPage.tsx) | 29 | `summaryDesc` | ja | Metode substitusi mengubah SPLDV (dua persamaan, dua variabel) menjadi persamaan linear satu variabel dengan cara menggantikan salah satu variabel menggunakan ekspresi dari persamaan lain. | 代入法は、一方の変数を他方の方程式の式で置き換えることで、2変数連立方程式を1変数の一次方程式に変換する手法です。 | [2, 2] | [2, 1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/ModelSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/ModelSPLDVPage.tsx) | 65 | `q2Problem` | ja | Umur Theo sekarang adalah 3 tahun lebih tua dari Nora. Jika jumlah umur mereka berdua adalah 27 tahun, buatlah model SPLDV dari permasalahan ini! | Theoの年齢はNoraより3歳年上です。2人の年齢の和が27歳のとき、この問題の連立方程式モデルを作りましょう！ | [3, 27] | [3, 2, 27] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx) | 12 | `q1L1Points[]` | en | Ditanya: harga 1 kg apel dan harga 1 kg jeruk | Find: price per kg of apples and per kg of oranges | [1, 1] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx) | 47 | `q1Problem` | en | Seorang pelanggan membeli 3 kg apel dan 2 kg jeruk seharga $54. Di toko yang sama, pelanggan lain membeli 1 kg apel dan 4 kg jeruk seharga $52. Berapa harga 1 kg apel dan 1 kg jeruk masing-masing? | A customer buys 3 kg of apples and 2 kg of oranges for $54. At the same store, another customer buys 1 kg of apples and 4 kg of oranges for $52. What is the price per kg of apples and oranges? | [3, 2, 54, 1, 4, 52, 1, 1] | [3, 2, 54, 1, 4, 52] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx) | 62 | `q1Answer` | ja | Harga 1 kg apel adalah $11.20 dan harga 1 kg jeruk adalah $10.20. | リンゴ1kgの価格：$11.20、オレンジ1kgの価格：$10.20。 | [1, 11.2, 1, 10.2] | [11.2, 10.2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx) | 12 | `q1L1Points[]` | ja | Ditanya: harga 1 kg apel dan harga 1 kg jeruk | 求めること：リンゴとオレンジの1kgあたりの価格 | [1, 1] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx) | 52 | `q1L2Var1` | ja | = harga 1 kg apel ($) | = リンゴ1kgの価格（$） | [1] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx) | 53 | `q1L2Var2` | ja | = harga 1 kg jeruk ($) | = オレンジ1kgの価格（$） | [1] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx) | 47 | `q1Problem` | ja | Seorang pelanggan membeli 3 kg apel dan 2 kg jeruk seharga $54. Di toko yang sama, pelanggan lain membeli 1 kg apel dan 4 kg jeruk seharga $52. Berapa harga 1 kg apel dan 1 kg jeruk masing-masing? | ある客がリンゴ3kgとオレンジ2kgを$54で買いました。同じ店で別の客がリンゴ1kgとオレンジ4kgを$52で買いました。リンゴとオレンジそれぞれ1kgの価格はいくら？ | [3, 2, 54, 1, 4, 52, 1, 1] | [54, 52] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx) | 92 | `q3L2Rel2` | ja | Dari hubungan panjang-lebar: "panjang = 3 lebih dari dua kali lebar" | 縦横の関係：「長さ = 幅の2倍 + 3」 | [3, 2] | [2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx) | 84 | `q3Problem` | ja | Sebuah kolam renang berbentuk persegi panjang memiliki keliling 54 meter. Panjangnya adalah 3 meter lebih dari dua kali lebarnya. Hitunglah luas kolam renang tersebut! | 長方形の形をしたプールの周囲の長さは54メートルです。長さは幅の2倍より3メートル長いです。プールの面積を求めなさい！ | [54, 3, 2] | [54, 2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/KuartilPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/KuartilPage.tsx) | 89 | `badges[].label` | ja | Kuartil Atas | 第3四分位数（上位） | [] | [3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/MedianModusPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/MedianModusPage.tsx) | 987 | `compareText` | ja |  Gaji 5 karyawan = 3, 3, 4, 5, 100 juta. Rata-rata = 23 juta (tidak representatif karena terpengaruh angka 100). Median = 4 juta (lebih representatif). Modus = 3 juta (paling sering muncul). 🚀 |  5人の従業員の給料 = 300万、300万、400万、500万、1億円。平均 = 2300万円（1億円に引っ張られ、代表的ではない）。中央値 = 400万円（より代表的）。最頻値 = 300万円（最も多く出現）。🚀 | [5, 3, 3, 4, 5, 100, 23, 100, 4, 3] | [5, 300, 300, 400, 500, 1, 2300, 1, 400, 300] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/MedianModusPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/MedianModusPage.tsx) | 1163 | `bisaLebih` | ja | Bisa lebih dari 1 | 2つ以上になることがある | [1] | [2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/PenyajianDataPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/PenyajianDataPage.tsx) | 141 | `linePlaceholder` | ja | Contoh: Jan | 例：1月 | [] | [1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/PenyajianDataPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/PenyajianDataPage.tsx) | 141 | `linePlaceholder` | ja | Contoh: Jan | 例：1月 | [] | [1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/JenisSegitigaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/JenisSegitigaPage.tsx) | 49 | `c1Problem` | ja | Tentukan jenis segitiga dengan panjang sisi 6 cm, 8 cm, dan 10 cm! | 辺の長さが6cm、8cm、10cmの三角形の種類を判定しなさい！ | [6, 8, 10] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/JenisSegitigaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/JenisSegitigaPage.tsx) | 54 | `c2Problem` | ja | Seorang desainer interior mempunyai segitiga logam dengan sisi 5 cm, 7 cm, dan 9 cm. Termasuk jenis apakah segitiga ini? | インテリアデザイナーが辺5cm、7cm、9cmの金属三角形を持っています。これはどの種類の三角形ですか？ | [5, 7, 9] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/JenisSegitigaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/JenisSegitigaPage.tsx) | 25 | `introDesc1` | ja | Siapa sangka, Teorema Pythagoras bukan hanya untuk menghitung sisi! Ia juga bisa kita gunakan sebagai | なんと、ピタゴラスの定理は辺の計算だけではありません！辺の2乗を比べるだけで、三角形が鋭角・直角・鈍角のどれかを判定する | [] | [2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/JenisSegitigaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/JenisSegitigaPage.tsx) | 15 | `subtitle` | ja | Kelas 8 · Teorema Pythagoras · Materi Matematika | 8年生 · ピタゴラスの定理 · 数学テキスト | [] | [8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx) | 65 | `astronaut` | ja | 🚀 Tips Astronot: Para insinyur NASA menggunakan Pythagoras untuk menghitung jarak antar planet! Jika kita tahu posisi dua benda langit dalam koordinat tiga dimensi, rumus jarak tiga dimensi adalah perluasan Pythagoras: | 🚀 宇宙飛行士のヒント：NASAのエンジニアは惑星間距離の計算にピタゴラスを使います！3次元座標で2つの天体の位置がわかれば、3次元距離の公式はピタゴラスを拡張したものです： | [2, 3, 3] | [3, 2, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx) | 42 | `c1Ans` | ja | ✅ Tangga mencapai ketinggian 8 m di tembok. (Ini triple 6-8-10 = kelipatan 3-4-5!) | ✅ はしごは壁の高さ8mまで届きます。（6-8-10は3-4-5の2倍のトリプル！） | [8, 6, 8, 10, 3, 4, 5] | [6, 8, 10, 3, 4, 5, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx) | 38 | `c1Problem` | ja | Sebuah tangga sepanjang 10 m bersandar ke dinding. Ujung bawah tangga berjarak 6 m dari dasar dinding. Seberapa tinggi tangga itu mencapai tembok? | 長さ10mのはしごが壁に立てかけられています。はしごの足は壁の根元から6m離れています。はしごは何mの高さまで届きますか？ | [10, 6] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx) | 47 | `c2Ans` | ja | ✅ Pemain menempuh jarak sekitar 14,72 m saat berlari diagonal. | ✅ 選手は対角線上を約14.72m走ります。 | [14.72] | [14] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx) | 43 | `c2Problem` | ja | Lapangan bulu tangkis berukuran panjang 13,4 m dan lebar 6,1 m. Seorang pemain berlari dari sudut ke sudut (diagonal). Berapa jarak yang ditempuhnya? (Bulatkan ke 2 desimal) | バドミントンコートの長さは13.4m、幅は6.1mです。選手が一方の角から対角の角まで（対角線上に）走ります。走った距離は何mですか？（小数第2位まで） | [13.4, 6.1, 2] | [13, 6, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx) | 48 | `c3Problem` | ja | Dua kapal berangkat bersamaan dari pelabuhan A. Kapal P berlayar ke arah timur sejauh 36 km, lalu berbelok ke utara sejauh 15 km dan berhenti di titik B. Kapal Q berlayar lurus ke arah timur sejauh 20 km dan berhenti di titik C. Hitung jarak dari B ke C! | 2隻の船が港Aを同時に出発します。船Pは東に36km進み、次に北に15km進んで点Bで止まります。船Qは真東に20km進んで点Cで止まります。BからCまでの距離を求めなさい！ | [36, 15, 20] | [2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx) | 53 | `c3ShipPDesc` | ja | 36 km timur, 15 km utara | 東へ36km、北へ15km | [36, 15] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx) | 55 | `c3ShipQDesc` | ja | 20 km timur, 0 km utara | 東へ20km、北へ0km | [20, 0] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx) | 15 | `subtitle` | ja | Kelas 8 · Teorema Pythagoras · Materi Matematika | 8年生 · ピタゴラスの定理 · 数学テキスト | [] | [8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MenghitungPanjangPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MenghitungPanjangPage.tsx) | 48 | `c1Ans` | ja | ✅ Panjang tangga adalah 10 m. | ✅ はしごの長さは10mです。 | [10] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MenghitungPanjangPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MenghitungPanjangPage.tsx) | 46 | `c1Problem` | ja | Sebuah tangga disandarkan ke dinding. Kaki tangga berjarak 6 m dari dinding, dan tinggi tembok yang dijangkau tangga adalah 8 m. Berapa panjang tangga tersebut? | はしごが壁に立てかけられています。はしごの足は壁から6m離れており、はしごは壁の高さ8mまで届きます。はしごの長さは何mですか？ | [6, 8] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MenghitungPanjangPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MenghitungPanjangPage.tsx) | 51 | `c2Ans` | ja | ✅ Tinggi layar kapal adalah 12 m. | ✅ 帆の高さは12mです。 | [12] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MenghitungPanjangPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MenghitungPanjangPage.tsx) | 49 | `c2Problem` | ja | Sebuah layar kapal berbentuk segitiga siku-siku. Sisi miringnya (tali layar terpanjang) adalah 13 m dan alas layarnya 5 m. Tentukan tinggi layar tersebut! | 船の帆は直角三角形の形をしています。斜辺（最も長い綱）は13m、帆の底辺は5mです。帆の高さを求めなさい！ | [13, 5] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MenghitungPanjangPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MenghitungPanjangPage.tsx) | 56 | `c3Ans2` | ja | m atau sekitar 11,40 m. | m、約11.40mです。 | [11.4] | [11] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MenghitungPanjangPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MenghitungPanjangPage.tsx) | 52 | `c3Problem` | ja | Sebuah lapangan berbentuk persegi panjang berukuran 7 m × 9 m. Seorang siswa berlari dari sudut A ke sudut C (diagonal lapangan). Berapa jarak yang ditempuh siswa tersebut? Nyatakan dalam bentuk akar sederhana! | 長方形のグラウンドの大きさは7m×9mです。生徒が角Aから角C（対角線）まで走ります。走った距離は何mですか？簡単な根号の形で答えなさい！ | [7, 9] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MenghitungPanjangPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MenghitungPanjangPage.tsx) | 31 | `introDesc` | ja | Dalam sebuah segitiga siku-siku, ada <strong>tiga sisi</strong>: dua kaki (a dan b) dan satu hipotenusa (c). Menggunakan Teorema Pythagoras, kita bisa mencari salah satu sisi jika dua sisi lainnya diketahui. Ada tiga skenario berbeda yang perlu kamu kuasai! | 直角三角形には<strong>3辺</strong>があります：2つの直角辺（aとb）と1つの斜辺（c）。ピタゴラスの定理を使えば、他の2辺がわかれば1辺を求められます。3つのシナリオをマスターしましょう！ | [3, 2, 1, 1, 2, 3] | [3, 2, 1, 2, 1, 3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MenghitungPanjangPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MenghitungPanjangPage.tsx) | 15 | `subtitle` | ja | Kelas 8 · Teorema Pythagoras · Materi Matematika | 8年生 · ピタゴラスの定理 · 数学テキスト | [] | [8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/SudutKhususPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/SudutKhususPage.tsx) | 67 | `c1Problem` | ja | Sebuah kain berbentuk segitiga siku-siku sama kaki dengan panjang kaki 10 cm. Berapa panjang sisi miringnya? | 直角二等辺三角形の形の布があり、直角辺の長さは10cmです。斜辺の長さは何cmですか？ | [10] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/SudutKhususPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/SudutKhususPage.tsx) | 78 | `c2Ans` | ja | ✅ Tiang lampu setinggi 6 m. | ✅ 街灯の高さは6mです。 | [6] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/SudutKhususPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/SudutKhususPage.tsx) | 79 | `c3Problem` | ja | Sebuah segitiga sama sisi ABC memiliki sisi 12 cm. Titik D adalah kaki tegak lurus dari A ke BC. Hitung panjang AD, lalu gunakan AD sebagai kaki segitiga 45-45-90 baru. Berapa hipotenusa segitiga baru itu? | 正三角形ABCの辺の長さは12cmです。点DはAからBCへ下ろした垂線の足です。ADの長さを求め、ADを新しい45-45-90三角形の直角辺として使います。新しい三角形の斜辺は何cmですか？ | [12, 45, 45, 90] | [45, 45, 90] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/SudutKhususPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/SudutKhususPage.tsx) | 82 | `c3Step2` | ja | Langkah 2: Segitiga baru 45-45-90 dengan kaki = AD = | ステップ2：直角辺 = AD = | [2, 45, 45, 90] | [2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/SudutKhususPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/SudutKhususPage.tsx) | 83 | `c3Step2b` | ja | cm. | cmの新しい45-45-90三角形。 | [] | [45, 45, 90] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/SudutKhususPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/SudutKhususPage.tsx) | 15 | `subtitle` | ja | Kelas 8 · Teorema Pythagoras · Materi Matematika | 8年生 · ピタゴラスの定理 · 数学テキスト | [] | [8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/TriplePythagorasPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/TriplePythagorasPage.tsx) | 26 | `introDesc2` | ja | . Jika kamu hafal triple-triple ini, kamu bisa langsung mengenali segitiga siku-siku tanpa perlu menghitung akar — ini trik cepat favorit para matematikawan! | を満たす3つの正の整数の組です。これらを覚えておけば、計算なしに直角三角形を即座に見分けられます — 数学者が愛用するテクニックです！ | [] | [3] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/TriplePythagorasPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/TriplePythagorasPage.tsx) | 27 | `introPic` | ja | Bayangkan kamu sedang di ujian dan muncul segitiga dengan kaki 5 cm dan 12 cm. Tanpa kalkulator, kamu bisa langsung bilang "hipotenusanya 13 cm!" karena kamu hafal triple | 試験で直角辺が5cmと12cmの三角形が出たとしましょう。計算機なしで「斜辺は13cm！」とすぐに言えます。なぜなら | [5, 12, 13] | [] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/TriplePythagorasPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/TriplePythagorasPage.tsx) | 15 | `subtitle` | ja | Kelas 8 · Teorema Pythagoras · Materi Matematika | 8年生 · ピタゴラスの定理 · 数学テキスト | [] | [8] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/DilatasisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/DilatasisPage.tsx) | 1869 | `$value` | ja | Dilatasi adalah satu-satunya transformasi di antara keempat jenis yang mengubah ukuran bangun. Faktor skala k menentukan segalanya: besar/kecil, arah, dan posisi bayangan. Dilatasi bukan isometri karena ukurannya berubah, tetapi bentuk tetap sama (sebangun). Kuasai rumus pusat O dan pusat P(a,b), serta ingat bahwa luas bayangan = k² × luas asal! | 拡大・縮小は、4種類の変換の中で唯一図形の大きさを変える変換です。拡大率kがすべてを決定します：大小、向き、像の位置。拡大・縮小は大きさが変わるため等長変換ではありませんが、形は変わりません（相似）。中心Oと中心P(a,b)の公式をマスターし、像の面積 = k² × 元の面積であることを忘れずに！ | [1] | [4] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/TranslasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/TranslasiPage.tsx) | 1083 | `card1title` | ja | 📌 Titik tunggal | 📌 1点の場合 | [] | [1] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/TranslasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/TranslasiPage.tsx) | 1060 | `ex2soal` | ja | Garis 2x - y + 1 = 0 ditranslasikan dua kali berturut-turut oleh T_1\begin{pmatrix}3\\-2\end{pmatrix} kemudian T_2\begin{pmatrix}-1\\4\end{pmatrix}. Tentukan persamaan bayangan akhir garis tersebut! | 直線 2x - y + 1 = 0 を T_1\begin{pmatrix}3\\-2\end{pmatrix}、次に T_2\begin{pmatrix}-1\\4\end{pmatrix} で2回連続して平行移動する。最終的な像の方程式を求めなさい！ | [1, 0, 2, 3, -2, -1, 4] | [1, 0, 3, -2, -1, 4, 2] |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/TranslasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/TranslasiPage.tsx) | 1026 | `soalC` | ja | Tentukan bayangan titik A(-3, 2) oleh translasi T = \begin{pmatrix}4\\2\end{pmatrix} | 移動ベクトル T = \begin{pmatrix}4\\2\end{pmatrix} による点 A(-3, 2) の像を求めなさい。 | [-3, 2, 4, 2] | [4, 2, -3, 2] |

### Contoh perbaikan ekstraksi angka

| Teks | Bahasa | Ekstraktor lama | Setelah perbaikan |
| --- | --- | --- | --- |
| `1.234,5` | id | [1234.5] | [1234.5] |
| `1,234.5` | en | [1234.5] | [1234.5] |
| `Rp1.234.500` | id | [234500] | [1234500] |
| `$1,234,500` | en | [1234500] | [1234500] |
| `1\,234{,}5` | ru | [1, 234, 5] | [1234.5] |
| `4,\underline{6}38` | id | [4, 6, 38] | [4.638] |
| `2nd decimal` | en | [—] | [2] |
| `中学1年` | ja | [—] | [—] |

False positive yang terkonfirmasi: ekstraktor lama memecah `4,\underline{6}38` menjadi tiga angka (`4`, `6`, `38`), bukan satu desimal (`4.638`); notasi KaTeX `1\,234{,}5` juga terpecah menjadi tiga angka. Perbaikan membuka markup KaTeX, membaca awalan mata wang `Rp`, menangani akhiran ordinal Inggris, dan mengecualikan angka label jenjang lintas bahasa.

### Contoh konkret untuk 5 file teratas

Nilai dipendekkan bila terlalu panjang. Hanya kelas nilai-beda dan ambigu-pemisah dihitung sebagai ketidaksesuaian angka.

#### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx)

| Key | Nilai id | Nilai en | Jenis | Pemeriksaan angka |
| --- | --- | --- | --- | --- |
| `s1e2Q` | Tentukan hasil penjumlahan 9{,}754 + 52{,}18 | Find the sum of 9{,}754 + 52{,}18 | d — ambigu-pemisah (id vs en) | token/pemisah angka sama; tafsir locale berbeda: id=[9.754, 52.18], en=[9754, 52.18] |
| `s1e2ans` | ∴ Jadi, hasil penjumlahannya adalah 61{,}934 | ∴ Therefore, the sum is 61{,}934 | d — ambigu-pemisah (id vs en) | token/pemisah angka sama; tafsir locale berbeda: id=[61.934], en=[61934] |
| `s1e2s1` | Langkah 1: 52{,}18 punya 2 digit desimal, 9{,}754 punya 3 digit. Tambah 1 nol pada 52{,}18 → 52{,}180 | Step 1: 52{,}18 has 2 decimal digits, 9{,}754 has 3. Add 1 zero to 52{,}18 → 52{,}180 | d — ambigu-pemisah (id vs en) | token/pemisah angka sama; tafsir locale berbeda: id=[1, 52.18, 2, 9.754, 3, 1, 52.18, 52.18], en=[1, 52.18, 2, 9754, 3, 1, 52.18, 52180] |
| `s1e3Q` | Sebuah proyek jalan membutuhkan 3 gulungan kawat. Gulungan pertama sepanjang 934{,}456 m, gulungan kedua sepanjang 70{,}806 m, dan gulungan ketiga sepanjang 8{,}34 m. Berapa meter… | A road project needs 3 rolls of wire. The first roll is 934{,}456 m long, the second is 70{,}806 m long, and the third is 8{,}34 m long. What is the total length of wire needed? | d — ambigu-pemisah (id vs en) | token/pemisah angka sama; tafsir locale berbeda: id=[3, 934.456, 70.806, 8.34], en=[3, 934456, 70806, 8.34] |
| `s1e3ans` | ∴ Jadi, total panjang kawat yang dibutuhkan adalah 1013{,}602 m | ∴ Therefore, the total length of wire needed is 1013{,}602 m | d — ambigu-pemisah (id vs en) | token/pemisah angka sama; tafsir locale berbeda: id=[1013.602], en=[1013602] |

#### [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx)

| Key | Nilai id | Nilai en | Jenis | Pemeriksaan angka |
| --- | --- | --- | --- | --- |
| `s2e2qMembers` | Anggota Q: {2, 3, 5, 7, 11, 13, 17, 19} → n(Q) = 8. | Members of Q: {2,3,5,7,11,13,17,19} → n(Q) = 8. | d — nilai-beda (id vs en) | beda nilai setelah normalisasi: id=[2, 3, 5, 7, 11, 13, 17, 19, 8], en=[2357111317.19, 8] |
| `s3e1cRes` | E ⊆ F (2, 4, 6 semuanya ada di F). E ⊂ F (sejati). | E ⊆ F (2,4,6 are all in F). E ⊂ F (proper subset). | d — nilai-beda (id vs en) | beda nilai setelah normalisasi: id=[2, 4, 6], en=[24.6] |
| `s3e1opts[]` | E = {2, 4, 6} dan F = {1, 2, 3, 4, 5, 6} | E = {2,4,6} and F = {1,2,3,4,5,6} | d — nilai-beda (id vs en) | beda nilai setelah normalisasi: id=[2, 4, 6, 1, 2, 3, 4, 5, 6], en=[24.6, 12345.6] |
| `s3e3q` | Diberikan himpunan S = {1, 2, 3, 4}. Tentukan: | Given S = {1,2,3,4}. Find: | d — nilai-beda (id vs en) | beda nilai setelah normalisasi: id=[1, 2, 3, 4], en=[123.4] |
| `s4e1aAns` | S = {1,2,3,...,10} atau S = {bilangan asli ≤ 10}. P adalah himpunan bilangan genap dalam S. | S = {1,2,...,10} or S = {natural numbers ≤ 10}. P is the set of even numbers in S. | d — nilai-beda (id vs en) | beda nilai setelah normalisasi: id=[12.3, 10, 10], en=[1.2, 10, 10] |

#### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx)

| Key | Nilai id | Nilai en | Jenis | Pemeriksaan angka |
| --- | --- | --- | --- | --- |
| `ex1Q` | Bulatkan 4,638 sampai satu desimal | Round 4,638 to one decimal place | d — ambigu-pemisah (id vs en) | token/pemisah angka sama; tafsir locale berbeda: id=[4.638], en=[4638] |
| `ex1s1desc` | 4,\underline{6}38 - Angka 6 adalah desimal ke-1 (yang akan dipertahankan) | 4,\underline{6}38 — digit 6 is the 1st decimal (the one to keep) | d — ambigu-pemisah (id vs en) | token/pemisah angka sama; tafsir locale berbeda: id=[4.638, 6, 1], en=[4638, 6, 1] |
| `ex6Q` | Bulatkan 319,837 ke bilangan satuan terdekat | Round 319,837 to the nearest whole number | d — ambigu-pemisah (id vs en) | token/pemisah angka sama; tafsir locale berbeda: id=[319.837], en=[319837] |
| `ex6s1desc` | 31\underline{9},837 - Satuan = 9, Persepuluhan = 8 | 31\underline{9},837 — ones digit = 9, tenths digit = 8 | d — ambigu-pemisah (id vs en) | token/pemisah angka sama; tafsir locale berbeda: id=[319.837, 9, 8], en=[319837, 9, 8] |
| `ex8Q` | Seorang atlet berlari sejauh 10,473 km dalam latihan maraton. Untuk catatan pribadi, ia ingin membulatkan jarak tersebut ke dua desimal. Berapa jarak yang dicatat? | An athlete ran 10,473 km in marathon training. For personal records, they want to round the distance to two decimal places. What distance is recorded? | d — ambigu-pemisah (id vs en) | token/pemisah angka sama; tafsir locale berbeda: id=[10.473], en=[10473] |

#### [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx)

| Key | Nilai id | Nilai en | Jenis | Pemeriksaan angka |
| --- | --- | --- | --- | --- |
| `k3_s3_adj_angles` | (sudut-sudut berdekatan) | (adjacent angles supplement to 180°) | d — nilai-beda (id vs en) | angka digit hanya ditemukan di en; kemungkinan angka lain ditulis dengan kata, perlu review |
| `c4_q` | Dua persegi kongruen masing-masing memiliki panjang sisi | Two congruent squares each have a side length of | d — nilai-beda (id vs ja) | beda nilai setelah normalisasi: id=[2], ja=[2, 1] |
| `k2_ara` | ③ Syarat ARA / AAR / RAA — Sudut-Sisi-Sudut / Sudut-Sudut-Sisi / Sisi-Sudut-Sudut | ③ Condition ASA / AAS / SAA — Angle-Side-Angle / Angle-Angle-Side / Side-Angle-Angle | d — nilai-beda (id vs ja) | angka digit hanya ditemukan di ja; kemungkinan angka lain ditulis dengan kata, perlu review |
| `k2_p1` | Untuk membuktikan dua segitiga kongruen, cukup tunjukkan | To prove two triangles congruent, it suffices to show | d — nilai-beda (id vs ja) | beda nilai setelah normalisasi: id=[2], ja=[2, 4] |
| `k2_p1c` | dari 4 syarat berikut: | of these 4 conditions: | d — nilai-beda (id vs ja) | angka digit hanya ditemukan di id; kemungkinan angka lain ditulis dengan kata, perlu review |

#### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx)

| Key | Nilai id | Nilai en | Jenis | Pemeriksaan angka |
| --- | --- | --- | --- | --- |
| `ex3Q` | Hitunglah hasil pembagian 3456,78 \div 100.000 | Calculate 3456,78 \div 100.000 | d — ambigu-pemisah (id vs en) | token/pemisah angka sama; tafsir locale berbeda: id=[3456.78, 100000], en=[3456.78, 100] |
| `ex4Q` | Hitunglah hasil pembagian 14,245 \div 0,7 | Calculate 14,245 \div 0,7 | d — ambigu-pemisah (id vs en) | token/pemisah angka sama; tafsir locale berbeda: id=[14.245, 0.7], en=[14245, 0.7] |
| `ex5Q` | Hitunglah hasil pembagian 1,03248 \div 0,012 | Calculate 1,03248 \div 0,012 | d — ambigu-pemisah (id vs en) | token/pemisah angka sama; tafsir locale berbeda: id=[1.03248, 0.012], en=[1.03248, 12] |
| `ex3Q` | Hitunglah hasil pembagian 3456,78 \div 100.000 | Calculate 3456,78 \div 100.000 | d — ambigu-pemisah (id vs ja) | token/pemisah angka sama; tafsir locale berbeda: id=[3456.78, 100000], ja=[3456.78, 100] |
| `ex3s2desc` | Kita perlu menambah 1 angka nol di depan: 03456,78 | We need to add 1 zero at the front: 03456,78 | d — nilai-beda (id vs ja) | beda nilai setelah normalisasi: id=[1, 3456.78], ja=[0, 1, 3456.78] |

### File tanpa terjemahan yang terdeteksi

| File | Klasifikasi |
| --- | --- |
| [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/BukuAnimasiPenjumlahanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/BukuAnimasiPenjumlahanPage.tsx) | halaman konten |

## Cakupan per topik

| Topik | File | File dengan cabang ja | Memakai pickLang | Tanpa terjemahan sama sekali |
| --- | ---: | ---: | ---: | --- |
| (root) | 26 | 26 | 5 | — |
| [`aljabar`](../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar) | 8 | 8 | 8 | — |
| [`aritmetika-sosial`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial) | 6 | 6 | 0 | — |
| [`bangun-ruang-sisi-datar`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-datar) | 5 | 5 | 0 | — |
| [`bangun-ruang-sisi-lengkung`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung) | 5 | 5 | 0 | — |
| [`bilangan-berpangkat`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat) | 4 | 4 | 0 | — |
| [`bilangan-bulat`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat) | 7 | 6 | 4 | `BukuAnimasiPenjumlahanPage.tsx` |
| [`bilangan-rasional`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional) | 10 | 10 | 10 | — |
| [`fungsi-kuadrat`](../artifacts/numatik/src/pages/buku-animasi-matematika/fungsi-kuadrat) | 6 | 6 | 0 | — |
| [`garis-dan-sudut`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut) | 4 | 4 | 0 | — |
| [`garis-singgung-lingkaran`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran) | 5 | 5 | 4 | — |
| [`himpunan`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan) | 5 | 5 | 0 | — |
| [`kesebangunan-kekongruenan`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan) | 5 | 5 | 5 | — |
| [`koordinat-cartesius`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius) | 5 | 5 | 4 | — |
| [`lingkaran`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran) | 7 | 7 | 7 | — |
| [`peluang`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang) | 6 | 5 | 0 | — |
| [`perbandingan`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan) | 5 | 5 | 0 | — |
| [`persamaan-garis-lurus`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus) | 5 | 5 | 0 | — |
| [`persamaan-kuadrat`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-kuadrat) | 7 | 4 | 0 | — |
| [`plsv-ptlsv`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv) | 7 | 7 | 7 | — |
| [`pola-bilangan`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan) | 4 | 4 | 4 | — |
| [`relasi-fungsi`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi) | 6 | 6 | 5 | — |
| [`segitiga-segiempat`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat) | 5 | 5 | 5 | — |
| [`spldv`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv) | 7 | 7 | 7 | — |
| [`statistika`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika) | 6 | 6 | 0 | — |
| [`teorema-pythagoras`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras) | 6 | 6 | 0 | — |
| [`transformasi-geometri`](../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri) | 4 | 4 | 0 | — |

### Topik yang diminta

| Topik | Folder ada | Berisi terjemahan |
| --- | --- | --- |
| Perbandingan | Ya | Ya |
| Himpunan | Ya | Ya |
| Garis dan Sudut | Ya | Ya |
| Aritmetika Sosial | Ya | Ya |
| PGL | Ya | Ya |
| Teorema Pythagoras | Ya | Ya |
| Bangun Ruang Sisi Datar | Ya | Ya |
| Bilangan Berpangkat | Ya | Ya |
| Kesebangunan | Ya | Ya |
| Transformasi Geometri | Ya | Ya |
| BRSL | Ya | Ya |
| Statistika | Ya | Ya |
| Peluang | Ya | Ya |
| Fungsi Kuadrat | Ya | Ya |
| Persamaan Kuadrat | Ya | Ya |

## Topik (root)

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/AljabarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/AljabarPage.tsx)

#### Peta 1: `translations` (baris 8)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/AritmetikaSosialPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/AritmetikaSosialPage.tsx)

#### Peta 1: `titles` (baris 31)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `kelasMap` (baris 32)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `backLabelMap` (baris 33)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/BilanganBulatPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/BilanganBulatPage.tsx)

#### Peta 1: `translations` (baris 8)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/BilanganRasionalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/BilanganRasionalPage.tsx)

#### Peta 1: `translations` (baris 5)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/GarisDanSudutPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/GarisDanSudutPage.tsx)

#### Peta 1: `titles` (baris 25)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `kelas` (baris 26)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `backLabel` (baris 27)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/GarisSinggungLingkaranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/GarisSinggungLingkaranPage.tsx)

#### Peta 1: `titles` (baris 28)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `kelas` (baris 29)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `backLabels` (baris 30)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/HimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/HimpunanPage.tsx)

#### Peta 1: `titles` (baris 25)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `kelas` (baris 26)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `backLabel` (baris 27)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/KesebangunanKekongruenPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/KesebangunanKekongruenPage.tsx)

#### Peta 1: `object@87` (baris 87)
Bahasa: id, en, ms-MY, ja, zh-CN, ru
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `locale constants@1` (baris 5)
Bahasa: id, en, ja, ru
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/KoordinatCartesiusPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/KoordinatCartesiusPage.tsx)

#### Peta 1: `data` (baris 7)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/LingkaranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/LingkaranPage.tsx)

#### Peta 1: `titles` (baris 34)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `kelas` (baris 35)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `backLabels` (baris 36)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/PLSVPtLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/PLSVPtLSVPage.tsx)

#### Peta 1: `content` (baris 7)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/PerbandinganPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/PerbandinganPage.tsx)

#### Peta 1: `titles` (baris 28)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `kelas` (baris 29)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `backLabel` (baris 30)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/PolaBilanganPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/PolaBilanganPage.tsx)

#### Peta 1: `titles` (baris 22)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `kelas` (baris 23)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `backLabels` (baris 24)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/RelasiFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/RelasiFungsiPage.tsx)

#### Peta 1: `translations` (baris 4)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/SPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/SPLDVPage.tsx)

#### Peta 1: `translations` (baris 5)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/SegitigaSegiempatPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/SegitigaSegiempatPage.tsx)

#### Peta 1: `titles` (baris 28)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `kelas` (baris 29)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `backLabel` (baris 30)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.


## Topik aljabar

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/FaktorisasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/FaktorisasiPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/OperasiPecahanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/OperasiPecahanPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/PemangkatanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/PemangkatanPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/PembagianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/PembagianPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/PengertianUnsurPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/PengertianUnsurPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `ex3Q` (id vs ja; adaptasi-nama-konteks):** id=[], ja=[1]
- **Angka berbeda pada `ex3Q2` (id vs ja; adaptasi-nama-konteks):** id=[], ja=[1]
- **Angka berbeda pada `sukuSejenisDesc3` (id vs ja; adaptasi-nama-konteks):** id=[], ja=[2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/PenjumlahanPenguranganPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/PenjumlahanPenguranganPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/PerkalianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/PerkalianPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/SubstitusiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aljabar/SubstitusiPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.


## Topik aritmetika-sosial

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BrutoNettoTaraPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BrutoNettoTaraPage.tsx)

#### Peta 1: `T` (baris 17)
Bahasa: id, en, ja
- **Angka berbeda pada `quiz[].penjelasan` (id vs en; nilai-beda):** id=[1, 1, 0.05, 2, 1.9, 10, 1.9, 19], en=[1, 0.05, 2, 1.9, 10, 1.9, 19]
- **Angka berbeda pada `soalContoh[].jawaban` (id vs en; adaptasi-mata-uang):** id=[1152000], en=[1152]
- **Angka berbeda pada `soalContoh[].langkah[].isi` (id vs en; adaptasi-mata-uang):** id=[6, 20, 4, 90000, 100000], en=[6, 20, 4, 90, 100]
- **Angka berbeda pada `soalContoh[].soal` (id vs en; adaptasi-mata-uang):** id=[6, 20, 4, 90000, 100000], en=[6, 20, 4, 90, 100]
- **Angka berbeda pada `multiBruto` (id vs ja; adaptasi-nama-konteks):** id=[], ja=[1]
- **Angka berbeda pada `soalContoh[].jawaban` (id vs ja; adaptasi-mata-uang):** id=[1152000], ja=[1152]
- **Angka berbeda pada `soalContoh[].langkah[].isi` (id vs ja; adaptasi-mata-uang):** id=[6, 20, 4, 90000, 100000], ja=[6, 20, 4, 90, 100]
- **Angka berbeda pada `soalContoh[].soal` (id vs ja; adaptasi-mata-uang):** id=[6, 20, 4, 90000, 100000], ja=[6, 20, 4, 90, 100]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BungaTunggalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/BungaTunggalPage.tsx)

#### Peta 1: `translations` (baris 25)
Bahasa: id, en, ja
- **Angka berbeda pada `analogiBody` (id vs en; adaptasi-mata-uang):** id=[500000, 10, 50000, 50000], en=[500, 10, 50, 50]
- **Angka berbeda pada `phModal` (id vs en; nilai-beda):** id=[2000000], en=[2000]
- **Angka berbeda pada `quiz[].penjelasan` (id vs en; adaptasi-mata-uang):** id=[5000000, 2, 0.15, 1500000], en=[5000, 2, 0.15, 1500]
- **Angka berbeda pada `quiz[].pilihan[]` (id vs en; adaptasi-mata-uang):** id=[2500000], en=[2500]
- **Angka berbeda pada `quiz[].soal` (id vs en; adaptasi-mata-uang):** id=[5000000, 15, 2], en=[5000, 15, 2]
- **Angka berbeda pada `soalContoh[].jawaban` (id vs en; adaptasi-mata-uang):** id=[3000000], en=[3000]
- **Angka berbeda pada `soalContoh[].langkah[].isi` (id vs en; adaptasi-mata-uang):** id=[3600000, 0.08, 2.5], en=[3600, 0.08, 2.5]
- **Angka berbeda pada `soalContoh[].soal` (id vs en; adaptasi-mata-uang):** id=[2.5, 8, 3600000], en=[2.5, 8, 3600]
- **Angka berbeda pada `analogiBody` (id vs ja; adaptasi-mata-uang):** id=[500000, 10, 1, 50000, 2, 50000], ja=[500, 10, 1, 50, 2, 50]
- **Angka berbeda pada `phModal` (id vs ja; nilai-beda):** id=[2000000], ja=[2000]
- **Angka berbeda pada `quiz[].penjelasan` (id vs ja; adaptasi-mata-uang):** id=[5000000, 2, 0.15, 1500000], ja=[5000, 2, 0.15, 1500]
- **Angka berbeda pada `quiz[].pilihan[]` (id vs ja; adaptasi-mata-uang):** id=[2500000], ja=[2500]
- **Angka berbeda pada `quiz[].soal` (id vs ja; adaptasi-mata-uang):** id=[5000000, 15, 2], ja=[5000, 15, 2]
- **Angka berbeda pada `soalContoh[].jawaban` (id vs ja; adaptasi-mata-uang):** id=[3000000], ja=[3000]
- **Angka berbeda pada `soalContoh[].langkah[].isi` (id vs ja; adaptasi-mata-uang):** id=[3600000, 0.08, 2.5], ja=[3600, 0.08, 2.5]
- **Angka berbeda pada `soalContoh[].soal` (id vs ja; nilai-beda):** id=[2.5, 8, 3600000], ja=[8, 2.5, 3600]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/DiskonPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/DiskonPage.tsx)

#### Peta 1: `translations` (baris 26)
Bahasa: id, en, ja
- **Angka berbeda pada `kalkPH` (id vs en; nilai-beda):** id=[300000], en=[300]
- **Angka berbeda pada `kalkPHBayar` (id vs en; nilai-beda):** id=[240000], en=[240]
- **Angka berbeda pada `persenDiskonContohSoal` (id vs en; adaptasi-mata-uang):** id=[750000, 525000], en=[750, 525]
- **Angka berbeda pada `quiz[].penjelasan` (id vs en; adaptasi-mata-uang):** id=[225000, 100, 25, 225000, 0.75, 300000], en=[225, 100, 25, 225, 0.75, 300]
- **Angka berbeda pada `quiz[].pilihan[]` (id vs en; adaptasi-mata-uang):** id=[350000], en=[350]
- **Angka berbeda pada `quiz[].soal` (id vs en; nilai-beda):** id=[25, 225000], en=[225, 25]
- **Angka berbeda pada `rumus[].contoh` (id vs en; adaptasi-mata-uang):** id=[400000, 300000, 100000, 400000, 100, 25], en=[400, 300, 100, 400, 100, 25]
- **Angka berbeda pada `soalContoh[].jawaban` (id vs en; adaptasi-mata-uang):** id=[68000], en=[68]
- **Angka berbeda pada `soalContoh[].langkah[].isi` (id vs en; adaptasi-mata-uang):** id=[400000, 650000, 20, 10], en=[400, 650, 20, 10]
- **Angka berbeda pada `soalContoh[].soal` (id vs en; adaptasi-mata-uang):** id=[400000, 650000, 20, 10], en=[400, 650, 20, 10]
- **Angka berbeda pada `kalkPH` (id vs ja; nilai-beda):** id=[300000], ja=[300]
- **Angka berbeda pada `kalkPHBayar` (id vs ja; nilai-beda):** id=[240000], ja=[240]
- **Angka berbeda pada `persenDiskonContohSoal` (id vs ja; adaptasi-mata-uang):** id=[750000, 525000], ja=[750, 525]
- **Angka berbeda pada `quiz[].penjelasan` (id vs ja; adaptasi-mata-uang):** id=[225000, 100, 25, 225000, 0.75, 300000], ja=[225, 100, 25, 225, 0.75, 300]
- **Angka berbeda pada `quiz[].pilihan[]` (id vs ja; adaptasi-mata-uang):** id=[350000], ja=[350]
- **Angka berbeda pada `quiz[].soal` (id vs ja; adaptasi-mata-uang):** id=[25, 225000], ja=[25, 225]
- **Angka berbeda pada `rumus[].contoh` (id vs ja; adaptasi-mata-uang):** id=[400000, 300000, 100000, 400000, 100, 25], ja=[400, 300, 100, 400, 100, 25]
- **Angka berbeda pada `soalContoh[].jawaban` (id vs ja; adaptasi-mata-uang):** id=[68000], ja=[68]
- **Angka berbeda pada `soalContoh[].langkah[].isi` (id vs ja; adaptasi-mata-uang):** id=[400000, 650000, 20, 10], ja=[400, 650, 20, 10]
- **Angka berbeda pada `soalContoh[].soal` (id vs ja; adaptasi-mata-uang):** id=[400000, 650000, 20, 10], ja=[400, 650, 20, 10]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage.tsx)

#### Peta 1: `translations` (baris 26)
Bahasa: id, en, ja
- **Angka berbeda pada `c1Known` (id vs en; adaptasi-mata-uang):** id=[180000, 225000], en=[180, 225]
- **Angka berbeda pada `c1Q` (id vs en; nilai-beda):** id=[1, 180000, 225000], en=[180, 225]
- **Angka berbeda pada `c1Result` (id vs en; adaptasi-mata-uang):** id=[45000, 25], en=[45, 25]
- **Angka berbeda pada `c2Known` (id vs en; adaptasi-mata-uang):** id=[240000, 35], en=[240, 35]
- **Angka berbeda pada `c2Q` (id vs en; adaptasi-mata-uang):** id=[240000, 35], en=[240, 35]
- **Angka berbeda pada `c2Result` (id vs en; adaptasi-mata-uang):** id=[324000], en=[324]
- **Angka berbeda pada `c3Known` (id vs en; adaptasi-mata-uang):** id=[680000, 15], en=[680, 15]
- **Angka berbeda pada `c3Q` (id vs en; adaptasi-mata-uang):** id=[680000, 15], en=[680, 15]
- **Angka berbeda pada `c3Result` (id vs en; adaptasi-mata-uang):** id=[800000, 120000], en=[800, 120]
- **Angka berbeda pada `c4Known1` (id vs en; adaptasi-mata-uang):** id=[50000], en=[50]
- **Angka berbeda pada `c4Known2` (id vs en; adaptasi-mata-uang):** id=[7, 6000, 42000], en=[7, 6, 42]
- **Angka berbeda pada `c4Note` (id vs en; adaptasi-mata-uang):** id=[50000, 50000, 6000, 9], en=[50, 50, 6, 9]
- **Angka berbeda pada `c4Q` (id vs en; adaptasi-mata-uang):** id=[10, 50000, 7, 6000], en=[10, 50, 7, 6]
- **Angka berbeda pada `c4Result` (id vs en; adaptasi-mata-uang):** id=[8000, 9], en=[8, 9]
- **Angka berbeda pada `hbInputPH` (id vs en; nilai-beda):** id=[200000], en=[200]
- **Angka berbeda pada `hjInputPH` (id vs en; nilai-beda):** id=[250000], en=[250]
- **Angka berbeda pada `impasContoh` (id vs en; adaptasi-mata-uang):** id=[25000, 25000], en=[25, 25]
- **Angka berbeda pada `pctUntungEx` (id vs en; adaptasi-mata-uang):** id=[20000, 100000], en=[20, 100]
- **Angka berbeda pada `quiz[].penjelasan` (id vs en; adaptasi-mata-uang):** id=[100, 100, 20, 480000, 100, 120, 480000, 400000], en=[100, 100, 20, 480, 100, 120, 480, 400]
- **Angka berbeda pada `quiz[].pilihan[]` (id vs en; adaptasi-mata-uang):** id=[420000], en=[420]
- **Angka berbeda pada `quiz[].soal` (id vs en; adaptasi-mata-uang):** id=[20, 480000], en=[20, 480]
- **Angka berbeda pada `secIntroBody` (id vs en; adaptasi-mata-uang):** id=[150000, 180000], en=[150, 180]
- **Angka berbeda pada `tips[].isi` (id vs en; adaptasi-mata-uang):** id=[100000, 20, 100000], en=[100, 20, 100]
- **Angka berbeda pada `c1Known` (id vs ja; adaptasi-mata-uang):** id=[180000, 225000], ja=[180, 225]
- **Angka berbeda pada `c1Q` (id vs ja; adaptasi-mata-uang):** id=[1, 180000, 225000], ja=[1, 180, 225]
- **Angka berbeda pada `c1Result` (id vs ja; adaptasi-mata-uang):** id=[45000, 25], ja=[45, 25]
- **Angka berbeda pada `c2Known` (id vs ja; adaptasi-mata-uang):** id=[240000, 35], ja=[240, 35]
- **Angka berbeda pada `c2Q` (id vs ja; nilai-beda):** id=[240000, 35], ja=[1, 240, 35]
- **Angka berbeda pada `c2Result` (id vs ja; adaptasi-mata-uang):** id=[324000], ja=[324]
- **Angka berbeda pada `c3Known` (id vs ja; adaptasi-mata-uang):** id=[680000, 15], ja=[680, 15]
- **Angka berbeda pada `c3Q` (id vs ja; adaptasi-mata-uang):** id=[680000, 15], ja=[680, 15]
- **Angka berbeda pada `c3Result` (id vs ja; adaptasi-mata-uang):** id=[800000, 120000], ja=[800, 120]
- **Angka berbeda pada `c4Known1` (id vs ja; adaptasi-mata-uang):** id=[50000], ja=[50]
- **Angka berbeda pada `c4Known2` (id vs ja; adaptasi-mata-uang):** id=[7, 6000, 42000], ja=[7, 6, 42]
- **Angka berbeda pada `c4Note` (id vs ja; adaptasi-mata-uang):** id=[50000, 50000, 6000, 9], ja=[50, 50, 6, 9]
- **Angka berbeda pada `c4Q` (id vs ja; nilai-beda):** id=[10, 50000, 7, 6000], ja=[10, 50, 7, 1, 6]
- **Angka berbeda pada `c4Result` (id vs ja; adaptasi-mata-uang):** id=[8000, 9], ja=[8, 9]
- **Angka berbeda pada `hbInputPH` (id vs ja; nilai-beda):** id=[200000], ja=[200]
- **Angka berbeda pada `hjInputPH` (id vs ja; nilai-beda):** id=[250000], ja=[250]
- **Angka berbeda pada `impasContoh` (id vs ja; adaptasi-mata-uang):** id=[25000, 25000], ja=[25, 25]
- **Angka berbeda pada `pctUntungEx` (id vs ja; nilai-beda):** id=[20000, 100000], ja=[100, 20]
- **Angka berbeda pada `quiz[].penjelasan` (id vs ja; adaptasi-mata-uang):** id=[100, 100, 20, 480000, 100, 120, 480000, 400000], ja=[100, 100, 20, 480, 100, 120, 480, 400]
- **Angka berbeda pada `quiz[].pilihan[]` (id vs ja; adaptasi-mata-uang):** id=[420000], ja=[420]
- **Angka berbeda pada `quiz[].soal` (id vs ja; adaptasi-mata-uang):** id=[20, 480000], ja=[20, 480]
- **Angka berbeda pada `secIntroBody` (id vs ja; adaptasi-mata-uang):** id=[150000, 180000, 2], ja=[150, 180, 2]
- **Angka berbeda pada `tips[].isi` (id vs ja; adaptasi-mata-uang):** id=[100000, 20, 100000], ja=[100, 20, 100]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPNPage.tsx)

#### Peta 1: `T` (baris 55)
Bahasa: id, en, ja
- **Angka berbeda pada `contoh[].math2` (id vs en; nilai-beda):** id=[102000, 1.11, 220], en=[102000, 1, 11, 220]
- **Angka berbeda pada `contoh[].noteKatex` (id vs en; nilai-beda):** id=[120000, 1.11, 200], en=[120000, 1, 11, 200]
- **Angka berbeda pada `contoh[].math1` (id vs ja; nilai-beda):** id=[120000, 100, 15, 120000, 85, 0], ja=[120000, 100, 15, 120000, 85, 102000]
- **Angka berbeda pada `contoh[].math2` (id vs ja; nilai-beda):** id=[102000, 1.11, 220], ja=[102000, 1, 11, 113220]
- **Angka berbeda pada `contoh[].noteKatex` (id vs ja; nilai-beda):** id=[120000, 1.11, 200], ja=[120000, 1, 11, 133200]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPhPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/aritmetika-sosial/PPhPage.tsx)

#### Peta 1: `T` (baris 65)
Bahasa: id, en, ja
- **Angka berbeda pada `tarifTable[].pkp` (id vs en; nilai-beda):** id=[500], en=[]
- **Angka berbeda pada `contoh[].maths2[]` (id vs ja; nilai-beda):** id=[5, 0], ja=[5, 0, 0]
- **Angka berbeda pada `contoh[].soal` (id vs ja; nilai-beda):** id=[8000000, 3000000, 4750000], ja=[800, 300, 475]
- **Angka berbeda pada `contoh[].steps` (id vs ja; nilai-beda):** id=[8000000, 3000000, 4750000], ja=[800, 300, 475]
- **Angka berbeda pada `tarifTable[].pkp` (id vs ja; nilai-beda):** id=[500], ja=[5]


## Topik bangun-ruang-sisi-datar

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-datar/BalokPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-datar/BalokPage.tsx)

#### Peta 1: `labels` (baris 34)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `translations` (baris 1597)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-datar/GabunganPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-datar/GabunganPage.tsx)

#### Peta 1: `translations` (baris 862)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-datar/KubusPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-datar/KubusPage.tsx)

#### Peta 1: `translations` (baris 1906)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-datar/LimasPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-datar/LimasPage.tsx)

#### Peta 1: `translations` (baris 1520)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-datar/PrismaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-datar/PrismaPage.tsx)

#### Peta 1: `object@1396` (baris 1396)
Bahasa: id, en, ja
- **Angka berbeda pada `subtitle` (id vs ja; nilai-beda):** id=[], ja=[2]


## Topik bangun-ruang-sisi-lengkung

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/BolaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/BolaPage.tsx)

#### Peta 1: `object@19` (baris 19)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `object@270` (baris 270)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `object@1132` (baris 1132)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 4: `object@1139` (baris 1139)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 5: `object@1218` (baris 1218)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 6: `object@1309` (baris 1309)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 7: `object@1363` (baris 1363)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 8: `object@1420` (baris 1420)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 9: `object@1684` (baris 1684)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 10: `object@1685` (baris 1685)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 11: `object@1686` (baris 1686)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 12: `object@2482` (baris 2482)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/GabunganPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/GabunganPage.tsx)

#### Peta 1: `object@142` (baris 142)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `object@390` (baris 390)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `object@677` (baris 677)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 4: `object@833` (baris 833)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 5: `object@834` (baris 834)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 6: `object@835` (baris 835)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 7: `object@841` (baris 841)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 8: `object@869` (baris 869)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 9: `object@875` (baris 875)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 10: `object@956` (baris 956)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/KerucutPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/KerucutPage.tsx)

#### Peta 1: `cone3DLabels` (baris 42)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `unsurSvgLabels` (baris 267)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `luasKerucutSvgLabels` (baris 342)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 4: `coneNetAnimTrans` (baris 600)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 5: `kerucutCountSvgLabels` (baris 938)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 6: `selimutJuringSvgLabels` (baris 992)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 7: `soalUnsurTrans` (baris 1170)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 8: `unsurQuizUiTrans` (baris 1289)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 9: `pageTrans` (baris 1509)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 10: `slide1Trans` (baris 1516)
Bahasa: id, en, ja
- **Angka berbeda pada `quoteText` (id vs ja; nilai-beda):** id=[2, 2], ja=[2, 1]

#### Peta 11: `slide2Trans` (baris 1585)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 12: `slide3Trans` (baris 1700)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 13: `slide4Trans` (baris 1758)
Bahasa: id, en, ja
- **Angka berbeda pada `intro` (id vs ja; nilai-beda):** id=[1, 2], ja=[2, 1]

#### Peta 14: `slide5Trans` (baris 1807)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 15: `slide6Trans` (baris 1856)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 16: `slide7Trans` (baris 1914)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 17: `object@2297` (baris 2297)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 18: `object@2298` (baris 2298)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 19: `object@2299` (baris 2299)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 20: `exampleSlidesTrans` (baris 2308)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 21: `toggleLabelsTrans` (baris 2339)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 22: `gpExamplesTrans` (baris 2354)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 23: `luasExamplesTrans` (baris 2592)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 24: `volExamplesTrans` (baris 2833)
Bahasa: id, en, ja
- **Angka berbeda pada `$value[].answer` (id vs ja; nilai-beda):** id=[1, 28, 2, 14, 30, 2, 20, 20, 30, 2, 3, 14, 2, 3, 28, 3, 3, 1, 3, 2, 1, 3, 22, 7, 28, 3, 2, 20, 1, 3, 22, 7, 784, 9, 20, 22, 784, 20, 3, 7, 9, 344960, 189, 1825.7, 3, 28, 3, 9.33, 1825.7], ja=[1, 28, 2, 14, 30, 2, 20, 30, 2, 3, 14, 2, 3, 28, 3, 3, 1, 3, 2, 1, 3, 22, 7, 28, 3, 2, 20, 1, 3, 22, 7, 784, 9, 20, 22, 784, 20, 3, 7, 9, 344960, 189, 1825.7, 3, 28, 3, 9.33, 1825.7]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/PerubahanVolumePage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/PerubahanVolumePage.tsx)

#### Peta 1: `calcTrans` (baris 84)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `pageTrans` (baris 190)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `slide0Trans` (baris 235)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 4: `sec0Trans` (baris 282)
Bahasa: id, en, ja
- **Angka berbeda pada `bullet1` (id vs en; nilai-beda):** id=[2], en=[]
- **Angka berbeda pada `bullet2` (id vs en; nilai-beda):** id=[3], en=[]
- **Angka berbeda pada `c1b1` (id vs en; nilai-beda):** id=[2], en=[]
- **Angka berbeda pada `c1b2` (id vs en; nilai-beda):** id=[3], en=[]
- **Angka berbeda pada `opening` (id vs en; nilai-beda):** id=[2, 2], en=[]

#### Peta 5: `sec1Trans` (baris 357)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 6: `sec2Trans` (baris 423)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 7: `sec3Trans` (baris 456)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 8: `sec4Trans` (baris 492)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 9: `secTitles` (baris 537)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 10: `object@790` (baris 790)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 11: `object@791` (baris 791)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 12: `object@792` (baris 792)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/TabungPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/TabungPage.tsx)

#### Peta 1: `slide1Trans` (baris 870)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `slide2Trans` (baris 916)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `slide3Trans` (baris 1169)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 4: `slide4Trans` (baris 1236)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 5: `slide5Trans` (baris 1312)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 6: `object@1847` (baris 1847)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 7: `object@1848` (baris 1848)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 8: `object@1849` (baris 1849)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 9: `kesimpulanTrans` (baris 2640)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 10: `contohSoalTrans` (baris 2708)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.


## Topik bilangan-berpangkat

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/BentukAkarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/BentukAkarPage.tsx)

#### Peta 1: `translations` (baris 11)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/NotasiIlmiahPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/NotasiIlmiahPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `k1_a_desc` (id vs ja; nilai-beda):** id=[1, 10, 10], ja=[1, 10]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/PengertianNotasiPangkatPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/PengertianNotasiPangkatPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `ex1_hard_q` (id vs ja; nilai-beda):** id=[2, 1, 8], ja=[1, 2, 1, 8]
- **Angka berbeda pada `konsep3_def_zero` (id vs ja; nilai-beda):** id=[1], ja=[0, 1]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/SifatSifatOperasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-berpangkat/SifatSifatOperasiPage.tsx)

#### Peta 1: `translations` (baris 11)
Bahasa: id, en, ja
- **Angka berbeda pada `k4_tip2` (id vs ja; nilai-beda):** id=[2], ja=[3]
- **Angka berbeda pada `k6_desc` (id vs ja; nilai-beda):** id=[], ja=[0]


## Topik bilangan-bulat

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage.tsx)

#### Peta 1: `translations` (baris 25)
Bahasa: id, en, ja
- **Angka berbeda pada `gcdStoryEach` (id vs ja; adaptasi-nama-konteks):** id=[], ja=[1]
- **Angka berbeda pada `lcmStoryAns` (id vs ja; nilai-beda):** id=[], ja=[3]
- **Angka berbeda pada `lcmStoryAnsDate` (id vs ja; nilai-beda):** id=[21], ja=[2, 21]
- **Angka berbeda pada `lcmStoryQ4` (id vs ja; nilai-beda):** id=[28], ja=[1, 28, 3]
- **Angka berbeda pada `lcmStoryS3a` (id vs ja; nilai-beda):** id=[28, 24], ja=[1, 28, 24]
- **Angka berbeda pada `lcmStoryS3b` (id vs ja; nilai-beda):** id=[31, 31, 28, 3], ja=[1, 31, 31, 28, 3]
- **Angka berbeda pada `lcmStoryS3c` (id vs ja; nilai-beda):** id=[24, 3, 21], ja=[24, 3, 2, 21]
- **Angka berbeda pada `tipMultiples` (id vs ja; nilai-beda):** id=[1], ja=[2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/OperasiCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/OperasiCampuranPage.tsx)

#### Peta 1: `translations` (baris 24)
Bahasa: id, en, ja
- **Angka berbeda pada `bonusAns` (id vs ja; nilai-beda):** id=[55], ja=[]
- **Angka berbeda pada `bonusStory` (id vs ja; nilai-beda):** id=[50, 28, 3, 15, 12], ja=[3]
- **Angka berbeda pada `err1Title` (id vs ja; nilai-beda):** id=[1], ja=[]
- **Angka berbeda pada `err2Title` (id vs ja; nilai-beda):** id=[2], ja=[]
- **Angka berbeda pada `err3Title` (id vs ja; nilai-beda):** id=[3], ja=[]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PembagianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PembagianPage.tsx)

#### Peta 1: `object@12` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `contoh3ConcBold` (id vs ja; nilai-beda):** id=[15], ja=[]
- **Angka berbeda pada `contoh3Known1` (id vs ja; nilai-beda):** id=[120], ja=[]
- **Angka berbeda pada `contoh3Story` (id vs ja; nilai-beda):** id=[120, 8], ja=[8]
- **Angka berbeda pada `ditanya` (id vs ja; nilai-beda):** id=[], ja=[1]
- **Angka berbeda pada `katexContoh3` (id vs ja; nilai-beda):** id=[-120, 8, -15], ja=[1, -120, 8, -15]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PenguranganPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PenguranganPage.tsx)

#### Peta 1: `translations` (baris 954)
Bahasa: id, en, ja
- **Angka berbeda pada `ex4S2Body` (id vs ja; nilai-beda):** id=[1], ja=[2]
- **Angka berbeda pada `sifat4Body` (id vs ja; nilai-beda):** id=[], ja=[0, 0]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PenjumlahanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PenjumlahanPage.tsx)

#### Peta 1: `translations` (baris 957)
Bahasa: id, en, ja
- **Angka berbeda pada `ex4aMeaning2` (id vs ja; nilai-beda):** id=[8, -14], ja=[-14, 8]
- **Angka berbeda pada `listTemp` (id vs ja; nilai-beda):** id=[], ja=[0]
- **Angka berbeda pada `sifat3Body` (id vs ja; nilai-beda):** id=[], ja=[3]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage.tsx)

#### Peta 1: `translations` (baris 354)
Bahasa: id, en, ja
- **Angka berbeda pada `conclusionBodyC` (id vs ja; nilai-beda):** id=[], ja=[1]
- **Angka berbeda pada `desc2x3Bold` (id vs ja; nilai-beda):** id=[2], ja=[3, 2]
- **Angka berbeda pada `desc4x5Bold` (id vs ja; nilai-beda):** id=[4], ja=[5, 4]
- **Angka berbeda pada `posNegG1` (id vs ja; nilai-beda):** id=[1, -3], ja=[-3, 1]
- **Angka berbeda pada `posNegG2` (id vs ja; nilai-beda):** id=[2, -3], ja=[-3, 2]
- **Angka berbeda pada `posNegG3` (id vs ja; nilai-beda):** id=[3, -3], ja=[-3, 3]
- **Angka berbeda pada `posNegG4` (id vs ja; nilai-beda):** id=[4, -3], ja=[-3, 4]
- **Angka berbeda pada `posPosG1` (id vs ja; nilai-beda):** id=[1, 3], ja=[3, 1]
- **Angka berbeda pada `posPosG2` (id vs ja; nilai-beda):** id=[2, 3], ja=[3, 2]
- **Angka berbeda pada `posPosG4` (id vs ja; nilai-beda):** id=[4, 3], ja=[3, 4]


## Topik bilangan-rasional

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/ArtiPecahanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/ArtiPecahanPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `ex2Q` (id vs ja; nilai-beda):** id=[45, 1], ja=[1, 45]
- **Angka berbeda pada `ex4Q` (id vs ja; nilai-beda):** id=[2, 2, 3], ja=[2, 3, 2]
- **Angka berbeda pada `sec2VisualExample` (id vs ja; nilai-beda):** id=[2, 1, 1, 2, 2, 4, 2, 4, 3, 6, 3, 6], ja=[2, 1, 1, 2, 4, 2, 2, 4, 6, 3, 3, 6]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/BentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/BentukDesimalPage.tsx)

#### Peta 1: `translations` (baris 11)
Bahasa: id, en, ja
- **Angka berbeda pada `ex3Ans` (id vs en; nilai-beda):** id=[4.67, 467, 100], en=[4.67, 4, 67, 100]
- **Angka berbeda pada `sec4TipBody` (id vs en; nilai-beda):** id=[9, 0], en=[1, 0]
- **Angka berbeda pada `ex10Body` (id vs ja; nilai-beda):** id=[0.3333, 10, 1], ja=[0.3333, 1, 10]
- **Angka berbeda pada `ex1Q` (id vs ja; nilai-beda):** id=[7, 3.478], ja=[3.478, 7]
- **Angka berbeda pada `ex3Ans` (id vs ja; nilai-beda):** id=[4.67, 467, 100], ja=[4.67, 4, 67, 100]
- **Angka berbeda pada `sec4Notation[]` (id vs ja; nilai-beda):** id=[0.16, 0.1666, 6, 1], ja=[0.16, 0.1666, 1, 6]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PecahanCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PecahanCampuranPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `sumTips[].detail` (id vs en; adaptasi-mata-uang):** id=[20, 150000, 150000, 20, 100, 30000, 150000, 30000, 120000], en=[20, 150, 150, 20, 100, 30, 150, 30, 120]
- **Angka berbeda pada `sec1Visual` (id vs ja; nilai-beda):** id=[7, 3, 7, 3, 7, 3, 2, 1, 7, 3, 2, 1, 3, 2, 1, 3], ja=[7, 3, 3, 7, 7, 3, 2, 1, 7, 3, 2, 1, 3, 2, 1, 3]
- **Angka berbeda pada `sec3Summary` (id vs ja; nilai-beda):** id=[100], ja=[100, 100]
- **Angka berbeda pada `sumCards[].desc` (id vs ja; nilai-beda):** id=[100, 25, 80, 25, 100, 80, 20], ja=[100, 80, 25, 25, 100, 80, 20]
- **Angka berbeda pada `sumTips[].detail` (id vs ja; nilai-beda):** id=[20, 150000, 150000, 20, 100, 30000, 150000, 30000, 120000], ja=[150, 20, 150, 20, 100, 30, 150, 30, 120]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage.tsx)

#### Peta 1: `translations` (baris 11)
Bahasa: id, en, ja
- **Angka berbeda pada `ex3Q` (id vs en; ambigu-pemisah):** id=[3456.78, 100000], en=[3456.78, 100]
- **Angka berbeda pada `ex4Q` (id vs en; ambigu-pemisah):** id=[14.245, 0.7], en=[14245, 0.7]
- **Angka berbeda pada `ex5Q` (id vs en; ambigu-pemisah):** id=[1.03248, 0.012], en=[1.03248, 12]
- **Angka berbeda pada `ex3Q` (id vs ja; ambigu-pemisah):** id=[3456.78, 100000], ja=[3456.78, 100]
- **Angka berbeda pada `ex3s2desc` (id vs ja; nilai-beda):** id=[1, 3456.78], ja=[0, 1, 3456.78]
- **Angka berbeda pada `ex4Q` (id vs ja; ambigu-pemisah):** id=[14.245, 0.7], ja=[14245, 0.7]
- **Angka berbeda pada `ex5Q` (id vs ja; ambigu-pemisah):** id=[1.03248, 0.012], ja=[1.03248, 12]
- **Angka berbeda pada `ex7Q` (id vs ja; nilai-beda):** id=[2.5, 37500], ja=[2.5, 37500, 1]
- **Angka berbeda pada `ex7ans` (id vs ja; nilai-beda):** id=[15000], ja=[1, 15000]
- **Angka berbeda pada `ex7find` (id vs ja; nilai-beda):** id=[], ja=[1]
- **Angka berbeda pada `ex7pricePerKg` (id vs ja; nilai-beda):** id=[], ja=[1]
- **Angka berbeda pada `ex8Q` (id vs ja; nilai-beda):** id=[187.5, 12.5], ja=[12.5, 187.5, 1]
- **Angka berbeda pada `ex8ans` (id vs ja; nilai-beda):** id=[15], ja=[1, 15]
- **Angka berbeda pada `ex8distPerLitre` (id vs ja; nilai-beda):** id=[], ja=[1]
- **Angka berbeda pada `ex8find` (id vs ja; nilai-beda):** id=[], ja=[1]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianPecahanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembagianPecahanPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `conclusionBody` (id vs ja; nilai-beda):** id=[1], ja=[2]
- **Angka berbeda pada `ex3Q` (id vs ja; nilai-beda):** id=[1, 5, 5, 8], ja=[5, 1, 5, 8]
- **Angka berbeda pada `ex3s1b` (id vs ja; nilai-beda):** id=[], ja=[1]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage.tsx)

#### Peta 1: `translations` (baris 11)
Bahasa: id, en, ja
- **Angka berbeda pada `ex1Q` (id vs en; ambigu-pemisah):** id=[4.638], en=[4638]
- **Angka berbeda pada `ex1s1desc` (id vs en; ambigu-pemisah):** id=[4.638, 6, 1], en=[4638, 6, 1]
- **Angka berbeda pada `ex6Q` (id vs en; ambigu-pemisah):** id=[319.837], en=[319837]
- **Angka berbeda pada `ex6s1desc` (id vs en; ambigu-pemisah):** id=[319.837, 9, 8], en=[319837, 9, 8]
- **Angka berbeda pada `ex8Q` (id vs en; ambigu-pemisah):** id=[10.473], en=[10473]
- **Angka berbeda pada `ex8s1desc` (id vs en; ambigu-pemisah):** id=[10.473, 7, 2], en=[10473, 7, 2]
- **Angka berbeda pada `ex9ans` (id vs en; ambigu-pemisah):** id=[2.996], en=[2996]
- **Angka berbeda pada `ex9s4desc` (id vs en; ambigu-pemisah):** id=[2.995, 2.996], en=[2995, 2996]
- **Angka berbeda pada `ex1Q` (id vs ja; nilai-beda):** id=[4.638, 1], ja=[4638, 1]
- **Angka berbeda pada `ex1s1desc` (id vs ja; ambigu-pemisah):** id=[4.638, 6, 1], ja=[4638, 6, 1]
- **Angka berbeda pada `ex6Q` (id vs ja; ambigu-pemisah):** id=[319.837], ja=[319837]
- **Angka berbeda pada `ex6s1desc` (id vs ja; ambigu-pemisah):** id=[319.837, 9, 8], ja=[319837, 9, 8]
- **Angka berbeda pada `ex8Q` (id vs ja; nilai-beda):** id=[10.473, 2], ja=[10473, 2]
- **Angka berbeda pada `ex8s1desc` (id vs ja; ambigu-pemisah):** id=[10.473, 7, 2], ja=[10473, 7, 2]
- **Angka berbeda pada `ex9ans` (id vs ja; ambigu-pemisah):** id=[2.996], ja=[2996]
- **Angka berbeda pada `ex9s4desc` (id vs ja; ambigu-pemisah):** id=[2.995, 2.996], ja=[2995, 2996]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage.tsx)

#### Peta 1: `translations` (baris 16)
Bahasa: id, en, ja
- **Angka berbeda pada `s1e2Q` (id vs en; ambigu-pemisah):** id=[9.754, 52.18], en=[9754, 52.18]
- **Angka berbeda pada `s1e2ans` (id vs en; ambigu-pemisah):** id=[61.934], en=[61934]
- **Angka berbeda pada `s1e2s1` (id vs en; ambigu-pemisah):** id=[1, 52.18, 2, 9.754, 3, 1, 52.18, 52.18], en=[1, 52.18, 2, 9754, 3, 1, 52.18, 52180]
- **Angka berbeda pada `s1e3Q` (id vs en; ambigu-pemisah):** id=[3, 934.456, 70.806, 8.34], en=[3, 934456, 70806, 8.34]
- **Angka berbeda pada `s1e3ans` (id vs en; ambigu-pemisah):** id=[1013.602], en=[1013602]
- **Angka berbeda pada `s1e3katex1` (id vs en; ambigu-pemisah):** id=[934.456, 70.806, 8.34], en=[934456, 70806, 8.34]
- **Angka berbeda pada `s1e3s2` (id vs en; ambigu-pemisah):** id=[2, 8.34, 8.34], en=[2, 8.34, 8340]
- **Angka berbeda pada `s2e2Q` (id vs en; ambigu-pemisah):** id=[84.937, 725.46], en=[84937, 725.46]
- **Angka berbeda pada `s2e2ans` (id vs en; ambigu-pemisah):** id=[640.523], en=[640523]
- **Angka berbeda pada `s2e2note` (id vs en; ambigu-pemisah):** id=[725.46, 84.937], en=[725.46, 84937]
- **Angka berbeda pada `s2e2s1` (id vs en; ambigu-pemisah):** id=[1, 725.46, 725.46], en=[1, 725.46, 725460]
- **Angka berbeda pada `s2e3Q` (id vs en; ambigu-pemisah):** id=[89.276, 467.8, 120.05], en=[89276, 467.8, 120.05]
- **Angka berbeda pada `s2e3ans` (id vs en; ambigu-pemisah):** id=[258.474], en=[258474]
- **Angka berbeda pada `s2e3s1` (id vs en; ambigu-pemisah):** id=[1, 467.8, 89.276], en=[1, 467.8, 89276]
- **Angka berbeda pada `s2e3s1b` (id vs en; ambigu-pemisah):** id=[467.8, 467.8], en=[467.8, 467800]
- **Angka berbeda pada `s2e3s2` (id vs en; ambigu-pemisah):** id=[2, 378.524, 120.05], en=[2, 378524, 120050]
- **Angka berbeda pada `s3e2Q` (id vs en; ambigu-pemisah):** id=[45.72, 18.5, 9.384, 6.2], en=[45.72, 18.5, 9384, 6.2]
- **Angka berbeda pada `s3e2ans` (id vs en; ambigu-pemisah):** id=[30.404], en=[30404]
- **Angka berbeda pada `sec0Caption` (id vs en; ambigu-pemisah):** id=[934.456, 70.806], en=[934456, 70806]
- **Angka berbeda pada `sec2Tip` (id vs en; ambigu-pemisah):** id=[467.8, 467.8, 467.8, 3], en=[467.8, 467.8, 467800, 3]
- **Angka berbeda pada `conclusionBody` (id vs ja; nilai-beda):** id=[1], ja=[0]
- **Angka berbeda pada `s1e1s1` (id vs ja; nilai-beda):** id=[1, 14.7, 14.7, 1], ja=[1, 14.7, 14.7, 0, 1]
- **Angka berbeda pada `s1e2Q` (id vs ja; ambigu-pemisah):** id=[9.754, 52.18], ja=[9754, 52.18]
- **Angka berbeda pada `s1e2ans` (id vs ja; ambigu-pemisah):** id=[61.934], ja=[61934]
- **Angka berbeda pada `s1e2s1` (id vs ja; nilai-beda):** id=[1, 52.18, 2, 9.754, 3, 1, 52.18, 52.18], ja=[1, 52.18, 2, 9754, 3, 52.18, 0, 1, 52180]
- **Angka berbeda pada `s1e3Q` (id vs ja; nilai-beda):** id=[3, 1, 934.456, 2, 70.806, 3, 8.34], ja=[3, 1, 934456, 2, 70806, 3, 8.34]
- **Angka berbeda pada `s1e3ans` (id vs ja; ambigu-pemisah):** id=[1013.602], ja=[1013602]
- **Angka berbeda pada `s1e3katex1` (id vs ja; ambigu-pemisah):** id=[934.456, 70.806, 8.34], ja=[934456, 70806, 8.34]
- **Angka berbeda pada `s1e3s2` (id vs ja; ambigu-pemisah):** id=[2, 8.34, 8.34], ja=[2, 8.34, 8340]
- **Angka berbeda pada `s2e2Q` (id vs ja; nilai-beda):** id=[84.937, 725.46], ja=[725.46, 84937]
- **Angka berbeda pada `s2e2ans` (id vs ja; ambigu-pemisah):** id=[640.523], ja=[640523]
- **Angka berbeda pada `s2e2note` (id vs ja; ambigu-pemisah):** id=[725.46, 84.937], ja=[725.46, 84937]
- **Angka berbeda pada `s2e2s1` (id vs ja; ambigu-pemisah):** id=[1, 725.46, 725.46], ja=[1, 725.46, 725460]
- **Angka berbeda pada `s2e3Q` (id vs ja; nilai-beda):** id=[89.276, 467.8, 120.05], ja=[467.8, 89276, 120.05]
- **Angka berbeda pada `s2e3ans` (id vs ja; ambigu-pemisah):** id=[258.474], ja=[258474]
- **Angka berbeda pada `s2e3s1` (id vs ja; nilai-beda):** id=[1, 1, 467.8, 89.276], ja=[1, 1, 467.8, 89276]
- **Angka berbeda pada `s2e3s1b` (id vs ja; ambigu-pemisah):** id=[467.8, 467.8], ja=[467.8, 467800]
- **Angka berbeda pada `s2e3s2` (id vs ja; nilai-beda):** id=[2, 2, 378.524, 120.05], ja=[2, 2, 378524, 120050]
- **Angka berbeda pada `s3e2Q` (id vs ja; ambigu-pemisah):** id=[45.72, 18.5, 9.384, 6.2], ja=[45.72, 18.5, 9384, 6.2]
- **Angka berbeda pada `s3e2ans` (id vs ja; ambigu-pemisah):** id=[30.404], ja=[30404]
- **Angka berbeda pada `sec0Caption` (id vs ja; ambigu-pemisah):** id=[934.456, 70.806], ja=[934456, 70806]
- **Angka berbeda pada `sec1Summary` (id vs ja; nilai-beda):** id=[1], ja=[0]
- **Angka berbeda pada `sec2Summary` (id vs ja; nilai-beda):** id=[1], ja=[0, 1]
- **Angka berbeda pada `sec2Tip` (id vs ja; nilai-beda):** id=[467.8, 467.8, 467.8, 3], ja=[467.8, 0, 467.8, 467800, 3]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganPage.tsx)

#### Peta 1: `translations` (baris 13)
Bahasa: id, en, ja
- **Angka berbeda pada `ex9katex4` (id vs en; nilai-beda):** id=[13, 30, 840000, 0], en=[13, 30, 840000, 364000]
- **Angka berbeda pada `ex9Q` (id vs ja; nilai-beda):** id=[840000, 2, 5], ja=[840000, 6, 1, 2, 5]
- **Angka berbeda pada `ex9katex4` (id vs ja; nilai-beda):** id=[13, 30, 840000, 0], ja=[13, 30, 840000, 364000]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage.tsx)

#### Peta 1: `translations` (baris 11)
Bahasa: id, en, ja
- **Angka berbeda pada `ex3Q` (id vs en; ambigu-pemisah):** id=[8.6543, 100000], en=[8.6543, 100]
- **Angka berbeda pada `ex6Q` (id vs en; ambigu-pemisah):** id=[3.67, 4.258], en=[3.67, 4258]
- **Angka berbeda pada `ex7katex1` (id vs en; ambigu-pemisah):** id=[15500, 2.5], en=[15.5, 2.5]
- **Angka berbeda pada `ex3Q` (id vs ja; ambigu-pemisah):** id=[8.6543, 100000], ja=[8.6543, 100]
- **Angka berbeda pada `ex3s2desc` (id vs ja; nilai-beda):** id=[1, 8.6543], ja=[0, 1, 8.6543]
- **Angka berbeda pada `ex6Q` (id vs ja; ambigu-pemisah):** id=[3.67, 4.258], ja=[3.67, 4258]
- **Angka berbeda pada `ex7Q` (id vs ja; nilai-beda):** id=[15500, 2.5], ja=[1, 15500, 2.5]
- **Angka berbeda pada `ex7katex1` (id vs ja; ambigu-pemisah):** id=[15500, 2.5], ja=[15.5, 2.5]
- **Angka berbeda pada `ex8Q` (id vs ja; nilai-beda):** id=[8.5, 100, 12650, 350], ja=[100, 8.5, 1, 12650, 350]
- **Angka berbeda pada `ex9Q` (id vs ja; nilai-beda):** id=[12.75, 8.4, 0.3, 0.3, 25000], ja=[12.75, 8.4, 0.3, 0.3, 1, 25000]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianPecahanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/bilangan-rasional/PerkalianPecahanPage.tsx)

#### Peta 1: `translations` (baris 13)
Bahasa: id, en, ja
- **Angka berbeda pada `ex3Q` (id vs en; adaptasi-mata-uang):** id=[3600000, 2, 5, 1, 4], en=[3600, 2, 5, 1, 4]
- **Angka berbeda pada `ex3ans` (id vs en; adaptasi-mata-uang):** id=[360000], en=[360]
- **Angka berbeda pada `ex3katex1` (id vs en; adaptasi-mata-uang):** id=[1, 10, 3600000], en=[1, 10, 3600]
- **Angka berbeda pada `ex3katex2` (id vs en; adaptasi-mata-uang):** id=[360000], en=[360]
- **Angka berbeda pada `ex3Q` (id vs ja; adaptasi-mata-uang):** id=[3600000, 2, 5, 1, 4], ja=[3600, 2, 5, 1, 4]
- **Angka berbeda pada `ex3ans` (id vs ja; adaptasi-mata-uang):** id=[360000], ja=[360]
- **Angka berbeda pada `ex3katex1` (id vs ja; adaptasi-mata-uang):** id=[1, 10, 3600000], ja=[1, 10, 3600]
- **Angka berbeda pada `ex3katex2` (id vs ja; adaptasi-mata-uang):** id=[360000], ja=[360]


## Topik fungsi-kuadrat

Tidak ada objek terjemahan per bahasa yang dapat dianalisis.

## Topik garis-dan-sudut

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/HubunganDuaGarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/HubunganDuaGarisPage.tsx)

#### Peta 1: `uiMap` (baris 11)
Bahasa: id, en, ja
- **Angka berbeda pada `ex3n1` (id vs ja; nilai-beda):** id=[8], ja=[8, 2]
- **Angka berbeda pada `s2defTxt` (id vs ja; nilai-beda):** id=[2, 2, 1], ja=[2, 1, 2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage.tsx)

#### Peta 1: `uiMap` (baris 14)
Bahasa: id, en, ja
- **Angka berbeda pada `grid4` (id vs en; nilai-beda):** id=[4, 4], en=[4]
- **Angka berbeda pada `grid5` (id vs en; nilai-beda):** id=[5, 5], en=[5]
- **Angka berbeda pada `grid6` (id vs en; nilai-beda):** id=[6, 6], en=[6]
- **Angka berbeda pada `s2p1b` (id vs en; nilai-beda):** id=[2], en=[]
- **Angka berbeda pada `svgSegi6label` (id vs en; nilai-beda):** id=[6], en=[]
- **Angka berbeda pada `grid4` (id vs ja; nilai-beda):** id=[4, 4], ja=[4]
- **Angka berbeda pada `grid5` (id vs ja; nilai-beda):** id=[5, 5], ja=[5]
- **Angka berbeda pada `grid6` (id vs ja; nilai-beda):** id=[6, 6], ja=[6]
- **Angka berbeda pada `s4how3` (id vs ja; nilai-beda):** id=[3], ja=[3, 180]
- **Angka berbeda pada `svgSegi6label` (id vs ja; nilai-beda):** id=[6], ja=[]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SifatSudutDuaGarisSejajarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SifatSudutDuaGarisSejajarPage.tsx)

#### Peta 1: `uiMap` (baris 14)
Bahasa: id, en, ja
- **Angka berbeda pada `s5bold3` (id vs ja; nilai-beda):** id=[], ja=[180]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SudutPelurusPenyikuBertolakPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-dan-sudut/SudutPelurusPenyikuBertolakPage.tsx)

#### Peta 1: `uiMap` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `ex2b` (id vs ja; nilai-beda):** id=[], ja=[1, 2]
- **Angka berbeda pada `s1bold` (id vs ja; nilai-beda):** id=[2, 1], ja=[1, 2]
- **Angka berbeda pada `s1p1` (id vs ja; nilai-beda):** id=[2, 1], ja=[1, 2]
- **Angka berbeda pada `s4p2` (id vs ja; nilai-beda):** id=[2], ja=[1, 2]


## Topik garis-singgung-lingkaran

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPDPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPDPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `c1_problem` (id vs ja; nilai-beda):** id=[2, 9, 6, 25], ja=[9, 6, 2, 25]
- **Angka berbeda pada `c3_problem` (id vs ja; nilai-beda):** id=[2, 10, 6, 4, 21], ja=[10, 6, 2, 4, 21]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPLPage.tsx)

#### Peta 1: `object@12` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `c1_problem` (id vs ja; nilai-beda):** id=[2, 10, 4, 17], ja=[10, 4, 2, 17]
- **Angka berbeda pada `c2_problem` (id vs ja; nilai-beda):** id=[2, 8, 3, 12, 2], ja=[8, 3, 2, 12, 2]
- **Angka berbeda pada `intro_tip2` (id vs ja; nilai-beda):** id=[], ja=[2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/MenghitungPanjangPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/MenghitungPanjangPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/PengertianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/PengertianPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `sec_intro` (id vs ja; nilai-beda):** id=[], ja=[1]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `c2_step1` (id vs en; nilai-beda):** id=[28, 2, 4, 28, 1, 2, 1, 2], en=[3, 28, 2, 4, 28, 2]
- **Angka berbeda pada `c1_problem` (id vs ja; nilai-beda):** id=[2, 7, 30, 22, 7], ja=[7, 2, 30, 22, 7]
- **Angka berbeda pada `c2_problem` (id vs ja; nilai-beda):** id=[3, 14, 22, 7], ja=[14, 3, 22, 7]
- **Angka berbeda pada `c2_step1` (id vs ja; nilai-beda):** id=[28, 2, 4, 28, 1, 2, 1, 2], ja=[3, 28, 2, 4, 28, 2]


## Topik himpunan

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/DiagramVennPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/DiagramVennPage.tsx)

#### Peta 1: `translations` (baris 16)
Bahasa: id, en, ja
- **Angka berbeda pada `s3e2multOf4` (id vs ja; nilai-beda):** id=[4, 1, 20], ja=[1, 20, 4]
- **Angka berbeda pada `s3e2multOf6` (id vs ja; nilai-beda):** id=[6, 1, 20], ja=[1, 20, 6]
- **Angka berbeda pada `s4e2multOf3` (id vs ja; nilai-beda):** id=[3, 1, 15], ja=[1, 15, 3]
- **Angka berbeda pada `s4e2multOf5` (id vs ja; nilai-beda):** id=[5, 1, 15], ja=[1, 15, 5]
- **Angka berbeda pada `s4tip` (id vs ja; nilai-beda):** id=[1], ja=[2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/JenisHimpunanPage.tsx)

#### Peta 1: `translations` (baris 17)
Bahasa: id, en, ja
- **Angka berbeda pada `s2e2qMembers` (id vs en; nilai-beda):** id=[2, 3, 5, 7, 11, 13, 17, 19, 8], en=[2357111317.19, 8]
- **Angka berbeda pada `s3e1cRes` (id vs en; nilai-beda):** id=[2, 4, 6], en=[24.6]
- **Angka berbeda pada `s3e1opts[]` (id vs en; nilai-beda):** id=[2, 4, 6, 1, 2, 3, 4, 5, 6], en=[24.6, 12345.6]
- **Angka berbeda pada `s3e3q` (id vs en; nilai-beda):** id=[1, 2, 3, 4], en=[123.4]
- **Angka berbeda pada `s4e1aAns` (id vs en; nilai-beda):** id=[12.3, 10, 10], en=[1.2, 10, 10]
- **Angka berbeda pada `s4e1cAns` (id vs en; nilai-beda):** id=[25, 14.9, 625], en=[25]
- **Angka berbeda pada `s4e1opts[]` (id vs en; nilai-beda):** id=[1, 4, 9, 16, 25], en=[14916.25]
- **Angka berbeda pada `s1e3a` (id vs ja; nilai-beda):** id=[0, 0], ja=[0, 0, 0]
- **Angka berbeda pada `s1emptyWarnText` (id vs ja; nilai-beda):** id=[], ja=[0]
- **Angka berbeda pada `s2e2qMembers` (id vs ja; nilai-beda):** id=[2, 3, 5, 7, 11, 13, 17, 19, 8], ja=[2357111317.19, 8]
- **Angka berbeda pada `s3e1cRes` (id vs ja; nilai-beda):** id=[2, 4, 6], ja=[24.6]
- **Angka berbeda pada `s3e1opts[]` (id vs ja; nilai-beda):** id=[2, 4, 6, 1, 2, 3, 4, 5, 6], ja=[24.6, 12345.6]
- **Angka berbeda pada `s3e3cAns` (id vs ja; nilai-beda):** id=[2, 4, 4.2, 4, 2, 2, 6], ja=[4, 2, 4.2, 4, 2, 2, 6]
- **Angka berbeda pada `s3e3q` (id vs ja; nilai-beda):** id=[1, 2, 3, 4], ja=[123.4]
- **Angka berbeda pada `s4e1aAns` (id vs ja; nilai-beda):** id=[12.3, 10, 10], ja=[1.2, 10, 10]
- **Angka berbeda pada `s4e1cAns` (id vs ja; nilai-beda):** id=[25, 14.9, 625], ja=[25]
- **Angka berbeda pada `s4e1opts[]` (id vs ja; nilai-beda):** id=[1, 4, 9, 16, 25], ja=[14916.25]
- **Angka berbeda pada `s5e2ans` (id vs ja; nilai-beda):** id=[10, 2], ja=[2, 10]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/OperasiHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/OperasiHimpunanPage.tsx)

#### Peta 1: `translations` (baris 14)
Bahasa: id, en, ja
- **Angka berbeda pada `s3e2ans3` (id vs en; nilai-beda):** id=[3, 5, 6, 9, 10, 12], en=[356910.12]
- **Angka berbeda pada `s2e1note` (id vs ja; nilai-beda):** id=[12, 3, 4], ja=[3, 4, 12]
- **Angka berbeda pada `s2e1q` (id vs ja; nilai-beda):** id=[3, 1, 20, 4, 1, 20], ja=[1, 20, 3, 1, 20, 4]
- **Angka berbeda pada `s3e2ans3` (id vs ja; nilai-beda):** id=[3, 5, 6, 9, 10, 12], ja=[356910.12]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PemecahanMasalahHimpunanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PemecahanMasalahHimpunanPage.tsx)

#### Peta 1: `translations` (baris 22)
Bahasa: id, en, ja
- **Angka berbeda pada `s2e3ans` (id vs ja; nilai-beda):** id=[14, 3], ja=[3, 14]
- **Angka berbeda pada `s3e3ans` (id vs ja; nilai-beda):** id=[60, 1], ja=[1, 60]
- **Angka berbeda pada `s3e3q` (id vs ja; nilai-beda):** id=[100, 1, 3, 60, 50, 40, 2, 30, 3, 10, 1], ja=[100, 3, 1, 60, 50, 40, 2, 30, 3, 10, 1]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PengertianKeanggotaanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/himpunan/PengertianKeanggotaanPage.tsx)

#### Peta 1: `translations` (baris 14)
Bahasa: id, en, ja
- **Panjang array `s4e3opts` berbeda:** id=3, en=3, ja=4
- **Angka berbeda pada `introFactEnd` (id vs en; nilai-beda):** id=[1870], en=[]
- **Angka berbeda pada `s2e2pattern` (id vs ja; nilai-beda):** id=[3, 3, 15], ja=[3, 15, 3]
- **Angka berbeda pada `s2e2wordsText` (id vs ja; nilai-beda):** id=[3, 15], ja=[15, 3]
- **Angka berbeda pada `s4e1a` (id vs ja; nilai-beda):** id=[7], ja=[1, 7]
- **Angka berbeda pada `s4e3bTitle` (id vs ja; nilai-beda):** id=[7, 0], ja=[0, 7]
- **Angka berbeda pada `s4emptyWarnText` (id vs ja; nilai-beda):** id=[0], ja=[1, 0]


## Topik kesebangunan-kekongruenan

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/DefinisiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/DefinisiPage.tsx)

#### Peta 1: `object@1237` (baris 1237)
Bahasa: id, en, ms-MY, ja, zh-CN, ru
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `locale constants@1` (baris 19)
Bahasa: id, en, ja, ru
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage.tsx)

#### Peta 1: `object@1263` (baris 1263)
Bahasa: id, en, ms-MY, ja, zh-CN, ru
- **Angka berbeda pada `k3_s3_adj_angles` (id vs en; nilai-beda):** id=[], en=[180]
- **Angka berbeda pada `c4_q` (id vs ja; nilai-beda):** id=[2], ja=[2, 1]
- **Angka berbeda pada `k2_ara` (id vs ja; nilai-beda):** id=[], ja=[2, 2, 1]
- **Angka berbeda pada `k2_p1` (id vs ja; nilai-beda):** id=[2], ja=[2, 4]
- **Angka berbeda pada `k2_p1c` (id vs ja; nilai-beda):** id=[4], ja=[]
- **Angka berbeda pada `k2_rar` (id vs ja; nilai-beda):** id=[], ja=[2]
- **Angka berbeda pada `k2_rrr` (id vs ja; nilai-beda):** id=[], ja=[3]
- **Angka berbeda pada `k3_s3_adj_angles` (id vs ja; nilai-beda):** id=[], ja=[180]

#### Peta 2: `locale constants@1` (baris 14)
Bahasa: id, en, ja, ru
- **Angka berbeda pada `k3_s3_adj_angles` (id vs en; nilai-beda):** id=[], en=[180]
- **Angka berbeda pada `c4_q` (id vs ja; nilai-beda):** id=[2], ja=[2, 1]
- **Angka berbeda pada `k2_ara` (id vs ja; nilai-beda):** id=[], ja=[2, 2, 1]
- **Angka berbeda pada `k2_p1` (id vs ja; nilai-beda):** id=[2], ja=[2, 4]
- **Angka berbeda pada `k2_p1c` (id vs ja; nilai-beda):** id=[4], ja=[]
- **Angka berbeda pada `k2_rar` (id vs ja; nilai-beda):** id=[], ja=[2]
- **Angka berbeda pada `k2_rrr` (id vs ja; nilai-beda):** id=[], ja=[3]
- **Angka berbeda pada `k3_s3_adj_angles` (id vs ja; nilai-beda):** id=[], ja=[180]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/MenghitungRusukPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/MenghitungRusukPage.tsx)

#### Peta 1: `object@762` (baris 762)
Bahasa: id, en, ms-MY, ja, zh-CN, ru
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `numberLocales` (baris 771)
Bahasa: id, en, ms-MY, ja, zh-CN, ru
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `locale constants@1` (baris 12)
Bahasa: id, en, ja, ru
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/PerbandinganRusukSikuSikuPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/PerbandinganRusukSikuSikuPage.tsx)

#### Peta 1: `object@255` (baris 255)
Bahasa: id, en, ms-MY, ja, zh-CN, ru
- **Angka berbeda pada `altitudeSquare` (id vs ja; nilai-beda):** id=[2], ja=[2, 2]
- **Angka berbeda pada `conclusionEnd` (id vs ja; nilai-beda):** id=[1], ja=[3]
- **Angka berbeda pada `similarTriangles` (id vs ja; nilai-beda):** id=[], ja=[3]

#### Peta 2: `locale constants@1` (baris 11)
Bahasa: id, en, ja, ru
- **Angka berbeda pada `altitudeSquare` (id vs ja; nilai-beda):** id=[2], ja=[2, 2]
- **Angka berbeda pada `conclusionEnd` (id vs ja; nilai-beda):** id=[1], ja=[3]
- **Angka berbeda pada `similarTriangles` (id vs ja; nilai-beda):** id=[], ja=[3]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/SegitigaSebangunPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/kesebangunan-kekongruenan/SegitigaSebangunPage.tsx)

#### Peta 1: `object@728` (baris 728)
Bahasa: id, en, ms-MY, ja, zh-CN, ru
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `locale constants@1` (baris 13)
Bahasa: id, en, ja, ru
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.


## Topik koordinat-cartesius

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/JarakTitikGarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/JarakTitikGarisPage.tsx)

#### Peta 1: `translations` (baris 16)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifGarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifGarisPage.tsx)

#### Peta 1: `translations` (baris 14)
Bahasa: id, en, ja
- **Angka berbeda pada `ex3ans` (id vs ja; nilai-beda):** id=[], ja=[6, 0]
- **Angka berbeda pada `ex3ansSuffix` (id vs ja; nilai-beda):** id=[6, 0], ja=[]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikAcuanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikAcuanPage.tsx)

#### Peta 1: `translations` (baris 14)
Bahasa: id, en, ja
- **Angka berbeda pada `ex1dirR` (id vs ja; nilai-beda):** id=[4], ja=[]
- **Angka berbeda pada `kesimpulan` (id vs ja; nilai-beda):** id=[200], ja=[]
- **Angka berbeda pada `step2note` (id vs ja; nilai-beda):** id=[5, -3], ja=[2, 5, -3]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikDanGarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikDanGarisPage.tsx)

#### Peta 1: `T` (baris 14)
Bahasa: id, en, ja
- **Angka berbeda pada `ex1aAtas` (id vs ja; nilai-beda):** id=[], ja=[4]
- **Angka berbeda pada `ex1aDesc1` (id vs ja; nilai-beda):** id=[4], ja=[]
- **Angka berbeda pada `ex1aKanan` (id vs ja; nilai-beda):** id=[], ja=[4]
- **Angka berbeda pada `ex3aNote` (id vs ja; nilai-beda):** id=[5, -3], ja=[2, 5, -3]
- **Angka berbeda pada `ex3bAns` (id vs ja; nilai-beda):** id=[], ja=[6, 0]
- **Angka berbeda pada `ex3bAnsSuffix` (id vs ja; nilai-beda):** id=[6, 0], ja=[]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/UnsurUnsurCartesiusPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/koordinat-cartesius/UnsurUnsurCartesiusPage.tsx)

#### Peta 1: `translations` (baris 14)
Bahasa: id, en, ja
- **Angka berbeda pada `ex2q2` (id vs ja; nilai-beda):** id=[], ja=[0, 0]
- **Angka berbeda pada `ex2q4` (id vs ja; nilai-beda):** id=[0, 0], ja=[]
- **Angka berbeda pada `r3isi` (id vs ja; nilai-beda):** id=[1], ja=[2]


## Topik lingkaran

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/BusurJuringPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/BusurJuringPage.tsx)

#### Peta 1: `object@14` (baris 14)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage.tsx)

#### Peta 1: `object@13` (baris 13)
Bahasa: id, en, ja
- **Angka berbeda pada `introP` (id vs ja; nilai-beda):** id=[1], ja=[2]
- **Angka berbeda pada `k12LQV` (id vs ja; adaptasi-nama-konteks):** id=[], ja=[1]
- **Angka berbeda pada `k12Soal` (id vs ja; nilai-beda):** id=[14, 2, 7], ja=[14, 7, 2]
- **Angka berbeda pada `k15Title` (id vs ja; nilai-beda):** id=[15, 4, 14, 22, 7], ja=[15, 14, 4, 22, 7]
- **Angka berbeda pada `k5Title` (id vs ja; nilai-beda):** id=[5, 4, 14, 22, 7], ja=[5, 14, 4, 22, 7]
- **Angka berbeda pada `k6Soal` (id vs ja; nilai-beda):** id=[3, 28, 14, 14, 7], ja=[28, 14, 14, 2, 7]
- **Angka berbeda pada `k7KnownV` (id vs ja; nilai-beda):** id=[10, 90], ja=[10, 90, 1, 4]
- **Angka berbeda pada `k7Title` (id vs ja; nilai-beda):** id=[7, 10, 3.14], ja=[7, 1, 4, 10, 3.14]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarPage.tsx)

#### Peta 1: `object@13` (baris 13)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KelilingLuasPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/KelilingLuasPage.tsx)

#### Peta 1: `object@14` (baris 14)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/PenerapanKontekstualPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/PenerapanKontekstualPage.tsx)

#### Peta 1: `object@13` (baris 13)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/SudutPusatKelilingPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/SudutPusatKelilingPage.tsx)

#### Peta 1: `object@16` (baris 16)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/UnsurUnsurPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/lingkaran/UnsurUnsurPage.tsx)

#### Peta 1: `object@14` (baris 14)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.


## Topik peluang

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/FrekuensiHarapanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/FrekuensiHarapanPage.tsx)

#### Peta 1: `object@18` (baris 18)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `object@19` (baris 19)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `object@20` (baris 20)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 4: `kali` (baris 26)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 5: `object@28` (baris 28)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 6: `object@58` (baris 58)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 7: `object@79` (baris 79)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 8: `object@115` (baris 115)
Bahasa: id, en, ja
- **Angka berbeda pada `penjelasanIlustrasi` (id vs ja; nilai-beda):** id=[10, 60], ja=[60, 10]

#### Peta 9: `object@160` (baris 160)
Bahasa: id, en, ja
- **Angka berbeda pada `s1kunci` (id vs ja; nilai-beda):** id=[40, 80], ja=[80, 40]
- **Angka berbeda pada `s3q` (id vs ja; nilai-beda):** id=[5, 3, 2, 300], ja=[5, 3, 2, 1, 300]

#### Peta 10: `object@220` (baris 220)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 11: `object@244` (baris 244)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/KomplementPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/KomplementPage.tsx)

#### Peta 1: `object@18` (baris 18)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `object@19` (baris 19)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `object@20` (baris 20)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 4: `kali` (baris 26)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 5: `object@28` (baris 28)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 6: `object@55` (baris 55)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 7: `object@76` (baris 76)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 8: `object@127` (baris 127)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 9: `object@184` (baris 184)
Bahasa: id, en, ja
- **Angka berbeda pada `s2q` (id vs ja; nilai-beda):** id=[4, 5, 3], ja=[4, 5, 3, 1]
- **Angka berbeda pada `s3step3` (id vs ja; nilai-beda):** id=[3, 12, 360], ja=[3, 360, 12]

#### Peta 10: `object@259` (baris 259)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 11: `object@283` (baris 283)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangEmpirikPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangEmpirikPage.tsx)

#### Peta 1: `object@28` (baris 28)
Bahasa: id, en, ja
- **Angka berbeda pada `breadcrumb` (id vs ja; nilai-beda):** id=[], ja=[9]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangTeoretikPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/peluang/PeluangTeoretikPage.tsx)

#### Peta 1: `object@27` (baris 27)
Bahasa: id, en, ja
- **Angka berbeda pada `breadcrumb` (id vs ja; nilai-beda):** id=[], ja=[9]
- **Angka berbeda pada `s2q` (id vs ja; nilai-beda):** id=[1, 52], ja=[52, 1]
- **Angka berbeda pada `s3b` (id vs ja; nilai-beda):** id=[2, 2], ja=[2, 1, 2, 2]


## Topik perbandingan

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganBertingkatPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganBertingkatPage.tsx)

#### Peta 1: `translations` (baris 11)
Bahasa: id, en, ja
- **Angka berbeda pada `c1Check` (id vs en; nilai-beda):** id=[40000, 60000, 80000, 180000], en=[40, 60, 80, 180]
- **Angka berbeda pada `c1Math1` (id vs en; adaptasi-mata-uang):** id=[1, 180000, 9, 20000], en=[1, 180, 9, 20]
- **Angka berbeda pada `c1Math2` (id vs en; adaptasi-mata-uang):** id=[2, 20000, 40000], en=[2, 20, 40]
- **Angka berbeda pada `c1Math3` (id vs en; adaptasi-mata-uang):** id=[3, 20000, 60000], en=[3, 20, 60]
- **Angka berbeda pada `c1Math4` (id vs en; adaptasi-mata-uang):** id=[4, 20000, 80000], en=[4, 20, 80]
- **Angka berbeda pada `c1Q` (id vs en; adaptasi-mata-uang):** id=[2, 3, 3, 4, 180000], en=[2, 3, 3, 4, 180]
- **Angka berbeda pada `c3Check` (id vs en; nilai-beda):** id=[350000, 315000, 35000], en=[350, 315, 35]
- **Angka berbeda pada `c3Math1` (id vs en; adaptasi-mata-uang):** id=[1, 35000], en=[1, 35]
- **Angka berbeda pada `c3Math2` (id vs en; adaptasi-mata-uang):** id=[9, 35000, 315000], en=[9, 35, 315]
- **Angka berbeda pada `c3Math3` (id vs en; adaptasi-mata-uang):** id=[12, 35000, 420000], en=[12, 35, 420]
- **Angka berbeda pada `c3Math4` (id vs en; adaptasi-mata-uang):** id=[10, 35000, 350000], en=[10, 35, 350]
- **Angka berbeda pada `c3Math5` (id vs en; adaptasi-mata-uang):** id=[9, 12, 10, 35000, 31, 35000, 1085000], en=[9, 12, 10, 35, 31, 35, 1085]
- **Angka berbeda pada `c3Q` (id vs en; adaptasi-mata-uang):** id=[3, 4, 6, 5, 35000], en=[3, 4, 6, 5, 35]
- **Angka berbeda pada `c3S3` (id vs en; adaptasi-mata-uang):** id=[10, 9, 1, 35000], en=[10, 9, 1, 35]
- **Angka berbeda pada `c1Check` (id vs ja; nilai-beda):** id=[40000, 60000, 80000, 180000], ja=[40, 60, 80, 180]
- **Angka berbeda pada `c1Math1` (id vs ja; adaptasi-mata-uang):** id=[1, 180000, 9, 20000], ja=[1, 180, 9, 20]
- **Angka berbeda pada `c1Math2` (id vs ja; adaptasi-mata-uang):** id=[2, 20000, 40000], ja=[2, 20, 40]
- **Angka berbeda pada `c1Math3` (id vs ja; adaptasi-mata-uang):** id=[3, 20000, 60000], ja=[3, 20, 60]
- **Angka berbeda pada `c1Math4` (id vs ja; adaptasi-mata-uang):** id=[4, 20000, 80000], ja=[4, 20, 80]
- **Angka berbeda pada `c1Q` (id vs ja; adaptasi-mata-uang):** id=[2, 3, 3, 4, 3, 180000], ja=[2, 3, 3, 4, 3, 180]
- **Angka berbeda pada `c3Check` (id vs ja; nilai-beda):** id=[350000, 315000, 35000], ja=[350, 315, 35]
- **Angka berbeda pada `c3Math1` (id vs ja; adaptasi-mata-uang):** id=[1, 35000], ja=[1, 35]
- **Angka berbeda pada `c3Math2` (id vs ja; adaptasi-mata-uang):** id=[9, 35000, 315000], ja=[9, 35, 315]
- **Angka berbeda pada `c3Math3` (id vs ja; adaptasi-mata-uang):** id=[12, 35000, 420000], ja=[12, 35, 420]
- **Angka berbeda pada `c3Math4` (id vs ja; adaptasi-mata-uang):** id=[10, 35000, 350000], ja=[10, 35, 350]
- **Angka berbeda pada `c3Math5` (id vs ja; adaptasi-mata-uang):** id=[9, 12, 10, 35000, 31, 35000, 1085000], ja=[9, 12, 10, 35, 31, 35, 1085]
- **Angka berbeda pada `c3Q` (id vs ja; adaptasi-mata-uang):** id=[3, 4, 6, 5, 35000], ja=[3, 4, 6, 5, 35]
- **Angka berbeda pada `c3S3` (id vs ja; adaptasi-mata-uang):** id=[10, 9, 1, 35000], ja=[10, 9, 1, 35]
- **Angka berbeda pada `introCard2Body` (id vs ja; nilai-beda):** id=[2], ja=[1]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganCampuranPage.tsx)

#### Peta 1: `translations` (baris 11)
Bahasa: id, en, ja
- **Angka berbeda pada `c1Q` (id vs ja; nilai-beda):** id=[4, 48, 6, 6, 9], ja=[4, 6, 48, 6, 9]
- **Angka berbeda pada `c2Q` (id vs ja; nilai-beda):** id=[8, 120, 10, 300, 15], ja=[8, 10, 120, 15, 300]
- **Angka berbeda pada `c2Result` (id vs ja; nilai-beda):** id=[14, 13.3, 14], ja=[14]
- **Angka berbeda pada `c3Q` (id vs ja; nilai-beda):** id=[12, 360, 5, 3, 480], ja=[12, 5, 360, 3, 480]
- **Angka berbeda pada `c3Result` (id vs ja; nilai-beda):** id=[9, 480], ja=[480, 9]
- **Angka berbeda pada `formulaNote` (id vs ja; nilai-beda):** id=[1, 2], ja=[1, 1]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganSenilaiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganSenilaiPage.tsx)

#### Peta 1: `translations` (baris 166)
Bahasa: id, en, ja
- **Angka berbeda pada `c1Math1` (id vs en; nilai-beda):** id=[5, 8, 20000], en=[5, 8, 20]
- **Angka berbeda pada `c1Math2` (id vs en; nilai-beda):** id=[160000, 32000], en=[160, 32]
- **Angka berbeda pada `c1Q` (id vs en; adaptasi-mata-uang):** id=[5, 20000, 8], en=[5, 20, 8]
- **Angka berbeda pada `c1R1c2` (id vs en; adaptasi-mata-uang):** id=[20000], en=[20]
- **Angka berbeda pada `c1Result` (id vs en; adaptasi-mata-uang):** id=[8, 32000], en=[8, 32]
- **Angka berbeda pada `berbalikDef` (id vs ja; nilai-beda):** id=[2, 1], ja=[2, 2]
- **Angka berbeda pada `berbalikSectionBody` (id vs ja; nilai-beda):** id=[2, 1], ja=[2, 2]
- **Angka berbeda pada `c1Math1` (id vs ja; nilai-beda):** id=[5, 8, 20000], ja=[5, 8, 20]
- **Angka berbeda pada `c1Math2` (id vs ja; nilai-beda):** id=[160000, 32000], ja=[160, 32]
- **Angka berbeda pada `c1Q` (id vs ja; adaptasi-mata-uang):** id=[5, 20000, 8], ja=[5, 20, 8]
- **Angka berbeda pada `c1R1c2` (id vs ja; adaptasi-mata-uang):** id=[20000], ja=[20]
- **Angka berbeda pada `c1Result` (id vs ja; adaptasi-mata-uang):** id=[8, 32000], ja=[8, 32]
- **Angka berbeda pada `c3Q` (id vs ja; nilai-beda):** id=[30, 20, 12, 3], ja=[20, 30, 12, 3]
- **Angka berbeda pada `kasusExQ` (id vs ja; nilai-beda):** id=[20, 15, 8, 4], ja=[15, 20, 8, 4]
- **Angka berbeda pada `senilaiDef` (id vs ja; nilai-beda):** id=[2, 1, 2], ja=[2, 2, 2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage.tsx)

#### Peta 1: `translations` (baris 11)
Bahasa: id, en, ja
- **Angka berbeda pada `c1BMath` (id vs en; adaptasi-mata-uang):** id=[15000, 3, 5000], en=[15, 3, 5]
- **Angka berbeda pada `c1BResult` (id vs en; adaptasi-mata-uang):** id=[1, 5000], en=[1, 5]
- **Angka berbeda pada `c1CMath` (id vs en; adaptasi-mata-uang):** id=[12, 5000, 60000], en=[12, 5, 60]
- **Angka berbeda pada `c1CResult` (id vs en; adaptasi-mata-uang):** id=[60000], en=[60]
- **Angka berbeda pada `c1Q` (id vs en; adaptasi-mata-uang):** id=[12, 8, 3, 15000, 1], en=[12, 8, 3, 15, 1]
- **Angka berbeda pada `c3DafaM2Math` (id vs en; adaptasi-mata-uang):** id=[3, 2, 24000, 36000], en=[3, 2, 24, 36]
- **Angka berbeda pada `c3DafaMath` (id vs en; adaptasi-mata-uang):** id=[3, 12000, 36000], en=[3, 12, 36]
- **Angka berbeda pada `c3Q` (id vs en; adaptasi-mata-uang):** id=[3, 5, 24000], en=[3, 5, 24]
- **Angka berbeda pada `c3RaniM2Math` (id vs en; adaptasi-mata-uang):** id=[5, 2, 24000, 60000], en=[5, 2, 24, 60]
- **Angka berbeda pada `c3RaniMath` (id vs en; adaptasi-mata-uang):** id=[5, 12000, 60000], en=[5, 12, 60]
- **Angka berbeda pada `c3TotalM2Math` (id vs en; adaptasi-mata-uang):** id=[8, 2, 24000, 96000], en=[8, 2, 24, 96]
- **Angka berbeda pada `c3TotalMath` (id vs en; adaptasi-mata-uang):** id=[36000, 60000, 96000], en=[36, 60, 96]
- **Angka berbeda pada `c3VarEq` (id vs en; nilai-beda):** id=[24000], en=[24]
- **Angka berbeda pada `c3VarSolve` (id vs en; nilai-beda):** id=[24000, 12000], en=[24, 12]
- **Angka berbeda pada `c1BMath` (id vs ja; adaptasi-mata-uang):** id=[15000, 3, 5000], ja=[15, 3, 5]
- **Angka berbeda pada `c1BResult` (id vs ja; adaptasi-mata-uang):** id=[1, 5000], ja=[1, 5]
- **Angka berbeda pada `c1CMath` (id vs ja; adaptasi-mata-uang):** id=[12, 5000, 60000], ja=[12, 5, 60]
- **Angka berbeda pada `c1CResult` (id vs ja; adaptasi-mata-uang):** id=[60000], ja=[60]
- **Angka berbeda pada `c1Q` (id vs ja; adaptasi-mata-uang):** id=[12, 8, 3, 15000, 1], ja=[12, 8, 3, 15, 1]
- **Angka berbeda pada `c2Check` (id vs ja; nilai-beda):** id=[12, 16, 20, 48], ja=[12, 16, 20]
- **Angka berbeda pada `c2Q` (id vs ja; nilai-beda):** id=[3, 4, 5, 48], ja=[3, 4, 5]
- **Angka berbeda pada `c2Result` (id vs ja; nilai-beda):** id=[12, 16, 20], ja=[]
- **Angka berbeda pada `c3DafaM2Math` (id vs ja; adaptasi-mata-uang):** id=[3, 2, 24000, 36000], ja=[3, 2, 24, 36]
- **Angka berbeda pada `c3DafaMath` (id vs ja; adaptasi-mata-uang):** id=[3, 12000, 36000], ja=[3, 12, 36]
- **Angka berbeda pada `c3Q` (id vs ja; nilai-beda):** id=[3, 5, 24000, 2], ja=[3, 5, 2, 24]
- **Angka berbeda pada `c3RaniM2Math` (id vs ja; adaptasi-mata-uang):** id=[5, 2, 24000, 60000], ja=[5, 2, 24, 60]
- **Angka berbeda pada `c3RaniMath` (id vs ja; adaptasi-mata-uang):** id=[5, 12000, 60000], ja=[5, 12, 60]
- **Angka berbeda pada `c3TotalM2Math` (id vs ja; adaptasi-mata-uang):** id=[8, 2, 24000, 96000], ja=[8, 2, 24, 96]
- **Angka berbeda pada `c3TotalMath` (id vs ja; adaptasi-mata-uang):** id=[36000, 60000, 96000], ja=[36, 60, 96]
- **Angka berbeda pada `c3VarEq` (id vs ja; nilai-beda):** id=[24000], ja=[24]
- **Angka berbeda pada `c3VarSolve` (id vs ja; nilai-beda):** id=[24000, 12000], ja=[24, 12]
- **Angka berbeda pada `introCard1Body` (id vs ja; nilai-beda):** id=[4, 6, 4, 6, 2, 3], ja=[4, 6, 2, 4, 6, 2, 3]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/perbandingan/SkalaPage.tsx)

#### Peta 1: `translations` (baris 11)
Bahasa: id, en, ja
- **Angka berbeda pada `c1Q` (id vs ja; nilai-beda):** id=[1, 2000000, 4.5, 2], ja=[1, 2000000, 4, 2]
- **Angka berbeda pada `c1Result` (id vs ja; nilai-beda):** id=[90], ja=[]
- **Angka berbeda pada `c2Q` (id vs ja; nilai-beda):** id=[15, 3, 24], ja=[2, 3, 1]
- **Angka berbeda pada `c2ResultB` (id vs ja; nilai-beda):** id=[4.8], ja=[4]
- **Angka berbeda pada `c2UbahA` (id vs ja; nilai-beda):** id=[15, 15, 100000, 1500000], ja=[15, 100, 1500]
- **Angka berbeda pada `c2UbahB` (id vs ja; nilai-beda):** id=[24, 2400000], ja=[2400]
- **Angka berbeda pada `c3NoteB` (id vs ja; nilai-beda):** id=[800, 800, 10000, 8000000], ja=[800, 10000, 8000]
- **Angka berbeda pada `c3Q` (id vs ja; nilai-beda):** id=[1, 1000, 12, 800], ja=[1, 1000]
- **Angka berbeda pada `c3ResultA` (id vs ja; nilai-beda):** id=[1200], ja=[1]
- **Angka berbeda pada `c3ResultB` (id vs ja; nilai-beda):** id=[8], ja=[]
- **Angka berbeda pada `luasBody` (id vs ja; nilai-beda):** id=[2], ja=[2, 2]
- **Angka berbeda pada `luasExQ` (id vs ja; nilai-beda):** id=[1, 500, 6], ja=[1, 500]
- **Angka berbeda pada `readNote` (id vs ja; nilai-beda):** id=[1, 500000, 1, 500000, 5], ja=[1, 500000, 500]


## Topik persamaan-garis-lurus

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/AplikasiKontekstualPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/AplikasiKontekstualPage.tsx)

#### Peta 1: `object@49` (baris 49)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GradienPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GradienPage.tsx)

#### Peta 1: `T_GRADIEN` (baris 15)
Bahasa: id, en, ja
- **Angka berbeda pada `c4_ans` (id vs ja; nilai-beda):** id=[-2, -2, 0, 3, 2, 1], ja=[-2, -2, 0, 3, 1, 2]
- **Angka berbeda pada `c4_l1` (id vs ja; nilai-beda):** id=[1], ja=[1, 2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GrafikPGLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/GrafikPGLPage.tsx)

#### Peta 1: `T_GRAFIK` (baris 13)
Bahasa: id, en, ja
- **Angka berbeda pada `sh_titikpotong` (id vs en; nilai-beda):** id=[2], en=[]
- **Angka berbeda pada `c3_soal_end` (id vs ja; nilai-beda):** id=[1], ja=[2]
- **Angka berbeda pada `sh_titikpotong` (id vs ja; nilai-beda):** id=[2], ja=[]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/Hubungan2GarisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/Hubungan2GarisPage.tsx)

#### Peta 1: `T_HUBUNGAN` (baris 97)
Bahasa: id, en, ja
- **Angka berbeda pada `ber_anim_perp_at` (id vs ja; nilai-beda):** id=[90], ja=[]
- **Angka berbeda pada `sej_p2` (id vs ja; nilai-beda):** id=[2, 5], ja=[2, 2]
- **Angka berbeda pada `sh_intro` (id vs ja; nilai-beda):** id=[3, 2], ja=[2, 3]
- **Angka berbeda pada `tek_p2` (id vs ja; nilai-beda):** id=[90, 90, 1, 1, -1], ja=[90, 1, 90, 1, -1]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/MenentukanPGLPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/persamaan-garis-lurus/MenentukanPGLPage.tsx)

#### Peta 1: `T_MENENTUKAN` (baris 69)
Bahasa: id, en, ja
- **Angka berbeda pada `c2_p1` (id vs en; nilai-beda):** id=[2], en=[1]
- **Angka berbeda pada `c2_p1` (id vs ja; nilai-beda):** id=[2], ja=[1]


## Topik persamaan-kuadrat

Tidak ada objek terjemahan per bahasa yang dapat dianalisis.

## Topik plsv-ptlsv

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/KalimatTerbukaTertutupPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/KalimatTerbukaTertutupPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- **ja, key tambahan:** `terbukaDefBody4`
- **Angka berbeda pada `c3Question` (id vs ja; nilai-beda):** id=[2], ja=[1]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPLSVPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `c3Q` (id vs en; adaptasi-mata-uang):** id=[2000, 3, 5, 22000], en=[2, 3, 5, 22]
- **Angka berbeda pada `c2Q` (id vs ja; nilai-beda):** id=[3, 28], ja=[3, 2, 28]
- **Angka berbeda pada `c3Q` (id vs ja; adaptasi-mata-uang):** id=[2, 2000, 3, 5, 22000], ja=[2, 2, 3, 5, 22]
- **Angka berbeda pada `introBox` (id vs ja; nilai-beda):** id=[5, 35], ja=[5, 2, 35]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPtLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPtLSVPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `c3Q` (id vs en; adaptasi-mata-uang):** id=[150000, 8000, 5000, 10], en=[150, 8, 5, 10]
- **Angka berbeda pada `currency.a` (id vs en; adaptasi-mata-uang):** id=[8000], en=[8]
- **Angka berbeda pada `currency.b` (id vs en; adaptasi-mata-uang):** id=[5000], en=[5]
- **Angka berbeda pada `currency.budget` (id vs en; adaptasi-mata-uang):** id=[150000], en=[150]
- **Angka berbeda pada `currency.hint` (id vs en; adaptasi-mata-uang):** id=[12000], en=[12]
- **Angka berbeda pada `currency.pocket` (id vs en; adaptasi-mata-uang):** id=[50000], en=[50]
- **Angka berbeda pada `introBox` (id vs en; adaptasi-mata-uang):** id=[50000, 12000], en=[50, 12]
- **Angka berbeda pada `c1Q` (id vs ja; nilai-beda):** id=[480, 60], ja=[1]
- **Angka berbeda pada `c2Q` (id vs ja; nilai-beda):** id=[3, 1, 70, 75, 80, 78], ja=[3, 70, 75, 80, 4, 78]
- **Angka berbeda pada `c2s4` (id vs ja; nilai-beda):** id=[], ja=[4]
- **Angka berbeda pada `c2s4c` (id vs ja; nilai-beda):** id=[4], ja=[]
- **Angka berbeda pada `c3Q` (id vs ja; nilai-beda):** id=[150000, 2, 8000, 5000, 10], ja=[150, 2, 1, 8, 1, 5, 10]
- **Angka berbeda pada `currency.a` (id vs ja; adaptasi-mata-uang):** id=[8000], ja=[8]
- **Angka berbeda pada `currency.b` (id vs ja; adaptasi-mata-uang):** id=[5000], ja=[5]
- **Angka berbeda pada `currency.budget` (id vs ja; adaptasi-mata-uang):** id=[150000], ja=[150]
- **Angka berbeda pada `currency.hint` (id vs ja; adaptasi-mata-uang):** id=[12000], ja=[12]
- **Angka berbeda pada `currency.pocket` (id vs ja; adaptasi-mata-uang):** id=[50000], ja=[50]
- **Angka berbeda pada `introBox` (id vs ja; nilai-beda):** id=[50000, 12000], ja=[50, 1, 12]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/PengertianPLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/PengertianPLSVPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/PengertianPtLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/PengertianPtLSVPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `introBody` (id vs en; adaptasi-mata-uang):** id=[50000, 75], en=[50, 75]
- **Angka berbeda pada `introBody` (id vs ja; adaptasi-mata-uang):** id=[50000, 75], ja=[50, 75]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/PenyelesaianPLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/PenyelesaianPLSVPage.tsx)

#### Peta 1: `translations` (baris 13)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/PenyelesaianPtLSVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/plsv-ptlsv/PenyelesaianPtLSVPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.


## Topik pola-bilangan

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PengertianPolaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PengertianPolaPage.tsx)

#### Peta 1: `translations` (baris 29)
Bahasa: id, en, ja
- **Angka berbeda pada `ex1Answer` (id vs ja; nilai-beda):** id=[12, 1, 4, 9, 16, 144], ja=[1, 4, 9, 16, 12, 144]
- **Angka berbeda pada `ex2Answer` (id vs ja; nilai-beda):** id=[15, 6, 12, 20, 30, 272], ja=[6, 12, 20, 30, 15, 272]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage.tsx)

#### Peta 1: `translations` (baris 13)
Bahasa: id, en, ja
- **Angka berbeda pada `derivStep1Desc` (id vs ja; nilai-beda):** id=[1], ja=[2]
- **Angka berbeda pada `ex2bProblem` (id vs ja; nilai-beda):** id=[10, 1, 155, 5, 10], ja=[10, 155, 1, 5, 10]
- **Angka berbeda pada `ex4Ans` (id vs ja; nilai-beda):** id=[4, 200, 400, 14700], ja=[200, 400, 4, 14700]
- **Angka berbeda pada `ex4Desc` (id vs ja; nilai-beda):** id=[4, 200, 400, 200, 400], ja=[200, 400, 4, 200, 400]
- **Angka berbeda pada `ex4Note` (id vs ja; nilai-beda):** id=[49, 4, 200, 400, 204, 396], ja=[200, 400, 204, 396, 49, 4]
- **Angka berbeda pada `ex4Problem` (id vs ja; nilai-beda):** id=[4, 200, 400], ja=[200, 400, 4]
- **Angka berbeda pada `howToUseBody` (id vs ja; nilai-beda):** id=[1, 5, 20, 100, 1, 1], ja=[1, 5, 20, 100, 1, 2]
- **Angka berbeda pada `seriesSummaryBody` (id vs ja; nilai-beda):** id=[1], ja=[2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage.tsx)

#### Peta 1: `translations` (baris 13)
Bahasa: id, en, ja
- **Angka berbeda pada `ex2Ans` (id vs en; nilai-beda):** id=[2, 3, 10, 39, 366], en=[2, 3, 10, 39366]
- **Angka berbeda pada `introBody` (id vs en; nilai-beda):** id=[15, 0, 1, 15, 2, 30, 4, 45, 8, 2], en=[15, 1, 0, 15, 2, 30, 4, 45, 8, 2]
- **Angka berbeda pada `ex2Ans` (id vs ja; nilai-beda):** id=[2, 3, 10, 39, 366], ja=[2, 3, 10, 39366]
- **Angka berbeda pada `ex2bProblem` (id vs ja; nilai-beda):** id=[5, 1, 62, 2, 5], ja=[5, 62, 1, 2, 5]
- **Angka berbeda pada `ex3Problem` (id vs ja; nilai-beda):** id=[500, 1, 20, 6, 2000], ja=[1, 500, 20, 6, 2000]
- **Angka berbeda pada `introBody` (id vs ja; nilai-beda):** id=[2, 15, 0, 1, 15, 2, 30, 4, 45, 8, 2], ja=[15, 2, 0, 1, 15, 2, 30, 4, 45, 8, 2]
- **Angka berbeda pada `seriesSummaryBody` (id vs ja; nilai-beda):** id=[1, 1, 1], ja=[1, 2, 1]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaKhususPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/pola-bilangan/PolaKhususPage.tsx)

#### Peta 1: `translations` (baris 13)
Bahasa: id, en, ja
- **Angka berbeda pada `animDesc` (id vs ja; nilai-beda):** id=[2], ja=[1]
- **Angka berbeda pada `ex1Ans` (id vs ja; nilai-beda):** id=[12, 1, 4, 9, 16, 144], ja=[1, 4, 9, 16, 12, 144]
- **Angka berbeda pada `pascal.desc` (id vs ja; nilai-beda):** id=[2, 1], ja=[2, 1, 1]


## Topik relasi-fungsi

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/BanyakFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/BanyakFungsiPage.tsx)

#### Peta 1: `object@27` (baris 27)
Bahasa: id, en, ja
- **Angka berbeda pada `intro_idea_p` (id vs ja; nilai-beda):** id=[1, 2, 1, 3, 2, 3, 3, 3, 9], ja=[1, 2, 3, 1, 2, 3, 3, 3, 9]
- **Angka berbeda pada `koresp_def` (id vs ja; nilai-beda):** id=[1], ja=[2]
- **Angka berbeda pada `koresp_visual_no` (id vs ja; nilai-beda):** id=[1, 1], ja=[]
- **Angka berbeda pada `rumus_li1b` (id vs ja; adaptasi-nama-konteks):** id=[], ja=[1]
- **Angka berbeda pada `rumus_li2b` (id vs ja; adaptasi-nama-konteks):** id=[], ja=[1]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/BukuAnimasiBanyakFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/BukuAnimasiBanyakFungsiPage.tsx)

#### Peta 1: `object@9` (baris 9)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/GrafikFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/GrafikFungsiPage.tsx)

#### Peta 1: `object@13` (baris 13)
Bahasa: id, en, ja
- **en, key id yang tidak ada:** `graph1_sub`, `graph1_title`, `graph2_sub`, `graph2_title`
- **ja, key id yang tidak ada:** `graph1_sub`, `graph1_title`, `graph2_sub`, `graph2_title`
- **Angka berbeda pada `c2_opts[].teks` (id vs en; adaptasi-mata-uang):** id=[25000], en=[25]
- **Angka berbeda pada `c2_steps[]` (id vs en; adaptasi-mata-uang):** id=[5, 3, 5, 7, 15, 7, 22, 22000], en=[5, 3, 5, 7, 15, 7, 22, 22]
- **Angka berbeda pada `c2_opts[].teks` (id vs ja; adaptasi-mata-uang):** id=[25000], ja=[25]
- **Angka berbeda pada `c2_steps[]` (id vs ja; adaptasi-mata-uang):** id=[5, 3, 5, 7, 15, 7, 22, 22000], ja=[5, 3, 5, 7, 15, 7, 22, 22]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/NotasiFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/NotasiFungsiPage.tsx)

#### Peta 1: `object@14` (baris 14)
Bahasa: id, en, ja
- **Angka berbeda pada `c3_answer` (id vs ja; nilai-beda):** id=[3, 2, 2, 9, 29], ja=[3, 2, 2, 29, 9]
- **Angka berbeda pada `notasi_rows[].baca` (id vs ja; nilai-beda):** id=[2], ja=[3]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/PengertianFungsiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/PengertianFungsiPage.tsx)

#### Peta 1: `translations` (baris 14)
Bahasa: id, en, ja
- **Angka berbeda pada `pair2Note` (id vs en; nilai-beda):** id=[2], en=[]
- **Angka berbeda pada `c2Diagrams[].penj` (id vs ja; nilai-beda):** id=[2, 2, 2, 1, 2], ja=[2, 2, 2, 2, 1]
- **Angka berbeda pada `c3ConclText` (id vs ja; nilai-beda):** id=[], ja=[3]
- **Angka berbeda pada `c4ConcText` (id vs ja; nilai-beda):** id=[1], ja=[2]
- **Angka berbeda pada `funcDesc` (id vs ja; nilai-beda):** id=[1, 1, 3, 1], ja=[1, 1, 3]
- **Angka berbeda pada `konsepNoteText` (id vs ja; nilai-beda):** id=[2, 1], ja=[1, 2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/PengertianRelasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/relasi-fungsi/PengertianRelasiPage.tsx)

#### Peta 1: `translations` (baris 13)
Bahasa: id, en, ja
- **Angka berbeda pada `langkah` (id vs en; label):** id=[], en=[1]
- **Angka berbeda pada `langkah` (id vs ja; label):** id=[], ja=[1]


## Topik segitiga-segiempat

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/GarisBeratBagiTinggiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/GarisBeratBagiTinggiPage.tsx)

#### Peta 1: `translations` (baris 15)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/KelilingLuasBangunTakBeraturanPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/KelilingLuasBangunTakBeraturanPage.tsx)

#### Peta 1: `translations` (baris 15)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/KelilingSegitigaSegiempatPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/KelilingSegitigaSegiempatPage.tsx)

#### Peta 1: `translations` (baris 15)
Bahasa: id, en, ja
- **Angka berbeda pada `s3rectDesc3` (id vs ja; adaptasi-nama-konteks):** id=[], ja=[2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegiempatPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegiempatPage.tsx)

#### Peta 1: `translations` (baris 15)
Bahasa: id, en, ja
- **Angka berbeda pada `ex2q2` (id vs ja; nilai-beda):** id=[50000], ja=[1, 50000]
- **Angka berbeda pada `s1tipSqEnd` (id vs ja; nilai-beda):** id=[1], ja=[1, 2]
- **Angka berbeda pada `s4llp1` (id vs ja; nilai-beda):** id=[2, 1], ja=[2, 2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegitigaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/segitiga-segiempat/LuasSegitigaPage.tsx)

#### Peta 1: `translations` (baris 15)
Bahasa: id, en, ja
- **Angka berbeda pada `s4tipText` (id vs en; nilai-beda):** id=[1, 10, 1, 100], en=[10, 1, 100]
- **Angka berbeda pada `ex2q2` (id vs ja; nilai-beda):** id=[12000], ja=[1, 12000]
- **Angka berbeda pada `s4tipText` (id vs ja; nilai-beda):** id=[1, 10, 1, 100], ja=[1, 10, -1, 100]


## Topik spldv

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage.tsx)

#### Peta 1: `translations` (baris 13)
Bahasa: id, en, ja
- **Angka berbeda pada `introDesc` (id vs en; adaptasi-mata-uang):** id=[2, 1, 25000, 1, 2, 23000], en=[2, 1, 25, 1, 2, 23]
- **Angka berbeda pada `quiz2Choices[].p1` (id vs en; nilai-beda):** id=[2, 7000, 11000, 14000, 11000, 25000], en=[2, 7, 11, 14, 11, 25]
- **Angka berbeda pada `quiz2Choices[].p2` (id vs en; nilai-beda):** id=[7000, 2, 11000, 7000, 22000, 29000, 23000], en=[7, 2, 11, 7, 22, 29, 23]
- **Angka berbeda pada `introDesc` (id vs ja; adaptasi-mata-uang):** id=[2, 1, 25000, 1, 2, 23000, 2, 2], ja=[2, 1, 25, 1, 2, 23, 2, 2]
- **Angka berbeda pada `pldvCoefLabel` (id vs ja; nilai-beda):** id=[], ja=[0]
- **Angka berbeda pada `pldvSummaryDesc` (id vs ja; nilai-beda):** id=[2, 2, 1, 0], ja=[2, 1, 0, 1]
- **Angka berbeda pada `q1Problem` (id vs ja; nilai-beda):** id=[], ja=[2]
- **Angka berbeda pada `q3R1` (id vs ja; nilai-beda):** id=[1], ja=[]
- **Angka berbeda pada `quiz2Choices[].p1` (id vs ja; nilai-beda):** id=[2, 7000, 11000, 14000, 11000, 25000], ja=[2, 7, 11, 14, 11, 25]
- **Angka berbeda pada `quiz2Choices[].p2` (id vs ja; nilai-beda):** id=[7000, 2, 11000, 7000, 22000, 29000, 23000], ja=[7, 2, 11, 7, 22, 29, 23]
- **Angka berbeda pada `spldvEq2Desc` (id vs ja; nilai-beda):** id=[2, 1], ja=[1, 2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeCampuranPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeCampuranPage.tsx)

#### Peta 1: `translations` (baris 13)
Bahasa: id, en, ja
- **Angka berbeda pada `q3` (id vs ja; nilai-beda):** id=[3, 2, 14, 4, 5, 24.5], ja=[14, 24.5]
- **Angka berbeda pada `summaryDesc` (id vs ja; nilai-beda):** id=[1, 2], ja=[2, 2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeEliminasiPage.tsx)

#### Peta 1: `translations` (baris 15)
Bahasa: id, en, ja
- **Angka berbeda pada `q3Answer` (id vs en; nilai-beda):** id=[1, 16.8, 1, 10.8], en=[16.8, 10.8]
- **Angka berbeda pada `q3L2Note` (id vs en; nilai-beda):** id=[2], en=[1, 2, 2]
- **Angka berbeda pada `q3MangoVar` (id vs en; nilai-beda):** id=[1], en=[]
- **Angka berbeda pada `q3OrangeVar` (id vs en; nilai-beda):** id=[1], en=[]
- **Angka berbeda pada `introDesc` (id vs ja; nilai-beda):** id=[1, 2], ja=[2, 1]
- **Angka berbeda pada `q3` (id vs ja; nilai-beda):** id=[4, 6, 132, 3, 2, 72], ja=[2, 132, 2, 72]
- **Angka berbeda pada `q3Answer` (id vs ja; nilai-beda):** id=[1, 16.8, 1, 10.8], ja=[16.8, 10.8]
- **Angka berbeda pada `q3L2Note` (id vs ja; nilai-beda):** id=[2], ja=[1, 2, 2]
- **Angka berbeda pada `q3MangoVar` (id vs ja; nilai-beda):** id=[1], ja=[]
- **Angka berbeda pada `q3OrangeVar` (id vs ja; nilai-beda):** id=[1], ja=[]
- **Angka berbeda pada `summaryDesc` (id vs ja; nilai-beda):** id=[1], ja=[2]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeGrafikPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeGrafikPage.tsx)

#### Peta 1: `translations` (baris 14)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeSubstitusiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/MetodeSubstitusiPage.tsx)

#### Peta 1: `translations` (baris 13)
Bahasa: id, en, ja
- **Angka berbeda pada `introDesc` (id vs ja; nilai-beda):** id=[1, 1], ja=[2, 1]
- **Angka berbeda pada `q3Ticket` (id vs ja; adaptasi-nama-konteks):** id=[], ja=[1]
- **Angka berbeda pada `q3VIP` (id vs ja; adaptasi-nama-konteks):** id=[], ja=[1]
- **Angka berbeda pada `summaryDesc` (id vs ja; nilai-beda):** id=[2, 2], ja=[2, 1]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/ModelSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/ModelSPLDVPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `q2Problem` (id vs ja; nilai-beda):** id=[3, 27], ja=[3, 2, 27]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage.tsx)

#### Peta 1: `translations` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `q1L1Points[]` (id vs en; nilai-beda):** id=[1, 1], en=[]
- **Angka berbeda pada `q1Problem` (id vs en; nilai-beda):** id=[3, 2, 54, 1, 4, 52, 1, 1], en=[3, 2, 54, 1, 4, 52]
- **Angka berbeda pada `q1Answer` (id vs ja; nilai-beda):** id=[1, 11.2, 1, 10.2], ja=[11.2, 10.2]
- **Angka berbeda pada `q1L1Points[]` (id vs ja; nilai-beda):** id=[1, 1], ja=[]
- **Angka berbeda pada `q1L2Var1` (id vs ja; nilai-beda):** id=[1], ja=[]
- **Angka berbeda pada `q1L2Var2` (id vs ja; nilai-beda):** id=[1], ja=[]
- **Angka berbeda pada `q1Problem` (id vs ja; nilai-beda):** id=[3, 2, 54, 1, 4, 52, 1, 1], ja=[54, 52]
- **Angka berbeda pada `q3L2Rel2` (id vs ja; nilai-beda):** id=[3, 2], ja=[2, 3]
- **Angka berbeda pada `q3Problem` (id vs ja; nilai-beda):** id=[54, 3, 2], ja=[54, 2, 3]


## Topik statistika

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/KuartilPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/KuartilPage.tsx)

#### Peta 1: `object@18` (baris 18)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `object@19` (baris 19)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `object@20` (baris 20)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 4: `object@26` (baris 26)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 5: `object@53` (baris 53)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 6: `object@80` (baris 80)
Bahasa: id, en, ja
- **Angka berbeda pada `badges[].label` (id vs ja; nilai-beda):** id=[], ja=[3]

#### Peta 7: `object@122` (baris 122)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 8: `object@200` (baris 200)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 9: `object@260` (baris 260)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 10: `object@314` (baris 314)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/MedianModusPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/MedianModusPage.tsx)

#### Peta 1: `object@22` (baris 22)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `object@23` (baris 23)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `object@24` (baris 24)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 4: `object@25` (baris 25)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 5: `object@26` (baris 26)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 6: `object@61` (baris 61)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 7: `object@530` (baris 530)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 8: `object@916` (baris 916)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 9: `object@946` (baris 946)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 10: `object@979` (baris 979)
Bahasa: id, en, ja
- **Angka berbeda pada `compareText` (id vs ja; nilai-beda):** id=[5, 3, 3, 4, 5, 100, 23, 100, 4, 3], ja=[5, 300, 300, 400, 500, 1, 2300, 1, 400, 300]

#### Peta 11: `object@1009` (baris 1009)
Bahasa: id, en, ja
- **Angka berbeda pada `tryDesc` (id vs ja; label):** id=[], ja=[1]

#### Peta 12: `object@1054` (baris 1054)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 13: `object@1108` (baris 1108)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 14: `object@1153` (baris 1153)
Bahasa: id, en, ja
- **Angka berbeda pada `bisaLebih` (id vs ja; nilai-beda):** id=[1], ja=[2]

#### Peta 15: `object@1195` (baris 1195)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/PengantarStatistikaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/PengantarStatistikaPage.tsx)

#### Peta 1: `rangkumanData` (baris 48)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/PenyajianDataPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/PenyajianDataPage.tsx)

#### Peta 1: `object@30` (baris 30)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `object@36` (baris 36)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `object@54` (baris 54)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 4: `object@398` (baris 398)
Bahasa: id, en, ja
- **Angka berbeda pada `linePlaceholder` (id vs ja; nilai-beda):** id=[], ja=[1]

#### Peta 5: `locale constants@100` (baris 101)
Bahasa: id, en, ja
- **Angka berbeda pada `linePlaceholder` (id vs ja; nilai-beda):** id=[], ja=[1]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/PenyebaranDataPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/PenyebaranDataPage.tsx)

#### Peta 1: `object@13` (baris 13)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `object@19` (baris 19)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `object@40` (baris 40)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/RataRataPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/statistika/RataRataPage.tsx)

#### Peta 1: `rangkumanData` (baris 336)
Bahasa: id, en, ja
- **Angka berbeda pada `tips[].teks` (id vs ja; adaptasi-nama-konteks):** id=[], ja=[1]


## Topik teorema-pythagoras

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/JenisSegitigaPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/JenisSegitigaPage.tsx)

#### Peta 1: `object@12` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `c1Problem` (id vs ja; nilai-beda):** id=[6, 8, 10], ja=[]
- **Angka berbeda pada `c2Problem` (id vs ja; nilai-beda):** id=[5, 7, 9], ja=[]
- **Angka berbeda pada `introDesc1` (id vs ja; nilai-beda):** id=[], ja=[2]
- **Angka berbeda pada `subtitle` (id vs ja; nilai-beda):** id=[], ja=[8]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage.tsx)

#### Peta 1: `object@12` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `astronaut` (id vs ja; nilai-beda):** id=[2, 3, 3], ja=[3, 2, 3]
- **Angka berbeda pada `c1Ans` (id vs ja; nilai-beda):** id=[8, 6, 8, 10, 3, 4, 5], ja=[6, 8, 10, 3, 4, 5, 2]
- **Angka berbeda pada `c1Problem` (id vs ja; nilai-beda):** id=[10, 6], ja=[]
- **Angka berbeda pada `c2Ans` (id vs ja; nilai-beda):** id=[14.72], ja=[14]
- **Angka berbeda pada `c2Problem` (id vs ja; nilai-beda):** id=[13.4, 6.1, 2], ja=[13, 6, 2]
- **Angka berbeda pada `c3Problem` (id vs ja; nilai-beda):** id=[36, 15, 20], ja=[2]
- **Angka berbeda pada `c3ShipPDesc` (id vs ja; nilai-beda):** id=[36, 15], ja=[]
- **Angka berbeda pada `c3ShipQDesc` (id vs ja; nilai-beda):** id=[20, 0], ja=[]
- **Angka berbeda pada `subtitle` (id vs ja; nilai-beda):** id=[], ja=[8]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MenghitungPanjangPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/MenghitungPanjangPage.tsx)

#### Peta 1: `object@12` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `c1Ans` (id vs ja; nilai-beda):** id=[10], ja=[]
- **Angka berbeda pada `c1Problem` (id vs ja; nilai-beda):** id=[6, 8], ja=[]
- **Angka berbeda pada `c2Ans` (id vs ja; nilai-beda):** id=[12], ja=[]
- **Angka berbeda pada `c2Problem` (id vs ja; nilai-beda):** id=[13, 5], ja=[]
- **Angka berbeda pada `c3Ans2` (id vs ja; nilai-beda):** id=[11.4], ja=[11]
- **Angka berbeda pada `c3Problem` (id vs ja; nilai-beda):** id=[7, 9], ja=[]
- **Angka berbeda pada `introDesc` (id vs ja; nilai-beda):** id=[3, 2, 1, 1, 2, 3], ja=[3, 2, 1, 2, 1, 3]
- **Angka berbeda pada `subtitle` (id vs ja; nilai-beda):** id=[], ja=[8]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/PembuktianPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/PembuktianPage.tsx)

#### Peta 1: `PP_TRANSLATIONS` (baris 19)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/SudutKhususPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/SudutKhususPage.tsx)

#### Peta 1: `object@12` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `c1Problem` (id vs ja; nilai-beda):** id=[10], ja=[]
- **Angka berbeda pada `c2Ans` (id vs ja; nilai-beda):** id=[6], ja=[]
- **Angka berbeda pada `c3Problem` (id vs ja; nilai-beda):** id=[12, 45, 45, 90], ja=[45, 45, 90]
- **Angka berbeda pada `c3Step2` (id vs ja; nilai-beda):** id=[2, 45, 45, 90], ja=[2]
- **Angka berbeda pada `c3Step2b` (id vs ja; nilai-beda):** id=[], ja=[45, 45, 90]
- **Angka berbeda pada `subtitle` (id vs ja; nilai-beda):** id=[], ja=[8]

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/TriplePythagorasPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/teorema-pythagoras/TriplePythagorasPage.tsx)

#### Peta 1: `object@12` (baris 12)
Bahasa: id, en, ja
- **Angka berbeda pada `introDesc2` (id vs ja; nilai-beda):** id=[], ja=[3]
- **Angka berbeda pada `introPic` (id vs ja; nilai-beda):** id=[5, 12, 13], ja=[]
- **Angka berbeda pada `subtitle` (id vs ja; nilai-beda):** id=[], ja=[8]

#### Peta 2: `LIMA_TIPE_LABELS` (baris 298)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.


## Topik transformasi-geometri

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/DilatasisPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/DilatasisPage.tsx)

#### Peta 1: `object@289` (baris 289)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `object@290` (baris 290)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `object@291` (baris 291)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 4: `object@292` (baris 292)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 5: `object@293` (baris 293)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 6: `object@294` (baris 294)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 7: `object@295` (baris 295)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 8: `object@296` (baris 296)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 9: `object@297` (baris 297)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 10: `object@298` (baris 298)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 11: `object@299` (baris 299)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 12: `object@300` (baris 300)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 13: `object@301` (baris 301)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 14: `object@302` (baris 302)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 15: `object@303` (baris 303)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 16: `object@304` (baris 304)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 17: `object@305` (baris 305)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 18: `object@306` (baris 306)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 19: `object@307` (baris 307)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 20: `object@308` (baris 308)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 21: `object@309` (baris 309)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 22: `object@310` (baris 310)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 23: `object@311` (baris 311)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 24: `object@312` (baris 312)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 25: `object@313` (baris 313)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 26: `object@314` (baris 314)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 27: `object@315` (baris 315)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 28: `object@316` (baris 316)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 29: `object@317` (baris 317)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 30: `object@318` (baris 318)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 31: `object@319` (baris 319)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 32: `object@320` (baris 320)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 33: `object@321` (baris 321)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 34: `object@322` (baris 322)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 35: `object@323` (baris 323)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 36: `object@324` (baris 324)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 37: `object@325` (baris 325)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 38: `object@326` (baris 326)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 39: `object@327` (baris 327)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 40: `object@328` (baris 328)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 41: `object@329` (baris 329)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 42: `object@330` (baris 330)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 43: `object@331` (baris 331)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 44: `object@332` (baris 332)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 45: `object@333` (baris 333)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 46: `object@334` (baris 334)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 47: `object@335` (baris 335)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 48: `object@336` (baris 336)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 49: `object@337` (baris 337)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 50: `object@338` (baris 338)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 51: `object@339` (baris 339)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 52: `object@340` (baris 340)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 53: `object@344` (baris 344)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 54: `object@345` (baris 345)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 55: `object@346` (baris 346)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 56: `object@347` (baris 347)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 57: `object@348` (baris 348)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 58: `object@349` (baris 349)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 59: `object@1775` (baris 1775)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 60: `object@1776` (baris 1776)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 61: `object@1777` (baris 1777)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 62: `object@1778` (baris 1778)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 63: `object@1783` (baris 1783)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 64: `object@1788` (baris 1788)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 65: `object@1793` (baris 1793)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 66: `object@1794` (baris 1794)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 67: `object@1795` (baris 1795)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 68: `object@1796` (baris 1796)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 69: `object@1797` (baris 1797)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 70: `object@1799` (baris 1799)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 71: `object@1800` (baris 1800)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 72: `object@1801` (baris 1801)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 73: `object@1802` (baris 1802)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 74: `object@1803` (baris 1803)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 75: `object@1804` (baris 1804)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 76: `object@1805` (baris 1805)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 77: `object@1810` (baris 1810)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 78: `object@1815` (baris 1815)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 79: `object@1816` (baris 1816)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 80: `object@1817` (baris 1817)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 81: `object@1818` (baris 1818)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 82: `object@1820` (baris 1820)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 83: `object@1821` (baris 1821)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 84: `object@1822` (baris 1822)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 85: `object@1823` (baris 1823)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 86: `object@1824` (baris 1824)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 87: `object@1825` (baris 1825)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 88: `object@1826` (baris 1826)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 89: `object@1827` (baris 1827)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 90: `object@1828` (baris 1828)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 91: `object@1829` (baris 1829)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 92: `object@1830` (baris 1830)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 93: `object@1831` (baris 1831)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 94: `object@1832` (baris 1832)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 95: `object@1833` (baris 1833)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 96: `object@1834` (baris 1834)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 97: `object@1835` (baris 1835)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 98: `object@1836` (baris 1836)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 99: `object@1837` (baris 1837)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 100: `object@1838` (baris 1838)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 101: `object@1839` (baris 1839)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 102: `object@1841` (baris 1841)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 103: `object@1842` (baris 1842)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 104: `object@1843` (baris 1843)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 105: `object@1844` (baris 1844)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 106: `object@1845` (baris 1845)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 107: `object@1846` (baris 1846)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 108: `object@1847` (baris 1847)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 109: `object@1848` (baris 1848)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 110: `object@1849` (baris 1849)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 111: `object@1850` (baris 1850)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 112: `object@1851` (baris 1851)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 113: `object@1853` (baris 1853)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 114: `object@1854` (baris 1854)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 115: `object@1855` (baris 1855)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 116: `object@1856` (baris 1856)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 117: `object@1857` (baris 1857)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 118: `object@1858` (baris 1858)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 119: `object@1859` (baris 1859)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 120: `object@1860` (baris 1860)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 121: `object@1861` (baris 1861)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 122: `object@1862` (baris 1862)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 123: `object@1863` (baris 1863)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 124: `object@1864` (baris 1864)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 125: `object@1865` (baris 1865)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 126: `object@1866` (baris 1866)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 127: `object@1868` (baris 1868)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 128: `object@1869` (baris 1869)
Bahasa: id, en, ja
- **Angka berbeda pada `$value` (id vs ja; nilai-beda):** id=[1], ja=[4]

#### Peta 129: `object@1874` (baris 1874)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 130: `object@1875` (baris 1875)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 131: `object@1876` (baris 1876)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 132: `object@1877` (baris 1877)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 133: `object@1879` (baris 1879)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/RefleksiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/RefleksiPage.tsx)

#### Peta 1: `object@85` (baris 85)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `object@156` (baris 156)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `object@157` (baris 157)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 4: `object@196` (baris 196)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 5: `object@197` (baris 197)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 6: `object@198` (baris 198)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 7: `object@199` (baris 199)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 8: `object@201` (baris 201)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 9: `object@250` (baris 250)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 10: `object@251` (baris 251)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 11: `object@252` (baris 252)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 12: `object@253` (baris 253)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 13: `object@254` (baris 254)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 14: `object@255` (baris 255)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 15: `object@256` (baris 256)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 16: `object@257` (baris 257)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 17: `object@404` (baris 404)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 18: `object@405` (baris 405)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 19: `object@406` (baris 406)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 20: `object@407` (baris 407)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 21: `object@408` (baris 408)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 22: `object@409` (baris 409)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 23: `object@410` (baris 410)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 24: `object@411` (baris 411)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 25: `object@412` (baris 412)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 26: `object@413` (baris 413)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 27: `object@418` (baris 418)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 28: `object@587` (baris 587)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 29: `object@588` (baris 588)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 30: `object@589` (baris 589)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 31: `object@590` (baris 590)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 32: `object@591` (baris 591)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 33: `object@592` (baris 592)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 34: `object@593` (baris 593)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 35: `object@594` (baris 594)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 36: `object@743` (baris 743)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 37: `object@744` (baris 744)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 38: `object@745` (baris 745)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 39: `object@746` (baris 746)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 40: `object@747` (baris 747)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 41: `object@748` (baris 748)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 42: `object@749` (baris 749)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 43: `object@750` (baris 750)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 44: `object@751` (baris 751)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 45: `object@752` (baris 752)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 46: `object@757` (baris 757)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 47: `object@1030` (baris 1030)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 48: `object@1031` (baris 1031)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 49: `object@1032` (baris 1032)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 50: `object@1033` (baris 1033)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 51: `object@1034` (baris 1034)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 52: `object@1035` (baris 1035)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 53: `object@1036` (baris 1036)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 54: `object@1037` (baris 1037)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 55: `object@1038` (baris 1038)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 56: `object@1039` (baris 1039)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 57: `object@1040` (baris 1040)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 58: `object@1041` (baris 1041)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 59: `object@1042` (baris 1042)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 60: `object@1043` (baris 1043)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 61: `object@1177` (baris 1177)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 62: `object@1178` (baris 1178)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 63: `object@1179` (baris 1179)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 64: `object@1180` (baris 1180)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 65: `object@1181` (baris 1181)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 66: `object@1182` (baris 1182)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 67: `object@1183` (baris 1183)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 68: `object@1184` (baris 1184)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 69: `object@1185` (baris 1185)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 70: `object@1186` (baris 1186)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 71: `object@1187` (baris 1187)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 72: `object@1188` (baris 1188)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 73: `object@1189` (baris 1189)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 74: `object@1190` (baris 1190)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 75: `object@1191` (baris 1191)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 76: `object@1330` (baris 1330)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 77: `object@1363` (baris 1363)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 78: `object@1364` (baris 1364)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 79: `object@1365` (baris 1365)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 80: `object@1366` (baris 1366)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 81: `object@1367` (baris 1367)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 82: `object@1368` (baris 1368)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 83: `object@1369` (baris 1369)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 84: `object@1370` (baris 1370)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 85: `object@1371` (baris 1371)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 86: `object@1374` (baris 1374)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 87: `object@1375` (baris 1375)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 88: `object@1376` (baris 1376)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 89: `object@1377` (baris 1377)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 90: `object@1378` (baris 1378)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 91: `object@1379` (baris 1379)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 92: `object@1381` (baris 1381)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 93: `object@1382` (baris 1382)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 94: `object@1383` (baris 1383)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 95: `object@1384` (baris 1384)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 96: `object@1386` (baris 1386)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 97: `object@1389` (baris 1389)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 98: `object@1390` (baris 1390)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 99: `object@1391` (baris 1391)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 100: `object@1392` (baris 1392)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 101: `object@1393` (baris 1393)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 102: `object@1394` (baris 1394)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 103: `object@1395` (baris 1395)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 104: `object@1398` (baris 1398)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 105: `object@1399` (baris 1399)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 106: `object@1400` (baris 1400)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 107: `object@1401` (baris 1401)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 108: `object@1402` (baris 1402)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 109: `object@1403` (baris 1403)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 110: `object@1404` (baris 1404)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 111: `object@1405` (baris 1405)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 112: `object@1408` (baris 1408)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 113: `object@1409` (baris 1409)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 114: `object@1412` (baris 1412)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 115: `object@1413` (baris 1413)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 116: `object@1414` (baris 1414)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 117: `object@1415` (baris 1415)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 118: `object@1416` (baris 1416)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 119: `object@1417` (baris 1417)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 120: `object@1418` (baris 1418)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 121: `object@1419` (baris 1419)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 122: `object@1420` (baris 1420)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 123: `object@1421` (baris 1421)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 124: `object@1422` (baris 1422)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 125: `object@1423` (baris 1423)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 126: `object@1424` (baris 1424)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 127: `object@1425` (baris 1425)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 128: `object@1426` (baris 1426)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 129: `object@1427` (baris 1427)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 130: `object@1428` (baris 1428)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 131: `object@1429` (baris 1429)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 132: `object@1430` (baris 1430)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 133: `object@1431` (baris 1431)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 134: `object@1432` (baris 1432)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 135: `object@1433` (baris 1433)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 136: `object@1436` (baris 1436)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 137: `object@1437` (baris 1437)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 138: `object@1438` (baris 1438)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 139: `object@1439` (baris 1439)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 140: `object@1440` (baris 1440)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 141: `object@1443` (baris 1443)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 142: `object@1444` (baris 1444)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 143: `object@1445` (baris 1445)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 144: `object@1446` (baris 1446)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 145: `object@1447` (baris 1447)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 146: `object@1450` (baris 1450)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 147: `object@1451` (baris 1451)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 148: `object@1452` (baris 1452)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 149: `object@1453` (baris 1453)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 150: `object@1454` (baris 1454)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 151: `object@1455` (baris 1455)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 152: `object@1456` (baris 1456)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 153: `object@1457` (baris 1457)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 154: `object@1458` (baris 1458)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 155: `object@1459` (baris 1459)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 156: `object@1460` (baris 1460)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 157: `object@1461` (baris 1461)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 158: `object@1462` (baris 1462)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 159: `object@1465` (baris 1465)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 160: `object@1466` (baris 1466)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 161: `object@1468` (baris 1468)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 162: `object@1469` (baris 1469)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 163: `object@1470` (baris 1470)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 164: `object@1471` (baris 1471)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 165: `object@1472` (baris 1472)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 166: `object@1473` (baris 1473)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 167: `object@1475` (baris 1475)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 168: `object@1477` (baris 1477)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 169: `object@1477` (baris 1477)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 170: `object@1478` (baris 1478)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 171: `object@1478` (baris 1478)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 172: `object@1479` (baris 1479)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 173: `object@1479` (baris 1479)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 174: `object@1480` (baris 1480)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 175: `object@1480` (baris 1480)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 176: `object@1482` (baris 1482)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 177: `object@1487` (baris 1487)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 178: `object@1488` (baris 1488)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 179: `object@1493` (baris 1493)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 180: `object@1494` (baris 1494)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 181: `object@1499` (baris 1499)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 182: `object@1500` (baris 1500)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 183: `object@1505` (baris 1505)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 184: `object@1506` (baris 1506)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 185: `object@1509` (baris 1509)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 186: `object@1510` (baris 1510)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 187: `object@1516` (baris 1516)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 188: `object@1517` (baris 1517)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 189: `object@1518` (baris 1518)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 190: `object@1519` (baris 1519)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/RotasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/RotasiPage.tsx)

#### Peta 1: `object@1291` (baris 1291)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `object@1292` (baris 1292)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `object@1293` (baris 1293)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 4: `object@1294` (baris 1294)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 5: `object@1295` (baris 1295)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 6: `object@1300` (baris 1300)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 7: `object@1301` (baris 1301)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 8: `object@1302` (baris 1302)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 9: `object@1303` (baris 1303)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 10: `object@1304` (baris 1304)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 11: `object@1305` (baris 1305)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 12: `object@1306` (baris 1306)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 13: `object@1308` (baris 1308)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 14: `object@1309` (baris 1309)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 15: `object@1310` (baris 1310)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 16: `object@1311` (baris 1311)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 17: `object@1313` (baris 1313)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 18: `object@1314` (baris 1314)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 19: `object@1315` (baris 1315)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 20: `object@1316` (baris 1316)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 21: `object@1317` (baris 1317)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 22: `object@1319` (baris 1319)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 23: `object@1319` (baris 1319)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 24: `object@1320` (baris 1320)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 25: `object@1320` (baris 1320)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 26: `object@1321` (baris 1321)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 27: `object@1321` (baris 1321)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 28: `object@1322` (baris 1322)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 29: `object@1322` (baris 1322)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 30: `object@1324` (baris 1324)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 31: `object@1329` (baris 1329)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 32: `object@1330` (baris 1330)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 33: `object@1335` (baris 1335)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 34: `object@1336` (baris 1336)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 35: `object@1341` (baris 1341)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 36: `object@1342` (baris 1342)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 37: `object@1347` (baris 1347)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 38: `object@1348` (baris 1348)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 39: `object@1351` (baris 1351)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 40: `object@1352` (baris 1352)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 41: `object@1358` (baris 1358)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 42: `object@1359` (baris 1359)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 43: `object@1360` (baris 1360)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 44: `object@1361` (baris 1361)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 45: `object@1366` (baris 1366)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 46: `object@1367` (baris 1367)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 47: `object@1368` (baris 1368)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 48: `object@1369` (baris 1369)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

### [`../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/TranslasiPage.tsx`](../artifacts/numatik/src/pages/buku-animasi-matematika/transformasi-geometri/TranslasiPage.tsx)

#### Peta 1: `object@108` (baris 108)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 2: `object@191` (baris 191)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 3: `object@302` (baris 302)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 4: `object@416` (baris 416)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 5: `object@417` (baris 417)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 6: `object@499` (baris 499)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 7: `object@500` (baris 500)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 8: `object@742` (baris 742)
Bahasa: id, en, ja
- Tidak ditemukan ketidaksesuaian key, panjang array, atau angka.

#### Peta 9: `object@963` (baris 963)
Bahasa: id, en, ja
- **Angka berbeda pada `card1title` (id vs ja; nilai-beda):** id=[], ja=[1]
- **Angka berbeda pada `ex2soal` (id vs ja; nilai-beda):** id=[1, 0, 2, 3, -2, -1, 4], ja=[1, 0, 3, -2, -1, 4, 2]
- **Angka berbeda pada `soalC` (id vs ja; nilai-beda):** id=[-3, 2, 4, 2], ja=[4, 2, -3, 2]
