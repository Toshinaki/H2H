import { memo } from "react";
import { Accordion, AccordionControlProps, AccordionProps, Flex } from "@mantine/core";

type AccordionItem = Omit<AccordionControlProps, "children"> & {
  value: string;
  label: React.ReactNode;
  panel: React.ReactNode;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
};

type AccordionViewProps = Omit<AccordionProps, "children"> & {
  items: Array<AccordionItem>;
};

const AccordionView = ({ items, ...props }: AccordionViewProps) => {
  return (
    <Accordion {...props}>
      {items.map(({ value, label, panel, leftSection, rightSection, ...rest }) => (
        <Accordion.Item key={value} value={value}>
          <Flex>
            {leftSection}
            <Accordion.Control {...rest}>{label}</Accordion.Control>
            {rightSection}
          </Flex>
          <Accordion.Panel>{panel}</Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default memo(AccordionView);
