import { PipeTransform, Pipe } from '@angular/core';
import { HighlithedSelection } from '@app/shared/services/highlighter.service';

@Pipe({
  name: 'highlightFilter'
})
export class HighlightFilterPipe implements PipeTransform {
  transform(highlights: HighlithedSelection[], filters: string[]) {
    if (!highlights) {
      return [];
    }

    if (!(filters && filters.length)) {
      return highlights;
    }
    const highlighstsResult = highlights.filter(highlight => {
      return filters.some(filter => {
        return highlight.classNameColor.includes(filter);
      });
    });

    return highlighstsResult;
  }
}
