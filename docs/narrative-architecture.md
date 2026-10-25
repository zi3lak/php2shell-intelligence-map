# PHP2Shell Intelligence Portal + Cinematic Explainer
## Narrative architecture and production blueprint

**Editorial cut-off:** 23 October 2026, 15:45 UTC  
**Languages:** English (canonical) and Polish (full editorial peer, not a literal machine translation)  
**Attribution:** Research synthesis supplied via **Google Gemini / Argon**; production by **Hermes Agent**.  
**Safety posture:** Defensive analysis only. Do not publish exploit payloads, reproducible weaponization steps, ASLR-bypass instructions, malware deployment commands, or actionable attacker runbooks. Technical primitives may be described at the lifecycle/state-transition level needed for defenders to understand risk and hunt for compromise.

---

## 1. Editorial north star

### Central proposition

**PHP2Shell is not a story about two CVEs. It is a story about how a twenty-year-old memory-safety weakness became an internet-scale emergency in an AI-accelerated discovery-to-exploitation race.**

### Dramatic question

> What happens when the cost of finding, adapting, and weaponizing a subtle flaw collapses before the cost of patching and governing the world's most widely deployed server runtime can keep up?

### Viewer takeaway

The audience should leave understanding five things:

1. **The bug was old; the weapon was new.** The lineage reaches to 2004, was revisited in 2020 and 2024, and became reliably exploitable in 2026 with AI assistance.[5][6]
2. **The failure mode is state, not a single bad line.** A request ends abnormally; cleanup or a `longjmp()` skips the work required to keep later state safe.[3][4]
3. **The blast radius depends on runtime topology.** `mod_php`, PHP-FPM, CGI, FrankenPHP and LiteSpeed do not fail or recover identically.[2][3][4]
4. **The response clock is shorter than the disclosure clock.** Defenders must measure patch, mitigation and investigation windows in hours, and hunt from the earliest known activity rather than from publication.[8]
5. **Resilience requires maintainer capacity.** The PHP Foundation itself described the delayed fix as a structural failure in decision process and resources.[1]

### Tone

- **Portal:** forensic premium—editorial, exact, calm, visually dense but never cluttered.
- **Animation:** cinematic systems thriller—pressure, consequence, and resolution; no exploit glamour, no hacker caricature, no fake hacking montage.
- **Register:** confident without overclaiming. Separate **fact**, **analyst assessment**, **unknown**, and **action**.

### Editorial title system

**Portal:** *PHP2Shell — Anatomy of an AI-Era Zero-Day*  
**Film:** *PHP2Shell: The Hours Between Memory and Patch*  
**Polish:** *PHP2Shell — Anatomia sztucznej inteligencji w świecie zero-day*  
**Polish film:** *PHP2Shell: Godziny między pamięcią a poprawką*

Optional alternate portal title for broader institutional use: **PHP2Shell Intelligence Brief**.

---

## 2. Audience architecture

| Audience | Primary question | Entry point | Required depth |
|---|---|---|---|
| CISO / CIO / board | Are we materially exposed, and what decision is required now? | Executive brief | 90 seconds; versions, EOL, risk, action, confidence |
| SOC / IR | Did we see attempts or compromise, and where? | Exposure & hunt | Request, worker, host, and network telemetry correlations |
| Platform / operations | How do we patch, restart, contain, and verify? | Response playbook | Runtime-specific steps and evidence gates |
| AppSec / PHP engineer | What exactly fails, and why does topology change exploitability? | Mechanics | Producer/consumer lifecycle, `longjmp()`, OOM, SAPI distinctions |
| Security researcher / policy | What changed in discovery economics, coordination, and maintainer capacity? | Strategic conclusions | Historical lineage, AI role, disclosure governance |

### Three reading modes on every chapter

1. **Brief** — 30-second executive summary.
2. **Investigate** — evidence, mechanics, uncertainty, and source trail.
3. **Act** — a bounded defensive checklist with owner and verification evidence.

This is the portal's premium differentiator: one narrative, not three disconnected documents.

---

## 3. Master narrative spine

### Dramatic arc

**ACT I — THE SLEEPER**
2004 → 2024: a subtle interaction among memory limits, fatal-error handling and cleanup remains latent. The risk is repeatedly sensed but not yet understood as an unauthenticated path to code execution.

**ACT II — THE INFLECTION**
July → September 2026: AI-assisted research compresses discovery, variant generalization, exploit adaptation and patch validation. The flaw moves from theoretical severity to demonstrated, repeatable exploitability.[6]

**ACT III — THE GLASS BREAKS**
16 → 23 October 2026: the coordination window unravels. Early activity appears before disclosure; identifiers and a limited demonstration circulate; vendors and cloud providers pre-position defenses; Chainguard publishes fixed images before the agreed release; official patches land on 21 October.[1][8][9]

**ACT IV — THE TWO FAILURES**
CVE-2026-109618 and CVE-2026-109619 are separated. One is an OOM-induced interruption of incomplete initialization; the other is stale request-owned state consumed by a later request on the same worker.[2][3][4]

