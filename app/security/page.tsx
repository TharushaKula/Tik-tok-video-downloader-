import type { Metadata } from "next";
import Link from "next/link";

import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";

import { SITE } from "@/lib/site";
import { graph, pageMetadata, webPageSchema } from "@/lib/seo";

const TITLE = "Security and Responsible Disclosure";
const DESCRIPTION =
  "How to report a security problem in ClipKoala, what is in scope, what to expect back, and what the service does and does not store.";
const UPDATED = "2026-09-09";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/security",
});

const IN_SCOPE = [
  "clipkoala.com and everything served from it",
  "The download, proxy, ZIP, and YouTube API routes",
  "The Chrome and Edge browser extension",
];

const OUT_OF_SCOPE = [
  "The upstream platforms themselves, and the third-party resolvers ClipKoala calls. Report those to their owners.",
  "Reports generated purely by an automated scanner, with no demonstrated impact.",
  "Missing security headers or a weak cipher suite with no exploitable consequence.",
  "Denial of service, traffic floods, and physical or social engineering attacks.",
  "Anything requiring a compromised device or a person to be tricked into a long chain of unlikely actions.",
];

export default function SecurityPage() {
  return (
    <PageShell>
      <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <PageHeader
          crumbs={[{ name: "Security", path: "/security" }]}
          eyebrow="Security"
          title="Reporting a security problem"
          lede="If you have found something, this is where to send it. Reports are welcome, taken seriously, and answered by a person."
        />

        <div className="prose-ck mt-10 space-y-4">
          <h2 className="text-xl font-extrabold text-ink-hi">How to report</h2>
          <p>
            Email{" "}
            <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a> with
            a description of the issue, the steps to reproduce it, and what an
            attacker could actually achieve. Please do not open a public post
            about it before it is fixed.
          </p>
          <p>
            You should get a human reply within a few days. ClipKoala is a small
            project without a bug bounty budget, so there is no payment on
            offer, and saying that up front is more useful than implying
            otherwise. Credit in the{" "}
            <Link href="/changelog">changelog</Link> is offered to anyone who
            wants
            it.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <section className="card p-6" aria-labelledby="in-scope">
            <h2 id="in-scope" className="text-sm font-bold text-ink-hi">
              In scope
            </h2>
            <ul className="mt-3 space-y-2">
              {IN_SCOPE.map((s) => (
                <li key={s} className="flex gap-2 text-sm leading-relaxed text-ink-2">
                  <span className="text-ink-4" aria-hidden>
                    ·
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </section>
          <section className="card p-6" aria-labelledby="out-scope">
            <h2 id="out-scope" className="text-sm font-bold text-ink-hi">
              Out of scope
            </h2>
            <ul className="mt-3 space-y-2">
              {OUT_OF_SCOPE.map((s) => (
                <li key={s} className="flex gap-2 text-sm leading-relaxed text-ink-2">
                  <span className="text-ink-4" aria-hidden>
                    ·
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="prose-ck mt-10 space-y-4">
          <h2 className="text-xl font-extrabold text-ink-hi">
            Please test responsibly
          </h2>
          <p>
            Use your own links and your own data. Do not run automated scans
            that degrade the service for other people, do not attempt to access
            anyone else&apos;s information, and stop as soon as you have
            demonstrated the issue. Testing within those limits is welcome and
            will not be treated as an attack.
          </p>

          <h2 className="text-xl font-extrabold text-ink-hi">
            What the service holds
          </h2>
          <p>
            Worth knowing before you look: ClipKoala has no user accounts, no
            password database, and no stored files. Links are resolved and
            discarded, media streams through and is never written to disk, and
            your history, favourites, and preferences live in your own
            browser&apos;s storage rather than on a server. The most valuable
            thing an attacker could reach here is the service itself, not a
            store of user data, because there is not one.
          </p>
          <p className="text-xs text-ink-4">
            Last reviewed{" "}
            <time dateTime={UPDATED}>
              {new Date(UPDATED).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            . This policy is also published at{" "}
            <a href="/.well-known/security.txt">/.well-known/security.txt</a>.
          </p>
        </div>
      </div>

      <JsonLd
        data={graph(
          webPageSchema({
            path: "/security",
            name: TITLE,
            description: DESCRIPTION,
            dateModified: UPDATED,
          })
        )}
      />
    </PageShell>
  );
}
