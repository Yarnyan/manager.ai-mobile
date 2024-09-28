import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Bot {
  id: number;
  type?: string;
  botname: string;
  description: string;
  prompt?: string;
}

interface BotState {
  activeBot: Bot;
  allBots: Bot[];
  activePublicBot: Bot
}

const initialState: BotState = {
  activeBot: {
    id: 0,
    type: '',
    botname: '',
    description: '',
    prompt: '',
  },
  allBots: [],
  activePublicBot: {
    id: 0,
    botname: '',
    description: '',
  }
};

const botSlice = createSlice({
  name: 'botSlice',
  initialState,
  reducers: {
    addActiveBot: (state, action: PayloadAction<Bot>) => {
      state.activeBot = action.payload;
    },
    setAllBots: (state, action: PayloadAction<Bot[]>) => {
      state.allBots = action.payload;
    },
    setActivePublicBot: (state, action: PayloadAction<Bot>) => {
      state.activePublicBot = action.payload;
    }
  },
});

export const { addActiveBot, setAllBots, setActivePublicBot } = botSlice.actions;
export default botSlice.reducer;
