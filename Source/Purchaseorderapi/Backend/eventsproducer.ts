import { PurchaseOrderCreated } from './events';

export class EventProducer {

    produce(payload: any): any {

        const payloadObj = payloadToObject(payload);

        if (payloadObj.document === 'MPHEAD' &&
            payloadObj.operation === 'U') {
            // TODO: produce correct events
            // might have to return an array instead of one
            // object
        }

        if (payloadObj.document === 'MPHEAD' &&
            payloadObj.operation === 'C') {
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
            return new PurchaseOrderCreated(poNumber,
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
                invoiceAdress);
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
        fromEntries(xs: [string | number | symbol, any][]): object
    }
}

const fromEntries = (xs: [string | number | symbol, any][]) =>
    Object.fromEntries ? Object.fromEntries(xs) : xs.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

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
        ...elements
    };
}
