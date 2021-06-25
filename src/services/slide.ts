import Pptxgen from 'pptxgenjs';

interface Sentences {
  content: string;
  keywords: string[];
  images: string[];
}
interface Topics {
  title: string;
  subtitle: string;
  sentences: Sentences[];
}
interface SlideProps {
  topics: Topics[];
  references: string[];
}

export default async function createSlide({
  topics
}: SlideProps): Promise<void> {
  const pptx = new Pptxgen();
  pptx.author = 'Héber';
  pptx.company = 'Slide Generator';
  pptx.subject = 'Tema do slide';
  pptx.title = 'Tema do slide apresentação';

  pptx.defineSlideMaster({
    title: 'TITLE_SLIDE',
    objects: [
      {
        rect: { x: 0.0, y: 1.3, w: '100%', h: 0.75, fill: { color: 'F1F1F1' } }
      },
      {
        text: {
          text: 'Guerra Fria',
          options: {
            x: 1.0,
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

  let slide: Pptxgen.Slide;

  slide = pptx.addSlide({
    masterName: 'TITLE_SLIDE'
  });
  slide.background = {
    path: 'https://lh5.googleusercontent.com/-sWTC2hdb7HY/TXRFfsqSFZI/AAAAAAAAAdQ/Y6H0Zvy3ia0/s1600/guerra+fria+corrida+armamentista+gorbachev+uniao+sovietica+urss+corrida+armamentista.jpg'
  };

  topics.forEach(topic => {
    topic.sentences.forEach(sentence => {
      slide = pptx.addSlide({
        masterName: 'MASTER_SLIDE'
      });
      slide.addText(topic.title, {
        x: 0.5,
        y: 0.7,
        fontSize: 18
      });
      slide.addText(sentence.content, {
        x: 1.5,
        y: 1.7,
        fontSize: 18
      });
    });
  });

  slide = pptx.addSlide({
    masterName: 'THANKS_SLIDE'
  });

  // 4. Save the pptxentation
  pptx.writeFile({ fileName: 'Sample pptxentation.pptx' });
}
