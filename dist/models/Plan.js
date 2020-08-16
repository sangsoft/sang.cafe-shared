"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
exports.FreeApplicationFn = () => (ctx, plan) => {
    return new Plan(Object.assign(Object.assign({}, plan), { price: 0 }));
};
exports.PercentDiscountApplicationFn = (percent) => (ctx, plan) => {
    return new Plan(Object.assign(Object.assign({}, plan), { price: (100 - percent) * plan.price }));
};
class SaleOff {
    constructor(obj, applicationFn) {
        Object.assign(this, obj);
        this.applicationFn = applicationFn;
    }
    isWithinSaleOffDate(ctx) {
        const now = new Date();
        return date_fns_1.isAfter(now, this.from) && date_fns_1.isBefore(now, this.to);
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
        Object.assign(this, obj);
    }
    findSaleOff(ctx) {
        let saleOff = this.saleOffs.find((saleOff) => saleOff.isViableForSaleOff(ctx));
        if (!saleOff) {
            return this;
        }
        return saleOff.applyOnly(ctx, this);
    }
}
exports.Plan = Plan;
//# sourceMappingURL=Plan.js.map