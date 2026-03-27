import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [option, setOptions] = useState([]);
  const [lang1, setLang1] = useState('');
  const [lang2, setLang2] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState(''); // eslint-disable-line no-unused-vars
  const [state, setState] = useState(''); // eslint-disable-line no-unused-vars
  const [filename, setFilename] = useState('');

  const handleFile = (e) => {
    setFilename(e.target.files[0].name);
  };

  const showFile = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = (e) => {
      setInput(e.target.result);
    };
    reader.readAsText(e.target.files[0]);
  };

  useEffect(() => {
    axios.get('https://libretranslate.de/languages', {
      headers: { accept: 'application/json' },
    }).then((res) => setOptions(res.data));
  }, []);

  const translate = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append('q', input);
    params.append('source', lang1);
    params.append('target', lang2);
    params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

    axios.post('https://libretranslate.de/translate', params, {
      headers: {
        accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
      },
    }).then((res) => {
      const valo = `${res.data.translatedText}`;
      setOutput(valo);

      const dlParams = new URLSearchParams();
      dlParams.append('text', valo);
      dlParams.append('filename', filename);

      axios.post('http://localhost:9000', dlParams).catch(console.error);
      axios.get('http://localhost:9000').then((r) => setState(r));
    });
  };

  const getLangName = (code) => option.find((o) => o.code === code)?.name || code;

  return (
    <div className="App">
      {/* HEADER */}
      <header className="container-header">
        <div className="header-logo">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 8l6 6" /><path d="M4 14l6-6 2-3" /><path d="M2 5h12" />
            <path d="M7 2h1" /><path d="M22 22l-5-10-5 10" /><path d="M14 18h6" />
          </svg>
          <h2>Subtitle Translator</h2>
        </div>
        <span className="header-badge">Powered by LibreTranslate</span>
      </header>

      {/* MAIN */}
      <main className="container-content">

        {/* FILE UPLOAD */}
        <div className="container-body card">
          <p className="card-label">Step 01 — Source File</p>
          <h2>Upload your subtitle file</h2>
          <div className="file-upload-area">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="upload-text"><strong>Click to browse</strong> or drag & drop</p>
            <span className="upload-ext">.srt files only</span>
            <input
              type="file"
              name="file"
              accept=".srt"
              onChange={handleFile}
              onInput={showFile}
            />
          </div>
          {filename && (
            <div className="file-name-pill">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {filename}
            </div>
          )}
        </div>

        {/* LANGUAGE SELECTORS */}
        <div className="container-select">
          <div className="lang-block">
            <p className="card-label">Step 02 — Input Language</p>
            <h3>
              Translate from
              <span className={`lang-badge ${!lang1 ? 'empty' : ''}`}>
                {lang1 ? getLangName(lang1) : '—'}
              </span>
            </h3>
            <select
              className="styled-select"
              name="lang"
              id="lang"
              onChange={(e) => setLang1(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Select language…</option>
              {option.map((opt) => (
                <option key={opt.code} value={opt.code}>{opt.name}</option>
              ))}
            </select>
          </div>

          <div className="lang-block">
            <p className="card-label">Step 03 — Output Language</p>
            <h3>
              Translate to
              <span className={`lang-badge ${!lang2 ? 'empty' : ''}`}>
                {lang2 ? getLangName(lang2) : '—'}
              </span>
            </h3>
            <select
              className="styled-select"
              onChange={(e) => setLang2(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Select language…</option>
              {option.map((opt) => (
                <option key={opt.code} value={opt.code}>{opt.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="container-actions">
          <div className="action-info">
            <p>
              Upload an <strong>.srt file</strong>, choose your source and target languages,
              then hit <strong>Translate</strong>. Your translated subtitle file will be ready to download instantly.
            </p>
          </div>
          <div className="action-buttons">
            <button className="btn-translate" onClick={translate}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 8l6 6" /><path d="M4 14l6-6 2-3" /><path d="M2 5h12" />
                <path d="M7 2h1" /><path d="M22 22l-5-10-5 10" /><path d="M14 18h6" />
              </svg>
              Translate
            </button>
            <a href="http://localhost:9000" className="btn-download">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download
            </a>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        <span>Subtitle Translator — v1.0</span>
        <span>LibreTranslate API</span>
      </footer>
    </div>
  );
}

export default App;