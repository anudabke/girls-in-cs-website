# Girls in CS

Open `docs/index.html` in a browser for the local preview. The site uses static HTML, shared CSS and vanilla JavaScript. All site content below is intended for public use. Keep original form responses and private contact details outside the repository.

## GitHub Pages

1. Open or create the public `girls-in-cs-website` GitHub repository. Copy the contents of this folder into its root, including the hidden `.github` directory. Keep `docs`, `scripts`, and `.github` at the top level.
2. Under **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**. Push to `main` or open **Actions → Maintain opportunities and publish Pages → Run workflow**.
3. Check the site from the Pages URL. Test all three Google Forms while signed out. Confirm Formspree targets `girlsincsorg@gmail.com`, then test first-name validation, feedback delivery, and Reply-To from the hosted page.
4. To connect your registered domain, add it in **Settings → Pages → Custom domain**, configure DNS at the registrar, and enable HTTPS. If the repository name differs, update the GitHub Pages path in `docs/404.html`.

## Adding content

- **Opportunities** live in `docs/assets/data/opportunities.json`. Match the existing fields and record the official source and verification date. Use an ISO deadline or `rolling` with an ISO `next_review`. Use a local image or a generated initials image stored as an image data URL. Mark initials covers with `image_placeholder: true`. Use `null` for an unknown date and verify the official application window before adding it to the live catalog.
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

1. Check official program pages for new application windows, early capacity closures, fees, eligibility, dates, and application links. Only add listings when the organizer has announced the current or next cycle. Record the opening date when applications will open later.
2. Update `last_verified` for records you checked. Set a fresh `next_review` for confirmed rolling entries. Leave an unpublished numeric age blank when eligibility is based on school grade or access has no stated age cutoff.
3. Add new listings in `docs/assets/data/opportunities.json` and use local initials covers. Put unverifiable fields at `null` or “Check site” and flag the record for review. The homepage only includes verified dated records in Available Opportunities.
4. Run `python3 scripts/prune-opportunities.py` to refresh local preview data. The nightly action removes expired dated records from the deployed copy and publishes Pages. Rolling records are hidden after their review date until refreshed.

## Opportunity inventory

Audit date: November 21, 2026. The previous inventory had 106 listings. The audit removed 73, retained 33, and added 100. The updated inventory has 133 listings.

| Category | Before additions, after audit | Added | Total |
| --- | ---: | ---: | ---: |
| Summer programs and camps | 0 | 28 | 28 |
| Research and internships | 6 | 24 | 30 |
| Scholarships | 4 | 18 | 22 |
| Competitions | 23 | 25 | 48 |
| Essay competitions | 0 | 5 | 5 |

The inventory has 130 dated listings and 3 rolling listings. 97 of the new listings have dated deadlines. Published standard or late cutoffs include May, June, July, August, and October 2027. No new September or November 2027 cutoff was confirmed. Check listings with multiple rounds for regular pricing and earlier qualifying deadlines. Some announced 2027 applications open later.

New cover images are generated initials in the existing palette, stored as image data in the listing. Older covers use local image files. Regional Science Bowl listings inherited from the previous inventory use the Department of Energy’s latest possible cutoff, three weeks before the posted event. Check each regional page for earlier limits.

### Removed during the audit

- **Naval Postgraduate School: Student Volunteer Program**. Unpaid student volunteering program.
- **GE-Reagan Foundation Scholarship**. Award is centered on general leadership and community service.
- **Creative Youth Awards**. General arts and creative-writing award without a required STEAM focus.
- **SCI Youth Grant Pitch Contest**. Community service and civic project pitch.
- **Equitable Excellence Scholarship**. Award is centered on community leadership and impact.
- **Coolidge Scholarship**. Public policy and civics are central selection criteria.
- **Writers & Books Teen Poetry Contest**. Poetry contest without a STEAM focus.
- **York Regional Police Youth Writing Contest**. Fiction and poetry contest without a STEAM focus.

These courses, curricula, and practice tools had open access without a competitive application or entry.

