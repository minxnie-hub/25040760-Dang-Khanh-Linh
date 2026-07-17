import type { Assignment, ContentBlock, ParagraphBlock, TableBlock } from "@/lib/assignments";
import { assetPath } from "@/lib/assets";
import { ExternalIcon } from "./Icons";

export type TocItem = { id: string; text: string; level: 2 | 3 };

function slugify(text: string, index: number): string {
  return `${text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 64) || "muc"}-${index}`;
}

function headingLevel(block: ParagraphBlock, index: number): 2 | 3 | null {
  const text = block.text.trim();
  if (!text) return null;
  const style = (block.style ?? "").toLowerCase();
  if (style === "title" || style === "heading 1" || style === "heading 2") return 2;
  if (style === "heading 3") return 3;
  if (/^[IVX]+\.\s/.test(text) || /^[A-ZĐ]\.\s/.test(text)) return 2;
  if (index < 8 && text === text.toUpperCase() && text.length < 140 && /[A-ZÀ-Ỹ]/.test(text)) return 2;
  if (block.bold && text.length < 145 && !/[.!?]$/.test(text)) return 3;
  if (/^(Các bước thực hiện|Bảng tổng hợp và đánh giá|Quy trình thực hiện|Những nguyên tắc chính gồm|Minh chứng):?$/.test(text)) return 3;
  return null;
}

export function getToc(blocks: ContentBlock[]): TocItem[] {
  return blocks.flatMap((block, index) => {
    if (block.type !== "paragraph") return [];
    const level = headingLevel(block, index);
    return level ? [{ id: slugify(block.text, index), text: block.text, level }] : [];
  });
}

function LinkifiedText({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return <>{parts.map((part, index) => {
    if (!/^https?:\/\//.test(part)) return part;
    const clean = part.replace(/[),.;]+$/, "");
    const trailing = part.slice(clean.length);
    return <span key={`${part}-${index}`}><a href={clean} target="_blank" rel="noreferrer">{clean}<ExternalIcon /></a>{trailing}</span>;
  })}</>;
}

function EvidenceImages({ block, assignment, startIndex }: { block: ParagraphBlock; assignment: Assignment; startIndex: number }) {
  if (!block.images?.length) return null;
  return <div className={`evidence-grid ${block.images.length === 1 ? "single" : "multiple"}`}>
    {block.images.map((image, index) => <figure key={image}>
      <a href={assetPath(`/assets/assignments/${assignment.slug}/${image}`)} target="_blank" rel="noreferrer" aria-label={`Mở ảnh minh chứng ${startIndex + index + 1}`}>
        <img src={assetPath(`/assets/assignments/${assignment.slug}/${image}`)} alt={`Minh chứng bài ${assignment.number}, ảnh ${startIndex + index + 1}`} loading="lazy" />
      </a>
      <figcaption>Minh chứng {startIndex + index + 1}</figcaption>
    </figure>)}
  </div>;
}

function ParagraphView({ block, index, assignment, imageStart }: { block: ParagraphBlock; index: number; assignment: Assignment; imageStart: number }) {
  const level = headingLevel(block, index);
  const id = level ? slugify(block.text, index) : undefined;
  const content = <LinkifiedText text={block.text} />;

  return <>
    {level === 2 ? <h2 id={id}>{content}</h2> : level === 3 ? <h3 id={id}>{content}</h3> : block.numbering ? <p className="document-list-item" style={{ ["--list-level" as string]: block.numbering.level }}>{content}</p> : <p className={`${block.bold ? "is-bold" : ""} ${block.italic ? "is-italic" : ""} ${block.alignment === "center" ? "is-centered" : ""}`}>{content}</p>}
    <EvidenceImages block={block} assignment={assignment} startIndex={imageStart} />
  </>;
}

function TableView({ block }: { block: TableBlock }) {
  return <div className="table-shell" role="region" aria-label="Bảng nội dung" tabIndex={0}>
    <table>
      <tbody>
        {block.rows.map((row, rowIndex) => <tr key={rowIndex}>
          {row.map((cell, cellIndex) => {
            const CellTag = rowIndex === 0 ? "th" : "td";
            return <CellTag key={`${rowIndex}-${cellIndex}`} colSpan={cell.colspan && cell.colspan > 1 ? cell.colspan : undefined}><LinkifiedText text={cell.text} /></CellTag>;
          })}
        </tr>)}
      </tbody>
    </table>
  </div>;
}

export function DocumentRenderer({ assignment }: { assignment: Assignment }) {
  let imageCursor = 0;
  return <article className="document-content">
    {assignment.blocks.map((block, index) => {
      if (block.type === "table") return <TableView key={`table-${index}`} block={block} />;
      const start = imageCursor;
      imageCursor += block.images?.length ?? 0;
      return <ParagraphView key={`paragraph-${index}`} block={block} index={index} assignment={assignment} imageStart={start} />;
    })}
  </article>;
}
