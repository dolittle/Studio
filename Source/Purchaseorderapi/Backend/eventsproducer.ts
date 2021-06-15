import {
    PurchaseOrderCreated,
    PurchaseOrderDateChanged,
    PurchaseOrderDeliveryMethodChanged,
    PurchaseOrderDeliveryTerms,
    PurchaseOrderFacilityNumberChanged,
    PurchaseOrderHighestStatusChanged,
    PurchaseOrderInternalReferenceChanged,
    PurchaseOrderLowestStatusChanged,
    PurchaseOrderNetOrderValueChanged,
    PurchaseOrderNumberOfPurchaseOrderLinesChanged,
    PurchaseOrderOurInvoicingAddressChanged,
    PurchaseOrderPaymentTermsChanged,
    PurchaseOrderReferenceChanged,
    PurchaseOrderRequestedDateChanged,
    PurchaseOrderSupplierIdChanged,
    PurchaseOrderSupplierReferenceChanged,
    PurchaseOrderTotalOrderCostChanged,
    PurchaseOrderTotalQuantityChanged,
} from './events';

export class EventProducer {
    produce(payload: any): any {
        const payloadObj = payloadToObject(payload);

        if (payloadObj.document === 'MPHEAD' && payloadObj.operation === 'U') {
            // TODO: produce correct events
            // might have to return an array instead of one
            // object
            var changeList: any = [];
            payload.elements.forEach((element) => {
                // if (element.oldvalue !== 'null' && element.newvalue !== 'null') {
                if (element.oldvalue !== element.newvalue) {
                    changeList.push(element.name);
                    // }
                }
            });
            // let requiredParams: any = ['LMTS', 'CHNO'];
            // if (requiredParams.every((item) => changeList.includes(item))) {
            //     const poNumber = payloadObj.PUNO;
            //     const facilityNumber = payload.FACI;
            //     return new PurchaseOrderFacilityNumberChanged(poNumber, facilityNumber);
            // }

            let requiredParams: any = ['PUNO', 'FACI'];
            if (requiredParams.every((item) => changeList.includes(item))) {
                const poNumber = payloadObj.PUNO;
                const facilityNumber = payload.FACI;
                return new PurchaseOrderFacilityNumberChanged(poNumber, facilityNumber);
            }

            requiredParams = ['PUNO', 'PUSL'];
            if (requiredParams.every((item) => changeList.includes(item))) {
                const poNumber = payloadObj.PUNO;
                const lowestStatus = payload.PUSL;
                return new PurchaseOrderLowestStatusChanged(poNumber, lowestStatus);
            }

            requiredParams = ['PUNO', 'PUST'];
            if (requiredParams.every((item) => changeList.includes(item))) {
                const poNumber = payloadObj.PUNO;
                const highestStatus = payload.PUST;
                return new PurchaseOrderHighestStatusChanged(poNumber, highestStatus);
            }

            requiredParams = ['PUNO', 'SUNO'];
            if (requiredParams.every((item) => changeList.includes(item))) {
                const poNumber = payloadObj.PUNO;
                const supplierId = payload.SUNO;
                return new PurchaseOrderSupplierIdChanged(poNumber, supplierId);
            }

            requiredParams = ['PUNO', 'MODL'];
            if (requiredParams.every((item) => changeList.includes(item))) {
                const poNumber = payloadObj.PUNO;
                const deliveryMethod = payload.MODL;
                return new PurchaseOrderDeliveryMethodChanged(poNumber, deliveryMethod);
            }

            requiredParams = ['PUNO', 'RFID'];
            if (requiredParams.every((item) => changeList.includes(item))) {
                const poNumber = payloadObj.PUNO;
                const reference = payload.RFID;
                return new PurchaseOrderReferenceChanged(poNumber, reference);
            }

            requiredParams = ['PUNO', 'YRE1'];
            if (requiredParams.every((item) => changeList.includes(item))) {
                const poNumber = payloadObj.PUNO;
                const supplierReference = payload.YRE1;
                return new PurchaseOrderSupplierReferenceChanged(
                    poNumber,
                    supplierReference
                );
            }

            requiredParams = ['PUNO', 'DWDT'];
            if (requiredParams.every((item) => changeList.includes(item))) {
                const poNumber = payloadObj.PUNO;
                const requestedDate = payload.DWDT;
                return new PurchaseOrderRequestedDateChanged(poNumber, requestedDate);
            }

            requiredParams = ['PUNO', 'OURR'];
            if (requiredParams.every((item) => changeList.includes(item))) {
                const poNumber = payloadObj.PUNO;
                const internalReference = payload.OURR;
                return new PurchaseOrderInternalReferenceChanged(
                    poNumber,
                    internalReference
                );
            }

            requiredParams = ['PUNO', 'NTAM'];
            if (requiredParams.every((item) => changeList.includes(item))) {
                const poNumber = payloadObj.PUNO;
                const orderValueNet = payload.NTAM;
                return new PurchaseOrderNetOrderValueChanged(poNumber, orderValueNet);
            }

            requiredParams = ['PUNO', 'NOLN'];
            if (requiredParams.every((item) => changeList.includes(item))) {
                const poNumber = payloadObj.PUNO;
                const amountPurchaseOrderLines = payload.NOLN;
                return new PurchaseOrderNumberOfPurchaseOrderLinesChanged(
                    poNumber,
                    amountPurchaseOrderLines
                );
            }

            requiredParams = ['PUNO', 'COAM'];
            if (requiredParams.every((item) => changeList.includes(item))) {
                const poNumber = payloadObj.PUNO;
                const totalCost = payload.COAM;
                return new PurchaseOrderTotalOrderCostChanged(poNumber, totalCost);
            }

            requiredParams = ['PUNO', 'TOQT'];
            if (requiredParams.every((item) => changeList.includes(item))) {
                const poNumber = payloadObj.PUNO;
                const totalQuantity = payload.TOQT;
                return new PurchaseOrderTotalQuantityChanged(poNumber, totalQuantity);
            }

            requiredParams = ['PUNO', 'PYAD'];
            if (requiredParams.every((item) => changeList.includes(item))) {
                const poNumber = payloadObj.PUNO;
                const invoiceAddress = payload.PYAD;
                return new PurchaseOrderOurInvoicingAddressChanged(
                    poNumber,
                    invoiceAddress
                );
            }

            requiredParams = ['PUNO', 'TEDL'];
            if (requiredParams.every((item) => changeList.includes(item))) {
                const poNumber = payloadObj.PUNO;
                const deliveryTerms = payload.TEDL;
                return new PurchaseOrderDeliveryTerms(poNumber, deliveryTerms);
            }

            requiredParams = ['PUNO', 'TEPY'];
            if (requiredParams.every((item) => changeList.includes(item))) {
                const poNumber = payloadObj.PUNO;
                const paymentTerms = payload.TEPY;
                return new PurchaseOrderPaymentTermsChanged(poNumber, paymentTerms);
            }

            requiredParams = ['PUNO', 'PUDT'];
            if (requiredParams.every((item) => changeList.includes(item))) {
                const poNumber = payloadObj.PUNO;
                const orderDate = payload.PUDT;
                return new PurchaseOrderDateChanged(poNumber, orderDate);
            }
        }

        if (payloadObj.document === 'MPHEAD' && payloadObj.operation === 'C') {
            const poNumber = payloadObj.PUNO;
            const facilityId = payloadObj.FACI;
            const lowestStatus = payloadObj.PUSL;
            const highestStatus = payloadObj.PUST;
            const orderDateStr = payloadObj.PUDT;
            let orderDate: Date | null = null;
            if (orderDateStr && orderDateStr !== '') {
                orderDate = parseDate(orderDateStr);
            }
            const requestedDateStr = payloadObj.DWDT;
            let requestedDate: Date | null = null;
            if (requestedDateStr && requestedDateStr !== '') {
                requestedDate = parseDate(requestedDateStr);
            }
            const supplierId = payloadObj.SUNO;
            const paymentTerms = payloadObj.TEPY;
            const deliveryMethod = payloadObj.MODL;
            const deliveryTerms = payloadObj.TEDL;
            const reference = payloadObj.RFID;
            const supplierReference = payloadObj.YRE1;
            const internalReference = payloadObj.OURR;
            const orderValueNet = parseFloat(payloadObj.NTAM);
            const numberOfPurchaseOrderLines = parseInt(payloadObj.NOLN);
            const totalCost = parseFloat(payloadObj.COAM);
            const totalQuantity = parseFloat(payloadObj.TOQT);
            const invoiceAdress = payloadObj.PYAD;
            return new PurchaseOrderCreated(
                poNumber,
                facilityId,
                lowestStatus,
                highestStatus,
                orderDate,
                supplierId,
                paymentTerms,
                deliveryMethod,
                deliveryTerms,
                reference,
                supplierReference,
                requestedDate,
                internalReference,
                orderValueNet,
                numberOfPurchaseOrderLines,
                totalCost,
                totalQuantity,
                invoiceAdress
            );
        }
    }
}

