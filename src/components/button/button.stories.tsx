import type { Meta, StoryObj } from '@storybook/react-vite'
import { Trash2 } from 'lucide-react'

import { Button } from './button'

const meta = {
  title: 'Components/Button',
  component: Button,
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Button',
  },
}

export const SaveChangesDisabled: Story = {
  args: {
    className:
      'cursor-pointer rounded-xl bg-[#20B658] font-bold text-white hover:bg-[#20B658]/70',
    children: 'Save Changes',
    disabled: true,
  },
}

export const SaveChanges: Story = {
  args: {
    className:
      'cursor-pointer rounded-xl bg-[#20B658] font-bold text-white hover:bg-[#20B658]/70',
    children: 'Save Changes',
  },
}

export const DeleteNote: Story = {
  args: {
    className:
      'cursor-pointer border-red-400! text-red-400 hover:bg-red-400 hover:text-white',
    children: (
      <>
        <Trash2 className="size-4" />
        Delete Note
      </>
    ),
  },
}

export const TrashIcon: Story = {
  args: {
    variant: 'ghost',
    className: 'cursor-pointer text-red-500',
    children: <Trash2 className="size-4" />,
  },
}
