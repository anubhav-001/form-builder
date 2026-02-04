import React, { useState, useMemo } from "react";
import { TextField, Button } from "@mui/material";
import { useFormBuilder, ACTIONS } from "../../context/FormBuilderContext";
import { exampleSchema } from "../../schema/formSchema";
import FieldList from "./FieldList";
import FieldConfigPanel from "./FieldConfigPanel";

const FormBuilder = React.memo(function FormBuilder() {
  const { state, dispatch } = useFormBuilder();
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [schemaText, setSchemaText] = useState(
    JSON.stringify(state.schema, null, 2)
  );
  const [schemaError, setSchemaError] = useState("");

  const fieldsCount = useMemo(
    () => state.schema.fields.length,
    [state.schema.fields.length]
  );

  const syncSchemaText = () => {
    setSchemaText(JSON.stringify(state.schema, null, 2));
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(schemaText);
      if (!parsed || !Array.isArray(parsed.fields)) {
        throw new Error("Schema must include a fields array.");
      }
      dispatch({ type: ACTIONS.IMPORT_SCHEMA, payload: parsed });
      setSchemaError("");
      setSelectedFieldId(null);
    } catch (error) {
      setSchemaError(error.message || "Invalid schema JSON.");
    }
  };

  const handleLoadExample = () => {
    dispatch({ type: ACTIONS.IMPORT_SCHEMA, payload: exampleSchema });
    setSelectedFieldId(null);
    setSchemaError("");
    setSchemaText(JSON.stringify(exampleSchema, null, 2));
  };

  const handleReset = () => {
    dispatch({ type: ACTIONS.RESET_FORM });
    setSelectedFieldId(null);
    setSchemaError("");
    setSchemaText(JSON.stringify({ ...state.schema, fields: [] }, null, 2));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)_minmax(0,0.9fr)] gap-4 lg:gap-6">
      <div className="flex flex-col space-y-4">
        <div className="rounded-xl border border-border bg-surface/80 p-4 space-y-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Form meta
            </p>
            <span className="text-[11px] text-slate-500">
              {fieldsCount} fields
            </span>
          </div>
          <TextField
            label="Form title"
            size="small"
            fullWidth
            value={state.schema.title || ""}
            onChange={(e) =>
              dispatch({
                type: ACTIONS.IMPORT_SCHEMA,
                payload: { ...state.schema, title: e.target.value }
              })
            }
          />
        </div>
        <FieldList
          selectedFieldId={selectedFieldId}
          onSelectField={setSelectedFieldId}
        />
      </div>
      <FieldConfigPanel selectedFieldId={selectedFieldId} />
      <div className="flex flex-col h-full">
        <div className="rounded-xl border border-border bg-surface/80 p-4 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              JSON schema
            </p>
            <div className="flex items-center gap-2">
              <Button size="small" variant="outlined" onClick={syncSchemaText}>
                Sync
              </Button>
              <Button size="small" variant="outlined" onClick={handleLoadExample}>
                Load example
              </Button>
            </div>
          </div>
          <TextField
            multiline
            minRows={14}
            maxRows={18}
            fullWidth
            size="small"
            value={schemaText}
            onChange={(e) => setSchemaText(e.target.value)}
            sx={{
              "& .MuiInputBase-root": {
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
                fontSize: 12
              }
            }}
          />
          {schemaError && (
            <p className="mt-2 text-xs text-red-400">{schemaError}</p>
          )}
          <div className="mt-3 flex items-center justify-end gap-2">
            <Button size="small" color="inherit" onClick={handleReset}>
              Reset
            </Button>
            <Button size="small" variant="contained" onClick={handleImport}>
              Import schema
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default FormBuilder;

