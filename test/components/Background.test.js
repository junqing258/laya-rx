
import Background from '../../src/components/Background';

describe("Background", function() {
	
	it('UI', () => {
		const bg = Background.getInstance();

		expect(bg instanceof Laya.Sprite).toBe(true);
	});

});