import type { Meta, StoryObj } from '@storybook/react-vite'

import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from './tabs'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const BorderBottom: Story = {
  name: '활성탭 border-b 제거',
  args: {
    children: (
      <>
        <TabsList>
          <TabsTab value="overview">Overview</TabsTab>
          <TabsTab value="projects">Projects</TabsTab>
          <TabsIndicator />
        </TabsList>
        <div className="border border-black bg-white">
          <TabsPanel value="overview">
            <p>Workspace stats and activity.</p>
          </TabsPanel>
          <TabsPanel value="projects">
            <p>Milestones and deadlines.</p>
          </TabsPanel>
        </div>
      </>
    ),
  },
}
