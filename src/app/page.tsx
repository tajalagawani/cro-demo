import Link from "next/link";

type Due = "Yesterday" | "Today" | "Tomorrow";

const followUps: {
  name: string;
  company: string;
  task: string;
  due: Due;
}[] = [
  {
    name: "Elena Marsh",
    company: "Harbor Fitness",
    task: "Confirm the contract start date",
    due: "Yesterday",
  },
  {
    name: "Priya Raman",
    company: "Larkspur Dental",
    task: "Send the revised quote",
    due: "Today",
  },
  {
    name: "Tom Okafor",
    company: "Bramble & Co.",
    task: "Call back about onboarding",
    due: "Today",
  },
  {
    name: "Daniel Reyes",
    company: "Reyes Plumbing",
    task: "Share the case study",
    due: "Tomorrow",
  },
];

const stages = [
  { name: "New", count: 9, value: 18400, tone: "bg-pine/25" },
  { name: "Contacted", count: 6, value: 22100, tone: "bg-pine/50" },
  { name: "Proposal sent", count: 4, value: 31500, tone: "bg-pine/75" },
  { name: "Won this month", count: 3, value: 14200, tone: "bg-pine" },
];

const activity = [
  {
    who: "Priya Raman",
    what: "replied to your quote",
    when: "2h ago",
    kind: "reply",
  },
  {
    who: "Harbor Fitness",
    what: "moved to Proposal sent",
    when: "Yesterday",
    kind: "stage",
  },
  {
    who: "Sam Whitfield",
    what: "was added as a contact",
    when: "Yesterday",
    kind: "contact",
  },
  {
    who: "Bramble & Co.",
    what: "booked a call for Thursday",
    when: "2 days ago",
    kind: "call",
  },
];

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const pipelineTotal = stages.reduce((sum, s) => sum + s.value, 0);
const largestStage = Math.max(...stages.map((s) => s.value));
const won = stages.find((s) => s.name === "Won this month");
const dueToday = followUps.filter((f) => f.due === "Today").length;
const overdue = followUps.filter((f) => f.due === "Yesterday").length;

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine";

const navLink = `rounded-md px-2.5 py-1.5 text-sm text-mist transition-colors hover:bg-ink/5 hover:text-ink ${focusRing}`;

const quietLink = `rounded-sm px-1 text-sm text-mist transition-colors hover:text-ink ${focusRing}`;

const dueChip: Record<Due, string> = {
  Yesterday: "bg-amber-soft text-amber",
  Today: "bg-pine-soft text-pine",
  Tomorrow: "bg-ink/5 text-mist",
};

