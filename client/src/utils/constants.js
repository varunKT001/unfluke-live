export const indicatorOptions = [
  {
    name: 'SMA',
    value: 'sma',
    params: [
      {
        name: 'period',
        value: '14',
        default: '14',
      },
    ],
  },
  {
    name: 'PSAR',
    value: 'psar',
    params: [
      {
        name: 'step',
        value: '0.02',
        default: '0.02',
      },
      {
        name: 'max',
        value: '0.2',
        default: '0.2',
      },
    ],
  },
];
