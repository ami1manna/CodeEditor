export const LANGUAGES_VERSIONS = {
    javascript: "18.15.0",
    typescript: "5.0.3",
    java: "15.0.2",
    csharp: "6.12.0",
    php: "8.2.3",
};
export const CODE_SNIPPETS = {
    javascript: `// JavaScript Boilerplate with Common Patterns
class Calculator {
    constructor() {
        this.result = 0;
    }

    add(a, b) {
        this.result = a + b;
        return this.result;
    }

    subtract(a, b) {
        this.result = a - b;
        return this.result;
    }

    multiply(a, b) {
        this.result = a * b;
        return this.result;
    }

    divide(a, b) {
        if (b === 0) throw new Error("Division by zero");
        this.result = a / b;
        return this.result;
    }
}

// Example usage
const calc = new Calculator();
console.log("Addition:", calc.add(10, 5));
console.log("Subtraction:", calc.subtract(10, 5));
console.log("Multiplication:", calc.multiply(10, 5));
console.log("Division:", calc.divide(10, 5));`,
    typescript: `// TypeScript Boilerplate with Interfaces and Types
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

class UserManager {
    private users: User[] = [];

    constructor() {
        this.users = [];
    }

    addUser(user: User): void {
        this.users.push(user);
    }

    removeUser(id: number): void {
        this.users = this.users.filter(user => user.id !== id);
    }

    getUser(id: number): User | undefined {
        return this.users.find(user => user.id === id);
}

    getAllUsers(): User[] {
        return this.users;
    }
}

// Example usage
const userManager = new UserManager();
userManager.addUser({
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    age: 30
});
console.log("Users:", userManager.getAllUsers());`,
    python: `# Python Boilerplate with Class and Methods
class DataProcessor:
    def __init__(self):
        self.data = []
        self.processed_data = {}

    def add_data(self, item):
        self.data.append(item)
        return len(self.data)

    def process_data(self):
        for item in self.data:
            if isinstance(item, (int, float)):
                self.processed_data[item] = item * 2
            elif isinstance(item, str):
                self.processed_data[item] = item.upper()
        return self.processed_data

    def get_statistics(self):
        if not self.data:
            return {"count": 0, "average": 0}
        return {
            "count": len(self.data),
            "average": sum(x for x in self.data if isinstance(x, (int, float))) / len(self.data)
        }

# Example usage
processor = DataProcessor()
processor.add_data(10)
processor.add_data("hello")
processor.add_data(20)
print("Processed:", processor.process_data())
print("Stats:", processor.get_statistics())`,
    java: `// Java Boilerplate with Class and Methods
import java.util.ArrayList;
import java.util.List;

public class StudentManager {
    private List<Student> students;
    private int nextId;

    public StudentManager() {
        this.students = new ArrayList<>();
        this.nextId = 1;
    }

    public class Student {
        private int id;
        private String name;
        private double gpa;

        public Student(String name, double gpa) {
            this.id = nextId++;
            this.name = name;
            this.gpa = gpa;
        }

        public int getId() { return id; }
        public String getName() { return name; }
        public double getGpa() { return gpa; }
    }

    public void addStudent(String name, double gpa) {
        students.add(new Student(name, gpa));
    }

    public Student findStudent(int id) {
        return students.stream()
                .filter(s -> s.getId() == id)
                .findFirst()
                .orElse(null);
    }

    public double getAverageGpa() {
        return students.stream()
                .mapToDouble(Student::getGpa)
                .average()
                .orElse(0.0);
    }

    public static void main(String[] args) {
        StudentManager manager = new StudentManager();
        manager.addStudent("John Doe", 3.8);
        manager.addStudent("Jane Smith", 3.9);
        System.out.println("Average GPA: " + manager.getAverageGpa());
    }
}`,
    csharp: `// C# Boilerplate with Class and Methods
using System;
using System.Collections.Generic;
using System.Linq;

namespace CodeEditor
{
    public class TaskManager
    {
        private List<Task> tasks;
        private int nextId;

        public TaskManager()
        {
            tasks = new List<Task>();
            nextId = 1;
        }

        public class Task
        {
            public int Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public bool IsCompleted { get; set; }
            public DateTime CreatedAt { get; set; }

            public Task(string title, string description)
            {
                Id = 0; // Will be set by TaskManager
                Title = title;
                Description = description;
                IsCompleted = false;
                CreatedAt = DateTime.Now;
            }
        }

        public void AddTask(string title, string description)
        {
            var task = new Task(title, description);
            task.Id = nextId++;
            tasks.Add(task);
        }

        public Task GetTask(int id)
        {
            return tasks.FirstOrDefault(t => t.Id == id);
        }

        public void CompleteTask(int id)
        {
            var task = GetTask(id);
            if (task != null)
            {
                task.IsCompleted = true;
            }
        }

        public List<Task> GetPendingTasks()
        {
            return tasks.Where(t => !t.IsCompleted).ToList();
        }

        public static void Main(string[] args)
        {
            var manager = new TaskManager();
            manager.AddTask("Learn C#", "Study C# programming language");
            manager.AddTask("Build Project", "Create a new project using C#");
            Console.WriteLine($"Pending tasks: {manager.GetPendingTasks().Count}");
        }
    }
}`,
    php: `<?php
// PHP Boilerplate with Class and Methods
class Database {
    private $host;
    private $username;
    private $password;
    private $database;
    private $connection;

    public function __construct($host, $username, $password, $database) {
        $this->host = $host;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;
        $this->connect();
    }

    private function connect() {
        try {
            $this->connection = new PDO(
                "mysql:host={$this->host};dbname={$this->database}",
                $this->username,
                $this->password
            );
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }

    public function query($sql, $params = []) {
        try {
            $stmt = $this->connection->prepare($sql);
            $stmt->execute($params);
            return $stmt;
        } catch(PDOException $e) {
            echo "Query failed: " . $e->getMessage();
            return false;
        }
    }

    public function insert($table, $data) {
        $columns = implode(", ", array_keys($data));
        $values = implode(", ", array_fill(0, count($data), "?"));
        $sql = "INSERT INTO {$table} ({$columns}) VALUES ({$values})";
        return $this->query($sql, array_values($data));
    }

    public function select($table, $conditions = [], $columns = "*") {
        $sql = "SELECT {$columns} FROM {$table}";
        if (!empty($conditions)) {
            $where = implode(" AND ", array_map(function($key) {
                return "{$key} = ?";
            }, array_keys($conditions)));
            $sql .= " WHERE {$where}";
        }
        return $this->query($sql, array_values($conditions));
    }
}

// Example usage
$db = new Database("localhost", "user", "password", "mydb");
$db->insert("users", [
    "name" => "John Doe",
    "email" => "john@example.com"
]);
$users = $db->select("users", ["name" => "John Doe"]);
?>
`,
};
