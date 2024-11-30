import styled from '@emotion/styled';
import colors from 'web-check-live/styles/colors';
import { StyledCard } from 'web-check-live/components/Form/Card';

const StyledSelfScanMsg = styled(StyledCard)`
  margin: 0px auto 1rem;
  width: 95vw;
  a { color: ${colors.primary}; }
  b { font-weight: extra-bold; }
  span, i { opacity: 0.85; }
  img {
    width: 5rem;
    float: right;
    border-radius: 4px;
  }
`;

const messages = [
  '不错的尝试！但扫描这个应用就像自己挠痒痒一样，是行不通的！',
  '检测到递归扫描。宇宙可能会内爆...或者不会。但让我们不要去尝试。',
  '嘿，别检查我们！我们都脸红了... 😉',
  '嗯，在扫描我们吗？我们感到很特别！',
  '警报！检测到镜像扫描。相信我们，我们看起来不错 😉',
  '我们很高兴你想扫描我们，但我们不能自己挠痒痒！',
  '哦，在检查检查器，是吗？这很有趣？',
  '稍等一下...等一下...你在扫描我们？！好吧，这是个有趣的转折！',
  '扫描我们？这就像让镜子自己反射一样。',
  '好吧，这很尴尬...就像狗在追自己的尾巴！',
  '啊，我看到你在扫描这个网站...但幸运的是，这并没有造成无限递归循环（这一次）',
];

const SelfScanMsg = () => {
  return (
    <StyledSelfScanMsg>
      <img src="https://i.ibb.co/0tQbCPJ/test2.png" alt="自检" />
      <b>{messages[Math.floor(Math.random() * messages.length)]}</b>
      <br />
      <span>
        如果您想了解这个网站是如何构建的，为什么不查看一下
        <a href='https://github.com/Dnyo666/web-check-zh-cn'>源代码</a>呢？
      </span>
      <br />
      <i>请帮我给这个仓库点个星星吧</i> 😉
    </StyledSelfScanMsg>
  );
};

export default SelfScanMsg;
