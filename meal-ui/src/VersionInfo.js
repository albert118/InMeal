const VersionInfo = {
	major: 1,
	minor: 3,
	revision: 3,
	toString() {
		return `${this.major}.${this.minor}.${this.revision}`;
	}
};

export default Object.freeze(Object.create(VersionInfo));
