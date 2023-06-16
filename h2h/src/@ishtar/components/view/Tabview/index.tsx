import { memo } from "react";
import {
  TabProps as MantineTabProps,
  Tabs,
  TabsListProps,
  TabsPanelProps,
  TabsProps,
} from "@mantine/core";

export type TabProps = Pick<MantineTabProps, "color" | "icon" | "rightSection" | "value"> & {
  label: React.ReactNode;
  panel: React.JSX.Element | null;
};

export type TabviewProps = Omit<TabsProps, "children"> &
  Pick<TabsListProps, "grow" | "position"> & {
    tabs: Array<TabProps>;
    tabProps?: Omit<TabProps, "children">;
    panelProps?: Omit<TabsPanelProps, "children" | "value">;
  };

const Tabview = ({ tabs, grow, position, tabProps, panelProps, ...props }: TabviewProps) => (
  <Tabs {...props}>
    <Tabs.List grow={grow} position={position}>
      {tabs.map(({ label, panel, ...tab }) => (
        <Tabs.Tab key={`tab-${tab.value}`} {...tabProps} {...tab}>
          {label}
        </Tabs.Tab>
      ))}
    </Tabs.List>

    {tabs.map(({ value, panel }) => (
      <Tabs.Panel key={`panel-${value}`} value={value} {...panelProps}>
        {panel}
      </Tabs.Panel>
    ))}
  </Tabs>
);

export default memo(Tabview);
