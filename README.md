# Lumi public website

Public marketing site for Lumi, a mobile indoor cleanup robot in development. The site is built with Astro, TypeScript, static output, and plain CSS for deployment to GitHub Pages at `lumirobot.co`.

## Local development

First verify the repository remote:

```bash
git remote -v
git status
```

The expected origin is:

```text
git@github.com:firedonkey/lumi_web.git
```

Install dependencies and run locally:

```bash
npm install
npm run dev
npm run build
npm run preview
```

Production build:

```bash
npm run build
```

## GitHub Pages deployment

1. Verify the repository remote is `git@github.com:firedonkey/lumi_web.git`.
2. Push changes to `main`.
3. Enable GitHub Pages and select GitHub Actions as the source.
4. Add `lumirobot.co` in GitHub Pages custom-domain settings.
5. Configure Namecheap DNS afterward.
6. Enable HTTPS after GitHub verifies the custom domain.

The custom domain file is `public/CNAME` and must contain exactly:

```text
lumirobot.co
```

## Editing content

- Global site name, title, description, contact email, social links, and waitlist URL: `src/config/site.ts`
- Homepage, investors, contact, and privacy page copy: files in `src/pages/`
- Build update posts: `src/content/updates.ts`
- Shared layout and navigation: `src/layouts/BaseLayout.astro`
- Visual styling: `src/styles/global.css`

If `waitlistUrl` is empty, the site uses a prefilled `mailto:` link for “Get updates by email.” Email collection needs an external form provider or a configured email workflow before it can behave like a real waitlist.

## Prototype media needed

Add real prototype media when available:

- `public/media/lumi-prototype.jpg`
- `public/media/lumi-arm-teleop.mp4`
- `public/media/lumi-navigation-preview.mp4`

Until those files exist, the site shows illustrated fallback cards. Replace placeholder media labels and copy before launch if any media is concept-only, outdated, or not representative of the current prototype.

## Launch review

Before launch, review:

- Privacy policy if analytics, cookies, or forms are enabled.
- Contact email workflow for `hello@lumirobot.co`.
- Update post dates and prototype status language.
- All claims about autonomy, navigation, floor pickup, and end-to-end cleanup.
