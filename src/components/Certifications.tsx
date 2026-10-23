import { Head } from "./Section";
import { Row, Table, type RowData } from "./Rows";

const verify = (date: string, href: string) => (
  <>
    {date}
    <br />
    <a href={href} className="text-ink underline decoration-hairline-strong transition-colors duration-150 hover:text-glow">
      Verify
    </a>
  </>
);

const credentials: RowData[] = [
  {
    id: "C01",
    title: "Pak Angels Gen AI",
    flag: "Top performer",
    body: "Issued by ASPIRE Pakistan, Cohort 11 (Aug – Oct 2026). Generative AI app development, agentic and multi-agent workflows, RAG, vector retrieval and prompt engineering. I led the team on ScholarCompass and CodeGuard AI.",
    tech: (
      <>
        Oct 2026
        <br />
        ID PAGAI-TP-0749
      </>
    ),
  },
  {
    id: "C02",
    title: "Building with the Claude API",
    body: "Claude Academy course completion badge.",
    tech: verify("Oct 15, 2026", "https://academy.claude.com/verify/81bb3a0a89fefd72679e5deae4ce10e2"),
  },
  {
    id: "C03",
    title: "Claude with Amazon Bedrock",
    body: "Claude Academy course completion badge.",
    tech: verify("Oct 15, 2026", "https://academy.claude.com/verify/3d18486f0c75af66d6b9c649a28a1896"),
  },
  {
    id: "C04",
    title: "Claude with Google Cloud's Vertex AI",
    body: "Claude Academy course completion badge.",
    tech: verify("Oct 15, 2026", "https://academy.claude.com/verify/03d56942dc007d357b5ec5563b8fe32c"),
  },
  {
    id: "C05",
    title: "Claude Code in Action",
    body: "Claude Academy course completion badge.",
    tech: verify("Oct 16, 2026", "https://academy.claude.com/verify/2f39d05c354e9e96ebb1ea5bbdf61143"),
  },
  {
    id: "C06",
    title: "Claude Platform 101",
    body: "Claude Academy course completion badge.",
    tech: verify("Oct 16, 2026", "https://academy.claude.com/verify/7a11d2729e3c417d8e33731b5305c184"),
  },
  {
    id: "C07",
    title: "Introduction to Model Context Protocols",
    body: "Claude Academy course completion badge.",
    tech: verify("Oct 19, 2026", "https://academy.claude.com/verify/3bfab9feeb1d46f42b96bafe742d8f34"),
  },
];

export default function Certifications() {
  return (
    <section id="training" data-sc-act="flow" className="sc-section relative border-t border-hairline">
      <div className="sc-wrap">
        <div data-sc-in>
          <Head title="Training & credentials">
            A training programme and six course badges. The badges link to pages where you can check them yourself.
          </Head>
        </div>
        <div data-sc-in>
          <Table head={["Ref", "Credential", "Issued"]} className="mt-8 border-t border-hairline">
            {credentials.map((c) => (
              <Row key={c.id} {...c} />
            ))}
          </Table>
        </div>
      </div>
    </section>
  );
}
