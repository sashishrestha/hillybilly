import { Button as MotionButton, type ButtonProps as MotionButtonProps } from '@animate-ui/react/primitives/buttons/button';
import { cn } from '@/lib/cn';

const variants = {
  /** Pink gradient with white text: both stops are deep enough for 4.5:1+ contrast (plain brand pink gives only 3.8:1) */
  primary: 'bg-gradient-to-br from-[#e11a7e] to-[#b80f62] text-white hover:from-[#f0278c] hover:to-[#c8106a] shadow-[0_6px_0_0_#6e0a3a] hover:shadow-[0_4px_0_0_#6e0a3a] hover:translate-y-[2px]',
  onDark: 'bg-gradient-to-br from-[#e11a7e] to-[#b80f62] text-white hover:from-[#f0278c] hover:to-[#c8106a] shadow-[0_6px_0_0_#000000] hover:shadow-[0_4px_0_0_#000000] hover:translate-y-[2px]',
  outline: 'border-2 border-current bg-transparent hover:bg-cream hover:text-ink',
  outlineOnDark: 'border-2 border-cream/70 text-cream hover:bg-cream hover:text-ink',
  navy: 'bg-navy text-[#fff7ec] hover:bg-[#26345a]',
  ghost: 'text-cream underline decoration-2 underline-offset-4 hover:decoration-pink',
} as const;

const sizes = {
  md: 'h-12 px-5 text-[1.0625rem]',
  lg: 'h-14 px-7 text-lg',
  sm: 'h-11 px-4 text-base',
} as const;

export type ButtonProps = MotionButtonProps & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

/** Animate UI Button primitive (spring tap feedback, reduced-motion aware) styled for HillyBilly. */
export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return (
    <MotionButton
      tapScale={0.96}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] font-bold whitespace-nowrap transition-[background-color,color,box-shadow,translate] duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0',
        variants[variant],
        variant !== 'ghost' && sizes[size],
        className,
      )}
      {...props}
    />
  );
}
