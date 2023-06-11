export const DEFAULT_SYSTEM_PROMPT = "这里是ChatGPT，一个由OpenAI训练的大型语言模型。请仔细遵循用户的说明。使用markdown进行响应。";

export const RES_CODE_MAP = {
    '-111': {
        msg:'网络问题，请求已过期！请重新发送！'
    },
    '-222': {
        msg:'非法访问，签名失败！'
    },
    '-333': {
        msg:'卡密已过期，请去公众号重新获取！ 回复 卡密 即可。'
    },


}

export const RES_CODE_ARRAY = ['-111', '-222', '-333'];