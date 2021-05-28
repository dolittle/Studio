/* eslint-disable */
({
    Name: 'Feature',
    Filter: (input) => {
        if (input && input.document === 'MPDFHE') {
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
            featureId: elements.FTID,
            featureType: elements.FTTP,
            name: elements.TX30,
            shortName: elements.TX10,
            attributeIdentity: elements.ATID,
            featureCheck: elements.FICR,
            optionCheck: elements.VAOP,
            timestamp: elements.LMTS,
            customsOffice: elements.CONO,
            changeNumber: elements.CHNO
        }
    }
});
