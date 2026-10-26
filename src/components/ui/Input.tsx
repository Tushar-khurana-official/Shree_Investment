import { forwardRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const fieldBase =
  "block w-full rounded-card-sm border bg-surface px-4 py-3 text-base text-fg placeholder:text-muted/80 " +
  "transition-colors focus:border-primary focus:outline-2 focus:outline-offset-0 focus:outline-primary";

type FieldWrapperProps = {
  id: string;
  label: ReactNode;
  hint?: ReactNode;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
};

export function Field({ id, label, hint, error, required, children, className }: FieldWrapperProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
        {required ? (
          <span className="text-danger" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm text-danger" role="alert">
          <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0" fill="currentColor">
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm-.75 3.5h1.5v5h-1.5v-5Zm0 6h1.5V12h-1.5v-1.5Z" />
          </svg>
          <span>
            <span className="sr-only">Error: </span>
            {error}
          </span>
        </p>
      )}
    </div>
  );
}

export function describedBy(id: string, hint?: unknown, error?: string) {
  return [error ? `${id}-error` : null, hint && !error ? `${id}-hint` : null].filter(Boolean).join(" ") || undefined;
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }>(
  function Input({ className, invalid, ...rest }, ref) {
    return (
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(fieldBase, invalid ? "border-danger" : "border-border", className)}
        {...rest}
      />
    );
  },
);

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }>(
  function Textarea({ className, invalid, ...rest }, ref) {
    return (
      <textarea
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(fieldBase, "min-h-32 resize-y", invalid ? "border-danger" : "border-border", className)}
        {...rest}
      />
    );
  },
);

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean; options: readonly { value: string; label: string }[]; placeholder?: string }
>(function Select({ className, invalid, options, placeholder, ...rest }, ref) {
  return (
    <div className="relative">
      <select
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(fieldBase, "appearance-none pr-10", invalid ? "border-danger" : "border-border", className)}
        {...rest}
      >
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
});

export function Checkbox({
  id,
  label,
  error,
  ...rest
}: { id: string; label: ReactNode; error?: string } & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "id">) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-border accent-[var(--primary)]"
          {...rest}
        />
        <label htmlFor={id} className="cursor-pointer text-sm leading-relaxed">
          {label}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 pl-8 text-sm text-danger" role="alert">
          <span className="sr-only">Error: </span>
          {error}
        </p>
      )}
    </div>
  );
}
