/* global React, ReactDOM */
const { useEffect, useState } = React;

// HARD-CODED API KEY (visible in page source)
const SERP_API_KEY =
  "cbc5a8b98877e07122ae836f2edead974a9fe6d552e3e9aa4e9b54609fdfc740";

function formatMins(mins) {
  if (mins == null) return "—";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h + "h " + m + "m";
}

function money(n, currency) {
  if (!currency) currency = "USD";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency
    }).format(n);
  } catch (e) {
    return "$" + n;
  }
}

const Pill = ({ children }) => <span className="pill">{children}</span>;

function FlightLeg({ leg }) {
  const dep = leg && leg.departure_airport;
  const arr = leg && leg.arrival_airport;
  return (
    <div className="flight-leg">
      <div style={{ minWidth: 80 }}>
        <div>
          <strong>{dep && dep.id}</strong>
        </div>
        <div className="tiny">{dep && dep.time}</div>
      </div>
      <div style={{ flex: 1 }}>
        <div className="airline">
          {leg && leg.airline_logo ? (
            <img src={leg.airline_logo} alt={leg.airline || "airline"} />
          ) : null}
          <div>
            <strong>{leg && leg.airline}</strong>{" "}
            {leg && leg.flight_number ? "• " + leg.flight_number : ""}
          </div>
        </div>
        <div className="meta">
          {leg && leg.airplane ? <span>{leg.airplane}</span> : null}
          {leg && leg.travel_class ? <Pill>{leg.travel_class}</Pill> : null}
          {leg && leg.legroom ? <Pill>{leg.legroom}</Pill> : null}
          {typeof (leg && leg.duration) === "number" ? (
            <Pill>{formatMins(leg.duration)}</Pill>
          ) : null}
          {leg && leg.often_delayed_by_over_30_min ? (
            <Pill>Often delayed</Pill>
          ) : null}
          {Array.isArray(leg && leg.extensions)
            ? leg.extensions.slice(0, 3).map((e, i) => (
                <Pill key={i}>{e}</Pill>
              ))
            : null}
        </div>
      </div>
      <div style={{ minWidth: 80, textAlign: "right" }}>
        <div>
          <strong>{arr && arr.id}</strong>
        </div>
        <div className="tiny">{arr && arr.time}</div>
      </div>
    </div>
  );
}

