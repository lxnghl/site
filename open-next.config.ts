import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * OpenNext Cloudflare Configuration
 * * This file is required to prevent the OpenNext build process from prompting
 * the user interactively (which fails in non-interactive CI/CD environments
 * like Cloudflare Pages).
 * * Leaving the object empty uses the default settings provided by @opennextjs/cloudflare.
 * You can add configuration overrides here later if needed (e.g., for R2/KV caching).
 */
export default defineCloudflareConfig({});