## Schema-Driven Dynamic Form Builder

Tech stack: **React (functional + hooks)**, **JavaScript**, **Tailwind CSS**, **MUI**, **Context API + useReducer**.

### Scripts

- `npm install`
- `npm run dev`

### Folder structure

- `src/components/builder` – `FormBuilder`, `FieldList`, `FieldConfigPanel`, `ModeToggle`
- `src/components/preview` – `PreviewForm`
- `src/components/fields` – `FieldRenderer`
- `src/context` – `FormBuilderContext`
- `src/reducer` – `formBuilderReducer`
- `src/schema` – `formSchema` (central schema definition + example)
- `src/validation` – `validateForm` (central validation utility)
- `src/utils` – `id` (ID generation)

