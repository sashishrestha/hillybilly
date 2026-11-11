import type { L } from '@/lib/i18n';

/**
 * PUBLIC DATES — where people can find a truck.
 * Add confirmed dates only. Past dates are hidden automatically.
 * Example:
 * { date: '2026-12-05', time: '11:00–20:00', concept: 'momolaya',
 *   place: { de: 'Weihnachtsmarkt', en: 'Christmas market' }, city: 'Stuttgart' },
 */
export type PublicDate = {
  date: string; // YYYY-MM-DD
  endDate?: string;
  time?: string;
  concept: string; // concept slug
  place: L;
  city: string;
  mapUrl?: string;
};

export const publicDates: PublicDate[] = [];

export const upcomingDates = () => {
  const today = new Date().toISOString().slice(0, 10);
  return publicDates
    .filter((d) => (d.endDate ?? d.date) >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
};
