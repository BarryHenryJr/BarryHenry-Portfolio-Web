import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "./label"

/**
 * Represents a single radio button option within a RadioGroup.
 */
interface RadioOption {
  /** Unique identifier for the radio input element */
  id: string
  /** Display text for the radio button label */
  label: string
  /** Value submitted when this option is selected */
  value: string
  /** Whether this option should be checked by default */
  defaultChecked?: boolean
}

/**
 * Props for the RadioGroup component.
 */
interface RadioGroupProps {
  /** Name attribute for all radio inputs in the group */
  name: string
  /** Array of radio button options to render */
  options: RadioOption[]
  /** Additional CSS classes to apply to the fieldset */
  className?: string
  /**
   * Optional legend text that labels the entire radio group.
   * When provided, creates a semantic legend element that improves
   * accessibility by clearly associating the label with the radio group.
   */
  legend?: string
  /**
   * The currently selected value for controlled usage.
   * When provided, the component becomes controlled and requires onChange.
   */
  value?: string
  /**
   * Callback fired when the selected value changes.
   * Required when using the value prop for controlled components.
   */
  onChange?: (value: string) => void
}

const RadioGroup = React.forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  ({ name, options, className, legend, value, onChange }, ref) => {
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
                checked={value !== undefined ? value === option.value : undefined}
                defaultChecked={value === undefined ? option.defaultChecked : undefined}
                onChange={onChange ? () => onChange(option.value) : undefined}
                aria-describedby={legend ? `${name}-legend` : undefined}
                className="h-4 w-4 text-primary focus-visible:ring-ring focus-visible:ring-2 border-border disabled:cursor-not-allowed disabled:opacity-50"
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
