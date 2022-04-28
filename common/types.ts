export type FishPostResponse = {
  msg: string;
};

export type FishPutResponse = {
  msg: string;
};

export type Fish = {
  name: string;
  avg_length: number;
  fish_id: number;
  contributor_name: string;
  contributor_id: string;
};

export type GetFishResponse = {
  rows: Fish[];
  errors: string[] | null;
};
