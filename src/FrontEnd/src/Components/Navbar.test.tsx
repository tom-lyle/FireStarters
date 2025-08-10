import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import FSNavbar from './Navbar';

describe('FSNavbar', () => {
  it('renders navigation links and uses client-side routing', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <FSNavbar />
      </MemoryRouter>
    );

    const links = [
      { name: /firestarters/i, path: '/' },
      { name: /home/i, path: '/' },
      { name: /events/i, path: '/events' },
      { name: /contact/i, path: '/contact' },
    ];

    for (const { name, path } of links) {
      const link = screen.getByRole('link', { name });
      expect(link).toBeTruthy();
      expect(link.getAttribute('href')).toBe(path);
      await user.click(link);
      expect(window.location.pathname).toBe(path);
    }
  });
});
