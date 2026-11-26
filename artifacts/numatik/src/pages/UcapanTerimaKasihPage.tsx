import { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import { ArrowLeft, Heart, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";
import { useTheme } from "@/contexts/ThemeContext";

const AcknowledgementsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isWhite = theme === "pastel";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />

      <main className="relative z-10 w-full max-w-5xl px-4 py-10 md:py-14">
        <header className="relative mx-auto mb-10 max-w-3xl overflow-hidden rounded-[2rem] border border-violet-300/25 bg-gradient-to-br from-violet-500/10 via-cyan-400/10 to-amber-300/10 px-6 py-9 text-center shadow-[0_20px_70px_rgba(70,50,150,0.16)] backdrop-blur-md sm:px-10">
          <div className="pointer-events-none absolute -left-12 -top-16 h-48 w-48 rounded-full bg-pink-400/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="relative">
            <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 via-fuchsia-500 to-violet-500 text-white shadow-lg shadow-fuchsia-500/25">
              <Heart aria-hidden="true" className="h-7 w-7" fill="currentColor" />
            </span>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-300/30 bg-white/10 px-3 py-1 font-display text-[10px] font-bold tracking-[0.22em] text-primary">
              <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
              NUMATIK · {t("acknowledgements.eyebrow")}
            </p>
            <h1 className="font-display text-3xl font-black text-primary text-glow-cyan sm:text-4xl">
              {t("acknowledgements.title")}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl font-body text-sm leading-relaxed text-foreground/75 sm:text-base">
              {t("acknowledgements.subtitle")}
            </p>
          </div>
        </header>

        <div className="space-y-7">
          <article className="relative overflow-hidden rounded-3xl p-[2px] bg-gradient-to-br from-orange-300 via-amber-400 to-yellow-300 shadow-[0_18px_60px_rgba(251,146,60,0.2)]">
            <div className="relative overflow-hidden rounded-[calc(1.5rem-2px)] bg-[#0d0d2b] p-5 text-left sm:p-8">
              <div className="pointer-events-none absolute -right-10 -top-12 h-56 w-56 rounded-full bg-orange-500/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl" />
              <span aria-hidden="true" className="pointer-events-none absolute left-5 top-2 font-serif text-7xl text-orange-300/15">"</span>

              <div className="relative z-10">
                <div className="mb-6 flex flex-col items-center text-center">
                  <div className="mb-5 w-full overflow-hidden rounded-2xl border border-orange-300/40 shadow-xl shadow-orange-950/30">
                    <img
                      src="/kelompok-a2-foto.png"
                      alt="Kelompok A2 Guru Penggerak Angkatan 10"
                      className="max-h-[520px] w-full object-contain"
                    />
                  </div>
                  <span className="rounded-full border border-orange-300/35 bg-orange-400/10 px-4 py-1 font-body text-[10px] font-bold uppercase tracking-[0.18em] text-orange-200">
                    {t("biografi.kelompokA2.badge")}
                  </span>
                  <h2 className="mt-3 font-display text-xl font-black text-white sm:text-2xl">
                    Kelompok A2 Guru Penggerak
                  </h2>
                  <p className="mt-1 font-body text-xs text-white/55">Angkatan 10 · Kota Bandung</p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="rounded-2xl border border-orange-300/15 bg-white/[0.04] p-4">
                    <p className="mb-3 text-center font-display text-[10px] font-bold uppercase tracking-[0.18em] text-orange-200/75">
                      {t("biografi.kelompokA2.fasilitator")}
                    </p>
                    <p className="rounded-xl border border-orange-300/20 bg-orange-400/[0.07] px-4 py-3 text-center font-body text-sm font-semibold text-white/90">
                      ⭐ &nbsp; Ibu Dina Suciati, M.Pd
                    </p>
                  </div>
                  <div className="rounded-2xl border border-orange-300/15 bg-white/[0.04] p-4">
                    <p className="mb-3 text-center font-display text-[10px] font-bold uppercase tracking-[0.18em] text-orange-200/75">
                      {t("biografi.kelompokA2.pembimbing")}
                    </p>
                    <p className="rounded-xl border border-orange-300/20 bg-orange-400/[0.07] px-4 py-3 text-center font-body text-sm font-semibold text-white/90">
                      ⭐ &nbsp; Ibu Evi Kuswanty, S.Pd
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-amber-300/15 bg-white/[0.04] p-4">
                  <p className="mb-3 text-center font-display text-[10px] font-bold uppercase tracking-[0.18em] text-orange-200/75">
                    {t("biografi.kelompokA2.anggota")}
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {["Deni Nugraha, S.Pd", "Cheri Indrayana, S.Pd", "Nurhayanti Retnamasari, S.Pd", "Erlita Fujiawati Akbari, S.Pd", "Sri Aryati Handayani, S.Pd"].map((name) => (
                      <p key={name} className="rounded-xl border border-amber-300/15 bg-amber-400/[0.06] px-3 py-2 font-body text-xs text-white/85">
                        <span className="mr-2 text-amber-300">✦</span>{name}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="my-6 h-px bg-gradient-to-r from-transparent via-orange-300/50 to-transparent" />
                <div className="space-y-4">
                  <p className="font-body text-sm leading-relaxed text-white/90">
                    <Trans
                      i18nKey="biografi.kelompokA2.paragraf1"
                      components={{
                        orange: <strong className="text-orange-200" />,
                        amber: <strong className="text-amber-200" />,
                      }}
                    />
                  </p>
                  <blockquote className="rounded-2xl border-l-2 border-amber-300/60 bg-amber-300/[0.06] px-4 py-3 font-body text-sm italic leading-relaxed text-white/70">
                    {t("biografi.kelompokA2.kutipan")}
                  </blockquote>
                  <p
                    className="py-2 text-center font-display text-lg font-black tracking-wide sm:text-2xl"
                    style={isWhite
                      ? { color: "#fbbf24" }
                      : {
                          background: "linear-gradient(90deg,#fb923c,#fbbf24,#fef08a,#fbbf24,#fb923c)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          filter: "drop-shadow(0 0 12px rgba(251,146,60,0.55))",
                        }}
                  >
                    {t("biografi.kelompokA2.motto")}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {(["tag1", "tag2", "tag3", "tag4"] as const).map((key) => (
                      <span key={key} className="rounded-full border border-orange-200/15 bg-white/[0.05] px-3 py-1 font-body text-[11px] text-white/70">
                        {t(`biografi.kelompokA2.${key}`)}
                      </span>
                    ))}
                  </div>
                  <p className="pt-1 text-center font-display text-[10px] font-bold tracking-[0.16em] text-orange-200/80">
                    ✦ &nbsp; {t("biografi.kelompokA2.footer")} &nbsp; ✦
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-3xl p-[2px] bg-gradient-to-br from-cyan-300 via-violet-400 to-amber-300 shadow-[0_18px_60px_rgba(99,102,241,0.2)]">
            <div className="relative overflow-hidden rounded-[calc(1.5rem-2px)] bg-[#0d0d2b] p-5 text-left sm:p-8">
              <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-violet-500/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-12 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
              <span aria-hidden="true" className="pointer-events-none absolute left-5 top-2 font-serif text-7xl text-cyan-200/15">"</span>

              <div className="relative z-10">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-5 w-full max-w-md overflow-hidden rounded-2xl border border-cyan-300/40 shadow-xl shadow-violet-950/30">
                    <img
                      src="/wandri-1778563724307.png"
                      alt="Bapak Wandri, S.Pd., Gr."
                      className="aspect-[4/3] max-h-[340px] w-full object-cover"
                    />
                  </div>
                  <span className="rounded-full border border-cyan-300/35 bg-cyan-400/10 px-4 py-1 font-body text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-200">
                    {t("biografi.wandri.badge")}
                  </span>
                  <h2 className="mt-3 font-display text-xl font-black text-white sm:text-2xl">
                    Bapak Wandri, S.Pd., Gr.
                  </h2>
                  <p className="mt-1 font-body text-xs text-white/55">SMP Santa Maria · Kota Bandung</p>
                </div>

                <div className="my-6 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
                <div className="space-y-4">
                  <p className="font-body text-sm leading-relaxed text-white/90">
                    <Trans
                      i18nKey="biografi.wandri.paragraf1"
                      components={{
                        cyan: <strong className="text-cyan-200" />,
                        accent: <strong className="text-violet-200" />,
                      }}
                    />
                  </p>
                  <p className="font-body text-sm leading-relaxed text-white/85">
                    <Trans
                      i18nKey="biografi.wandri.paragraf2"
                      components={{
                        cyan: <strong className="text-cyan-200" />,
                        accent: <strong className="text-violet-200" />,
                      }}
                    />
                  </p>
                  <p className="font-body text-sm leading-relaxed text-white/85">
                    <Trans
                      i18nKey="biografi.wandri.paragraf3"
                      components={{ primary: <strong className="text-amber-200" /> }}
                    />
                  </p>
                  <blockquote className="rounded-2xl border-l-2 border-cyan-300/60 bg-cyan-300/[0.06] px-4 py-3 font-body text-sm italic leading-relaxed text-white/70">
                    {t("biografi.wandri.kutipan")}
                  </blockquote>
                  <div className="flex flex-wrap justify-center gap-2">
                    {(["tag1", "tag2", "tag3", "tag4"] as const).map((key) => (
                      <span key={key} className="rounded-full border border-cyan-200/15 bg-white/[0.05] px-3 py-1 font-body text-[11px] text-white/70">
                        {t(`biografi.wandri.${key}`)}
                      </span>
                    ))}
                  </div>
                  <p className="pt-1 text-center font-display text-[10px] font-bold tracking-[0.16em] text-amber-200/85">
                    ✦ &nbsp; {t("biografi.wandri.footer")} &nbsp; ✦
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>

        <button
          type="button"
          onClick={() => { playPopSound(); navigate("/menu"); }}
          className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-2.5 font-body text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          {t("biografi.kembali")}
        </button>
      </main>
    </div>
  );
};

export default AcknowledgementsPage;
