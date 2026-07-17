import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { StarCanvas } from "@/components/StarCanvas";
import { WelcomeOverlay } from "@/components/WelcomeOverlay";
import { ConstellationMap } from "@/components/ConstellationMap";
import { HomeMotion } from "@/components/HomeMotion";
import { ArrowIcon, BookmarkIcon, CompassIcon, GamepadIcon, HeadphonesIcon, MailIcon, ShieldIcon, SparkIcon, StarIcon } from "@/components/Icons";
import { assetPath } from "@/lib/assets";

const personalDetails = [
  ["Họ và tên", "Đặng Khánh Linh"],
  ["MSSV", "25040760"],
  ["Lớp", "25E17"],
  ["Khóa", "QH2025"],
  ["Khoa", "Ngôn ngữ và Văn hóa Anh"],
  ["Ngành", "Tiếng Anh"],
];

const learningGoals = [
  "Tổ chức và quản lý dữ liệu cá nhân khoa học hơn.",
  "Tìm kiếm, chọn lọc và đánh giá nguồn thông tin học thuật.",
  "Giao tiếp rõ ràng với AI thông qua việc xây dựng prompt.",
  "Sử dụng công cụ số hiệu quả khi học độc lập và làm việc nhóm.",
  "Kết hợp đầu ra của AI với tư duy và đóng góp sáng tạo của riêng tớ.",
  "Nhận diện giới hạn, trách nhiệm và vấn đề đạo đức khi dùng AI.",
];

const portfolioGoals = [
  ["Lưu trữ", "Tớ muốn lưu lại sáu sản phẩm học tập theo một trình tự rõ ràng."],
  ["Phản tư", "Tớ muốn nhìn lại mình đã học được gì và thay đổi ra sao qua từng bài."],
  ["Chia sẻ", "Tớ muốn cho cậu xem một góc nhỏ trong thế giới học tập của tớ."],
];

const skills = [
  "Quản lý tệp tin và tổ chức dữ liệu.",
  "Tìm kiếm, đánh giá nguồn học thuật.",
  "Xây dựng và tinh chỉnh prompt.",
  "Cộng tác và chia sẻ tài nguyên trực tuyến.",
  "Sáng tạo nội dung với sự hỗ trợ của AI.",
  "Kiểm chứng và chịu trách nhiệm với đầu ra AI.",
];

