import { IContextualMenuProps } from '@fluentui/react';
import { PurchaseOrderLineCreated } from './events_PurcheOrderLine';
import { PurchaseOrderChangedNumberChanged } from './events';
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
    produce(payload: any, handledProps: string[] = []): any[] {
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

            if (changeList.includes('FACI') &&
                !handledProps.includes('FACI')) {
                const poNumber = payloadObj.PUNO;
                const facilityNumber = payloadObj.FACI;
                return [new PurchaseOrderFacilityNumberChanged(poNumber, facilityNumber)]
                    .concat(this.produce(payload, handledProps.concat(['FACI'])));
            }

            if (changeList.includes('PUSL') &&
                !handledProps.includes('PUSL')) {
                const poNumber = payloadObj.PUNO;
                const lowestStatus = payloadObj.PUSL;
                return [new PurchaseOrderLowestStatusChanged(poNumber, lowestStatus)]
                    .concat(this.produce(payload, handledProps.concat(['PUSL'])));
            }

            if (changeList.includes('PUST') &&
                !handledProps.includes('PUST')) {
                const poNumber = payloadObj.PUNO;
                const highestStatus = payloadObj.PUST;
                return [new PurchaseOrderHighestStatusChanged(poNumber, highestStatus)]
                    .concat(this.produce(payload, handledProps.concat(['PUST'])));
            }

            if (changeList.includes('SUNO') &&
                !handledProps.includes('SUNO')) {
                const poNumber = payloadObj.PUNO;
                const supplierId = payloadObj.SUNO;
                return [new PurchaseOrderSupplierIdChanged(poNumber, supplierId)]
                    .concat(this.produce(payload, handledProps.concat(['SUNO'])));
            }

            if (changeList.includes('MODL') &&
                !handledProps.includes('MODL')) {
                const poNumber = payloadObj.PUNO;
                const deliveryMethod = payloadObj.MODL;
                return [new PurchaseOrderDeliveryMethodChanged(poNumber, deliveryMethod)]
                    .concat(this.produce(payload, handledProps.concat(['MODL'])));
            }

            if (changeList.includes('RFID') &&
                !handledProps.includes('RFID')) {
                const poNumber = payloadObj.PUNO;
                const reference = payloadObj.RFID;
                return [new PurchaseOrderReferenceChanged(poNumber, reference)]
                    .concat(this.produce(payload, handledProps.concat(['RFID'])));
            }

            if (changeList.includes('YRE1') &&
                !handledProps.includes('YRE1')) {
                const poNumber = payloadObj.PUNO;
                const supplierReference = payloadObj.YRE1;
                return [new PurchaseOrderSupplierReferenceChanged(
                    poNumber,
                    supplierReference
                )].concat(this.produce(payload, handledProps.concat(['YRE1'])));
            }

            if (changeList.includes('DWDT') &&
                !handledProps.includes('DWDT')) {
                const poNumber = payloadObj.PUNO;
                const requestedDate = payloadObj.DWDT;
                return [new PurchaseOrderRequestedDateChanged(poNumber, requestedDate)]
                    .concat(this.produce(payload, handledProps.concat(['DWDT'])));
            }

            if (changeList.includes('OURR') &&
                !handledProps.includes('OURR')) {
                const poNumber = payloadObj.PUNO;
                const internalReference = payloadObj.OURR;
                return [new PurchaseOrderInternalReferenceChanged(
                    poNumber,
                    internalReference
                )].concat(this.produce(payload, handledProps.concat(['OURR'])));
            }

            if (changeList.includes('NTAM') &&
                !handledProps.includes('NTAM')) {
                const poNumber = payloadObj.PUNO;
                const orderValueNet = payloadObj.NTAM;
                return [new PurchaseOrderNetOrderValueChanged(poNumber, orderValueNet)]
                    .concat(this.produce(payload, handledProps.concat(['NTAM'])));
            }

            // TODO: foo
            if (changeList.includes('NOLN') &&
                !handledProps.includes('NOLN')) {
                //console.log(changeList);
                const poNumber = payloadObj.PUNO;
                const amountPurchaseOrderLines = payloadObj.NOLN;
                return [new PurchaseOrderNumberOfPurchaseOrderLinesChanged(
                    poNumber,
                    amountPurchaseOrderLines
                )].concat(this.produce(payload, handledProps.concat(['NOLN'])));
            }

            if (changeList.includes('COAM') &&
                !handledProps.includes('COAM')) {
                //console.log(changeList);
                const poNumber = payloadObj.PUNO;
                const totalCost = payloadObj.COAM;
                return [new PurchaseOrderTotalOrderCostChanged(poNumber, totalCost)]
                    .concat(this.produce(payload, handledProps.concat(['COAM'])));
            }

            if (changeList.includes('TOQT') &&
                !handledProps.includes('TOQT')) {
                const poNumber = payloadObj.PUNO;
                const totalQuantity = payloadObj.TOQT;
                return [new PurchaseOrderTotalQuantityChanged(poNumber, totalQuantity)]
                    .concat(this.produce(payload, handledProps.concat(['TOQT'])));
            }

            if (changeList.includes('PYAD') &&
                !handledProps.includes('PYAD')) {
                const poNumber = payloadObj.PUNO;
                const invoiceAddress = payloadObj.PYAD;
                return [new PurchaseOrderOurInvoicingAddressChanged(poNumber, invoiceAddress)]
                    .concat(this.produce(payload, handledProps.concat(['PYAD'])));
            }

            if (changeList.includes('TEDL') &&
                !handledProps.includes('TEDL')) {
                const poNumber = payloadObj.PUNO;
                const deliveryTerms = payloadObj.TEDL;
                return [new PurchaseOrderDeliveryTerms(poNumber, deliveryTerms)]
                    .concat(this.produce(payload, handledProps.concat(['TEDL'])));
            }

            if (changeList.includes('TEPY') &&
                !handledProps.includes('TEPY')) {
                const poNumber = payloadObj.PUNO;
                const paymentTerms = payloadObj.TEPY;
                return [new PurchaseOrderPaymentTermsChanged(poNumber, paymentTerms)]
                    .concat(this.produce(payload, handledProps.concat(['TEPY'])));
            }

            if (changeList.includes('PUDT') &&
                !handledProps.includes('PUDT')) {
                const poNumber = payloadObj.PUNO;
                const orderDate = payloadObj.PUDT;
                return [new PurchaseOrderDateChanged(poNumber, orderDate)]
                    .concat(this.produce(payload, handledProps.concat(['PUDT'])));
            }

            if (changeList.includes('CHNO') &&
                !handledProps.includes('CHNO')) {
                const poNumber = payloadObj.PUNO;
                const changeNumber = payloadObj.CHNO;
                return [new PurchaseOrderChangedNumberChanged(poNumber, changeNumber)]
                    .concat(this.produce(payload, handledProps.concat(['CHNO'])));
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
            const changeNumber = parseInt(payloadObj.CHNO);
            return [new PurchaseOrderCreated(
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
                invoiceAdress,
                changeNumber
            )];
        }

        return [];
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
