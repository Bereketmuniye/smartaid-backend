# SmartAid NGO Project & Budget Management System

A scalable RESTful API for managing NGO projects, budgets, expenses, and compliance.

## Setup
1. Clone repo: `git clone <repo> && cd smartaid-ngo-system`
2. Install deps: `npm install`
3. Copy `.env.example` to `.env` and configure.
4. Start MongoDB (local or Atlas).
5. Run: `npm run dev`

## API Endpoints
- Users: POST /api/users/register, POST /api/users/login
- Projects: GET/POST /api/projects
- See docs/api.md for full list.

## Testing
`npm test`

## Structure
See folder layout above.