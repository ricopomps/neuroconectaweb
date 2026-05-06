export type CreateInstitutionRequest = {
  name: string;
  address?: string;
  city?: string;
  state?: string;
  phone?: string;
  email?: string;
};

export type UpdateInstitutionRequest = {
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  phone?: string;
  email?: string;
};
