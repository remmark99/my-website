import React from "react";
import fs from "fs/promises";
import NotesFilter from "@/components/notes-filter";
import NotesList from "@/components/notes-list";

// Once every minute, I want to get an updated list of notes
export const revalidate = 60;

async function getNoteMetadata(
  note: string,
): Promise<NoteMetadata | undefined> {
  try {
    const filePath = `${process.env.NOTES_FOLDER ?? ""}/${note}`;
    const noteModule = await import(`@/notes/${note}`);
    const { birthtime: createdAt } = await fs.stat(filePath);

    return {
      url: note.split(".")[0],
      title: noteModule.title ?? note.split(".")[0],
      tags: noteModule.tags ?? [],
      createdAt,
    };
  } catch (error) {
    console.error(`Error processing ${note}:`, error);
  }
}

async function generateNotesMedata() {
  const notes = await fs.readdir(process.env.NOTES_FOLDER || "");

  const notesMetadata = await Promise.all(
    notes.map(async (note) => getNoteMetadata(note)),
  );

  return notesMetadata.filter((note) => !!note);
}

function getTags(notesMetadata: NoteMetadata[]) {
  const tags = new Set<string>();
  for (const noteMetadata of notesMetadata) {
    for (const tag of noteMetadata.tags) tags.add(tag);
  }

  return tags;
}

export default async function TILPage() {
  const notesMetadata = (await generateNotesMedata()) ?? [];
  const tags = getTags(notesMetadata);

  notesMetadata.sort((a, b) => +b.createdAt - +a.createdAt);

  return (
    <>
      <NotesFilter tags={tags} />
      <NotesList notes={notesMetadata} />
    </>
  );
}
