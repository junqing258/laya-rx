import BonusBorad from "components/playcompone/BonusBorad";

export default class BonusSense {

	constructor(mode) {
		this.init();
	}

	init(mode) {
		BonusBorad.useMode(1);
		let bonusboard = new BonusBorad();
	}

}