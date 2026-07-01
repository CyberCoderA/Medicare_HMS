# CLAUDE.md

## Project Overview
- A Hospital Management System made in React and Spring Boot

## Tech Stack
- Frontend: React
- Backend: Spring Boot
- Styling: Tailwind CSS

## Frontend Development Commands
```bash
npm install         # Install dependencies
npm run dev         # Start development server
npm build           # Build for Production
npm run lint        # Run ESLint
```

## Project Structure
medicore_backend/                           # Backend Root Folder
    src/
        main/
            java/
                com/
                    heydrian/
                        medicore/
                            config/         # Config for the backend server
                            controller/     # Controller for the models and its endpoint
                            filter/         # Filters upcoming request
                            model/          # Contains entities that represent data objects from db
                            repository/     # Contains code that interfaces with the db
                            service/        # Services for the project

medicore_frontend/
    src/
        assets/                             # Contains assets
        components/                         # Contains reusable components
        pages/                              # Frontend site pages

## What to Avoid
- Do not add dependencies without checking if existing utilities cover the need

# Notes
- Continually update this file with important information