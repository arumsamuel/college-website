import { useState } from 'react';

// Lightweight language toggle using Google Translate's element widget.
// Falls back to a simple language selector UI that toggles the widget.
export default function Translator() {
  const [active, setActive] = useState(false);

  function toggle() {
    const next = !active;
    setActive(next);
    if (next) {
      // Google Translate widget
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
        }
      };
    }
  }

  return (
    <div id="google_translate_element" style={{ display: active ? 'block' : 'none' }} />
  );
}

export function TranslatorToggle() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button
        className="translator-toggle"
        onClick={() => setShow(s => !s)}
        aria-label="Translate page"
        title="Translate page"
      >
        🌐 Translate
      </button>
      {show && <Translator />}
    </>
  );
}
