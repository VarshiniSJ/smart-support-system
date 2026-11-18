
import { useNavigate } from "react-router-dom";
import {
  Headphones,
  LayoutDashboard,
  Ticket,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  Clock3,
  CheckCircle2,
  CircleDot,
  ArrowRight,
} from "lucide-react";

function CustomerDashboard() {
  const navigate = useNavigate();

  let user = {};

  try {
    user = JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    user = {};
  }

  const customerName =
    user.name ||
    user.fullName ||
    user.email?.split("@")[0] ||
    "Customer";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const stats = [
    {
      label: "Total tickets",
      value: "—",
      icon: Ticket,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Open tickets",
      value: "—",
      icon: CircleDot,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "In progress",
      value: "—",
      icon: Clock3,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      label: "Resolved",
      value: "—",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800">

      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[230px_minmax(0,1fr)]">

        {/* SIDEBAR */}
        <aside className="hidden h-screen sticky top-0 flex-col border-r border-slate-200 bg-white lg:flex">

          <div className="flex h-[72px] items-center gap-3 border-b border-slate-100 px-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Headphones size={19} />
            </div>

            <span className="text-base font-bold text-slate-900">
              SmartSupport
            </span>
          </div>

          <div className="flex-1 px-4 py-7">
            <p className="mb-4 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Menu
            </p>

            <nav className="space-y-1">
              <button className="flex w-full items-center gap-3 rounded-lg bg-blue-50 px-3 py-3 text-sm font-medium text-blue-700">
                <LayoutDashboard size={18} />
                Dashboard
              </button>

              <button
                onClick={() => navigate("/my-tickets")}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
              >
                <Ticket size={18} />
                My tickets
              </button>

              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-500 transition hover:bg-slate-50 hover:text-slate-900">
                <MessageSquare size={18} />
                Messages
              </button>

              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-500 transition hover:bg-slate-50 hover:text-slate-900">
                <Settings size={18} />
                Settings
              </button>
            </nav>
          </div>

          <div className="border-t border-slate-100 p-4">
            <div className="mb-3 rounded-lg bg-slate-50 p-3">
              <p className="text-xs font-semibold text-slate-800">
                Need help?
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Our support team is here for you.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-500 transition hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={18} />
              Sign out
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="min-w-0">

          {/* TOP BAR */}
          <header className="flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
            <div>
              <p className="text-xs text-slate-400">
                Customer workspace
              </p>
              <h2 className="mt-0.5 text-sm font-semibold text-slate-900">
                Dashboard
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                {customerName.charAt(0).toUpperCase()}
              </div>

              <div className="hidden sm:block">
                <p className="max-w-[160px] truncate text-xs font-semibold text-slate-800">
                  {customerName}
                </p>
                <p className="text-[11px] text-slate-400">
                  Customer
                </p>
              </div>

              <button
                onClick={handleLogout}
                aria-label="Sign out"
                className="ml-2 rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
              >
                <LogOut size={18} />
              </button>
            </div>
          </header>

          {/* PAGE BODY */}
          <div className="mx-auto w-full max-w-[1400px] px-5 py-8 sm:px-8 lg:px-10">

            {/* WELCOME */}
            <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                  Hello, {customerName}
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  Manage your support requests in one place.
                </p>
              </div>

              <button
                onClick={() => navigate("/create-ticket")}
                className="flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                <Plus size={17} />
                New ticket
              </button>
            </section>

            {/* STATS */}
            <section className="mb-9">
              <h2 className="mb-4 text-sm font-semibold text-slate-800">
                Overview
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <div
                      key={stat.label}
                      className="flex min-h-[112px] items-center gap-4 rounded-lg border border-slate-200 bg-white p-5"
                    >
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.bg} ${stat.color}`}>
                        <Icon size={19} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-2xl font-semibold text-slate-900">
                          {stat.value}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* TICKETS AND HELP */}
            <section className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_270px]">

              {/* RECENT TICKETS */}
              <div className="min-w-0 rounded-lg border border-slate-200 bg-white">

                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900">
                      Recent tickets
                    </h2>
                    <p className="mt-1 text-xs text-slate-400">
                      Your latest support requests
                    </p>
                  </div>

                  <button
                    onClick={() => navigate("/my-tickets")}
                    className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800"
                  >
                    View all
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="flex min-h-[220px] flex-col items-center justify-center px-5 py-8 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                    <Ticket size={22} />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-slate-800">
                    No tickets yet
                  </h3>

                  <p className="mt-2 max-w-[300px] text-xs leading-5 text-slate-400">
                    You haven't submitted any support requests.
                    Create your first ticket to get started.
                  </p>

                  <button
                    onClick={() => navigate("/create-ticket")}
                    className="mt-4 text-xs font-semibold text-blue-600 hover:text-blue-800"
                  >
                    Create a ticket
                  </button>
                </div>
              </div>

              {/* HELP PANEL */}
              <div className="rounded-lg border border-slate-200 bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Headphones size={20} />
                </div>

                <h2 className="mt-4 text-sm font-semibold text-slate-900">
                  How can we help?
                </h2>

                <p className="mt-2 text-xs leading-6 text-slate-500">
                  Need assistance with a service request? Submit a ticket
                  and our support team will help you.
                </p>

                <div className="mt-5 border-t border-slate-100 pt-4">
                  <p className="text-xs font-medium text-slate-600">
                    Support workspace
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    We're here to make things easier.
                  </p>
                </div>
              </div>
            </section>

            {/* FOOTER */}
            <footer className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row sm:justify-between">
              <p>© 2026 SmartSupport</p>
              <p>Customer support made simple.</p>
            </footer>

          </div>
        </main>
      </div>
    </div>
  );
}

export default CustomerDashboard;