**ACT V — THE GARDEN**
The practical issue is inventory: PHP is embedded across hosts, containers, appliances and panels; supported and EOL branches coexist; exposure is shaped by SAPI and configuration. The campaign layer adds Mirai-derived Potassium attempts and IOCs, but attempted exploitation must not be confused with successful compromise.[11][13]

**ACT VI — THE RESET**
A four-stage playbook converts the story into operational memory: discover, contain, investigate, recover/harden. The final thesis is institutional: sustainable security requires software, funding, coordination and response systems designed for machine-speed discovery.

### Narrative motif

**“A request leaves a footprint in a worker.”**

This single visual metaphor carries the film and portal:

- cyan = request state
- amber = partially initialized / stale state
- red = unsafe transition
- green = reset or verified patched runtime
- purple = the broader internet estate

The hero animation shows one request entering a PHP worker, leaving a small amber residue, then a later request touching that residue. It never shows a working exploit.

---

## 4. Portal information architecture

### Global shell

**Persistent top bar**

- Wordmark: `PHP2Shell / Intelligence Atlas`
- Chapters: **Brief · Timeline · Mechanism · Exposure · Campaign · Response · Outlook**
- Live-state strip: `PATCH NOW · 8.5.12 / 8.4.27 / 8.3.36 / 8.2.35`
- Language: `EN | PL`
- Evidence mode toggle: `Explainer / Analyst / Operator`
- “Last verified” timestamp and editorial cut-off
- Optional sound toggle, default off

**Persistent left rail (desktop) / bottom rail (mobile)**

- 6 chapter markers
- Progress through the narrative
- “Facts / Unknowns / Actions” filter
- Reduced-motion and high-contrast controls

**Footer**

> Research synthesis supplied via Google Gemini / Argon. Production by Hermes Agent.  
> Defensive editorial use only. Facts are linked to primary sources; uncertainty is retained rather than smoothed over.

### Page map

| Route | Page | Narrative job | Primary interaction |
|---|---|---|---|
| `/en/`, `/pl/` | **Signal / Brief** | Establish urgency, patch state and uncertainty | 90-second guided scroll; “Are you exposed?” branching |
| `/timeline/` | **22 Years in the Margins** | Connect 2004, 2020, 2024, Jul–Sep and 16–23 Oct 2026 | Evidence-filtered chronological spine |
| `/mechanism/` | **Two Broken State Machines** | Explain OOM/`longjmp()` and producer/consumer failures | Step-through lifecycle diagrams; SAPI simulator |
| `/exposure/` | **The Estate, Not Just the Server** | Map versions, SAPI, EOL, hosts and ownership | Filterable exposure matrix; evidence checklist |
| `/campaign/` | **When Scans Become Campaigns** | Cover Potassium/Mirai and IOCs without sensationalism | IOC confidence filter; attempt-vs-compromise matrix |
| `/response/` | **The Four-Hour Playbook** | Drive defensive execution | Role-based checklists, evidence gates, printable runbook |
| `/outlook/` | **The Strategic Signal** | Extract lessons beyond the patch | Decision matrix; funding/maintainer call to action |
| `/sources/` | **Evidence Ledger** | Make every claim auditable | Primary/secondary filters, corrections, quote-level evidence |

### Required cross-cutting modules

1. **Patch card** — fixed versions, restart requirement, vendor backport caveat, supported vs EOL branch.
2. **Confidence ribbon** — `CONFIRMED`, `SOURCE-ASSESSED`, `DISPUTED`, `UNKNOWN`.
3. **SAPI lens** — overlay `mod_php`, FPM, CGI, FrankenPHP, LiteSpeed on any mechanism scene.
4. **Timeline confidence filters** — hide disputed chronology without deleting it.
5. **Operational evidence drawer** — version, SAPI, network exposure, package/build source, owner, last restart, WAF state, investigation window.
6. **Correction ledger** — revisions such as early reports of successful compromise versus later telemetry. Corrections remain visible.

---

## 5. Chapter-by-chapter content architecture

### Chapter 0 — Signal / Brief  
**Purpose:** orient in 90 seconds without requiring prior PHP knowledge.

**Sequence**

1. Two critical CVEs, one shared failure family.
2. Patched versions and “updating is the only complete remediation.”
3. The risk model: engine-level, below application code; all web-serving PHP installations in scope, with `mod_php` highest risk.[2]
4. Three timelines running simultaneously: disclosure, patching, and compromise detection.
5. Three outcomes for the visitor: **I need an executive brief**, **I need to hunt**, **I need to patch**.

**Required hero data**

- CVSS v4: `9.2` for each CVE.
- Fixed releases: `8.5.12 · 8.4.27 · 8.3.36 · 8.2.35`.
- Scope: web-serving PHP, including FPM, `mod_php`, CGI, FrankenPHP, LiteSpeed.
- EOL warning: PHP 8.1 and older no longer receive upstream updates; PHP 8.2 reaches EOL on 31 December 2026.[2][13]
- Editorial cut-off and the last separate advisory item (23 Oct) as a “still evolving” label.

**Do not show** a global host count as a headline without source, collection method, date, and “potentially exposed” wording. The exact denominator changes by source and scan methodology.

