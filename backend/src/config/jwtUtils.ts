import jwt from 'jsonwebtoken'

export function signJwt(
  object: Object,
  keyName: 'access' | 'refresh',
  options?: jwt.SignOptions | undefined
) {
  let signingKey: string = ''

  if (keyName === 'access') {
    signingKey = process.env.accessTokenPrivateKey as string
  } else {
    signingKey = process.env.refreshTokenPrivateKey as string
  }

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: 'RS256',
  })
}

export function verifyJwt(token: string, keyName: 'access' | 'refresh') {
  let publicKey: string = ''

  if (keyName === 'access') {
    publicKey = process.env.accessTokenPublicKey as string
  } else {
    publicKey = process.env.refreshTokenPublicKey as string
  }

  try {
    const decoded = jwt.verify(token, publicKey)
    return {
      valid: true,
      expired: false,
      decoded,
    }
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    }
  }
}
