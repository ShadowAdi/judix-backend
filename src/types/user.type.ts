
export interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
  bio?: string;
}

export interface UpdateUserDTO {
  username?: string;
  bio?: string;
}
