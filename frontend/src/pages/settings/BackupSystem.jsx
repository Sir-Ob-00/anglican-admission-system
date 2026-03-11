import { useEffect, useMemo, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Panel from "../../components/common/Panel";
import Table from "../../components/common/Table";
import Badge from "../../components/common/Badge";
import { formatDate } from "../../utils/helpers";
import * as backupService from "../../services/backupService";

const demo = [
  { id: "b1", name: "backup_2026_03_07.zip", createdAt: "2026-03-07T02:15:00.000Z", status: "ready" },
  { id: "b2", name: "backup_2026_03_01.zip", createdAt: "2026-03-01T02:15:00.000Z", status: "ready" },
];

export default function BackupSystem() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const data = await backupService.listBackups();
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
      { key: "name", header: "Backup" },
      { key: "createdAt", header: "Created", render: (r) => formatDate(r.createdAt) },
      { key: "status", header: "Status", render: (r) => <Badge tone="success">{String(r.status).toUpperCase()}</Badge> },
      {
        key: "actions",
        header: "Actions",
        render: (r) => (
          <button
            type="button"
            className="inline-flex h-9 items-center justify-center rounded-2xl bg-slate-900/5 px-3 text-xs font-semibold text-slate-800 hover:bg-slate-900/10"
            onClick={() => alert(`Restore ${r.name} (placeholder)`)}
          >
            Restore
          </button>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-4">
      <PageHeader title="System Backup" subtitle="Create backups, view history, and restore." />

      <Panel className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-display text-lg font-semibold text-slate-900">Create backup</div>
            <div className="mt-1 text-sm text-slate-600">Backend hook: `POST /api/settings/backup`.</div>
          </div>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-[color:var(--brand)] px-5 text-sm font-semibold text-white shadow-sm hover:brightness-110"
            onClick={async () => {
              try {
                await backupService.createBackup();
                const data = await backupService.listBackups();
                setRows(Array.isArray(data) ? data : data.items || []);
              } catch {
                alert("Backup create failed. Check backend permissions.");
              }
            }}
          >
            Create Backup
          </button>
        </div>
      </Panel>

      <Table title="Backup History" rows={rows} columns={columns} searchable={false} />
    </div>
  );
}
