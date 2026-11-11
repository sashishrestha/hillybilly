import {
  Root,
  AccordionItem as Item,
  AccordionHeader as Header,
  AccordionTrigger as Trigger,
  AccordionContent as Content,
} from '@animate-ui/react/primitives/radix-ui/accordion';
import { cn } from '@/lib/cn';

type QA = { q: string; a: string };

/** FAQ list: one card per question, numbered, with a plus that turns into a cross when open. */
export function FaqAccordion({ items }: { items: QA[]; tone?: 'light' | 'dark' }) {
  return (
    <Root type="single" collapsible className="flex w-full flex-col gap-3">
      {items.map((item, i) => (
        <Item
          key={i}
          value={`q${i}`}
          className={cn(
            'group/item overflow-hidden rounded-[var(--radius-card)] bg-navy-2 ring-1 ring-cream/10 transition-[box-shadow,background-color] duration-300',
            'hover:ring-cream/30 data-[state=open]:ring-2 data-[state=open]:ring-pink',
          )}
        >
          <Header className="flex">
            <Trigger className="group flex flex-1 items-center gap-4 px-5 py-4 text-left text-lg font-bold text-cream md:gap-5 md:px-6 md:py-5 md:text-xl">
              <span
                aria-hidden
                className="w-8 shrink-0 -rotate-3 font-brush text-3xl font-normal leading-none text-pink transition-transform duration-300 group-data-[state=open]:rotate-3 group-data-[state=open]:scale-110"
              >
                {i + 1}
              </span>
              <span className="flex-1">{item.q}</span>
              <span
                aria-hidden
                className="grid size-9 shrink-0 place-items-center rounded-full bg-mango text-navy shadow-[2px_2px_0_0_rgba(0,0,0,0.3)] transition-transform duration-300 ease-[var(--ease-spring)] group-hover:scale-110 group-data-[state=open]:rotate-45"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </Trigger>
          </Header>
          <Content className="overflow-hidden">
            <p className="max-w-[62ch] border-l-4 border-mango/70 py-1 pl-4 text-mist mx-5 mb-5 md:ml-[4.25rem] md:mr-6 md:mb-6">
              {item.a}
            </p>
          </Content>
        </Item>
      ))}
    </Root>
  );
}