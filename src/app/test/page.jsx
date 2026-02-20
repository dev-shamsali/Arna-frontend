"use client";

import { useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";

export default function TestPaymentPage() {
  const [sessionId, setSessionId] = useState("");

  const handlePayment = async () => {
    if (!sessionId) {
      alert("Enter paymentSessionId first");
      return;
    }

    const cashfree = await load({
      mode: "sandbox", // IMPORTANT
    });

    cashfree.checkout({
      paymentSessionId: sessionId,
      redirectTarget: "_self",
    });
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Sandbox Payment Test</h2>

      <input
        type="text"
        placeholder="Paste paymentSessionId here"
        value={sessionId}
        onChange={(e) => setSessionId(e.target.value)}
        style={{
          width: "500px",
          padding: "10px",
          marginTop: "20px",
        }}
      />

      <br /><br />

      <button
        onClick={handlePayment}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Start Payment
      </button>
    </div>
  );
}