- CS50x: Introduction to Computer Science
- CS50: Programming with Python
- CS50: Programming with Scratch
- CS50: Databases with SQL
- CS50: Web Programming with Python and JavaScript
- CS50: Introduction to AI with Python
- CS50: Introduction to Cybersecurity
- CS50: Introduction to Programming with R
- CS50: Understanding Technology
- Code.org: Introduction to Game Lab
- Code.org: Turtle Programming in App Lab
- Code.org: Web Lab
- Code.org: Hour of AI
- Raspberry Pi Foundation: Intro to Scratch
- MDN: Learn Web Development
- The Odin Project: Foundations
- Microsoft MakeCode for micro:bit
- Khan Academy: 6th Grade Math
- Khan Academy: 7th Grade Math
- Khan Academy: 8th Grade Math
- Khan Academy: Pre-algebra
- Khan Academy: Algebra I
- Khan Academy: Geometry
- Khan Academy: Algebra II
- Khan Academy: Trigonometry
- Khan Academy: Precalculus
- Khan Academy: High School Statistics
- Khan Academy: Statistics and Probability
- Khan Academy: AP Calculus AB
- Khan Academy: AP Calculus BC
- Khan Academy: AP Statistics
- Khan Academy: Multivariable Calculus
- Khan Academy: Integrated Math I
- Khan Academy: Integrated Math II
- Khan Academy: Integrated Math III
- Khan Academy: Middle School Biology
- Khan Academy: Middle School Earth and Space Science
- Khan Academy: Middle School Physics
- Khan Academy: High School Biology
- Khan Academy: High School Physics
- Khan Academy: AP Biology
- Khan Academy: AP Chemistry
- Khan Academy: AP Environmental Science
- Khan Academy: AP Physics 1
- Khan Academy: U.S. History
- Khan Academy: AP U.S. History
- Khan Academy: U.S. Government and Civics
- Khan Academy: AP U.S. Government and Politics
- Khan Academy: AP Macroeconomics
- Khan Academy: AP Microeconomics
- Khan Academy: Computers and the Internet
- Khan Academy: AP Computer Science Principles
- Khan Academy: Grammar
- Khan Academy: 6th Grade Reading and Vocabulary
- Khan Academy: 7th Grade Reading and Vocabulary
- Khan Academy: 8th Grade Reading and Vocabulary
- Khan Academy: 9th Grade Reading and Vocabulary
- Khan Academy: 10th Grade Reading and Vocabulary
- Raspberry Pi Foundation: Intro to Python
- Raspberry Pi Foundation: More Python
- USACO Training Resources
- Code.org Music Lab
- Code.org Python Lab
- micro:bit Make It: Code It
- Microsoft MakeCode Arcade

### Listings with details to confirm

Each listing below has an official cycle source and a published deadline or rolling window. Confirm missing details such as the amount, timing, eligibility, or location with the organizer.

