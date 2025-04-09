"use client";

import { selectedTagsAtom } from "@/app/atoms";
import { format } from "date-fns";
import { useAtom } from "jotai";
import Link from "next/link";
import React from "react";

interface Props {
  notes: NoteMetadata[];
}

export default function NotesList({ notes }: Props) {
  const [selectedTags] = useAtom(selectedTagsAtom);

  const filteredNotes =
    selectedTags.size > 0
      ? notes.filter((note) => note.tags.some((tag) => selectedTags.has(tag)))
      : notes;

  return (
    <div className="flex flex-col">
      {filteredNotes.map((note) => (
        <Link key={note.url} href={`til/${note.url}`}>
          {note.title} - {format(note.createdAt, "dd.MM.yy")}
        </Link>
      ))}
    </div>
  );
}
