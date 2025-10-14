

import { config } from "../../config";
import jwt from 'jsonwebtoken';

type CreateTokenPayload = {
    id: number,
    username: string,
}

export function createToken(payload: CreateTokenPayload) {
    return jwt.sign(payload, config.SECRET, { expiresIn: '1h' })
}