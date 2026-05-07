import { api } from "@/constants/api";
import { httpClient } from "@/utils/axios";
import { errorNotification, successNotification } from "@/utils/toast";
import TokenService, { TokenDetails } from "@/utils/token";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

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

// --- API endpoints (add to your existing api object) ---
// api.superAdminLogin = "/api/v1/super-admin/login"
// api.superAdminRegister = "/api/v1/super-admin/register"
// api.loginClient = "/api/v1/auth/client/login"
// api.registerClient = "/api/v1/auth/register/client"
// api.registerSolo = "/api/v1/auth/register/solo"
// api.login (existing) = "/api/v1/auth/login"  ← solo login

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

// --- Signup ---
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
