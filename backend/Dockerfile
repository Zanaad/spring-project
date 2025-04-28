FROM openjdk:17-jdk-slim
LABEL authors="Zanaad"
WORKDIR /app
COPY target/ToDoBackend-0.0.1-SNAPSHOT.jar todo-backend.jar
EXPOSE 8082
CMD ["java","-jar","todo-backend.jar"]


