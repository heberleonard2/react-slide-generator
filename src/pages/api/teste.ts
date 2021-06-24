import type { NextApiRequest, NextApiResponse } from 'next';
import pptxgen from 'pptxgenjs';
import fs from 'fs';
const path = require('path');

export default (req: NextApiRequest, res: NextApiResponse) => {
  let pptx = new pptxgen();
  pptx.author = 'Brent Ely';
  pptx.company = 'S.T.A.R. Laboratories';
  pptx.subject = 'Annual Report';
  pptx.title = 'PptxGenJS Sample Presentation';

  pptx.defineSlideMaster({
    title: 'TITLE_SLIDE',
    objects: [
      {
        rect: { x: 0.0, y: 1.3, w: '100%', h: 0.75, fill: { color: 'F1F1F1' } }
      },
      {
        text: {
          text: 'Global IT & Services :: Status Report',
          options: {
            x: 0.0,
            y: 1.3,
            w: 5.5,
            h: 0.75,
            fontFace: 'Arial Black',
            fontSize: 20,
            color: '363636',
            valign: 'middle',
            margin: 0
          }
        }
      }
    ]
  });

  // 2:
  pptx.defineSlideMaster({
    title: 'MASTER_SLIDE',
    background: { fill: 'F1F1F1' },
    slideNumber: { x: 1.0, y: 7.0, color: 'FFFFFF' },
    margin: [0.5, 0.25, 1.25, 0.25],
    objects: [
      {
        rect: { x: 0.0, y: 6.9, w: '100%', h: 0.6, fill: { color: '003b75' } }
      },
      {
        text: {
          text: 'S.T.A.R. Laboratories',
          options: {
            x: 0,
            y: 6.9,
            w: '100%',
            h: 0.6,
            align: 'center',
            valign: 'middle',
            color: 'FFFFFF',
            fontSize: 12
          }
        }
      }
    ]
  });

  // 3:
  pptx.defineSlideMaster({
    title: 'THANKS_SLIDE',
    background: { fill: '36ABFF' },
    objects: [
      {
        rect: { x: 0.0, y: 3.4, w: '100%', h: 2.0, fill: { color: 'ffffff' } }
      },
      {
        text: {
          text: 'Thank You!',
          options: {
            x: 0.0,
            y: 0.9,
            w: '100%',
            h: 1,
            fontFace: 'Arial',
            color: 'FFFFFF',
            fontSize: 60,
            align: 'center'
          }
        }
      }
    ]
  });

  const numSlides = 20;

  for (let i = 0; i < numSlides; i++) {
    let slide: pptxgen.Slide;
    if (i === 0) {
      slide = pptx.addSlide({
        masterName: 'TITLE_SLIDE',
        sectionTitle: 'Masters'
      });

      slide.background = {
        path: 'https://guiadoensino.com.br/wp-content/uploads/2020/01/guerra-fria-noticias-ao-minuto.jpg'
      };
    } else if (i === numSlides - 1) {
      slide = pptx.addSlide({
        masterName: 'THANKS_SLIDE',
        sectionTitle: 'Masters'
      });
    } else {
      slide = pptx.addSlide({
        masterName: 'MASTER_SLIDE',
        sectionTitle: 'Masters'
      });
    }

    slide.addText('How To Create PowerPoint Presentations with JavaScript', {
      x: 0.5,
      y: 0.7,
      fontSize: 18
    });
  }

  // 4. Save the pptxentation
  pptx.writeFile({ fileName: 'Sample pptxentation.pptx' });

  res.status(200).json({ message: 'sucess' });

  // const dirPath = path.join(__dirname, '..', '..', '..', '..', 'file.txt');

  // try {
  //   fs.unlinkSync(dirPath);
  //   //file removed
  // } catch (err) {
  //   console.error(err);
  // }
};
