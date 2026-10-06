@echo off
chcp 65001 > nul
echo ===================================================
echo     DỰ ÁN GENGREEN - GIẢM THIỂU RÁC THẢI NHỰA
echo ===================================================
echo.
echo [1] Đang mở file chạy trực tiếp (Standalone HTML) trên trình duyệt...
start gengreen_standalone.html

echo.
echo [2] Nếu bạn đã cài Node.js và muốn chạy bản Dev Server:
where npm >nul 2>nul
if %errorlevel% equ 0 (
    echo     Phát hiện đã có Node.js / npm!
    echo     Đang khởi động Vite Dev Server...
    npm run dev
) else (
    echo     (Máy chưa cài Node.js, trang web đã được mở trực tiếp thành công bằng trình duyệt!)
)
pause
