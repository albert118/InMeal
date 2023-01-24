const VersionInfo = {
    major: 0,
    minor: 1,
    revision: 'alpha',
    toString() { 
        return `${this.major}.${this.minor}.${this.revision}` 
    }
};

export default Object.freeze(Object.create(VersionInfo));
