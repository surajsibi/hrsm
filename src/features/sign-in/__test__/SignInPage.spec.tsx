/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SignInPage } from '@/features/sign-in/SignInPage';

// ---------------- MOCK: Router -----------------
const push = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push,
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
}));

// ---------------- MOCK: Zustand Store -----------------
const mockSetUser = jest.fn();

jest.mock('@/store/auth.store', () => ({
  useAuthStore: jest.fn(selector =>
    selector({
      user: null,
      setUser: mockSetUser,
    })
  ),
}));

// ---------------- MOCK: login() -----------------
const mockLogin = jest.fn();

jest.mock('@/actions/login', () => ({
  login: (...args: string[]) => mockLogin(...args),
}));

// ---------------- MOCK: NextAuth signIn() -----------------
const mockSignIn = jest.fn();

jest.mock('next-auth/react', () => ({
  __esModule: true,
  signIn: (...args: string[]) => mockSignIn(...args),
}));

// ---------------- MOCK: SignInForm -----------------
interface SubmitFormProps {
  email: string;
  password: string;
  onSubmit: (_formData: { email: string; password: string }) => void;
}

// ...

jest.mock('@/features/sign-in/SignInForm', () => ({
  SignInForm: ({ onSubmit }: SubmitFormProps) => (
    <button onClick={() => onSubmit({ email: 'test@gmail.com', password: '123456' })}>
      Submit
    </button>
  ),
}));

// ---------------- TESTS -----------------
describe('SignInPage', () => {
  it('logs in, sets user, calls signIn, and redirects', async () => {
    mockLogin.mockResolvedValue({
      success: true,
      user: {
        id: '1',
        name: 'Test User',
        email: 'test@gmail.com',
      },
      tokens: {
        accessToken: 'abc123',
        refreshToken: 'xyz999',
      },
    });

    mockSignIn.mockResolvedValue({
      ok: true,
      status: 200,
      error: null,
    });

    render(<SignInPage />);

    await userEvent.click(screen.getByText('Submit'));

    // login() called
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@gmail.com',
      password: '123456',
    });

    // setUser() called
    expect(mockSetUser).toHaveBeenCalledWith({
      id: '1',
      name: 'Test User',
      email: 'test@gmail.com',
    });

    // NextAuth signIn() called
    expect(mockSignIn).toHaveBeenCalledWith('credentials', {
      redirect: false,
      accessToken: 'abc123',
      refreshToken: 'xyz999',
    });

    // router.push() called
    expect(push).toHaveBeenCalledWith('/dashboard');
  });
});
