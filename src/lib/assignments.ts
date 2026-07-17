import bai1 from "@/data/bai-1.json";
import bai2 from "@/data/bai-2.json";
import bai3 from "@/data/bai-3.json";
import bai4 from "@/data/bai-4.json";
import bai5 from "@/data/bai-5.json";
import bai6 from "@/data/bai-6.json";

export type LinkData = { text: string; href: string };
export type ParagraphBlock = {
  type: "paragraph";
  text: string;
  style?: string | null;
  bold?: boolean;
  italic?: boolean;
  alignment?: string | null;
  numbering?: { level: number; numId: number | null } | null;
  links?: LinkData[];
  images?: string[];
};
export type TableCell = {
  text: string;
  colspan?: number;
  vmerge?: string | null;
};
export type TableBlock = { type: "table"; rows: TableCell[][] };
export type ContentBlock = ParagraphBlock | TableBlock;
export type Assignment = {
  slug: string;
  number: number;
  title: string;
  blocks: ContentBlock[];
  imageCount: number;
};

export const assignments = [bai1, bai2, bai3, bai4, bai5, bai6] as Assignment[];

export function getAssignment(slug: string): Assignment | undefined {
  return assignments.find((assignment) => assignment.slug === slug);
}
