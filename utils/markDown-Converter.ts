import {
  AlertTriangle,
  Bold,
  BookCheck,
  BookMarked,
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Code,
  GraduationCap,
  Heading1,
  Image,
  Italic,
  Lightbulb,
  Link,
  List,
  ListOrdered,
  Quote,
  Target,
} from "lucide-react";

export interface MarkdownOptions {
  bold?: boolean;
  italic?: boolean;
  list?: boolean;
  orderedList?: boolean;
  heading?: 1 | 2 | 3;
  link?: string;
  image?: string;
  code?: boolean;
  quote?: boolean;
}

export const convertToMarkdown = (
  text: string,
  options: MarkdownOptions = {}
): string => {
  let markdown = text;

  if (options.bold) {
    markdown = `**${markdown}**`;
  }

  if (options.italic) {
    markdown = `*${markdown}*`;
  }

  if (options.heading) {
    const hashes = "#".repeat(options.heading);
    markdown = `${hashes} ${markdown}`;
  }

  if (options.list) {
    markdown = `- ${markdown}`;
  }

  if (options.orderedList) {
    markdown = `1. ${markdown}`;
  }

  if (options.link) {
    markdown = `[${markdown}](${options.link})`;
  }

  if (options.image) {
    markdown = `![${markdown}](${options.image})`;
  }

  if (options.code) {
    markdown = `\`${markdown}\``;
  }

  if (options.quote) {
    markdown = `> ${markdown}`;
  }

  return markdown;
};

export const getMarkdownIcon = (type: keyof MarkdownOptions) => {
  const icons = {
    bold: Bold,
    italic: Italic,
    list: List,
    orderedList: ListOrdered,
    heading: Heading1,
    link: Link,
    image: Image,
    code: Code,
    quote: Quote,
  };

  return icons[type];
};

export const getMarkdownShortcut = (type: keyof MarkdownOptions): string => {
  const shortcuts = {
    bold: "Ctrl+B",
    italic: "Ctrl+I",
    list: "Ctrl+L",
    orderedList: "Ctrl+Shift+L",
    heading: "Ctrl+H",
    link: "Ctrl+K",
    image: "Ctrl+Shift+I",
    code: "Ctrl+`",
    quote: "Ctrl+Q",
  };

  return shortcuts[type];
};

export const convertIELTSEssayToMarkdown = (essay: string): string => {
  // Split the essay into sections
  const sections = essay.split("\n\n");
  let markdown = "";

  sections.forEach((section) => {
    if (section.startsWith("**")) {
      // This is a heading
      const heading = section.replace(/\*\*/g, "");
      markdown += `## ${heading}\n\n`;
    } else if (section.includes("**") && section.includes("(")) {
      // This is a vocabulary section
      const vocabItems = section.split("\n").filter((line) => line.trim());
      markdown += "### Vocabulary Breakdown\n\n";
      vocabItems.forEach((item) => {
        const [word, meaning] = item.split(" - ");
        markdown += `- **${word.trim()}**: ${meaning.trim()}\n`;
      });
      markdown += "\n";
    } else if (section.startsWith("1.")) {
      // This is a numbered list
      const items = section.split("\n");
      markdown += items.map((item) => item.trim()).join("\n") + "\n\n";
    } else {
      // Regular paragraph
      markdown += section + "\n\n";
    }
  });

  // Add icons for different sections
  const iconMap = {
    Introduction: BookOpen,
    Definition: BookMarked,
    Benefits: Lightbulb,
    Barriers: AlertTriangle,
    Solutions: CheckCircle,
    Conclusion: GraduationCap,
    "Vocabulary Breakdown": Target,
  };

  // Add icons to headings
  Object.entries(iconMap).forEach(([heading, Icon]) => {
    markdown = markdown.replace(
      new RegExp(`## ${heading}`),
      `## ${heading} <${Icon.name} />`
    );
  });

  return markdown;
};

export const getIELTSEssayIcon = (section: string) => {
  const icons = {
    Introduction: BookOpen,
    Definition: BookMarked,
    Benefits: Lightbulb,
    Barriers: AlertTriangle,
    Solutions: CheckCircle,
    Conclusion: GraduationCap,
    "Vocabulary Breakdown": Target,
  };

  return icons[section as keyof typeof icons] || BookCheck;
};