---

### Chapter 1 — Timeline: “22 Years in the Margins”  
**Purpose:** show that 2026 is the point of weaponization, not the point of origin.

**Narrative units**

| Date | Narrative unit | What the viewer should understand |
|---|---|---|
| 2004 | The first memory-limit remote vulnerability | The attack surface long predates current web stacks.[5] |
| 2020 | Bug #78876: OOM plus incomplete cleanup | A subtle failure pattern is documented and fixed, but not yet understood as the later RCE chain.[5] |
| 2024 | External audit rediscovers the OOM issue | Without a proven exploit path, the hard compatibility trade-offs prevent a clear fix; the PHP Foundation later calls the delay a structural failure.[1][5] |
| 30 Jul–1 Aug 2026 | Patch the Planet audit begins; Calif finds multiple paths | Human target knowledge plus AI assistance generalizes variants across `mod_php` and FPM.[5] |
| Aug–Sep 2026 | Calif, OpenAI and Wiz triangulate | Independent discovery validates severity and turns repair into the top priority; Wiz credits Gemini 4 Argon and GPT-5.6 Sol across research.[1][6] |
| 16–17 Oct | Chainguard is read in; AWS observes a pre-disclosure attempt | The “embargo” is no longer a reliable assumption; investigation begins before publication.[8] |
| 20 Oct | CVE identifiers circulate; timing and score are initially wrong | Leakage compresses the coordination window and accelerates public pre-announcement.[1] |
| 21 Oct | Chainguard images, WAF coverage, PoCs and official release | Defensive layers and patches race the first exploit wave; the official narrative records a disputed early-image release.[1][8][9] |
| 22–23 Oct | Attempts and IOC reporting; separate session-upload-progress advisory | Attempts, payload association and successful compromise must be separated; the latest advisory is a distinct issue, not a generic patch bypass.[10][11][12] |

**Timeline interaction**

- Horizontal on desktop, vertical on mobile.
- Each event: `when → what changed → why it matters → confidence`.
- Filter: `Discovery · Fix · Disclosure · Detection · Compromise`.
- Clicking an event opens **Claim → Evidence → Interpretation → Defensive consequence**.

---

### Chapter 2 — Mechanism: “Two Broken State Machines”  
**Purpose:** give non-specialists and specialists the same mental model.

#### Scene A — CVE-2026-109618: OOM corruption

**Visual:** request → allocation pressure → fatal/OOM → `longjmp()` jumps past orderly cleanup → partially initialized state is treated as valid.

**Defensive explanation**

- PHP historically used `longjmp()` to leave the current context on OOM.
- If request memory is temporarily reachable before full initialization, the abrupt exit can leave an invalid state that shutdown later reads or branches on.
- The patch replaces OOM `longjmp()` with a graceful soft OOM at a safe point and a hard OOM exit at a higher threshold, so shutdown does not consume invalid state.[3]

**Animation rule:** show a request, memory blocks, a jump over a cleanup gate, then a reset. Do not show byte layouts, payloads, offset arithmetic, or exploit chains.

#### Scene B — CVE-2026-109619: stale global state

**Visual:** Request A publishes request-owned state → abnormal termination skips reset → worker frees request heap while a global still points into it → Request B on the same worker reaches that global before normal initialization.

**Defensive explanation**

- The essential unit is **producer → surviving pointer → freed request heap → later consumer**, usually across two requests on the same worker.
- Confirmed examples include session upload-progress lifecycle state and fatal-error backtrace state; other state families are conditional.
- The patch performs a comprehensive reset of request-bound global and extension state.[4]

**Animation rule:** never show controlled memory reuse, heap grooming, type confusion, or pointer placement.

#### Comparison table

| Dimension | CVE-2026-109618 | CVE-2026-109619 |
|---|---|---|
| Short label | OOM corruption | Stale global state |
| Trigger class | Allocation failure / OOM | Fatal interruption or diagnostic leaving/repopulating state |
| Temporal shape | Can occur within one failing request | Producer and consumer can span later requests |
| Central invariant | Cleanup must never observe partially initialized state | Request-owned state must never survive into a later request |
| Official patch direction | Replace unsafe OOM `longjmp()` with safe-point soft/hard OOM | Reset broader request-bound global/extension state |
| Primary defense | Upgrade; enforce conservatively | Upgrade; eliminate attacker-reachable fatal paths; restart workers after config changes |

#### SAPI lens

- **Apache `mod_php` — highest risk:** demonstrated unauthenticated request paths can trigger before application code runs.[2]
- **PHP-FPM:** startup failure can terminate the child, removing that exact path; post-startup fatal paths can still leave a producer for a later same-worker consumer, and a session-lifecycle chain was validated on FPM.[3][4]
- **FrankenPHP:** source analysis assessed it as analogous to `mod_php`; treat as affected pending patch, not as proven-safe.[3]
- **LiteSpeed / LSAPI:** exposure requires a nuanced, configuration-dependent assessment rather than a blanket “safe” label.[3]
- **CGI:** listed in scope by the official advisory; deployment-specific configuration determines exposure.[2]
- **CLI-only:** not the web-request surface described by the advisories, but the same stale binary may indicate other vulnerable runtimes nearby.

