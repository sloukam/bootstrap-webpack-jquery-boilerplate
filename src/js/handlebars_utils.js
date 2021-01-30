import Handlebars from 'handlebars';
import moment from 'moment';

Handlebars.registerHelper('dateFormat', function(date, options) {
  const formatToUse =
    (arguments[1] && arguments[1].hash && arguments[1].hash.format) ||
    'D.M.YYYY';
  return moment(date).format(formatToUse);
});

Handlebars.registerHelper('isDefined', function(value) {
  return value !== undefined;
});
