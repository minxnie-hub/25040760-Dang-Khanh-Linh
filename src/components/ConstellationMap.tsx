import Link from "next/link";
import { assignments } from "@/lib/assignments";
import { ArrowIcon, StarIcon } from "./Icons";

const nodeClasses = [
  "node-one",
  "node-two",
  "node-three",
  "node-four",
  "node-five",
  "node-six",
];

export function ConstellationMap() {
  return <div className="constellation-map">
    <svg className="constellation-lines" viewBox="0 0 1200 760" preserveAspectRatio="none" aria-hidden="true">
      <path d="M590 375 C470 300 360 230 220 170" />
      <path d="M590 375 C450 380 335 390 180 410" />
      <path d="M590 375 C480 500 380 575 250 640" />
      <path d="M610 375 C750 280 850 205 1010 145" />
      <path d="M610 375 C760 390 890 395 1040 420" />
      <path d="M610 375 C735 510 850 590 1000 655" />
      <circle cx="600" cy="375" r="7" />
    </svg>
    <div className="constellation-center" aria-hidden="true"><StarIcon /><span>CNS<br />& AI</span></div>
    {assignments.map((assignment, index) => (
      <Link href={`/${assignment.slug}`} key={assignment.slug} className={`constellation-node ${nodeClasses[index]}`}>
        <span className="node-index">0{assignment.number}</span>
        <span className="node-copy"><small>Bài {assignment.number}</small><strong>{assignment.title}</strong></span>
        <ArrowIcon className="node-arrow" />
      </Link>
    ))}
  </div>;
}
