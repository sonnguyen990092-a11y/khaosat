const surveyData = [
    {
        group: 'A. Sự hài lòng về môi trường làm việc',
        questions: [
            { id: 'A1_V', text: 'A1. Phòng làm việc khang trang, sạch sẽ, thoáng mát.' },
            { id: 'A2_V', text: 'A2. Trang thiết bị văn phòng, bàn ghế làm việc... đầy đủ, các thiết bị cũ, lạc hậu được thay thế kịp thời.' },
            { id: 'A3_V', text: 'A3. Có bố trí phòng trực cho NVYT.' },
            { id: 'A4_V', text: 'A4. Phân chia thời gian trực và làm việc ngoài giờ hành chính hợp lý.' },
            { id: 'A5_V', text: 'A5. Các trang bị bảo hộ cho NVYT (quần áo, khẩu trang, găng tay..) đầy đủ, không bị cũ, nhàu nát, không bị hạn chế sử dụng.' },
            { id: 'A6_V', text: 'A6. Môi trường học tập tạo điều kiện cho NVYT cập nhật kiến thức, nâng cao trình độ: thư viện, phòng đọc, tra cứu thông tin, truy cập internet...' },
            { id: 'A7_V', text: 'A7. Môi trường làm việc bảo đảm an toàn cho NVYT.' },
            { id: 'A8_V', text: 'A8. Bệnh viện bảo đảm an ninh, trật tự cho NVYT làm việc.' },
            { id: 'A9_V', text: 'A9. Người bệnh và người nhà có thái độ tôn trọng, hợp tác với NVYT trong quá trình điều trị.' }
        ]
    },
    {
        group: 'B. Sự hài lòng về lãnh đạo trực tiếp, đồng nghiệp',
        questions: [
            { id: 'B1_V', text: 'B1. Lãnh đạo có năng lực xử lý, điều hành, giải quyết công việc hiệu quả.' },
            { id: 'B2_V', text: 'B2. Lãnh đạo phân công công việc phù hợp với chuyên môn đào tạo của nhân viên.' },
            { id: 'B3_V', text: 'B3. Lãnh đạo quan tâm, tôn trọng, đối xử bình đẳng với các NVYT.' },
            { id: 'B4_V', text: 'B4. Lãnh đạo lắng nghe và tiếp thu ý kiến đóng góp NVYT.' },
            { id: 'B5_V', text: 'B5. Lãnh đạo động viên, khích lệ nhân viên khi hoàn thành tốt nhiệm vụ, có tiến bộ trong công việc.' },
            { id: 'B6_V', text: 'B6. Đồng nghiệp có ý thức hợp tác để hoàn thành nhiệm vụ chung.' },
            { id: 'B7_V', text: 'B7. Môi trường làm việc thân thiện, đoàn kết.' },
            { id: 'B8_V', text: 'B8. Đồng nghiệp chia sẻ kinh nghiệm, giúp đỡ nhau trong công việc.' },
            { id: 'B9_V', text: 'B9. Đồng nghiệp quan tâm, giúp đỡ nhau trong cuộc sống.' }
        ]
    },
    {
        group: 'C. Sự hài lòng về quy chế nội bộ, tiền lương, phúc lợi',
        questions: [
            { id: 'C1_V', text: 'C1. Các quy định, quy chế làm việc nội bộ của bệnh viện rõ ràng, thực tế và công khai.' },
            { id: 'C2_V', text: 'C2. Môi trường làm việc tại khoa/phòng và bệnh viện dân chủ.' },
            { id: 'C3_V', text: 'C3. Quy chế chi tiêu nội bộ công bằng, hợp lý, công khai.' },
            { id: 'C4_V', text: 'C4. Việc phân phối quỹ phúc lợi công bằng, công khai.' },
            { id: 'C5_V', text: 'C5. Mức lương tương xứng so với năng lực và cống hiến.' },
            { id: 'C6_V', text: 'C6. Chế độ phụ cấp nghề và độc hại xứng đáng so với cống hiến.' },
            { id: 'C7_V', text: 'C7. Thưởng và thu nhập tăng thêm ABC xứng đáng so với cống hiến.' },
            { id: 'C8_V', text: 'C8. Cách phân chia thu nhập tăng thêm công bằng, khuyến khích nhân viên làm việc tích cực.' },
            { id: 'C9_V', text: 'C9. Bảo đảm đóng BHXH, BHYT, khám sức khỏe định kỳ và các hình thức hỗ trợ ốm đau, thai sản đầy đủ.' },
            { id: 'C10_V', text: 'C10. Tổ chức tham quan, nghỉ dưỡng đầy đủ.' },
            { id: 'C11_V', text: 'C11. Có phong trào thể thao, văn nghệ tích cực.' },
            { id: 'C12_V', text: 'C12. Công đoàn bệnh viện hoạt động tích cực.' }
        ]
    },
    {
        group: 'D. Sự hài lòng về công việc, cơ hội học tập và thăng tiến',
        questions: [
            { id: 'D1_V', text: 'D1. Khối lượng công việc được giao phù hợp.' },
            { id: 'D2_V', text: 'D2. Công việc chuyên môn đáp ứng nguyện vọng bản thân.' },
            { id: 'D3_V', text: 'D3. Bệnh viện tạo điều kiện cho NVYT nâng cao trình độ chuyên môn.' },
            { id: 'D4_V', text: 'D4. Bệnh viện tạo điều kiện cho NVYT học tiếp các bậc cao hơn.' },
            { id: 'D5_V', text: 'D5. Công khai các tiêu chuẩn cho các chức danh lãnh đạo.' },
            { id: 'D6_V', text: 'D6. Bổ nhiệm các chức danh lãnh đạo dân chủ, công bằng.' },
            { id: 'D7_V', text: 'D7. Có cơ hội thăng tiến khi nỗ lực làm việc.' }
        ]
    },
    {
        group: 'E. Sự hài lòng chung về bệnh viện',
        questions: [
            { id: 'E1_V', text: 'E1. Cảm thấy tự hào khi được làm việc tại bệnh viện.' },
            { id: 'E2_V', text: 'E2. Đạt được những thành công cá nhân khi làm việc tại bệnh viện.' },
            { id: 'E3_V', text: 'E3. Tin tưởng vào sự phát triển của bệnh viện. trong tương lai.' },
            { id: 'E4_V', text: 'E4. Sẽ gắn bó làm việc tại khoa, phòng hiện tại lâu dài.' },
            { id: 'E5_V', text: 'E5. Sẽ gắn bó làm việc tại bệnh viện lâu dài.' },
            { id: 'E6_V', text: 'E6. Mức độ hài lòng nói chung về lãnh đạo bệnh viện.' },
            { id: 'E7_V', text: 'E7. Tự đánh giá về mức độ hoàn thành công việc tại bệnh viện.' }
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Determine dynamically generated list
    const tbody = document.getElementById('evaluation-body');

    surveyData.forEach(section => {
        // Create header row for section
        const headerRow = document.createElement('tr');
        headerRow.classList.add('group-header');

        const headerCell = document.createElement('th');
        headerCell.colSpan = 6;
        headerCell.textContent = section.group;
        headerRow.appendChild(headerCell);
        tbody.appendChild(headerRow);

        // Create rows for each question
        section.questions.forEach(q => {
            const tr = document.createElement('tr');

            // Question text cell
            const tdText = document.createElement('td');
            tdText.classList.add('col-content');
            tdText.textContent = q.text;
            tr.appendChild(tdText);

            // Dynamic radio cells
            for (let i = 1; i <= 5; i++) {
                const td = document.createElement('td');
                td.classList.add('rating-cell');
                td.addEventListener('click', function (e) {
                    if (e.target.tagName !== 'INPUT') {
                        const radio = this.querySelector('input');
                        radio.checked = true;
                    }
                });

                const input = document.createElement('input');
                input.type = 'radio';
                input.name = q.id;
                input.value = i;
                input.classList.add('rating-radio');
                input.required = true;

                td.appendChild(input);
                tr.appendChild(td);
            }

            tbody.appendChild(tr);
        });
    });

    // Handle "Other" input displays
    const otherRadios = document.querySelectorAll('input[type="radio"][value="Khác"]');
    otherRadios.forEach(radio => {
        const otherInput = radio.closest('.has-other').querySelector('.other-input');

        // Listen to all radios in same group
        const groupRadios = document.querySelectorAll(`input[name="${radio.name}"]`);
        groupRadios.forEach(groupRadio => {
            groupRadio.addEventListener('change', () => {
                if (radio.checked) {
                    otherInput.style.display = 'block';
                    otherInput.required = true;
                } else {
                    otherInput.style.display = 'none';
                    otherInput.required = false;
                    otherInput.value = ''; // clear value
                }
            });
        });
    });

    // Form Submit handling
    const form = document.getElementById('surveyForm');
    const submitBtn = document.getElementById('submitBtn');
    const msgDiv = document.getElementById('submitMessage');
    const loader = document.querySelector('.loader');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        submitBtn.disabled = true;
        loader.classList.remove('hidden');
        msgDiv.classList.add('hidden');

        // Collect form data manually to support mapping cleanly
        const formData = new FormData(form);
        const jsonData = {};

        // Helper to get radio or other value
        const getValue = (name) => {
            const val = formData.get(name);
            if (val === 'Khác') {
                return formData.get(`${name}_other`) || 'Khác';
            }
            return val;
        };

        jsonData.thong_tin = {
            A1_gioi_tinh: formData.get('gender'),
            A2_tuoi: parseInt(formData.get('age')),
            A3_chuyen_mon: getValue('profession'),
            A4_bang_cap: getValue('degree'),
            A5_nam_nganh_y: parseInt(formData.get('years_in_health')),
            A6_nam_benh_vien: parseInt(formData.get('years_in_hospital')),
            A7_vi_tri: getValue('position'),
            A8_pham_vi: getValue('department'),
            A9_kiem_nhiem: formData.get('multiple_roles'),
            A10_truc_thang: parseInt(formData.get('night_shifts'))
        };

        jsonData.danh_gia = {};
        surveyData.forEach(section => {
            section.questions.forEach(q => {
                jsonData.danh_gia[q.id] = parseInt(formData.get(q.id));
            });
        });

        jsonData.y_kien_khac = formData.get('suggestions') || "";

        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            });

            const result = await response.json();

            if (response.ok) {
                msgDiv.textContent = 'Gửi phiếu khảo sát thành công! Cảm ơn bạn.';
                msgDiv.className = 'submit-message success';
                form.reset();
                // hide all other inputs again
                document.querySelectorAll('.other-input').forEach(input => input.style.display = 'none');
            } else {
                throw new Error(result.message || 'Lỗi từ server');
            }

        } catch (error) {
            console.error('Submit error:', error);
            msgDiv.textContent = 'Có lỗi xảy ra: ' + error.message;
            msgDiv.className = 'submit-message error';
        } finally {
            submitBtn.disabled = false;
            loader.classList.add('hidden');
            msgDiv.classList.remove('hidden');
        }
    });

});
