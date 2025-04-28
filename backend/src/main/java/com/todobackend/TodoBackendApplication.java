package com.todobackend;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@SpringBootApplication
public class TodoBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(TodoBackendApplication.class, args);
    }
}

@RestController
@RequestMapping("/todos")
@CrossOrigin
class TodoController {

    private final TodoRepository todoRepository;
    private static final Logger logger = LoggerFactory.getLogger(TodoController.class);

    public TodoController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @GetMapping
    public List<Todo> getTodos() {
        return todoRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<String> addTodo(@RequestBody Todo todo) {
        String todoText = todo.getText();
        logger.info("Received todo: {}", todoText);

        if (todoText.length() > 140) {
            logger.warn("Rejected todo (too long): {}", todoText);
            return ResponseEntity
                    .badRequest()
                    .body("Todo must be 140 characters or less.");
        }

        todoRepository.save(todo);
        logger.info("Todo saved: {}", todoText);
        return ResponseEntity.ok("Todo added.");
    }

}

@RestController
class HealthController {
    @GetMapping("/")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Todo-App is up and running!");
    }
}
