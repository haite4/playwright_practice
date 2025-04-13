FROM mcr.microsoft.com/playwright:v1.51.1-noble

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    curl \
    wget \
    tzdata \
    openjdk-11-jre-headless \
    && rm -rf /var/lib/apt/lists/*

RUN curl -o allure-2.13.8.tgz -Ls https://repo.maven.apache.org/maven2/io/qameta/allure/allure-commandline/2.13.8/allure-commandline-2.13.8.tgz && \
    tar -zxvf allure-2.13.8.tgz -C /opt/ && \
    ln -s /opt/allure-2.13.8/bin/allure /usr/bin/allure && \
    rm allure-2.13.8.tgz

RUN npm install -g typescript ts-node

WORKDIR /usr/workspace

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install

COPY . .

CMD ["npx", "playwright", "test"]