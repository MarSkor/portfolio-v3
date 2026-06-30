"use client";
import { useState } from "react";
import { Send } from "lucide-react";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await base44.integrations.Core.SendEmail({
        to: "hello@alexrivera.dev",
        subject: `New message from ${form.name}`,
        body: `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
      });
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or email me directly.");
    }
  };

  if (status === "success") {
    return (
      <div className="border border-border bg-card p-8 text-center">
        <p className="font-heading text-xl text-foreground">
          Thanks for reaching out.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          I'll get back to you within a day or two.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="link-underline mt-4 text-sm font-medium text-foreground"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="label-meta mb-2 block">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="label-meta mb-2 block">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="label-meta mb-2 block">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="w-full resize-none border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground"
          placeholder="What's on your mind?"
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-11 items-center gap-2 border border-foreground px-6 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground hover:text-background hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)] disabled:opacity-50"
      >
        <Send className="h-4 w-4" />
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
};

export default ContactForm;
