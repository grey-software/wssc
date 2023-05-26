
import { Router } from "express";

const testingRouter: Router = Router();

testingRouter.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Testing Endpoint Works"
    })
})

export default testingRouter;