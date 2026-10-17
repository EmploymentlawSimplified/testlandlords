/* ================================================================
   REFERRAL & PRE-ADMISSION ASSESSMENT FORM
   The New Start Project Community CIC

   Ported from referral-system.jsx to dependency-free vanilla JS
   so it runs on the static site with no build step.

   Web3Forms form: "Referral Form" — delivers to paul@thenewstartproject.co.uk
   This is NOT the same key as the contact form (see js/forms.js), which
   delivers to contact@thenewstartproject.co.uk. Keep the two separate.
   Access keys are public and safe to use in client-side code.
   ================================================================ */

var WEB3FORMS_ACCESS_KEY = "0637e2dc-ec46-4aa5-a8bf-66d67e02709e";

(function () {
  "use strict";

  /* ---------------- OPTION SETS ---------------- */

  var ACCOMMODATION_OPTIONS = [
    "Rough sleeping", "Hostel", "Supported accommodation", "Temporary accommodation",
    "Prison", "Hospital", "Staying with family", "Staying with friends",
    "Private rented accommodation", "Social housing", "Other"
  ];

  var DRUG_OPTIONS = [
    "Heroin", "Crack cocaine", "Cocaine", "Cannabis", "Amphetamines",
    "Methamphetamine", "MDMA/ecstasy", "Ketamine", "Benzodiazepines",
    "Synthetic cannabinoids/Spice", "Other", "None", "Unknown"
  ];

  var LIVING_SKILLS = [
    "Cooking", "Cleaning", "Laundry", "Personal hygiene", "Shopping", "Budgeting",
    "Benefits", "Appointments", "Medication", "Time management", "Public transport",
    "Maintaining accommodation", "Communication", "Employment", "Education/training"
  ];

  var SKILL_LEVELS = [
    "Independent", "Needs some support", "Needs regular support",
    "Needs significant support", "Unknown"
  ];

  var MENTAL_HEALTH_CONDITIONS = [
    "Depression", "Anxiety", "PTSD", "Psychosis", "Bipolar disorder",
    "Other mental-health difficulties"
  ];

  var SAFEGUARDING_CONCERNS = [
    "Domestic abuse", "Exploitation", "Criminal exploitation", "Sexual exploitation",
    "Financial abuse", "Gang involvement", "Coercive control",
    "Vulnerability to others", "Self-neglect", "Other safeguarding concerns"
  ];

  var YNU = ["Yes", "No", "Unknown"];

  /* ---------------- FORM SCHEMA ---------------- */

  function yes(key) { return function (d) { return d[key] === "Yes"; }; }

  var STEPS = [
    {
      short: "Applicant",
      title: "Applicant Details",
      desc: "Information about the person being referred to The New Start Project.",
      fields: [
        { key: "fullName", label: "Full Name", type: "text", required: true },
        { key: "preferredName", label: "Preferred Name", type: "text" },
        { key: "dob", label: "Date of Birth", type: "date", required: true },
        { key: "phone", label: "Telephone", type: "tel" },
        { key: "email", label: "Email", type: "email" },
        { key: "address", label: "Current Address / Location", type: "textarea", required: true },
        { key: "emergencyName", label: "Emergency Contact Name", type: "text" },
        { key: "emergencyPhone", label: "Emergency Contact Telephone", type: "tel" }
      ]
    },
    {
      short: "Referrer",
      title: "Referrer Details",
      desc: "About the person making this referral.",
      fields: [
        { key: "referrerName", label: "Referrer Name", type: "text", required: true },
        { key: "referrerOrg", label: "Organisation", type: "text", required: true },
        { key: "referrerTitle", label: "Job Title", type: "text" },
        { key: "referrerPhone", label: "Telephone", type: "tel" },
        { key: "referrerEmail", label: "Email", type: "email", required: true },
        { key: "referrerRelationship", label: "Relationship to Applicant", type: "text" }
      ]
    },
    {
      short: "Reason",
      title: "Reason for Referral",
      fields: [
        { key: "referralReason", label: "Why is this person being referred to The New Start Project?", type: "textarea", required: true, placeholder: "Please provide as much detail as possible" },
        { key: "currentAccommodation", label: "Current Accommodation", type: "radio", options: ACCOMMODATION_OPTIONS, required: true },
        { key: "accommodationReason", label: "Why do they require accommodation at The New Start Project?", type: "textarea", required: true }
      ]
    },
    {
      short: "Recovery",
      title: "Recovery Information",
      desc: "The New Start Project is a drug- and alcohol-free recovery environment.",
      note: "<strong>Drug and alcohol history are recorded separately</strong> \u2014 the dates may differ.",
      fields: [
        { key: "lastDrugUse", label: "Date Applicant Last Used Drugs", type: "date", required: true },
        { key: "drugAbstinenceApprox", label: "Approximate Length of Drug Abstinence", type: "text", placeholder: "e.g. 6 months" },
        { key: "lastAlcoholUse", label: "Date Applicant Last Consumed Alcohol", type: "date", required: true },
        { key: "alcoholAbstinenceApprox", label: "Approximate Length of Alcohol Abstinence", type: "text", placeholder: "e.g. 3 months" },
        { key: "previousDrugs", label: "What drugs has the applicant previously used?", type: "multicheck", options: DRUG_OPTIONS },
        { key: "alcoholProblems", label: "Previously experienced problems with alcohol?", type: "choice", options: YNU },
        { key: "previousTreatment", label: "Previously received drug or alcohol treatment?", type: "choice", options: YNU },
        { key: "currentTreatment", label: "Currently receiving drug or alcohol treatment?", type: "choice", options: YNU },
        { key: "recoveryMedication", label: "Currently prescribed recovery-related medication?", type: "choice", options: YNU },
        { key: "previousRelapse", label: "Has the applicant experienced a previous relapse?", type: "choice", options: YNU },
        {
          type: "group", showIf: yes("previousRelapse"),
          fields: [
            { key: "relapseWhen", label: "When?", type: "text" },
            { key: "relapseWhat", label: "What happened?", type: "textarea" },
            { key: "relapseSubstance", label: "Substance involved?", type: "text" },
            { key: "relapseTrigger", label: "What triggered the relapse?", type: "textarea" },
            { key: "relapseSupport", label: "Support received?", type: "textarea" },
            { key: "relapseDifferent", label: "What is different now?", type: "textarea" }
          ]
        }
      ]
    },
    {
      short: "Motivation",
      title: "Recovery Motivation",
      fields: [
        { key: "recoveryMotivation", label: "Why does the applicant want to enter recovery accommodation?", type: "textarea", required: true },
        { key: "recoveryMeaning", label: "What does recovery mean to them?", type: "textarea" },
        { key: "recoveryGoals", label: "Recovery goals?", type: "textarea" },
        { key: "relapseTriggers", label: "Main triggers for relapse?", type: "textarea" },
        { key: "currentSupport", label: "Current support?", type: "textarea" },
        { key: "supportNeeded", label: "Support needed?", type: "textarea" },
        {
          key: "willingAbstinent", required: true, type: "choice",
          label: "Willing to remain abstinent from drugs and alcohol while at The New Start Project?",
          flag: function (d) {
            if (d.willingAbstinent === "No") return { level: "warning", text: "\u26a0 Flagged for review \u2014 applicant is not willing to remain abstinent." };
            if (d.willingAbstinent === "Unsure") return { level: "warning", text: "\u26a0 Flagged for review \u2014 applicant is unsure about willingness to remain abstinent." };
            return null;
          }
        },
        { key: "understandsDrugFree", label: "Understands The New Start Project is a drug- and alcohol-free environment?", type: "choice", required: true }
      ]
    },
    {
      short: "Justice",
      title: "Criminal Justice",
      desc: "Criminal history does not automatically make someone unsuitable. We assess current risk and accommodation safety.",
      fields: [
        { key: "arrested", label: "Ever been arrested?", type: "choice", options: YNU },
        { key: "charged", label: "Ever been charged?", type: "choice", options: YNU },
        { key: "convicted", label: "Ever been convicted?", type: "choice", options: YNU },
        { key: "convictionDetails", label: "Details of convictions", type: "textarea", showIf: yes("convicted") },
        { key: "prison", label: "Ever been to prison?", type: "choice", options: YNU },
        { key: "probation", label: "Currently on probation?", type: "choice", options: YNU },
        { key: "currentCourtProceedings", label: "Current court proceedings?", type: "choice", options: YNU },
        { key: "currentLicenceConditions", label: "Current licence conditions?", type: "choice", options: YNU },
        { key: "accommodationRestrictions", label: "Accommodation restrictions?", type: "choice", options: YNU },
        { key: "restrictionDetails", label: "Details of accommodation restrictions", type: "textarea", showIf: yes("accommodationRestrictions") },
        { key: "multiAgencyRisk", label: "Multi-agency risk management (e.g. MAPPA)?", type: "choice", options: YNU },
        { key: "multiAgencyDetails", label: "Details of multi-agency involvement", type: "textarea", showIf: yes("multiAgencyRisk") }
      ]
    },
    {
      short: "Violence",
      title: "Violence & Aggression",
      fields: [
        {
          key: "violenceLevel", label: "Has the applicant ever been violent or physically aggressive?",
          type: "radio", required: true,
          options: ["No", "Yes \u2014 historical", "Yes \u2014 current concern", "Unknown"]
        },
        {
          type: "group",
          showIf: function (d) {
            return d.violenceLevel === "Yes \u2014 historical" || d.violenceLevel === "Yes \u2014 current concern";
          },
          fields: [
            { key: "violenceWhat", label: "What happened?", type: "textarea" },
            { key: "violenceWhen", label: "When?", type: "text" },
            { key: "violenceCause", label: "What caused it?", type: "textarea" },
            { key: "violenceSeverity", label: "How serious?", type: "textarea" },
            { key: "violenceInjury", label: "Anyone injured?", type: "choice", options: YNU },
            { key: "violencePolice", label: "Police involvement?", type: "choice", options: YNU },
            { key: "violenceChanged", label: "What has changed?", type: "textarea" },
            { key: "violenceCurrentRisk", label: "Current risk?", type: "choice" }
          ]
        },
        { key: "threatened", label: "Threatened anyone?", type: "choice", options: YNU },
        { key: "violenceToStaff", label: "Violent towards staff?", type: "choice", options: YNU },
        { key: "violenceToResident", label: "Violent towards another resident?", type: "choice", options: YNU },
        { key: "domesticAbuse", label: "Domestic abuse involvement?", type: "choice", options: YNU },
        { key: "propertyDamage", label: "Serious property damage?", type: "choice", options: YNU }
      ]
    },
    {
      short: "Risk to self",
      title: "Risk to Self",
      fields: [
        { key: "selfHarm", label: "Self-harm", type: "choice", options: YNU },
        { key: "suicideAttempts", label: "Suicide attempts", type: "choice", options: YNU },
        {
          key: "currentSuicidal", label: "Current suicidal thoughts", type: "choice", options: YNU,
          flag: function (d) {
            return d.currentSuicidal === "Yes"
              ? { level: "urgent", text: "\ud83d\udea8 URGENT PROFESSIONAL REVIEW REQUIRED \u2014 current suicidal ideation identified. If there is immediate risk to life, call 999 now." }
              : null;
          }
        },
        { key: "selfNeglect", label: "Severe self-neglect", type: "choice", options: YNU },
        { key: "overdoseHistory", label: "Overdose history", type: "choice", options: YNU },
        { key: "drugRisk", label: "Drug-related risk", type: "choice", options: YNU },
        { key: "alcoholRisk", label: "Alcohol-related risk", type: "choice", options: YNU },
        { key: "exploitation", label: "Exploitation", type: "choice", options: YNU },
        { key: "vulnerability", label: "Vulnerability", type: "choice", options: YNU },
        {
          key: "selfRiskDetails", label: "Details of risk to self", type: "textarea",
          showIf: function (d) {
            return ["selfHarm", "suicideAttempts", "currentSuicidal", "overdoseHistory"]
              .some(function (k) { return d[k] === "Yes"; });
          }
        }
      ]
    },
    {
      short: "Mental health",
      title: "Mental Health",
      fields: [
        { key: "mentalHealthConditions", label: "Has the applicant experienced any of the following?", type: "multicheck", options: MENTAL_HEALTH_CONDITIONS },
        { key: "mentalHealthSupport", label: "Currently receiving mental-health support?", type: "choice", options: YNU },
        { key: "mentalHealthService", label: "Service or professional", type: "textarea", showIf: yes("mentalHealthSupport") },
        { key: "mentalHealthNotes", label: "Anything staff need to know to support them safely?", type: "textarea" }
      ]
    },
    {
      short: "Safeguarding",
      title: "Safeguarding",
      fields: [
        { key: "safeguardingConcerns", label: "Are there concerns involving any of the following?", type: "multicheck", options: SAFEGUARDING_CONCERNS },
        {
          key: "safeguardingDetails", label: "Details of safeguarding concerns", type: "textarea",
          showIf: function (d) { return (d.safeguardingConcerns || []).length > 0; }
        }
      ]
    },
    {
      short: "Housing",
      title: "Homelessness & Accommodation History",
      fields: [
        { key: "previousHomelessness", label: "Previous homelessness", type: "choice", options: YNU },
        { key: "roughSleepingHistory", label: "Rough sleeping history", type: "choice", options: YNU },
        { key: "previousSupportedAccom", label: "Previous supported accommodation", type: "choice", options: YNU },
        { key: "previousEvictions", label: "Previous evictions", type: "choice", options: YNU },
        { key: "tenancyBreakdown", label: "Previous tenancy breakdown", type: "choice", options: YNU },
        { key: "accommodationBreaches", label: "Breaches of accommodation rules", type: "choice", options: YNU },
        { key: "housingPropertyDamage", label: "Property damage", type: "choice", options: YNU },
        { key: "antiSocialBehaviour", label: "Anti-social behaviour", type: "choice", options: YNU },
        { key: "accommodationBarriers", label: "What has prevented stable accommodation in the past?", type: "textarea" },
        { key: "accommodationSupportNeeded", label: "What support would help maintain accommodation now?", type: "textarea" }
      ]
    },
    {
      short: "Living skills",
      title: "Independent-Living Skills",
      desc: "Assess the current level of independence in each area.",
      fields: [{ type: "skills" }]
    },
    {
      short: "Opinion",
      title: "Referrer's Professional Opinion",
      fields: [
        { key: "referrerStrengths", label: "Applicant's main strengths?", type: "textarea", required: true },
        { key: "referrerRisks", label: "Main risks?", type: "textarea" },
        { key: "referrerSupportNeeded", label: "Support required?", type: "textarea" },
        { key: "referrerSuitable", label: "Currently suitable for a drug- and alcohol-free recovery environment?", type: "choice", required: true },
        { key: "referrerExplanation", label: "Please explain your recommendation", type: "textarea", required: true }
      ]
    },
    {
      short: "Review",
      title: "Review & Submit",
      desc: "Please review the information before submitting.",
      fields: [{ type: "review" }]
    }
  ];

  /* ---------------- HELPERS ---------------- */

  function daysBetween(dateStr) {
    if (!dateStr) return null;
    var d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    return Math.max(0, Math.floor((new Date() - d) / 86400000));
  }

  function formatAbstinence(days) {
    if (days === null) return "Unknown";
    if (days < 7) return days + " day" + (days !== 1 ? "s" : "");
    if (days < 30) {
      var w = Math.floor(days / 7);
      return w + " week" + (w !== 1 ? "s" : "") + " (" + days + " days)";
    }
    if (days < 365) {
      var m = Math.floor(days / 30);
      return m + " month" + (m !== 1 ? "s" : "") + " (" + days + " days)";
    }
    var y = Math.floor(days / 365);
    return y + " year" + (y !== 1 ? "s" : "") + " (" + days + " days)";
  }

  function genId() {
    return "NSP-" + Date.now().toString(36).toUpperCase() + "-" +
      Math.random().toString(36).substring(2, 6).toUpperCase();
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* ---------------- ASSESSMENT ENGINE ---------------- */

  function runAssessment(data) {
    var drugDays = daysBetween(data.lastDrugUse);
    var alcoholDays = daysBetween(data.lastAlcoholUse);

    var recovery = {
      drugAbstinence: formatAbstinence(drugDays),
      alcoholAbstinence: formatAbstinence(alcoholDays),
      drugDays: drugDays,
      alcoholDays: alcoholDays,
      substances: (data.previousDrugs || []).filter(function (d) { return d !== "None" && d !== "Unknown"; }),
      previousTreatment: data.previousTreatment,
      currentTreatment: data.currentTreatment,
      previousRelapse: data.previousRelapse,
      willingAbstinent: data.willingAbstinent,
      understandsDrugFree: data.understandsDrugFree
    };

    var risks = [], flags = [];

    var relapseRisk = "LOW";
    if (drugDays !== null && drugDays < 30) { relapseRisk = "HIGH"; risks.push("Very recent drug use (under 30 days)"); }
    else if (drugDays !== null && drugDays < 90) { relapseRisk = "MODERATE"; risks.push("Drug abstinence under 90 days"); }
    if (alcoholDays !== null && alcoholDays < 30) {
      relapseRisk = relapseRisk === "HIGH" ? "HIGH" : "MODERATE";
      risks.push("Very recent alcohol use");
    }
    if (data.previousRelapse === "Yes") risks.push("History of relapse");
    if (data.willingAbstinent === "No") {
      relapseRisk = "HIGH";
      risks.push("Not willing to remain abstinent");
      flags.push("Applicant not willing to remain abstinent \u2014 flagged for review");
    }
    if (data.willingAbstinent === "Unsure") {
      if (relapseRisk === "LOW") relapseRisk = "MODERATE";
      risks.push("Unsure about abstinence commitment");
      flags.push("Applicant unsure about abstinence \u2014 flagged for review");
    }

    var violenceRisk = "LOW";
    if (data.violenceLevel === "Yes \u2014 current concern") {
      violenceRisk = "HIGH";
      risks.push("Current violence/aggression concerns");
      flags.push("Current violence concern identified");
    } else if (data.violenceLevel === "Yes \u2014 historical") {
      violenceRisk = "MODERATE";
      risks.push("Historical violence/aggression");
    }
    if (data.violenceToStaff === "Yes") { violenceRisk = "HIGH"; risks.push("History of violence towards staff"); }
    if (data.violenceToResident === "Yes") {
      if (violenceRisk === "LOW") violenceRisk = "MODERATE";
      risks.push("Violence towards residents");
    }
    if (data.domesticAbuse === "Yes") risks.push("Domestic abuse involvement");

    var selfRisk = "LOW";
    if (data.currentSuicidal === "Yes") {
      selfRisk = "HIGH";
      risks.push("Current suicidal thoughts");
      flags.push("URGENT PROFESSIONAL REVIEW REQUIRED \u2014 current suicidal ideation");
    }
    if (data.selfHarm === "Yes") { if (selfRisk !== "HIGH") selfRisk = "MODERATE"; risks.push("Self-harm"); }
    if (data.overdoseHistory === "Yes") { if (selfRisk !== "HIGH") selfRisk = "MODERATE"; risks.push("Overdose history"); }
    if (data.suicideAttempts === "Yes") { selfRisk = "HIGH"; risks.push("Previous suicide attempts"); }

    var cjRisk = "LOW";
    if (data.currentCourtProceedings === "Yes") { cjRisk = "MODERATE"; risks.push("Current court proceedings"); }
    if (data.currentLicenceConditions === "Yes") { cjRisk = "MODERATE"; risks.push("Current licence conditions"); }
    if (data.accommodationRestrictions === "Yes") {
      cjRisk = "HIGH";
      risks.push("Accommodation restrictions");
      flags.push("Accommodation restrictions \u2014 management review required");
    }
    if (data.multiAgencyRisk === "Yes") {
      cjRisk = "HIGH";
      risks.push("Multi-agency risk management active");
      flags.push("MAPPA/multi-agency involvement \u2014 management review required");
    }

    var mhRisk = "LOW";
    var mhC = data.mentalHealthConditions || [];
    if (mhC.indexOf("Psychosis") > -1 || mhC.indexOf("Bipolar disorder") > -1) mhRisk = "MODERATE";
    if (mhC.length > 0 && data.mentalHealthSupport === "No") {
      if (mhRisk === "LOW") mhRisk = "MODERATE";
      risks.push("Mental health conditions without current support");
    }

    var sgRisk = "LOW";
    var sgC = data.safeguardingConcerns || [];
    if (sgC.length > 0) {
      sgRisk = "MODERATE";
      risks.push("Safeguarding concerns: " + sgC.join(", "));
      if (sgC.some(function (c) {
        return ["Criminal exploitation", "Sexual exploitation", "Gang involvement"].indexOf(c) > -1;
      })) {
        sgRisk = "HIGH";
        flags.push("Serious safeguarding concern \u2014 requires review");
      }
    }

    var housingRisk = "LOW";
    if (data.previousEvictions === "Yes") { housingRisk = "MODERATE"; risks.push("Previous evictions"); }
    if (data.roughSleepingHistory === "Yes") risks.push("Rough sleeping history");
    if (data.antiSocialBehaviour === "Yes") {
      if (housingRisk === "LOW") housingRisk = "MODERATE";
      risks.push("Anti-social behaviour history");
    }

    var skills = data.livingSkills || {};
    var skillValues = Object.keys(skills).map(function (k) { return skills[k]; });
    var sigNeeds = skillValues.filter(function (v) { return v === "Needs significant support"; }).length;
    var livingRisk = sigNeeds > 5 ? "HIGH" : sigNeeds > 2 ? "MODERATE" : "LOW";
    if (sigNeeds > 2) risks.push("Significant support needed in " + sigNeeds + " independent-living areas");

    var protective = [];
    if (drugDays !== null && drugDays > 90) protective.push("Sustained drug abstinence (" + formatAbstinence(drugDays) + ")");
    if (alcoholDays !== null && alcoholDays > 90) protective.push("Sustained alcohol abstinence (" + formatAbstinence(alcoholDays) + ")");
    if (data.currentTreatment === "Yes") protective.push("Currently engaged in treatment");
    if (data.willingAbstinent === "Yes") protective.push("Willing to remain abstinent");
    if (data.understandsDrugFree === "Yes") protective.push("Understands drug/alcohol-free environment");
    if (data.recoveryMotivation && data.recoveryMotivation.length > 50) protective.push("Articulated recovery motivation");
    if (data.referrerSuitable === "Yes") protective.push("Referrer considers currently suitable");
    if (data.currentSupport && data.currentSupport.length > 10) protective.push("Existing support network");
    var indSkills = skillValues.filter(function (v) { return v === "Independent"; }).length;
    if (indSkills > 8) protective.push("Strong independent-living skills");

    var riskLevels = [relapseRisk, violenceRisk, selfRisk, cjRisk, mhRisk, sgRisk, housingRisk, livingRisk];
    var hasUrgent = flags.some(function (f) { return f.indexOf("URGENT") > -1; });
    var highCount = riskLevels.filter(function (r) { return r === "HIGH"; }).length;
    var modCount = riskLevels.filter(function (r) { return r === "MODERATE"; }).length;

    var overallConcern;
    if (hasUrgent) overallConcern = "URGENT";
    else if (highCount >= 2 || (highCount >= 1 && modCount >= 2)) overallConcern = "HIGH";
    else if (highCount === 1 || modCount >= 3) overallConcern = "MODERATE";
    else overallConcern = "LOW";

    var recommendation;
    if (hasUrgent) recommendation = "MANAGEMENT REVIEW REQUIRED";
    else if (data.willingAbstinent === "No") recommendation = "NOT CURRENTLY SUITABLE";
    else if (overallConcern === "HIGH") recommendation = "MANAGEMENT REVIEW REQUIRED";
    else if (overallConcern === "MODERATE") recommendation = "SUITABLE WITH CONDITIONS / SUPPORT PLAN";
    else if (overallConcern === "LOW" && protective.length >= 2) recommendation = "SUITABLE";
    else recommendation = "SUITABLE WITH CONDITIONS / SUPPORT PLAN";
    if (data.referrerSuitable === "No" && recommendation === "SUITABLE") recommendation = "FURTHER INFORMATION REQUIRED";

    var reason = "";
    if (recommendation === "SUITABLE") {
      reason = "No significant current concerns identified. The applicant demonstrates adequate abstinence, recovery motivation, and willingness to comply with a drug- and alcohol-free environment. Protective factors support admission.";
    } else if (recommendation === "SUITABLE WITH CONDITIONS / SUPPORT PLAN") {
      reason = "Some areas of concern have been identified (" + risks.slice(0, 3).join("; ") + "), but these appear manageable with appropriate support planning and monitoring. Protective factors (" + protective.slice(0, 3).join("; ") + ") provide a reasonable foundation.";
    } else if (recommendation === "FURTHER INFORMATION REQUIRED") {
      reason = "Additional information is needed before an admission decision can be made. Key gaps: " + risks.slice(0, 3).join("; ") + ".";
    } else if (recommendation === "MANAGEMENT REVIEW REQUIRED") {
      reason = "Significant concerns require management-level review: " + (flags.join("; ") || risks.slice(0, 3).join("; ")) + ".";
    } else if (recommendation === "NOT CURRENTLY SUITABLE") {
      reason = "The applicant does not currently meet the requirements for a drug- and alcohol-free recovery environment. Primary factors: " + risks.slice(0, 3).join("; ") + ".";
    }

    return {
      id: genId(),
      date: new Date().toISOString(),
      recovery: recovery,
      risks: risks,
      flags: flags,
      protective: protective,
      riskBreakdown: {
        relapse: relapseRisk, violence: violenceRisk, selfHarm: selfRisk,
        criminalJustice: cjRisk, mentalHealth: mhRisk, safeguarding: sgRisk,
        housing: housingRisk, livingSkills: livingRisk
      },
      overallConcern: overallConcern,
      recommendation: recommendation,
      reason: reason
    };
  }

  /* ---------------- STATE ---------------- */

  var STORAGE_KEY = "nsp-referral-draft";
  var state = { step: 0, maxStep: 0, data: { livingSkills: {}, previousDrugs: [], mentalHealthConditions: [], safeguardingConcerns: [] } };

  function loadDraft() {
    try {
      var raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      var saved = JSON.parse(raw);
      if (saved && saved.data) {
        state.data = saved.data;
        state.step = saved.step || 0;
        state.maxStep = Math.max(saved.maxStep || 0, state.step);
        state.restored = true;
      }
    } catch (e) { /* ignore */ }
  }

  function saveDraft() {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step: state.step, maxStep: state.maxStep, data: state.data }));
    } catch (e) { /* ignore */ }
  }

  function clearDraft() {
    try { window.sessionStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
  }

  function set(key, value) {
    state.data[key] = value;
    saveDraft();
  }

  /* ---------------- RENDER ---------------- */

  var root = document.getElementById("referral-app");
  if (!root) return;

  function visibleFields(step) {
    var out = [];
    step.fields.forEach(function (f) {
      if (f.showIf && !f.showIf(state.data)) return;
      if (f.type === "group") {
        f.fields.forEach(function (child) { out.push(child); });
      } else {
        out.push(f);
      }
    });
    return out;
  }

  function fieldHtml(f) {
    var v = state.data[f.key];
    var html = '<div class="rf-field" data-field="' + esc(f.key) + '">';
    html += '<label for="rf-' + esc(f.key) + '">' + f.label + (f.required ? '<span class="rf-req">*</span>' : "") + "</label>";

    if (f.type === "textarea") {
      html += '<textarea id="rf-' + esc(f.key) + '" data-key="' + esc(f.key) + '"' +
        (f.placeholder ? ' placeholder="' + esc(f.placeholder) + '"' : "") + ">" + esc(v || "") + "</textarea>";
    } else if (f.type === "choice" || f.type === "radio") {
      var options = f.options || ["Yes", "No", "Unsure"];
      html += '<div class="rf-choices" role="group">';
      options.forEach(function (o) {
        html += '<button type="button" class="rf-pill' + (v === o ? " is-on" : "") + '"' +
          ' data-choice="' + esc(f.key) + '" data-value="' + esc(o) + '"' +
          ' aria-pressed="' + (v === o) + '">' + esc(o) + "</button>";
      });
      html += "</div>";
    } else if (f.type === "multicheck") {
      var sel = state.data[f.key] || [];
      html += '<div class="rf-choices" role="group">';
      (f.options || []).forEach(function (o) {
        var on = sel.indexOf(o) > -1;
        html += '<button type="button" class="rf-pill rf-check' + (on ? " is-on" : "") + '"' +
          ' data-multi="' + esc(f.key) + '" data-value="' + esc(o) + '"' +
          ' aria-pressed="' + on + '">' + esc(o) + "</button>";
      });
      html += "</div>";
    } else {
      html += '<input id="rf-' + esc(f.key) + '" type="' + esc(f.type) + '" data-key="' + esc(f.key) + '"' +
        ' value="' + esc(v || "") + '"' +
        (f.placeholder ? ' placeholder="' + esc(f.placeholder) + '"' : "") + ">";
    }

    html += '<div class="rf-error">This question needs an answer before you can continue.</div>';

    if (f.flag) {
      var flag = f.flag(state.data);
      if (flag) html += '<div class="rf-flag is-' + flag.level + '">' + esc(flag.text) + "</div>";
    }

    html += "</div>";
    return html;
  }

  function skillsHtml() {
    var skills = state.data.livingSkills || {};
    var html = "<div>";
    LIVING_SKILLS.forEach(function (skill) {
      html += '<div class="rf-skill-row"><div class="rf-skill-name">' + esc(skill) + "</div>";
      html += '<select data-skill="' + esc(skill) + '" aria-label="' + esc(skill) + '">';
      html += '<option value="">Select</option>';
      SKILL_LEVELS.forEach(function (level) {
        html += '<option value="' + esc(level) + '"' + (skills[skill] === level ? " selected" : "") + ">" + esc(level) + "</option>";
      });
      html += "</select></div>";
    });
    return html + "</div>";
  }

  function reviewHtml() {
    var d = state.data;
    var sections = [
      ["Applicant", [["Name", d.fullName], ["Date of birth", d.dob], ["Current location", d.address]]],
      ["Referrer", [["Name", d.referrerName], ["Organisation", d.referrerOrg], ["Email", d.referrerEmail], ["Telephone", d.referrerPhone]]],
      ["Recovery", [
        ["Drug abstinence", formatAbstinence(daysBetween(d.lastDrugUse))],
        ["Alcohol abstinence", formatAbstinence(daysBetween(d.lastAlcoholUse))],
        ["Previous drugs", (d.previousDrugs || []).join(", ")],
        ["Willing to remain abstinent", d.willingAbstinent]
      ]],
      ["Risk", [
        ["Violence", d.violenceLevel],
        ["Self-harm", d.selfHarm],
        ["Current suicidal thoughts", d.currentSuicidal],
        ["Safeguarding concerns", (d.safeguardingConcerns || []).join(", ")]
      ]],
      ["Professional opinion", [["Considered suitable", d.referrerSuitable]]]
    ];

    var html = "";
    sections.forEach(function (section) {
      var rows = section[1].filter(function (r) { return r[1]; });
      if (!rows.length) return;
      html += '<div class="rf-review-sec"><h3>' + esc(section[0]) + "</h3>";
      rows.forEach(function (r) {
        html += '<div class="rf-review-row"><span>' + esc(r[0]) + "</span><span>" + esc(r[1]) + "</span></div>";
      });
      html += "</div>";
    });

    html += '<div class="rf-consent">' +
      "<h3>Data Protection &amp; Consent</h3>" +
      "<p>The information provided will be stored securely and used solely for assessing the applicant's " +
      "suitability for accommodation at The New Start Project. It includes health and offending information, " +
      "which is special category data under UK GDPR. The summary generated on submission is decision support " +
      "for our staff \u2014 it is not an automated admission decision, and every referral is reviewed by a person.</p>" +
      '<label class="rf-consent-check">' +
      '<input type="checkbox" id="rf-consent"' + (state.data.consentConfirmed ? " checked" : "") + ">" +
      "<span>I confirm consent has been obtained from the applicant, or another lawful basis exists for sharing this information.</span>" +
      "</label></div>";

    return html;
  }

  function render() {
    var step = STEPS[state.step];
    var isLast = state.step === STEPS.length - 1;

    var html = '<div class="rf-progress" role="navigation" aria-label="Form progress">';
    STEPS.forEach(function (s, i) {
      if (i > 0) html += '<div class="rf-line' + (i <= state.step ? " is-done" : "") + '"></div>';
      var cls = i === state.step ? "is-active" : i < state.step ? "is-done" : "";
      var reachable = i <= state.maxStep;
      html += '<button type="button" class="rf-dot ' + cls + '" data-goto="' + i + '"' +
        (reachable ? "" : " disabled") +
        ' title="' + esc(s.title) + '" aria-label="Step ' + (i + 1) + ": " + esc(s.title) + '">' +
        (i < state.step ? "\u2713" : i + 1) + "</button>";
    });
    html += "</div>";

    html += '<div class="rf-card">';
    html += '<div class="rf-step-label">Step ' + (state.step + 1) + " of " + STEPS.length + "</div>";
    html += "<h2>" + esc(step.title) + "</h2>";
    if (step.desc) html += '<p class="rf-desc">' + esc(step.desc) + "</p>";
    if (step.note) html += '<div class="rf-note">' + step.note + "</div>";

    step.fields.forEach(function (f) {
      if (f.type === "skills") { html += skillsHtml(); return; }
      if (f.type === "review") { html += reviewHtml(); return; }
      if (f.type === "group") {
        if (!f.showIf || f.showIf(state.data)) {
          html += '<div class="rf-conditional">';
          f.fields.forEach(function (child) { html += fieldHtml(child); });
          html += "</div>";
        }
        return;
      }
      if (f.showIf && !f.showIf(state.data)) return;
      html += fieldHtml(f);
    });

    html += '<div class="rf-status" id="rf-status"></div>';
    html += "</div>";

    html += '<div class="rf-actions">';
    html += state.step > 0
      ? '<button type="button" class="rf-btn rf-btn-secondary" data-nav="back">Back</button>'
      : '<div class="rf-spacer"></div>';
    html += isLast
      ? '<button type="button" class="rf-btn rf-btn-primary" data-nav="submit"' +
        (state.data.consentConfirmed ? "" : " disabled") + ">Submit Referral</button>"
      : '<button type="button" class="rf-btn rf-btn-primary" data-nav="next">Continue</button>';
    html += "</div>";

    html += '<p class="rf-saved">Your progress is kept in this browser tab only. Closing the tab clears it.' +
      ' <button type="button" id="rf-reset" class="callout-link" style="background:none;border:none;cursor:pointer;font:inherit;text-decoration:underline;padding:0;">Start again</button></p>';

    root.innerHTML = html;
  }

  /* ---------------- VALIDATION ---------------- */

  function validateStep() {
    var fields = visibleFields(STEPS[state.step]);
    var firstBad = null;

    fields.forEach(function (f) {
      if (!f.required || !f.key) return;
      var v = state.data[f.key];
      var empty = v === undefined || v === null || v === "" ||
        (Array.isArray(v) && v.length === 0);
      var el = root.querySelector('[data-field="' + f.key + '"]');
      if (!el) return;
      if (empty) {
        el.classList.add("has-error");
        if (!firstBad) firstBad = el;
      } else {
        el.classList.remove("has-error");
      }
    });

    if (firstBad) {
      firstBad.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  }

  /* ---------------- SUBMISSION ---------------- */

  function buildPayload(assessment) {
    var payload = {};
    payload.access_key = WEB3FORMS_ACCESS_KEY;
    payload.from_name = "New Start Project referral form";
    payload.subject = "REFERRAL " + assessment.id + " \u2014 " +
      (state.data.fullName || "unnamed applicant") + " \u2014 " + assessment.recommendation;
    payload.replyto = state.data.referrerEmail || "";

    payload["Reference"] = assessment.id;
    payload["Submitted"] = new Date(assessment.date).toLocaleString("en-GB");

    STEPS.forEach(function (step, i) {
      if (step.fields.length && (step.fields[0].type === "review")) return;
      payload["\u2500\u2500 " + (i + 1) + ". " + step.title.toUpperCase() + " \u2500\u2500"] = "";

      if (step.fields[0] && step.fields[0].type === "skills") {
        var skills = state.data.livingSkills || {};
        LIVING_SKILLS.forEach(function (skill) {
          if (skills[skill]) payload[skill] = skills[skill];
        });
        return;
      }

      visibleFields(step).forEach(function (f) {
        if (!f.key) return;
        var v = state.data[f.key];
        if (v === undefined || v === null || v === "") return;
        if (Array.isArray(v)) {
          if (!v.length) return;
          v = v.join(", ");
        }
        payload[f.label.replace(/<[^>]*>/g, "")] = v;
      });
    });

    var rb = assessment.riskBreakdown;
    payload["\u2500\u2500 AUTOMATED ASSESSMENT (DECISION SUPPORT ONLY) \u2500\u2500"] = "";
    payload["Overall concern level"] = assessment.overallConcern;
    payload["Recommendation"] = assessment.recommendation;
    payload["Rationale"] = assessment.reason;
    payload["Drug abstinence (calculated)"] = assessment.recovery.drugAbstinence;
    payload["Alcohol abstinence (calculated)"] = assessment.recovery.alcoholAbstinence;
    payload["Risk \u2013 relapse"] = rb.relapse;
    payload["Risk \u2013 violence"] = rb.violence;
    payload["Risk \u2013 self-harm"] = rb.selfHarm;
    payload["Risk \u2013 criminal justice"] = rb.criminalJustice;
    payload["Risk \u2013 mental health"] = rb.mentalHealth;
    payload["Risk \u2013 safeguarding"] = rb.safeguarding;
    payload["Risk \u2013 housing"] = rb.housing;
    payload["Risk \u2013 living skills"] = rb.livingSkills;
    payload["Flags"] = assessment.flags.length ? assessment.flags.join(" | ") : "None";
    payload["Risk factors"] = assessment.risks.length ? assessment.risks.join(" | ") : "None identified";
    payload["Protective factors"] = assessment.protective.length ? assessment.protective.join(" | ") : "None identified";
    payload["Consent confirmed by referrer"] = state.data.consentConfirmed ? "Yes" : "No";

    return payload;
  }

  function setStatus(message, kind) {
    var el = document.getElementById("rf-status");
    if (!el) return;
    el.textContent = message;
    el.className = "rf-status" + (kind ? " is-" + kind : "");
  }

  function submit() {
    if (!state.data.consentConfirmed) return;

    var honeypot = document.getElementById("rf-botcheck");
    if (honeypot && honeypot.checked) return;

    if (!validateStep()) return;

    var missing = [];
    STEPS.forEach(function (step) {
      visibleFields(step).forEach(function (f) {
        if (!f.required || !f.key) return;
        var v = state.data[f.key];
        if (v === undefined || v === null || v === "" || (Array.isArray(v) && !v.length)) {
          missing.push({ step: STEPS.indexOf(step), label: f.label });
        }
      });
    });

    if (missing.length) {
      setStatus("Some required questions are still blank \u2014 taking you to the first one (\u201c" +
        missing[0].label.replace(/<[^>]*>/g, "") + "\u201d).", "error");
      window.setTimeout(function () {
        state.step = missing[0].step;
        state.maxStep = Math.max(state.maxStep, STEPS.length - 1);
        saveDraft();
        render();
        validateStep();
      }, 1600);
      return;
    }

    var assessment = runAssessment(state.data);

    if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE") {
      setStatus("This form is not connected yet \u2014 the site owner needs to add a Web3Forms access key. " +
        "Please email paul@thenewstartproject.co.uk or phone 01803 446133 to make this referral.", "error");
      return;
    }

    var button = root.querySelector('[data-nav="submit"]');
    if (button) { button.disabled = true; button.textContent = "Submitting\u2026"; }
    setStatus("Submitting referral " + assessment.id + "\u2026", "working");

    /* Returns a promise for true only when the far end confirmed success.
       Network failures resolve to false rather than rejecting, so the
       caller can decide whether to try the other route. */
    function postJson(url, body) {
      return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body)
      })
        .then(function (response) {
          return response.json()
            .catch(function () { return {}; })
            .then(function (json) { return response.ok && json.success === true; });
        })
        .catch(function () { return false; });
    }

    /* Preferred route: our own /api/referral endpoint, which files the
       referral in the Notion referrals database and emails a copy.
       If that endpoint is missing (not deployed yet) or failing, fall
       back to emailing through Web3Forms directly. A referral must
       never be lost just because the server is having a bad day. */
    postJson("/api/referral", {
      form: state.data,
      assessment: assessment,
      meta: { source: "referral-form.html", submitted: new Date().toISOString() }
    })
      .then(function (stored) {
        if (stored) return true;
        setStatus("Still working \u2014 sending your referral by email instead\u2026", "working");
        return postJson("https://api.web3forms.com/submit", buildPayload(assessment));
      })
      .then(function (delivered) {
        if (delivered) {
          clearDraft();
          window.location.href = "referral-received.html?ref=" + encodeURIComponent(assessment.id);
          return;
        }
        if (button) { button.disabled = false; button.textContent = "Submit Referral"; }
        setStatus("Sorry \u2014 the referral could not be submitted. Nothing has been lost: stay on this page and " +
          "try again, or email paul@thenewstartproject.co.uk or phone 01803 446133 and we will take the referral over the phone.", "error");
      });
  }

  /* ---------------- EVENTS ---------------- */

  root.addEventListener("click", function (event) {
    var t = event.target.closest("button");
    if (!t) return;

    if (t.dataset.choice) {
      set(t.dataset.choice, t.dataset.value);
      render();
      return;
    }

    if (t.dataset.multi) {
      var key = t.dataset.multi;
      var value = t.dataset.value;
      var list = (state.data[key] || []).slice();
      var at = list.indexOf(value);
      if (at > -1) list.splice(at, 1); else list.push(value);
      set(key, list);
      render();
      return;
    }

    if (t.dataset.goto !== undefined) {
      var target = parseInt(t.dataset.goto, 10);
      if (target <= state.maxStep) {
        state.step = target;
        saveDraft();
        render();
        window.scrollTo({ top: root.offsetTop - 20, behavior: "smooth" });
      }
      return;
    }

    if (t.id === "rf-reset") {
      if (!window.confirm("Clear this referral and start again? Everything entered will be lost.")) return;
      clearDraft();
      state = { step: 0, maxStep: 0, data: { livingSkills: {}, previousDrugs: [], mentalHealthConditions: [], safeguardingConcerns: [] } };
      render();
      window.scrollTo({ top: root.offsetTop - 20, behavior: "smooth" });
      return;
    }

    if (t.dataset.nav === "back") {
      state.step = Math.max(0, state.step - 1);
      saveDraft();
      render();
      window.scrollTo({ top: root.offsetTop - 20, behavior: "smooth" });
      return;
    }

    if (t.dataset.nav === "next") {
      if (!validateStep()) return;
      state.step = Math.min(STEPS.length - 1, state.step + 1);
      state.maxStep = Math.max(state.maxStep, state.step);
      saveDraft();
      render();
      window.scrollTo({ top: root.offsetTop - 20, behavior: "smooth" });
      return;
    }

    if (t.dataset.nav === "submit") submit();
  });

  root.addEventListener("input", function (event) {
    var el = event.target;
    if (el.dataset && el.dataset.key) {
      set(el.dataset.key, el.value);
      var wrap = el.closest(".rf-field");
      if (wrap && el.value) wrap.classList.remove("has-error");
    }
  });

  root.addEventListener("change", function (event) {
    var el = event.target;
    if (el.dataset && el.dataset.skill) {
      var skills = Object.assign({}, state.data.livingSkills || {});
      if (el.value) skills[el.dataset.skill] = el.value;
      else delete skills[el.dataset.skill];
      set("livingSkills", skills);
      return;
    }
    if (el.id === "rf-consent") {
      set("consentConfirmed", el.checked);
      var button = root.querySelector('[data-nav="submit"]');
      if (button) button.disabled = !el.checked;
    }
  });

  /* ---------------- INIT ---------------- */

  loadDraft();
  render();

  if (state.restored) {
    setStatus("Draft restored from this browser tab \u2014 you can carry on where you left off.", "working");
  }
})();
