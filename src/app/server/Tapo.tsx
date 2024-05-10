"use server";
import axios from "axios";
import "dotenv/config";
import { StatusColors } from "./consts";


export async function submitTapoApiKey(
  email: string, 
  password: string, 
  deviceIp: string, 
  address:string) {

const tapoUrl = `http://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/api/tapoControl`;
// const tapoUrl = 'http://localhost:3004/api/submitTapokey'

  try {
    const response = await axios.post(tapoUrl, { 
      email, password, deviceIp, address 
    });

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