**Visual interaction:** user selects a SAPI and the same two mechanisms redraw with different request/worker lifecycle outcomes. Label conclusions as **confirmed**, **source-assessed**, or **conditional**.

---

### Chapter 3 — Exposure: “The Estate, Not Just the Server”  
**Purpose:** replace “is my site vulnerable?” with “which runtimes do I actually operate?”

**Exposure dimensions**

1. **Runtime branch** — 8.2 / 8.3 / 8.4 / 8.5 / unsupported legacy / vendor-patched.
2. **Patch artifact** — upstream release, distro/LTS backport, source backport, appliance vendor build.
3. **SAPI and deployment** — FPM, `mod_php`, CGI, FrankenPHP, LiteSpeed.
4. **Reachability** — internet-facing, internal, management plane, build pipeline, embedded appliance.
5. **Lifecycle state** — long-lived worker, single-request process, recycled worker.
6. **Business criticality** — crown jewels, customer data, payment/auth, internal tooling.

**The estate message**

- The flaw is in the runtime, so application hardening alone does not remove it.
- Inventory must include servers, containers, Kubernetes workloads, control panels, appliances, vendor products and nested PHP runtimes.
- Package names and upstream version strings can mislead: verify the vendor package/build, the running artifact, and that workers restarted.
- Unsupported branches transform a patch event into a migration program. PHP 8.1 and older are EOL; PHP 8.2 has a known EOL date.[2][13]

**Evidence-based exposure card fields**

- Asset / owner / environment
- PHP artifact and SAPI
- Fixed version or vendor-backport evidence
- Internet exposure
- WAF / edge status
- Last worker restart
- Telemetry retained since
- Investigation outcome
- Residual risk / exception expiry

---

### Chapter 4 — Campaign: “When Scans Become Campaigns”  
**Purpose:** explain the adversary layer without turning the portal into an exploitation manual.

**Three-level certainty model**

| Level | Meaning | Portal treatment |
|---|---|---|
| **Observed attempt** | Request, scan or blocked payload activity | Show telemetry pattern and first-seen time |
| **Payload association** | Artifact/infrastructure linked to a family such as Potassium | Show confidence and source; do not imply execution |
| **Confirmed compromise** | Independent evidence of code execution or host impact | Reserved for verified incident findings; absence of confirmation remains explicit |

**Potassium chapter content**

- Potassium is a Mirai-derived botnet family first publicly identified in March 2026, with evolved downloader and network-disruption capability.[11]
- PHP2Shell attempts sought to use the flaws as an access route; they should not be described as the malware’s origin.
- Describe defensive features only at campaign-classification level: loader chain, bot staging, C2, DDoS role. Keep operational handling in the IOC register rather than the narrative.
- Where sources disagree on successful exploitation, preserve the disagreement. Sophos corrected an earlier assessment after telemetry showed failed attempts and no evidence of successful compromise; other observers reported distinct evidence standards.[10][12]

**IOC register fields**

- Indicator type and normalized value
- First / last seen
- Source and report date
- Confidence: `Low / Medium / High`
- Role: `scanner / loader / C2 / payload host / related`
- Shared-infrastructure warning
- Recommended action: `investigate` vs `block` vs `monitor`
- Expiry / review date

**Critical warning:** AWS noted that some observed IPs were shared anonymization infrastructure, not exclusive to this activity; the portal should say **investigate, do not reflexively block** unless a vendor explicitly recommends it.[8]

---

### Chapter 5 — Response: “The Four-Hour Playbook”  
**Purpose:** translate narrative into repeatable operational memory.

#### Stage 1 — DISCOVER (0–1 hour)

**Goal:** establish the true estate and preserve volatile evidence.

- Inventory web-facing PHP across hosts, containers, orchestration, panels, appliances and vendor products.
- Identify branch, SAPI, package/build, exposure and business criticality.
- Prioritize internet-facing and request-body-consuming systems.
- Preserve web, PHP, WAF, endpoint, process, network and file telemetry **before** restarting workers where compromise is suspected.
- Define the hunt window as **at least 17 October 2026**, the earliest AWS-reported attempt.[8]

**Evidence gate:** named asset list, runtime/SAPI map, owner map, telemetry coverage, hunt start time.

#### Stage 2 — CONTAIN + PATCH (0–4 hours)

**Goal:** remove reachability while restoring a safe runtime.

- Patch supported branches to `8.5.12`, `8.4.27`, `8.3.36` or `8.2.35`.
- Use a verified vendor backport or the PHP security team's minimal source backports for legacy branches where appropriate; vendor patch provenance must be recorded.
- For PHP 7.3 and older, plan migration or a supported commercial path.
- Restart every serving worker and redeploy affected containers; installation alone does not replace running code.
- Keep WAF / edge controls as defense in depth while patching.
- If patching is delayed, apply only official, bounded temporary controls and document their limitations; do not call the system safe.[2][3][4]
- Isolate or take offline the highest-risk unpatchable estate.

**Evidence gate:** package/build evidence, runtime version, restart timestamp, external verification, WAF state, exception owner and expiry.

