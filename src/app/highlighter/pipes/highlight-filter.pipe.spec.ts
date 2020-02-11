import { HighlightFilterPipe } from './highlight-filter.pipe';
import { HighlithedSelection } from '@app/shared/modules/input-text-area/models';

describe('HighlightFilterPipe', () => {
  let pipe: HighlightFilterPipe;

  const mockHighlights: HighlithedSelection[] = [
    {
      start: 0,
      end: 4,
      text: 'some Text',
      classNameColor: 'highlight-red'
    },
    {
      start: 5,
      end: 10,
      text: 'Text Two',
      classNameColor: 'highlight-green'
    }
  ];

  beforeEach(() => {
    pipe = new HighlightFilterPipe();
  });

  describe('transform', () => {
    it('should get an empty array if highlights is null', () => {
      const highlights = pipe.transform(null, []);
      expect(highlights.length).toBe(0);
    });

    it('should get an empty array if highlights is undefined', () => {
      const highlights = pipe.transform(undefined, []);
      expect(highlights.length).toBe(0);
    });

    it('should no alter highlight list if filter is empty', () => {
      const highlights = pipe.transform(mockHighlights, []);
      expect(highlights.length).toBe(2);
    });

    it('should no alter highlight list if filter is undefined', () => {
      const highlights = pipe.transform(mockHighlights, undefined);
      expect(highlights.length).toBe(2);
    });

    it('should no alter highlight list if filter is null', () => {
      const highlights = pipe.transform(mockHighlights, undefined);
      expect(highlights.length).toBe(2);
    });

    it('should alter highlight list when there are matches', () => {
      const highlights = pipe.transform(mockHighlights, ['red']);
      expect(highlights.length).toBe(1);
    });
  });
});