function FlightCard({ item, currency, idx }) {
  if (!currency) currency = "USD";

  // Collect airline labels for a quick summary
  const airlineSet = {};
  if (Array.isArray(item && item.flights)) {
    item.flights.forEach(function (leg) {
      if (leg && leg.airline) airlineSet[leg.airline] = true;
    });
  }
  const airlineSummary = Object.keys(airlineSet).join(" • ");

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          Option {idx}
          {airlineSummary ? " — " + airlineSummary : ""}
        </div>
        <div className="card-price">
          {item && item.price ? money(item.price, currency) : "Price N/A"}
        </div>
      </div>

      <div className="card-body">
        <div className="grid-2" style={{ marginBottom: 8 }}>
          <div className="airline">
            {item && item.airline_logo ? (
              <img src={item.airline_logo} alt="airline" />
            ) : null}
            <div className="meta">
              <Pill>{(item && item.type) || "Trip"}</Pill>
              <Pill>Total: {formatMins(item && item.total_duration)}</Pill>
              {item && item.carbon_emissions ? (
                <Pill>
                  CO₂: {((item.carbon_emissions.this_flight / 1000) | 0).toString()} kg
                </Pill>
              ) : null}
            </div>
          </div>
          <div className="meta" style={{ justifyContent: "flex-end" }}></div>
        </div>

        {Array.isArray(item && item.flights)
          ? item.flights.map(function (leg, idx2) {
              return <FlightLeg key={idx2} leg={leg} />;
            })
          : null}

        {Array.isArray(item && item.layovers) && item.layovers.length > 0 ? (
          <div className="meta" style={{ marginTop: 10 }}>
            <strong>Layovers:</strong>
            {item.layovers.map(function (l, i) {
              return (
                <Pill key={i}>
                  {(l && l.id) +
                    " • " +
                    formatMins(l && l.duration) +
                    (l && l.overnight ? " • overnight" : "")}
                </Pill>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function AirportsPanel({ airports }) {
  if (!Array.isArray(airports) || airports.length === 0) return null;
  const first = airports[0];
  const dep = (first && first.departure) || [];
  const arr = (first && first.arrival) || [];
  return (
    <div className="section">
      <h3>Airports</h3>
      <div className="airport-hero">
        {dep.map(function (d, i) {
          return (
            <div className="airport-card" key={"dep-" + i}>
              {d && d.image ? (
                <img src={d.image} alt={d.airport && d.airport.name} />
              ) : null}
              <div>
                <strong>{d && d.airport && d.airport.id}</strong> —{" "}
                {d && d.airport && d.airport.name}
              </div>
              <div className="tiny">
                {(d && d.city) +
                  ((d && d.city) ? ", " : "") +
                  (d && d.country)}
              </div>
            </div>
          );
        })}
        {arr.map(function (d, i) {
          return (
            <div className="airport-card" key={"arr-" + i}>
              {d && d.image ? (
                <img src={d.image} alt={d.airport && d.airport.name} />
              ) : null}
              <div>
                <strong>{d && d.airport && d.airport.id}</strong> —{" "}
                {d && d.airport && d.airport.name}
              </div>
              <div className="tiny">
                {(d && d.city) +
                  ((d && d.city) ? ", " : "") +
                  (d && d.country)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PriceInsights({ insights, currency }) {
  if (!insights) return null;
  if (!currency) currency = "USD";
  return (
    <div className="section">
      <h3>Price insights</h3>
      <div className="meta">
        <Pill>Lowest: {money(insights.lowest_price, currency)}</Pill>
        <Pill>Level: {insights.price_level}</Pill>
        {Array.isArray(insights.typical_price_range) ? (
          <Pill>
            Typical:{" "}
            {money(insights.typical_price_range[0], currency)}–
            {money(insights.typical_price_range[1], currency)}
          </Pill>
        ) : null}
      </div>
      <details style={{ marginTop: 8 }}>
        <summary>Show price history</summary>
        <div className="legend">epoch, price</div>
        <div
          style={{
            maxHeight: 200,
            overflow: "auto",
            background: "#fafafa",
            border: "1px solid #eee",
            borderRadius: 10,
            padding: 8,
            marginTop: 6
          }}
        >
          {Array.isArray(insights.price_history)
            ? insights.price_history.map(function (row, i) {
                return (
                  <div key={i} className="tiny">
                    {row[0]}, {money(row[1], currency)}
                  </div>
                );
              })
            : null}
        </div>
      </details>
    </div>
  );
}

function Section({ title, items, currency }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <div className="section">
      <h3>
        {title} <span className="tiny">({items.length})</span>
      </h3>
      <div className="cards">
        {items.map(function (it, i) {
          return (
            <FlightCard key={i} item={it} currency={currency} idx={i + 1} />
          );
        })}
      </div>
    </div>
  );
}

// Build datalist; return resolver to map input -> IATA code
function setupAirportDatalist(list) {
  const dl = document.getElementById("airports");
  dl.innerHTML = "";
  list.forEach(function (a) {
    const label =
      (a.name || "") +
      " — " +
      (a.city || "") +
      (a.city ? ", " : "") +
      (a.country || "") +
      " (" +
      a.code +
      ")";
    const opt = document.createElement("option");
    opt.value = label;
    dl.appendChild(opt);
  });

  function resolveCode(input) {
    if (!input) return null;
    const m = input.match(/\(([A-Z0-9]{3})\)\s*$/);
    if (m) return m[1];
    const norm = input.trim().toLowerCase();
    const exact = list.find(function (a) {
      return a.name && a.name.toLowerCase() === norm;
    });
    if (exact) return exact.code;
    const starts = list.find(function (a) {
      return a.name && a.name.toLowerCase().startsWith(norm);
    });
    if (starts) return starts.code;
    const contains = list.find(function (a) {
      return a.name && a.name.toLowerCase().includes(norm);
    });
    return contains ? contains.code : null;
  }

  return resolveCode;
}

// Helpers for filters/sorting
function getStops(item) {
  if (Array.isArray(item && item.layovers)) return item.layovers.length;
  if (typeof (item && item.stops) === "number") return item.stops;
  if (Array.isArray(item && item.flights)) return Math.max(0, item.flights.length - 1);
  return 0;
}

function getPrimaryAirline(item) {
  if (Array.isArray(item && item.flights) && item.flights[0] && item.flights[0].airline) {
    return item.flights[0].airline;
  }
  return null;
}

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("CAD");
  const [resolveCode, setResolveCode] = useState(function () {
    return function () {
      return null;
    };
  });

  // filters / sorting state (Must-have requirments)
  const [sortBy, setSortBy] = useState("price"); // "price" | "duration"
  const [maxStops, setMaxStops] = useState("any"); // "any" | "0" | "1" | "2"
  const [airlineFilter, setAirlineFilter] = useState("any"); // "any" or airline name

  useEffect(function () {
    fetch("airportCodes.json")
      .then(function (r) {
        return r.json();
      })
      .then(function (list) {
        const resolver = setupAirportDatalist(list);
        setResolveCode(function () {
          return resolver;
        });
      })
      .catch(function (e) {});
  }, []);

  useEffect(
    function () {
      const form = document.getElementById("search-form");
      const status = document.getElementById("status");
      const exampleBtn = document.getElementById("load-example");

      async function onSubmit(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        setData(null);
        status.textContent = "Fetching…";

        const fromText = form.from.value.trim();
        const toText = form.to.value.trim();
        const out = form.out.value;
        const ret = form.ret.value;
        const curr = form.currency.value || "USD";

        const fromCode = resolveCode(fromText);
        const toCode = resolveCode(toText);

        if (!fromCode || !toCode) {
          setLoading(false);
          setError(
            "Please select airports from the suggestions so the IATA codes can be resolved."
          );
          status.textContent = "";
          return;
        }

        try {
          const params = new URLSearchParams();
          params.set("engine", "google_flights");
          params.set("departure_id", fromCode);
          params.set("arrival_id", toCode);
          params.set("outbound_date", out);
          params.set("return_date", ret);
          params.set("currency", curr);
          params.set("hl", "en");
          params.set("api_key", SERP_API_KEY);

          const resp = await fetch("/search.json?" + params.toString());
          if (!resp.ok) throw new Error("HTTP " + resp.status);
          const json = await resp.json();
          setData(json);
          setCurrency(curr);
          status.textContent = "";
        } catch (err) {
          setError(String(err));
          status.textContent = "";
        } finally {
          setLoading(false);
        }
      }

      form.addEventListener("submit", onSubmit);

      exampleBtn.addEventListener("click", async function () {
        try {
          const txt = await fetch("example.json")
            .then(function (r) {
              return r.ok ? r.text() : null;
            })
            .catch(function () {
              return null;
            });
          if (txt) {
            const formCurrency = form.currency.value || "USD";
            setData(JSON.parse(txt));
            setCurrency(formCurrency);
          } else {
            alert("example.json is not available in this bundle.");
          }
        } catch (e) {
          alert("Failed to load example.");
        }
      });

      return function () {
        form.removeEventListener("submit", onSubmit);
      };
    },
    [resolveCode]
  );

  const rawBest = (data && data.best_flights) || [];
  const rawOther = (data && data.other_flights) || [];

  // Collect all airlines for filter dropdown
  const airlineSet = {};
  [...rawBest, ...rawOther].forEach(function (item) {
    if (Array.isArray(item && item.flights)) {
      item.flights.forEach(function (leg) {
        if (leg && leg.airline) airlineSet[leg.airline] = true;
      });
    }
  });
  const airlineOptions = Object.keys(airlineSet).sort();

  function applyFiltersAndSort(items) {
    let arr = Array.isArray(items) ? items.slice() : [];

    // filter by max stops
    arr = arr.filter(function (item) {
      const stops = getStops(item);
      if (maxStops !== "any" && stops > Number(maxStops)) return false;
      if (airlineFilter !== "any") {
        const a = getPrimaryAirline(item);
        if (a !== airlineFilter) return false;
      }
      return true;
    });

    // sort
    arr.sort(function (a, b) {
      if (sortBy === "duration") {
        return (a.total_duration || 0) - (b.total_duration || 0);
      }
      // default: sort by price
      return (a.price || 0) - (b.price || 0);
    });

    return arr;
  }

  const best = applyFiltersAndSort(rawBest);
  const other = applyFiltersAndSort(rawOther);

  return (
    <div>
      {loading ? (
        <div>
          <span className="spinner"></span> Loading…
        </div>
      ) : null}
      {error ? <div className="error">Error: {error}</div> : null}

      {data && (
        <div className="section">
          <h3>Filters &amp; sorting</h3>
          <div className="meta">
            <label>
              Sort by:&nbsp;
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="price">Cheapest</option>
                <option value="duration">Shortest duration</option>
              </select>
            </label>
            <label>
              Max stops:&nbsp;
              <select
                value={maxStops}
                onChange={(e) => setMaxStops(e.target.value)}
              >
                <option value="any">Any</option>
                <option value="0">Nonstop</option>
                <option value="1">1 stop</option>
                <option value="2">2 stops</option>
              </select>
            </label>
            {airlineOptions.length > 0 && (
              <label>
                Airline:&nbsp;
                <select
                  value={airlineFilter}
                  onChange={(e) => setAirlineFilter(e.target.value)}
                >
                  <option value="any">Any</option>
                  {airlineOptions.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
        </div>
      )}

      {data && data.search_metadata ? (
        <div className="section">
          <h3>Search metadata</h3>
          <div className="meta">
            <Pill>Status: {data.search_metadata.status}</Pill>
            <Pill>Created: {data.search_metadata.created_at}</Pill>
            <Pill>
              Total time: {data.search_metadata.total_time_taken}
              s
            </Pill>
            {data.search_metadata.google_flights_url ? (
              <a
                className="pill"
                href={data.search_metadata.google_flights_url}
                target="_blank"
                rel="noreferrer"
              >
                Open in Google Flights
              </a>
            ) : null}
          </div>
        </div>
      ) : null}

      <AirportsPanel airports={data && data.airports} />

      <Section title="Best flights" items={best} currency={currency} />
      <Section title="Other flights" items={other} currency={currency} />

      <PriceInsights insights={data && data.price_insights} currency={currency} />

      {data ? (
        <details className="section">
          <summary>Raw JSON</summary>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </details>
      ) : null}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
