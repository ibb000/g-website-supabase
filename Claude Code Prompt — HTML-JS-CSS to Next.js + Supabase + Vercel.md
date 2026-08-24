You are working on an existing project built with **HTML, CSS, and vanilla JavaScript**.

Your task is to **fully migrate/rebuild this project into a production-ready Next.js application** using:

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Flowbite / Flowbite React only when it genuinely improves the UI**
- **Supabase** for database, authentication, storage, and backend functionality where needed
- **Vercel** as the deployment platform

The final application must be designed specifically for deployment on **Vercel**.

## 1. First: Analyze the Existing Project

Before changing anything:

1. Inspect the entire existing project.
2. Identify:
   - All HTML pages
   - JavaScript files and functionality
   - CSS files
   - Images/assets/icons/fonts
   - Forms
   - API calls
   - LocalStorage/sessionStorage usage
   - Authentication logic
   - CRUD operations
   - Any mock/static data
   - Navigation/routing
   - Modals, dropdowns, tabs, tables, filters, search, pagination, etc.
3. Understand how the existing application works.
4. Do NOT start rewriting blindly.
5. Create a concise migration plan internally before implementing it.

The existing application is the source of truth for the **UI, UX, business logic, and functionality**.

## 2. Migration Requirements

Convert the project into a clean Next.js architecture.

Use:

```text
Next.js
React
TypeScript
Tailwind CSS
Supabase
Vercel
```

Use the **App Router**.

Prefer Server Components by default and use `"use client"` only where client-side interactivity is required.

Create a sensible structure such as:

```text
app/
  layout.tsx
  page.tsx
  (auth)/
  dashboard/
  api/

components/
  ui/
  layout/
  forms/
  tables/

lib/
  supabase/
  utils/

hooks/
types/
public/
```

Adjust the structure according to the actual project rather than blindly following this example.

## 3. Preserve the Existing UI

This is extremely important.

Do NOT redesign the application unless necessary.

The migrated Next.js version should visually match the existing HTML/CSS/JS application as closely as possible.

Preserve:

- Layout
- Spacing
- Typography
- Colors
- Buttons
- Cards
- Tables
- Forms
- Navigation
- Responsive behavior
- Modals
- Dropdowns
- Icons
- Images
- Animations
- Hover states
- Loading states
- Empty states
- Error states

Replace the old CSS with Tailwind CSS where practical.

Do not create unnecessary custom CSS when the same result can be achieved cleanly with Tailwind.

If existing custom CSS is complex and cannot reasonably be converted, keep a minimal amount of custom CSS rather than breaking the design.

## 4. Tailwind CSS

Use Tailwind CSS as the primary styling system.

Convert existing styles into reusable Tailwind classes.

Avoid excessive repetition by creating reusable React components where appropriate.

Do not introduce another CSS framework.

## 5. Flowbite

Use Flowbite / Flowbite React only when it provides useful components such as:

- Modals
- Dropdowns
- Tooltips
- Alerts
- Tabs
- Pagination
- Date pickers
- Form components
- Navigation components

Do NOT force Flowbite into every component.

If an existing component is easier or more accurate to reproduce directly with Tailwind, use Tailwind.

## 6. Supabase

Replace any existing mock/local-only backend functionality with Supabase where appropriate.

Use Supabase for:

- PostgreSQL database
- Authentication
- User management
- Row Level Security
- Storage
- Realtime functionality if required

Create a proper Supabase integration.

Use environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Never hardcode Supabase credentials.

Never expose the Supabase service-role key to the browser.

If server-side privileged operations are required, use a secure server-only environment variable.

## 7. Database Design

Analyze the existing application and determine what data needs to be persisted.

Create an appropriate Supabase/PostgreSQL schema.

For example:

```text
users
profiles
...
```

Do NOT create unnecessary tables.

Use proper:

- Primary keys
- Foreign keys
- Indexes
- Constraints
- Timestamps
- Relationships

Create Supabase migration SQL files so the database can be reproduced.

If authentication is required, integrate Supabase Auth properly rather than creating a custom insecure authentication system.

## 8. Authentication

If the existing project has authentication:

Migrate it to **Supabase Auth**.

Implement:

- Login
- Logout
- Session persistence
- Protected routes
- User session handling
- Authentication errors
- Loading states

Use the recommended Supabase SSR approach for Next.js.

Do not store passwords manually.

Do not implement insecure authentication using LocalStorage.

If roles/permissions exist in the original project, preserve them.

For example:

```text
admin
manager
user
```

Implement authorization using Supabase database rules/RLS and server-side checks where appropriate.

Do not rely only on frontend checks for security.

## 9. Data Fetching

Replace static/mock data and old API logic with proper Supabase queries.

Use server-side data fetching when appropriate.

Use client-side fetching only when interactivity requires it.

Avoid unnecessary API routes if the functionality can safely be handled directly through Supabase.

However, use Next.js Route Handlers when server-side logic or protected operations require them.

## 10. Existing JavaScript Functionality

Every meaningful feature in the existing JavaScript application must continue working after migration.

Do not simply convert HTML into JSX and leave functionality unfinished.

Specifically inspect and migrate:

- Event listeners
- Form submission
- Validation
- Search
- Filtering
- Sorting
- Pagination
- CRUD operations
- Modal behavior
- Dropdown behavior
- Tabs
- Notifications
- Authentication
- API requests
- LocalStorage logic
- Session logic
- Dynamic rendering
- URL parameters
- Navigation

Convert these into appropriate React patterns:

- State
- Props
- Hooks
- Server Components
- Client Components
- Server Actions where appropriate

