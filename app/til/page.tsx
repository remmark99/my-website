import Link from 'next/link'
import React from 'react'
import fs from "fs/promises";
import { createReadStream } from 'fs';
import path from 'path';
import readline from 'readline';

// Once every minute, I want to get an updated list of notes
export const revalidate = 60;

async function getNoteTitle(note: string) {
  const filePath = path.join(process.env.NOTES_FOLDER || "", note);

  const fileStream = createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    fileStream.close();

    const match = line.match(/#\s*(.+)/);
    return match ? match[1].trim() : note.split(".")[0];
  }

  return "This file is empty?!";
}

async function generateLinks() {
  const notes = await fs.readdir(process.env.NOTES_FOLDER || "");

  const links = await Promise.all(notes.map(async (note) => ({
    title: await getNoteTitle(note),
    url: note.split(".")[0],
  })));

  return links;
}

export default async function TILPage() {
  const links = await generateLinks();

  return (
    <div className='flex flex-col'>{
      links.map((link) => <Link key={link.url} href={`til/${link.url}`}>{link.title}</Link>)
    }</div>
  )
}

