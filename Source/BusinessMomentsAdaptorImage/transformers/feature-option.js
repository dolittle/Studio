({
    Name: 'FeatureOption',
    Filter: (input) => {
        if (input && input.document === 'MPDVOF') {
            return true;
        }

        return false;
    },
    Transform: (input) => {
        let arrayToObj = function (input) {
            return input.map(function (x) {
                var data = {};
                data[`${Object.values(x)[0]}`] = x.newvalue.trim();
                return Object.entries(data)[0];
            });
        };

        const elements = Object.fromEntries(arrayToObj(input.elements));
        let result = {
            id: elements.PRNO,
            part: input.part,
            operation: input.operation
        };
        const data = {
            ...result,
            ...elements
        };

        return {
            option: elements.OPTN,
            featureId: elements.FTID,
            featureValue: elements.FEVA
        }
    }
});
