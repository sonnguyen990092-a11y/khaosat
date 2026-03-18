const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const puppeteer = require('puppeteer');
require('dotenv').config();

const app = express();
const PORT = 3000;
const DAKHAOSAT_DIR = path.join(__dirname, 'DAKHAOSAT');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ensure data directory exists
if (!fs.existsSync(DAKHAOSAT_DIR)){
    fs.mkdirSync(DAKHAOSAT_DIR);
}

// Background worker for submitting to external site
async function submitToBYT(thongTin, danhGia, yKien) {
    let browser;
    try {
        console.log("Starting Puppeteer submission to BYT...");
        browser = await puppeteer.launch({ 
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox'] 
        });
        const page = await browser.newPage();
        
        // Navigate to login
        await page.goto('https://hailong.chatluongbenhvien.vn/user/login', { waitUntil: 'networkidle2' });
        
        // Fill login
        await page.type('#edit-name', process.env.BYT_USERNAME);
        await page.type('#edit-pass', process.env.BYT_PASSWORD);
        
        // Create a promise to wait for navigation after click
        const navPromise = page.waitForNavigation({ waitUntil: 'networkidle2' });
        await page.click('#edit-submit');
        await navPromise;
        
        console.log("Logged in successfully. Navigating to survey form...");
        // Navigate to survey form
        await page.goto('https://hailong.chatluongbenhvien.vn/content/3-khao-sat-y-kien-nhan-vien-y-te', { waitUntil: 'networkidle2' });
        
        // Mapping logic here.
        await page.evaluate((tt, dg, yk) => {
            const checkRadio = (name, value) => {
                const el = document.querySelector(`input[name="${name}"][value="${value}"]`);
                if (el) el.click();
            };

            const fillText = (name, value) => {
                const el = document.querySelector(`input[name="${name}"]`);
                if (el && value) el.value = value;
            };

            // Mapping for Type of Survey & General form defaults
            // document.querySelector('select[name="submitted[kieu_khao_sat]"]').value = "1"; // Require manual setup or default?
            
            // Mã số phiếu
            let randomNum = Math.floor(Math.random() * 99) + 1;
            let formattedNum = randomNum.toString().padStart(2, '0');
            fillText("submitted[ttp][masophieu]", `KH-${formattedNum}`);

            // THÔNG TIN NGƯỜI ĐIỀN PHIẾU
            
            // A1. Giới tính
            let gioiTinhMap = { "Nam": "1", "Nữ": "2", "Khác": "3" };
            checkRadio("submitted[thong_tin_nguoi_dien_phieu][gioi_tuoi][gioi_tinh]", gioiTinhMap[tt.A1_gioi_tinh]);
            
            // A2. Tuổi
            fillText("submitted[thong_tin_nguoi_dien_phieu][gioi_tuoi][tuoi]", tt.A2_tuoi);

            // A3. Chuyên môn đào tạo
            let chmonMap = { "Bác sỹ": "1", "Dược sỹ": "2", "Điều dưỡng, hộ sinh": "3", "Kỹ thuật viên": "4", "Khác": "5" };
            if (chmonMap[tt.A3_chuyen_mon]) {
                checkRadio("submitted[thong_tin_nguoi_dien_phieu][chuyenmon][select]", chmonMap[tt.A3_chuyen_mon]);
            } else if (tt.A3_chuyen_mon) {
                checkRadio("submitted[thong_tin_nguoi_dien_phieu][chuyenmon][select]", "select_or_other");
                fillText("submitted[thong_tin_nguoi_dien_phieu][chuyenmon][other]", tt.A3_chuyen_mon);
            }

            // A4. Bằng cấp
            let bangMap = { "Trung cấp": "1", "Cao đẳng": "2", "Đại học": "3", "Cao học, CKI": "4", "Tiến sỹ, CKII": "5", "Khác": "select_or_other" };
            if(bangMap[tt.A4_bang_cap] && bangMap[tt.A4_bang_cap] !== "select_or_other") {
                checkRadio("submitted[thong_tin_nguoi_dien_phieu][bangcap][select]", bangMap[tt.A4_bang_cap]);
            } else if (tt.A4_bang_cap) {
                checkRadio("submitted[thong_tin_nguoi_dien_phieu][bangcap][select]", "select_or_other");
                fillText("submitted[thong_tin_nguoi_dien_phieu][bangcap][other]", tt.A4_bang_cap);
            }

            // A5 & A6 Số năm
            fillText("submitted[thong_tin_nguoi_dien_phieu][namcongtac]", tt.A5_nam_nganh_y);
            fillText("submitted[thong_tin_nguoi_dien_phieu][nambv]", tt.A6_nam_benh_vien);

            // A7. Vị trí
            let viTriMap = {
                "Lãnh đạo bệnh viện": "1",
                "Trưởng khoa/phòng/ trung tâm": "2",
                "Phó khoa/phòng": "3",
                "NV biên chế/hợp đồng dài hạn": "4",
                "Hợp đồng ngắn hạn": "5",
                "Khác": "6"
            };
            if(viTriMap[tt.A7_vi_tri] && viTriMap[tt.A7_vi_tri] !== "6") {
                 checkRadio("submitted[thong_tin_nguoi_dien_phieu][vitri][select]", viTriMap[tt.A7_vi_tri]);
            } else if (tt.A7_vi_tri) {
                 checkRadio("submitted[thong_tin_nguoi_dien_phieu][vitri][select]", "select_or_other");
                 fillText("submitted[thong_tin_nguoi_dien_phieu][vitri][other]", tt.A7_vi_tri);
            }

            // A8. Phạm vi phòng ban
            let phongMap = {
               "Khối hành chính": "1", "Cận lâm sàng": "2", "Nội": "3", "Ngoại": "4", "Sản": "5", "Nhi": "6",
               "Truyền nhiễm": "7", "Chuyên khoa lẻ": "8", "Các khoa không trực tiếp KCB": "9", "Dược": "10", "Dự phòng": "11", "Khác": "12"
            };
            if(phongMap[tt.A8_pham_vi] && phongMap[tt.A8_pham_vi] !== "12") {
                checkRadio("submitted[thong_tin_nguoi_dien_phieu][phamvi][select]", phongMap[tt.A8_pham_vi]);
            } else if(tt.A8_pham_vi) {
                checkRadio("submitted[thong_tin_nguoi_dien_phieu][phamvi][select]", "select_or_other");
                fillText("submitted[thong_tin_nguoi_dien_phieu][phamvi][other]", tt.A8_pham_vi);
            }

            // A9. Kiêm nhiệm
            let knMap = { "Không kiêm nhiệm": "1", "Kiêm nhiệm 2 công việc": "2", "Kiêm nhiệm từ 3 công việc trở lên": "3" };
            checkRadio("submitted[thong_tin_nguoi_dien_phieu][kiemnhiem]", knMap[tt.A9_kiem_nhiem]);

            // A10. Trực
            fillText("submitted[thong_tin_nguoi_dien_phieu][truc]", tt.A10_truc_thang);

            // PHẦN II. ĐÁNH GIÁ SỰ HÀI LÒNG
            // Loop through danhGia object keys, expecting format like A1_V, C3_V, E7_V etc.
            for (const [key, val] of Object.entries(dg)) {
                if (key && val) {
                   // Ex from internal: id: 'A1_V'
                   // Ex target name array format: submitted[danh_gia][a][a1]
                   let parts = key.split('_'); // ['A1', 'V']
                   if(parts.length > 0) {
                       let questionId = parts[0].toLowerCase(); // 'a1'
                       let categoryId = questionId.charAt(0);   // 'a'
                       checkRadio(`submitted[danh_gia][${categoryId}][${questionId}]`, val);
                   }
                }
            }

            // PHẦN III. Ý KIẾN KHÁC
            if(yk) {
                const ykEl = document.querySelector('textarea[name="submitted[y_kien_khac][ykien]"]');
                if(ykEl) ykEl.value = yk;
            }

        }, thongTin, danhGia, yKien);

        // Submit the BYT form
        await page.click('#edit-submit'); // The generic submit button id generated by drupal forms
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        
        console.log("Submission to BYT completed successfully (Simulated placeholder map).");
    } catch (error) {
        console.error("Puppeteer automation failed:", error);
    } finally {
        if (browser) await browser.close();
    }
}

