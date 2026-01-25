<div align="center">

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

# 📘 Git & GitHub – Complete Beginner Notes

</div>

These notes are based on my handwritten learning notes.  
Covers Git basics, stages, branching, merging, conflicts, stash, reset, and GitHub workflow.

## 📄 Official Git Cheat Sheet
[Git Official Cheat Sheet (PDF)](https://git-scm.com/cheat-sheet.pdf)

---

<div align="center">

## 🔹 What is Git & GitHub?



</div>

### 🔸 Git
- Git is a **version control system**
- Used to manage project code history
- Works on **local system**

### 🔸 GitHub
- GitHub is a **central / remote code repository**
- Used for:
  - **backup**
  - **collaboration**
  - **sharing code**

---

## 🔹 Git Stages (Very Important)

Git has **3 main areas:**

### Working Directory
- Where you write/edit code

### Staging Area
- Files selected for commit
- Done using `git add`

### Repository (Commit)
- Final saved checkpoint

### File Status:

| Symbol | Meaning |
|--------|---------|
| U | Untracked |
| A | Added (staged) |
| M | Modified |
| C | Committed |

---

## 🔹 Initialize Git Repo

```bash
git init
```

- Git does **not track files automatically**
- `git init` tells Git to start tracking this folder

---

## 🔹 Check Status

```bash
git status
```

Shows:
- modified files
- staged files
- untracked files

**Used before & after commit**

---

## 🔹 Add Files to Staging

```bash
git add filename
git add .
```

---

## 🔹 Commit (Checkpoint)

```bash
git commit -m "first commit"
```

**`-m` means:**
- message (commit message from command line)

**Without `-m`:**
```bash
git commit
```
- Editor opens (VS Code / Vim)

---

## 🔹 Git Log (History)

```bash
git log
git log --oneline
git log --oneline --graph
```

Shows:
- all commits
- checkpoints
- history

---

## 🔹 Global Git Config

```bash
git config --global user.name "Your Name"
git config --global user.email "email@gmail.com"
git config --global core.editor "code --wait"
git config --global core.autocrlf true
```

---

## 🔹 Delete Git Repository (Local Only)

```bash
rm -rf .git
```

⚠️ **This:**
- deletes local Git history
- does **NOT** delete GitHub repo

**(PowerShell alternative)**
```bash
Remove-Item -Recurse -Force .git
```

---

## 🔹 Branching

### What is Branch?
- Branch is a **copy of main code**
- Used to work safely without affecting main

### Create Branch
```bash
git branch branchName
```

### List Branches
```bash
git branch
```
- `*` shows current branch

### Switch Branch
```bash
git switch branchName
```

### Create & Switch
```bash
git switch -c branchName
```

---

## 🔹 Merging Branches

**Steps:**

1. Go to main branch
```bash
git switch main
```

2. Merge
```bash
git merge branchName
```

---

## 🔹 Merge Conflict

**Conflict happens when:**
- same file
- same line
- modified in both branches

### Git gives 3 choices:
1. **Incoming change**
2. **Current change**
3. **Accept both**

**Resolve conflict → add → commit**

---

## 🔹 Undo / Rollback

### Reset (Local)
```bash
git reset --soft HEAD~1
git reset --mixed HEAD~1
git reset --hard HEAD~1
```

| Type | Removes | Keeps |
|------|---------|-------|
| soft | commit | code + staging |
| mixed | commit + staging | code |
| hard | everything | nothing |

---

## 🔹 Revert (Safe for pushed code)

```bash
git revert commitID
```

---

## 🔹 Fast Forward (FF) Merge

- No extra merge commit
- HEAD just moves forward

---

## 🔹 Delete Branch

```bash
git branch -d branchName
```

---

## 🔹 Stashing

**Used when:**
- work is incomplete
- don't want to commit
- want to switch branch

```bash
git stash
```

**Apply back:**
```bash
git stash apply
```

**Delete stash:**
```bash
git stash clear
```

---

## 🔹 GitHub Workflow (Main Steps)

### Step 1: Local Setup
```bash
git init
git add .
git commit -m "message"
git branch -M main
```

### Step 2: Connect Remote
```bash
git remote add origin <repo-link>
```

### Step 3: Push
```bash
git push -u origin main
```

**`-u` means:**
- set upstream (remember branch mapping)

**After this:**
```bash
git push
git pull
```
- works without extra arguments

---

## 🔹 Collaboration Flow

### Person 1
- Create repo
- Add collaborator
- Push main branch

### Person 2
```bash
git clone <link>
git switch -c feature
git add .
git commit -m "changes"
git push -u origin feature
```

### Person 1
```bash
git fetch
git merge feature
```

---

## 🔹 Fetch vs Pull

| Command | Meaning |
|---------|---------|
| `git fetch` | download changes |
| `git pull` | fetch + merge |

---

## 🔹 .gitignore

**Used to ignore files:**
- node_modules
- .env
- build files

**Example:**
```
node_modules
.env
dist
```

---

<div align="center">

## 📚 Extra Resources

[![Company Projects](https://img.shields.io/badge/Company_Projects-View_List-blue?style=for-the-badge&logo=github)](https://github.com/nishant-Tiwari24/company-wise-projects)

[![Git Interview Questions](https://img.shields.io/badge/Git_Interview-Questions-orange?style=for-the-badge&logo=git)](https://www.interviewbit.com/git-interview-questions/)

---
sasdasd
</div>