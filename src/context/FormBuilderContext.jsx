import React, { createContext, useContext, useMemo, useReducer } from "react";
import {
  ACTIONS,
  formBuilderReducer,
  initialState
} from "../reducer/formBuilderReducer";

const FormBuilderContext = createContext(null);

export function FormBuilderProvider({ children }) {
  const [state, dispatch] = useReducer(formBuilderReducer, initialState);

  const value = useMemo(
    () => ({
      state,
      dispatch
    }),
    [state]
  );

  return (
    <FormBuilderContext.Provider value={value}>
      {children}
    </FormBuilderContext.Provider>
  );
}

export function useFormBuilder() {
  const ctx = useContext(FormBuilderContext);
  if (!ctx) {
    throw new Error("useFormBuilder must be used within FormBuilderProvider");
  }
  return ctx;
}

export { ACTIONS };

