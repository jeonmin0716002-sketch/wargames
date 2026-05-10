FROM node:18-alpine

WORKDIR /app

# 플래그 설치 (루트 소유, 읽기 전용)
ARG FLAG=DH{fakeflag}
RUN echo "$FLAG" > /flag.txt && \
    chmod 444 /flag.txt

COPY package.json .
RUN npm install --omit=dev

COPY . .

# public 폴더는 정적 파일 서빙용 (exploit 결과물 저장 경로)
RUN mkdir -p public

EXPOSE 3000

CMD ["node", "app.js"]
