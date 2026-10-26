# FB Video Helper (v2)

## Features
- Mobile-first blue-and-white UI
- Tries Facebook's official public video embed player for public Facebook links
- Preview and open links for direct video files
- Direct-file download button when the host/browser permits it

## Deploy with GitHub + Vercel
1. Upload the contents of this folder (not the ZIP itself) to the root of a GitHub repository.
2. In Vercel, import that repository.
3. Ensure Root Directory points to the folder containing `package.json` and `app/`.
4. Deploy using the Next.js preset.

## Limits
This app does not scrape Facebook, extract private-group media, or bypass Facebook access controls. Facebook's embed preview only works when a video is public and embedding is allowed. A Facebook post URL is not a direct video file, and the browser cannot reliably download media from a Facebook post URL. Use official download/export options or the original file from the owner for videos you have permission to save. Do not collect Facebook passwords or session cookies.
