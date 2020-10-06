import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import SectionTitle from '@/components/SectionTitle.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(SectionTitle, {
      propsData: { title: msg },
    });
    expect(wrapper.text()).to.include(msg);
  });
});
