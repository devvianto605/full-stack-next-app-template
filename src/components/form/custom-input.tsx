import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/shadcn/ui/form';
import { Input, type InputProps } from '@/components/shadcn/ui/input';
import React from 'react';
import { useFormContext } from 'react-hook-form';

type CustomInputProps = {
  name: string;
  placeholder?: string;
  label?: string;
  description?: string;
} & InputProps;

export const CustomInput = ({
  name,
  placeholder,
  label,
  description,
  ...rest
}: CustomInputProps): JSX.Element => {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...rest}
              {...field}
              disabled={isSubmitting || rest.disabled}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
