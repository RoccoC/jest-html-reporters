
import React from 'react'
import { Row, Col, Modal, List, Card } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import ErrorInfoItem from './ErrorInfoItem'

const { Meta } = Card

function info(data, caseAttachInfos, logs) {
  Modal.warning({
    title: 'Case Info',
    width: '80%',
    maskClosable: true,
    content: (
      <Row style={{ 'flex-direction': 'column' }}>
        <Col span={24}>
          <ErrorInfoItem data={data} caseAttachInfos={caseAttachInfos} />
        </Col>
        {/* {!!logs.length && (
          <List
            header='Logs'
            bordered
            className={'ant-col-24'}
            dataSource={logs}
            renderItem={item => (
              <List.Item>
                <div style={{ flex: 1 }}>
                  <div><label>Level: <b>{item.type}</b></label></div>
                  <div>{item.origin}</div>
                  <pre style={{ 'max-height': '200px', overflow: 'auto' }}>{item.message}</pre>
                </div>
              </List.Item>
            )}
          />
        )} */}
        {!!caseAttachInfos.length && (
          <List
            header='Logs'
            bordered
            className={'ant-col-24'}
            dataSource={caseAttachInfos}
            renderItem={item => (
              <List.Item>
                {item.filePath
                  ? (
                    <Card
                      hoverable
                      bordered
                      className={'ant-col-8'}
                      cover={<img alt={item.description} src={item.filePath} />}
                    >
                      <Meta title={item.description} />
                    </Card>
                  )
                  : item.description.origin ? (
                    <div style={{ flex: 1 }}>
                      {/* <div><label>Level: <b>{item.type}</b></label></div> */}
                      <div>{item.description.origin}</div>
                      <pre style={{ 'max-height': '200px', overflow: 'auto' }}>{item.description.message}</pre>
                    </div>
                  ) : (
                    <Card className={'ant-col-24'} bordered={false}>
                      <pre style={{ 'max-height': '200px', overflow: 'auto' }}>{ item.description }</pre>
                    </Card>
                  )
                }
              </List.Item>
            )}
          />
        )}
      </Row>
    ),
  })
}

const ErrorButton = ({ failureMessage, caseAttachInfos = [], logs = [] }) => {
  if (!failureMessage && !caseAttachInfos.length && !logs.length) return null
  return <div
    className='error_button'
    onClick={() => info(failureMessage, caseAttachInfos, logs)}>
    <ExclamationCircleFilled />
    Info
  </div>
}

export default ErrorButton
