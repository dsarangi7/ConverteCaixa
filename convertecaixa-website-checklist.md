# ConverteCaixa — Website Build and Launch Checklist

Use this as the master checklist for the Portuguese and English text-conversion platform.

## 1. Strategy and structure

- [ ] Confirm primary domain: `convertecaixa.com`
- [ ] Define the brand presentation: **ConverteCaixa** in Portuguese and **Case Converter by ConverteCaixa** in English
- [ ] Define language structure:
  - [ ] `/pt/` for Portuguese
  - [ ] `/en/` for English
- [ ] Define the first tool URLs:
  - [ ] `/pt/converter-maiusculas-minusculas/`
  - [ ] `/en/case-converter/`
  - [ ] `/en/uppercase-to-lowercase/`
  - [ ] `/en/sentence-case-converter/`
  - [ ] `/en/title-case-converter/`
- [ ] Prepare competitor references: Invertexto, 4Devs, ConvertCase.net, CaseConverter.com and CaseConverter.cc
- [ ] Document features we will improve rather than reproduce

## 2. Brand assets

- [ ] Create the logo using [LogoFast](https://logofa.st/) or another suitable design tool
- [ ] Create a simplified logo mark for small sizes
- [ ] Export SVG and transparent PNG versions
- [ ] Generate a complete favicon package using a dedicated favicon generator
- [ ] Add `favicon.ico`, SVG favicon, Apple touch icon and web-app icons
- [ ] Define brand colors, typography, spacing and button styles
- [ ] Check logo and favicon visibility in light and dark browser themes

## 3. Core converter product

- [ ] Build a large, accessible text-input area
- [ ] Add Sentence case
- [ ] Add lowercase
- [ ] Add UPPERCASE
- [ ] Add Capitalized Case
- [ ] Add Title Case
- [ ] Add Inverse Case
- [ ] Add Alternating Case
- [ ] Preserve paragraphs and line breaks
- [ ] Preserve URLs and email addresses where relevant
- [ ] Handle Portuguese diacritics correctly
- [ ] Support Unicode characters
- [ ] Add copy-to-clipboard
- [ ] Add clear/reset
- [ ] Add undo and redo
- [ ] Add TXT download
- [ ] Add word, character, sentence and line counts
- [ ] Add original-versus-converted comparison
- [ ] Save drafts locally in the browser
- [ ] Process ordinary text locally without sending it to a server
- [ ] Add a visible privacy statement near the tool
- [ ] Test empty input, very long text, punctuation, acronyms, URLs, emails and multilingual text

## 4. User experience and accessibility

- [ ] Make every page mobile responsive
- [ ] Test common mobile, tablet and desktop widths
- [ ] Keep the converter visible before advertisements
- [ ] Use readable button labels rather than unexplained icons
- [ ] Provide keyboard navigation and visible focus states
- [ ] Associate labels with form controls
- [ ] Maintain sufficient color contrast
- [ ] Add helpful success feedback after copying text
- [ ] Avoid layout shifts when ads or fonts load
- [ ] Test with keyboard-only navigation
- [ ] Test with a screen reader
- [ ] Ensure important functionality works without account creation

## 5. Portuguese SEO page

- [ ] Target `converter maiúsculas e minúsculas` as the primary keyword
- [ ] Incorporate accented and unaccented variations naturally
- [ ] Include related phrases without keyword stuffing
- [ ] Write original, genuinely useful Portuguese guidance around the tool
- [ ] Explain each conversion mode with examples
- [ ] Add concise instructions above or immediately below the converter
- [ ] Add an FAQ based on real search questions
- [ ] Link to related Portuguese tools and guides
- [ ] Write a unique page title and meta description
- [ ] Use one clear H1 and logical H2/H3 headings

## 6. English SEO pages

- [ ] Make `/en/case-converter/` the flagship English page
- [ ] Target `case converter`, `case convert`, `case converter online`, `convert case online` and `caps converter` on the flagship page
- [ ] Target `upper case to lower case` on its dedicated functional page
- [ ] Use original English writing and examples rather than literal translation
- [ ] Add Word, Excel and Google Sheets guides only when they satisfy distinct intent
- [ ] Avoid separate thin pages for synonymous phrases
- [ ] Use internal links from supporting pages to the flagship converter
- [ ] Add US-oriented capitalization examples where appropriate
- [ ] Explain APA, AP, MLA and Chicago title rules on relevant pages

## 7. International SEO

- [ ] Give every language version a separate URL
- [ ] Add a visible PT/EN language selector
- [ ] Add reciprocal `hreflang` annotations
- [ ] Use `pt-BR` for Brazilian Portuguese
- [ ] Use `en` for general international English
- [ ] Add `x-default` where appropriate
- [ ] Add a self-referencing canonical to every indexable page
- [ ] Keep each page's navigation and main content in one language
- [ ] Do not automatically redirect visitors based on IP address
- [ ] Include language alternates in the XML sitemap if supported

## 8. On-page and structured SEO

- [ ] Create a unique title and meta description for every indexable page
- [ ] Use descriptive, readable URL slugs
- [ ] Add canonical tags
- [ ] Add Open Graph and social-sharing metadata
- [ ] Add appropriate structured data only when the visible content qualifies
- [ ] Add `WebSite` and `Organization` identity markup where valid
- [ ] Add breadcrumb markup only when breadcrumbs are visible
- [ ] Do not assume FAQ markup will create a Google rich result
- [ ] Add descriptive internal-link anchor text
- [ ] Check that every important page is reachable through normal links
- [ ] Add image dimensions and meaningful alternative text where applicable

## 9. Content quality

- [ ] Write enough content to solve the user's problem; do not use 600 words as a mandatory target
- [ ] Keep the working converter as the primary page content
- [ ] Include real examples and edge cases
- [ ] Explain limitations honestly
- [ ] Remove filler and repeated keyword paragraphs
- [ ] Review every translated or AI-assisted page manually
- [ ] Add an author/editor or company responsibility statement where useful
- [ ] Set a review date for instructional articles
- [ ] Avoid mass-producing thin pages

## 10. Trust and legal pages

- [ ] About Us
- [ ] Contact Us with a working contact method
- [ ] Privacy Policy
- [ ] Terms and Conditions
- [ ] Cookie Policy if non-essential cookies or advertising require it
- [ ] Disclaimer where appropriate
- [ ] Explain analytics and advertising data use accurately
- [ ] Add consent management appropriate to the visitor's jurisdiction
- [ ] Include links to legal and contact pages in the footer
- [ ] Use a domain-based contact email

## 11. Technical SEO

- [ ] Create `robots.txt`
- [ ] Reference the sitemap in `robots.txt`
- [ ] Create `sitemap.xml` or a sitemap index
- [ ] Include only canonical, indexable URLs in the sitemap
- [ ] Exclude staging, duplicate, search-result and error pages from indexing
- [ ] Add useful custom 404 and 500 pages
- [ ] Ensure error pages return the correct HTTP status codes
- [ ] Eliminate broken internal links
- [ ] Eliminate redirect chains
- [ ] Enforce one HTTPS and hostname version
- [ ] Redirect HTTP to HTTPS
- [ ] Redirect non-preferred hostnames to the canonical hostname
- [ ] Verify that important content is present in rendered HTML
- [ ] Test titles, canonicals and `hreflang` in production

## 12. Performance

- [ ] Optimize for Core Web Vitals
- [ ] Minify production CSS and JavaScript
- [ ] Remove unused JavaScript
- [ ] Compress and appropriately size images
- [ ] Use modern image formats where helpful
- [ ] Preload only critical assets
- [ ] Avoid render-blocking third-party scripts
- [ ] Load analytics and advertising without breaking the converter
- [ ] Cache static assets appropriately
- [ ] Test with PageSpeed Insights on mobile and desktop
- [ ] Test on a slower mobile connection

## 13. Security and Cloudflare

- [ ] Add a production `_headers` file for Cloudflare Pages where applicable
- [ ] Configure Content Security Policy carefully
- [ ] Add `X-Content-Type-Options: nosniff`
- [ ] Add a suitable `Referrer-Policy`
- [ ] Add a suitable `Permissions-Policy`
- [ ] Configure HSTS only after HTTPS is confirmed across the production domain
- [ ] Protect forms against spam and abuse
- [ ] Keep dependencies updated
- [ ] Disable the public `workers.dev` route after the custom `.com` domain works, when using Workers
- [ ] Confirm that Cloudflare caching does not cache incorrect language or error responses
- [ ] Verify DNS, SSL and canonical redirects

## 14. Analytics and Search Console

- [ ] Create Google Analytics 4 property
- [ ] Add analytics using the production measurement ID
- [ ] Respect consent requirements before loading non-essential tracking
- [ ] Track converter-use events without capturing users' pasted text
- [ ] Track conversion-mode clicks, copy, download and language switching
- [ ] Exclude internal and test traffic where practical
- [ ] Verify `convertecaixa.com` in Google Search Console
- [ ] Submit the sitemap
- [ ] Inspect all launch URLs
- [ ] Monitor indexing, Core Web Vitals and manual actions
- [ ] Connect Bing Webmaster Tools
- [ ] Record baseline rankings and impressions

## 15. AdSense readiness

- [ ] Launch substantial working tools before applying
- [ ] Ensure legal, About and Contact pages are complete
- [ ] Ensure navigation is clear and functional
- [ ] Remove placeholder and duplicate content
- [ ] Add `ads.txt` after receiving the correct publisher record
- [ ] Do not place ads where they can be mistaken for converter controls
- [ ] Avoid intrusive ads above or inside the main workflow
- [ ] Reserve ad dimensions to prevent layout shift
- [ ] Measure revenue by country and page type
- [ ] Protect user experience and Core Web Vitals while testing ads

## 16. Quality assurance before launch

- [ ] Test all converter modes against documented cases
- [ ] Test Portuguese accents and English punctuation
- [ ] Test Chrome, Edge, Firefox and Safari
- [ ] Test Android and iOS browsers
- [ ] Test copying and downloads
- [ ] Test analytics events without exposing entered text
- [ ] Test canonical and `hreflang` relationships
- [ ] Validate sitemap and robots directives
- [ ] Crawl the site for broken links and missing metadata
- [ ] Check every legal and navigation link
- [ ] Confirm 404 and 500 status behavior
- [ ] Run accessibility checks
- [ ] Run mobile and desktop performance tests
- [ ] Back up the final source and configuration

## 17. Launch and growth

- [ ] Launch the Portuguese flagship page
- [ ] Launch the English flagship page
- [ ] Submit production URLs for indexing
- [ ] Publish the first genuinely distinct supporting tools
- [ ] Publish high-quality Word, Excel and Google Sheets guides
- [ ] Seek links from writing, education, productivity and developer resources
- [ ] Monitor queries weekly in Search Console
- [ ] Improve pages receiving impressions but weak click-through rates
- [ ] Improve pages ranking between positions 4 and 20
- [ ] Add new pages only after validating distinct search intent
- [ ] Compare traffic and rankings against Invertexto, 4Devs, ConvertCase.net, CaseConverter.com and CaseConverter.cc monthly
- [ ] Review ad placement and revenue only after sufficient traffic exists

## Launch gate

Do not launch until all critical product, indexing, legal, analytics, mobile, performance and security checks above are complete. Post-launch content and backlink items may remain in progress.
