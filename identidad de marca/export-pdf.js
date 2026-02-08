const puppeteer = require("puppeteer");
const path = require("path");

(async () => {
  const inputHtml = path.resolve(__dirname, "identidad_marca.html");
  const outputPdf = path.resolve(__dirname, "identidad_marca.pdf");

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  // Viewport fijo para que el layout sea estable
  await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 1 });

  await page.goto(`file://${inputHtml}`, { waitUntil: "networkidle0" });

  // Espera a que terminen fuentes/estilos (por si tenés Google Fonts, etc.)
  await page.evaluate(async () => {
    await document.fonts.ready;
  });

  // Medimos el alto REAL del contenido
  const { width, height } = await page.evaluate(() => {
    const body = document.body;
    const html = document.documentElement;

    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    const width = Math.max(
      body.scrollWidth,
      body.offsetWidth,
      html.clientWidth,
      html.scrollWidth,
      html.offsetWidth
    );

    return { width, height };
  });

  await page.pdf({
    path: outputPdf,
    printBackground: true,

    // 👉 Clave: definimos tamaño custom en px y NO usamos format A4
    width: `${Math.max(width, 1400)}px`,
    height: `${height}px`,

    margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" },

    // Evita que Puppeteer intente “acomodar” en páginas
    preferCSSPageSize: false,
  });

  await browser.close();
  console.log("✅ PDF continuo generado:", outputPdf);
})();
