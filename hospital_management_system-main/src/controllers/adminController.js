const { Payment } = require('../models');


const getAllPayments = async (req, res) => {

    const payments = await Payment.findAll({});

    if (!payments) {
        return res.status(400).json({ message: "No payments found", data: null });
    }

    return res.json({
        message: "Payments fetched successfully",
        data: payments
    })
}

const updatePaymentStatus = async (req, res) => {

    const { paymentId, status } = req.body;

    const payment = await Payment.findOne({
        where: {
            id: paymentId
        }
    });

    if (!payment) {
        return res.status(400).json({ message: "Payment not found", data: null });
    }

    payment.status = status;

    await payment.save();

    return res.json({
        message: "Payment status updated successfully",
        data: payment
    });

}

module.exports = {
    getAllPayments,
    updatePaymentStatus
}