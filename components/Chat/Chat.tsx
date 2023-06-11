import { Conversation, KeyValuePair, Message, OpenAIModel } from "@/types";
import { FC, MutableRefObject, useEffect, useRef, useState } from "react";
import { ChatInput } from "./ChatInput";
import { ChatLoader } from "./ChatLoader";
import { ChatMessage } from "./ChatMessage";
import { ModelSelect } from "./ModelSelect";
import { Regenerate } from "./Regenerate";
import { SystemPrompt } from "./SystemPrompt";

interface Props {
  conversation: Conversation;
  models: OpenAIModel[];
  apiKey: string;
  messageIsStreaming: boolean;
  modelError: boolean;
  messageError: boolean;
  loading: boolean;
  lightMode: "light" | "dark";
  onSend: (message: Message, isResend: boolean) => void;
  onUpdateConversation: (conversation: Conversation, data: KeyValuePair) => void;
  stopConversationRef: MutableRefObject<boolean>;
}

export const Chat: FC<Props> = ({ conversation, models, apiKey, messageIsStreaming, modelError, messageError, loading, lightMode, onSend, onUpdateConversation, stopConversationRef }) => {
  const [currentMessage, setCurrentMessage] = useState<Message>();
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (autoScrollEnabled) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const bottomTolerance = 30;

      if (scrollTop + clientHeight < scrollHeight - bottomTolerance) {
        setAutoScrollEnabled(false);
      } else {
        setAutoScrollEnabled(true);
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;

    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);

      return () => {
        chatContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div className="relative flex-1 overflow-none dark:bg-[#343541] bg-white">
      {!apiKey && (
        <div className="flex flex-col justify-center mx-auto h-full w-[300px] sm:w-[500px] space-y-6">
          {/* <div className="text-1xl font-semibold text-center text-gray-400">Hi,我是程序员饭哥,爱好互联网、编程、AI领域，做过后端、前端，写过C/C++、Java、Android、PHP，现在做前端领域。</div> */}
          {/* <div className="text-1xl font-semibold text-center text-gray-800 dark:text-gray-100">在这里都能找到我的痕迹，我的公众号-前端技术江湖、<a target="_blank" href="http://bigerfe.com">大前端面试刷题网</a>、<a href="https://github.com/Bigerfe/koa-react-ssr" target="_blank">React SSR开发框架</a>、gpt小程序版：小饭talk（近期上线） </div> */}
          {/* <div className="text-1xl font-semibold text-center text-gray-400">站长说：本站提供免费gpt对话服务，让关注我的朋友用上正宗的gpt。</div> */}
          <div className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100">gpt中文版，无需魔法，即可使用！ </div>
          <div className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100">需设置卡密才能对话，共享卡密可体验5次,卡密：zp-guest3BlbkFJh09090。 <a style={{color:'green', textDecoration:'underline'}} target="_blank" href="https://mmbiz.qpic.cn/mmbiz_png/OhepwYCSDicgkOGWyMGq9sDhpXlO66Vmiat4fTJc2Wmx1bskhvLMicribO34VxfFV1KAMyJowBJwpvWqUianRUIoQ8g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1">卡密设置教程</a> </div>
          <div className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100">正式卡密：9.9/月 对话无限制，手机、电脑都能用。 如果没有卡密，请联系作者购买 。 </div>
          <div className="text-center text-gray-500 dark:text-gray-800 dark:text-gray-100"></div>
          {/* <div className="text-center text-gray-500 dark:text-gray-400">也可以进入作者的知识星球『玩转chatGPT和AI绘画』，目前加入星球可赠送独立账号1个+KEY+N个共享账号，<a style={{color:'#fff'}} target="_blank" href="https://t.zsxq.com/0cl2u1Qem">点我打开介绍~</a></div> */}
          {/* <div className="text-center text-gray-500 dark:text-gray-400">星球试运营中(已运营2天)，目前是最低价，随时都会涨价，早就是优势！</div> */}
          <div className="text-center text-gray-500 dark:text-gray-400">
          <img style={{width:120,display:'inline'}} src="https://qiniu.bigerfe.com/wo1.jpg"/></div>
          <div className="text-center text-gray-500 dark:text-gray-400">扫码加作者微信</div>
        </div>
      )}

      {modelError ? (
        <div className="flex flex-col justify-center mx-auto h-full w-[300px] sm:w-[500px] space-y-6">
          <div className="text-center text-red-500">Error fetching models.</div>
          <div className="text-center text-red-500">发生错误，很可能你的key已经过期，请联系站长 vx: 223344386 确认！ </div>
        </div>
      ) : (
        <>
          <div
            className="overflow-scroll max-h-full"
            ref={chatContainerRef}
          >
            {conversation.messages.length === 0 ? (
              <>
                <div className="flex flex-col mx-auto pt-12 space-y-10 w-[350px] sm:w-[600px]">
                  <div className="text-4xl font-semibold text-center text-gray-800 dark:text-gray-100">{models.length === 0 ? "Loading..." : "bigerfe chatGPT"}</div>

                  {models.length > 0 && (
                    <div className="flex flex-col h-full space-y-4 border p-4 rounded border-neutral-500">
                      <ModelSelect
                        model={conversation.model}
                        models={models}
                        onModelChange={(model) => onUpdateConversation(conversation, { key: "model", value: model })}
                      />

                      <SystemPrompt
                        conversation={conversation}
                        onChangePrompt={(prompt) => onUpdateConversation(conversation, { key: "prompt", value: prompt })}
                      />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center py-2 text-neutral-500 bg-neutral-100 dark:bg-[#444654] dark:text-neutral-200 text-sm border border-b-neutral-300 dark:border-none" style={{position: 'fixed', top:'0', width:'100%'}}>{conversation.model.name} &nbsp;&nbsp;| &nbsp;&nbsp;<a style={{color:'yellow'}} href="https://qiniu.bigerfe.com/wo1.jpg" target="_blank">联系站长(扫码关注),点这里打开</a></div>
                <div className="flex justify-center py-2 text-neutral-500 bg-neutral-100 dark:bg-[#444654] dark:text-neutral-200 text-sm border border-b-neutral-300 dark:border-none"></div>
                {conversation.messages.map((message, index) => (
                  <ChatMessage
                    key={index}
                    message={message}
                    lightMode={lightMode}
                  />
                ))}

                {loading && <ChatLoader />}

                <div
                  className="bg-white dark:bg-[#343541] h-[162px]"
                  ref={messagesEndRef}
                />
              </>
            )}
          </div>

          {messageError ? (
            <Regenerate
              onRegenerate={() => {
                if (currentMessage) {
                  onSend(currentMessage, true);
                }
              }}
            />
          ) : (
            <ChatInput
              stopConversationRef={stopConversationRef}
              messageIsStreaming={messageIsStreaming}
              onSend={(message) => {
                setCurrentMessage(message);
                onSend(message, false);
              }}
              model={conversation.model}
            />
          )}
        </>
      )}
    </div>
  );
};
