import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { StarField } from "@/components/StarField";
import { WelcomeOverlay } from "@/components/WelcomeOverlay";
import { ConstellationMap } from "@/components/ConstellationMap";
import { ArrowIcon, BookIcon, MailIcon, StarIcon } from "@/components/Icons";
import { assetPath } from "@/lib/assets";

const personalDetails = [
  ["Họ và tên", "Đặng Khánh Linh"],
  ["MSSV", "25040760"],
  ["Lớp", "25E17"],
  ["Khóa", "QH2025"],
  ["Khoa", "Ngôn ngữ và Văn hóa Anh"],
  ["Ngành", "Tiếng Anh"],
];

export default function HomePage() {
  return <main className="home-page">
    <WelcomeOverlay />
    <SiteHeader />
    <section className="hero" id="trang-chu">
      <StarField />
      <div className="hero-orbit orbit-one" aria-hidden="true" />
      <div className="hero-orbit orbit-two" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow"><StarIcon /> Nhập môn Công nghệ số và Ứng dụng Trí tuệ nhân tạo</p>
          <h1><span>Đặng Khánh Linh</span><em>A constellation of learning.</em></h1>
          <p className="hero-lead">Chào cậu, đây là cuốn sổ bầu trời nơi tớ lưu lại sáu sản phẩm học tập, mỗi trang là một dấu mốc nhỏ trong hành trình làm quen với công nghệ số và AI.</p>
          <div className="hero-actions">
            <Link href="#muc-luc" className="primary-button">Khám phá mục lục <ArrowIcon /></Link>
            <Link href="#gioi-thieu" className="text-button">Đọc lời giới thiệu</Link>
          </div>
          <div className="hero-meta" aria-label="Thông tin nhanh">
            <span>ULIS</span><span>QH2025</span><span>25E17</span><span>25040760</span>
          </div>
        </div>
        <div className="portrait-stage">
          <div className="portrait-caption"><span>Student portfolio</span><small>English Language · ULIS</small></div>
          <div className="portrait-frame">
            <img src={assetPath("/assets/khanh-linh-avatar.jpg")} alt="Chân dung Đặng Khánh Linh" />
          </div>
          <div className="portrait-star star-a"><StarIcon /></div>
          <div className="portrait-star star-b"><StarIcon /></div>
          <div className="portrait-note">six chapters<br />one journey</div>
        </div>
      </div>
      <a href="#gioi-thieu" className="scroll-cue" aria-label="Cuộn xuống phần giới thiệu"><span />Scroll to read</a>
    </section>

    <section className="about-section" id="gioi-thieu">
      <div className="section-shell about-grid">
        <div className="section-intro">
          <p className="eyebrow dark"><BookIcon /> Giới thiệu</p>
          <h2>Một góc học thuật,<br /><em>vẫn rất là tớ.</em></h2>
          <p>Portfolio được xây dựng theo chủ đề bầu trời đêm đầy sao, kết hợp tinh thần học thuật của ngành Tiếng Anh với cách kể chuyện gần gũi, rõ ràng và có chút dễ thương.</p>
        </div>
        <div className="profile-ledger">
          {personalDetails.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
          <div><span>Trường</span><strong>Trường Đại học Ngoại ngữ - ULIS</strong></div>
        </div>
        <aside className="about-quote">
          <StarIcon />
          <blockquote>“Mỗi bài tập là một vì sao, mỗi kỹ năng mới là một đường nối giúp bầu trời học tập của tớ rõ ràng hơn.”</blockquote>
          <span>Đặng Khánh Linh · 2026</span>
        </aside>
      </div>
    </section>

    <section className="contents-section" id="muc-luc">
      <StarField subtle />
      <div className="section-shell">
        <div className="contents-heading">
          <div><p className="eyebrow"><StarIcon /> Mục lục hành trình</p><h2>Sáu nhánh sao<br />của portfolio</h2></div>
          <p>Cậu có thể bắt đầu ở bất kỳ nhánh nào. Mỗi bài được trình bày thành một trang riêng, giữ đúng thứ tự chữ, ảnh minh chứng và bảng biểu trong tài liệu gốc.</p>
        </div>
        <ConstellationMap />
      </div>
    </section>

    <section className="closing-section" id="tong-ket">
      <div className="section-shell closing-grid">
        <div className="closing-number">06</div>
        <div>
          <p className="eyebrow dark">Tổng kết</p>
          <h2>Khép lại một cuốn sổ,<br /><em>mở ra một bầu trời mới.</em></h2>
        </div>
        <div className="closing-copy">
          <p>Qua sáu bài tập, tớ có thêm nền tảng về quản lý tệp tin, tìm kiếm học thuật, viết prompt, hợp tác trực tuyến, sáng tạo nội dung và sử dụng AI có trách nhiệm.</p>
          <p>Điều quan trọng nhất không chỉ là biết dùng công cụ, mà còn là biết kiểm chứng, chọn lọc và giữ vai trò chủ động của người học.</p>
        </div>
      </div>
    </section>

    <footer className="site-footer" id="lien-he">
      <StarField subtle />
      <div className="section-shell footer-grid">
        <div><p className="eyebrow"><MailIcon /> Liên hệ</p><h2>Cảm ơn cậu đã ghé qua<br />góc trời nhỏ của tớ.</h2></div>
        <div className="footer-links">
          <a href="mailto:dangkhanhlinh20011006@gmail.com">dangkhanhlinh20011006@gmail.com <ArrowIcon /></a>
          <a href="https://www.facebook.com/jellojello.areuokayy" target="_blank" rel="noreferrer">Facebook · jellojello.areuokayy <ArrowIcon /></a>
        </div>
      </div>
      <div className="footer-bottom"><span>© 2026 Đặng Khánh Linh</span><span>ULIS · QH2025 · 25E17</span></div>
    </footer>
  </main>;
}
