'use server'
import axios from "axios";
import { StatusColors } from "./consts";

export async function submitShellyKey(
  authKey: string,
  serverUrl: string,
  deviceId: string,
  address: string
): Promise<{ data: { message: string; color: string } }> {

const submitUrl = `http://${process.env.API_HOST}:${process.env.API_PORT}/api/submitShellykey`;
// const submitUrl = 'http://localhost:3004/api/submitShellykey'

  try {
    const response = await axios.post(submitUrl, {
      authKey,
      address,
      deviceId,
      serverUrl,
    });

    if (response.status === 200) {
      const data: { message: string; status: "ERROR" | "SUCCESS" } = response.data;
      const color = data.status === "ERROR" ? StatusColors.ERROR : StatusColors.SUCCESS;

      return {
        data: {
          message: data.message,
          color: color,
        },
      };
    } else {
      throw new Error("Unexpected response status");
    }
  } catch (error) {
    console.error("Error in submitShellyKey:", error);
    throw error;
  }
}
