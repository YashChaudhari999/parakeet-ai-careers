# ParakeetAI Careers Replica

A React + Vite production-ready frontend replica of the ParakeetAI hiring experience, redesigned around the UX improvements discussed in the audit.

## Included
- English / Slovenian hero language switcher
- Open roles vs future opportunities
- Expandable job cards
- Department filtering
- Salary, location, work model and profit-share metadata
- International / relocation messaging
- 3-step hiring process
- AI-native interview section
- Responsive mobile layout
- Application modal with client-side demo submission
- SEO-ready Vite HTML metadata

## Run locally

```bash
npm install
npm run dev
```

Then open the Vite URL shown in the terminal.

## Production build

```bash
npm run build
npm run preview
```

The deployable output is generated in `dist/`.

## Deployment

This is a static Vite frontend and can be deployed to Vercel, Netlify, Cloudflare Pages, GitHub Pages, or any static host.

## Important before production

The application form is intentionally a frontend demo. Before accepting real applications, connect `ApplyModal.jsx` to your ATS/backend/email service, add real privacy/terms URLs, replace placeholder team imagery with assets you are licensed to use, and verify all company claims and compensation information.
