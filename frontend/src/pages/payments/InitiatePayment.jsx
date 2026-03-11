import PageHeader from "../../components/common/PageHeader";
import Panel from "../../components/common/Panel";
import PaymentForm from "../../components/forms/PaymentForm";
import * as paymentService from "../../services/paymentService";

export default function InitiatePayment() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Initiate Payment"
        subtitle="Create a payment request for an applicant."
      />
      <div className="grid gap-3 lg:grid-cols-3">
        <Panel className="p-5 lg:col-span-2">
          <PaymentForm
            onSubmit={async (values) => {
              await paymentService.initiatePayment(values);
              alert("Payment initiated (placeholder).");
            }}
          />
        </Panel>
        <Panel className="p-5">
          <div className="font-display text-lg font-semibold text-slate-900">Payment instructions</div>
          <div className="mt-2 text-sm leading-relaxed text-slate-700">
            Parents can pay via bank transfer or card. Once payment is completed, the applicant moves
            to the next workflow step.
          </div>
          <div className="mt-4 rounded-2xl bg-white/60 p-3 text-sm text-slate-700">
            Backend hook: `POST /api/payments`
          </div>
        </Panel>
      </div>
    </div>
  );
}
