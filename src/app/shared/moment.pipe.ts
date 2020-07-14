import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'moment',
    pure: false
})
export class MomentPipe implements PipeTransform {
    transform(m: moment.Moment, format: string = 'MMMM YYYY'): string {
        const date = m.format(format);
        return date[0].toUpperCase() + date.slice(1);
    }
}
