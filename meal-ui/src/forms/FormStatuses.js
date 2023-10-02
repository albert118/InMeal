/* status enums */
const FormStatuses = {
    Unknown: { text: 'unknown', color: '--error' },
    Error: { text: 'error', color: '--error' },
    Saved: { text: 'saved', color: '--success' },
    Unsaved: { text: 'unsaved', color: '--warning' },
    Saving: { text: 'saving...', color: '--note' }
};

export default FormStatuses;
