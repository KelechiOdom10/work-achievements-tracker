# Server Task Manager

This document tracks the next backend/server tasks for AchieveLog, especially for the user module and related features. As tasks are completed, check them off and update this file as we go.

---

## Core Setup

- [x] User module basic route (GET /user/:id)
- [ ] Integrate authentication middleware for protected routes
- [ ] Error response standardization (using shared types)

## User Endpoints

- [x] Get user by ID (`GET /user/:id`)
- [ ] Create user (`POST /user`)
- [ ] Update user profile (`PATCH /user/:id`)
- [ ] Delete user (`DELETE /user/:id`)
- [ ] List users (`GET /users`)

## Achievement Endpoints

- [ ] Get achievements for user (`GET /user/:id/achievements`)
- [ ] Create achievement (`POST /user/:id/achievements`)
- [ ] Update achievement (`PATCH /achievements/:achievementId`)
- [ ] Delete achievement (`DELETE /achievements/:achievementId`)

## Goal Endpoints

- [ ] Get goals for user (`GET /user/:id/goals`)
- [ ] Create goal (`POST /user/:id/goals`)
- [ ] Update goal (`PATCH /goals/:goalId`)
- [ ] Delete goal (`DELETE /goals/:goalId`)

## Company Endpoints

- [ ] Get companies for user (`GET /user/:id/companies`)
- [ ] Add company (`POST /user/:id/companies`)
- [ ] Update company (`PATCH /companies/:companyId`)
- [ ] Delete company (`DELETE /companies/:companyId`)

## Middleware & Utilities

- [ ] Implement and test authentication middleware
- [ ] Add request validation using Zod schemas
- [ ] Add logging middleware

## OpenAPI & Docs

- [x] Configure OpenAPI docs route
- [ ] Ensure all routes are documented

---

### How to use this file

- Add new tasks as the project evolves
- Mark tasks as complete with `[x]`
- Add notes or blockers under each section as needed

_Last updated: 2025-05-11_
