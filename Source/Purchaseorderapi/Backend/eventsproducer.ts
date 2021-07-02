// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import {
    ConfirmedDeliveryDateUpdated,
    ConfirmedPurchasePriceQuantityUpdated,
    ConfirmedPurchasePriceUpdated,
    DifferentDeliveryAddressUpdated,
    HighestStatusPurchaseOrderUpdated,
    ItemUpdated,
    LineAmountOrderCurrencyUpdated,
    LowestStatusPurchaseOrderUpdated,
    PurchaseOrderItemDescriptionUpdated,
    PurchaseOrderItemNameUpdated,
    PurchaseOrderLineConfirmedQuantityUpdated,
    PurchaseOrderLineCreated,
    PurchaseOrderLineDeleted,
    PurchaseOrderLineDeliveryMethodUpdated,
    PurchaseOrderLineDeliveryTermsUpdated,
    PurchaseOrderLineOrderedQuantityAlternateUnitOfMeasureUpdated,
    PurchaseOrderLineSubNumberUpdated,
    PurchaseOrderLineUnitOfMeasureUpdated,
    PurchasePriceQuantityUpdated,
    PurchasePriceTextUpdated,
    PurchasePriceUnitOfMeasureUpdated,
    PurchasePriceUpdated,
    RequestedDeliveryDateUpdated,
    SupplierItemUpdated,
    SupplierOrderUpdated,
    SupplierUpdated,
    PurchaseOrderLineChangeNumberUpdated
} from './events_PurcheOrderLine';
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
    PurchaseOrderChangedNumberChanged,
    PurchaseOrderDeleted
} from './events';

