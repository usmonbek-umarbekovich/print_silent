// index.js
const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const path = require('path');
const printer = require('pdf-to-printer');

const app = express();
const PORT = 3500; // Fixed local port

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/pdf', express.static(path.join(__dirname, 'public')));

app.post('/print-silent', async (req, res) => {
  const { html, width, height } = req.body;
  const outputPath = path.join(__dirname, 'public', 'output-silent.pdf');

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    await page.pdf({
      path: outputPath,
      width: width || '72.1mm',
      height: height || '297mm',
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
    });

    await browser.close();
    await printer.print(outputPath);

    res.json({ success: true, message: 'Printed successfully' });
  } catch (error) {
    console.error('Silent print failed:', error);
    res.status(500).json({ error: 'Failed to print' });
  }
});

app.listen(PORT, () => {
  console.log(`Silent print service running at http://localhost:${PORT}`);
});
