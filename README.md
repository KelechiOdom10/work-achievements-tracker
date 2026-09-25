# Work Achievements Tracker

A private career memory for capturing meaningful work, connecting supporting
evidence, and preparing trustworthy performance-review material.

Product direction and delivery order live in:

- [`docs/product-direction.md`](docs/product-direction.md)
- [`docs/domain-model.md`](docs/domain-model.md)
- [`docs/frontend-design-brief.md`](docs/frontend-design-brief.md)
- [`docs/roadmap.md`](docs/roadmap.md)

## Local development

Install the server and frontend dependencies:

```sh
bun install
cd frontend
bun install
```

Run the API from the repository root:

```sh
bun run dev
```

Run the frontend in a second terminal:

```sh
cd frontend
bun run dev
```

Open <http://localhost:8080>. The frontend proxies `/api` requests to the API
on <http://localhost:3000>.
