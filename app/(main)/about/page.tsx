import ContactMe from '@/modules/main-layout/main-layout-container/internal/contact-me'
import MaxWidthWrapper from '@/shared/max-width-wrapper'
import { ArrowDownIcon } from 'lucide-react'
import Link from 'next/link'

export default function ABoutPage() {
  return (
    <MaxWidthWrapper className="text-lg text-center text-white flex items-center justify-center flex-col gap-4">
      <h2>
        你可以叫我, <span className="font-bold text-purple-400">叶鱼</span> ~
      </h2>
      <p>不是很想透露真名, 所以我有很多很多马甲~</p>
      <p>Neil, 揶揄, 叶鱼, 炆炆...~</p>
      <p>你可以随意称呼我~</p>
      <p>但求求你不要盒我喵🥹~</p>
      <p>
        我这先给您磕一个~ <small className="text-pink-400">orz</small>
      </p>

      <hr className="w-1/2" />

      <p>我是一个死宅~</p>
      <p>不喜欢吵闹的地方, 不喜欢人多的地方~</p>
      <p>平日在家就写写代码, 看看书~</p>
      <p>如果出了有趣的新番和游戏, 也是会尝试一下的~</p>
      <p>但我一般只在夏天玩游戏, 那种夜深人静开空调完游戏很有感觉不是嘛~</p>
      <p>现在的我在为自由而努力着~</p>

      <h2>接下来是我的走马灯~</h2>
      <hr className="w-1/2" />
      <h3 className="text-indigo-400">2022年的暑假, 我高考考砸了...</h3>
      <p>
        看了<q>强风吹拂</q>, 一个暑假, 每天都在跑步~
      </p>
      <p>
        第一次接触电脑, 下载<q>steam游戏中心</q>🥹
      </p>
      <p>
        第一次编程, <code>print('Hello, World!')</code>
      </p>
      <p>
        感谢那个教会我使用电脑和带我走向编程道路的僵尸~
        <ArrowDownIcon className="m-auto text-pink-400 size-10 animate-bounce mt-2" />
      </p>
      <Link
        href={'https://space.bilibili.com/19658621'}
        target="_blank"
        className="hover:text-emerald-400 bg-slate-800 px-4 py-2 rounded-sm hover:bg-slate-700 duration-200 font-mono"
      >
        Micro_Frank
      </Link>

      <h3 className="text-indigo-400">2023年的暑假, 开始学习Java</h3>
      <p>玩了很多游戏~</p>
      <p>地平线4, 只狼, 去月球, 寻找天堂, 恋爱绮谭~</p>
      <p>妈的🤬, Java真难写, 转前端~</p>
      <p>卧槽, win11🫵🏻怎么崩了!😡</p>
      <p>购入 Macbook air m2😋</p>

      <h3 className="text-indigo-400">2024年的暑假, 开始学习React</h3>
      <p>React 真有意思</p>
      <p>React 真有意思</p>
      <p>玩了 summer pockets😭, 一定要去一次圣地巡礼🥹</p>
      <p>🐀🐀要开始学日语了😡!</p>

      <h3 className="text-indigo-400">当下</h3>
      <p>准备暑期实习的项目和面试八股文...</p>
      <p>闲暇之余看一些Web3相关的东西~</p>
      <p>帮一个开源项目修改了几个拼写错误和几个简单的issue~</p>
      <p>
        收到了他们赠送的<q>大礼包</q>~
      </p>
      <p>
        感谢🙏🏻
        <Link
          href={'https://openbuild.xyz/'}
          className="ml-1 text-emerald-300"
          target="_blank"
        >
          OpenBuild~
        </Link>
      </p>
      <p>这也算是我第一个合并的pr~</p>

      <ContactMe />
    </MaxWidthWrapper>
  )
}
