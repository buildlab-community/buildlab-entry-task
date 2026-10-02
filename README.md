
# 🚀 BuildLab Entry Challenge

Welcome to the **BuildLab Entry Challenge**.

BuildLab is a student Software Engineering community focused on **learning together, building real projects, solving real problems, and growing as engineers**.

This challenge is part of our recruitment process.

We are not looking for people who already know everything. We are looking for students who can **learn, think, build, communicate, and take responsibility for their work**.

---

## 🎯 What This Challenge Tests

This challenge gives you a small real-world software task.

We want to see how you:

- Understand requirements
- Solve problems
- Learn independently
- Write and organize code
- Use Git and GitHub
- Use AI tools responsibly
- Test your work
- Handle feedback
- Explain your decisions
- Document your project

You are **not expected to build a production-level application**.

We are more interested in **how you approach the problem** than how many fancy features you add.

---

## ⏰ Deadline

### Saturday, 3 October 2026, 11:59 PM

**Late Pull Requests will not be reviewed.**

Your application is considered complete only when you have:

1. Submitted your project through a Pull Request.
2. Submitted the application form after opening your Pull Request.

---

# 📌 The Challenge

## Student Task Manager

Build a simple **Student Task Manager** that allows a student to manage their tasks.

The application must be built from scratch using:

- HTML
- CSS
- JavaScript

### 🚫 Do Not Use

- React
- Next.js
- Vue
- Angular
- Svelte
- Bootstrap
- Tailwind CSS
- jQuery
- Frontend frameworks
- UI libraries

The goal is to see your understanding of the fundamentals.

---

## 🧩 Required Features

### 1. Create Tasks

A user should be able to add a new task.

Each task should contain at least:

- Task title

You may add additional information if you want.

---

### 2. View Tasks

Display created tasks clearly.

Each task should show its current status.

---

### 3. Complete Tasks

Users should be able to mark a task as completed.

Users should also be able to change a completed task back to pending.

---

### 4. Delete Tasks

Users should be able to delete tasks.

---

### 5. Search Tasks

Add a search feature.

The search must be **case-insensitive**.

For example, searching for:

