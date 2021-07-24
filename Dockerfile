FROM openjdk:11 AS builder
COPY gradlew .
COPY gradlew gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src

FROM openjdk:11
COPY build/libs/shade-0.0.1.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app.jar"]