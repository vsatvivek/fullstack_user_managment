Fullstack PostgreSQL starter app (React + Node/Express + PostgreSQL)

How to run:

1. Create database (using psql or pgAdmin):
   - CREATE DATABASE fullstack_db;

2. Apply schema:
   - psql -U your_pg_user -d fullstack_db -f database.sql
   - psql -U your_pg_user -d fullstack_db -f seed.sql

3. Backend:
   - cd server
   - cp .env.example .env and fill credentials
   - npm install
   - npm run dev

4. Frontend:
   - cd client
   - npm install
   - npm run dev

Seed admin credentials: admin@demo.com / admin123