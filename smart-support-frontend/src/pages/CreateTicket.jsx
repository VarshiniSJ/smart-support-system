
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Info,
  Send,
  Headphones,
  Clock3,
} from "lucide-react";
import api from "../services/api";

function CreateTicket() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !description.trim()) {
      setError("Please complete all required fields.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await api.post(
        "/api/tickets",
        {
          title: title.trim(),
          description: description.trim(),
          priority,
          status: "OPEN",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to create your ticket. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const priorities = [
    {
      value: "LOW",
      label: "Low",
      description: "General request",
      color: "border-slate-200",
      selected: "border-blue-500 bg-blue-50 ring-2 ring-blue-100",
      dot: "bg-emerald-500",
    },
    {
      value: "MEDIUM",
      label: "Medium",
      description: "Needs attention",
      color: "border-slate-200",
      selected: "border-blue-500 bg-blue-50 ring-2 ring-blue-100",
      dot: "bg-amber-500",
    },
    {
      value: "HIGH",
      label: "High",
      description: "Urgent issue",
      color: "border-slate-200",
      selected: "border-blue-500 bg-blue-50 ring-2 ring-blue-100",
      dot: "bg-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f6f8fc] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1050px]">

        {/* Back navigation */}
        <button
          type="button"
          onClick={() => navigate("/customer-dashboard")}
          className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </button>

        {/* Page heading */}
        <div className="mb-7">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-blue-600">
            Customer Support
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Create a New Ticket
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Tell us about the issue you're facing. Our support team will
            review your request and help you resolve it.
          </p>
        </div>

        {/* Main form container */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {success ? (

            /* Success screen */
            <div className="flex min-h-[390px] flex-col items-center justify-center px-6 py-12 text-center sm:min-h-[420px] sm:px-10">
              <div className="mb-5 flex h-[68px] w-[68px] items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/60">
                <CheckCircle2 size={36} strokeWidth={2} />
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Ticket Created Successfully!
              </h2>

              <p className="mt-3 max-w-md text-sm leading-7 text-slate-500">
                Your support request has been submitted successfully.
                Our support team will review your issue and get back to you.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-emerald-700">
                  Your request has been received
                </span>
              </div>

              <button
                type="button"
                onClick={() => navigate("/customer-dashboard")}
                className="mt-7 inline-flex h-12 min-w-[190px] items-center justify-center rounded-xl bg-blue-600 px-7 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                Back to Dashboard
              </button>
            </div>

          ) : (

            /* Ticket creation form */
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:gap-10 lg:p-9">

                {/* Left column */}
                <section>
                  <div className="mb-6">
                    <h2 className="text-base font-bold text-slate-900">
                      Ticket Information
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Provide details about your issue.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="ticketTitle"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Ticket Title
                        <span className="ml-1 text-red-500">*</span>
                      </label>

                      <input
                        id="ticketTitle"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter a short title for your issue"
                        required
                        className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="ticketDescription"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Description
                        <span className="ml-1 text-red-500">*</span>
                      </label>

                      <textarea
                        id="ticketDescription"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your issue in detail. Include any steps that may help us understand the problem."
                        required
                        rows={6}
                        className="w-full resize-y rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                      />

                      <p className="mt-2 text-xs text-slate-400">
                        Please provide enough information to help our team.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Right column */}
                <section>
                  <div className="mb-6">
                    <h2 className="text-base font-bold text-slate-900">
                      Request Settings
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Select the priority of your request.
                    </p>
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-semibold text-slate-700">
                      Ticket Priority
                    </label>

                    <div className="space-y-3">
                      {priorities.map((item) => (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => setPriority(item.value)}
                          className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                            priority === item.value
                              ? item.selected
                              : `${item.color} hover:border-slate-300 hover:bg-slate-50`
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`h-2.5 w-2.5 rounded-full ${item.dot}`}
                            />

                            <div>
                              <p className="text-sm font-semibold text-slate-800">
                                {item.label}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          <span
                            className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                              priority === item.value
                                ? "border-blue-600"
                                : "border-slate-300"
                            }`}
                          >
                            {priority === item.value && (
                              <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                            )}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Information panel */}
                  <div className="mt-7 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
                    <div className="flex items-start gap-3">
                      <Info
                        size={19}
                        className="mt-0.5 shrink-0 text-blue-600"
                      />

                      <div>
                        <h3 className="text-sm font-semibold text-slate-800">
                          Before submitting
                        </h3>
                        <p className="mt-1 text-xs leading-6 text-slate-600">
                          Make sure your title and description clearly explain
                          the issue. Our support team will review your request.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Support information */}
                  <div className="mt-5 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <Headphones size={17} className="text-slate-400" />
                      <span>Support team assistance</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <Clock3 size={17} className="text-slate-400" />
                      <span>Track your request from your dashboard</span>
                    </div>
                  </div>
                </section>
              </div>

              {/* Error message */}
              {error && (
                <div className="mx-6 mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 sm:mx-8 lg:mx-9">
                  {error}
                </div>
              )}

              {/* Submit section */}
              <div className="border-t border-slate-100 px-6 py-6 text-center sm:px-8 lg:px-9">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-12 min-w-[190px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send size={16} />
                      Submit Ticket
                    </>
                  )}
                </button>

                <p className="mt-3 text-xs text-slate-400">
                  Your request will be sent securely to our support team.
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-8 pb-5 text-center">
          <p className="text-xs leading-6 text-slate-400">
            SmartSupport · Service Request Management
          </p>
        </footer>
      </div>
    </div>
  );
}

export default CreateTicket;
