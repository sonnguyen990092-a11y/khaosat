FROM ghcr.io/puppeteer/puppeteer:22.6.0

USER root

# Bật port 3000
EXPOSE 3000

# Tạo thư mục và cấp quyền
WORKDIR /usr/src/app

# Cài đặt thư viện Nodejs
COPY package*.json ./
RUN npm install

# Copy toàn bộ file hệ thống vào
COPY . .
RUN mkdir -p DAKHAOSAT && chmod -R 777 DAKHAOSAT public

# Trả lại quyền cho người dùng bảo mật của image
USER pptruser

# Lệnh chạy
CMD ["npm", "start"]