#### Stage 3 — INVESTIGATE (1–12 hours, parallel with patching)

**Goal:** distinguish attempts, delivery, execution and impact.

Hunt in this order:

1. **Edge / web** — unusual multipart traffic, request fields associated with upload progress, repeated memory/fatal errors, malformed session cookies, unusual status codes, worker churn.
2. **Host / process** — web or PHP worker spawning shells, download tools or interpreters; unexpected child processes.
3. **Filesystem** — new or modified executable/PHP files under web roots, temporary execution paths, unexpected persistence.
4. **Network** — outbound calls from PHP workers to uncommon infrastructure; DNS patterns; connections to listed indicators.
5. **Identity / secrets** — if compromise is plausible, scope credentials and tokens accessible to the worker.

Correlate request → process → file → network. A single log line is not proof; clean application logs are not proof of safety because the vulnerable path can run before application code.[2][6]

**Evidence gate:** covered data sources, queries, timeline, findings, false positives, limitations, escalation decision.

#### Stage 4 — RECOVER + HARDEN (12–72 hours and onward)

**Goal:** restore trust and prevent recurrence.

- For suspected code execution, rebuild from a trusted image or package where feasible; do not rely on deleting one file.
- Rotate credentials and secrets that the compromised worker could access, in a risk-based order.
- Monitor the estate for persistence, outbound callbacks, recurrence and newly exposed runtimes.
- Re-test WAF behavior; request-only rules may miss attempts while response inspection adds context.[9]
- Set runtime lifecycle policy: worker recycling, restart automation, configuration drift detection.
- Set EOL migration milestones, especially before 8.2 reaches EOL.
- Add disclosure-day playbooks to incident exercises; rehearse distributor coordination and executive decisions.
- Fund maintainer capacity as security infrastructure.

**Evidence gate:** rebuild/deploy record, secret rotation record, monitoring coverage, owner sign-off, residual-risk acceptance.

#### Response-page interaction

A role selector—**Executive / SOC / Platform / AppSec**—changes the ordered checklist without changing the underlying facts. Each action has:

- owner
- deadline window
- safe command or evidence request where appropriate
- expected artifact
- pass/fail evidence gate
- fallback if it fails

---

### Chapter 6 — Outlook: “The Strategic Signal”  
**Purpose:** separate the patch from the system-level lessons.

**Seven conclusions**

1. **Complexity is not a durable defense.** Subtle exploit chains once bought years of safety; AI-assisted adaptation can now make them operational in hours.[6][8]
2. **Discovery and repair are separate bottlenecks.** Finding a flaw faster does not automatically fund or staff the fix. The PHP Foundation explicitly identified both process and resource constraints.[1]
3. **Disclosure is now a distributed supply-chain operation.** Downstream vendors and image publishers need controlled early-access builds, verifiable embargo boundaries and a decision protocol for early release.
4. **Debates about “zero-day” must be evidence-based.** Pre-disclosure probing is not the same as successful exploitation. Keep those states separate in both copy and visuals.
5. **Runtime inventory is a resilience capability.** EOL branches and hidden embedded PHP turn emergency response into migration debt.[13]
6. **Detection must combine request, response, process and network evidence.** Edge controls matter, but origin behavior and host telemetry establish outcome.[9]
7. **Sustainment beats heroics.** Professional security teams, sustained funding and reviewable trade-offs are part of the fix.

**Executive decision matrix**

| Decision | Deadline | Evidence of completion |
|---|---:|---|
| Inventory all serving PHP and EOL branches | 4 h | Complete asset/runtime map with named owners |
| Patch or isolate exposed critical systems | 4 h | Verified runtime + restart + edge state |
| Hunt from 17 Oct and preserve evidence | 12 h | Documented timeline and outcome |
| Close unsupported-branch debt | 30–90 d | Funded migration plan with milestones |
| Review disclosure / early-release protocol | 30 d | Named decision roles, vendor access model, rehearsed playbook |
| Fund maintainer capacity | 90 d | Commitment and named sponsor/owner |

---

## 6. Cinematic explainer architecture

### Format

- **Target:** 11–13 minutes, 16:9, 1080p master; 4K optional.
- **Narrator:** one authoritative, calm voice; no “hacker” persona.
- **Language:** separate English and Polish narration/subtitle masters from one locked visual master.
- **Captions:** burned-in language-specific subtitles plus sidecar `.vtt`/`.srt`.
- **Audio:** restrained score; silence is a meaningful beat at the first OOM event.
- **Source credits:** a final full-screen evidence ledger and an HTML companion page.

### Scene plan