export class EventProducer {
    produce(payload: any, handledProps: string[] = []): any[] {
        const payloadObj = payloadToObject(payload);

        if (payloadObj.document === 'MPHEAD' && payloadObj.operation === 'U') {
            const changeList: any = [];
            payload.elements.forEach((element) => {
                // if (element.oldvalue !== 'null' && element.newvalue !== 'null') {
                if (element.oldvalue !== element.newvalue) {
                    changeList.push(element.name);
                    // }
                }
            });

            if (changeList.includes('FACI') && !handledProps.includes('FACI')) {
                const poNumber = payloadObj.PUNO;
                const facilityNumber = payloadObj.FACI;
                return [
                    new PurchaseOrderFacilityNumberChanged(poNumber, facilityNumber),
                ].concat(this.produce(payload, handledProps.concat(['FACI'])));
            }

            if (changeList.includes('PUSL') && !handledProps.includes('PUSL')) {
                const poNumber = payloadObj.PUNO;
                const lowestStatus = payloadObj.PUSL;
                return [
                    new PurchaseOrderLowestStatusChanged(poNumber, lowestStatus),
                ].concat(this.produce(payload, handledProps.concat(['PUSL'])));
            }

            if (changeList.includes('PUST') && !handledProps.includes('PUST')) {
                const poNumber = payloadObj.PUNO;
                const highestStatus = payloadObj.PUST;
                return [
                    new PurchaseOrderHighestStatusChanged(poNumber, highestStatus),
                ].concat(this.produce(payload, handledProps.concat(['PUST'])));
            }

            if (changeList.includes('SUNO') && !handledProps.includes('SUNO')) {
                const poNumber = payloadObj.PUNO;
                const supplierId = payloadObj.SUNO;
                return [new PurchaseOrderSupplierIdChanged(poNumber, supplierId)].concat(
                    this.produce(payload, handledProps.concat(['SUNO']))
                );
            }

            if (changeList.includes('MODL') && !handledProps.includes('MODL')) {
                const poNumber = payloadObj.PUNO;
                const deliveryMethod = payloadObj.MODL;
                return [
                    new PurchaseOrderDeliveryMethodChanged(poNumber, deliveryMethod),
                ].concat(this.produce(payload, handledProps.concat(['MODL'])));
            }

            if (changeList.includes('RFID') && !handledProps.includes('RFID')) {
                const poNumber = payloadObj.PUNO;
                const reference = payloadObj.RFID;
                return [new PurchaseOrderReferenceChanged(poNumber, reference)].concat(
                    this.produce(payload, handledProps.concat(['RFID']))
                );
            }

            if (changeList.includes('YRE1') && !handledProps.includes('YRE1')) {
                const poNumber = payloadObj.PUNO;
                const supplierReference = payloadObj.YRE1;
                return [
                    new PurchaseOrderSupplierReferenceChanged(
                        poNumber,
                        supplierReference
                    ),
                ].concat(this.produce(payload, handledProps.concat(['YRE1'])));
            }

            if (changeList.includes('DWDT') && !handledProps.includes('DWDT')) {
                const poNumber = payloadObj.PUNO;
                const requestedDate = payloadObj.DWDT;
                return [
                    new PurchaseOrderRequestedDateChanged(poNumber, requestedDate),
                ].concat(this.produce(payload, handledProps.concat(['DWDT'])));
            }

            if (changeList.includes('OURR') && !handledProps.includes('OURR')) {
                const poNumber = payloadObj.PUNO;
                const internalReference = payloadObj.OURR;
                return [
                    new PurchaseOrderInternalReferenceChanged(
                        poNumber,
                        internalReference
                    ),
                ].concat(this.produce(payload, handledProps.concat(['OURR'])));
            }

            if (changeList.includes('NTAM') && !handledProps.includes('NTAM')) {
                const poNumber = payloadObj.PUNO;
                const orderValueNet = payloadObj.NTAM;
                return [
                    new PurchaseOrderNetOrderValueChanged(poNumber, orderValueNet),
                ].concat(this.produce(payload, handledProps.concat(['NTAM'])));
            }

            // TODO: foo
            if (changeList.includes('NOLN') && !handledProps.includes('NOLN')) {
                //console.log(changeList);
                const poNumber = payloadObj.PUNO;
                const amountPurchaseOrderLines = payloadObj.NOLN;
                return [
                    new PurchaseOrderNumberOfPurchaseOrderLinesChanged(
                        poNumber,
                        amountPurchaseOrderLines
                    ),
                ].concat(this.produce(payload, handledProps.concat(['NOLN'])));
            }

            if (changeList.includes('COAM') && !handledProps.includes('COAM')) {
                //console.log(changeList);
                const poNumber = payloadObj.PUNO;
                const totalCost = payloadObj.COAM;
                return [
                    new PurchaseOrderTotalOrderCostChanged(poNumber, totalCost),
                ].concat(this.produce(payload, handledProps.concat(['COAM'])));
            }

            if (changeList.includes('TOQT') && !handledProps.includes('TOQT')) {
                const poNumber = payloadObj.PUNO;
                const totalQuantity = payloadObj.TOQT;
                return [
                    new PurchaseOrderTotalQuantityChanged(poNumber, totalQuantity),
                ].concat(this.produce(payload, handledProps.concat(['TOQT'])));
            }

            if (changeList.includes('PYAD') && !handledProps.includes('PYAD')) {
                const poNumber = payloadObj.PUNO;
                const invoiceAddress = payloadObj.PYAD;
                return [
                    new PurchaseOrderOurInvoicingAddressChanged(poNumber, invoiceAddress),
                ].concat(this.produce(payload, handledProps.concat(['PYAD'])));
            }

            if (changeList.includes('TEDL') && !handledProps.includes('TEDL')) {
                const poNumber = payloadObj.PUNO;
                const deliveryTerms = payloadObj.TEDL;
                return [new PurchaseOrderDeliveryTerms(poNumber, deliveryTerms)].concat(
                    this.produce(payload, handledProps.concat(['TEDL']))
                );
            }

            if (changeList.includes('TEPY') && !handledProps.includes('TEPY')) {
                const poNumber = payloadObj.PUNO;
                const paymentTerms = payloadObj.TEPY;
                return [
                    new PurchaseOrderPaymentTermsChanged(poNumber, paymentTerms),
                ].concat(this.produce(payload, handledProps.concat(['TEPY'])));
            }

            if (changeList.includes('PUDT') && !handledProps.includes('PUDT')) {
                const poNumber = payloadObj.PUNO;
                const orderDate = payloadObj.PUDT;
                return [new PurchaseOrderDateChanged(poNumber, orderDate)].concat(
                    this.produce(payload, handledProps.concat(['PUDT']))
                );
            }

            if (changeList.includes('CHNO') && !handledProps.includes('CHNO')) {
                const poNumber = payloadObj.PUNO;
                const changeNumber = parseInt(payloadObj.CHNO);
                return [
                    new PurchaseOrderChangedNumberChanged(poNumber, changeNumber),
                ].concat(this.produce(payload, handledProps.concat(['CHNO'])));
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
            return [
                new PurchaseOrderCreated(
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
                ),
            ];
        }

        if (payloadObj.document === 'MPHEAD' && payloadObj.operation === 'D') {
            const poNumber = parseInt(payloadObj.FACI);
            return [new PurchaseOrderDeleted(poNumber)];
        }

        if (payloadObj.document === 'MPLINE' && payloadObj.operation === 'C') {
            const poNumber = payloadObj.PUNO;
            const lineNumber = parseInt(payloadObj.PNLI);
            const subLineNumber = parseInt(payloadObj.PNLS);
            const itemNumber = payloadObj.ITNO;
            const facilityNumber = payloadObj.FACI;
            const highestStatus = payloadObj.PUST;
            const lowestStatus = payloadObj.PUSL;
            const differentDeliveryAddress = payloadObj.IDAG;
            const supplierId = payloadObj.SUNO;
            const supplierItemNumber = payloadObj.SITE;
            const itemName = payloadObj.PITD;
            const changeNumber = parseInt(payloadObj.CHNO);

            return [
                new PurchaseOrderLineCreated(
                    poNumber,
                    lineNumber,
                    subLineNumber,
                    itemNumber,
                    facilityNumber,
                    highestStatus,
                    lowestStatus,
                    differentDeliveryAddress,
                    supplierId,
                    supplierItemNumber,
                    itemName,
                    changeNumber
                ),
            ];
        }

        if (payloadObj.document === 'MPLINE' && payloadObj.operation === 'D') {
            const poNumber = payloadObj.PUNO;
            const lineNumber = parseInt(payloadObj.PNLI);
            return [new PurchaseOrderLineDeleted(poNumber, lineNumber)];
        }

        if (payloadObj.document === 'MPLINE' && payloadObj.operation === 'U') {
            const changeList: any = [];
            payload.elements.forEach((element) => {
                // if (element.oldvalue !== 'null' && element.newvalue !== 'null') {
                if (element.oldvalue !== element.newvalue) {
                    changeList.push(element.name);
                    // }
                }
            });

            if (changeList.includes('PNLS') && !handledProps.includes('PNLS')) {
                const poNumber = payloadObj.PUNO;
                const lineNumber = parseInt(payloadObj.PNLI);
                const subLineNumber = parseInt(payloadObj.PNLS);
                return [
                    new PurchaseOrderLineSubNumberUpdated(
                        poNumber,
                        lineNumber,
                        subLineNumber
                    ),
                ].concat(this.produce(payload, handledProps.concat(['PNLS'])));
            }

            if (changeList.includes('PUST') && !handledProps.includes('PUST')) {
                const poNumber = payloadObj.PUNO;
                const lineNumber = parseInt(payloadObj.PNLI);
                const subLineNumber = parseInt(payloadObj.PNLS);
                const itemNumber = payloadObj.ITNO;
                const highestStatus = payloadObj.PUST;
                return [
                    new HighestStatusPurchaseOrderUpdated(
                        poNumber,
                        lineNumber,
                        subLineNumber,
                        itemNumber,
                        highestStatus
                    ),
                ].concat(this.produce(payload, handledProps.concat(['PUST'])));
            }

            if (changeList.includes('PUSL') && !handledProps.includes('PUSL')) {
                const poNumber = payloadObj.PUNO;
                const lineNumber = parseInt(payloadObj.PNLI);
                const subLineNumber = parseInt(payloadObj.PNLS);
                const itemNumber = payloadObj.ITNO;
                const lowestStatus = payloadObj.PUSL;
                return [
                    new LowestStatusPurchaseOrderUpdated(
                        poNumber,
                        lineNumber,
                        subLineNumber,
                        itemNumber,
                        lowestStatus
                    ),
                ].concat(this.produce(payload, handledProps.concat(['PUSL'])));
            }

            if (changeList.includes('IDAG') && !handledProps.includes('IDAG')) {
                const poNumber = payloadObj.PUNO;
                const lineNumber = parseInt(payloadObj.PNLI);
                const subLineNumber = parseInt(payloadObj.PNLS);
                const itemNumber = payloadObj.ITNO;
                const differentDeliveryAddress = payloadObj.IDAG;
                return [
                    new DifferentDeliveryAddressUpdated(
                        poNumber,
                        lineNumber,
                        subLineNumber,
                        itemNumber,
                        differentDeliveryAddress
                    ),
                ].concat(this.produce(payload, handledProps.concat(['IDAG'])));
            }

            if (changeList.includes('SUNO') && !handledProps.includes('SUNO')) {
                const poNumber = payloadObj.PUNO;
                const lineNumber = parseInt(payloadObj.PNLI);
                const subLineNumber = parseInt(payloadObj.PNLS);
                const itemNumber = payloadObj.ITNO;
                const supplierId = payloadObj.SUNO;
                return [
                    new SupplierUpdated(
                        poNumber,
                        lineNumber,
                        subLineNumber,
                        itemNumber,
                        supplierId
                    ),
                ].concat(this.produce(payload, handledProps.concat(['SUNO'])));
            }

            if (changeList.includes('ITNO') && !handledProps.includes('ITNO')) {
                const poNumber = payloadObj.PUNO;
                const lineNumber = parseInt(payloadObj.PNLI);
                const subLineNumber = parseInt(payloadObj.PNLS);
                const itemNumber = payloadObj.ITNO;
                return [
                    new ItemUpdated(poNumber, lineNumber, subLineNumber, itemNumber),
                ].concat(this.produce(payload, handledProps.concat(['ITNO'])));
            }

            if (changeList.includes('SITE') && !handledProps.includes('SITE')) {
                const poNumber = payloadObj.PUNO;
                const lineNumber = parseInt(payloadObj.PNLI);
                const subLineNumber = parseInt(payloadObj.PNLS);
                const itemNumber = payloadObj.ITNO;
                const supplierItemId = payloadObj.SITE;
                return [
                    new SupplierItemUpdated(
                        poNumber,
                        lineNumber,
                        subLineNumber,
                        itemNumber,
                        supplierItemId
                    ),
                ].concat(this.produce(payload, handledProps.concat(['SITE'])));
            }

            if (changeList.includes('PITD') && !handledProps.includes('PITD')) {
                const poNumber = payloadObj.PUNO;
                const lineNumber = parseInt(payloadObj.PNLI);
                const subLineNumber = parseInt(payloadObj.PNLS);
                const itemNumber = payloadObj.ITNO;
                const itemName = payloadObj.PITD;
                return [
                    new PurchaseOrderItemNameUpdated(
                        poNumber,
                        lineNumber,
                        subLineNumber,
                        itemNumber,
                        itemName
                    ),
                ].concat(this.produce(payload, handledProps.concat(['PITD'])));
            }

            if (changeList.includes('PITT') && !handledProps.includes('PITT')) {
                const poNumber = payloadObj.PUNO;
                const lineNumber = parseInt(payloadObj.PNLI);
                const subLineNumber = parseInt(payloadObj.PNLS);
                const itemNumber = payloadObj.ITNO;
                const itemDescription = payloadObj.PITT;
                return [
                    new PurchaseOrderItemDescriptionUpdated(
                        poNumber,
                        lineNumber,
                        subLineNumber,
                        itemNumber,
                        itemDescription
                    ),
                ].concat(this.produce(payload, handledProps.concat(['PITT'])));
            }

            if (changeList.includes('SORN') && !handledProps.includes('SORN')) {
                const poNumber = payloadObj.PUNO;
                const lineNumber = parseInt(payloadObj.PNLI);
                const subLineNumber = parseInt(payloadObj.PNLS);
                const itemNumber = payloadObj.ITNO;
                const supplierOrderId = payloadObj.SORN;
                return [
                    new SupplierOrderUpdated(
                        poNumber,
                        lineNumber,
                        subLineNumber,
                        itemNumber,
                        supplierOrderId
                    ),
                ].concat(this.produce(payload, handledProps.concat(['SORN'])));
            }

            if (changeList.includes('PUPR') && !handledProps.includes('PUPR')) {
                const poNumber = payloadObj.PUNO;
                const lineNumber = parseInt(payloadObj.PNLI);
                const subLineNumber = parseInt(payloadObj.PNLS);
                const itemNumber = payloadObj.ITNO;
                const price = parseFloat(payloadObj.PUPR);
                return [
                    new PurchasePriceUpdated(
                        poNumber,
                        lineNumber,
                        subLineNumber,
                        itemNumber,
                        price
                    ),
                ].concat(this.produce(payload, handledProps.concat(['PUPR'])));
            }

            if (changeList.includes('CPPR') && !handledProps.includes('CPPR')) {
                const poNumber = payloadObj.PUNO;
                const lineNumber = parseInt(payloadObj.PNLI);
                const subLineNumber = parseInt(payloadObj.PNLS);
                const itemNumber = payloadObj.ITNO;
                const confirmedPrice = parseFloat(payloadObj.CPPR);
                return [
                    new ConfirmedPurchasePriceUpdated(
                        poNumber,
                        lineNumber,
                        subLineNumber,
                        itemNumber,
                        confirmedPrice
                    ),
                ].concat(this.produce(payload, handledProps.concat(['CPPR'])));
            }

            if (changeList.includes('PPUN') && !handledProps.includes('PPUN')) {
                const poNumber = payloadObj.PUNO;
                const lineNumber = parseInt(payloadObj.PNLI);
                const subLineNumber = parseInt(payloadObj.PNLS);
                const itemNumber = payloadObj.ITNO;
                const priceUnitofMeasure = payloadObj.PPUN;
                return [
                    new PurchasePriceUnitOfMeasureUpdated(
                        poNumber,
                        lineNumber,
                        subLineNumber,
                        itemNumber,
                        priceUnitofMeasure
                    ),
                ].concat(this.produce(payload, handledProps.concat(['PPUN'])));
            }

            if (changeList.includes('PUCD') && !handledProps.includes('PUCD')) {
                const poNumber = payloadObj.PUNO;
                const lineNumber = parseInt(payloadObj.PNLI);
                const subLineNumber = parseInt(payloadObj.PNLS);
                const itemNumber = payloadObj.ITNO;
                const priceQuantity = parseFloat(payloadObj.PUCD);
                return [
                    new PurchasePriceQuantityUpdated(
                        poNumber,
                        lineNumber,
                        subLineNumber,
                        itemNumber,
                        priceQuantity
                    ),
                ].concat(this.produce(payload, handledProps.concat(['PUCD'])));
            }

            if (changeList.includes('CPUC') && !handledProps.includes('CPUC')) {
                const poNumber = payloadObj.PUNO;
                const lineNumber = parseInt(payloadObj.PNLI);
                const subLineNumber = parseInt(payloadObj.PNLS);
                const itemNumber = payloadObj.ITNO;
                const ConfirmedPriceQuantity = parseFloat(payloadObj.CPUC);
                return [
                    new ConfirmedPurchasePriceQuantityUpdated(
                        poNumber,
                        lineNumber,
                        subLineNumber,
                        itemNumber,
                        ConfirmedPriceQuantity
                    ),
                ].concat(this.produce(payload, handledProps.concat(['CPUC'])));
            }

            if (changeList.includes('PTCD') && !handledProps.includes('PTCD')) {
                const poNumber = payloadObj.PUNO;
                const lineNumber = parseInt(payloadObj.PNLI);
                const subLineNumber = parseInt(payloadObj.PNLS);
                const itemNumber = payloadObj.ITNO;
                const priceText = parseFloat(payloadObj.PTCD);
                return [
                    new PurchasePriceTextUpdated(
                        poNumber,
                        lineNumber,
                        subLineNumber,
                        itemNumber,
                        priceText
                    ),
                ].concat(this.produce(payload, handledProps.concat(['PTCD'])));
            }

            if (changeList.includes('LNAM') && !handledProps.includes('LNAM')) {
                const poNumber = payloadObj.PUNO;
                const lineNumber = parseInt(payloadObj.PNLI);
                const subLineNumber = parseInt(payloadObj.PNLS);
                const itemNumber = payloadObj.ITNO;
                const Currency = parseFloat(payloadObj.LNAM);
                return [
                    new LineAmountOrderCurrencyUpdated(
                        poNumber,
                        lineNumber,
                        subLineNumber,
                        itemNumber,
                        Currency
                    ),
                ].concat(this.produce(payload, handledProps.concat(['LNAM'])));
            }

            if (changeList.includes('DWDT') && !handledProps.includes('DWDT')) {
                const poNumber = payloadObj.PUNO;
                const lineNumber = parseInt(payloadObj.PNLI);
                const subLineNumber = parseInt(payloadObj.PNLS);
                const itemNumber = payloadObj.ITNO;
                const requestedDateStr = payloadObj.DWDT;
                let requestedDate: Date | null = null;
                if (requestedDateStr && requestedDateStr !== '') {
                    requestedDate = parseDate(requestedDateStr);
                }
                return [
                    new RequestedDeliveryDateUpdated(
                        poNumber,
                        lineNumber,
                        subLineNumber,
                        itemNumber,
                        requestedDate
                    ),
                ].concat(this.produce(payload, handledProps.concat(['DWDT'])));
            }

            if (changeList.includes('CODT') && !handledProps.includes('CODT')) {
                const poNumber = payloadObj.PUNO;
                const lineNumber = parseInt(payloadObj.PNLI);
                const subLineNumber = parseInt(payloadObj.PNLS);
                const itemNumber = payloadObj.ITNO;
                const confirmedDateStr = payloadObj.CODT;
                let confirmedDate: Date | null = null;
                if (confirmedDateStr && confirmedDateStr !== '') {
                    confirmedDate = parseDate(confirmedDateStr);
                }
                return [
                    new ConfirmedDeliveryDateUpdated(
                        poNumber,
                        lineNumber,
                        subLineNumber,
                        itemNumber,
                        confirmedDate
                    ),
                ].concat(this.produce(payload, handledProps.concat(['CODT'])));
            }

            if (changeList.includes('PUUN') && !handledProps.includes('PUUN')) {
                const poNumber = payloadObj.PUNO;
                const lineNumber = parseInt(payloadObj.PNLI);
                const subLineNumber = parseInt(payloadObj.PNLS);
                const itemNumber = payloadObj.ITNO;
                const OrderUnitofMeasure = payloadObj.PUUN;
                return [
                    new PurchaseOrderLineUnitOfMeasureUpdated(
                        poNumber,
                        lineNumber,
                        subLineNumber,
                        itemNumber,
                        OrderUnitofMeasure
                    ),
                ].concat(this.produce(payload, handledProps.concat(['PUUN'])));
            }

            if (changeList.includes('TEDL') && !handledProps.includes('TEDL')) {
                const poNumber = payloadObj.PUNO;
                const lineNumber = parseInt(payloadObj.PNLI);
                const subLineNumber = parseInt(payloadObj.PNLS);
                const itemNumber = payloadObj.ITNO;
                const Terms = payloadObj.TEDL;
                return [
                    new PurchaseOrderLineDeliveryTermsUpdated(
                        poNumber,
                        lineNumber,
                        subLineNumber,
                        itemNumber,
                        Terms
                    ),
                ].concat(this.produce(payload, handledProps.concat(['TEDL'])));
            }

            if (changeList.includes('MODL') && !handledProps.includes('MODL')) {
                const poNumber = payloadObj.PUNO;
                const lineNumber = parseInt(payloadObj.PNLI);
                const subLineNumber = parseInt(payloadObj.PNLS);
                const itemNumber = payloadObj.ITNO;
                const Method = payloadObj.MODL;
                return [
                    new PurchaseOrderLineDeliveryMethodUpdated(
                        poNumber,
                        lineNumber,
                        subLineNumber,
                        itemNumber,
                        Method
                    ),
                ].concat(this.produce(payload, handledProps.concat(['MODL'])));
            }

            if (changeList.includes('CFQA') && !handledProps.includes('CFQA')) {
                const poNumber = payloadObj.PUNO;
                const lineNumber = parseInt(payloadObj.PNLI);
                const subLineNumber = parseInt(payloadObj.PNLS);
                const itemNumber = payloadObj.ITNO;
                const ConfirmedQuantity = parseFloat(payloadObj.CFQA);
                return [
                    new PurchaseOrderLineConfirmedQuantityUpdated(
                        poNumber,
                        lineNumber,
                        subLineNumber,
                        itemNumber,
                        ConfirmedQuantity
                    ),
                ].concat(this.produce(payload, handledProps.concat(['CFQA'])));
            }

            if (changeList.includes('ORQA') && !handledProps.includes('ORQA')) {
                const poNumber = payloadObj.PUNO;
                const lineNumber = parseInt(payloadObj.PNLI);
                const subLineNumber = parseInt(payloadObj.PNLS);
                const itemNumber = payloadObj.ITNO;
                const OrderedQuantityUnitOfMeasure = parseFloat(payloadObj.ORQA);
                return [
                    new PurchaseOrderLineOrderedQuantityAlternateUnitOfMeasureUpdated(
                        poNumber,
                        lineNumber,
                        subLineNumber,
                        itemNumber,
                        OrderedQuantityUnitOfMeasure
                    ),
                ].concat(this.produce(payload, handledProps.concat(['ORQA'])));
            }

            if (changeList.includes('CHNO') && !handledProps.includes('CHNO')) {
                const poNumber = payloadObj.PUNO;
                const lineNumber = parseInt(payloadObj.PNLI);
                const subLineNumber = parseInt(payloadObj.PNLS);
                const itemNumber = payloadObj.ITNO;
                const changeNumber = parseInt(payloadObj.CHNO);
                return [
                    new PurchaseOrderLineChangeNumberUpdated(
                        poNumber,
                        lineNumber,
                        subLineNumber,
                        itemNumber,
                        changeNumber
                    ),
                ].concat(this.produce(payload, handledProps.concat(['CHNO'])));
            }
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
    const arrayToObj = function (payload) {
        return payload.map(function (x) {
            const data = {};
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
