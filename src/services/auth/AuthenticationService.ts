import { UserProfile } from '@/types/user';
import { findUserByEmail, verifyPassword } from '@/data/mock-users';

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
   */
  public async authenticateUser(
    credentials: Credentials
  ): Promise<AuthenticationResult> {
    try {
      // Validate input
      if (!this.isValidCredentials(credentials)) {
        console.warn('AuthenticationService: Invalid credentials provided');
        return {
          success: false,
          error: 'Ogiltiga inloggningsuppgifter',
        };
      }

      // Sanitize inputs
      const sanitizedEmail = this.sanitizeInput(credentials.email);

      // Find user by email
      const user = findUserByEmail(sanitizedEmail);
      if (!user) {
        console.warn(
          `AuthenticationService: User not found for email: ${sanitizedEmail}`
        );
        return {
          success: false,
          error: 'Användare hittades inte',
        };
      }

      // Verify password
      const isPasswordValid = await verifyPassword(
        credentials.password,
        user.password
      );
      if (!isPasswordValid) {
        console.warn(
          `AuthenticationService: Invalid password for user: ${sanitizedEmail}`
        );
        return {
          success: false,
          error: 'Felaktigt lösenord',
        };
      }

      // Return successful authentication
      console.log(
        `AuthenticationService: Successful authentication for user: ${sanitizedEmail}`
      );
      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
    } catch (error) {
      console.error('AuthenticationService: Authentication error:', error);
      return {
        success: false,
        error: this.createErrorMessage(error),
      };
    }
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
