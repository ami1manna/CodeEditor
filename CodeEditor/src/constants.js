export const LANGUAGES_VERSIONS = {
    javascript: "18.15.0",
    typescript: "5.0.3",
    java: "15.0.2",
    csharp: "6.12.0",
    php: "8.2.3",
};
export const CODE_SNIPPETS = {
    javascript: `function greet(name) {
    console.log("Hello, " + name + "!");
}

greet("World");`,
    typescript: `type Params = {
    name: string;
}

function greet(data: Params) {
    console.log("Hello, " + data.name + "!");
}

greet({ name: "World" });`,
    python: `def greet(name):
    print("Hello, " + name + "!")
    
greet("World")`,
    java: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
    csharp: `using System;

namespace HelloWorld {
    class Hello {
        static void Main(string[] args) {
            Console.WriteLine("Hello World in C#");
        }
    }
}`,
    php: `<?php

$name = 'World';
echo $name;
`,
};
