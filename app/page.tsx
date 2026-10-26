"use client";

import { useMemo, useState } from "react";

function safeUrl(raw: string): URL | null {
  try {
    const u = new URL(raw.trim());
    if (!["http:", "https:"].includes(u.protocol)) return null;
    return u;
  } catch { return null; }
}

function isFacebookHost(host: string) {
  return host === "fb.watch" || host.endsWith(".fb.watch") ||
    host === "facebook.com" || host.endsWith(".facebook.com");
}

function isDirectVideo(raw: string) {
  const u = safeUrl(raw);
  return !!u && /\.(mp4|webm|mov|m4v)$/i.test(u.pathname);
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [notice, setNotice] = useState("");

  const parsed = useMemo(() => safeUrl(submitted), [submitted]);
  const facebook = !!parsed && isFacebookHost(parsed.hostname.toLowerCase());
  const direct = !!parsed && isDirectVideo(submitted);
  const embedUrl = facebook
    ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(submitted)}&show_text=0&width=500`
    : "";

  function handleCheck() {
    const clean = url.trim();
    const u = safeUrl(clean);
    if (!u) {
      setNotice("একটি সঠিক https:// বা http:// লিংক দিন।");
      setSubmitted("");
      return;
    }
    if (!isFacebookHost(u.hostname.toLowerCase()) && !isDirectVideo(clean)) {
      setNotice("এটি Facebook ভিডিও লিংক বা সরাসরি ভিডিও ফাইলের লিংক বলে মনে হচ্ছে না।");
      setSubmitted("");
      return;
    }
    setSubmitted(clean);
    setNotice("");
  }

  return (
    <main className="page">
      <header className="topbar">
        <a className="brand" href="/"><span className="brandIcon">f</span><span>FB Video <b>Helper</b></span></a>
        <span className="tag">PUBLIC VIDEO PREVIEW</span>
      </header>

      <section className="hero">
        <div className="eyebrow"><span className="dot" /> SIMPLE • FAST • MOBILE READY</div>
        <h1>Video link <span>helper</span></h1>
        <p className="subtitle">Paste a Facebook video link to try the official embed preview, or use a direct video-file URL.</p>

        <div className="card">
          <label htmlFor="videoUrl">Facebook video or direct file URL</label>
          <div className="inputWrap">
            <span className="linkIcon" aria-hidden="true">↗</span>
            <input id="videoUrl" type="url" inputMode="url" placeholder="https://www.facebook.com/..." value={url}
              onChange={e => { setUrl(e.target.value); setNotice(""); }}
              onKeyDown={e => { if (e.key === "Enter") handleCheck(); }} />
            {url && <button className="clear" onClick={() => { setUrl(""); setSubmitted(""); setNotice(""); }} aria-label="Clear URL">×</button>}
          </div>
          <button className="primary" onClick={handleCheck}><span>⌕</span> Preview video</button>

          {notice && <div className="notice" role="status">{notice}</div>}

          {submitted && facebook && (
            <div className="previewBlock">
              <h2>Video preview</h2>
              <div className="frameWrap">
                <iframe src={embedUrl} title="Facebook public video preview" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen />
              </div>
              <a className="primary openFacebook" href={submitted} target="_blank" rel="noreferrer">Open on Facebook ↗</a>
              <div className="notice">যদি প্রিভিউ না আসে, ভিডিওটি Public নাও হতে পারে বা Facebook embed অনুমতি বন্ধ থাকতে পারে। এই পেজ Facebook পোস্ট থেকে সরাসরি ভিডিও ফাইল বের করে না।</div>
              <p className="smallNote">ডাউনলোডের জন্য ভিডিওর মালিকের অনুমতি ও Facebook-এর অনুমোদিত/উপলভ্য ডাউনলোড পদ্ধতি ব্যবহার করুন।</p>
            </div>
          )}

          {submitted && direct && (
            <div className="previewBlock">
              <h2>Video preview</h2>
              <video className="videoPlayer" controls playsInline src={submitted}>Your browser does not support video playback.</video>
              <div className="actions">
                <a className="secondary" href={submitted} target="_blank" rel="noreferrer">▶ Open video</a>
                <a className="primary download" href={submitted} download>↓ Download file</a>
              </div>
              <p className="smallNote">ডাউনলোড অপশনটি হোস্টিং সাইটের নিয়ম ও ব্রাউজারের সাপোর্টের ওপর নির্ভর করে।</p>
            </div>
          )}
          <p className="smallNote">Never enter your Facebook password or session cookies into a downloader website.</p>
        </div>

        <div className="featureGrid">
          <div className="feature"><span className="featureIcon">📱</span><div><b>Mobile ready</b><p>Made for Android and small screens.</p></div></div>
          <div className="feature"><span className="featureIcon">🔒</span><div><b>Privacy first</b><p>No Facebook password or session cookies requested.</p></div></div>
          <div className="feature"><span className="featureIcon">🎬</span><div><b>Preview first</b><p>Try Facebook's public video embed or direct video playback.</p></div></div>
        </div>
      </section>

      <section className="info">
        <h2>Important limitations</h2>
        <p>Facebook post links are not direct video-file links. The preview uses Facebook's official embed player and may only work for public videos that allow embedding. This website does not scrape Facebook or bypass private-group access controls. Facebook Login alone does not grant download permission. Use official download/export options for videos you own, or ask the owner for the original file.</p>
      </section>
      <footer>© {new Date().getFullYear()} FB Video Helper <span>For videos you own or are authorized to save.</span></footer>
    </main>
  );
}
