export interface ITemplate {
  name: string;
  description?: string;
  items: {
    _idx: number;
    subject: string;
    data: {
      _idx: number;
      value: string;
      belongsTo ?: string;
    }[]
  }[];
  timestamp: Date;
}

export interface IItem {
  _idx: number;
  subject: string;
  data: {
    _idx: number;
    value:string;
  }[]
}

export interface IUserState {
  id: string;
  username: string;
  email: string;
  templates?: {}[];
  token?: string;
}

interface CredentialResponse {
  clientId: string;
  credential: string;
  select_by: string;
}

export type ReactStateSetter = Dispatch<SetStateAction<boolean>>;
export type ReactButtonEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
export type ReactFormEvent = React.FormEvent<HTMLFormElement>;
export type ReactInputChange = React.ChangeEvent<HTMLInputElement>