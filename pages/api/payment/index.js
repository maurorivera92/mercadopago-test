import { plan } from "@/data/plans/suscriptions";
import { MercadoPagoConfig, Payment, PreApproval, PreApprovalPlan } from "mercadopago";

export default async function handler(req, res) {
    try {
        if (req.method == "POST") {
            const formBody = JSON.parse(req.body)
            const client = new MercadoPagoConfig({
                accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
                options: { timeout: 5000 }
            });
            const preApproval = new PreApproval(client);
            console.log(formBody)
            return preApproval.create({ body: {
                reason: 'LR Premium',
                status: "pending",
                payer_email: formBody.email,
                auto_recurring: {
                    frequency: 12,
                    frequency_type: 'months',
                    transaction_amount: 12.34,
                    currency_id: 'PEN',
                },
                back_url: 'https://larepublica.pe'
            } }).then(res.status(200).json).catch(console.error);
        }
        return res.status(404)
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ error })
    }
}
