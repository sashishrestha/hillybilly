import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const root = document.getElementById('root')!;

// The single-file review build runs inside a sandboxed viewer, so it keeps routing in memory.
const app =
  import.meta.env.MODE === 'preview-single' ? (
    <MemoryRouter initialEntries={['/de']}>
      <App />
    </MemoryRouter>
  ) : (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

const tree = <StrictMode>{app}</StrictMode>;

// Prerendered head tags are for crawlers; React re-creates them on hydration.
document.querySelectorAll('[data-prerender]').forEach((el) => el.remove());

if (root.firstElementChild) hydrateRoot(root, tree);
else createRoot(root).render(tree);
