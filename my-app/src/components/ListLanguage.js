const LIST_LANGUAGE = [
    {
        codeName: "cpp",
        name: "C++",
        source: `
#include <iostream>
using namespace std;
int main() {
  int a;
  cin >> a;
  cout << "Hello " << a;
  return 0;
}`
    },
    {
        codeName: "c",
        name: "C",
        source: `
#include <stdio.h>
int main() {
  int a;
  scanf("%d", &a);
  printf("Hello %d", a);
  return 0;
}`
    },
    {
        codeName: "python",
        name: "Python",
        source: `
a = int(input())
print("Hello", a)`
    },
    {
        codeName: "java",
        name: "Java",
        source: `
import java.util.Scanner;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int a = sc.nextInt();
    System.out.println("Hello " + a);
  }
}`
    },
    {
        codeName: "javascript",
        name: "JavaScript",
        source: `
const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim();
console.log("Hello " + input);`
    },
    {
        codeName: "typescript",
        name: "TypeScript",
        source: `
import fs from "fs";
const input = fs.readFileSync(0, "utf-8").trim();
console.log("Hello " + input);`
    },
    {
        codeName: "go",
        name: "Go",
        source: `
package main
import "fmt"
func main() {
  var a int
  fmt.Scan(&a)
  fmt.Println("Hello", a)
}`
    },
    {
        codeName: "rust",
        name: "Rust",
        source: `
use std::io;
fn main() {
  let mut input = String::new();
  io::stdin().read_line(&mut input).unwrap();
  println!("Hello {}", input.trim());
}`
    },
    {
        codeName: "csharp",
        name: "C#",
        source: `
using System;
class Program {
  static void Main() {
    int a = int.Parse(Console.ReadLine());
    Console.WriteLine("Hello " + a);
  }
}`
    },
    {
        codeName: "ruby",
        name: "Ruby",
        source: `
a = gets.to_i
puts "Hello #{a}"`
    },
    {
        codeName: "php",
        name: "PHP",
        source: `
<?php
$a = intval(trim(fgets(STDIN)));
echo "Hello $a";
?>`
    },
    {
        codeName: "swift",
        name: "Swift",
        source: `
import Foundation
if let input = readLine(), let a = Int(input) {
  print("Hello \\(a)")
}`
    },
    {
        codeName: "sql",
        name: "SQL (SQLite)",
        source: `
-- Tạo bảng và chèn dữ liệu mẫu
CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);
INSERT INTO users (name) VALUES ('Alice'), ('Bob'), ('Charlie');

-- Lấy toàn bộ dữ liệu
SELECT * FROM users;`
    }
]
export default LIST_LANGUAGE


