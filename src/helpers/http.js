import axios from "axios";
import { API_GET_TOKEN } from "../config";

export async function getToken({ queryKey }) {
  const [, { identity, room }] = queryKey;
  const res = await axios.get(API_GET_TOKEN(identity, room));
  const data = res?.data?.data;
  return data;
}
