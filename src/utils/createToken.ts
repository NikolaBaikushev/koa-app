

import { config } from '../../config';
import jwt from 'jsonwebtoken';
import { UserRole } from '../schemas/models/userEntitySchema';

export type JwtTokenPayload = {
    id: number,
    username: string,
    role: UserRole
}

export function createToken(payload: JwtTokenPayload) {
    return jwt.sign(payload, config.SECRET, { expiresIn: '1h' });
}