import type { L } from '@/lib/i18n';

/**
 * Customer reviews. Only publish with written permission (`permission: true`).
 * The reviews block stays hidden until at least one approved review exists.
 */
export type Testimonial = { quote: L; name: string; event: L; permission: boolean };

export const testimonials: Testimonial[] = [];

export const approvedTestimonials = () => testimonials.filter((t) => t.permission);
