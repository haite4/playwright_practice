FROM mcr.microsoft.com/playwright:v1.51.1-noble

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    curl \
    wget \
    tzdata \
    openjdk-11-jre-headless \
    && rm -rf /var/lib/apt/lists/*

RUN curl -o allure-2.24.0.tgz -Ls https://repo.maven.apache.org/maven2/io/qameta/allure/allure-commandline/2.24.0/allure-commandline-2.24.0.tgz && \
    tar -zxvf allure-2.24.0.tgz -C /opt/ && \
    ln -s /opt/allure-2.24.0/bin/allure /usr/bin/allure && \
    rm allure-2.24.0.tgz

RUN npm install -g typescript ts-node

WORKDIR /usr/workspace

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install

COPY . .

CMD ["npx", "playwright", "test"]