// snippets/ui/IntegrationCatalog.jsx
import { allIntegrations } from "/snippets/data/index.mdx";

export const IntegrationCatalog = () => {
  const [q, setQ] = React.useState("");
  const [vertical, setVertical] = React.useState("All");
  const [feature, setFeature] = React.useState("All");

  const verticals = ["All", ...Array.from(new Set(allIntegrations.map(i => i.vertical)))];
  const features = ["All", "webhookIngestion", "ga4Mappings", "s2sPostback", "capi", "crossDomain", "multiProperty"];

  const filtered = allIntegrations.filter(i => {
    const hit = i.name.toLowerCase().includes(q.toLowerCase()) || i.id.includes(q.toLowerCase());
    const vOk = vertical === "All" || i.vertical === vertical;
    const fOk = feature === "All" || (i.features && i.features[feature]);
    return hit && vOk && fOk;
  });

  return (
    <div className="not-prose">
      <div className="flex gap-2 items-center mb-4">
        <input placeholder="Search by name or id" value={q} onChange={e => setQ(e.target.value)} />
        <select value={vertical} onChange={e => setVertical(e.target.value)}>
          {verticals.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <select value={feature} onChange={e => setFeature(e.target.value)}>
          {features.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th align="left">Integration</th>
            <th align="left">Vertical</th>
            <th align="left">Kind</th>
            <th align="left">GA4</th>
            <th align="left">S2S</th>
            <th align="left">CAPI</th>
            <th align="left">Cross-domain</th>
            <th align="left">Plans</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(i => (
            <tr key={i.id}>
              {/* IMPORTANT: no /docs prefix */}
              <td><a href={`/integrations/${i.id}`}>{i.name}</a></td>
              <td>{i.vertical}</td>
              <td>{i.kind}</td>
              <td>{i.features.ga4Mappings ? "Yes" : "No"}</td>
              <td>{i.features.s2sPostback ? "Yes" : "No"}</td>
              <td>{i.features.capi ? "Yes" : "No"}</td>
              <td>{i.features.crossDomain ? "Yes" : "No"}</td>
              <td>{(i.plans || []).join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && <p>No integrations match your filters.</p>}
    </div>
  );
};
