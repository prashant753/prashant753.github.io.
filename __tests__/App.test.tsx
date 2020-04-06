import React from 'react';
import App from '../src/App';
import { shallow, ShallowWrapper } from 'enzyme';

const createTestProps = (prop: any) => ({
    ...prop,
});
let props: any;
let wrapper: ShallowWrapper;

describe('App', () => {

    beforeEach(() => {
        props = createTestProps({
            homepage: true,
        });
    });
    it('should render App', () => {
        wrapper = shallow(<App {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});
