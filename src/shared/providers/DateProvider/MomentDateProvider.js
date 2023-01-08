const moment = require('moment');

class MomentDateProvider {
  anValidRetunTime(endDate, quantity, typeCompare) {
    const limitDate = moment().add(quantity, typeCompare);

    if (moment(endDate) < limitDate) {
      return false;
    }

    return true;
  }

  dateNow() {
    const date = moment().toDate();
    return date;
  }

  compareInHours(initialDate, finalDate) {
    const compare = moment(initialDate).diff(moment(finalDate), 'hours');
    return compare;
  }

  compareInDays(initialDate, finalDate) {
    const compare = moment(initialDate).diff(moment(finalDate), 'days');
    return compare;
  }

  addDay(days) {
    const date = moment().add(days, 'days').toDate();
    return date;
  }

  addHours(hours) {
    const date = moment().add(hours, 'hours').toDate();
    return date;
  }

  compareIfBefore(comparedDate, currentDate) {
    return moment(comparedDate).isBefore(moment(currentDate));
  }

  checkDate(date, type) {
    if (type === 'D') {
      return {
        initialDate: moment(date).startOf('day').toDate(),
        finalDate: moment(date).endOf('day').toDate(),
      };
    }
    if (type === 'W') {
      return {
        initialDate: moment(date).startOf('week').toDate(),
        finalDate: moment(date).endOf('week').toDate(),
      };
    }
    if (type === 'M') {
      return {
        initialDate: moment(date).startOf('month').toDate(),
        finalDate: moment(date).endOf('month').toDate(),
      };
    }
    if (type === 'Y') {
      return {
        initialDate: moment(date).startOf('year').toDate(),
        finalDate: moment(date).endOf('year').toDate(),
      };
    }

    return {
      initialDate: moment().startOf('day').toDate(),
      finalDate: moment().endOf('day').toDate(),
    };
  }
}

module.exports = MomentDateProvider;
