# API Documentation

## Users
- `POST /api/users/register` - Create user (body: {name, email, password, role, ngo})
- `POST /api/users/login` - Login (body: {email, password}) returns JWT
- `GET /api/users` - List users (auth required)

## NGOs
- `POST /api/ngos` - Create NGO
- `GET /api/ngos/:id` - Get NGO

## Donors
- `POST /api/donors` - Create donor
- `POST /api/projects/:projectId/donors` - Link donor to project

## Projects
- `POST /api/projects` - Create project (body: {ngo, name, ...})
- `GET /api/projects/:id` - Get project with populated data
- Sub: `/api/projects/:id/activities`, `/api/projects/:id/budgets`

## Expenses
- `POST /api/expenses` - Create expense (multipart form: fields + attachment file)

## Reports
- `POST /api/reports` - Generate/upload report

## Compliance
- `POST /api/compliance` - Create check