import { atom } from "jotai";

export const selectedTagsAtom = atom(new Set<string>());
