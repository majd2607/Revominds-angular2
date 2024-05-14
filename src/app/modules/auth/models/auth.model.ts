export class AuthModel {
  authToken: string;
  refreshToken: string;
  expiresIn: Date;
  userId: number;
  setAuth(auth: AuthModel) {
    this.authToken = auth.authToken;
    this.refreshToken = auth.refreshToken;
    this.expiresIn = auth.expiresIn;
    this.userId = this.userId;
  }
}
