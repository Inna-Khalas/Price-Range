import { useEffect, useState } from 'react';
import s from './Theme.module.scss'

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <label className={s.wrap}>
      <input
        type="checkbox"
        className={s.input}
        checked={theme === 'dark'}
        onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
        aria-label="Toggle dark mode"
      />

      <span className={s.switch} aria-hidden="true">
        <span className={s.thumb} />
      </span>
    </label>
  );
}

export default ThemeToggle;