## 11. Assets

Move existing assets into:

```text
public/
```

Preserve the existing assets whenever possible.

Use Next.js `Image` where appropriate.

Do not replace existing assets with placeholders unless absolutely necessary.

## 12. Routing

Convert existing HTML pages into Next.js routes.

Example:

```text
index.html
→ app/page.tsx

about.html
→ app/about/page.tsx

dashboard.html
→ app/dashboard/page.tsx
```

Use Next.js navigation:

```tsx
<Link />
```

and:

```tsx
useRouter()
```

where appropriate.

Do not use traditional full-page HTML navigation.

## 13. Responsive Design

The final application must work properly on:

- Desktop
- Laptop
- Tablet
- Mobile

Preserve the responsive behavior of the original application and improve it only when necessary.

## 14. Environment Variables

Create:

```text
.env.example
```

containing all required variables without real secrets.

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Make sure `.env.local` is ignored by Git.

Never commit secrets.

## 15. Vercel Compatibility

The application MUST be deployable directly to Vercel.

Avoid:

- Express servers
- Custom Node servers
- Long-running processes
- Filesystem persistence
- Local database dependencies
- Wrangler
- Cloudflare-specific APIs
- Server configurations that require a traditional VPS

If the original project contains Wrangler, Cloudflare Workers, or other platform-specific infrastructure, remove it unless there is a genuine reason it is required.

The target architecture is:

```text
Browser
   ↓
Next.js on Vercel
   ↓
Supabase
   ├── PostgreSQL
   ├── Auth
   ├── Storage
   └── Realtime (if required)
```

## 16. Performance

Follow Next.js best practices.

Use:

- Server Components where possible
- Dynamic imports where useful
- Optimized images
- Proper metadata
- Minimal client-side JavaScript
- Efficient database queries
- Proper indexes
- Pagination for large datasets

Avoid unnecessary dependencies.

## 17. SEO

For public pages, implement appropriate Next.js metadata:

- Title
- Description
- Open Graph metadata where appropriate

Do not prioritize SEO for private dashboard pages unless relevant.

## 18. Error Handling

Implement proper:

- Loading states
- Error states
- Empty states
- Form validation
- Database error handling
- Authentication errors

Do not leave uncaught console errors.

## 19. TypeScript

Use TypeScript throughout the migrated application.

Do not use:

```ts
any
```

unless there is a legitimate unavoidable reason.

Create proper types/interfaces for database records and application data.

Generate/use Supabase database types where practical.

## 20. Cleanup

After migration:

Remove obsolete:

- HTML files
- Vanilla JS files
- Old CSS files
- Unused dependencies
- Duplicate assets
- Old routing logic
- Old authentication logic
- Wrangler/Cloudflare configuration if present
- Unused configuration files

Do not delete anything before confirming it is no longer required.

## 21. Package Management

Use the existing package manager if the project already has one.

Otherwise use npm.

Make sure:

```bash
npm install
npm run dev
npm run build
npm run start
```

work correctly.

## 22. Quality Checks

After implementation, run:

```bash
npm run build
```

and fix ALL build errors.

Also check for:

- TypeScript errors
- ESLint errors
- Broken routes
- Missing imports
- Missing assets
- Hydration errors
- Supabase errors
- Console errors
- Broken responsive layouts

Do not consider the migration complete while the production build is failing.

## 23. Important Migration Rule

Do NOT simplify the project by removing functionality.

If the existing project has a feature, preserve it unless it is obsolete or technically incompatible.

If something cannot be migrated exactly, choose the closest production-ready Next.js/Supabase implementation.

Do not replace working functionality with TODO comments or placeholders.

## 24. Final Architecture

The final project should follow this general architecture:

```text
Next.js
├── App Router
├── React
├── TypeScript
├── Tailwind CSS
├── Flowbite where useful
│
├── Supabase
│   ├── PostgreSQL
│   ├── Auth
│   ├── Storage
│   ├── RLS
│   └── Realtime where required
│
└── Vercel
    └── Production deployment
```

## 25. Execution Strategy

Work in phases:

### Phase 1 — Analyze
Inspect the entire existing project and understand its functionality.

### Phase 2 — Architecture
Set up Next.js, TypeScript, Tailwind, Supabase, and the required project structure.

### Phase 3 — UI Migration
Convert the HTML pages/components into React/Next.js while preserving the existing design.

### Phase 4 — Logic Migration
Convert vanilla JavaScript functionality into React/Next.js logic.

### Phase 5 — Supabase
Implement database, authentication, storage, RLS, and required backend functionality.

### Phase 6 — Integration
Connect the UI to Supabase and replace mock/static data.

### Phase 7 — Cleanup
Remove obsolete files and dependencies.

### Phase 8 — Testing
Run the production build and fix all errors.

### Phase 9 — Vercel Readiness
Verify that the project can be deployed to Vercel using environment variables.

## Most Important Requirements

1. **Do not lose existing functionality.**
2. **Preserve the existing UI as closely as possible.**
3. **Use Next.js App Router + TypeScript.**
4. **Use Tailwind CSS as the main styling system.**
5. **Use Flowbite only when useful.**
6. **Use Supabase instead of building a traditional backend unless required.**
7. **Do not use Wrangler/Cloudflare-specific infrastructure.**
8. **Do not hardcode secrets.**
9. **Make authentication and authorization secure.**
10. **The final project must successfully build with `npm run build`.**
11. **The final project must be Vercel-compatible.**
12. **Do not stop at a partial migration.**

Start by inspecting the existing project and understanding its architecture and functionality. Then implement the migration systematically.