export function getNameInitials(name: string) {
  const names = name.split(" ");
  const initials = names.map((n) => n.charAt(0).toUpperCase());
  return initials.slice(0, 2).join("");
}
