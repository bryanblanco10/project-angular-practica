export interface Country {
  id: number | string;
  code: string;
  name: string;
  languageId: number;
}

export interface State {
  id: string;
  code: string;
  nameEnglish: string;
  nameSpanish: string;
  countryId: string;
}

export interface Department {
  id: string;
  code: string;
  nameEnglish: string;
  nameSpanish: string;
  countryId: string;
  stateId: string;
}

export interface District {
  id: string;
  code: string;
  nameEnglish: string;
  nameSpanish: string;
  countryId: string;
  stateId: string;
  departmentId: string;
}

export interface DialCode {
  dialCode: string;
  name: string;
}

export interface StateSOA {
  id: string;
  value: string;
}
