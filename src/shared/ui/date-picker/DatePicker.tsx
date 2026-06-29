"use client";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Box } from "@chakra-ui/react";
import { forwardRef } from "react";

interface DatePickerProps {
  label?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  slotProps?: any;
}

export const CustomDatePicker = forwardRef<any, DatePickerProps>(
  (
    {
      label,
      value,
      onChange,
      minDate,
      maxDate,
      disabled = false,
      error = false,
      helperText,
      slotProps,
    },
    ref
  ) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box width="full">
          <DatePicker
            label={label}
            value={value}
            onChange={onChange}
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
            openTo="day"
            views={['year', 'month', 'day']}
            slotProps={{
              ...slotProps,
              textField: {
                ...slotProps?.textField,
                error,
                helperText,
                fullWidth: true,
                size: "small",
              },
              popper: {
                ...slotProps?.popper,
                sx: {
                  ...slotProps?.popper?.sx,
                  zIndex: 9999,
                },
                disablePortal: true,
              },
              desktopPaper: {
                ...slotProps?.desktopPaper,
                sx: {
                  ...slotProps?.desktopPaper?.sx,
                  zIndex: 9999,
                },
              },
            }}
            ref={ref}
          />
        </Box>
      </LocalizationProvider>
    );
  }
);

CustomDatePicker.displayName = "CustomDatePicker";
