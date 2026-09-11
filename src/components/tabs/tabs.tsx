import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { cva } from 'class-variance-authority'

import { cn } from '../../lib/utils'

// <div> 전체 그룹 (value/defaultValue/onValueChange)
export function Tabs({ className, ...props }: BaseTabs.Root.Props) {
  return <BaseTabs.Root className={cn('w-fit', className)} {...props} />
}

// <div> 탭 버튼들을 담는 컨테이너
export function TabsList({ className, ...props }: BaseTabs.List.Props) {
  return (
    <BaseTabs.List
      className={cn(
        'relative z-1 -mb-px inline-flex gap-4 text-black',
        className,
      )}
      {...props}
    />
  )
}

const tabVariants = cva('h-9 cursor-pointer px-3 text-sm')

// <button> 개별 탭 버튼 (value 필수)
// Tabs.Tab의 활성 상태는 data-active 속성으로 노출. data-[active]: 로 이 속성 존재 여부를 잡아서 스타일링
// 비활성 상태는 data-[disabled]: 로 이 속성 존재 여부를 잡아서 스타일링
export function TabsTab({ className, ...props }: BaseTabs.Tab.Props) {
  return <BaseTabs.Tab className={cn(tabVariants(), className)} {...props} />
}

export function TabsIndicator({
  className,
  ...props
}: BaseTabs.Indicator.Props) {
  return (
    <BaseTabs.Indicator
      className={cn(
        'absolute top-0 left-0 -z-1 h-full w-(--active-tab-width) translate-x-(--active-tab-left) border-x border-t border-black bg-white transition-[translate,width]',
        className,
      )}
      {...props}
    />
  )
}

// <div> 탭에 대응하는 콘텐츠 영역
export function TabsPanel({ className, ...props }: BaseTabs.Panel.Props) {
  return <BaseTabs.Panel className={cn('p-4', className)} {...props} />
}
