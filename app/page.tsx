 "use client";

import { useState } from "react";

function isDirectVideoFile(raw: string) {
  try {
    const u = new URL(raw);
    if (u.protocol !== "https:" && u.protocol !== "http:") return false;
    return /\.(mp4|webm|mov|m4v)(?:$|[?#])/i.test(u.pathname + u.search + u.hash);
  } catch {
    return false;
  }
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [direct, setDirect] = useState(false);

  function checkLink() {
    setMessage("");
    setDirect(false);
    const trimmed = url.trim();
    if (!trimmed) {
      setMessage("Please paste a video URL first.");
      return;
    }
    try {
      const parsed = new URL(trimmed);
      if (!["http:", "https:"].includes(parsed.protocol)) throw new Error();
      if (isDirectVideoFile(trimmed)) {
        setDirect(true);
        setMessage("This looks like a direct video-file link. Use the buttons below; download behavior depends on the host.");
      } else if (/facebook\.com|fb\.watch/i.test(parsed.hostname)) {
        setMessage("This is a Facebook post/video link. This demo cannot extract private Facebook videos from a post URL. Open it in Facebook, or use an official download/export option for videos you own or have permission to save.");
      } else {
        setMessage("This does not look like a direct video-file URL. Paste a direct .mp4, .webm, .mov, or .m4v file URL.");
      }
    } catch {
      setMessage("Please enter a valid http:// or https:// URL.");
    }
  }

  return (
    <main className="page">
      <header className="topbar">
        <a className="brand" href="/" aria-label="FB Video Helper home">
          <span className="brandIcon">f</span>
          <span>FB Video <b>Helper</b></span>
        </a>
        <span className="tag">MOBILE FRIENDLY</span>
      </header>

      <section className="hero">
        <div className="eyebrow"><span className="dot" /> SIMPLE • FAST • RESPONSIVE</div>
        <h1>Video link <span>downloader</span></h1>
        <p className="subtitle">A clean, simple tool for saving videos you own or are authorized to download.</p>

        <div className="card">
          <label htmlFor="videoUrl">Paste video URL</label>
          <div className="inputWrap">
            <span className="linkIcon" aria-hidden="true">↗</span>
            <input
              id="videoUrl"
              type="url"
              inputMode="url"
              placeholder="https://example.com/video.mp4"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setMessage(""); setDirect(false); }}
              onKeyDown={(e) => { if (e.key === "Enter") checkLink(); }}
            />
            {url && <button className="clear" onClick={() => { setUrl(""); setMessage(""); setDirect(false); }} aria-label="Clear URL">×</button>}
          </div>
          <button className="primary" onClick={checkLink}><span>↓</span> Check video link</button>
          {message && <div className={`notice ${direct ? "success" : ""}`} role="status">{message}</div>}
          {direct && (
            <div className="actions">
              <a className="secondary" href={url.trim()} target="_blank" rel="noreferrer">▶ Open video</a>
              <a className="primary download" href={url.trim()} download>↓ Download file</a>
            </div>
          )}
          <p className="smallNote">Tip: a Facebook post URL is not the same as a direct video-file URL.</p>
        </div>

        <div className="featureGrid">
          <div className="feature"><span className="featureIcon">📱</span><div><b>Mobile ready</b><p>Designed for Android and small screens.</p></div></div>
          <div className="feature"><span className="featureIcon">🔒</span><div><b>Privacy first</b><p>No Facebook password or session cookies requested.</p></div></div>
          <div className="feature"><span className="featureIcon">⬇️</span><div><b>Direct links</b><p>Works with direct media links when the host permits it.</p></div></div>
        </div>
      </section>

      <section className="info">
        <h2>How it works</h2>
        <ol>
          <li>Paste a direct video file URL.</li>
          <li>Tap <b>Check video link</b>.</li>
          <li>Open or download the file if the hosting website allows it.</li>
        </ol>
        <div className="warning"><b>About private Facebook groups</b><p>Facebook post links, especially private-group links, cannot reliably be converted into downloadable files by this standalone page. Facebook Login alone does not grant download access. Use Facebook’s official options or obtain the original file from its owner.</p></div>
      </section>
      <footer>© {new Date().getFullYear()} FB Video Helper <span>Built for personal, authorized use.</span></footer>
    </main>
  );
}
