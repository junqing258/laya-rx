
import Background from '../../src/components/Background';

describe("Background", function() {
	
	it('UI', (done) => {
		const bg = Background.getInstance();
		expect(bg instanceof Laya.Sprite).toBe(true);
		bg.event('click');
		Laya.stage.addChild(bg);
		setTimeout(() => {
			bg.destroy();
			done();
		}, 1000);
	});

});