| Time | Scene | Visual story | Intellectual job | Editorial guardrail |
|---:|---|---|---|---|
| 0:00–0:35 | **Cold open: one request** | A cyan request crosses a web edge into a PHP worker. One amber fragment remains after the request fades. | Establish the motif before naming the CVEs. | No payload, no shell, no attacker. |
| 0:35–1:15 | **Two alarms, one engine** | Split pulse: OOM/interruption and stale-state/producer-consumer. Title resolves. | State the thesis and fixed releases. | No impact inflation; label CVSS 9.2 correctly. |
| 1:15–2:40 | **22 years in the margins** | Archive-like 2004 → 2020 → 2024 → 2026 timeline; each dormant signal is a dim line. | Make historical depth felt without implying one CVE existed unchanged since 2004. | Caption distinguishes lineage, related bugs and current CVEs. |
| 2:40–4:10 | **The inflection** | Three research constellations—Calif, OpenAI, Wiz—converge; a model-assisted loop iterates over abstract code shapes, not payload code. | Explain why AI mattered: variant generalization, adaptation, detection, validation—not magic authorship.[6] | Human validation remains visible. |
| 4:10–5:25 | **The glass breaks** | Embargo clock; 17 Oct trace; 20 Oct identifiers; 21 Chainguard images / WAF / official release. | Show a coordination system failing under speed and contested judgment.[1][8][9] | Present competing accounts as attributed positions; no villain portrait. |
| 5:25–7:10 | **CVE-2026-109618** | Memory arena, safe-point grid, `longjmp()` arc that jumps a cleanup gate, then patch replaces the arc with a controlled descent. | Give the viewer the invariant: cleanup never sees invalid state.[3] | No offsets, heap grooming, shellcode or weaponization. |
| 7:10–8:45 | **CVE-2026-109619** | Request A leaves a dangling amber tag; worker persists; Request B touches it before reset. | Teach producer/consumer and same-worker timing.[4] | No controlled reclaim, type confusion or pointer arithmetic. |
| 8:45–9:30 | **The topology changes everything** | Same mechanism re-renders across `mod_php`, FPM, CGI, FrankenPHP, LiteSpeed. | Explain why “affected” is not a single boolean.[2][3][4] | Confidence labels on every SAPI conclusion. |
| 9:30–10:25 | **The estate** | A global estate blooms from one runtime into hosts, containers, appliances, panels and EOL branches. | Turn a vulnerability into an inventory problem.[13] | Avoid uncited global counts and false precision. |
| 10:25–11:20 | **The campaign layer** | Scans become a noisy field; an attempted chain ends at a containment gate; a separate IOC constellation is visible. | Explain attempts vs execution and Potassium association.[10][11][12] | No malware execution, payload URL, command or C2 usage steps. |
| 11:20–12:15 | **Four hours to certainty** | Four gates: Discover → Contain/Patch → Investigate → Recover/Harden. | Convert comprehension into action. | Every action remains defensive and verifiable. |
| 12:15–13:00 | **The next zero-day** | Timeline resets, but now AI threads and maintainer-capacity lights are visible. | Deliver strategic conclusion and attribution. | End with responsibility, not fear. |

### Animation grammar

- **Geometry before jargon.** First show the lifecycle break; then name `longjmp()`, producer, consumer and SAPI.
- **Opacity controls attention:** primary state at 100%, contextual states at 40%, grid/history at 12–18%.
- **No simulated terminals** displaying commands; no fake dashboards pretending to be telemetry.
- **One transition metaphor:** a thread crossing a boundary—request, worker, disclosure window, patch.
- **Data is labeled:** dates, times in UTC, source badge, confidence.
- **Motion semantics:** cyan = normal, amber = incomplete/stale, red = unsafe transition, green = reset/verified patch, purple = exposure estate.

### Companion interaction

The film is the cinematic layer of the portal, not a separate product. End cards deep-link to:

- the relevant portal chapter;
- the exact source ledger;
- the operator checklist;
- a downloadable one-page defensive summary.

---

## 7. Bilingual editorial system

### Parallel, not duplicated

English is the canonical authored source. Polish is a **full editorial peer** with the same claim IDs, evidence IDs, timestamps, confidence labels and action steps. Polish copy may compress or expand as needed for natural rhythm, but it may not introduce claims absent from the canonical record.

### Translation and terminology rules

| English | Polish editorial preference | Rule |
|---|---|---|
| remote code execution (RCE) | zdalne wykonanie kodu (RCE) | Keep RCE after first expansion |
| out of memory / OOM | brak pamięci / OOM | Explain once, then use OOM |
| request | żądanie HTTP | Use “żądanie” when context is clear |
| worker | proces obsługujący / worker | Define “worker” once; prefer “proces roboczy PHP” in prose where clearer |
| stale global state | nieaktualny stan globalny | Pair with English technical label on first use |
| use-after-free | use-after-free (UAF) | Keep established technical term with Polish explanation |
| producer / consumer | producent / konsument | Add English term on first use |
| SAPI | SAPI | Never translate the interface name |
| exploit attempt | próba wykorzystania | Avoid “exploit” as a verb in Polish |
| successful compromise | potwierdzone przejęcie / kompromitacja | Reserve for verified compromise |
| patch | poprawka bezpieczeństwa / aktualizacja | Use “poprawka” for the release, “łagodzenie” for temporary mitigation |
| EOL | koniec wsparcia (EOL) | Keep EOL after first expansion |
| coordinated disclosure | skoordynowane ujawnianie | Standard Polish terminology |
| embargo | embargo | Acceptable in security Polish; “okno embargo” on first use |
| indicator of compromise (IOC) | wskaźnik naruszenia (IOC) | Preserve IOC after first expansion |

