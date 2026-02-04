import React, { useMemo, useCallback } from "react";
import {
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  IconButton,
  Button
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { FIELD_TYPES } from "../../schema/formSchema";
import { ACTIONS, useFormBuilder } from "../../context/FormBuilderContext";

const FieldConfigPanel = React.memo(function FieldConfigPanel({
  selectedFieldId
}) {
  const { state, dispatch } = useFormBuilder();

  const field = useMemo(
    () => state.schema.fields.find((f) => f.id === selectedFieldId),
    [state.schema.fields, selectedFieldId]
  );

  const updateField = useCallback(
    (updates) => {
      if (!field) return;
      dispatch({
        type: ACTIONS.UPDATE_FIELD,
        payload: { id: field.id, updates }
      });
    },
    [dispatch, field]
  );

  if (!field) {
    return (
      <div className="h-full rounded-xl border border-dashed border-border flex items-center justify-center text-xs text-slate-500">
        Select a field to configure its properties.
      </div>
    );
  }

  const isOptionField =
    field.type === FIELD_TYPES.SELECT || field.type === FIELD_TYPES.RADIO;

  const handleOptionChange = (index, key, value) => {
    const nextOptions = [...(field.options || [])];
    nextOptions[index] = { ...nextOptions[index], [key]: value };
    updateField({ options: nextOptions });
  };

  const handleAddOption = () => {
    const nextOptions = [...(field.options || [])];
    const id = `option-${nextOptions.length + 1}`;
    nextOptions.push({
      id,
      label: `Option ${nextOptions.length + 1}`,
      value: id
    });
    updateField({ options: nextOptions });
  };

  const handleRemoveOption = (index) => {
    const nextOptions = [...(field.options || [])];
    nextOptions.splice(index, 1);
    updateField({ options: nextOptions });
  };

  return (
    <div className="h-full rounded-xl border border-border bg-surface/80 p-4 space-y-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-1">
          Field configuration
        </p>
        <p className="text-sm text-slate-200">
          {field.label || "Untitled"}
          <span className="text-xs text-slate-500 ml-2">
            ({field.type} · {field.name})
          </span>
        </p>
      </div>
      <Divider className="border-border" />
      <div className="space-y-3">
        <TextField
          label="Label"
          size="small"
          fullWidth
          value={field.label || ""}
          onChange={(e) => updateField({ label: e.target.value })}
        />
        <TextField
          label="Name"
          size="small"
          fullWidth
          value={field.name || ""}
          onChange={(e) => updateField({ name: e.target.value })}
        />
        <TextField
          label="Placeholder"
          size="small"
          fullWidth
          value={field.placeholder || ""}
          onChange={(e) => updateField({ placeholder: e.target.value })}
        />
        <FormControlLabel
          control={
            <Switch
              checked={Boolean(field.required)}
              onChange={(e) => updateField({ required: e.target.checked })}
              size="small"
            />
          }
          label="Required"
        />
      </div>
      <Divider className="border-border" />
      {(field.type === FIELD_TYPES.TEXT ||
        field.type === FIELD_TYPES.EMAIL) && (
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Length
          </p>
          <div className="grid grid-cols-2 gap-3">
            <TextField
              label="Min length"
              size="small"
              type="number"
              fullWidth
              value={field.minLength ?? ""}
              onChange={(e) =>
                updateField({
                  minLength:
                    e.target.value === "" ? undefined : Number(e.target.value)
                })
              }
            />
            <TextField
              label="Max length"
              size="small"
              type="number"
              fullWidth
              value={field.maxLength ?? ""}
              onChange={(e) =>
                updateField({
                  maxLength:
                    e.target.value === "" ? undefined : Number(e.target.value)
                })
              }
            />
          </div>
        </div>
      )}
      {field.type === FIELD_TYPES.NUMBER && (
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Range
          </p>
          <div className="grid grid-cols-2 gap-3">
            <TextField
              label="Min"
              size="small"
              type="number"
              fullWidth
              value={field.min ?? ""}
              onChange={(e) =>
                updateField({
                  min: e.target.value === "" ? undefined : Number(e.target.value)
                })
              }
            />
            <TextField
              label="Max"
              size="small"
              type="number"
              fullWidth
              value={field.max ?? ""}
              onChange={(e) =>
                updateField({
                  max: e.target.value === "" ? undefined : Number(e.target.value)
                })
              }
            />
          </div>
        </div>
      )}
      {isOptionField && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Options
            </p>
            <Button
              size="small"
              variant="outlined"
              startIcon={<AddIcon fontSize="small" />}
              onClick={handleAddOption}
            >
              Add
            </Button>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {(field.options || []).map((option, index) => (
              <div
                key={option.id}
                className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center"
              >
                <TextField
                  label="Label"
                  size="small"
                  value={option.label}
                  onChange={(e) =>
                    handleOptionChange(index, "label", e.target.value)
                  }
                />
                <TextField
                  label="Value"
                  size="small"
                  value={option.value}
                  onChange={(e) =>
                    handleOptionChange(index, "value", e.target.value)
                  }
                />
                <IconButton
                  size="small"
                  onClick={() => handleRemoveOption(index)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>
            ))}
            {(field.options || []).length === 0 && (
              <p className="text-xs text-slate-500">
                No options defined. Add at least one.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default FieldConfigPanel;

