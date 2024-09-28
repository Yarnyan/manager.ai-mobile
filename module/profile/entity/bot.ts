export type Bot = {
    id: number;
    botname: string;
    type: number;
    description: string;
    prompt: string;
    chats: Array<{
      id: number;
      userId: string;
      type: number;
      botId: number;
    }>;
  };