export class AuthConfig {
  private static instance: AuthConfig;
  private readonly secret: string;
  private readonly url: string;

  private constructor() {
    this.secret =
      process.env.NEXTAUTH_SECRET ||
      '001d861c33f9d79a558db7035cada2f8e672bccb9304c97314ac332052a8019f';
    this.url = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  }

  /**
   * Get singleton instance of AuthConfig
   */
  public static getInstance(): AuthConfig {
    if (!AuthConfig.instance) {
      AuthConfig.instance = new AuthConfig();
    }
    return AuthConfig.instance;
  }

  /**
   * Get NextAuth secret
   */
  public getSecret(): string {
    return this.secret;
  }

  /**
   * Get NextAuth URL
   */
  public getUrl(): string {
    return this.url;
  }

  /**
   * Validate configuration
   */
  public validate(): boolean {
    return !!(this.secret && this.url);
  }
}
