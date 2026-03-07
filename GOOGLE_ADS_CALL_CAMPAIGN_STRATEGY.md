# Google Ads Call Campaign Strategy - O2 Helpdesk UK
## Target: £0.40 - £0.80 Per Valued Inbound Call

---

## SETUP INSTRUCTIONS (DO THIS FIRST)

### 1. Replace Tracking IDs
In ALL HTML files, replace these placeholders with your real Google Ads values:
- `AW-17998623481` → Your Google Ads Conversion ID (e.g., `AW-123456789`)
- `CoR0CO_x_oMcEPnltIZD` → Your call conversion label (e.g., `AbCdEfGhIj`)

To get these values:
1. Go to Google Ads → Tools → Conversions
2. Click "+ New conversion action" → Phone calls → "Calls from your website"
3. Set call length threshold to **60 seconds** (filters out accidental taps)
4. Copy the Conversion ID and Conversion Label
5. Do a find-and-replace across all HTML files

### 2. Final URL = Homepage
Your Google Ads Final URL is: `https://02helpdesk.co.uk/`
- Homepage has prominent phone CTA in hero section
- Phone number in header, hero, and throughout page
- Fast loading, mobile-first, strong call-to-action
- Use the homepage as the Final URL for ALL call campaigns
- Additional landing page available at `/call.html` for A/B testing if needed

---

## CAMPAIGN STRUCTURE FOR £0.40-£0.80 PER CALL

### Campaign 1: Call-Only Ads (HIGHEST PRIORITY)
**Campaign type:** Search → Call-only ads
**Daily budget:** £5-£10 to start

**Why call-only ads?**
- No landing page click needed (direct call from SERP)
- Lower cost per conversion than click-to-call
- Google charges per call, not per click
- Set minimum call duration = 60 seconds to avoid paying for wrong numbers

**Settings:**
- Networks: Search only (NO display, NO partners)
- Locations: United Kingdom only
- Language: English
- Bid strategy: Manual CPC (start low, optimise later)
- Starting max CPC bid: £0.30-£0.50
- Ad scheduling: Mon-Sun, 8am-8pm only (when you can answer)
- Device bid adjustment: Mobile +50% (most calls come from mobile)

**Ad Groups & Keywords:**

#### Ad Group 1: O2 Help (High Intent)
Keywords (all phrase/exact match):
```
[o2 helpdesk phone number]
[o2 customer service number]
[call o2 helpdesk]
[o2 support phone number]
[speak to o2 advisor]
[o2 helpdesk contact number]
"o2 helpdesk number"
"call o2 support"
"o2 customer service contact"
```
Max CPC: £0.40

#### Ad Group 2: O2 Billing Help
Keywords:
```
[o2 billing helpline]
[o2 bill query phone number]
[o2 billing dispute contact]
[o2 overcharged who to call]
"o2 billing help number"
"o2 bill problems phone"
"query o2 bill"
```
Max CPC: £0.35

#### Ad Group 3: O2 Technical Support
Keywords:
```
[o2 technical support number]
[o2 signal problems help]
[o2 mobile data not working help]
[o2 phone setup help]
"o2 technical help phone"
"o2 network issues contact"
```
Max CPC: £0.35

#### Ad Group 4: O2 Upgrade Help
Keywords:
```
[o2 upgrade advice phone]
[o2 upgrade helpline]
[help with o2 upgrade]
"o2 upgrade advice number"
"o2 upgrade options help"
```
Max CPC: £0.30

### Campaign 2: Search Ads with Call Extension
**Campaign type:** Search → Text ads with call extensions
**Daily budget:** £5-£10
**Final URL:** https://02helpdesk.co.uk/

**Call extension settings:**
- Show phone number: 01202 925102
- Count calls as conversions: Yes
- Minimum call length: 60 seconds
- Show during: Business hours only

**Keywords:** Same as above but broader match types to capture more volume at low CPC.

---

## NEGATIVE KEYWORDS (CRITICAL FOR LOW COST)

Add these immediately to prevent wasted spend:

```
-o2 login
-o2 my account
-o2 store
-o2 shop
-o2 buy phone
-o2 contract
-o2 sim only deals
-o2 iphone
-o2 samsung
-o2 pay monthly
-o2 pay as you go
-o2 jobs
-o2 careers
-o2 broadband
-o2 wifi
-o2 priority
-o2 arena
-free
-download
-app
-o2 switch
-o2 address
-o2 opening hours
-o2 near me
-o2 store locator
-complaint
-ombudsman
-ofcom
```

---

## AD COPY TEMPLATES

### Call-Only Ad 1 (Billing Focus)
```
Headline 1: O2 Billing Help - Call Now
Headline 2: Speak to an Advisor Today
Description: Having trouble with your O2 bill? Our independent advisors resolve billing disputes, overcharges & direct debit issues. Call now.
Phone: 01202 925102
```

