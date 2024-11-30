import { Card } from 'web-check-live/components/Form/Card';
import Row, { Details } from 'web-check-live/components/Form/Row';
import colors from 'web-check-live/styles/colors';

const cardStyles = `
small {
  margin-top: 1rem;
  opacity: 0.5;
  display: block;
  a { color: ${colors.primary}; }
}
summary {
  padding: 0.5rem 0 0 0.5rem !important;
  cursor: pointer;
  font-weight: bold;
}
pre {
  background: ${colors.background};
  padding: 0.5rem 0.25rem;
  border-radius: 4px;
  overflow: auto;
}
`;

const getPagePath = (url: string): string => {
  try {
    return new URL(url).pathname;
  } catch (error) {
    return url;
  }
}

const SecurityTxtCard = (props: {data: any, title: string, actionButtons: any }): JSX.Element => {
  const securityTxt = props.data;
  return (
    <Card heading={props.title} actionButtons={props.actionButtons} styles={cardStyles}>
      <Row lbl="是否存在" val={securityTxt.isPresent ? '✅ 是' : '❌ 否'} />
      { securityTxt.isPresent && (
        <>
        <Row lbl="文件位置" val={securityTxt.foundIn} />
        <Row lbl="PGP 签名" val={securityTxt.isPgpSigned ? '✅ 是' : '❌ 否'} />
        {securityTxt.fields && Object.keys(securityTxt.fields).map((field: string, index: number) => {
          if (securityTxt.fields[field].includes('http')) return (
            <Row lbl="" val="" key={`policy-url-row-${index}`}>
              <span className="lbl">{field}</span>
              <span className="val"><a href={securityTxt.fields[field]}>{getPagePath(securityTxt.fields[field])}</a></span>
            </Row>
          );
          return (
            <Row lbl={field} val={securityTxt.fields[field]} key={`policy-row-${index}`} />
          );
        })}
        <Details>
          <summary>查看完整策略</summary>
          <pre>{securityTxt.content}</pre>
        </Details>
        </>
      )}
      {!securityTxt.isPresent && (<small>
        拥有 security.txt 可以确保安全研究人员知道如何以及在哪里安全地报告漏洞。
      </small>)}
    </Card>
  );
}

export default SecurityTxtCard;