- [Barcelona International Youth Science Challenge](https://biysc.org/the-application/)
- [Boston University Research in Science & Engineering](https://www.bu.edu/summer/high-school-programs/rise-internship-practicum/how-to-apply/)
- [Cal Poly Engineering Possibilities in College](https://epic.calpoly.edu/epic-summer-2027)
- [Central New Mexico STEM Research Challenge](https://hsc.unm.edu/stem-h/2027-research-challenge-project-materials-guidelines.pdf)
- [Columbia Engineering the Next Generation](https://outreach.engineering.columbia.edu/eng)
- [Columbia Summer High School Academic Program for Engineers](https://outreach.engineering.columbia.edu/shape/apply)
- [Denver Museum of Nature & Science Teen Science Scholars](https://www.dmns.org/about/teen-science-scholars)
- [Emory NextGen High School Internship](https://med.emory.edu/departments/human-genetics/next-gen.html)
- [Florida International University Summer Research Internship](https://case.fiu.edu/opportunities/internships-jobs/summer-research-internship/)
- [Foundation for Geauga Parks Ginn Scholarship](https://www.foundationforgeaugaparks.org/ginn-scholarship)
- [Fred Hutch Summer High School Internship Program](https://www.fredhutch.org/en/education-training/high-school-students/summer-high-school-internship-program.html)
- [GameSalad Video Game Creation Challenge](https://gamesalad.com/education/student-challenge/2027-rules/)
- [Heithoff-Brody High School Summer Scholars](https://www.salk.edu/about/education-outreach/programs/high-school-scholars/faq/)
- [Indiana University Future Scientist Program](https://cancer.iu.edu/education/summer/future-scientist.html)
- [Janelia Loudoun County Summer Internship](https://www.janelia.org/you-janelia/students-and-postdocs-0)
- [Kroto Prize for Innovative Use of Technology in Learning](https://sheffield.ac.uk/kroto/kroto-outreach/prize-innovative-use-technology-learning-2026)
- [Louisville Regional Science & Engineering Fair](https://lrsef.org/for-students/)
- [LSU High School Summer Research Internship](https://lsu.edu/eng/future/summer-camps/hssrprogram.php)
- [Maine School of Science and Mathematics High School STEM Research Program](https://www.mssm.org/summer/summer-stem-2027/high-school-stem-research-program)
- [Massachusetts Region II High School Science & Engineering Fair](https://www.wrsef.net/high-school-fair)
- [MD Anderson High School Summer Program](https://www.mdanderson.org/education-training/research-training/early-career-pathway-programs/summer-research-programs/programs/high-school-summer-program.html)
- [NASA Glenn High School Engineering Institute](https://www.nasa.gov/wp-content/uploads/2026/09/ps-05046-hsengineering-flyer27-508.pdf?emrc=190cd4)
- [NSHSS STEAM Scholarship](https://www.nshss.org/scholarships/s/nshss-steam-scholarship/)
- [OceanICU Youth Competition](https://ocean-icu.eu/wp-content/uploads/2026/09/OceanICUCompetitionToR_final.pdf)
- [OriGen Biomedical STEM Scholarship](https://www.origen.com/origen-biomedical-stem-scholarship)
- [Purdue Seminar for Top Engineering Prospects](https://engineering.purdue.edu/Honors/SeminarforTopEngineeringProspects)
- [Rose-Hulman Operation Catapult](https://rose-hulman.edu/admissions-and-aid/early-planning/operation-catapult/index.html)
- [Roswell Park Summer Research Experience in Cancer](https://www.roswellpark.org/education/high-school-undergrad/high-school-summer-research-program)
- [Science Ambassador Scholarship](https://www.scienceambassadorscholarship.org/)
- [Scripps Translational Institute Student Research Internship](https://www.scripps.edu/science/translational-institute/education-training/student-research-internship-program/)
- [Silicon Valley Engineering Council High School STEM Education Award](https://svec.org/high-school-stem-grant-awards/)
- [Space Foundation National Space Sustainability Competition](https://www.spacefoundation.org/national-space-day-competition/)
- [Stanford CARE Explorers AI x Precision Health](https://asianhealth.stanford.edu/education/stanford-care-explorers-ai-x-precision-health-high-school-program)
- [SWE Santa Clara Valley Incoming Freshman Scholarship](https://www.scvswe.org/scholarship-application)
- [Synopsys Championship Science and Engineering Fair](https://science-fair.org/students-parents/important-dates/)
- [Tufts Engineering Design Lab](https://universitycollege.tufts.edu/pre-college/browse/engineering-design-lab)
- [Tufts Engineering with Artificial Intelligence](https://universitycollege.tufts.edu/pre-college/browse/engineering-artificial-intelligence)
- [UConn SPARK Summer Program](https://vergnano.institute.uconn.edu/programs-opportunities/k-12-programs/spark-summer-program/)
- [University of Colorado STEM Research Experience](https://www.colorado.edu/sciencediscovery/programs/stem-research-experience)
- [UNMC Summer High School Advanced Research Program](https://www.unmc.edu/student-success/pathway-programs/sharp/index.html)
- [Wolfram High School Summer Research Program](https://www.wolframcloud.com/obj/summercamp/WSRP/2027/Application)
- [WTS Central Pennsylvania Colleen Brown Scholarship](https://www.wtsinternational.org/chapters/central-pennsylvania/scholarships)
- [Yale Review of International Studies Essay Prize](https://highschoolessaycomp.org/)

### Considered and left out

- **Canada/USA Mathcamp**. The organizer had not posted a 2027 application deadline.
- **Missouri S&T Summer Program for Aspiring Researchers and Creators**. Two program end dates were shown and the current application cutoff could not be confirmed.
- **NIST Summer High School Internship Program**. The 2027 posting classifies the position as student volunteering.
- **Notre Dame Introduction to Engineering**. The current cycle is announced, but the published cost still refers to 2026 and a firm cutoff could not be confirmed.
- **PROMYS**. The 2027 cycle was announced, but the application page still displayed the 2026 deadline.
- **Regeneron High School Mentorship Program**. The 2027 teacher nomination cutoff had already passed for new applicants.
- **Regeneron Science Talent Search**. The 2027 cycle closed on November 5, 2026. A later cycle was not confirmed.
- **SWE Houston Area Incoming Freshman Scholarships**. The public chapter page did not give a firm current-cycle closing date.
- **Stanford Compression Forum SHTEM Internship**. Closing date and price are tentative.
- **Stanford Institutes of Medicine Summer Research Program**. The organizer gave a closing month without a firm day.
- **Texas A&M Camp SOAR**. The current cycle is announced, but the organizer page gave an opening date without a firm closing date.
- **U.S. Naval Academy Summer STEM**. The 2027 sessions and opening date were listed, but a current-cycle deadline or rolling intake was not confirmed.
- **UC Berkeley embARC**. The page listed 2027 program dates and 2026 admissions cutoffs and fees.
- **WTS Tampa Bay Scholarships**. The current application window closed November 1, 2026.

## Showcase artwork

The showcase includes the [Layover README screenshot](https://github.com/Amayl97/Layover-Web-App) and [DevDucky's extension mascot](https://github.com/clarissa-dev-codes/Time-Tracker-Status-Bar-Extension). The remaining 14 projects use locally generated cover art until cleared project images are available.
