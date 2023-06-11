import { IconRefresh } from "@tabler/icons-react";
import { FC } from "react";

interface Props {
  onRegenerate: () => void;
}

export const Regenerate: FC<Props> = ({ onRegenerate }) => {
  return (
    <div className="fixed sm:absolute bottom-4 sm:bottom-8 w-full sm:w-1/2 px-2 left-0 sm:left-[280px] lg:left-[200px] right-0 ml-auto mr-auto">
      <div className="text-center mb-4 text-red-500">对不起, 请求出错. 可能的原因 1. 对话内容太长，超过最大限制，请点击左上角新建对话解决！ 2. 访问人数太多，导致官方接口不稳定，请重试即可！  </div>
      <button
        className="flex items-center justify-center w-full h-12 bg-neutral-100 dark:bg-[#444654] text-neutral-500 dark:text-neutral-200 text-sm font-semibold rounded-lg border border-b-neutral-300 dark:border-none"
        onClick={onRegenerate}
      >
        <IconRefresh className="mr-2" />
        <div>Regenerate response</div>
      </button>
    </div>
  );
};
