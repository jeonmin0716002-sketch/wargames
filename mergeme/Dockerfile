FROM node:18-alpine

WORKDIR /app

ARG FLAG=DH{fakeflag}
RUN echo "$FLAG" > /flag.txt && \
    chmod 444 /flag.txt

COPY package.json .
RUN npm install --omit=dev

COPY . .

RUN mkdir -p public

EXPOSE 3000

CMD ["node", "app.js"]
