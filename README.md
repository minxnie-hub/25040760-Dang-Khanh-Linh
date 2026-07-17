# Portfolio Đặng Khánh Linh · 25040760

Portfolio học phần **Nhập môn Công nghệ số và Ứng dụng Trí tuệ nhân tạo** của Đặng Khánh Linh — sinh viên Khoa Ngôn ngữ và Văn hóa Anh, ULIS.

## Định hướng thiết kế

- Chủ đề **bầu trời đêm xanh lam**, mặt trăng trắng bạc và các nhánh chòm sao.
- Giọng kể mới của Portfolio sử dụng **tớ – cậu**; nội dung gốc của 6 bài được giữ nguyên.
- Màn chào mừng mô phỏng mở một cuốn sổ bằng CSS 3D và GSAP.
- Mục lục 6 bài là một bản đồ chòm sao tương tác, không phải lưới card thông thường.
- Ảnh minh chứng nằm ngay sau đoạn nội dung tương ứng; bảng được dựng lại bằng HTML và có thể cuộn ngang trên màn hình nhỏ.
- Có phương án giảm chuyển động theo `prefers-reduced-motion`.

## Công nghệ

- Next.js App Router, React, TypeScript
- Tailwind CSS v4
- GSAP, `@gsap/react`, ScrollTrigger
- CSS 3D, SVG và Canvas 2D
- Playwright Test để kiểm tra desktop/mobile
- Static export và GitHub Actions để deploy GitHub Pages

## Chạy ở máy cá nhân

```bash
npm install
npm run dev
```

Mở `http://localhost:3000`.

## Kiểm tra

```bash
npm run lint
npm run build
npm test
```

`npm run build` tạo website tĩnh trong thư mục `out/`.

## Deploy GitHub Pages

1. Đẩy toàn bộ source lên nhánh `main`.
2. Vào **Settings → Pages**.
3. Trong **Build and deployment → Source**, chọn **GitHub Actions**.
4. Workflow `.github/workflows/deploy-pages.yml` sẽ tự cài dependency, build và deploy.

`next.config.ts` tự nhận tên repository trong GitHub Actions để thiết lập `basePath`. Vì vậy ảnh, asset và các route `/bai-1` đến `/bai-6` vẫn hoạt động khi website được đặt dưới đường dẫn repository.

## GitHub Actions dependency note

The repository includes a portable `package-lock.json` without environment-specific registry URLs and an `.npmrc` pinned to the public npm registry. This prevents GitHub Actions from attempting to download packages from a private build-environment registry.
