import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { StarCanvas } from "@/components/StarCanvas";
import { ArrowBackIcon, ArrowIcon, BookIcon, SparkIcon } from "@/components/Icons";
import { DocumentRenderer, getToc } from "@/components/DocumentRenderer";
import { DocumentMotion } from "@/components/DocumentMotion";
import { assignments, getAssignment } from "@/lib/assignments";

const chapterNotes: Record<number, { objective: string; process: string; takeaway: string }> = {
  1: {
    objective: "Rèn luyện các thao tác tạo, đổi tên, sao chép, di chuyển, xóa và khôi phục tệp tin, thư mục trên Windows.",
    process: "Tớ lần lượt thực hiện từng thao tác trong File Explorer và ghi lại quá trình bằng ảnh chụp màn hình.",
    takeaway: "Việc đặt tên và tổ chức thư mục hợp lý giúp dữ liệu dễ tìm, dễ quản lý và hạn chế nhầm lẫn.",
  },
  2: {
    objective: "Phát triển khả năng tìm kiếm và đánh giá các nguồn học thuật có liên quan đến ngành học.",
    process: "Tớ thu thập tài liệu về ảnh hưởng của AI tạo sinh trong giáo dục tiếng Anh, sau đó đánh giá theo các tiêu chí học thuật.",
    takeaway: "Một nguồn có vẻ chuyên nghiệp chưa chắc đã phù hợp; đánh giá có hệ thống là bước cần thiết trước khi sử dụng.",
  },
  3: {
    objective: "Tìm hiểu cách cấu trúc prompt ảnh hưởng đến chất lượng phản hồi của AI.",
    process: "Tớ thử nghiệm prompt cơ bản, cải tiến và nâng cao qua ba tác vụ học tập khác nhau.",
    takeaway: "Prompt hiệu quả không nhất thiết phải thật dài, nhưng cần có mục tiêu, bối cảnh, giới hạn và cấu trúc đầu ra rõ ràng.",
  },
  4: {
    objective: "Rèn luyện khả năng quản lý nhiệm vụ, trao đổi và phối hợp trong môi trường làm việc trực tuyến.",
    process: "Tớ sử dụng các công cụ cộng tác để thiết kế slide, bảo quản dữ liệu và phối hợp với nhóm trong dự án.",
    takeaway: "Công cụ chỉ thật sự hiệu quả khi mỗi thành viên hiểu rõ nhiệm vụ, thời hạn và cách tổ chức tài liệu chung.",
  },
  5: {
    objective: "Khám phá cách kết hợp nhiều công cụ AI trong quá trình sáng tạo một sản phẩm nội dung số.",
    process: "Tớ dùng AI để hỗ trợ nội dung và hình ảnh, sau đó chỉnh sửa, chọn lọc và hoàn thiện sản phẩm bằng Canva.",
    takeaway: "AI giúp vượt qua sự bế tắc khi bắt đầu, nhưng lựa chọn và tạo dấu ấn cá nhân vẫn là phần quan trọng nhất.",
  },
  6: {
    objective: "Hiểu rõ ranh giới giữa hỗ trợ học tập hợp lý và sự phụ thuộc hoặc gian lận học thuật.",
    process: "Tớ tìm hiểu định hướng sử dụng AI, ghi lại quá trình dùng công cụ, phân tích vấn đề đạo đức và xây dựng nguyên tắc cá nhân.",
    takeaway: "AI nên đóng vai trò trợ lý; người học vẫn phải kiểm chứng, chỉnh sửa, trích dẫn minh bạch và chịu trách nhiệm.",
  },
};

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
  const note = chapterNotes[assignment.number];

  return <main className="assignment-page">
    <SiteHeader />
    <section className="assignment-hero">
      <StarCanvas density={0.92} quiet />
      <div className="assignment-moon" aria-hidden="true"><span>0{assignment.number}</span></div>
      <div className="section-shell assignment-hero-inner">
        <div>
          <Link href="/#muc-luc" className="back-link"><ArrowBackIcon /> Quay lại bản đồ chòm sao</Link>
          <p className="chapter-kicker"><SparkIcon /> Chương 0{assignment.number} trong 06 chương</p>
          <h1>{assignment.title}</h1>
          <p className="assignment-subtitle">Nội dung bên dưới được giữ nguyên theo tài liệu gốc. Tớ chỉ sắp xếp lại giao diện để phần chữ, ảnh minh chứng và bảng biểu xuất hiện đúng nhịp đọc.</p>
        </div>
      </div>
    </section>

    <section className="chapter-preface">
      <div className="section-shell chapter-preface-grid">
        <article><span>01</span><strong>Mục tiêu</strong><p>{note.objective}</p></article>
        <article><span>02</span><strong>Tớ đã thực hiện</strong><p>{note.process}</p></article>
        <article><span>03</span><strong>Điều tớ rút ra</strong><p>{note.takeaway}</p></article>
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
          <DocumentMotion />
          <DocumentRenderer assignment={assignment} />
          <div className="paper-end"><SparkIcon /><span>Hết bài {assignment.number}</span><SparkIcon /></div>
        </div>
      </div>
    </section>

    <nav className="chapter-navigation section-shell" aria-label="Điều hướng giữa các bài">
      {previous ? <Link href={`/${previous.slug}`} className="chapter-link previous"><ArrowBackIcon /><span><small>Bài trước</small><strong>{previous.title}</strong></span></Link> : <Link href="/#muc-luc" className="chapter-link previous"><ArrowBackIcon /><span><small>Quay lại</small><strong>Mục lục portfolio</strong></span></Link>}
      {next ? <Link href={`/${next.slug}`} className="chapter-link next"><span><small>Bài tiếp theo</small><strong>{next.title}</strong></span><ArrowIcon /></Link> : <Link href="/#tong-ket" className="chapter-link next"><span><small>Tiếp tục</small><strong>Đọc phần tổng kết</strong></span><ArrowIcon /></Link>}
    </nav>
  </main>;
}
