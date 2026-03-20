import EditorJSHTML from "editorjs-html";
import DOMPurify from "dompurify";

const editorJsHtml = EditorJSHTML({
  /* ================= IMAGE ================= */
  image: (block) => {
    const url = block.data?.file?.url || block.data?.url;
    const caption = block.data?.caption || "";

    if (!url) return "";

    return `
      <figure class="editor-image">
        <img src="${url}" alt="" width="90%" />
        ${caption ? `<figcaption>${caption}</figcaption>` : ""}
      </figure>
    `;
  },

  /* ================= VIDEO ================= */
  video: (block) => {
    const url = block.data?.file?.url;
    const caption = block.data?.caption || "";

    if (!url) return "";

    return `
      <div class="video-block">
        <video controls style="width:100%; max-height:500px;">
          <source src="${url}" type="video/mp4" />
        </video>
        ${caption ? `<p class="caption">${caption}</p>` : ""}
      </div>
    `;
  },
  embed: (block) => {
    const { embed, caption, width, height } = block.data;

    if (!embed) return "";

    return `
          <div class="embed-block">
            <iframe 
              src="${embed}"
              width="${width || "100%"}"
              height="${height || 400}"
              frameborder="0"
              allowfullscreen>
            </iframe>
            ${caption ? `<p class="caption">${caption}</p>` : ""}
          </div>
        `;
  },
  table: (block) => {
    const rows = block.data.content
      .map(
        (row) =>
          `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`
      )
      .join("");

    return `
      <div class="table-wrapper">
        <table border="1" style="width:100%; border-collapse:collapse;">
          ${rows}
        </table>
      </div>
    `;
  },
});

export function parseEditorJsToHtml(data) {
  if (!data || !data.blocks) return "";

  const parsed = editorJsHtml.parse(data);

  const html = Array.isArray(parsed) ? parsed.join("") : parsed;

  return DOMPurify.sanitize(html, {
    ADD_TAGS: ["video", "source", "img", "figure", "figcaption", "iframe"],
    ADD_ATTR: [
      "controls",
      "src",
      "type",
      "alt",
      "style",
      "width",
      "height",
      "frameborder",
      "allow",
      "allowfullscreen"

    ],
  });
}