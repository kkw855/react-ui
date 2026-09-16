import { Input as BaseInput } from '@base-ui/react/input'
import type { InputHTMLAttributes } from 'react'

import { cn } from './../../lib/utils'

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ className, ...props }: InputProps) {
  return (
    <BaseInput
      className={cn(
        'h-9 w-full border bg-transparent px-3 py-1 text-base md:text-sm',
        className,
      )}
      {...props}
    />
  )
}
