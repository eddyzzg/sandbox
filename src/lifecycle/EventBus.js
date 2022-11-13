class EventBusClass {
	constructor() {
		this.listeners = new Map();
	}

	/**
	 * @param {String} eventName
	 * @param {Function} callback
	 * @return {Function}
	 */
	addListener(eventName, callback) {
		if (!this.listeners.get(eventName)) {
			this.listeners.set(eventName, new Set());
		}
		this.listeners.get(eventName).add(callback);
		return callback;
	}

	/**
	 * @param {String} eventName
	 * @param {Function} callback
	 */
	remove(eventName, callback) {
		let listeners = this.listeners.get(eventName);
		if (listeners) {
			listeners.delete(callback);
		}
	}

	/**
	 * @param {String} eventName
	 */
	removeAllByEventName(eventName) {
		let listeners = this.listeners.get(eventName);
		listeners = new Map();
	}

	/**
	 * @param {String} eventName
	 * @param {Object} [obj] - event params
	 */
	send(eventName, obj) {
		let listeners = this.listeners.get(eventName);
		if (listeners) {
			for (let listener of listeners) {
				listener(obj);
			}
		}
	}
}

export const eventBus = new EventBusClass();

export const events = {
	GLOBAL_EVENTS: {
	},
	MATCH_EVENTS: {
		GOAL_SCORED: 'goalScored',
		HOME_GOAL: 'homeGoalScored',
		AWAY_GOAL: 'awayGoalScored',
	}
};
