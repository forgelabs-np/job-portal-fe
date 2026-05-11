import { api } from "@/constants/api";
import { ApiResponse } from "@/shared/types/response";
import type { CurrentUser } from "@/shared/types/auth/currentUser";
import { useCurrentUserStore } from "@/store/currentUserStore";
import { httpClient } from "@/utils/axios";
import { errorNotification, successNotification } from "@/utils/toast";
import TokenService from "@/utils/token";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import router from "next/router";

export const getCurrentUser = () => {
  return httpClient.get<ApiResponse<CurrentUser>>(api.AUTH.ME);
};

export const postLogout = (refreshToken: string) => {
  return httpClient.post(api.AUTH.LOGOUT, {
    data: { refreshToken },
  });
};

export const fetchAndStoreCurrentUser = async () => {
  const { setProfile, setProfileLoading, clearProfile } =
    useCurrentUserStore.getState();
  setProfileLoading(true);
 
  try {
    const res = await getCurrentUser();
    const profile = res.data?.data;
    if (profile) {
      setProfile(profile);
      console.log(profile, "clearProfile");
    } else {
      clearProfile();
    }
  } catch {
    clearProfile();
  } finally {
    setProfileLoading(false);
  }
};

export const useLogoutUserMutation = () => {
  return useMutation({
    mutationFn: () => postLogout(TokenService.getToken()?.refresh_token ?? ""),
    onSuccess: () => {
      useCurrentUserStore.getState().clearProfile();
      TokenService.clearToken();
      successNotification("Logged out successfully");
      router.push("/login");
    },
    onError: () => {
      TokenService.clearToken();
      useCurrentUserStore.getState().clearProfile();
    },
  });
};
export interface LoginDetails {
  email: string;
  password: string;
}
export interface SignupDetails {
  fullName: string;
  email: string;
  roleEnums: ["ADMIN"] | ["AGENCY"];
  password: string;
}

export interface VerifySignupDetails {
  email: string;
  otp: string;
}

export type LoginType = "agency" | "admin";

const loginEndpointMap: Record<LoginType, string> = {
  agency: api.AUTH.AGENCY_LOGIN,
  admin: api.AUTH.ADMIN_LOGIN,
};

const initLogin = (data: LoginDetails, type: LoginType) => {
  return httpClient.post(loginEndpointMap[type], { data });
};

export const useLoginMutation = (type: LoginType) => {
  return useMutation({
    mutationFn: (data: LoginDetails) => {
      console.log("MUTATION CALLED", data);
      return initLogin(data, type);
    },
    onSuccess: (response) => {
      if (response?.data?.data?.accessToken) {
        const tokens = {
          access_token: response.data.data.accessToken,
          refresh_token: response.data.data.refreshToken,
        };
        TokenService.setToken(tokens);
        localStorage.setItem(
          "lastLoginRole",
          TokenService.getTokenDetails()?.roles?.[0] ?? "",
        );
      } else {
        successNotification("OTP sent to your device");
      }
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string; error: string }>;
      errorNotification(
        err.response?.data?.message ??
          err.response?.data?.error ??
          "Login failed!",
      );
    },
  });
};

const initSignup = (data: SignupDetails) => {
  return httpClient.post(api.AUTH.REGISTER, { data });
};

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: (data: SignupDetails) => initSignup(data),
    onSuccess: () => {
      successNotification("Account created successfully");
    },
    onError: (error) => {
      const err = error as AxiosError<{ message?: string; error?: string }>;
      errorNotification(
        err.response?.data?.message ??
          err.response?.data?.error ??
          "Signup failed!",
      );
    },
  });
};

export const verifyEmail = (data: VerifySignupDetails) => {
  return httpClient.post(api.AUTH.VERIFY_REGISTER, { data });
};

export const useVerifySignupMutation = () => {
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      successNotification("Account Verified successfully");
    },
    onError: (error) => {
      const err = error as AxiosError<{ message?: string; error?: string }>;
      errorNotification(
        err.response?.data?.message ??
          err.response?.data?.error ??
          "Signup failed!",
      );
    },
  });
};
// export const initRefreshToken = async () => {
//   try {
//     const response = await httpClient.get<TokenDetails>(api.refreshToken, {
//       params: {
//         refreshToken: TokenService.getToken()?.refresh_token,
//       },
//       headers: {
//         Authorization: "",
//       },
//     });
//     const tokens = {
//       access_token: response.data.access_token,
//       refresh_token: response.data.refresh_token,
//     };
//     TokenService.setToken(tokens);
//     return true;
//   } catch (error) {
//     return false;
//   }
// };

// export const checkAuthentication = async () => {
//   if (TokenService.isAuthenticated()) {
//     const tokenInfo = TokenService.getTokenDetails();

//     if (tokenInfo && tokenInfo.exp * 1000 < Date.now() + 5 * 60 * 1000) {
//       return initRefreshToken();
//     }
//     return Promise.resolve(true);
//   } else if (TokenService.getToken()?.refresh_token) {
//     return initRefreshToken();
//   }
//   return Promise.resolve(null);
// };
