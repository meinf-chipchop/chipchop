import React from "react";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "./ui/select";
import { ChevronDownIcon } from "lucide-react-native";
import { ISelectProps } from "@gluestack-ui/select/lib/types";

type SelectItem = {
  label: string;
  value: any;
  isDisabled?: boolean;
};

interface SelectProps extends ISelectProps {
  size?: "sm" | "md" | "lg" | "xl";
  placeholder: string;
  empty: SelectItem;
  items: SelectItem[];
}

const SelectDropDown = ({
  size,
  placeholder,
  items,
  empty,
  ...props
}: SelectProps) => {
  return (
    <Select {...props}>
      <SelectTrigger variant="rounded" size={size}>
        <SelectInput placeholder={placeholder} />
        <SelectIcon className="mr-3" as={ChevronDownIcon} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {items.length === 0 ? (
            <SelectItem label={empty.label} value={empty.value} />
          ) : (
            items.map((item, index) => (
              <SelectItem
                key={index}
                label={item.label}
                value={item.value}
                isDisabled={item.isDisabled ?? false}
              />
            ))
          )}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

export default SelectDropDown;
