import { emptySchema } from "../schema/formSchema";
import { createId } from "../utils/id";

export const ACTIONS = {
  ADD_FIELD: "ADD_FIELD",
  UPDATE_FIELD: "UPDATE_FIELD",
  DELETE_FIELD: "DELETE_FIELD",
  IMPORT_SCHEMA: "IMPORT_SCHEMA",
  RESET_FORM: "RESET_FORM"
};

export const initialState = {
  schema: emptySchema
};

export function formBuilderReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_FIELD: {
      const newField = {
        id: createId(),
        label: "New field",
        placeholder: "",
        required: false,
        ...action.payload
      };

      return {
        ...state,
        schema: {
          ...state.schema,
          fields: [...state.schema.fields, newField]
        }
      };
    }
    case ACTIONS.UPDATE_FIELD: {
      const { id, updates } = action.payload;
      return {
        ...state,
        schema: {
          ...state.schema,
          fields: state.schema.fields.map((field) =>
            field.id === id ? { ...field, ...updates } : field
          )
        }
      };
    }
    case ACTIONS.DELETE_FIELD: {
      const id = action.payload;
      return {
        ...state,
        schema: {
          ...state.schema,
          fields: state.schema.fields.filter((field) => field.id !== id)
        }
      };
    }
    case ACTIONS.IMPORT_SCHEMA: {
      return {
        ...state,
        schema: action.payload
      };
    }
    case ACTIONS.RESET_FORM: {
      return {
        ...state,
        schema: emptySchema
      };
    }
    default:
      return state;
  }
}

