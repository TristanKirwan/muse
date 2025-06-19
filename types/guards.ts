export function formDataIsNotFile(
  entry: FormDataEntryValue | null
): entry is string {
  if (entry === null) return true;
  return typeof entry === "string";
}

export function formDataIsFile(
  entry: FormDataEntryValue | null
): entry is File {
  return entry instanceof File;
}