### Call-Only Ad 2 (General Support)
```
Headline 1: O2 Helpdesk - Real People
Headline 2: No Hold Time, No Robots
Description: Independent O2 support. Get expert help with billing, signal issues, upgrades & account queries. Fast, friendly service.
Phone: 01202 925102
```

### Call-Only Ad 3 (Technical)
```
Headline 1: O2 Signal & Data Issues?
Headline 2: Expert Technical Help
Description: O2 mobile data not working? Signal problems? Our trained advisors troubleshoot and fix your O2 issues over the phone.
Phone: 01202 925102
```

### Call-Only Ad 4 (Upgrade)
```
Headline 1: O2 Upgrade Advice
Headline 2: Impartial Expert Guidance
Description: Confused about O2 upgrade options? Get independent advice on the best phone and plan for your needs. No sales pressure.
Phone: 01202 925102
```

---

## HOW TO ACHIEVE £0.40-£0.80 PER CALL

### 1. Quality Score Optimisation (Target: 8-10/10)
Your landing page (`call.html`) is already built for this:
- **Relevance:** Keywords match ad copy match landing page content
- **Experience:** Mobile-first, fast-loading, clear CTA, no pop-ups
- **Expected CTR:** Call-only ads naturally have high CTR

### 2. Bid Strategy
- **Start with Manual CPC** at £0.30-£0.50 per click
- After 50+ conversions, switch to **Target CPA** at £0.80
- Google will then automatically bid to hit your target cost per call
- Gradually lower Target CPA to £0.60 then £0.40 as data builds

### 3. Schedule & Location Targeting
- **Hours:** Only show ads when you can answer (e.g., 8am-8pm)
- **Days:** If weekdays convert better, reduce weekend bids
- **Location:** Start with Dorset/South England, expand to UK-wide if costs stay low

### 4. Call Duration Filter
- Set minimum call duration to **60 seconds**
- This ensures you only pay for genuine enquiries, not accidental taps
- A 60-second call = a real conversation = a valued call

### 5. Long-Tail Keywords (Your Secret Weapon)
Low-competition, high-intent phrases like:
```
[help with o2 direct debit problem]
[o2 roaming charges help phone]
[how to reduce o2 bill speak to someone]
[o2 upgrade eligibility check help]
[o2 network coverage issues in my area help]
```
These get very few searches but cost pennies per click and convert at high rates.

### 6. Ad Scheduling Bid Adjustments
After 2 weeks of data:
- Identify which hours/days get cheapest calls
- Increase bids +20% during cheap high-converting hours
- Decrease bids -30% during expensive low-converting hours

---

## WEEKLY OPTIMISATION CHECKLIST

- [ ] Review Search Terms Report - add irrelevant terms as negatives
- [ ] Check Cost Per Call - adjust bids if over £0.80
- [ ] Review call duration - calls under 30s may indicate poor quality keywords
- [ ] Check Quality Score - fix any keywords below 7/10
- [ ] Add new long-tail keywords from Search Terms Report
- [ ] Pause keywords with high cost and no conversions after 20+ clicks
- [ ] A/B test ad copy (run 2 ads per ad group, pause lower performer)

---

## EXPECTED RESULTS

| Metric | Month 1 | Month 2 | Month 3+ |
|--------|---------|---------|----------|
| Daily Budget | £5-10 | £10-15 | £15-20 |
| Avg CPC | £0.40-0.60 | £0.30-0.50 | £0.25-0.45 |
| Calls/Day | 8-15 | 15-25 | 25-40 |
| Cost/Call | £0.60-0.80 | £0.40-0.70 | £0.35-0.60 |
| Call Quality | 60-70% valued | 70-80% valued | 80%+ valued |

**Key:** "Valued call" = 60+ seconds, genuine O2 help enquiry

---

## TRACKING & MEASUREMENT

### Already Implemented on Your Site:
1. **gtag.js** loaded on ALL pages (25+ pages)
2. **Call click tracking** fires conversion event on every tel: link click
3. **Dedicated landing page** (`call.html`) for paid traffic

### After You Get Your Google Ads ID:
1. Replace `AW-17998623481` in all HTML files with your real ID
2. Replace `CoR0CO_x_oMcEPnltIZD` with your real call conversion label
3. Link Google Ads to Google Analytics for full funnel visibility
4. Enable call reporting in Google Ads to see call duration data

### Quick Replace Command:
```bash
# Replace with your actual IDs (run from project root)
find . -name "*.html" -exec sed -i 's/AW-17998623481/AW-YOUR-REAL-ID/g' {} +
find . -name "*.html" -exec sed -i 's/CoR0CO_x_oMcEPnltIZD/YOUR-REAL-LABEL/g' {} +
```

---

## IMPORTANT NOTES

1. **Independent service disclaimer** is on all pages - required for Google Ads compliance
2. **Cookie consent** is GDPR-compliant on all pages - required for UK advertising
3. **Landing page** is noindexed - keeps paid traffic separate from organic metrics
4. **Phone number** (01202 925102) is consistent across all pages
5. **Call conversion tracking** only counts clicks on tel: links, ensuring accurate data
