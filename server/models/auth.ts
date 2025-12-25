import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type AuthUser = {
  id: string;
  email: string;
  user_metadata?: Record<string, unknown>;
};

export type AuthSession = {
  user: AuthUser | null;
  session: unknown | null;
};

export type Subject = {
  id: string;
  email: string;
  role: "visitor" | "user" | "admin";
};

/**
 * Sign up a new user with email and password
 */
export async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, user: data.user, session: data.session };
  } catch (error) {
    console.error("Sign up error:", error);
    throw error;
  }
}

/**
 * Sign in a user with email and password
 */
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, user: data.user, session: data.session };
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
}

/**
 * Sign out the current user
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
}

/**
 * Get the current authenticated user
 */
export async function getCurrentUser() {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      throw new Error(error.message);
    }

    return user;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
}

/**
 * Get the current session
 */
export async function getSession() {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw new Error(error.message);
    }

    return session;
  } catch (error) {
    console.error("Get session error:", error);
    return null;
  }
}

/**
 * Reset password for a user
 */
export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  } catch (error) {
    console.error("Reset password error:", error);
    throw error;
  }
}

/**
 * Update password for the current user
 */
export async function updatePassword(newPassword: string) {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, user: data.user };
  } catch (error) {
    console.error("Update password error:", error);
    throw error;
  }
}
