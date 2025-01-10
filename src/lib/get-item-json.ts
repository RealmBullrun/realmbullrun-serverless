/* import axios from "axios"

export default async function getItemJson (itemId: any, address: string, signature: string) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_APIENDPOINT}/item`, {
      item: itemId,
      address,
      signature
    })
    return response.data
  } catch (error) {
    return {
      success: false,
      msg: "Unknown Error"
    }
  }
} */

import axios from "axios";

export default async function getItemJson(itemId: any) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_APIENDPOINT}/item`, {
      item: itemId
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      msg: "Unknown Error"
    };
  }
}
