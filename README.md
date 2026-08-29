# Expense Splitter

A full-stack web app for splitting shared expenses within a group — like a simplified Splitwise. Built to practice and demonstrate core full-stack fundamentals: relational database design, a REST-style PHP API, and a React frontend.

## What it does

Users can register, log in, create groups, add members to those groups, and log shared expenses. When an expense is added, it's automatically split equally among the selected group members. The app then calculates each member's **net balance** — how much they're owed or how much they owe — by comparing what they've paid against what they owe across all expenses in the group.

## Tech stack

- **Frontend:** React (Vite)
- **Backend:** PHP (mysqli, prepared statements)
- **Database:** MySQL

## Features

- **User authentication** — registration with hashed passwords (`password_hash`/`password_verify`), login with PHP sessions
- **Groups** — create a group, automatically added as the first member; add additional members
- **Expenses** — log an expense (amount, description, who paid) and split it equally among selected members
- **Balance calculation** — for each group member, calculates `total paid − total owed` using SQL aggregation (`SUM`, `GROUP BY`) and a `JOIN` across the expenses and expense_splits tables

## How the balance calculation works

This is the core logic of the project. For a given group:

1. **Total paid per person** — sums the `amount` column in `expenses`, grouped by `paid_by`:
   ```sql
   SELECT paid_by, SUM(amount) AS total_paid
   FROM expenses
   WHERE group_id = ?
   GROUP BY paid_by
   ```

2. **Total owed per person** — sums `share_amount` in `expense_splits`, joined against `expenses` (since `expense_splits` doesn't store `group_id` directly):
   ```sql
   SELECT expense_splits.user_id, SUM(expense_splits.share_amount) AS total_owed
   FROM expense_splits
   JOIN expenses ON expense_splits.expense_id = expenses.id
   WHERE expenses.group_id = ?
   GROUP BY expense_splits.user_id
   ```

3. **Net balance** — for each person, `balance = total_paid − total_owed`. A positive balance means they're owed money; a negative balance means they owe money. Balances across a group always net to zero.

## Database schema

Five tables:

- `users` — id, name, email, password (hashed), created_at
- `groups` — id, name, created_by, created_at
- `group_members` — join table linking users to groups (many-to-many)
- `expenses` — id, group_id, paid_by, amount, description, created_at
- `expense_splits` — id, expense_id, user_id, share_amount

`expenses` and `expense_splits` are separate tables so that one expense can be split among multiple people, each owing a (currently equal) share — this design also leaves room for unequal splits in the future without changing the schema.

## API endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register.php` | Create a new user (hashes password) |
| POST | `/login.php` | Verify credentials, start a session |
| POST | `/logout.php` | Destroy the session |
| GET | `/check_session.php` | Check if a session is active |
| POST | `/create_group.php` | Create a group, add creator as first member |
| POST | `/add_member.php` | Add a user to an existing group |
| POST | `/add_expense.php` | Add an expense, split equally among selected members |
| GET | `/get_balances.php?group_id=` | Get each member's net balance for a group |

## Setup / installation

**Backend**
1. Install [XAMPP](https://www.apachefriends.org/) (or any Apache + PHP + MySQL stack)
2. Copy the `expense-splitter-api` folder into your `htdocs` directory
3. Create a MySQL database called `expense_splitter` and run the schema (see `schema.sql`)
4. Start Apache and MySQL

**Frontend**
```bash
cd expense-splitter-frontend
npm install
npm run dev
```
The app will run at `http://localhost:5173`.

## Known limitations / next steps

- Expenses currently split equally only — no custom/unequal split support yet
- No transaction-minimizing settlement algorithm (shows net balances, not simplified "who pays whom" suggestions)
- Logged-in user's id isn't yet wired through to every form (some ids are entered manually) — a natural next step alongside proper route protection
- Basic styling; no responsive/mobile layout yet

## What I learned

This project was built while learning full-stack development, with AI assistance used heavily as a learning tool — for explaining concepts, reviewing code, and debugging. Every line was written and understood by me, and I can explain the reasoning behind the schema design, the authentication flow, and especially the balance calculation logic.
