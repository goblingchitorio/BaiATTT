# HƯỚNG DẪN MỞ VÀ CHẠY SOURCE CODE GENGREEN

---

## ❓ VÌ SAO BẠN KHÔNG MỞ TRỰC TIẾP FILE `index.html` ĐƯỢC?

Khi tải toàn bộ mã nguồn về máy tính và bấm đúp chuột vào file `index.html`, trang web sẽ hiện trang trắng hoặc không hoạt động vì:
1. **Dự án được xây dựng bằng React & TypeScript (`.tsx`)**: Trình duyệt web thông thường chỉ hiểu mã HTML/CSS/JavaScript thuần, không thể tự biên dịch trực tiếp file TypeScript `.tsx`.
2. **Cơ chế Module bảo mật (CORS Policy)**: Lệnh `<script type="module" src="/index.tsx">` bị trình duyệt chặn khi chạy dưới giao thức file cục bộ (`file:///C:/...`).
3. **Đường dẫn gốc `/`**: Dấu gạch chéo `/index.tsx` sẽ trỏ về tận ổ đĩa `C:/` thay vì thư mục hiện tại của dự án.

---

##  CÁCH 1: MỞ TRỰC TIẾP BẰNG 1 CÚ NHẤP CHUỘT (KHÔNG CẦN CÀI ĐẶT GÌ)

Chúng tôi đã tạo sẵn cho bạn file mã nguồn độc lập **chạy trực tiếp 100%**:

📁 **`gengreen_standalone.html`**

👉 **Cách dùng:**
1. Mở thư mục dự án vừa tải về.
2. **Nhấp đúp chuột (Double click)** vào file **`gengreen_standalone.html`** (hoặc chuột phải chọn *Open with -> Google Chrome / Microsoft Edge / Cốc Cốc / Safari / Firefox*).
3. Trang web sẽ mở ra ngay lập tức với đầy đủ:
   - Đội ngũ 7 thành viên dự án (bao gồm Nguyễn Ngọc Như Ý).
   - Bản đồ tương tác Leaflet và liên kết OpenStreetMap.
   - 4 biểu đồ trực quan hóa dữ liệu rác thải nhựa.
   - Khung so sánh ảnh Trước / Sau (Before / After).
   - Biểu mẫu báo cáo điểm rác và đăng ký tình nguyện viên gửi về email `26162120@student.hcmute.edu.vn`.

Hoặc trên Windows: bạn có thể bấm đúp vào file **`chay_trang_web.bat`**.

---

## 💻 CÁCH 2: CHẠY BẢN DEVELOPER ĐẦY ĐỦ BẰNG NODE.JS (NẾU MUỐN LẬP TRÌNH TIẾP)

Nếu bạn có cài đặt **Node.js** trên máy tính:
1. Mở Terminal (Command Prompt hoặc PowerShell) tại thư mục dự án.
2. Chạy lệnh cài đặt thư viện:
   ```bash
   npm install
   ```
3. Khởi động server phát triển:
   ```bash
   npm run dev
   ```
4. Mở trình duyệt và truy cập: `http://localhost:3000`

---

## 📧 DỮ LIỆU ĐĂNG KÝ
Toàn bộ biểu mẫu Đăng ký tình nguyện viên và Báo cáo điểm rác đều được cấu hình tự động gửi về email:
**`26162120@student.hcmute.edu.vn`**
