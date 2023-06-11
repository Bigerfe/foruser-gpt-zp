import { kv } from "@vercel/kv";


import { ChatBody, Message, OpenAIModelID } from "@/types";
export const config = {
    runtime: "edge"
};

const CustomCards = {
    'gk-guest3BlbkFJh': {
      status: 1,
    },
    "9c5d7c5e-7c5d-4c8e-9d5c-6d7c5d4c8e9d": {
      "status": 1
    },
    "3f6a8b2c-8b2c-4d1e-9a6b-6a8b2c4d1e9a": {
      "status": 1
    }
}

const handler = async (req: Request): Promise<Response> => {

    // const { model, messages, key, prompt, t, sign, other } = (await req.json()) as ChatBody;

    const API_KEY_NAME = 'apikeyname';
    const CUSTOME_CARDS_KEY_NAME = 'customer-cards';
    await kv.set(API_KEY_NAME, "skkjkdjkfjdkjfkdf");
    // const session = await kv.get(API_KEY_NAME);

    // const { model, messages, key, prompt, t, sign, other } = (await req.json()) as ChatBody;
    await kv.set(CUSTOME_CARDS_KEY_NAME, "111222333");
    const session = await kv.get(CUSTOME_CARDS_KEY_NAME);
    return new Response('ddddd'+session);

};

export default handler;
