import api from "./request";
import { User } from "@/types/user";

export interface GetUserRequest {
  account: string;
  password: string;
}

export async function GetUserInfo(args: GetUserRequest): Promise<User> {
  // exp: do request and return user
  // const res = await api.get("/api/login", {
  //   params: {
  //     account: args.account,
  //     password: args.password,
  //   },
  // });
  const res = {
    id: 1,
    name: "admin",
    role: "admin",
    token: "jwt",
  };

  return res;
}