export default function HomePage() {
  return <main className="home-page" id="page-root">
    <WelcomeOverlay />
    <SiteHeader />
    <HomeMotion />

    <section className="hero" id="trang-chu">
      <StarCanvas density={1.35} />
      <div className="moon moon-hero" aria-hidden="true" />
      <div className="hero-haze" aria-hidden="true" />
      <div className="hero-inner section-shell">
        <div className="hero-copy">
          <p className="hero-kicker"><SparkIcon /> Nhập môn Công nghệ số và Ứng dụng Trí tuệ nhân tạo</p>
          <h1 aria-label="Đặng Khánh Linh" className="hero-display-title">
            <span className="hero-title-mask hero-title-top"><span className="hero-title-line">Đặng</span></span>
            <span className="hero-title-mask hero-title-bottom"><span className="hero-title-line">Khánh Linh</span></span>
          </h1>
          <div className="hero-editorial-note">
            <span>field note 01</span>
            <p>Sáu chương học tập, một hành trình ghi lại theo cách rất riêng của tớ.</p>
          </div>
          <p className="hero-manifesto">Chào cậu, đây là cuốn sổ bầu trời nơi tớ lưu lại sáu dấu mốc trong hành trình làm quen với công nghệ số và AI. Mỗi chương là một kỹ năng tớ đã học, một thử thách tớ đã đi qua và một điều mới tớ muốn mang theo.</p>
          <div className="hero-actions">
            <Link href="#muc-luc" className="primary-button"><CompassIcon /> Mở mục lục sao <ArrowIcon /></Link>
            <Link href="#gioi-thieu" className="text-button">Đọc lời giới thiệu</Link>
          </div>
          <p className="hero-footnote"><span /> Ngôn ngữ và Văn hóa Anh · ULIS · QH2025</p>
        </div>

        <div className="portrait-stage">
          <svg className="portrait-orbit" viewBox="0 0 560 650" aria-hidden="true">
            <path d="M84 404C40 242 156 78 318 86c136 7 238 127 214 273-24 145-170 246-315 205C139 542 103 474 84 404Z" />
            <path d="M34 307C75 153 217 56 365 92c134 33 205 175 152 309-55 139-218 203-348 128C96 488 50 405 34 307Z" />
          </svg>
          <div className="portrait-plate">
            <div className="portrait-image"><img src={assetPath("/assets/khanh-linh-avatar.jpg")} alt="Chân dung Đặng Khánh Linh" /></div>
            <div className="portrait-caption"><span>Student field notes</span><strong>English Language · ULIS</strong></div>
          </div>
          <div className="hero-sticker sticker-book"><BookmarkIcon /><span>chapter 01–06</span></div>
          <div className="hero-sticker sticker-spark"><SparkIcon /></div>
          <div className="portrait-note">six chapters<br />one journey</div>
        </div>
      </div>
      <a className="hero-scroll" href="#gioi-thieu"><span /> Cuộn xuống để đọc</a>
    </section>

    <section className="about-section paper-section" id="gioi-thieu">
      <div className="moon moon-about" aria-hidden="true" />
      <div className="section-shell about-layout">
        <header className="section-heading" data-reveal>
          <p className="section-whisper">Một chút về hành trình và con người phía sau portfolio này.</p>
          <h2>Học thuật, rõ ràng —<br /><em>nhưng vẫn rất là tớ.</em></h2>
          <div className="about-rule" />
        </header>

        <div className="about-story" data-reveal>
          <p>Tớ là Đặng Khánh Linh, sinh viên Khoa Ngôn ngữ và Văn hóa Anh tại Trường Đại học Ngoại ngữ, ĐHQGHN. Ngành học giúp tớ khám phá không chỉ ngôn ngữ mà còn cả văn hóa, cách con người giao tiếp và cách tri thức được chia sẻ.</p>
          <p>Tớ thường được nhìn nhận là một người mạnh mẽ và thẳng thắn, nhưng phía sau đó tớ cũng có một khoảng lặng khá riêng. Có lẽ vì vậy mà tớ vừa thích những thế giới sôi động trong game và âm nhạc, vừa yêu cảm giác yên tĩnh khi đọc một cuốn sách.</p>
          <blockquote><SparkIcon /> Tớ không nghĩ bản thân đã hiểu hết về công nghệ, nhưng tớ thích nghi khá nhanh, luôn sẵn sàng học điều mới và có trách nhiệm với phần việc của mình.</blockquote>
        </div>

        <div className="profile-ledger" data-reveal>
          {personalDetails.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
          <div><span>Trường</span><strong>Trường Đại học Ngoại ngữ — ULIS</strong></div>
        </div>

        <aside className="personal-notes" data-reveal aria-label="Ghi chú cá nhân">
          <div className="personal-note note-character"><StarIcon /><span>Tính cách</span><strong>Mạnh mẽ, thẳng thắn nhưng cũng khá nội tâm.</strong></div>
          <div className="personal-note note-music"><HeadphonesIcon /><span>Sở thích</span><strong>Chơi game, nghe nhạc và đọc sách.</strong></div>
          <div className="personal-note note-game"><GamepadIcon /><span>Điểm mạnh</span><strong>Thích ứng nhanh, học hỏi nhanh và có trách nhiệm.</strong></div>
        </aside>
      </div>
    </section>

    <section className="goals-section" id="muc-tieu">
      <StarCanvas density={0.68} quiet />
      <div className="section-shell goals-layout">
        <header className="goals-intro" data-reveal>
          <p className="section-whisper light">Tớ muốn công nghệ hỗ trợ quá trình học, không thay thế quá trình tự học.</p>
          <h2>Mục tiêu học tập<br />và định hướng phát triển</h2>
          <p>Trong học phần này, tớ không chỉ muốn biết cách dùng công cụ mà còn muốn hiểu cách lựa chọn, kiểm tra và sử dụng chúng một cách phù hợp.</p>
        </header>
        <div className="goal-track" aria-label="Các mục tiêu học tập">
          <span className="goal-track-line"><span className="goal-track-fill" /></span>
          {learningGoals.map((goal, index) => <article key={goal} className="goal-step" data-reveal>
            <span className="goal-index">0{index + 1}</span>
            <p>{goal}</p>
          </article>)}
        </div>
        <div className="portfolio-purpose" data-reveal>
          <h3>Mục tiêu của Portfolio</h3>
          <p>Với tớ, Portfolio không chỉ là nơi tập hợp những bài đã hoàn thành. Đây còn là cách để tớ nhìn lại hành trình của mình rõ hơn.</p>
          <div className="purpose-list">
            {portfolioGoals.map(([title, text], index) => <div key={title}><span>0{index + 1}</span><strong>{title}</strong><p>{text}</p></div>)}
          </div>
        </div>
      </div>
    </section>

    <section className="contents-section" id="muc-luc">
      <StarCanvas density={1.05} />
      <div className="moon moon-contents" aria-hidden="true" />
      <div className="section-shell contents-layout">
        <header className="contents-heading" data-reveal>
          <p className="section-whisper light">Sáu bài tập giống như sáu ngôi sao nằm trên cùng một bản đồ học tập.</p>
          <h2>Lần theo sáu<br /><em>nhánh sao.</em></h2>
          <p>Cậu có thể chọn một ngôi sao để mở từng chương, hoặc lần lượt đi theo đường nối để đọc toàn bộ hành trình. Mỗi bài là một trang riêng; chữ, ảnh minh chứng và bảng biểu vẫn giữ đúng thứ tự của tài liệu gốc.</p>
        </header>
        <ConstellationMap />
      </div>
    </section>

    <section className="reflection-section paper-section" id="tong-ket">
      <div className="section-shell reflection-layout">
        <header className="section-heading reflection-heading" data-reveal>
          <p className="section-whisper">Khi nối lại, sáu bài tập tạo thành một hành trình rõ ràng hơn tớ từng nghĩ.</p>
          <h2>Điều tớ giữ lại<br /><em>sau sáu chương.</em></h2>
        </header>
        <div className="reflection-copy" data-reveal>
          <p>Khi nhìn lại sáu bài tập, tớ nhận ra hành trình này không chỉ giúp tớ biết thêm nhiều công cụ. Quan trọng hơn, tớ đã dần hình thành một cách làm việc rõ ràng hơn: biết tổ chức dữ liệu, kiểm tra nguồn thông tin, diễn đạt yêu cầu cụ thể, phối hợp với người khác và chịu trách nhiệm với sản phẩm mình tạo ra.</p>
          <p>Điều tớ tâm đắc nhất là chất lượng của một sản phẩm không phụ thuộc hoàn toàn vào việc công cụ mạnh đến đâu, mà còn phụ thuộc vào cách con người sử dụng công cụ ấy.</p>
        </div>
        <div className="skills-list" data-reveal>
          <h3>Những kỹ năng tớ đã rèn luyện</h3>
          {skills.map((skill, index) => <div key={skill}><span>0{index + 1}</span><p>{skill}</p></div>)}
        </div>
        <div className="challenge-note" data-reveal>
          <ShieldIcon />
          <h3>Khó khăn và cách tớ giải quyết</h3>
          <p>Khối lượng tài liệu và ảnh minh chứng khá lớn; kết quả AI đôi khi còn chung chung; lịch trình làm việc nhóm cũng không phải lúc nào cũng trùng nhau. Tớ đã chia nội dung thành từng phần nhỏ, đặt tên tệp rõ ràng, đối chiếu đầu ra AI với nguồn đáng tin cậy và chủ động cập nhật tiến độ với nhóm.</p>
        </div>
      </div>
    </section>

    <section className="closing-section">
      <StarCanvas density={0.76} quiet />
      <svg className="closing-constellation" viewBox="0 0 900 360" aria-hidden="true">
        <path d="M72 226 211 98 348 178 493 62 644 142 817 80" />
        <path d="M348 178 462 287 644 142" />
        <circle cx="72" cy="226" r="7" /><circle cx="211" cy="98" r="7" /><circle cx="348" cy="178" r="7" /><circle cx="493" cy="62" r="7" /><circle cx="644" cy="142" r="7" /><circle cx="817" cy="80" r="7" />
      </svg>
      <div className="section-shell closing-content" data-reveal>
        <p>Đi hết sáu chòm sao này, điều tớ giữ lại không chỉ là sáu sản phẩm đã hoàn thành.</p>
        <h2>Mỗi công cụ chỉ thật sự có ý nghĩa<br />khi tớ hiểu vì sao mình sử dụng nó.</h2>
        <p>Cảm ơn cậu đã dành thời gian ghé qua góc nhỏ của tớ. Hy vọng một ngôi sao nào đó trong hành trình này cũng để lại cho cậu một điều đáng nhớ.</p>
        <span>The journey continues, one small star at a time.</span>
      </div>
    </section>

    <footer className="site-footer" id="lien-he">
      <div className="section-shell footer-layout">
        <div className="footer-message"><MailIcon /><p>Kết nối với tớ</p><h2><span>Tớ sẽ rất vui nếu có thể</span><span>được đồng hành cùng cậu.</span></h2></div>
        <div className="footer-links">
          <a href="mailto:dangkhanhlinh20011006@gmail.com">dangkhanhlinh20011006@gmail.com <ArrowIcon /></a>
          <a href="https://www.facebook.com/jellojello.areuokayy" target="_blank" rel="noreferrer">Facebook · jellojello.areuokayy <ArrowIcon /></a>
        </div>
      </div>
      <div className="footer-bottom"><span>© 2026 Đặng Khánh Linh</span><span>ULIS · QH2025 · 25E17</span></div>
    </footer>
  </main>;
}
