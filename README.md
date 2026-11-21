# Girls in CS

Open `docs/index.html` in a browser for the local preview. The site uses static HTML, shared CSS and vanilla JavaScript. All site content below is intended for public use. Keep original form responses and private contact details outside the repository.

## GitHub Pages

1. Open or create the public `girls-in-cs-website` GitHub repository. Copy the contents of this folder into its root, including the hidden `.github` directory. Keep `docs`, `scripts`, and `.github` at the top level.
2. Under **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**. Push to `main` or open **Actions → Maintain opportunities and publish Pages → Run workflow**.
3. Check the site from the Pages URL. Test all three Google Forms while signed out. Confirm Formspree targets `girlsincsorg@gmail.com`, then test first-name validation, feedback delivery, and Reply-To from the hosted page.
4. To connect your registered domain, add it in **Settings → Pages → Custom domain**, configure DNS at the registrar, and enable HTTPS. If the repository name differs, update the GitHub Pages path in `docs/404.html`.

## Adding content

- **Opportunities** live in `docs/assets/data/opportunities.json`. Match the existing fields and record the official source and verification date. Use an ISO deadline or `rolling` with an ISO `next_review`. Store an approved image in `docs/assets/opportunities/` and mark initials covers with `image_placeholder: true`. Use `null` for an unknown date and verify the official application window before adding it to the live catalog.
- **Interviews** need one folder under `docs/assets/interviews/` with slides named `1.webp`, `2.webp`, and so on. Add the folder name, display name, description, and slide count to `interviews.json`.
- **Projects** live in `projects.json` in the same data directory. Add a public display name, description, category, stack, audience if supplied, authorized links, and a local cover. The optional `image` and `image_alt` fields display the actual screenshot or artwork in the dialog. Review consent before adding submissions.
- Refresh the local double-click preview after data changes by running `python3 scripts/prune-opportunities.py`. On the hosted website, the JSON files are read directly.

## Instagram feed

