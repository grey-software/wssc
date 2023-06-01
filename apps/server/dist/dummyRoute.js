"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testingRouter = (0, express_1.Router)();
testingRouter.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Testing Endpoint Works"
    });
});
exports.default = testingRouter;
//# sourceMappingURL=dummyRoute.js.map