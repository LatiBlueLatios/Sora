import SoulDew from './SoulDew';
import { expect } from 'chai';
import sinon from 'sinon';

describe('SoulDew', () => {
    let soulDew;

    beforeEach(() => {
        soulDew = new SoulDew();
    });

    afterEach(() => {
        sinon.restore();
    });

    it('on and emit work correctly', () => {
        const mockCallback = sinon.spy();
        soulDew.on('testEvent', mockCallback);
        soulDew.emit('testEvent', 'arg1', 'arg2');
        expect(mockCallback.calledWith('arg1', 'arg2')).to.be.true;
    });

    it('off removes listener correctly', () => {
        const mockCallback = sinon.spy();
        soulDew.on('testEvent', mockCallback);
        soulDew.off('testEvent', mockCallback);
        soulDew.emit('testEvent');
        expect(mockCallback.called).to.be.false;
    });

    it('once listener is called only once', () => {
        const mockCallback = sinon.spy();
        soulDew.on('testEvent', mockCallback, true);
        soulDew.emit('testEvent');
        soulDew.emit('testEvent');
        expect(mockCallback.calledOnce).to.be.true;
    });

    it('wildcard listener is called for all events', () => {
        const mockCallback = sinon.spy();
        soulDew.on('*', mockCallback);
        soulDew.emit('event1');
        soulDew.emit('event2');
        expect(mockCallback.calledTwice).to.be.true;
    });

    it('cancel stops event propagation', () => {
        const mockCallback1 = sinon.spy(() => soulDew.cancel());
        const mockCallback2 = sinon.spy();
        soulDew.on('testEvent', mockCallback1);
        soulDew.on('testEvent', mockCallback2);
        soulDew.emit('testEvent');
        expect(mockCallback1.called).to.be.true;
        expect(mockCallback2.called).to.be.false;
    });

    it('clearAllListeners removes all listeners', () => {
        const mockCallback = sinon.spy();
        soulDew.on('testEvent', mockCallback);
        soulDew.on('*', mockCallback);
        soulDew.clearAllListeners();
        soulDew.emit('testEvent');
        expect(mockCallback.called).to.be.false;
    });

    it('emit returns true when not cancelled', () => {
        const result = soulDew.emit('testEvent');
        expect(result).to.be.true;
    });

    it('emit returns false when cancelled', () => {
        soulDew.on('testEvent', () => soulDew.cancel());
        const result = soulDew.emit('testEvent');
        expect(result).to.be.false;
    });

    it('on throws error for invalid arguments', () => {
        expect(() => soulDew.on(123, () => { })).to.throw('Event must be a string');
        expect(() => soulDew.on('event', 'not a function')).to.throw('Listener must be a function');
    });

    it('off throws error for invalid arguments', () => {
        expect(() => soulDew.off(123, () => { })).to.throw('Event must be a string');
        expect(() => soulDew.off('event', 'not a function')).to.throw('Listener must be a function');
    });

    it('emit throws error for invalid event', () => {
        expect(() => soulDew.emit(123)).to.throw('Invalid arguments');
    });

    it('emit warns when no listeners for an event', () => {
        const consoleWarn = sinon.stub(console, 'warn');
        soulDew.emit('nonexistentEvent');
        expect(consoleWarn.calledWith('Event "nonexistentEvent" has no listeners. Ensure the event name is correct and listeners are registered.')).to.be.true;
    });
});
