export type RegistrationBody = Omit<UserEntity, 'userId' | 'role'> & {
    passwordConfirmation: string,
};

export type Credentials = {
    username: string,
    password: string,
};

export type UserData = Omit<RegistrationBody, 'passwordConfirmation'>;

export type UserViewModel = Omit<UserEntity, 'password'>;

export type AuthResponse = {
    user: UserViewModel,
    token: string
};
