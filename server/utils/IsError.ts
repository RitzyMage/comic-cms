export default function isError(result: any) {
  if (typeof result !== "object") return false;
  if (result.isCustomError) return true;
  return false;
}
