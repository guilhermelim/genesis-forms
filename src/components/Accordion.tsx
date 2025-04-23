"use client";
import { useState } from "react";
import Markdown from "./Markdown";

interface AccordionItem {
  title: string;
  content: string | string[];
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border rounded-lg overflow-hidden">
          <button
            className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <h3 className="font-medium text-gray-900">{item.title}</h3>
            <span className="text-gray-500">
              {openIndex === index ? "−" : "+"}
            </span>
          </button>
          {openIndex === index && (
            <div className="p-4 bg-white text-gray-700 text-justify">
              {Array.isArray(item.content) ? (
                item.content.map((paragraph, i) => (
                  <div
                    key={i}
                    className={i !== item.content.length - 1 ? "mb-5" : ""}
                  >
                    <Markdown>{paragraph}</Markdown>
                  </div>
                ))
              ) : (
                <Markdown>{item.content}</Markdown>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