export interface MarkdownHTMLOptions {
  includeIcons?: boolean;
  collapsible?: boolean;
  theme?: "light" | "dark";
}

export const convertToMarkdownHTML = (
  text: string,
  options: MarkdownHTMLOptions = {
    includeIcons: true,
    collapsible: false,
    theme: "light",
  }
): string => {
  // Split the text into lines
  const lines = text.split("\n");
  let html = "";
  let currentListType: "ul" | "ol" | null = null;

  lines.forEach((line, index) => {
    // Handle headings
    if (line.startsWith("## ")) {
      const headingText = line.replace("## ", "");
      const icon = options.includeIcons ? getIELTSEssayIcon(headingText) : null;
      const iconHtml = icon ? `<${icon.name} class="icon" />` : "";

      if (options.collapsible) {
        html += `
          <div class="collapsible-section">
            <button class="collapsible-header">
              <h2>${headingText}</h2>
              ${iconHtml}
              <${ChevronDown.name} class="chevron" />
            </button>
            <div class="collapsible-content">
        `;
      } else {
        html += `<h2>${iconHtml} ${headingText}</h2>`;
      }
    }
    // Handle bold text
    else if (line.includes("**")) {
      const boldText = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      html += `<p>${boldText}</p>`;
    }
    // Handle lists
    else if (line.startsWith("- ")) {
      if (currentListType !== "ul") {
        if (currentListType) html += `</${currentListType}>`;
        html += "<ul>";
        currentListType = "ul";
      }
      const listItem = line.replace("- ", "");
      html += `<li><${ChevronRight.name} class="list-icon" /> ${listItem}</li>`;
    } else if (/^\d+\./.test(line)) {
      if (currentListType !== "ol") {
        if (currentListType) html += `</${currentListType}>`;
        html += "<ol>";
        currentListType = "ol";
      }
      const listItem = line.replace(/^\d+\.\s*/, "");
      html += `<li>${listItem}</li>`;
    }
    // Handle regular paragraphs
    else if (line.trim()) {
      if (currentListType) {
        html += `</${currentListType}>`;
        currentListType = null;
      }
      html += `<p>${line}</p>`;
    }
  });

  // Close any open list
  if (currentListType) {
    html += `</${currentListType}>`;
  }

  // Add CSS styles
  const styles = `
    <style>
      .markdown-content {
        font-family: system-ui, -apple-system, sans-serif;
        line-height: 1.6;
        color: ${options.theme === "dark" ? "#e2e8f0" : "#1a202c"};
      }
      .icon {
        width: 1.2em;
        height: 1.2em;
        vertical-align: middle;
        margin-right: 0.5em;
      }
      .list-icon {
        width: 1em;
        height: 1em;
        vertical-align: middle;
        margin-right: 0.5em;
      }
      .collapsible-section {
        margin-bottom: 1em;
      }
      .collapsible-header {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 0.5em;
        background: ${options.theme === "dark" ? "#2d3748" : "#f7fafc"};
        border: none;
        cursor: pointer;
      }
      .collapsible-header h2 {
        margin: 0;
        flex-grow: 1;
      }
      .chevron {
        width: 1em;
        height: 1em;
        transition: transform 0.3s;
      }
      .collapsible-header.active .chevron {
        transform: rotate(180deg);
      }
      .collapsible-content {
        padding: 1em;
        display: none;
      }
      .collapsible-content.active {
        display: block;
      }
      strong {
        color: ${options.theme === "dark" ? "#63b3ed" : "#3182ce"};
      }
      ul, ol {
        padding-left: 1.5em;
      }
      li {
        margin-bottom: 0.5em;
      }
    </style>
  `;

  return `
    <div class="markdown-content">
      ${styles}
      ${html}
    </div>
  `;
};

export const getMarkdownHTMLIcon = (type: string): string => {
  const icons = {
    heading: Heading1,
    list: List,
    "ordered-list": ListOrdered,
    bold: Bold,
    italic: Italic,
    link: Link,
    image: Image,
    code: Code,
    quote: Quote,
  };

  const Icon = icons[type as keyof typeof icons] || BookCheck;
  return `<${Icon.name} class="icon" />`;
};
