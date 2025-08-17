import { UserProfile } from '@/types/user';
// Note: This service is now primarily for utility functions
// Authentication is handled by NextAuth with database

export interface AuthenticationResult {
  success: boolean;
  user?: UserProfile;
  error?: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export class AuthenticationService {
  /**
   * Authenticates a user with email and password
   * @param credentials - User credentials
   * @returns AuthenticationResult with success status and user data or error
   *
   * Note: This method is deprecated. Authentication is now handled by NextAuth.
   * This method is kept for backward compatibility but always returns an error.
   */
  public async authenticateUser(
    credentials: Credentials
  ): Promise<AuthenticationResult> {
    console.warn(
      'AuthenticationService.authenticateUser is deprecated. Use NextAuth instead.'
    );
    return {
      success: false,
      error:
        'Autentisering hanteras nu av NextAuth. Använd signIn från next-auth/react istället.',
    };
  }

  /**
   * Validates if credentials are properly formatted
   * @param credentials - User credentials to validate
   * @returns boolean indicating if credentials are valid
   */
  private isValidCredentials(credentials: Credentials): boolean {
    if (!credentials?.email || !credentials?.password) {
      return false;
    }

    const sanitizedEmail = this.sanitizeInput(credentials.email);
    const sanitizedPassword = this.sanitizeInput(credentials.password);

    return !!(
      sanitizedEmail.length > 0 &&
      sanitizedPassword.length > 0 &&
      this.isValidEmail(sanitizedEmail)
    );
  }

  /**
   * Validates email format
   * @param email - Email to validate
   * @returns boolean indicating if email is valid
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validates password strength
   * @param password - Password to validate
   * @returns boolean indicating if password meets minimum requirements
   */
  public validatePasswordStrength(password: string): boolean {
    // Minimum 8 characters, at least one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  /**
   * Sanitizes user input to prevent injection attacks
   * @param input - User input to sanitize
   * @returns sanitized input
   */
  public sanitizeInput(input: string): string {
    return input.trim().replace(/[<>]/g, '');
  }

  /**
   * Creates a standardized error message
   * @param error - Error object or message
   * @returns standardized error message
   */
  private createErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'Ett okänt fel uppstod';
  }

  /**
   * Validates if a user has a specific role
   * @param user - User profile to check
   * @param requiredRole - Role required for access
   * @returns boolean indicating if user has required role
   */
  public hasRequiredRole(user: UserProfile, requiredRole: string): boolean {
    return user.role === requiredRole;
  }

  /**
   * Checks if user is an admin
   * @param user - User profile to check
   * @returns boolean indicating if user is admin
   */
  public isAdmin(user: UserProfile): boolean {
    return this.hasRequiredRole(user, 'admin');
  }
}
