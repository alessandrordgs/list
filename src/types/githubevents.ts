export interface IGitHubEvents {
  id: string;
  type: string;
  actor: {
    id: number;
    login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    ref: string;
    ref_type: string;
    master_branch: string;
    description: string;
    pusher_type: string;
  };
  public: boolean;
  created_at: string;
}