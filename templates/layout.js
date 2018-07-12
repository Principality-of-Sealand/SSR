
module.exports = (title, body, styles, scripts) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" href="/style.css">
      <title>${title}</title>
    ${styles}
    </head>
    <body>
    ${body}
    </body>
    ${scripts}
  </html>
`;
