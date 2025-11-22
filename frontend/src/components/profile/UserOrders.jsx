import React from "react";

const statusColors = {
  requested: "text-yellow-500/70",
  accepted: "text-blue-500/70",
  "in-progress": "text-indigo-500/70",
  completed: "text-green-500/70",
  cancelled: "text-red-500/70",
};

const UserOrders = ({ orders = [], status }) => {
  if (status === "loading")
    return <div className="p-4 border rounded">Loading orders…</div>;

  return (
    <div className="p-4 border border-border rounded bg-cardBg">
      <h2 className="text-lg font-medium mb-3">My Orders</h2>
      {orders?.length === 0 ? (
        <p className="text-sm text-mutedText">
          You have no orders yet.{" "}
          <a href="/contact" className="text-blue-600 underline">
            Create one
          </a>
          .
        </p>
      ) : (
        <ul className="space-y-3">
          {orders.map((o) => (
            <li
              key={o._id || o.id}
              className="p-3 border border-border rounded"
            >
              <div className="flex justify-between">
                <div>
                  <div className="font-medium">{o.projectType || "Order"}</div>
                  <div className="text-sm text-mutedText">
                    {new Date(o.createdAt).toLocaleString()}
                  </div>
                </div>
                <div
                  className={`text-sm font-semibold ${
                    statusColors[o.status] || "text-gray-500"
                  }`}
                >
                  {o.status.charAt(0).toUpperCase() +
                    o.status.slice(1).replace("-", " ")}
                </div>
              </div>

              {o.projectBrief && (
                <p className="mt-2 text-sm text-text">
                  {o.projectBrief.slice(0, 200)}
                  {o.projectBrief.length > 200 ? "..." : ""}
                </p>
              )}

              <div className="mt-2 text-xs text-mutedText">
                Attachments: {o.attachments?.length || 0}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserOrders;
