"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plan = exports.CheapRestaurantSaleOff = exports.SaleOff = exports.PercentDiscountApplicationFn = exports.FreeApplicationFn = void 0;
const date_fns_1 = require("date-fns");
const FreeApplicationFn = () => (ctx, plan) => {
    return new Plan(Object.assign(Object.assign({}, plan), { price: 0, isSaleOff: true }));
};
exports.FreeApplicationFn = FreeApplicationFn;
const PercentDiscountApplicationFn = (percent) => (ctx, plan) => {
    return new Plan(Object.assign(Object.assign({}, plan), { price: (100 - percent) * plan.price, isSaleOff: true }));
};
exports.PercentDiscountApplicationFn = PercentDiscountApplicationFn;
class SaleOff {
    constructor(obj, applicationFn) {
        Object.assign(this, obj);
        this.applicationFn = applicationFn;
    }
    isWithinSaleOffDate(ctx) {
        const now = new Date();
        return (0, date_fns_1.isAfter)(now, this.from) && (0, date_fns_1.isBefore)(now, this.to);
    }
    isViableForSaleOff(ctx) {
        if (!this.isWithinSaleOffDate(ctx)) {
            return;
        }
        return this.isApplicable(ctx);
    }
    applyOnly(ctx, plan) {
        return this.applicationFn(ctx, plan);
    }
    apply(ctx, plan) {
        if (!this.isViableForSaleOff(ctx)) {
            // Current context is not viable for saleoff
            return plan;
        }
        return this.applicationFn(ctx, plan);
    }
}
exports.SaleOff = SaleOff;
class CheapRestaurantSaleOff extends SaleOff {
    constructor(obj, applicationFn) {
        super(obj, applicationFn);
        this.threshold = obj.threshold;
    }
    isApplicable({ restaurant }) {
        return restaurant.price <= this.threshold;
    }
}
exports.CheapRestaurantSaleOff = CheapRestaurantSaleOff;
class Plan {
    constructor(obj) {
        this.isSaleOff = false;
        Object.assign(this, obj);
        if (obj.saleOffs) {
            this.saleOffs = obj.saleOffs.map((data) => {
                let applicationFnCreator = data.application === 'free' ? exports.FreeApplicationFn : exports.PercentDiscountApplicationFn;
                let percent = data.percent;
                switch (data.type) {
                    case 'cheap_sale_off':
                    default:
                        return new CheapRestaurantSaleOff(Object.assign(Object.assign({}, data), { from: new Date(data.from), to: new Date(data.to) }), applicationFnCreator(percent));
                }
            });
        }
    }
    findSaleOff(ctx) {
        if (!this.saleOffs || this.saleOffs.length === 0) {
            return this;
        }
        if (this.isSaleOff) {
            // This is already a saleoff brand, no more saleoff can be applied upon
            return this;
        }
        let saleOff = this.saleOffs.find((saleOff) => saleOff.isViableForSaleOff(ctx));
        if (!saleOff) {
            return this;
        }
        return saleOff.applyOnly(ctx, this);
    }
}
exports.Plan = Plan;
//# sourceMappingURL=Plan.js.map