app.post('/api/submit', async (req, res) => {
    try {
        const data = req.body;
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `phieu_khao_sat_${timestamp}.xlsx`;
        const filepath = path.join(DAKHAOSAT_DIR, filename);

        const thongTin = data.thong_tin || {};
        const danhGia = data.danh_gia || {};
        const yKien = data.y_kien_khac || 'Không có';

        // Prepare data for Excel
        const excelData = [
            ["PHIẾU KHẢO SÁT Ý KIẾN NHÂN VIÊN Y TẾ"],
            [],
            ["I. THÔNG TIN NGƯỜI ĐIỀN PHIẾU"],
            ["Tiêu chí", "Nội dung"],
            ["A1. Giới tính", thongTin.A1_gioi_tinh || ''],
            ["A2. Tuổi", thongTin.A2_tuoi || ''],
            ["A3. Chuyên môn đào tạo chính", thongTin.A3_chuyen_mon || ''],
            ["A4. Bằng cấp cao nhất", thongTin.A4_bang_cap || ''],
            ["A5. Số năm công tác ngành Y", thongTin.A5_nam_nganh_y || ''],
            ["A6. Số năm công tác tại bệnh viện", thongTin.A6_nam_benh_vien || ''],
            ["A7. Vị trí công tác hiện tại", thongTin.A7_vi_tri || ''],
            ["A8. Phạm vi hoạt động", thongTin.A8_pham_vi || ''],
            ["A9. Kiêm nhiệm công việc", thongTin.A9_kiem_nhiem || ''],
            ["A10. Số lần trực trong tháng", thongTin.A10_truc_thang || ''],
            [],
            ["II. ĐÁNH GIÁ SỰ HÀI LÒNG"],
            ["Tiêu chí", "Điểm đánh giá"],
            ...Object.entries(danhGia),
            [],
            ["III. Ý KIẾN KHÁC"],
            [yKien]
        ];

        // Create a new workbook and add the worksheet
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.aoa_to_sheet(excelData);
        xlsx.utils.book_append_sheet(wb, ws, "Khảo Sát");

        // Write to file
        xlsx.writeFile(wb, filepath);
        console.log(`Saved survey data to Excel: ${filename}`);
        
        // Fire and forget Puppeteer job
        submitToBYT(thongTin, danhGia, yKien);

        res.status(200).json({ success: true, message: 'Survey submitted successfully', filename: filename });
    } catch (error) {
        console.error('Error saving survey:', error);
        res.status(500).json({ success: false, message: 'An error occurred while saving the survey' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Serving static files from ./public`);
    console.log(`Saving survey data to ${DAKHAOSAT_DIR}`);
});