### Locale mechanics

- Separate locale directories or route prefixes with identical slugs and stable section IDs.
- `<html lang>` updates; localized metadata, Open Graph, dates and number formats.
- Dates shown as `21 Oct 2026 · 14:00 UTC` and `21.10.2026 · 14:00 UTC`; never ambiguous `10/21`.
- CVE/GHSA identifiers, PHP config keys, file names, code and command examples remain invariant.
- Polish line length set ~10–15% shorter than English for headings and cards.
- Language switch preserves chapter and scroll position; it must not reset evidence state.
- Every source title remains in its published language; Polish explanatory labels sit alongside it.
- Separate EN/PL metadata, narration, captions and PDF/runbook exports.

### Translation QA gate

- Equal chapter and claim counts.
- Every claim ID present in both locales.
- Every numeric date, version, CVSS, duration and IOC normalized identically.
- No orphaned source or translation note.
- Polish native technical/security review before publication.

---

## 8. Evidence, confidence and source architecture

### Claim model

Each atomic claim should be stored as structured data:

```json
{
  "id": "timeline.2026-10-17.aws-attempt",
  "type": "event",
  "date": "2026-10-17",
  "timePrecision": "day",
  "claim": {
    "en": "AWS reported a PHP2Shell exploitation attempt in MadPot telemetry four days before public disclosure.",
    "pl": "AWS poinformował o próbie wykorzystania PHP2Shell w telemetrii MadPot, cztery dni przed publicznym ujawnieniem."
  },
  "confidence": "confirmed-observation",
  "scope": "AWS MadPot telemetry; not proof of successful compromise",
  "sourceIds": ["source.aws"],
  "alternateAccounts": [],
  "safeForPublication": true
}
```

### Confidence vocabulary

- **CONFIRMED:** directly established by primary documentation or multiple independent observations.
- **SOURCE-ASSESSED:** a source's conclusion or technical analysis; scope and limitations remain explicit.
- **DISPUTED:** credible accounts conflict; show both and the disagreement.
- **UNKNOWN:** material question remains unresolved at the editorial cut-off.

### Evidence hierarchy

1. PHP security advisories and release records.
2. PHP Foundation and PHP Security Team statements.
3. Research disclosures from Calif, OpenAI and Wiz.
4. Cloud/telemetry reports from AWS, Cloudflare, Sophos, Arctic Wolf and others.
5. Vendor and distro statements.
6. Reputable reporting for chronology and context.
7. Social posts only as leads; never as the sole basis for a material claim.

### Mandatory handling of changing facts

- Store `publishedAt`, `observedAt`, `retrievedAt`, `validAtCutoff` and `supersedes`.
- Keep corrections in the ledger rather than silently replacing text.
- Show a “Changed since first publication” note where relevant.
- Freeze the editorial cut-off at **23 October 2026, 15:45 UTC** and label later updates.

---

## 9. Visual and interaction system

### Premium visual language

**Concept:** “Forensic observatory.” A dark, calm instrument surface with bright evidence states—not a neon hacker dashboard.

**Palette**

- Canvas: `#070A0F`
- Raised surface: `#0E1420`
- Hairline: `#223044`
- Text primary: `#E8EEF7`
- Text secondary: `#9BA9BC`
- PHP / estate purple: `#8B5CF6`
- Request cyan: `#22D3EE`
- Incomplete-state amber: `#F59E0B`
- Unsafe-transition coral: `#FB7185`
- Verified-patch green: `#34D399`
- Citation slate: `#64748B`

**Typography**

- Display: a high-contrast editorial serif or sharp grotesk, EN/PL complete.
- UI: neutral grotesk with tabular numerals.
- Code and identifiers: monospace.
- Use typographic hierarchy, not many cards.

**Motion**

- One continuous world: timelines, request lines and worker cells.
- 120–180 ms UI transitions; 600–1200 ms cinematic state changes.
- Respect `prefers-reduced-motion`; provide static scene-by-scene alternatives.
- No looping “hacker” animations.

### Signature components

1. **Threadline** — the request/worker/disclosure thread that appears throughout.
2. **State Lens** — toggle between normal, incomplete and stale state.
3. **Runtime Lens** — SAPI overlay.
4. **Confidence Ribbon** — visually consistent fact/assessment/unknown labels.
5. **Evidence Drawer** — source, quote, timestamp, scope and caveat.
6. **Estate Map** — topology view, not a decorative globe.
7. **Action Gate** — checklist with pass/fail evidence.

---

## 10. Content safety and editorial guardrails

### Prohibited

- Working exploit code, request recipes, byte-level payloads or exploit chains.
- ASLR bypass or heap-grooming recipes.
- Shell commands for downloading or executing malware.
- C2 interaction instructions or malware configuration.
- Claims that attempts equal compromise.
- Claims that a WAF rule makes a host safe.
- Claims that patching an application fixes the runtime.
- Unqualified global host counts.
- A single source presented as infallible where another source reports materially different facts.
- A moralizing “hackers are evil” frame; center systems, incentives and evidence.