function parseDate(input: string): Date {
    const orderDateYYYY = parseInt(input.substr(0, 4));
    const orderDateMM = parseInt(input.substr(4, 2));
    const orderDateDD = parseInt(input.substr(6, 2));
    return new Date(orderDateYYYY, orderDateMM, orderDateDD);
}

/* Polyfil Object.fromEntires */
declare global {
    interface ObjectConstructor {
        fromEntries(xs: [string | number | symbol, any][]): object;
    }
}

const fromEntries = (xs: [string | number | symbol, any][]) =>
    Object.fromEntries
        ? Object.fromEntries(xs)
        : xs.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

function payloadToObject(payload: any): any {
    let arrayToObj = function (payload) {
        return payload.map(function (x) {
            var data = {};
            let newValue = x.newvalue.trim();
            if (newValue === '') {
                newValue = x.oldvalue.trim();
            }
            if (newValue === 'null') {
                newValue = '';
            }
            data[`${Object.values(x)[0]}`] = newValue;
            return Object.entries(data)[0];
        });
    };

    const elements = Object.fromEntries(arrayToObj(payload.elements));
    const payloadClone = JSON.parse(JSON.stringify(payload));
    // delete the elements on the clone to avoid duplicates
    delete payloadClone.elements;

    return {
        ...payloadClone,
        ...elements,
    };
}
