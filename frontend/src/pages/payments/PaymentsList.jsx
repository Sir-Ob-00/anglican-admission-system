import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/common/Table";
import Badge from "../../components/common/Badge";
import { formatDate } from "../../utils/helpers";
import { useAuth } from "../../context/AuthContext";
import * as paymentService from "../../services/paymentService";

const demo = [
  {
    id: "p1",
    applicant: "Jane N. Okafor",
    amount: 75000,
    status: "awaiting_payment",
    method: "bank_transfer",
    date: "2026-03-07T10:00:00.000Z",
  },
  {
    id: "p2",
    applicant: "David A. Mensah",
    amount: 75000,
    status: "payment_completed",
    method: "card",
    date: "2026-03-04T10:00:00.000Z",
  },
];

function money(n) {
  if (typeof n !== "number") return "—";
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "NGN" }).format(n);
}

export default function PaymentsList() {
  const navigate = useNavigate();
  const { role } = useAuth();
  const [rows, setRows] = useState([]);

  async function refresh() {
    const data = await paymentService.listPayments();
    const items = Array.isArray(data) ? data : data.items || [];
    setRows(items);
  }

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const data = await paymentService.listPayments();
        const items = Array.isArray(data) ? data : data.items || [];
        if (!ignore) setRows(items);
      } catch {
        if (!ignore) setRows(demo);
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  const columns = useMemo(
    () => [
      {
        key: "applicant",
        header: "Applicant",
        render: (r) => r.applicant?.fullName || r.applicant || "—",
      },
      { key: "amount", header: "Amount", render: (r) => money(r.amount) },
      {
        key: "status",
        header: "Payment Status",
        render: (r) => (
          <Badge tone={r.status === "verified" ? "success" : "warning"}>
            {String(r.status).replaceAll("_", " ").toUpperCase()}
          </Badge>
        ),
      },
      { key: "method", header: "Payment Method", render: (r) => String(r.method || "—").replaceAll("_", " ") },
      { key: "date", header: "Date", render: (r) => formatDate(r.paidAt || r.createdAt || r.date) },
      {
        key: "actions",
        header: "Actions",
        render: (r) =>
          role === "parent" && r.status !== "verified" ? (
            <button
              type="button"
              className="inline-flex h-9 items-center justify-center rounded-2xl bg-[color:var(--brand)] px-3 text-xs font-semibold text-white hover:brightness-110"
              onClick={(e) => {
                e.stopPropagation();
                (async () => {
                  try {
                    await paymentService.verifyPayment({ paymentId: r._id || r.id });
                    await refresh();
                  } catch {
                    alert("Payment verification failed. Check backend.");
                  }
                })();
              }}
            >
              Pay
            </button>
          ) : (
            <span className="text-xs text-slate-500">—</span>
          ),
      },
    ],
    [role]
  );

  return (
    <div className="space-y-4">
      <PageHeader
        title="Payments"
        subtitle="Track and manage admission fee payments."
        right={
          role !== "parent" ? (
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-[color:var(--brand)] px-5 text-sm font-semibold text-white shadow-sm hover:brightness-110"
              onClick={() => navigate("/payments/initiate")}
            >
              Initiate Payment
            </button>
          ) : null
        }
      />
      <Table title="Payments List" rows={rows} columns={columns} />
    </div>
  );
}
