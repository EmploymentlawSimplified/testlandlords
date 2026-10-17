/* ================================================================
   WEB3FORMS HANDLER — Contact enquiry form
   The New Start Project Community CIC

   SETUP: paste your Web3Forms access key below.
   Get one free at https://web3forms.com (enter the inbox that
   should receive submissions, then confirm the email).
   This key is designed to be public — it is safe in client code.
   ================================================================ */

var WEB3FORMS_ACCESS_KEY = "3ada368c-250c-447c-9adf-6dd1694cdc2a";

(function () {
  "use strict";

  var form = document.getElementById("enquiry-form");
  if (!form) return;

  var button = form.querySelector('button[type="submit"]');
  var status = document.getElementById("form-status");
  var buttonLabel = button ? button.textContent : "Send Enquiry";

  function setStatus(message, kind) {
    if (!status) return;
    status.textContent = message;
    status.className = "form-status" + (kind ? " is-" + kind : "");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.reportValidity()) return;

    if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE") {
      setStatus(
        "This form is not connected yet — the site owner needs to add a Web3Forms access key. " +
          "Please email contact@thenewstartproject.co.uk or call 01803 446133.",
        "error"
      );
      return;
    }

    var data = Object.fromEntries(new FormData(form).entries());
    data.access_key = WEB3FORMS_ACCESS_KEY;
    data.from_name = "New Start Project website";
    data.subject =
      "Website enquiry: " + (data.enquiry_type || "General") + " — " + (data.name || "no name given");

    if (button) {
      button.disabled = true;
      button.textContent = "Sending…";
    }
    setStatus("Sending your enquiry…", "working");

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        return response.json().then(function (json) {
          return { ok: response.ok, json: json };
        });
      })
      .then(function (result) {
        if (result.ok && result.json.success) {
          window.location.href = "thank-you.html";
          return;
        }
        throw new Error(result.json.message || "Submission failed");
      })
      .catch(function () {
        if (button) {
          button.disabled = false;
          button.textContent = buttonLabel;
        }
        setStatus(
          "Sorry — your enquiry could not be sent. Please email contact@thenewstartproject.co.uk " +
            "or call 01803 446133 and we will pick it up straight away.",
          "error"
        );
      });
  });
})();
