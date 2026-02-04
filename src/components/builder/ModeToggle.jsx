import React from "react";
import { ButtonGroup, Button } from "@mui/material";

const ModeToggle = React.memo(function ModeToggle({ mode, onChange }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-lg font-semibold tracking-tight text-slate-50">
        Dynamic Form Builder
      </h1>
      <ButtonGroup variant="outlined" size="small">
        <Button
          onClick={() => onChange("builder")}
          color={mode === "builder" ? "primary" : "inherit"}
          variant={mode === "builder" ? "contained" : "outlined"}
        >
          Builder
        </Button>
        <Button
          onClick={() => onChange("preview")}
          color={mode === "preview" ? "primary" : "inherit"}
          variant={mode === "preview" ? "contained" : "outlined"}
        >
          Preview
        </Button>
      </ButtonGroup>
    </div>
  );
});

export default ModeToggle;

