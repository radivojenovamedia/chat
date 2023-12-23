import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  cryptData(data: string) {
    return new Promise<string>((resolve, reject) => {
      bcrypt
        .genSalt()
        .then((salt) => {
          bcrypt
            .hash(data, salt)
            .then((hashedData) => {
              resolve(hashedData);
            })
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });
  }
  decryptData(hash: string, data: string) {
    return bcrypt.compare(data, hash);
  }
}
