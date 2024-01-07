import { forwardRef } from 'react';

import { FormErrors } from './form-errors';
import { cn } from '../../util/utils';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface FormInputProps {
    id: string;
    label?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[] | undefined>;
    className?: string;
    defaultValue?: string;
    onBlur?: () => void;
    onChange?: (e: any) => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    (
        {
            id,
            label,
            type,
            placeholder,
            required,
            disabled,
            errors,
            className,
            defaultValue = '',
            onBlur,
            onChange
        },
        ref
    ) => {
        return (
            <div className="space-y-2">
                <div className="space-y-1">
                    {label ? (
                        <Label
                            htmlFor={id}
                            className="text-xs font-semibold text-neutral-700"
                        >
                            {label}
                        </Label>
                    ) : null}
                    <Input
                        onBlur={onBlur}
                        defaultValue={defaultValue}
                        ref={ref}
                        required={required}
                        name={id}
                        id={id}
                        placeholder={placeholder}
                        type={type}
                        disabled={disabled}
                        className={cn('text-sm px-2 py-1 h-7', className)}
                        aria-describedby={`${id}-error`}
                        onChange={onChange}
                    />
                </div>
                <FormErrors id={id} errors={errors} />
            </div>
        );
    }
);

FormInput.displayName = 'FormInput';
