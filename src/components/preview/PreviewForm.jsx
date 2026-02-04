import React, { useState, useMemo, useCallback } from "react";
import { Button, Alert } from "@mui/material";
import { useFormBuilder } from "../../context/FormBuilderContext";
import { validateForm } from "../../validation/validateForm";
import FieldRenderer from "../fields/FieldRenderer";

const PreviewForm = React.memo(function PreviewForm() {
  const { state } = useFormBuilder();
  const [values, setValues] = useState({});
  const [touched, setTouched] = useState({});
  const [submitResult, setSubmitResult] = useState(null);

  const schema = state.schema;

  const validationResult = useMemo(
    () => validateForm(schema, values),
    [schema, values]
  );

  const visibleErrors = useMemo(() => {
    const result = {};
    for (const [name, message] of Object.entries(validationResult.errors)) {
      if (touched[name]) {
        result[name] = message;
      }
    }
    return result;
  }, [validationResult.errors, touched]);

  const handleChange = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    setSubmitResult(null);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextTouched = {};
    for (const field of schema.fields) {
      nextTouched[field.name] = true;
    }
    setTouched(nextTouched);
    const result = validateForm(schema, values);
    if (result.isValid) {
      setSubmitResult({
        type: "success",
        message: "Form is valid. Values ready to submit."
      });
    } else {
      setSubmitResult({
        type: "error",
        message: "Please resolve the highlighted errors."
      });
    }
  };

  if (!schema || !Array.isArray(schema.fields) || schema.fields.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border flex items-center justify-center h-[420px] text-xs text-slate-500">
        No fields defined in the schema. Switch to Builder mode to add fields.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-surface/80 p-5">
      <div className="mb-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Preview
        </p>
        <h2 className="text-lg font-semibold text-slate-50 mt-1">
          {schema.title || "Untitled Form"}
        </h2>
      </div>
      {submitResult && (
        <div className="mb-4">
          <Alert
            severity={submitResult.type}
            variant="outlined"
            className="border-border"
          >
            {submitResult.message}
          </Alert>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {schema.fields.map((field) => (
          <div key={field.id} className="space-y-1">
            <FieldRenderer
              field={field}
              value={values[field.name]}
              error={visibleErrors[field.name]}
              onChange={handleChange}
            />
          </div>
        ))}
        <div className="pt-2 flex justify-end">
          <Button type="submit" variant="contained">
            Validate
          </Button>
        </div>
      </form>
    </div>
  );
});

export default PreviewForm;

