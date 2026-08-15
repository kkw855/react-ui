import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from './../../lib/utils'

const buttonVariants = cva('rounded-md border inline-flex items-center justify-center cursor-pointer', {
  variants: {
    size: {
      default: 'h-9 px-4 py-2',
    },
  },
  defaultVariants: {
    size: 'default'
  }
})

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export function Button(props: ButtonProps) {
  return <button className={cn(buttonVariants())} {...props} />
}
