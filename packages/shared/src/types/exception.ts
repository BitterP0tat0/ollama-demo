export type Exceptions = conflictException | unauthorizedException;
export interface conflictException {
  status: number;
  name: string;
  message: string;
}

export interface unauthorizedException {
  status: number;
  name: string;
  message: string;
}
