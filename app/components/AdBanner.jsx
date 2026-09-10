"use client";

export default function AdBanner() {
  const adHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background: transparent;
            min-height: 100px;
          }
        </style>
      </head>
      <body>
        <div id="container-41ed1e7c5d965345f47f0bf502ff0908"></div>
        <script async="async" data-cfasync="false" src="https://pl31273171.profitableratecpmnetwork.com/41ed1e7c5d965345f47f0bf502ff0908/invoke.js"></script>
      </body>
    </html>
  `;

  return (
    <div className="w-full flex justify-center items-center my-6 overflow-hidden">
      <iframe
        title="Sponsored Ad"
        srcDoc={adHtml}
        style={{
          width: "100%",
          maxWidth: "728px",
          height: "120px",
          border: "none",
          overflow: "hidden",
        }}
        scrolling="no"
      />
    </div>
  );
}
