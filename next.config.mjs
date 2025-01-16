import { withSentryConfig } from "@sentry/nextjs"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {}

export default withSentryConfig(withNextIntl(nextConfig), {
    org: "bedroom-developers",
    project: "tickets-frontend",
    widenClientFileUpload: true,
    reactComponentAnnotation: {
        enabled: true
    },
    tunnelRoute: "/monitoring",
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true
})
