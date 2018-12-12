import React from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import GithubLogo from '../images/logo-github.svg';
import './example.container.scss';
import navItems from '../components/nav-items';
import ExampleGrids from '../components/example-grids.component';

const getNav = () => navItems.map((item) => {
  const { navKey, navPath, navLabel } = item;
  return (
    <NavLink
      key={navKey}
      href={navPath}
      to={navPath}
      style={{ marginRight: '20px' }}
      activeStyle={{ fontWeight: 'bold' }}
    >
      {navLabel}
    </NavLink>
  );
});

export default () => (
  <Grid fluid>
    <Row>
      <Col xs={12}>
        <Row>
          <Col xs={2} md={1}>
            <h3>React Grid</h3>
          </Col>
          <Col xs={8} md={10}>
            <h3>{getNav()}</h3>
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
          <ExampleGrids />
        </Panel>
      </Col>
    </Row>
  </Grid>
);
