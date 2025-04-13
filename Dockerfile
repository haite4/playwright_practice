FROM mcr.microsoft.com/playwright:v1.51.1-noble

# Установка дополнительных пакетов
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    curl \
    wget \
    tzdata \
    openjdk11-jre-headless \
    && rm -rf /var/lib/apt/lists/*

# Установка Allure 2.24.0 (новая версия для совместимости с allure-playwright)
RUN curl -o allure-2.24.0.tgz -Ls https://repo.maven.apache.org/maven2/io/qameta/allure/allure-commandline/2.24.0/allure-commandline-2.24.0.tgz && \
    tar -zxvf allure-2.24.0.tgz -C /opt/ && \
    ln -s /opt/allure-2.24.0/bin/allure /usr/bin/allure && \
    rm allure-2.24.0.tgz

# Установка TypeScript
RUN npm install -g typescript ts-node

WORKDIR /usr/workspace

# Предустановка allure-playwright для корректной работы с отчетами
RUN echo '{"dependencies":{"allure-playwright":"2.4.0"}}' > /tmp/package.json && \
    npm install -g allure-playwright@2.4.0

# Команда по умолчанию
CMD ["npx", "playwright", "test"]