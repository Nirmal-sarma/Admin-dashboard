import * as Sentry from "@sentry/react-router";
import './instrument.server.mjs';

Sentry.init({
  dsn: "https://9a908360e65679cb0b02486d12169266@o4509452934184960.ingest.de.sentry.io/4509469851385936",
  
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});
