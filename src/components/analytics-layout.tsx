'use client'

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function AnalyticsLayout() {
    return (
        <>
            <SpeedInsights />
            <Analytics debug={false} />
        </>
    )
}