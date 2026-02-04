import React, { useState } from "react";
import { Container, Paper } from "@mui/material";
import { FormBuilderProvider } from "./context/FormBuilderContext";
import ModeToggle from "./components/builder/ModeToggle";
import FormBuilder from "./components/builder/FormBuilder";
import PreviewForm from "./components/preview/PreviewForm";

function AppContent() {
  const [mode, setMode] = useState("builder");

  return (
    <Container maxWidth="lg" className="py-6 lg:py-10">
      <Paper
        className="bg-surface/90 border border-border rounded-2xl px-4 py-4 lg:px-6 lg:py-5 shadow-[0_18px_60px_rgba(0,0,0,0.65)]"
        elevation={0}
      >
        <ModeToggle mode={mode} onChange={setMode} />
        {mode === "builder" ? <FormBuilder /> : <PreviewForm />}
      </Paper>
    </Container>
  );
}

function App() {
  return (
    <FormBuilderProvider>
      <AppContent />
    </FormBuilderProvider>
  );
}

export default App;

