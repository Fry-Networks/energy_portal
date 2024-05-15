'use server'
import axios from "axios";
import "dotenv/config";
import { StatusColors } from "./consts";

export async function submitShellyKey(
  authKey: string,
  serverUrl: string,
  deviceId: string,
  address: string
){
const submitUrl = `http://${process.env.API_HOST}:${process.env.API_PORT}/api/submitShellykey`;
// const submitUrl = 'http://localhost:3004/api/submitShellykey'

  try {
    const response = await axios.post(submitUrl, {
      authKey,
      address,
      deviceId,
      serverUrl,
    });
    console.log(response.data,'________________________response.data')

    if (response.status === 200) {
      const responseData = response.data;

      return {
        verified: true,
        data: {
          message: responseData.message || "Success",
          color:
            responseData.status === "ERROR"
              ? StatusColors.ERROR
              : StatusColors.SUCCESS,
        },
      };
    }
  } catch (error: any) {
    let message = "Failed to submit API key.";
    let color = StatusColors.ERROR;

    if (error.response) {
      console.log(error.response.data.message,'-------error.response.data.message')
      if (error.response.status === 429) {
        message = "You have made too many requests, please try again later.";
      } else if (error.response.data.message) {
        message = error.response.data.message;
      }

      color =
        error.response.data.status === "ERROR"
          ? StatusColors.ERROR
          : StatusColors.SUCCESS;
    }

    console.error("Error submitting API key:", error);

    return {
      verified: false,
      data: {
        message: message,
        color: color,
      },
    };
  }
}
