import type { FlatSelector } from "../../types.ts";
import { groupImportsBySelector } from "../groupImportsBySelector.ts";
import { css } from "./css.js";

export function makeHtml(allSelectors: FlatSelector[]) {
  const groupedSelectors = Object.values(groupImportsBySelector(allSelectors));
  const list = groupedSelectors
    .map(({ selector, path, consumers }) => {
      return `
        <details>
          <summary><strong>${selector}</strong><span>${path}</span></summary>
          <ul>
            ${Object.values(consumers)
              .map(
                (consumer) =>
                  `<li>${consumer.componentName}: ${consumer.path}</li>`
              )
              .join("\n")}
          </ul>
        </details>
      `;
    })
    .join("\n");

  return `
    <html>
      <head>
        <title>Selectors</title>
        <style>${css}</style>
        <style>
          body {
            padding: 3rem 3rem;
          }
          div {
            display: inline;
          }
          details {
            padding: 1rem 3rem;
            margin-bottom: 1rem;
            border: 1px solid #ccc;
          }
          strong {
            font-size: 2rem;
          }
          ul {
            margin-top: 1rem;
          }
          summary {
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <h1>Selectors and the things that use them</h1>
        ${list}
      </body>
    </html>
  `;
}
