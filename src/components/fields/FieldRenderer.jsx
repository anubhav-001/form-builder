import React from "react";
import TextField from "@mui/material/TextField";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select
} from "@mui/material";
import { FIELD_TYPES } from "../../schema/formSchema";

const FieldRenderer = React.memo(function FieldRenderer({
  field,
  value,
  error,
  onChange
}) {
  const commonProps = {
    fullWidth: true,
    size: "small",
    label: field.label,
    placeholder: field.placeholder,
    required: field.required,
    value: value ?? "",
    onChange: (event) => onChange(field.name, event.target.value),
    error: Boolean(error),
    helperText: error || " "
  };

  switch (field.type) {
    case FIELD_TYPES.TEXT:
    case FIELD_TYPES.EMAIL:
      return (
        <TextField
          type={field.type === FIELD_TYPES.EMAIL ? "email" : "text"}
          {...commonProps}
        />
      );
    case FIELD_TYPES.NUMBER:
      return (
        <TextField
          type="number"
          inputProps={{
            min: field.min,
            max: field.max
          }}
          {...commonProps}
        />
      );
    case FIELD_TYPES.SELECT:
      return (
        <FormControl fullWidth size="small" error={Boolean(error)}>
          <InputLabel>{field.label}</InputLabel>
          <Select
            label={field.label}
            value={value ?? ""}
            onChange={(event) => onChange(field.name, event.target.value)}
          >
            <MenuItem value="">
              <em>{field.placeholder || "Select an option"}</em>
            </MenuItem>
            {(field.options || []).map((option) => (
              <MenuItem key={option.id} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{error || " "}</FormHelperText>
        </FormControl>
      );
    case FIELD_TYPES.CHECKBOX:
      return (
        <FormControl error={Boolean(error)}>
          <FormControlLabel
            control={
              <Checkbox
                checked={Boolean(value)}
                onChange={(event) => onChange(field.name, event.target.checked)}
              />
            }
            label={field.label}
          />
          <FormHelperText>{error || " "}</FormHelperText>
        </FormControl>
      );
    case FIELD_TYPES.RADIO:
      return (
        <FormControl error={Boolean(error)}>
          <p className="text-sm font-medium mb-1 text-slate-100">
            {field.label}
            {field.required && <span className="text-red-400 ml-0.5">*</span>}
          </p>
          <RadioGroup
            row
            value={value ?? ""}
            onChange={(event) => onChange(field.name, event.target.value)}
          >
            {(field.options || []).map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.value}
                control={<Radio size="small" />}
                label={option.label}
              />
            ))}
          </RadioGroup>
          <FormHelperText>{error || " "}</FormHelperText>
        </FormControl>
      );
    default:
      return null;
  }
});

export default FieldRenderer;

