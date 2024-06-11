const VersionInfo = {
    major: 1,
    minor: 6,
    revision: 0,
    toString() {
        return `${this.major}.${this.minor}.${this.revision}`;
    }
};

export default Object.freeze(VersionInfo);
