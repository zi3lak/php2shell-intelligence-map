# Evidence ledger / Rejestr dowodów

Editorial snapshot: 25 October 2026. The portal prioritizes official advisories and clearly labels reported or disputed claims.

## Confirmed by primary sources

- Both core CVEs are rated 9.2 under CVSS v4.0 by PHP: `CVSS:4.0/AV:N/AC:H/AT:P/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N`.
- NVD currently assigns CVSS v3.1 scores of 9.8 to CVE-2026-109618 and 8.1 to CVE-2026-109619.
- Both advisories list the same CWE set: CWE-416, CWE-755, CWE-824, CWE-1325 and CWE-1419.
- Fixed supported releases: PHP 8.2.35, 8.3.36, 8.4.27, 8.5.12.
- PHP published minimal source backports for PHP 7.4, 8.0 and 8.1; PHP 5.4–7.3 are deeply EOL.
- Upstream advisories cover the maintained 8.2–8.5 branches. Researchers separately assess impact in older paths back to PHP 5.4; that wider scope is attributed to the researchers rather than presented as the upstream advisory range.
- CVE-2026-109618 is an OOM-interruption/incomplete-initialization flaw in request cleanup; CVE-2026-109619 is a stale request-owned global-state flaw consumed across request boundaries.
- Apache `mod_php` has the highest-risk application-independent path because shutdown runs after startup failure. PHP-FPM exits the child on startup failure but remains exposed through other state-lifecycle paths.
- OpenAI confirms GPT-5.6 Sol was used by Calif in Patch the Planet and links a PHP version checker. Wiz confirms use of Wiz Atlas, Gemini 4 Argon and GPT-5.6 Sol. Calif states that no privileged model or special harness was required for initial discovery.
- AWS Threat Intelligence detected an exploitation attempt on 17 October in MadPot telemetry, four days before public disclosure.
- The PHP Foundation reports Chainguard's 07:41 UTC publication; ELLIO reports its first request at 08:36 UTC. The 55-minute interval is a temporal correlation and not proof of a common actor.
- PHP's 23 October informational advisory recommends `session.upload_progress.enabled=0` for CVE-2026-115560 until the next regular bug-fix release. The advisory describes an unusual configuration/application combination and does not publish a severity score.
- Patched releases are the only complete mitigation; configuration controls are temporary risk reduction.

## Reported with qualification

- Internet exposure totals vary because scanners count different units: PHP services, unique hosts, web properties and package installations. The portal presents them side by side instead of merging them.
- The often-quoted “about 70%” is PHP's share among websites with a known server-side language (W3Techs read 69.2% on 25 October 2026), not a vulnerability rate.
- Modat's 79% figure applies to internet-facing PHP services with a known version; Qualys' 71% figure applies to a different package-installation denominator. They are not interchangeable.
- Potassium activity and IOCs are reported by Sophos, Deepfield, The Hacker News and other researchers. Early reporting documented attempted delivery and scanning, not widespread confirmed production compromise.
- ASLR-bypass research is configuration-specific: VulnCheck described PHP 8.4.26 on x86-64 with ASLR enabled and `display_errors=off`; CovertSwarm separately reported an AArch64 Apache/mod_php environment. These results do not establish a universal ASLR bypass.
- Exact actor attribution for the 17 October probe remains unknown.
- The two CVEs were not listed in CISA KEV in the 23 October 2026 catalog snapshot.

## Corrected or narrowed from the supplied dossier

- The dossier's NVD CVSS v3.1 pair (9.8 / 8.1) is accurate when matched to the correct CVE IDs and current NVD records.
- The dossier's statement that CVE-2026-115560 was a general bypass was too broad. PHP describes an unusual configuration/application combination and calls the vector unlikely; the recommendation remains to disable session upload progress.
- The dossier did not consistently distinguish “no public exploit available” from “no exploit existed.” The portal says the early public research did not confirm widespread successful automated compromise.
- The 55-minute relationship is explicitly presented as a temporal correlation, not causation. AWS had already logged an attempt on 17 October, four days earlier.
- The broad statement that both flaws entered in PHP 5.4 is narrowed: the concrete paths have different ages. The 5.4-era session path relates to CVE-2026-109619; CrowdStrike dates the HashTable ordering behind CVE-2026-109618 to a 2017 optimization first shipped in PHP 7.3.
- `session.upload_progress.enabled=0` and `fatal_error_backtraces=0` are the CVE-2026-109619-specific controls. The CVE-2026-109618 advisory's primary temporary control is an administratively enforced `memory_limit=-1`, paired with edge limits and cgroup/container isolation.

## Sources

The live portal includes the complete linked evidence ledger. The principal references are:

1. PHP GHSA-w8hw-w9fx-j79w — https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w
2. PHP GHSA-6wmf-4rv5-p3rp — https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp
3. NVD CVE-2026-109618 — https://nvd.nist.gov/vuln/detail/CVE-2026-109618
4. NVD CVE-2026-109619 — https://nvd.nist.gov/vuln/detail/CVE-2026-109619
5. PHP 2026 archive — https://www.php.net/archive/2026.php
6. OpenAI Patch the Planet — https://openai.com/index/coordinated-disclosure-of-critical-vulnerabilities/
7. Wiz technical deep dive — https://www.wiz.io/blog/php2shell-php-rce
8. PHP Foundation process review — https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/
9. AWS MadPot disclosure — https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/
10. CISA alert — https://www.cisa.gov/news-events/alerts/2026/10/21/critical-vulnerabilities-php-require-immediate-patching
11. CERT-EU 2026-018 — https://cert.europa.eu/publications/security-advisories/2026-018/
12. ELLIO observation report — https://ellio.tech/en/blog/php2shell-what-we-observed-and-what-to-do
13. VulnCheck ASLR-enabled research — https://www.vulncheck.com/blog/php2shell-vulnerabilities
14. NCSC-NL operational repository — https://github.com/NCSC-NL/php2shell
15. Modat exposure report — https://modat.io/blog/php-exposure-before-the-21-oct-2026-security-release/
16. Qualys telemetry — https://blog.qualys.com/vulnerabilities-threat-research/2026/10/20/php-announces-critical-security-release-for-two-vulnerabilities
17. Supplied Gemini / Argon synthesis — https://share.gemini.google/GIx6IT23fJr5
