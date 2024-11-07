import { mount } from '@vue/test-utils';
import TransactionList from '../src/components/TransactionList.vue';

describe('TransactionList.vue', () => {
    it('rendert eine Liste von Transaktionen mit v-for', () => {
        const transactions = [
            { id: 1, description: 'Miete', amount: 500 },
            { id: 2, description: 'Lebensmittel', amount: 200 }
        ];
        const wrapper = mount(TransactionList, {
            propsData: { transactions }
        });
        const listItems = wrapper.findAll('li');
        expect(listItems).toHaveLength(transactions.length);
    });

    it('zeigt eine Nachricht an, wenn keine Transaktionen vorhanden sind (v-if)', () => {
        const wrapper = mount(TransactionList, {
            propsData: { transactions: [] }
        });
        expect(wrapper.text()).toContain('Keine Transaktionen');
    });

    it('rendert eine spezifische Transaktion korrekt', () => {
        const transactions = [
            { id: 1, description: 'Miete', amount: 500 }
        ];
        const wrapper = mount(TransactionList, {
            propsData: { transactions }
        });
        expect(wrapper.text()).toContain('Miete');
        expect(wrapper.text()).toContain('500 €');
    });
});