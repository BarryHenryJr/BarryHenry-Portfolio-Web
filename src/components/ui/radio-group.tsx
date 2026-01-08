import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "./label"

interface RadioOption {
  id: string
  label: string
  value: string
  defaultChecked?: boolean
}

interface RadioGroupProps {
  name: string
  options: RadioOption[]
  className?: string
  legend?: string
}

const RadioGroup = React.forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  ({ name, options, className, legend }, ref) => {
    return (
      <fieldset
        ref={ref}
        className={cn("space-y-3", className)}
        aria-labelledby={legend ? `${name}-legend` : undefined}
      >
        {legend && (
          <legend
            id={`${name}-legend`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {legend}
          </legend>
        )}
        <div className="space-y-2">
          {options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <input
                type="radio"
                id={option.id}
                name={name}
                value={option.value}
                defaultChecked={option.defaultChecked}
                className="h-4 w-4 text-primary focus:ring-ring focus:ring-2 border-border disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Label htmlFor={option.id} className="text-sm">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </fieldset>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

export { RadioGroup, type RadioOption }
