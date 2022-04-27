export type FishPostResponse = {
  msg: string;
};

export type Fish = {
  name: string;
  avg_length: number;
};

export type GetFishResponse = {
  rows: Fish[]
  errors: string[] | null
};
