import moment from 'moment';

type DurationUnitType =
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'weeks'
  | 'months'
  | 'years';

export const getTimeText = (
  createdAt: string,
  t: (key: string, options: { time: number }) => string
): string => {
  const timeAgo = moment(createdAt);
  const now = moment();
  const elapsedSeconds = now.diff(timeAgo, 'seconds');

  const timeIntervals: { limit: number; unit: DurationUnitType; singular?: string }[] = [
    { limit: 60, unit: 'seconds', singular: 'aFewSeconds' },
    { limit: 60 * 60, unit: 'minutes' },
    { limit: 24 * 60 * 60, unit: 'hours' },
    { limit: 7 * 24 * 60 * 60, unit: 'days' },
    { limit: 30 * 24 * 60 * 60, unit: 'weeks' },
    { limit: 12 * 30 * 24 * 60 * 60, unit: 'months' },
    { limit: Infinity, unit: 'years' },
  ];

  let timeKey = '';
  let timeValue = 0;

  for (const interval of timeIntervals) {
    if (elapsedSeconds < interval.limit) {
      timeValue = moment.duration(elapsedSeconds, 'seconds').as(interval.unit);
      timeKey = interval.singular && timeValue < 10 ? interval.singular : interval.unit;
      break;
    }
  }

  return t(`screens.home.postCard.time.ago.${timeKey}`, {
    time: Math.floor(timeValue),
  });
};
