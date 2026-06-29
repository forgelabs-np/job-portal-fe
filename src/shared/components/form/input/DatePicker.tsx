"use client";

import { useController, useFormContext } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Box } from "@chakra-ui/react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { FormWrapper } from "../wrapper";
import { TextFieldInputProps } from "@/shared/types";

interface DatePickerInputProps extends Omit<TextFieldInputProps, 'type'> {
  minDate?: Date;
  maxDate?: Date;
  slotProps?: any;
}

export const DatePickerInput: React.FC<DatePickerInputProps> = ({
  label,
  name,
  required,
  disabled,
  minDate,
  maxDate,
  borderColor,
  borderRadius,
  slotProps,
  ...rest
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const errorText = errors?.[name]?.message as string;

  const handleDateChange = (date: Date | null) => {
    onChange(date ? format(date, "yyyy-MM-dd") : "");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormWrapper
        label={label}
        required={required}
        disabled={disabled}
        errorText={errorText}
        borderColor={borderColor}
        borderRadius={borderRadius}
      >
        <Box width="full">
          <DatePicker
            value={value ? new Date(value) : null}
            onChange={handleDateChange}
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
            openTo="day"
            views={['year', 'month', 'day']}
            slots={{
              openPickerIcon: CalendarIcon,
            }}
            slotProps={{
              ...slotProps,
              textField: {
                ...slotProps?.textField,
                error: !!errorText,
                helperText: errorText,
                fullWidth: true,
                size: "small",
                id: name,
                ...rest,
              },
              popper: {
                ...slotProps?.popper,
                sx: {
                  ...slotProps?.popper?.sx,
                  zIndex: 99999,
                },
                disablePortal: true,
              },
              desktopPaper: {
                ...slotProps?.desktopPaper,
                sx: {
                  ...slotProps?.desktopPaper?.sx,
                  zIndex: 99999,
                },
              },
            }}
          />
        </Box>
      </FormWrapper>
    </LocalizationProvider>
  );
};
