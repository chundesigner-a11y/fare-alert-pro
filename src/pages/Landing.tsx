import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Plane, BellRing, CalendarX } from "lucide-react";
import heroImage from "../assets/hero-flight.jpg";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

const features = [
  {
    icon: Plane,
    zh: "盯緊熱門航線",
    en: "Always-on route watching",
    body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。",
  },
  {
    icon: BellRing,
    zh: "達標自動通知",
    en: "Target-price email alerts",
    body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。",
  },
  {
    icon: CalendarX,
    zh: "隨時取消",
    en: "Cancel anytime",
    body: "月訂閱制，不想用隨時停，沒有綁約。",
  },
];

export function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <span className="text-sm font-semibold tracking-tight sm:text-base">
            Flight Price Notifier
          </span>
          <Link
            to="/auth"
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
          >
            Sign in / 登入
          </Link>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <img
            src={heroImage}
            alt="飛機穿越藍天白雲"
            className="absolute inset-0 h-full w-full object-cover object-[55%_0%]"
            loading="eager"
          />

          <div className="relative flex min-h-[300px] flex-col justify-end px-5 pb-4 pt-16 sm:min-h-[340px] sm:pb-6">
            <div className="mx-auto w-full max-w-6xl">
              <Reveal>
                <div className="max-w-sm rounded-3xl bg-white/50 p-5 backdrop-blur-sm sm:max-w-md sm:p-6">
                  <span className="inline-block w-fit rounded-full border border-border/60 bg-white/60 px-3 py-1 text-xs text-muted-foreground">
                    台北出發 · 東京 / 首爾
                  </span>
                  <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Flight Price Notifier
                  </h1>
                  <p className="mt-4 text-lg font-medium text-foreground sm:text-xl">
                    設定航線與目標價，機票降價就通知你
                  </p>
                  <p className="mt-3 text-base text-muted-foreground">
                    Set a route and a target price — we email you when the fare drops.
                  </p>
                  <div className="mt-5">
                    <Link
                      to="/auth"
                      className="inline-block rounded-full bg-primary px-7 py-3 text-base font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
                    >
                      Sign in / 登入
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="relative px-5 pb-8 pt-4">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-3 md:grid-cols-3">
                {features.map((f, i) => (
                  <Reveal key={f.en} delay={i * 120}>
                    <article className="h-full rounded-2xl border border-white/60 bg-white/50 p-4 backdrop-blur-sm transition-colors hover:border-primary/50">
                      <f.icon className="h-5 w-5 text-primary" aria-hidden />
                      <h2 className="mt-2 text-base font-semibold text-foreground">
                        {f.zh} <span className="text-muted-foreground">({f.en})</span>
                      </h2>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{f.body}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        © 2026 Flight Price Notifier
      </footer>
    </div>
  );
}
