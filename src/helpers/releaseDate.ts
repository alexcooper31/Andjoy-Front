import * as moment from 'moment';

const releaseDateCheck = (date?: number, yearOnly?: boolean) => {
  let format = 'DD/MM/YYYY';
  if (yearOnly) {
    format = 'YYYY';
  }

  if (date === 1000000001) {
    return 'TBA';
  } else if (date) {
    if (moment.unix(date).format(format) === '31/12/1969' || moment.unix(date).format(format) === '1969') {
      return 'Unknown release date';
    } else {
      return moment.unix(date).format(format);
    }
  }  else {
    return 'Unknown release date';
  }
};

export default releaseDateCheck;
