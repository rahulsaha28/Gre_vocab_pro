"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { convertToMarkdownHTML } from "@/utils/markDown-Converter";
import { useState } from "react";

export default function MarkdownForm() {
  const [markdown, setMarkdown] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(markdown);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="markdown">Markdown Content</Label>
          <Textarea
            id="markdown"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Write your markdown here..."
            className="min-h-[200px]"
          />
        </div>
        <Button type="submit">Save</Button>
      </form>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: convertToMarkdownHTML(markdown, {
                includeIcons: true,
                collapsible: true,
              }),
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
