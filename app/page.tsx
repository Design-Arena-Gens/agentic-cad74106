import Link from "next/link";
import { StepCard } from "./components/StepCard";
import { ReactNode } from "react";

type Step = {
  number: number;
  title: string;
  summary: string;
  body: ReactNode;
  image: string;
};

const steps: Step[] = [
  {
    number: 1,
    title: "Confirm Launchpad Content Admin Role",
    summary: "Ensure your SAP user has the launchpad content administration authorizations before you begin.",
    body: (
      <>
        <p>
          Open the SAP Fiori launchpad in your browser and select your profile avatar. Choose <strong>Settings → App Finder</strong> to verify that the <strong>Content Administration</strong> section is visible. This confirms you have the <code>/UI2/FLPD_CONF</code> or equivalent role required to create tiles. If it is missing, ask your SAP security team to assign the launchpad designer role before continuing.
        </p>
        <p>
          If you are working on SAP S/4HANA, you can also check the backend role assignment in transaction <code>PFCG</code>. Ensure your user belongs to a role that includes authorizations for <code>UI2/FLP_CONTC</code> (content catalogs) and <code>UI2/FLP_LPD</code> (launchpad designer).
        </p>
      </>
    ),
    image: "/images/step1.png"
  },
  {
    number: 2,
    title: "Open the Launchpad App Manager",
    summary: "Use SAP GUI transaction /UI2/FLPAM to create a custom app descriptor for your transaction code.",
    body: (
      <>
        <ol className="list-decimal list-inside space-y-2 text-slate-200">
          <li>Launch SAP GUI and run transaction <code>/UI2/FLPAM</code> (Fiori Launchpad App Manager).</li>
          <li>Choose <strong>+ Add</strong>, then select <strong>Transaction</strong> as the target type.</li>
          <li>Enter a unique semantic object (for example <code>ZFIN_GL_REPORT</code>) and action (for example <code>display</code>) to describe the app intent.</li>
          <li>In the target mapping details, set the <strong>Application Type</strong> to <strong>Transaction</strong> and provide your SAP GUI transaction code (for example <code>FBL3N</code>).</li>
          <li>Save the entry to create a launchpad app descriptor. This descriptor will later be referenced by your tile.</li>
        </ol>
        <p>
          The App Manager stores semantic objects in table <code>/UI2/SEMOBJ</code> and the intent mapping inside <code>/UI2/SEMOBJ_SMI</code>. Keeping semantic objects generic lets you reuse tiles for multiple role assignments.
        </p>
      </>
    ),
    image: "/images/step2.png"
  },
  {
    number: 3,
    title: "Create a Catalog and Group",
    summary: "Organize the tile by placing it into a custom business catalog and an optional group.",
    body: (
      <>
        <p>
          In the same transaction (<code>/UI2/FLPAM</code>) or by opening <strong>/UI2/FLPD_CUST</strong>, create a new catalog that will hold your tile. Catalogs represent app bundles you can assign to PFCG roles. Provide a name (such as <code>Z_FINANCE_MONITORING</code>) and a meaningful description.
        </p>
        <p>
          Optionally, create a group (for classic launchpad home page) via <code>/UI2/FLPAG_CUST</code>. Groups control how tiles appear for end users. Even if you rely on spaces & pages, keeping a group can help with backwards compatibility.
        </p>
      </>
    ),
    image: "/images/step3.png"
  },
  {
    number: 4,
    title: "Design the Tile",
    summary: "Add a static or dynamic tile and bind it to the app descriptor you created earlier.",
    body: (
      <>
        <ol className="list-decimal list-inside space-y-2 text-slate-200">
          <li>Within the catalog, choose <strong>+ Tile</strong> and pick <strong>Static App Launcher</strong> for a classic, text-based tile.</li>
          <li>Fill the tile title, subtitle, and information text. Keep titles under 45 characters for best readability.</li>
          <li>Under <strong>Navigation</strong>, select the semantic object and action from Step 2. This links the tile press to your transaction code.</li>
          <li>Optionally assign an icon (sap-icon:// ) or a Launchpad intent parameter to pass default values into the transaction.</li>
          <li>Save your work. The tile now appears inside the catalog preview.</li>
        </ol>
        <p>
          If you need KPIs or analytics, choose a dynamic tile and provide an OData or CDS view endpoint. For pure transaction launching, a static tile keeps maintenance minimal.
        </p>
      </>
    ),
    image: "/images/step4.png"
  },
  {
    number: 5,
    title: "Assign Tile to Group or Space",
    summary: "Surface the tile on the Fiori launchpad by placing it onto a group or page section.",
    body: (
      <>
        <p>
          Still in the designer, open your group (or space & page in the Fiori launchpad admin tools) and click <strong>+ Tile</strong>. Select the tile from your custom catalog. Save and publish the group.</p>
        <p>
          For spaces & pages (SAP S/4HANA 2020+), use the <strong>Spaces</strong> app in the launchpad content manager. Create a section and add the tile via <strong>Add App</strong>, choosing your semantic object.</p>
      </>
    ),
    image: "/images/step5.png"
  },
  {
    number: 6,
    title: "Link Catalog to PFCG Role",
    summary: "Expose the tile to end users by assigning the catalog and group to an authorization role.",
    body: (
      <>
        <ol className="list-decimal list-inside space-y-2 text-slate-200">
          <li>In SAP GUI, run transaction <code>PFCG</code> and open the business role that needs the tile.</li>
          <li>On the <strong>Menu</strong> tab, choose <strong>+ → SAP Fiori Tile Catalog</strong> and search for your custom catalog. Add it.</li>
          <li>Repeat for <strong>SAP Fiori Tile Group</strong> (if using groups). This step links the role to the tile content.</li>
          <li>Generate the role profile and transport request if prompted.</li>
        </ol>
        <p>
          After the authorization team syncs the role, users assigned to it will see the tile on the launchpad. For spaces, assign the space via the <strong>Space Assignment</strong> tab in the role menu.</p>
      </>
    ),
    image: "/images/step6.png"
  },
  {
    number: 7,
    title: "Test in Fiori Launchpad",
    summary: "Validate that the tile launches the expected transaction and honors authorizations.",
    body: (
      <>
        <p>
          Clear your browser cache or run the launchpad with the <strong>sap-ushell-config=standalone</strong> parameter to bypass personalizations. Confirm the tile appears in the target group or page section. Click the tile and ensure the SAP GUI for HTML session starts and opens your transaction code.</p>
        <p>
          If the transaction fails, verify the role contains backend authorizations for the TCode (auth object <code>S_TCODE</code>). For missing tiles, confirm the catalog is assigned and the intent matches the semantic object/action configured in Step 2.</p>
      </>
    ),
    image: "/images/step7.png"
  }
];

const checklistItems = [
  "Launchpad content admin role assigned",
  "Semantic object and action created via /UI2/FLPAM",
  "Tile added to custom catalog",
  "Tile placed on group or space",
  "Catalog/group assigned to PFCG role",
  "User authorizations for TCode verified"
];

export default function Page() {
  return (
    <main>
      <header className="space-y-4 text-slate-100">
        <p className="uppercase tracking-[0.4em] text-brand-300 text-sm">SAP Fiori Masterclass</p>
        <h1 className="text-4xl sm:text-5xl font-bold max-w-3xl leading-tight">
          Create a SAP Fiori Launchpad Tile and Bind It to an SAP GUI Transaction Code
        </h1>
        <p className="text-lg text-slate-300 max-w-3xl">
          Follow this guided walkthrough to design, publish, and authorize a custom tile in the SAP Fiori launchpad, wired to a classic SAP GUI transaction. Screenshots highlight key actions so you can reproduce them in your own landscape.
        </p>
      </header>

      <section className="mt-10 grid gap-6">
        {steps.map((step) => (
          <StepCard
            key={step.number}
            number={step.number}
            title={step.title}
            summary={step.summary}
            image={step.image}
          >
            {step.body}
          </StepCard>
        ))}
      </section>

      <section className="mt-16 bg-slate-900/80 border border-slate-800 rounded-3xl p-8">
        <h2 className="text-2xl font-semibold text-brand-100">Cutover Checklist</h2>
        <ul className="mt-4 grid sm:grid-cols-2 gap-3 text-slate-200">
          {checklistItems.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/40 text-brand-100 text-sm font-semibold">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 grid gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8">
          <h2 className="text-2xl font-semibold text-brand-100">Troubleshooting Tips</h2>
          <div className="mt-4 space-y-4 text-slate-200">
            <p>
              <strong>Tile missing?</strong> Clear the launchpad personalization via <code>/UI2/PERS_DEL</code> for your user or run the launchpad with the URL parameter <code>sap-personas-config-mode=true</code> to inspect assigned groups.
            </p>
            <p>
              <strong>Authorization errors?</strong> Use transaction <code>SU53</code> immediately after the failure to capture missing authorization objects. Provide the output to your SAP security analyst.
            </p>
            <p>
              <strong>Transport management:</strong> Capture your catalog, group, and app descriptor in a customizing transport. For PFCG roles, release the workbench transport containing menu changes after the profile is generated.
            </p>
          </div>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8">
          <h2 className="text-2xl font-semibold text-brand-100">Reference Links</h2>
          <ul className="mt-4 list-disc list-inside text-slate-200 space-y-2">
            <li>
              <Link href="https://help.sap.com/docs/SAP_FIORI_LAUNCHPAD" target="_blank" rel="noopener noreferrer">
                SAP Help Portal – Launchpad Content Manager
              </Link>
            </li>
            <li>
              <Link href="https://community.sap.com" target="_blank" rel="noopener noreferrer">
                SAP Community – Fiori Launchpad Administration Blogs
              </Link>
            </li>
            <li>
              <Link href="https://experience.sap.com/fiori-design-web/" target="_blank" rel="noopener noreferrer">
                SAP Fiori Design Guidelines
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
