import React from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';
import Datagrid from '../components/datagrid/datagrid.component';
import GithubLogo from '../images/logo-github.svg';
import './example.container.scss';

export default () => (
  <Grid fluid>
    <Row>
      <Col xs={12}>
        <Row>
          <Col xs={10} md={11}>
            <h3>React Grid</h3>
          </Col>
          <Col xs={2} md={1}>
            <a
              href="https://github.com/OpusCapita/react-grid"
              style={{ marginTop: '20px', display: 'block' }}
            >
              <GithubLogo />
            </a>
          </Col>
        </Row>
        <Panel style={{ height: '100%' }}>
          <Datagrid />
        </Panel>
      </Col>
    </Row>
  </Grid>
);