1. In [Behold](https://behold.so/docs/getting-started/), connect the Instagram account for @girls.in.cs and create a User Feed with **JSON** output. Copy the public JSON feed URL. No credentials belong in the site code.
2. Set `INSTAGRAM_FEED_URL` near the top of `docs/assets/site.js`. The carousel requests up to 12 of the newest posts per page load, subject to the feed’s configured post limit. [Behold JSON feed documentation](https://behold.so/docs/json-feeds/)
3. If the feed is unavailable or empty, the carousel uses `docs/assets/data/posts.json`. It contains eight optimized local thumbnails. Use records with `image` (for example `assets/posts/post-1.webp`), `caption`, `postUrl` (an Instagram post permalink or `null`), `isCarousel`, and optionally `isVideo`. The supplied thumbnails are in `docs/assets/posts/`. Run `python3 scripts/prune-opportunities.py` after editing the JSON to refresh the double-click preview. With no tiles available, the section shows the profile link.

## Expiry and renewal

On Home and Opportunities, the browser keeps dated entries through the end of their deadline day in the visitor’s local date. Rolling entries are hidden after `next_review` unless re-verified. Confirm timezone-sensitive application cutoffs on the organizer’s site. The scheduled workflow prunes expired dated entries from the hosted build and publishes it. The repository data stays available for manual maintenance.

## Monthly update

1. Check official program pages for new application windows, early capacity closures, fees, eligibility, dates, and application links. Only add dated listings once their published cycle is open.
2. Update `last_verified` for records you checked. Set a fresh `next_review` for confirmed rolling entries. Leave an unpublished numeric age blank when eligibility is based on school grade or access has no stated age cutoff.
3. Add new listings in `docs/assets/data/opportunities.json` and use local initials covers. Put unverifiable fields at `null` or “Check site” and flag the record for review. Pages only include verified dated records in Due soon.
4. Run `python3 scripts/prune-opportunities.py` to refresh local preview data. The nightly action removes expired dated records from the deployed copy and publishes Pages. Rolling records are hidden after their review date until refreshed.

## Opportunity inventory

106 entries, including 41 dated opportunities. All covers are locally generated. Regional Science Bowl entries use the Department of Energy’s program-wide latest possible cutoff of three weeks before the posted event. Earlier regional deadlines and capacity limits can apply. Dated deadlines found for this release run from November 2026 through June 2027.

- [Naval Postgraduate School: Student Volunteer Program](https://nps.edu/web/stem/high-school) · 2026-11-24
- [Naval Science and Engineering Apprenticeship Program](https://nps.edu/web/stem/high-school) · 2026-11-30
- [Research Science Institute](https://www.cee.org/newsevents/press-releases/applications-being-accepted-2027-research-science-institute) · 2026-12-11
- [Research Science Initiative India](https://www.cee.org/RSI_India) · 2026-12-14
- [American Computer Science League](https://sites.google.com/acsl.org/active/Registration) · 2026-12-31
- [Technovation Girls](https://technovationchallenge.org/get-started/) · 2027-03-11
- [CS50x: Introduction to Computer Science](https://cs50.harvard.edu/technology/courses/) · rolling
- [CS50: Programming with Python](https://cs50.harvard.edu/technology/courses/) · rolling
- [CS50: Programming with Scratch](https://cs50.harvard.edu/technology/courses/) · rolling
- [CS50: Databases with SQL](https://cs50.harvard.edu/technology/courses/) · rolling
- [CS50: Web Programming with Python and JavaScript](https://cs50.harvard.edu/technology/courses/) · rolling
- [CS50: Introduction to AI with Python](https://cs50.harvard.edu/technology/courses/) · rolling
- [CS50: Introduction to Cybersecurity](https://cs50.harvard.edu/technology/courses/) · rolling
- [CS50: Introduction to Programming with R](https://cs50.harvard.edu/technology/courses/) · rolling
- [CS50: Understanding Technology](https://cs50.harvard.edu/technology/courses/) · rolling
- [Code.org: Introduction to Game Lab](https://code.org/en-US/students/middle-and-high-school) · rolling
- [Code.org: Turtle Programming in App Lab](https://code.org/en-US/students/middle-and-high-school) · rolling
- [Code.org: Web Lab](https://code.org/en-US/students/middle-and-high-school) · rolling
- [Code.org: Hour of AI](https://code.org/en-US/students/middle-and-high-school) · rolling
- [Raspberry Pi Foundation: Intro to Scratch](https://projects.raspberrypi.org/en/pathways/scratch-intro) · rolling
- [MDN: Learn Web Development](https://developer.mozilla.org/en-US/docs/Learn_web_development) · rolling
- [The Odin Project: Foundations](https://www.theodinproject.com/paths/foundations/courses/foundations) · rolling
- [Microsoft MakeCode for micro:bit](https://www.microbit.org/get-started/user-guide/microsoft-makecode/) · rolling
- [University of Arizona KEYS Research Internship](https://keys.arizona.edu/information/future-students) · 2026-12-17
- [GE-Reagan Foundation Scholarship](https://www.reaganfoundation.org/education/ge-reagan-foundation-scholarship) · 2027-01-07
- [Creative Youth Awards](https://www.creativeyouthawards.org/submit) · 2026-12-08
- [SCI Youth Grant Pitch Contest](https://socialcapitalinc.org/applications-open-2027-sci-youth-grant-pitch-contest/) · 2026-11-25
- [Rockefeller Summer Science Research Program](https://www.rockefeller.edu/outreach/ssrp/faqs/) · 2027-01-04
- [Rockefeller Jumpstart](https://www.rockefeller.edu/outreach/lab-jumpstart/) · 2027-01-04
- [AMC 8](https://maa.org/amcreg/) · 2027-01-05
- [Blue Planet Awareness Contest](https://bowseat.org/programs/blue-planet-awareness-contest/contest-overview/) · 2027-06-07
- [NASA Dream with Us Engineering Challenge](https://www.nasa.gov/directorates/armd/dream-with-us-high-school-design-challenge/) · 2026-12-08
- [Equitable Excellence Scholarship](https://scholarshipamerica.org/scholarship/equitableexcellence/) · 2026-12-22
- [Amazon Future Engineer Scholarship](https://scholarshipamerica.org/scholarship/amazonfutureengineer/) · 2027-01-05
- [Elks Legacy Awards](https://www.elks.org/scholars/scholarweb/legacy/rules.cfm) · 2027-02-01
- [Coolidge Scholarship](https://coolidgescholars.org/selection-timeline/) · 2026-12-01
- [Burger King Scholars](https://scholarshipamerica.org/scholarship/burger-king-scholars-program/) · 2026-12-15
- [Carl C. Yount Charitable Scholarship](https://scholarshipamerica.org/scholarship/yount/) · 2027-01-20
- [National Science Bowl: Nationwide High School Regional](https://science.osti.gov/wdts/nsb/Regional-Competitions/High-School-Regionals/Nationwide-High-School-Regional-Science-Bowl) · 2027-02-06
- [National Science Bowl: Nationwide Middle School Regional](https://science.osti.gov/wdts/nsb/Regional-Competitions/Middle-School-Regionals/Nationwide-Middle-School-Regional-Science-Bowl) · 2027-01-23
- [National Science Bowl: Sandia California High School Regional](https://science.osti.gov/wdts/nsb/Regional-Competitions/High-School-Regionals/California/CA_Sandia-National-Laboratories-High-School-Regional-Science-Bowl) · 2027-01-02
- [National Science Bowl: FarNorCal High School Regional](https://science.osti.gov/wdts/nsb/Regional-Competitions/High-School-Regionals/California/CA_FarNorCal-High-School-Regional-Science-Bowl) · 2027-01-16
- [National Science Bowl: California Central Valley High School Regional](https://science.osti.gov/wdts/nsb/Regional-Competitions/High-School-Regionals/California/CA_California-Central-Valley-High-School-Regional-Science-Bowl) · 2027-02-06
- [National Science Bowl: LADWP High School Regional](https://science.osti.gov/wdts/nsb/Regional-Competitions/High-School-Regionals/California/CA_LADWP-High-School-Regional-Science-Bowl) · 2027-01-30
- [National Science Bowl: South Florida High School Regional](https://science.osti.gov/wdts/nsb/Regional-Competitions/High-School-Regionals/Florida/FL_South-Florida-High-School-Regional-Science-Bowl) · 2027-02-06
- [National Science Bowl: Maricopa Institute of Technology High School Regional](https://science.osti.gov/wdts/nsb/Regional-Competitions/High-School-Regionals/AZ_Maricopa-Institute-of-Technology-High-School-Regional-Science-Bowl) · 2027-01-16
- [National Science Bowl: Arkansas High School Regional](https://science.osti.gov/wdts/nsb/Regional-Competitions/High-School-Regionals/AR_Arkansas-High-School-Regional-Science-Bowl) · 2027-02-06
- [National Science Bowl: Colorado High School Regional](https://science.osti.gov/wdts/nsb/Regional-Competitions/High-School-Regionals/CO_Colorado-High-School-Regional-Science-Bowl) · 2027-01-30
- [National Science Bowl: Connecticut High School Regional](https://science.osti.gov/wdts/nsb/Regional-Competitions/High-School-Regionals/CT_Connecticut-High-School-Regional-Science-Bowl) · 2027-02-06
- [National Science Bowl: Maryland/DC High School Regional](https://science.osti.gov/wdts/nsb/Regional-Competitions/High-School-Regionals/MD_DC_Maryland-DC-Regional-High-School-Science-Bowl) · 2027-01-02
- [National Science Bowl: Iowa High School Regional](https://science.osti.gov/wdts/nsb/Regional-Competitions/High-School-Regionals/IA_Iowa-High-School-Regional-Science-Bowl) · 2027-02-13
- [National Science Bowl: Savannah River High School Regional](https://science.osti.gov/wdts/nsb/Regional-Competitions/High-School-Regionals/SC_DOE-Savannah-River-Regional-Science-Bowl) · 2027-01-30
- [National Science Bowl: Georgia High School Subregionals](https://science.osti.gov/wdts/nsb/Regional-Competitions/High-School-Regionals/Georgia/GA_Georgia-High-School-Regional-Science-Bowl) · 2027-01-16
- [Toshiba/NSTA ExploraVision](https://www.exploravision.org/rules-requirements/) · 2027-01-27
- [Writers & Books Teen Poetry Contest](https://writersandbooks.org/product/2027-teen-poetry-contest/) · 2026-12-01
- [York Regional Police Youth Writing Contest](https://www.yrp.ca/explore/community-engagement-programs/2027-yrp-youth-writing-contest) · 2026-12-31
- [Math Kangaroo USA](https://mathkangaroo.org/mks/resources/how-to-start-math-kangaroo-center/) · 2026-12-31
- [Khan Academy: 6th Grade Math](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: 7th Grade Math](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: 8th Grade Math](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: Pre-algebra](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: Algebra I](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: Geometry](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: Algebra II](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: Trigonometry](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: Precalculus](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: High School Statistics](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: Statistics and Probability](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: AP Calculus AB](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: AP Calculus BC](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: AP Statistics](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: Multivariable Calculus](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: Integrated Math I](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: Integrated Math II](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: Integrated Math III](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: Middle School Biology](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: Middle School Earth and Space Science](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: Middle School Physics](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: High School Biology](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: High School Physics](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: AP Biology](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: AP Chemistry](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: AP Environmental Science](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: AP Physics 1](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: U.S. History](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: AP U.S. History](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: U.S. Government and Civics](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: AP U.S. Government and Politics](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: AP Macroeconomics](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: AP Microeconomics](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: Computers and the Internet](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: AP Computer Science Principles](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: Grammar](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: 6th Grade Reading and Vocabulary](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: 7th Grade Reading and Vocabulary](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: 8th Grade Reading and Vocabulary](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: 9th Grade Reading and Vocabulary](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Khan Academy: 10th Grade Reading and Vocabulary](https://support.khanacademy.org/hc/en-us/articles/360014675332-Which-Khan-Academy-courses-have-Mastery-enabled) · rolling
- [Raspberry Pi Foundation: Intro to Python](https://projects.raspberrypi.org/en/pathways/python-intro) · rolling
- [Raspberry Pi Foundation: More Python](https://projects.raspberrypi.org/en/pathways/more-python) · rolling
- [USACO Training Resources](https://usaco.org/index.php?page=training) · rolling
- [Code.org Music Lab](https://code.org/en-US/tools) · rolling
- [Code.org Python Lab](https://code.org/en-US/tools) · rolling
- [micro:bit Make It: Code It](https://microbit.org/projects/make-it-code-it/) · rolling
- [Microsoft MakeCode Arcade](https://arcade.makecode.com/) · rolling
- [TSA TEAMS State Competition](https://tsaweb.org/teams/state-competition-2026) · 2027-01-08

## Showcase artwork

The showcase includes the [Layover README screenshot](https://github.com/Amayl97/Layover-Web-App) and [DevDucky's extension mascot](https://github.com/clarissa-dev-codes/Time-Tracker-Status-Bar-Extension). The remaining 14 projects use locally generated cover art until cleared project images are available.
