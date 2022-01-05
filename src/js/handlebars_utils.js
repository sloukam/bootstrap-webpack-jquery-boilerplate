import Handlebars from 'handlebars';
import moment from 'moment';

Handlebars.registerHelper('dateFormat', function(date, options) {
  const formatToUse =
    (arguments[1] && arguments[1].hash && arguments[1].hash.format) ||
    'D.M.YYYY';
  let momentDate = moment(date);

  if (momentDate.isValid()) return momentDate.format(formatToUse);
  else return date;
  // return moment(date).format(formatToUse);
});

Handlebars.registerHelper('isDefined', function(value) {
  return value !== undefined;
});

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('trimProtocol', function(url) {
  return url.replace(/(^\w+:|^)\/\//, '');
});

