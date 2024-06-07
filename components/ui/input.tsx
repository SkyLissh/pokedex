import { cn } from "@/functions/utils";
import * as React from "react";
import { TextInput, View } from "react-native";

interface Props extends React.ComponentPropsWithoutRef<typeof TextInput> {
  className?: string;
  placeholderClassName?: string;
  iconPosition?: "start" | "end";
  icon?: React.ReactNode;
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, Props>(
  ({ className, placeholderClassName, iconPosition, icon, ...props }, ref) => {
    return (
      <View className="flex flex-row items-center justify-center rounded-full border">
        {iconPosition === "start" && <View className="p-[10]">{icon}</View>}

        <TextInput
          ref={ref}
          className={cn(
            "grow border-none",
            iconPosition !== undefined && "p-[10]",
            iconPosition === "start" && "pl-0",
            iconPosition === "end" && "pr-0",
            props.editable === false && "opacity-50 web:cursor-not-allowed",
            className
          )}
          placeholderClassName={cn("text-slate-200", placeholderClassName)}
          {...props}
        />

        {iconPosition === "end" && <View className="p-[10]">{icon}</View>}
      </View>
    );
  }
);

Input.displayName = "Input";

export { Input };
