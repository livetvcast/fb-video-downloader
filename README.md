# FB Video Helper

A mobile-friendly Next.js starter deployed with GitHub + Vercel.

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Deploy
1. Create a GitHub repository named `fb-video-downloader`.
2. Upload these project files to the repository root.
3. Import the repository at https://vercel.com/new.
4. Keep the framework preset as Next.js and deploy.

## Important limitations
This starter supports checking/opening direct video-file URLs (for example, an authorized `.mp4` URL). It does **not** scrape Facebook posts or private groups. A Facebook post URL is not a direct media file. Facebook Login by itself does not authorize downloading every private-group video. Do not collect Facebook passwords or session cookies. Use Meta's official OAuth and APIs only for permissions and media access they explicitly support.

## Next steps for a real Meta Login integration
- Create an app in Meta for Developers.
- Configure the official Facebook Login product and valid OAuth redirect URLs.
- Keep app secrets in Vercel Environment Variables, never in frontend code.
- Request only permissions actually needed and available to your app.
