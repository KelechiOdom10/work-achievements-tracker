# AchieveLog Product Requirements Document (PRD)

## Overview

AchieveLog is a personal achievement tracking application designed for professionals to document, organize, and leverage their work accomplishments throughout their careers. The app provides real-time features for a seamless user experience as users progress in their careers.

## Target User

Individual professionals who want to:

- Track personal work achievements
- Maintain a continuous record across job changes
- Easily reference past accomplishments for performance reviews
- Analyze growth patterns across their career
- Set and track progress toward career goals
- Mark significant career milestones

## Core Features

- **Achievement Logging:** Users can create, edit, and delete achievement entries, attaching metadata like date, company, and description.
- **Goal Setting & Tracking:** Users can set career goals, associate achievements with goals, and track progress.
- **Milestone Management:** Mark and view significant career milestones.
- **Company & Role History:** Maintain a timeline of companies and roles for context.
- **Real-Time Collaboration:** (Future) Share achievements or collaborate with mentors/coaches.
- **Analytics & Insights:** Visualize growth, goal completion, and historical trends.
- **Secure Account Management:** Authentication, session management, and privacy controls.

## Data Model (from Prisma Schema)

### User

- id, name, email, emailVerified, image, createdAt, updatedAt
- Relations: accounts, sessions, companies, achievements, goals

### Achievement

- id, userId, companyId, title, description, date, tags, createdAt, updatedAt
- Relations: user, company

### Company

- id, name, industry, description, createdAt, updatedAt
- Relations: users, achievements

### Goal

- id, userId, title, description, status, targetDate, createdAt, updatedAt
- Relations: user

### Session & Account

- Standard authentication/session management

## User Flows

1. **Onboarding:** Sign up → Add first achievement/goal/company
2. **Log Achievement:** Add new achievement → Attach to company/goal → Save
3. **Review & Analyze:** View timeline, filter by company/goal, see analytics
4. **Performance Review Prep:** Export/print/share relevant achievements
5. **Goal Progress:** Set new goal → Track progress → Mark as completed

## Success Metrics

- Number of achievements logged per user
- User retention and frequency of updates
- Number of goals set and completed
- Engagement with analytics/insights

## Future Directions

- Social/professional sharing
- Integration with LinkedIn or HR tools
- Mobile app
- Advanced analytics and AI-powered insights

---

_Last updated: 2025-05-11_
