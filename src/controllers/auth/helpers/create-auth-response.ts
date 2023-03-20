import JwtTokenService from 'services/jwt-token-service';
import { AuthResponse } from '../types';

const createAuthResponse = ({ password, ...userViewModel }: UserEntity): AuthResponse => ({
  user: userViewModel,
  token: JwtTokenService.create({
    username: userViewModel.username,
    id: userViewModel.userId,
  }),
});

export default createAuthResponse;