```text
assignment

should also find:

Assignment
ASSIGNMENT
aSsIgNmEnT


---

6. Filter Tasks

Users should be able to filter tasks by:

All

Pending

Completed



---

7. Task Summary

Display a simple summary showing:

Total tasks

Pending tasks

Completed tasks


The numbers should update when tasks change.


---

💾 Data Persistence

Your tasks must remain available after refreshing the browser.

Use:

Browser LocalStorage

You do not need:

A backend

A database

An API

Authentication

A server


This is a frontend challenge.


---

📱 Responsive Design

Your application should work properly on:

Desktop

Tablet

Mobile


The interface should remain usable on smaller screens.


---

🎨 User Interface

Your application does not need to look like a commercial product.

However, it should be:

Clean

Understandable

Easy to navigate

Properly spaced

Responsive

Consistent


Think about the person actually using the application.


---

⚠️ User Feedback & Edge Cases

Your application should handle common situations properly.

Empty Task

Do not allow a user to create a task with an empty title.

No Tasks

Show a useful empty state instead of leaving the screen blank.

No Search Results

Tell the user when their search does not match any task.

Invalid Actions

Give the user appropriate feedback when something goes wrong.


---

🤖 AI Tools Are Allowed

AI tools are allowed and encouraged.

You may use tools such as:

ChatGPT

Claude

Gemini

GitHub Copilot

Other AI coding/research tools


You may use AI for:

Learning

Research

Brainstorming

Debugging

Understanding errors

Generating code

Improving code

Writing documentation


However:

> You are responsible for the code you submit.



You must understand your implementation and be able to explain how it works.

Do not blindly copy AI-generated code and submit it without understanding it.

During the review process, you may be asked questions about your project.


---

🧑‍💻 Work Independently

You should complete the challenge independently.

This means:

Do not build the project together with another applicant.

Do not copy another applicant's implementation.

Do not submit someone else's project.


You may use:

Documentation

Search engines

AI tools

Tutorials

Learning resources


Learning how to find information and solve problems is part of the challenge.


---

🔀 Git & GitHub Workflow

This challenge is also testing whether you can work with Git and GitHub.

Follow this workflow:

Fork Repository
       ↓
Clone Repository
       ↓
Create Your Branch
       ↓
Build Your Project
       ↓
Test Your Project
       ↓
Commit Your Changes
       ↓
Push Your Branch
       ↓
Open Pull Request
       ↓
Code Review
       ↓
Make Requested Changes
       ↓
Final Review


---

🌿 Branch

Do not build your project directly on the main branch.

Create your own branch.

For example:

candidate/mansur

or:

application/mansur

Use your own name or GitHub username.


---

💬 Commits

Use meaningful commit messages.

Avoid commits like:

update
test
changes
final
asdf

Prefer messages such as:

feat: add task creation
feat: add task filtering
feat: persist tasks with localStorage
fix: prevent empty tasks
style: improve mobile layout

Your commit history does not need to be perfect.

We simply want to see that you understand the purpose of commits.


---

🔃 Pull Request

When your project is ready, open a Pull Request from your branch to the BuildLab repository.

Your Pull Request title should clearly identify you.

For example:

Entry Challenge: Your Name


---

📝 Pull Request Description

Your Pull Request description should contain the following sections:

What I Built

Briefly explain your application.

Main Features

List the main features you implemented.

Technical Approach

Explain briefly how you structured your HTML, CSS, and JavaScript.

How I Tested It

Explain what you tested.

AI Usage

Tell us:

Whether you used AI

Which AI tools you used

What you used them for


Example:

I used ChatGPT to help me understand LocalStorage
and debug a filtering issue.

Challenges

Tell us about one or two problems you encountered and how you solved them.

Known Limitations

Mention anything you know is incomplete or could be improved.


---

👀 Code Review

Opening the Pull Request is not necessarily the end.

BuildLab may review your code and leave comments or request changes.

For example, we may ask you to:

Fix a bug

Improve a function

Improve accessibility

Handle an edge case

Improve code organization

Explain a technical decision


If changes are requested, make the changes on the same branch.

Your Pull Request will automatically update.

You may be asked to explain why you made certain decisions.

This is part of the challenge.


---

🧪 Testing

Before submitting your Pull Request, test your application yourself.

At minimum, test:

Creating a task

Creating multiple tasks

Completing a task

Reopening a completed task

Deleting a task

Searching

Case-insensitive search

Filtering

Task counters

Refreshing the page

LocalStorage persistence

Empty input

No search results

Mobile layout


Don't only test the "happy path."

Try to break your own application.


---

🔐 Security & Good Practices

Even though this is a small project, follow basic good practices.

Do not commit:

Passwords

API keys

Secret tokens

Private credentials

.env files containing secrets


Do not include unnecessary sensitive information in your project.


---

✨ Optional Features

The following are optional.

You do not need them to complete the challenge.

You could add:

Task priorities

Categories

Due dates

Sorting

Dark mode

Keyboard shortcuts

Drag and drop

Statistics

Better accessibility

Custom confirmation dialogs

Edit tasks

Task descriptions


Do not sacrifice the required features just to add optional features.

> A simple, complete application is better than a complicated unfinished one.




---

📚 Documentation

Your project should contain a README.md.

It should explain:

1. What the Project Is

Briefly explain your application.

2. Features

List the features you implemented.

3. How to Run It

Explain how someone can run your project.

For example:

Open index.html in a browser.

4. How Data Is Stored

Explain how you used LocalStorage.

5. AI Usage

Explain which AI tools you used and how.

6. Known Limitations

Mention anything that could be improved.


---

📁 Suggested Project Structure

You may organize your project however you want.

For example:

student-task-manager/
│
├── index.html
├── style.css
├── script.js
└── README.md

You are not required to use this exact structure.

Choose an organization that makes sense for your project.


---

🚫 Keep the Scope Reasonable

Do not turn this into a huge application.

You do not need:

User accounts

Login

Backend

Database

Payments

APIs

Authentication

Cloud deployment

Complex architecture


The goal is to build a small, functional application properly.


---

🧠 What We Care About

We will look at more than whether the application works.

We may consider:

Did you follow the requirements?

Does the application actually work?

Is the code understandable?

Did you test your work?

Can you explain your implementation?

Did you use Git properly?

Did you document your project?

How did you handle problems?

How did you respond to code review?

Did you take responsibility for your work?


We are not expecting perfection.

We are looking for evidence of:

Problem-solving

Learning ability

Discipline

Curiosity

Communication

Technical foundation

Willingness to improve



---

✅ Final Checklist

Before submitting your Pull Request, make sure:

[ ] The application is built from scratch.

[ ] HTML, CSS, and JavaScript are used.

[ ] No prohibited frameworks or UI libraries are used.

[ ] Tasks can be created.

[ ] Tasks can be viewed.

[ ] Tasks can be completed.

[ ] Tasks can be deleted.

[ ] Tasks can be searched.

[ ] Search is case-insensitive.

[ ] Tasks can be filtered.

[ ] Task counters work.

[ ] Tasks persist after refresh.

[ ] LocalStorage is used.

[ ] Empty input is handled.

[ ] Empty states are handled.

[ ] The application is responsive.

[ ] The project has a README.

[ ] Your Git history contains meaningful commits.

[ ] You created a separate branch.

[ ] You tested your application.

[ ] You opened a Pull Request.

[ ] Your Pull Request contains the required information.

[ ] You can explain your code.

[ ] You disclosed your AI usage.



---

🚀 Final Workflow

Your complete process is:

1. Read this README
        ↓
2. Fork the repository
        ↓
3. Clone your fork
        ↓
4. Create your branch
        ↓
5. Build the Student Task Manager
        ↓
6. Test your application
        ↓
7. Commit your work
        ↓
8. Push your branch
        ↓
9. Open your Pull Request
        ↓
10. Respond to code review if requested
        ↓
11. Submit the BuildLab application form


---

🏁 Final Note

You don't need to know everything.

You need to be willing to:

Learn. Solve. Build. Test. Explain. Improve.

> Build something you can explain, not just something that runs.




---

🚀 BuildLab

Learn together. Build together. Grow together.
