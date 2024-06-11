import { TextClassContext } from "@/components/ui/text";
import { cn } from "@/functions/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Pressable } from "react-native";

const buttonVariants = cva(
  "group flex flex-row items-center justify-center rounded-full p-4",
  {
    variants: {
      variant: {
        default: "bg-blue-600 web:hover:opacity-90 active:opacity-90",
        destructive: "bg-yellow-400 web:hover:opacity-90 active:opacity-90",
        outline: "border border-blue-600 web:hover:bg-blue-200 active:bg-blue-200",
        secondary: "bg-[#333333] web:hover:opacity-80 active:opacity-80",
        ghost: "web:hover:bg-blue-200 active:bg-blue-200",
        link: "web:underline-offset-4 web:hover:underline web:focus:underline ",
      },
      size: {
        default: "h-10 px-4 py-2 native:h-12 native:px-5 native:py-3",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8 native:h-14",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const buttonTextVariants = cva(
  "web:whitespace-nowrap text-sm native:text-base font-medium text-white web:transition-colors",
  {
    variants: {
      variant: {
        default: "text-white",
        destructive: "text-white",
        outline: "group-active:text-blue-700",
        secondary: "text-white group-active:text-white",
        ghost: "text-blue-600 group-active:text-blue-600",
        link: "text-blue-600 group-active:underline",
      },
      size: {
        default: "",
        sm: "",
        lg: "native:text-lg",
        icon: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <TextClassContext.Provider
        value={cn(
          props.disabled && "web:pointer-events-none",
          buttonTextVariants({ variant, size })
        )}
      >
        <Pressable
          className={cn(
            props.disabled && "opacity-50 web:pointer-events-none",
            buttonVariants({ variant, size, className })
          )}
          ref={ref}
          role="button"
          {...props}
        />
      </TextClassContext.Provider>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
