import React, { useMemo } from "react";
import { Button, IconButton, List, ListItemButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { FIELD_TYPES } from "../../schema/formSchema";
import { ACTIONS, useFormBuilder } from "../../context/FormBuilderContext";

const fieldTypeConfigs = [
  { type: FIELD_TYPES.TEXT, label: "Text" },
  { type: FIELD_TYPES.EMAIL, label: "Email" },
  { type: FIELD_TYPES.NUMBER, label: "Number" },
  { type: FIELD_TYPES.SELECT, label: "Select" },
  { type: FIELD_TYPES.CHECKBOX, label: "Checkbox" },
  { type: FIELD_TYPES.RADIO, label: "Radio" }
];

const FieldList = React.memo(function FieldList({
  selectedFieldId,
  onSelectField
}) {
  const { state, dispatch } = useFormBuilder();

  const fields = useMemo(
    () => state.schema.fields || [],
    [state.schema.fields]
  );

  const handleAddField = (type) => {
    const base = {
      type,
      name: `${type}-${fields.length + 1}`
    };

    if (type === FIELD_TYPES.SELECT || type === FIELD_TYPES.RADIO) {
      base.options = [
        { id: "option-1", label: "Option 1", value: "option-1" },
        { id: "option-2", label: "Option 2", value: "option-2" }
      ];
    }

    dispatch({
      type: ACTIONS.ADD_FIELD,
      payload: base
    });
  };

  const handleDelete = (id, event) => {
    event.stopPropagation();
    dispatch({ type: ACTIONS.DELETE_FIELD, payload: id });
    if (selectedFieldId === id) {
      onSelectField(null);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-3 gap-2 mb-4">
        {fieldTypeConfigs.map((ft) => (
          <Button
            key={ft.type}
            size="small"
            variant="outlined"
            startIcon={<AddIcon fontSize="small" />}
            onClick={() => handleAddField(ft.type)}
          >
            {ft.label}
          </Button>
        ))}
      </div>
      <div className="rounded-xl border border-border bg-surface/80 flex-1 overflow-hidden">
        <div className="px-3 py-2 border-b border-border flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Fields
          </p>
          <span className="text-xs text-slate-500">{fields.length}</span>
        </div>
        <List
          dense
          className="overflow-y-auto max-h-[360px] divide-y divide-border"
        >
          {fields.map((field) => (
            <ListItemButton
              key={field.id}
              selected={field.id === selectedFieldId}
              onClick={() => onSelectField(field.id)}
              className="flex items-center justify-between"
            >
              <div>
                <p className="text-sm text-slate-100">{field.label}</p>
                <p className="text-[11px] text-slate-500 uppercase tracking-wide">
                  {field.type} · {field.name}
                </p>
              </div>
              <IconButton
                size="small"
                edge="end"
                onClick={(event) => handleDelete(field.id, event)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </ListItemButton>
          ))}
          {fields.length === 0 && (
            <div className="px-3 py-4 text-xs text-slate-500">
              No fields yet. Use the buttons above to add one.
            </div>
          )}
        </List>
      </div>
    </div>
  );
});

export default FieldList;

