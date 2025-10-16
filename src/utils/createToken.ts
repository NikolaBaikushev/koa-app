

import { config } from '../../config';
import jwt from 'jsonwebtoken';

export type JwtTokenPayload = {
    id: number,
    username: string,
}

export function createToken(payload: JwtTokenPayload) {
    return jwt.sign(payload, config.SECRET, { expiresIn: '1h' });
}