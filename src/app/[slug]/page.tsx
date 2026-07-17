import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { StarField } from "@/components/StarField";
import { ArrowIcon, BookIcon, StarIcon } from "@/components/Icons";
import { DocumentRenderer, getToc } from "@/components/DocumentRenderer";
import { assignments, getAssignment } from "@/lib/assignments";

export function generateStaticParams() {
  return assignments.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const assignment = getAssignment(slug);
  return assignment ? { title: `Bài ${assignment.number}: ${assignment.title}` } : {};
}

export default async function AssignmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const assignment = getAssignment(slug);
  if (!assignment) notFound();
  const toc = getToc(assignment.blocks);
  const previous = assignments[assignment.number - 2];
  const next = assignments[assignment.number];

  return <main className="assignment-page">
    <SiteHeader />
    <section className="assignment-hero">
      <StarField />
      <div className="section-shell assignment-hero-inner">
        <div>
          <Link href="/#muc-luc" className="back-link"><ArrowIcon /> Quay lại bản đồ chòm sao</Link>
          <p className="eyebrow"><StarIcon /> Chương 0{assignment.number} / 06</p>
          <h1>{assignment.title}</h1>
          <p className="assignment-subtitle">Nội dung được trình bày lại theo đúng thứ tự của tài liệu gốc, với chữ, bảng và ảnh minh chứng đi liền mạch theo từng phần.</p>
        </div>
        <div className="chapter-disc"><span>0{assignment.number}</span><small>chapter</small></div>
      </div>
    </section>

    <section className="reading-section">
      <div className="reading-layout section-shell">
        <aside className="document-sidebar">
          <div className="toc-card">
            <p><BookIcon /> Mục lục bài</p>
            <nav aria-label={`Mục lục bài ${assignment.number}`}>
              {toc.length ? toc.map((item) => <a key={item.id} href={`#${item.id}`} className={item.level === 3 ? "toc-subitem" : ""}>{item.text}</a>) : <span>Nội dung được trình bày liên tục theo tài liệu.</span>}
            </nav>
          </div>
          <div className="source-note"><strong>Tài liệu gốc</strong><span>{assignment.blocks.length} khối nội dung</span><span>{assignment.imageCount} ảnh minh chứng</span></div>
        </aside>
        <div className="paper-sheet">
          <div className="paper-header"><span>Đặng Khánh Linh · 25040760</span><span>Bài {assignment.number}</span></div>
          <DocumentRenderer assignment={assignment} />
          <div className="paper-end"><StarIcon /><span>Hết bài {assignment.number}</span><StarIcon /></div>
        </div>
      </div>
    </section>

    <nav className="chapter-navigation section-shell" aria-label="Điều hướng giữa các bài">
      {previous ? <Link href={`/${previous.slug}`} className="chapter-link previous"><ArrowIcon /><span><small>Bài trước</small><strong>{previous.title}</strong></span></Link> : <Link href="/#muc-luc" className="chapter-link previous"><ArrowIcon /><span><small>Quay lại</small><strong>Mục lục portfolio</strong></span></Link>}
      {next ? <Link href={`/${next.slug}`} className="chapter-link next"><span><small>Bài tiếp theo</small><strong>{next.title}</strong></span><ArrowIcon /></Link> : <Link href="/#tong-ket" className="chapter-link next"><span><small>Tiếp tục</small><strong>Đọc phần tổng kết</strong></span><ArrowIcon /></Link>}
    </nav>
  </main>;
}
