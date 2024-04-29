export function fieldValidator(fields, requiredFields) {
  for (let field of requiredFields) {
    if (!fields[field]) return false; //check if any field is missing in req.body object.
  }
  return true;
}
