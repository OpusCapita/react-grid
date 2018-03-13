import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import mockStorage from './storage.mock';

global.localStorage = mockStorage();
global.sessionStorage = mockStorage();

Enzyme.configure({ adapter: new Adapter() });

chai.use(chaiImmutable);
