import { Col, Image, Row } from "antd";
import { dummysStones } from "../../helpers";

type GridProps = {
  stones?: Array<string>;
};

export default function Grid({ stones = dummysStones }: GridProps) {
  return (
    <Row justify="space-around" align="middle" gutter={[6, 6]}>
      {stones.map((source, index) => {
        return (
          <Col
            className="d-flex justify-content-center"
            key={index}
            xs={{ order: 1, span: 12 }}
            sm={{ order: 2, span: 12 }}
            md={{ order: 3 }}
            lg={{ order: 4, span: 6 }}
          >
            <Image
              preview
              className="rounded-xs"
              width="100%"
              height="auto"
              src={source}
              alt={source}
            />
          </Col>
        );
      })}
    </Row>
  );
}
