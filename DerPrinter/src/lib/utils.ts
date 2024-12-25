import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const uploadImg = (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
    return file;
  } else {
    return null;
  }
};


