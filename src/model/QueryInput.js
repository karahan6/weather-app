class QueryInput {
    constructor(builder) {
        this.requestName = builder.requestName;
        this.saveToStore = builder.saveToStore === false ? false : true;
        this.data = builder.data;
        this.requestParams = builder.requestParams;
        this.pathVars = builder.pathVars;
        this.callBackPrepare = builder.callBackPrepare;
        this.spin = builder.spin;
        this.queryType = builder.queryType;
        this.storeName = builder.storeName;
    }
}

export default class QueryInputBuilder {
    constructor(requestName, queryType) {
        this.requestName = requestName;
        this.queryType = queryType;
    }

    withSaveToStore(saveToStore) {
        this.saveToStore = saveToStore;
        return this;
    }

    withStoreName(storeName) {
        this.storeName = storeName;
        return this;
    }

    withData(data) {
        this.data = data;
        return this;
    }

    withRequestParams(requestParams) {
        this.requestParams = requestParams;
        return this;
    }

    withPathVars(pathVars) {
        this.pathVars = pathVars;
        return this;
    }

    withCallBackPrepare(callBackPrepare) {
        this.callBackPrepare = callBackPrepare;
        return this;
    }

    withSpin(spin) {
        this.spin = spin;
        return this;
    }


    build() {
        return new QueryInput(this)
    }
}