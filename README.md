## Application Details
|               |
| ------------- |
|**Generation Date and Time**<br>Sat Mar 02 2024 19:40:23 GMT+0900 (Japan Standard Time)|
|**App Generator**<br>@sap/generator-fiori-freestyle|
|**App Generator Version**<br>1.12.3|
|**Generation Platform**<br>Visual Studio Code|
|**Template Used**<br>simple|
|**Service Type**<br>None|
|**Service URL**<br>N/A
|**Module Name**<br>rssreader|
|**Application Title**<br>Rss Reader|
|**Namespace**<br>miyasuta|
|**UI5 Theme**<br>sap_horizon|
|**UI5 Version**<br>1.120.9|
|**Enable Code Assist Libraries**<br>True|
|**Enable TypeScript**<br>True|
|**Add Eslint configuration**<br>True, see https://www.npmjs.com/package/eslint-plugin-fiori-custom for the eslint rules.|

## rssreader

Read RSS feed  for SAP Commuity Blogs

### Starting the generated app

-   This app has been generated using the SAP Fiori tools - App Generator, as part of the SAP Fiori tools suite.  In order to launch the generated app, simply run the following from the generated app root folder:

```
    npm start
```

#### Pre-requisites:

1. Active NodeJS LTS (Long Term Support) version and associated supported NPM version.  (See https://nodejs.org)

---

## Architecture

### Cloud Foundry (BTP)

```
Browser → BTP App Router
              ├── /resources/*   → ui5 destination → ui5.sap.com
              ├── /rss/*         → rss destination  → community.sap.com
              └── /*             → HTML5 Apps Repository
```

### AWS

```
Browser → CloudFront
              ├── /resources/*   → ui5.sap.com (UI5 framework)
              ├── /khhcw49343/*  → community.sap.com (RSS feed)
              └── /*             → S3 (UI5 static files)
```

---

## Deployment

### Cloud Foundry (BTP)

```bash
npm run build:mta
cf deploy mta_archives/*.mtar
```

### AWS

#### First time

```bash
# 1. Build UI5 app
npm run build

# 2. Deploy infrastructure (--guided for first time only)
sam deploy --guided

# 3. Upload to S3 (bucket name shown in FrontendBucket output)
npm run deploy-s3
```

#### Subsequent deployments

```bash
# When infrastructure changes
npm run build
npm run deploy-sam
npm run deploy-s3

# When only UI5 code changes
npm run build
npm run deploy-s3
```


