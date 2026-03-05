# 🔧 GitHub Pages Setup Guide

## Step-by-Step Instructions

### Step 1: Make Repository Public (If Private)

1. Go to: https://github.com/MATRIXX47/o2-helpdesk
2. Click **Settings** tab
3. Scroll down to **Danger Zone**
4. Click **Change visibility**
5. Select **Make public**
6. Type repository name to confirm
7. Click **I understand, make this repository public**

---

### Step 2: Enable GitHub Pages

1. Go to: https://github.com/MATRIXX47/o2-helpdesk/settings/pages
2. Under **Source**, select: **GitHub Actions**
3. This will use the workflow file I created: `.github/workflows/pages.yml`
4. Click **Save**

**OR** (Alternative method):

1. Under **Source**, select: **Deploy from a branch**
2. Select branch: **main**
3. Select folder: **/(root)**
4. Click **Save**

---

### Step 3: Add Custom Domain

1. On the same Pages settings page
2. Under **Custom domain**, enter: `o2helpdesk.co.uk`
3. Click **Save**
4. Wait for DNS check (may take a few minutes)
5. Once DNS is detected, check **Enforce HTTPS**

---

### Step 4: Verify Deployment

1. Go to: https://github.com/MATRIXX47/o2-helpdesk/actions
2. You should see a workflow running or completed
3. Wait for the green checkmark ✅
4. Visit your site: https://MATRIXX47.github.io/o2-helpdesk

---

## ⚠️ Common Issues & Fixes

### Issue: 404 Error

**Cause 1:** Repository is private
- **Fix:** Make it public (Step 1 above)

**Cause 2:** Pages not enabled
- **Fix:** Enable in Settings (Step 2 above)

**Cause 3:** Index file not at root
- **Fix:** Ensure `index.html` is in the root folder (not in a subfolder)
- **Status:** ✅ Confirmed - index.html is at root

### Issue: Custom Domain Not Working

**Cause:** DNS not updated at Hostinger
- **Fix:** Update A records in Hostinger to point to GitHub IPs
- **Current Status:** ⏳ Still waiting for DNS propagation

---

## 📋 Quick Checklist

- [ ] Repository is **Public**
- [ ] GitHub Pages is **Enabled**
- [ ] Source is set to **main** branch
- [ ] Custom domain **o2helpdesk.co.uk** is added
- [ ] **Enforce HTTPS** is checked
- [ ] DNS updated at Hostinger (4 A records)

---

## 🔍 Verification Commands

Test your site with these commands in PowerShell:

```powershell
# Check if GitHub Pages is working
Invoke-WebRequest -Uri "https://MATRIXX47.github.io/o2-helpdesk" -UseBasicParsing

# Check DNS propagation
nslookup o2helpdesk.co.uk

# Check with different DNS servers
nslookup o2helpdesk.co.uk 8.8.8.8
nslookup o2helpdesk.co.uk 1.1.1.1
```

---

## ⏱️ Expected Timeline

| Step | Time |
|------|------|
| GitHub Pages build | 2-5 minutes |
| Site live on github.io | 5 minutes |
| DNS propagation | 1-4 hours |
| Custom domain working | After DNS propagation |
| SSL certificate | Up to 24 hours |

---

**Need help?** Check the Actions tab for any errors: https://github.com/MATRIXX47/o2-helpdesk/actions
