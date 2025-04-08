"use client";

import React from "react";
import { Badge } from "./ui/badge";
import { X } from "lucide-react";
import { useAtom } from "jotai";
import { selectedTagsAtom } from "@/app/atoms";

interface Props {
  tags: Set<string>;
}

export default function NotesFilter({ tags }: Props) {
  const [selectedTags, setSelectedTags] = useAtom(selectedTagsAtom);

  return (
    <div>
      {[...tags].map((tag) => (
        <Badge
          key={tag}
          variant={selectedTags.has(tag) ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() =>
            setSelectedTags((prev) => {
              const newTags = new Set(prev);

              if (newTags.has(tag)) newTags.delete(tag);
              else newTags.add(tag);

              return newTags;
            })
          }
        >
          {tag}
          {selectedTags.has(tag) && <X />}
        </Badge>
      ))}
    </div>
  );
}
