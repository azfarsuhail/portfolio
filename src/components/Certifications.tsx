import { Head } from "./Section";
import { Row, Table, type RowData } from "./Rows";

const link = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener" className="text-ink underline decoration-hairline-strong transition-colors duration-150 hover:text-glow">
    {label}
  </a>
);

const verify = (date: string, href: string, file: string) => (
  <>
    {date}
    <br />
    {link(href, "Verify")} · {link(`/certificates/${file}`, "PDF")}
  </>
);

const credentials: RowData[] = [
  {
    id: "C01",
    title: "Introduction to Model Context Protocols",
    body: "Claude Academy course completion badge.",
    tech: verify("Oct 19, 2026", "https://academy.claude.com/verify/3bfab9feeb1d46f42b96bafe742d8f34", "claude-mcp.pdf"),
  },
  {
    id: "C02",
    title: "Pak Angels Gen AI",
    flag: "Top performer",
    body: "Issued by ASPIRE Pakistan, Cohort 11 (Aug – Oct 2026). Generative AI app development, agentic and multi-agent workflows, RAG, vector retrieval and prompt engineering. I led the team on ScholarCompass and CodeGuard AI.",
    tech: (
      <>
        Oct 17, 2026
        <br />
        ID PAGAI-TP-0749
        <br />
        {link("/certificates/pak-angels-gen-ai.png", "View")}
      </>
    ),
  },
  {
    id: "C03",
    title: "Claude Code in Action",
    body: "Claude Academy course completion badge.",
    tech: verify("Oct 16, 2026", "https://academy.claude.com/verify/2f39d05c354e9e96ebb1ea5bbdf61143", "claude-code-in-action.pdf"),
  },
  {
    id: "C04",
    title: "Claude Platform 101",
    body: "Claude Academy course completion badge.",
    tech: verify("Oct 16, 2026", "https://academy.claude.com/verify/7a11d2729e3c417d8e33731b5305c184", "claude-platform-101.pdf"),
  },
  {
    id: "C05",
    title: "Building with the Claude API",
    body: "Claude Academy course completion badge.",
    tech: verify("Oct 15, 2026", "https://academy.claude.com/verify/81bb3a0a89fefd72679e5deae4ce10e2", "claude-api.pdf"),
  },
  {
    id: "C06",
    title: "Claude with Amazon Bedrock",
    body: "Claude Academy course completion badge.",
    tech: verify("Oct 15, 2026", "https://academy.claude.com/verify/3d18486f0c75af66d6b9c649a28a1896", "claude-bedrock.pdf"),
  },
  {
    id: "C07",
    title: "Claude with Google Cloud's Vertex AI",
    body: "Claude Academy course completion badge.",
    tech: verify("Oct 15, 2026", "https://academy.claude.com/verify/03d56942dc007d357b5ec5563b8fe32c", "claude-vertex-ai.pdf"),
  },
  {
    id: "C08",
    title: "TechNova '26 — FYP Warriors: The Final Defense",
    body: "Certificate of participation in the final-year-project defense module at TechNova '26, IoBM, Karachi.",
    tech: (
      <>
        Aug 1, 2026
        <br />
        {link("/certificates/technova-26-fyp-warriors.pdf", "View")}
      </>
    ),
  },
  {
    id: "C09",
    title: "Advanced IT Skills Development & Japanese Language Education",
    body: "Training and internship completion, held by Plus W Inc. and OEC through the Pakistan Japan Centre for Mutual Cooperation (Jan – Dec 2025).",
    tech: (
      <>
        Dec 2025
        <br />
        {link("/certificates/pjc-it-japanese-2025.pdf", "View")}
      </>
    ),
  },
  {
    id: "C10",
    title: "Roadmap to Cybersecurity Seminar",
    body: "Certificate of participation from Backdoor Security Agency, for the cyber security seminar held at NASTP, Karachi.",
    tech: (
      <>
        Sep 13, 2025
        <br />
        {link("/certificates/backdoor-cybersecurity-seminar.pdf", "View")}
      </>
    ),
  },
  {
    id: "C11",
    title: "Erasmus+ Food Literacy",
    body: "Certificate of attendance for the Learning Teaching Training Activities organised by ODTÜ, MEBIVA, EKAPDER and the Ministry of Agriculture & Forestry, Ankara (Oct 11 – 15, 2024).",
    tech: (
      <>
        Oct 15, 2024
        <br />
        {link("/certificates/erasmus-food-literacy-2024.jpg", "View")}
      </>
    ),
  },
];

export default function Certifications() {
  return (
    <section id="training" data-sc-act="flow" className="sc-section relative border-t border-hairline">
      <div className="sc-wrap">
        <div data-sc-in>
          <Head title="Training & credentials">
            Two training programmes, six course badges and three event certificates. The badges link to pages where you can check them yourself.
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
