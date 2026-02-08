# User Management CRUD Application

A simple user management system built with React, TypeScript, and Material-UI. This application allows administrators to create, read, update, and delete user records with proper form validation.

## Tech Stack

- **React 19** with TypeScript
- **Material-UI (MUI)** - UI component library with custom theme
- **React Query (TanStack Query)** - Server state management
- **React Hook Form** + **Zod** - Form validation
- **MSW (Mock Service Worker)** - API mocking for development
- **Jest** + **React Testing Library** - Testing
- **Vite** - Build tool

## Features

### Implemented User Stories

- **US-1**: Create a new user with validation
  - Last name is required (2-50 characters)
  - First name is optional
  - Date of birth cannot be in the future
- **US-2**: List all available users in a table

- **US-4**: Edit/Update existing users (PUT)

- **US-5**: Delete users (DELETE)

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn or npm

### Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Run tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage
```

The application will be available at `http://localhost:5173`

## Testing Strategy

### Current Approach: Unit Tests

### Coverage Reports

To generate and view test coverage:

```bash
# Generate coverage report
yarn test:coverage

# Open HTML report in browser
open coverage/lcov-report/index.html    # macOS
start coverage/lcov-report/index.html   # Windows
xdg-open coverage/lcov-report/index.html # Linux
```

The coverage report will be generated in the `coverage/` directory

### Future: Integration Tests

For production applications or more complex flows, integration tests with MSW could be added:

**Would test:**

- UI → React Query → MSW → Mock Database (end-to-end flows)
- API error handling and retry logic
- Complex state transitions

**Decision:** Unit tests chosen for pragmatism - they provide sufficient coverage for this scope while being faster to implement and maintain.

## Design Decisions

### Architecture

- **Feature-based structure** - User management is self-contained in `/features`
- **Absolute imports** - Using `@/` prefix for cleaner imports
- **React Query** - Separates server state from client state
- **Custom hooks** - Business logic extracted from components

### Form Handling with React Hook Form and Zod for validation

**Why React Hook Form:**

- **Performance** - Uncontrolled components minimize re-renders
- **Built-in validation** - Integrates seamlessly with Zod schemas
- **Less boilerplate** - Simple `register()` API vs manual onChange handlers
- **Form state management** - Handles dirty fields, touched, errors automatically
- **Developer experience** - TypeScript support with type-safe form data

### Optimistic Updates - NOT implemented but worth to consider - beter UX

**Where to consider optimistic updates:**

- **DELETE operations** - instant removal (implemented)
- **Simple PUT/PATCH** - instant field updates (e.g. toggle checkboxes, star ratings)
- **POST for non-critical data** - instant addition to lists

## Available Scripts

```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn preview      # Preview production build
yarn test         # Run tests once
yarn test:watch   # Run tests in watch mode
yarn test:coverage # Generate coverage report
yarn lint         # Run ESLint
```

**Focus areas:** Clean code, proper validation, component structure, testing basics
