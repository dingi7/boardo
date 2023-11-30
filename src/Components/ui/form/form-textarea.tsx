import { KeyboardEventHandler } from 'react';

import { FormErrors } from './form-errors';
import { cn } from '../../../util/utils';
import { Textarea } from '../textarea';
import { Label } from '../label';

interface FormTextareaProps {
    id: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[] | undefined>;
    className?: string;
    onBlur?: () => void;
    onClick?: () => void;
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
    defaultValue?: string;
}

export const FormTextArea = ({
    id,
    label,
    placeholder,
    required,
    disabled,
    errors,
    onBlur,
    onClick,
    onKeyDown,
    className,
    defaultValue,
}: FormTextareaProps) => {
    return (
        <div className="space-y-2 w-full">
            <div className="space-y-1 w-full">
                {label ? (
                    <Label
                        htmlFor={id}
                        className="text-xs font-semibold text-neutral-700"
                    >
                        {label}
                    </Label>
                ) : null}
                <Textarea
                    onKeyDown={onKeyDown}
                    onBlur={onBlur}
                    onClick={onClick}
                    required={required}
                    placeholder={placeholder}
                    name={id}
                    id={id}
                    disabled={disabled}
                    className={cn(
                        'resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm',
                        className
                    )}
                    aria-describedby={`${id}-error`}
                    defaultValue={defaultValue}
                />
            </div>
            <FormErrors id={id} errors={errors} />
        </div>
    );
};

FormTextArea.displayName = 'FormTextarea';
