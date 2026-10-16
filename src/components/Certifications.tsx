import { Head, Section } from "./Section";
import { Row, Table, type RowData } from "./Rows";

const verify = (date: string, href: string) => (
  <>
    {date}
    <br />
    <a href={href} className="underline decoration-mag underline-offset-4 hover:text-ink">
      Verify
    </a>
  </>
);

const credentials: RowData[] = [
  {
    id: "C01",
    title: "Generative & Agentic AI Application Developer",
    flag: "Top performer",
    body: "Pak Angels with ASPIRE Pakistan, Cohort 11 (Aug – Oct 2026). Generative AI app development, agentic and multi-agent workflows, RAG, vector retrieval and prompt engineering. I led the team on ScholarCompass and CodeGuard AI.",
    tech: (
      <>
        Oct 7, 2026
        <br />
        ID PAGAI-TP-0111
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
];

export default function Certifications() {
  return (
    <Section id="training" className="border-t border-rule">
      <Head n="Six credentials" title="Training & Credentials">
        A training programme and five course badges. The badges link to pages where you can check them yourself.
      </Head>
      <Table head={["Ref", "Credential", "Issued"]} className="mt-7 border-t border-rule">
        {credentials.map((c) => (
          <Row key={c.id} {...c} />
        ))}
      </Table>
    </Section>
  );
}
