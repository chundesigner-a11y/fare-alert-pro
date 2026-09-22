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
        <section className="relative">
          <div className="mx-auto max-w-6xl px-5 py-10 sm:py-16">
            <Reveal>
              <div className="grid overflow-hidden rounded-[2rem] border border-border bg-card shadow-glow md:grid-cols-2">
                <div className="flex flex-col justify-center px-8 py-12 sm:px-12 sm:py-16">
                  <span className="inline-block w-fit rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                    台北出發 · 東京 / 首爾
                  </span>
                  <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                    Flight Price Notifier
                  </h1>
                  <p className="mt-6 text-xl font-medium text-foreground sm:text-2xl">
                    設定航線與目標價，機票降價就通知你
                  </p>
                  <p className="mt-3 text-base text-muted-foreground">
                    Set a route and a target price — we email you when the fare drops.
                  </p>
                  <div className="mt-10">
                    <Link
                      to="/auth"
                      className="inline-block rounded-full bg-primary px-7 py-3 text-base font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
                    >
                      Sign in / 登入
                    </Link>
                  </div>
                </div>

                <div className="relative min-h-[280px] md:min-h-[480px]">
                  <img
                    src={heroImage}
                    alt="飛機穿越藍天白雲"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-28">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.en} delay={i * 120}>
                <article className="h-full rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/50">
                  <f.icon className="h-6 w-6 text-primary" aria-hidden />
                  <h2 className="mt-5 text-lg font-semibold">
                    {f.zh} <span className="text-muted-foreground">({f.en})</span>
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        © 2026 Flight Price Notifier
      </footer>
    </div>
  );
}
