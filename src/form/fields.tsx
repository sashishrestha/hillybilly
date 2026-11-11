import { useId, type ReactNode } from 'react';
import { Root as RadioGroup, RadioGroupItem, RadioGroupIndicator } from '@animate-ui/react/primitives/radix-ui/radio-group';
import { Root as Checkbox, CheckboxIndicator } from '@animate-ui/react/primitives/radix-ui/checkbox';
import { CheckIcon, CircleAlertIcon } from '@/components/animate-ui/icons';
import { cn } from '@/lib/cn';

export function FieldError({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} className="animate-fade-up mt-2 flex items-start gap-1.5 font-semibold text-pink">
      <CircleAlertIcon size={18} className="mt-0.5 shrink-0" aria-hidden />
      {children}
    </p>
  );
}

const inputCls =
  'mt-2 block w-full rounded-xl border-2 border-cream/45 bg-navy-2 px-4 py-3 text-lg text-cream placeholder:text-mist transition-[border-color,box-shadow] duration-200 hover:border-cream/70 focus:border-mango focus:shadow-[0_0_0_3px_var(--color-mango)] focus:outline-none aria-[invalid=true]:border-pink aria-[invalid=true]:bg-pink/10';

type TextFieldProps = {
  name: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: string;
  multiline?: boolean;
  value: string;
  onChange: (v: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

export function TextField({ name, label, hint, error, optional, multiline, value, onChange, className, ...rest }: TextFieldProps) {
  const id = useId();
  const describedBy = [hint && `${id}-hint`, error && `${id}-err`].filter(Boolean).join(' ') || undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="font-bold">
        {label} {optional && <span className="font-normal text-mist">({optional})</span>}
      </label>
      {hint && <p id={`${id}-hint`} className="text-mist">{hint}</p>}
      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(inputCls, 'resize-y')}
        />
      ) : (
        <input
          id={id}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={inputCls}
          {...rest}
        />
      )}
      <FieldError id={`${id}-err`}>{error}</FieldError>
    </div>
  );
}

/** Pill-style single choice, built on Animate UI's Radix radio group. */
export function ChoiceGroup<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
  error,
  columns = 'auto',
}: {
  legend: string;
  name: string;
  options: { value: T; label: string; hint?: string }[];
  value: T | '';
  onChange: (v: T) => void;
  error?: string;
  columns?: 'auto' | 'stack';
}) {
  const id = useId();
  return (
    <fieldset aria-describedby={error ? `${id}-err` : undefined}>
      <legend className="font-bold" data-field={name}>{legend}</legend>
      <RadioGroup
        name={name}
        value={value}
        onValueChange={(v: string) => onChange(v as T)}
        aria-invalid={!!error}
        className={cn('mt-3 gap-2.5', columns === 'stack' ? 'grid sm:grid-cols-3' : 'flex flex-wrap')}
      >
        {options.map((o) => (
          <RadioGroupItem
            key={o.value}
            value={o.value}
            className={cn(
              'group relative flex items-center gap-3 rounded-xl border-2 border-cream/45 bg-navy-2 px-4 py-3 text-left font-semibold transition-colors hover:border-cream/40',
              'data-[state=checked]:border-mango data-[state=checked]:bg-mango data-[state=checked]:text-navy',
              columns === 'stack' && 'items-start',
            )}
          >
            <span className="grid size-5 shrink-0 place-items-center rounded-full border-2 border-current">
              <RadioGroupIndicator className="size-2.5 rounded-full bg-mango" />
            </span>
            <span className="flex flex-col">
              {o.label}
              {o.hint && <span className="text-sm font-normal opacity-75">{o.hint}</span>}
            </span>
          </RadioGroupItem>
        ))}
      </RadioGroup>
      <FieldError id={`${id}-err`}>{error}</FieldError>
    </fieldset>
  );
}

/** Checkbox with label — used for chips, consent and the cuisine cards. */
export function Check({
  checked,
  onChange,
  children,
  className,
  invalid,
  describedBy,
  variant = 'chip',
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: ReactNode;
  className?: string;
  invalid?: boolean;
  describedBy?: string;
  variant?: 'chip' | 'plain' | 'card';
}) {
  const box = (
    <span
      className={cn(
        'grid size-6 shrink-0 place-items-center rounded-md border-2 transition-colors',
        checked ? 'border-mango bg-mango text-navy' : 'border-cream/30 bg-navy-2',
      )}
    >
      <CheckboxIndicator>
        <CheckIcon size={16} strokeWidth={3} />
      </CheckboxIndicator>
    </span>
  );
  return (
    <Checkbox
      checked={checked}
      onCheckedChange={(v: boolean | 'indeterminate') => onChange(v === true)}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      className={cn(
        'group text-left transition-colors',
        variant === 'chip' &&
          'inline-flex items-center gap-2.5 rounded-xl border-2 border-cream/45 bg-navy-2 px-4 py-2.5 font-semibold hover:border-cream/40 data-[state=checked]:border-mango',
        variant === 'plain' && 'flex items-start gap-3',
        variant === 'card' &&
          'relative flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-card)] border-[3px] border-transparent bg-navy-2 ring-1 ring-cream/10 hover:ring-cream/30 data-[state=checked]:border-mango',
        className,
      )}
    >
      {variant === 'card' ? (
        <>
          <span className="absolute right-3 top-3 z-10">{box}</span>
          {children}
        </>
      ) : (
        <>
          {box}
          <span>{children}</span>
        </>
      )}
    </Checkbox>
  );
}