### Allowed and required

- State-transition diagrams at a conceptual level.
- Producer/consumer and same-worker lifecycle concepts.
- SAPI comparisons with confidence labels.
- Defensive hunt signals and evidence-correlation methods.
- IOC lists with provenance and shared-infrastructure warnings.
- Official temporary mitigations with their limitations.
- Rebuild, credential rotation, monitoring and migration guidance.

### Review gates

- **Security review:** technical accuracy and defensive necessity.
- **Claims review:** every material claim maps to evidence and confidence.
- **Bilingual review:** Polish security terminology and parity.
- **Accessibility review:** captions, transcript, keyboard, contrast, reduced motion.
- **Legal/editorial review:** fair treatment of disputed actors; no implied endorsement or guilt beyond evidence.

---

## 11. Production plan and acceptance criteria

### Phase A — Canonical record

1. Build `sources.json` from the evidence ledger.
2. Build `claims.json`, `timeline.json`, `cves.json`, `sapi.json`, `iocs.json` and `playbook.json`.
3. Assign stable IDs before layout or translation.
4. Verify every factual sentence maps to at least one claim and source.

### Phase B — Design system

1. Implement shared tokens, typography, components and locale shell.
2. Build the timeline, state-lens and SAPI-lens primitives.
3. Test the three reading modes and the language switch.
4. Establish source/evidence drawer and confidence ribbon before page templates.

### Phase C — Portal

1. Build the seven routes plus source ledger.
2. Generate EN and PL from the canonical record.
3. Add print/export for executive brief and response runbook.
4. Add reduced-motion, no-JS and deep-link behavior.

### Phase D — Film

1. Lock the 13-scene storyboard and script.
2. Build reusable scene primitives: request, worker, memory arena, timeline, estate, IOC field, four gates.
3. Render English master, then Polish narration/subtitles against the same visual master.
4. Export accessible transcript and linked source ledger.

### Phase E — Verification

- Automated:
  - all EN/PL routes exist;
  - all local links resolve;
  - all claim IDs and source IDs resolve;
  - all versions, dates, CVSS values and confidence labels match canonical data;
  - no orphaned source or untranslated reader-facing string;
  - captions and transcript exist for the film.
- Human:
  - technical review;
  - Polish native review;
  - action validation in a safe lab;
  - source spot-check;
  - keyboard, screen-reader and reduced-motion review;
  - mobile and large-screen visual review.

### Definition of done

- A first-time executive can state the risk, patch target and next action in 90 seconds.
- A responder can identify the estate, patch/contain, hunt from 17 October and preserve evidence without reading exploit details.
- A specialist can explain both CVEs and the SAPI differences from the visuals and text.
- A Polish reader receives equivalent depth, confidence and action—not a reduced translation.
- Every material statement is traceable to an evidence entry; unknowns and disputes remain visible.

---

## 12. Attribution and credit

Use this exact formulation in the portal colophon, film end card and downloadable briefs:

> **Research synthesis supplied via Google Gemini / Argon. Production by Hermes Agent.**

Additional credit should identify the underlying primary research and reporting organizations by name and link to the evidence ledger: the PHP project and PHP Foundation; Calif Research; OpenAI; Wiz Research; AWS; Cloudflare; Sophos; Arctic Wolf; Nokia Deepfield; and other cited sources. The attribution must not imply that Hermes Agent authored the original CVEs or that any AI system acted independently of the named human research and maintainer teams.

---

## Sources

Primary sources are registered in the project citation ledger. The architecture above uses the following load-bearing references; dates and details are bounded by the stated editorial cut-off. The coordinated disclosure model and the contributions of maintainers, researchers and infrastructure providers are also documented in OpenAI’s Patch the Planet account.[7]

## Sources

[1] https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security — The PHP Foundation — Today’s PHP Security Release
[2] https://www.php.net/archive/2026.php — PHP Project — Security advisory and 2026 archive
[3] https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w — PHP Advisory — CVE-2026-109618
[4] https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp — PHP Advisory — CVE-2026-109619
[5] https://calif.io/php2shell — Calif Research — PHP2Shell
[6] https://www.wiz.io/blog/php2shell-php-rce — Wiz Research — PHP2Shell
[7] https://openai.com/index/coordinated-disclosure-of-critical-vulnerabilities — OpenAI — Patch the Planet coordinated disclosure
[8] https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot — AWS — PHP2Shell exploitation in MadPot
[9] https://blog.cloudflare.com/php-vulnerabilities-waf-protection — Cloudflare — PHP2Shell WAF protections
[10] https://www.sophos.com/en-us/blog/proof-of-concept-exploit-released-for-php-vulnerabilities-109618-109619 — Sophos — PHP2Shell PoC and threat activity
[11] https://github.com/deepfield/public-research/blob/main/potassium/report.md — Nokia Deepfield — Potassium report
[12] https://arcticwolf.com/resources/blog/php2shell-critical-php-vulnerabilities-enable-unauthenticated-remote-code-execution — Arctic Wolf — PHP2Shell threat activity
[13] https://www.php.net/eol.php — PHP Project — Unsupported branches
