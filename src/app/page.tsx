import Link from "next/link";

const followUps = [
  {
    name: "Priya Raman",
    company: "Larkspur Dental",
    task: "Send the revised quote",
    due: "Today",
    overdue: false,
  },
  {
    name: "Tom Okafor",
    company: "Bramble & Co.",
    task: "Call back about onboarding",
    due: "Today",
    overdue: false,
  },
  {
    name: "Elena Marsh",
    company: "Harbor Fitness",
    task: "Confirm the contract start date",
    due: "Yesterday",
    overdue: true,
  },
  {
    name: "Daniel Reyes",
    company: "Reyes Plumbing",
    task: "Share the case study",
    due: "Tomorrow",
    overdue: false,
  },
];

const stages = [
  { name: "New", count: 9, value: 18400, tone: "bg-pine/30" },
  { name: "Contacted", count: 6, value: 22100, tone: "bg-pine/55" },
  { name: "Proposal sent", count: 4, value: 31500, tone: "bg-pine/80" },
  { name: "Won this month", count: 3, value: 14200, tone: "bg-pine" },
];

const activity = [
  { who: "Priya Raman", what: "replied to your quote", when: "2h ago" },
  { who: "Harbor Fitness", what: "moved to Proposal sent", when: "Yesterday" },
  { who: "Sam Whitfield", what: "was added as a contact", when: "Yesterday" },
  { who: "Bramble & Co.", what: "booked a call for Thursday", when: "2 days ago" },
];

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const pipelineTotal = stages.reduce((sum, s) => sum + s.value, 0);
const dueToday = followUps.filter((f) => !f.overdue && f.due === "Today").length;
const overdue = followUps.filter((f) => f.overdue).length;

const navLink =
  "rounded-sm px-1 py-0.5 text-mist hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-line bg-surface">
        <nav
          aria-label="Main"
          className="mx-auto flex h-14 w-full max-w-6xl items-center gap-8 px-6"
        >
          <Link href="/" className="font-semibold tracking-tight">
            Simple CRM
          </Link>
          <ul className="flex items-center gap-5 text-sm">
            <li>
              <Link
                href="/"
                aria-current="page"
                className="rounded-sm px-1 py-0.5 text-ink underline decoration-pine decoration-2 underline-offset-[10px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine"
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
            className="ml-auto grid size-8 place-items-center rounded-full bg-pine text-xs font-semibold text-white"
          >
            JD
          </span>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-20">
        <section className="py-14">
          <p className="text-mist">Good morning, Jordan.</p>
          <h1 className="mt-2 max-w-2xl text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            You have {dueToday} follow-ups due today and {overdue} that slipped
            past yesterday.
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#"
              className="rounded-md bg-pine px-4 py-2 text-sm font-medium text-white hover:bg-pine/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine"
            >
              Add contact
            </a>
            <a
              href="#"
              className="rounded-sm px-1 py-0.5 text-sm font-medium text-ink underline underline-offset-4 hover:text-pine focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine"
            >
              Log a call
            </a>
          </div>
        </section>

        <div className="grid gap-14 lg:grid-cols-[3fr_2fr] lg:gap-20">
          <section aria-labelledby="follow-ups">
            <div className="flex items-baseline justify-between border-b border-ink pb-3">
              <h2 id="follow-ups" className="text-lg font-medium">
                Follow-ups
              </h2>
              <a
                href="#"
                className="rounded-sm px-1 text-sm text-mist hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine"
              >
                All tasks
              </a>
            </div>
            <ul>
              {followUps.map((f) => (
                <li
                  key={f.name}
                  className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 border-b border-line py-4"
                >
                  <p className="font-medium">
                    {f.name}
                    <span className="font-normal text-mist"> · {f.company}</span>
                  </p>
                  <p
                    className={`text-sm ${f.overdue ? "font-medium text-amber" : "text-mist"}`}
                  >
                    {f.due}
                  </p>
                  <p className="col-span-2 text-mist">{f.task}</p>
                </li>
              ))}
            </ul>
          </section>

          <div className="flex flex-col gap-14">
            <section aria-labelledby="pipeline">
              <div className="flex items-baseline justify-between border-b border-ink pb-3">
                <h2 id="pipeline" className="text-lg font-medium">
                  Pipeline
                </h2>
                <p className="text-sm text-mist">{money.format(pipelineTotal)} open</p>
              </div>
              <div
                className="mt-5 flex h-3 w-full gap-0.5 overflow-hidden rounded-sm"
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
              <ul className="mt-4">
                {stages.map((s) => (
                  <li
                    key={s.name}
                    className="flex items-center gap-3 border-b border-line py-2.5 text-sm"
                  >
                    <span className={`size-2.5 rounded-sm ${s.tone}`} aria-hidden />
                    <span>{s.name}</span>
                    <span className="ml-auto text-mist">{s.count} deals</span>
                    <span className="w-20 text-right">{money.format(s.value)}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="activity">
              <h2
                id="activity"
                className="border-b border-ink pb-3 text-lg font-medium"
              >
                Recent activity
              </h2>
              <ul>
                {activity.map((a) => (
                  <li
                    key={`${a.who}-${a.what}`}
                    className="flex gap-4 border-b border-line py-3 text-sm"
                  >
                    <p>
                      <span className="font-medium">{a.who}</span>{" "}
                      <span className="text-mist">{a.what}</span>
                    </p>
                    <p className="ml-auto shrink-0 text-mist">{a.when}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
