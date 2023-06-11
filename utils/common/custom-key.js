

const ErrorCode = {
  cardDisable: -999, //卡密无效
}

const USER_SK_IDS_KEY = 'user-sk-ids';

function getDefaultKey(key) {
  if(key.indexOf('sk-')>-1) {
    return key;
  }
  if (!CustomCards[key] || !CustomCards[key].status) {
    return ErrorCode.cardDisable.toString(); //卡密已无效，请重新获取。
  }

  const ShareKey1 = 'ANleL56eja9';
  const ShareKey2 = 'LAoFEjHWdT3BlbkFJ'
  const ShareKey3 = 'bRNDSnjwXHIMlp0VVdau';

  const ShareKey11 = 'ANleL56eja9L';
  const ShareKey22 = 'AoFEjHWdT3BlbkFJ'
  const ShareKey33 = 'bRNDSnjwXHIMlp0VVdau';

  return `sk-${ShareKey1}${ShareKey2}${ShareKey3}`
}

const CustomCards = {
  'zp-guest3BlbkFJh09090': {
    status: 1,
  },
  "4c8e-9d5c-6d7c5d4c8e9d": {
    "status": 1
  },
  "4d1e-9a6b-6a8b2c4d1e9a": {
    "status": 1
  },
  "1d5a-4b3c-8e9f-9f1d": {
    "status": 1
  },
  "e5f6-a7b8-c9d0-e1f2a3b4c5d6": {
    "status": 1
  },
  "b5a6-c7d8-e9f0-1a2b3c4d5e6": {
    "status": 1
  },
  "1b2a-3c4d-5e6f-7a8b9c0d1e2": {
    "status": 1
  },
  "2e1f-0c9d-8b7a-6f5e4d3c2b1": {
    "status": 1
  },
  "b5c6-d7e8-f9a0-b1c2d3e4f5a": {
    "status": 1
  },
  "5e6f-7a8b-9c0d-1e2f3a4b5c6": {
    "status": 1
  },
  "a5b6-c7d8-e9f0-1a2b3c4d5e6": {
    "status": 1
  },
  "b5a6-7c8d-9e0f-1a2b3c4d5e6": {
    "status": 1
  },
  "5e4f-3a2b-1c0d-9e8f7b6a5c4": {
    "status": 1
  },
  "7a8b-9c0d-1e2f-3a4b5c6d7e8": {
    "status": 1
  },
  "f5a6-b7c8-d9e0-f1e2d3c4a5": {
    "status": 1
  },
  "1a2b-3c4d-5e6f-7a8b9c0d1e2": {
    "status": 1
  },
  "5e4f-3a2b-1c0d-9e8f7b6a5c4": {
    "status": 1
  },
  "7a8b-9c0d-1e2f-3a4b5c6d7e8": {
    "status": 1
  },
  "f5a6-b7c8-d9e0-f1e2d3c4a5": {
    "status": 1
  },
  "a5b6-c7d8-e9f0-1a2b3c4d5e6": {
    "status": 1
  },
  "b5a6-7c8d-9e0f-1a2b3c4d5e6": {
    "status": 1
  }

}

export default {
  getDefaultKey,
  CustomCards,
  ErrorCode,
  USER_SK_IDS_KEY
}
