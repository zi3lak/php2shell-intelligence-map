# Evidence ledger / Rejestr dowodów

Editorial snapshot: 25 October 2026. The portal prioritizes official advisories and clearly labels reported or disputed claims.

## Confirmed by primary sources

- Both core CVEs are rated 9.2 under CVSS v4.0 by PHP: `CVSS:4.0/AV:N/AC:H/AT:P/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N`.
- NVD currently assigns CVSS v3.1 scores of 9.8 to CVE-2026-109618 and 8.1 to CVE-2026-109619.
- Fixed supported releases: PHP 8.2.35, 8.3.36, 8.4.27, 8.5.12.
- PHP published minimal source backports for PHP 7.4, 8.0 and 8.1; PHP 5.4–7.3 are deeply EOL.
- CVE-2026-109618 is an OOM-interruption/incomplete-initialization flaw in request cleanup; CVE-2026-109619 is a stale request-owned global-state flaw consumed across request boundaries.
- Apache `mod_php` has the highest-risk application-independent path because shutdown runs after startup failure. PHP-FPM exits the child on startup failure but remains exposed through other state-lifecycle paths.
- OpenAI confirms GPT-5.6 Sol was used by Calif in Patch the Planet and links a PHP version checker. Wiz confirms use of Wiz Atlas, Gemini 4 Argon and GPT-5.6 Sol.
- AWS Threat Intelligence detected an exploitation attempt on 17 October in MadPot telemetry, four days before public disclosure.
- The PHP Foundation and ELLIO report the first ELLIO request at 08:36 UTC, 55 minutes after Chainguard's 07:41 UTC publication. This is temporal correlation, not proof of a common actor.
- PHP's 23 October informational advisory recommends `session.upload_progress.enabled=0` for CVE-2026-115560 until the next regular bug-fix release.
- Patched releases are the only complete mitigation; configuration controls are temporary risk reduction.

## Reported with qualification

- Global exposure totals vary because scanners count different units: PHP services, unique hosts and web properties. The portal presents them side by side instead of merging them.
- Potassium activity and IOCs are reported by Sophos, Deepfield, The Hacker News and other researchers. Early reporting documented attempted delivery and scanning, not widespread confirmed production compromise.
- The ASLR-bypass capability was described by VulnCheck and reporting around it; the portal does not publish exploit or weaponization details.
- Exact actor attribution for the 17 October probe remains unknown.

## Corrected or narrowed from the supplied dossier

- The dossier's NVD CVSS v3.1 pair (9.8 / 8.1) is accurate when matched to the correct CVE IDs.
- The dossier's statement that CVE-2026-115560 was a general bypass was too broad. PHP describes an unusual configuration/application combination and calls the vector unlikely; the recommendation remains to disable session upload progress.
- The dossier did not consistently distinguish “no public exploit available” from “no exploit existed.” The portal says the early public research did not confirm widespread successful automated compromise.
- The 55-minute relationship is explicitly presented as a temporal correlation, not causation.
- The broad statement that both flaws entered in PHP 5.4 is narrowed: the concrete paths have different ages. The 5.4-era session path relates to CVE-2026-109619; CrowdStrike dates the HashTable ordering behind CVE-2026-109618 to a 2017 optimization first shipped in PHP 7.3.

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
13. NCSC-NL operational repository — https://github.com/NCSC-NL/php2shell
14. Modat exposure report — https://modat.io/blog/php-exposure-before-the-21-oct-2026-security-release/
15. Supplied Gemini / Argon synthesis — https://share.gemini.google/GIx6IT23fJr5