function SectionHeading({
  id,
  title,
  aside,
}: {
  id: string;
  title: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-ink pb-3">
      <h2 id={id} className="text-lg font-medium tracking-tight">
        {title}
      </h2>
      {aside}
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-10 border-b border-line bg-paper/85 backdrop-blur supports-[backdrop-filter]:bg-paper/70">
        <nav
          aria-label="Main"
          className="mx-auto flex h-14 w-full max-w-6xl items-center gap-6 px-5 sm:px-6"
        >
          <Link
            href="/"
            className={`flex shrink-0 items-center gap-2.5 rounded-sm font-semibold tracking-tight whitespace-nowrap ${focusRing}`}
          >
            <span
              aria-hidden
              className="grid size-6 place-items-center rounded-md bg-pine text-[11px] font-bold text-white"
            >
              S
            </span>
            Simple CRM
          </Link>
          <ul className="flex min-w-0 items-center gap-1 overflow-x-auto">
            <li>
              <Link
                href="/"
                aria-current="page"
                className={`rounded-md bg-ink/5 px-2.5 py-1.5 text-sm font-medium text-ink ${focusRing}`}
              >
                Home
              </Link>
            </li>
            <li>
              <a href="#" className={navLink}>
                Contacts
              </a>
            </li>
            <li>
              <a href="#" className={navLink}>
                Deals
              </a>
            </li>
            <li>
              <a href="#" className={navLink}>
                Tasks
              </a>
            </li>
          </ul>
          <span
            aria-label="Signed in as Jordan Doyle"
            className="ml-auto grid size-8 shrink-0 place-items-center rounded-full bg-surface text-xs font-semibold text-pine ring-1 ring-line"
          >
            JD
          </span>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 pb-24 sm:px-6">
        <section className="pt-14 pb-10 sm:pt-20 sm:pb-12">
          <p className="text-mist">Good morning, Jordan.</p>
          <h1 className="mt-3 max-w-3xl text-[2.25rem] leading-[1.08] font-medium tracking-tight text-balance sm:text-[3.25rem]">
            You have {dueToday} <span className="whitespace-nowrap">follow-ups</span>{" "}
            due today and {overdue} that slipped past yesterday.
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#"
              className={`rounded-md bg-pine px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-pine/90 ${focusRing}`}
            >
              Add contact
            </a>
            <a
              href="#"
              className={`rounded-md bg-surface px-4 py-2.5 text-sm font-medium text-ink ring-1 ring-line transition-colors hover:bg-ink/5 ${focusRing}`}
            >
              Log a call
            </a>
          </div>
        </section>

        <dl className="grid grid-cols-2 overflow-hidden rounded-xl bg-surface shadow-card ring-1 ring-line md:grid-cols-4">
          {[
            { label: "Due today", value: String(dueToday), tone: "text-ink" },
            {
              label: "Slipped past yesterday",
              value: String(overdue),
              tone: overdue > 0 ? "text-amber" : "text-ink",
            },
            {
              label: "Open in pipeline",
              value: money.format(pipelineTotal),
              tone: "text-ink",
            },
            {
              label: "Won this month",
              value: money.format(won?.value ?? 0),
              tone: "text-pine",
            },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`px-5 py-5 sm:px-6 ${i % 2 === 1 ? "border-l border-line-soft" : ""} ${i >= 2 ? "border-t border-line-soft md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
            >
              <dt className="text-sm text-mist">{stat.label}</dt>
              <dd
                className={`mt-1.5 text-2xl font-medium tracking-tight sm:text-3xl ${stat.tone}`}
              >
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 grid gap-16 lg:grid-cols-[3fr_2fr] lg:gap-20">
          <section aria-labelledby="follow-ups">
            <SectionHeading
              id="follow-ups"
              title="Follow-ups"
              aside={
                <a href="#" className={quietLink}>
                  All tasks
                </a>
              }
            />
            <ul className="mt-2">
              {followUps.map((f) => {
                const isOverdue = f.due === "Yesterday";
                return (
                  <li key={f.name}>
                    <a
                      href="#"
                      className={`group -mx-3 flex items-start gap-4 rounded-lg px-3 py-4 transition-colors hover:bg-surface ${focusRing} ${
                        isOverdue ? "bg-amber-soft/60" : ""
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`mt-0.5 grid size-9 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                          isOverdue
                            ? "bg-amber/15 text-amber"
                            : "bg-pine-soft text-pine"
                        }`}
                      >
                        {initials(f.name)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <span className="font-medium">{f.name}</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${dueChip[f.due]}`}
                          >
                            {isOverdue ? "Due yesterday" : f.due}
                          </span>
                        </span>
                        <span className="mt-0.5 block text-sm text-mist">
                          {f.company}
                        </span>
                        <span className="mt-2 block text-[15px] text-ink/90">
                          {f.task}
                        </span>
                      </span>
                    </a>
                    <div className="border-b border-line-soft" aria-hidden />
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 text-sm text-mist">
              Finish these and tomorrow starts with one item on the list.
            </p>
          </section>

          <div className="flex flex-col gap-16">
            <section aria-labelledby="pipeline">
              <SectionHeading
                id="pipeline"
                title="Pipeline"
                aside={
                  <p className="text-sm text-mist">
                    {money.format(pipelineTotal)} open
                  </p>
                }
              />
              <div
                className="mt-6 flex h-2.5 w-full gap-0.5 overflow-hidden rounded-full"
                role="img"
                aria-label={`Pipeline by stage, ${money.format(pipelineTotal)} in total`}
              >
                {stages.map((s) => (
                  <div
                    key={s.name}
                    className={s.tone}
                    style={{ width: `${(s.value / pipelineTotal) * 100}%` }}
                  />
                ))}
              </div>
              <ul className="mt-5">
                {stages.map((s) => (
                  <li
                    key={s.name}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-1.5 border-b border-line-soft py-3 text-sm last:border-b-0"
                  >
                    <span
                      className={`size-2.5 rounded-full ${s.tone}`}
                      aria-hidden
                    />
                    <span className="font-medium">{s.name}</span>
                    <span className="text-right tabular-nums">
                      {money.format(s.value)}
                    </span>
                    <span aria-hidden />
                    <span
                      aria-hidden
                      className="h-1 overflow-hidden rounded-full bg-ink/5"
                    >
                      <span
                        className={`block h-full rounded-full ${s.tone}`}
                        style={{ width: `${(s.value / largestStage) * 100}%` }}
                      />
                    </span>
                    <span className="text-right text-mist">
                      {s.count} {s.count === 1 ? "deal" : "deals"}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="activity">
              <SectionHeading
                id="activity"
                title="Recent activity"
                aside={
                  <a href="#" className={quietLink}>
                    See all
                  </a>
                }
              />
              <ol className="mt-5">
                {activity.map((a, i) => (
                  <li
                    key={`${a.who}-${a.what}`}
                    className="relative flex gap-4 pb-5 pl-6 text-sm last:pb-0"
                  >
                    {i < activity.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute top-3 bottom-0 left-[5px] w-px bg-line"
                      />
                    )}
                    <span
                      aria-hidden
                      className={`absolute top-1.5 left-0 size-[11px] rounded-full ring-2 ring-paper ${
                        i === 0 ? "bg-pine" : "bg-line"
                      }`}
                    />
                    <p className="min-w-0 flex-1 leading-snug">
                      <span className="font-medium">{a.who}</span>{" "}
                      <span className="text-mist">{a.what}</span>
                    </p>
                    <p className="shrink-0 text-mist">{a.when}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-sm text-mist sm:px-6">
          <p>Simple CRM</p>
          <p>Last synced a few minutes ago</p>
        </div>
      </footer>
    </div>
  );
}
