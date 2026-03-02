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

    /* ================= TABLE ================= */
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

/* ================= PARSE FUNCTION ================= */
export function parseEditorJsToHtml(data) {
    if (!data || !data.blocks) return "";

    const parsed = editorJsHtml.parse(data);

    // 🔥 QUAN TRỌNG: parse có thể trả string hoặc array
    const html = Array.isArray(parsed) ? parsed.join("") : parsed;

    return DOMPurify.sanitize(html, {
        ADD_TAGS: ["video", "source", "img", "figure", "figcaption"],
        ADD_ATTR: [
            "controls",
            "src",
            "type",
            "alt",
            "style",
        ],
    });
}