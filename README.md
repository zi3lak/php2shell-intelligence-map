# PHP2Shell Intelligence Map

A premium bilingual (EN/PL), defensive threat-intelligence experience about the October 2026 PHP runtime crisis: **CVE-2026-109618**, **CVE-2026-109619**, and the related **CVE-2026-115560** advisory.

The project combines:

- a source-linked chronology from 2004 to 25 October 2026;
- an animated request/worker lifecycle model;
- Apache `mod_php` versus PHP-FPM exposure analysis;
- global PHP/EOL exposure snapshots with explicit methodology caveats;
- defensive research IOCs for the Mirai-derived Potassium campaign;
- a four-stage evidence-preservation, patching, detection and response playbook;
- a cinematic canvas explainer and responsive, accessible bilingual interface.

## Attribution

**Research synthesis supplied via Google Gemini / Argon. Interactive presentation, animation and engineering by Hermes Agent.**

The supplied Gemini research dossier was the narrative seed. It was source-checked against PHP advisories, OpenAI, Wiz, CrowdStrike, Datadog, CISA, CERT-EU, national CERTs, AWS Threat Intelligence, Cloudflare, The PHP Foundation, The Hacker News, Modat, and Nokia Deepfield. The interface distinguishes confirmed facts, reported observations, and evidence caveats.

No exploit payload, weaponized script, or operational abuse procedure is included. IOC data is present only for defensive detection and incident-response use.

## Live site

Published through GitHub Pages:

- https://zi3lak.github.io/php2shell-intelligence-map/

## Run locally

```bash
cd /home/cssltd/php2shell-intelligence-map
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Structure

```text
index.html              Single-page bilingual experience
assets/app.css          Visual system, animation and responsive layout
assets/app.js           Rendering, language switching, filters and cinematic canvas
data/content.js         Canonical EN/PL content and evidence ledger
docs/search-results.json Research capture used during source verification
```

## Evidence and caveats

This is a **source-checked snapshot dated 25 October 2026**, not an official PHP advisory. Internet scans use incompatible units (services, hosts, web properties), so their totals are presented side by side rather than merged. “55 minutes after Chainguard” is a temporal correlation reported by the PHP Foundation/ELLIO, not proof that the same actor performed both actions.

Only patched PHP releases are a complete mitigation. Configuration workarounds reduce exposure but do not replace updating and worker restarts.

## Primary references

- [PHP GHSA-w8hw-w9fx-j79w — CVE-2026-109618](https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w)
- [PHP GHSA-6wmf-4rv5-p3rp — CVE-2026-109619](https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp)
- [PHP 2026 news archive](https://www.php.net/archive/2026.php)
- [OpenAI — Patch the Planet](https://openai.com/index/coordinated-disclosure-of-critical-vulnerabilities/)
- [Wiz — PHP2Shell technical deep dive](https://www.wiz.io/blog/php2shell-php-rce)
- [CISA — immediate patching alert](https://www.cisa.gov/news-events/alerts/2026/10/21/critical-vulnerabilities-php-require-immediate-patching)
- [CERT-EU 2026-018](https://cert.europa.eu/publications/security-advisories/2026-018/)
- [AWS Threat Intelligence — MadPot pre-disclosure attempt](https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/)
- [PHP Foundation — security release and process reform](https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/)
- [Cloudflare — WAF protections](https://blog.cloudflare.com/php-vulnerabilities-waf-protection/)

The complete interactive ledger is available in the **Sources** section of the site.
