# Project Guidelines

These rules are **mandatory** for all code in this repository.

---

## Stack

- React 18+
- TypeScript (strict)
- Radix UI primitives
- Tailwind CSS
- class-variance-authority (CVA)
- Lucide React
- Sonner (toasts)

❌ No class components  
❌ No legacy React patterns  

---

## Folder Structure

src/
├── components/
│   ├── ui/        # Reusable design-system components
│   ├── layout/    # Sidebar, Topbar, shells
│   └── feature/   # Feature-level components
├── hooks/
├── lib/
├── guidelines.md

Rules:

- One component per file
- `ui/` = reusable, logic-light
- Feature logic never goes into `ui/`

---

## Component Rules

- Named exports only
- Functional components only
- Props must be typed
- No unused exports

```ts
export function Button(props: ButtonProps) {}
