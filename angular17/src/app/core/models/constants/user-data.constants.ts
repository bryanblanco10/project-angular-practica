/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-spread */
export const ARRAY_GENDER = [
  { name: 'Femenino', value: 'female' },
  { name: 'Masculino', value: 'male' },
];
export const MAX_YEAR = 14;

export const MONTH_DAYS = Array.apply(null, Array(31)).map(
  (value: any, i: number) => ({ name: i + 1, value: i + 1 })
);

export const MONTH_NAMES = [
  { name: 'Enero', value: 0 },
  { name: 'Febrero', value: 1 },
  { name: 'Marzo', value: 2 },
  { name: 'Abril', value: 3 },
  { name: 'Mayo', value: 4 },
  { name: 'Junio', value: 5 },
  { name: 'Julio', value: 6 },
  { name: 'Agosto', value: 7 },
  { name: 'Septiembre', value: 8 },
  { name: 'Octubre', value: 9 },
  { name: 'Noviembre', value: 10 },
  { name: 'Diciembre', value: 11 },
];

export const YEARS = Array.apply(
  null,
  Array(
    new Date().getFullYear() - MAX_YEAR - (new Date().getFullYear() - 150) + 1
  )
    .fill(0)
    .map(
      (item: number, index: number) => new Date().getFullYear() - 150 + index
    )
)
  .sort((a: any, b: any) => b - a)
  .map((year: any) => ({ name: year, value: year }));
